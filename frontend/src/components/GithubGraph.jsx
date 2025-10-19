import React, { useState, useEffect } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphTotalCount,
  ContributionGraphLegend,
} from "@/components/ui/contribution-graph";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

async function fetchGitHubContributions(username) {
  const url = new URL(
    `/v4/${username}`,
    "https://github-contributions-api.jogruber.de"
  );
  const response = await fetch(url);
  const data = await response.json();
  const total = data.total[new Date().getFullYear()];
  return { contributions: data.contributions, total };
}

function filterRecentContributions(contributions, months) {
  const now = new Date();
  const cutoff = new Date(
    now.getFullYear(),
    now.getMonth() - months,
    now.getDate()
  );
  return contributions.filter((c) => {
    const d = new Date(c.date);
    return d >= cutoff && d <= now;
  });
}

const formatDate = dateStr => {
  const d = new Date(dateStr);
  return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth()+1).toString().padStart(2, "0")}-${d.getFullYear()}`;
};

export default function GithubGraph({ username }) {
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchGitHubContributions(username).then(setData);
  }, [username]);

  if (!data) {
    return (
      <div className="flex justify-center">
        <div className="bg-[#18181b] rounded-lg p-4 w-fit animate-pulse">
          <div className="h-[120px] w-[800px] bg-[#232323] rounded"></div>
        </div>
      </div>
    );
  }

  const monthsToShow = isMobile ? 6 : 9;
  const recentContributions = filterRecentContributions(data.contributions, monthsToShow);

  const blockColors = [
    "#232323", // level 0: empty
    "#bbbbbb", // level 1: light gray
    "#888888", // level 2: medium gray
    "#444444", // level 3: dark gray
    "#ffffff", // level 4: white (most active)
  ];

  return (
    <div className="flex justify-center">
      <div className="bg-[#18181b] rounded-lg p-4 w-fit">
        <ContributionGraph
          data={recentContributions}
          blockSize={isMobile ? 9 : 12}
          blockMargin={isMobile ? 3 : 4}
          blockRadius={2}
          className="text-[#a1a1aa]"
        >
          <ContributionGraphCalendar>
            {({ activity, dayIndex, weekIndex }) => (
              <Tooltip key={activity.date}>
                <TooltipTrigger asChild>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                    className="transition-all hover:ring-2 hover:ring-[#38bdf8] hover:ring-offset-1 hover:ring-offset-[#18181b]"
                    style={{
                      fill: blockColors[activity.level] || "#ffffff",
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-[#232323] text-[#f5f5f7] px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                  {activity.count > 0
                    ? `${activity.count} contributions on ${formatDate(activity.date)}`
                    : `No contributions on ${formatDate(activity.date)}`}
                </TooltipContent>
              </Tooltip>
            )}
          </ContributionGraphCalendar>
          <ContributionGraphFooter className="mt-4 text-xs">
            <span className="font-medium text-[#f5f5f7]">
              {data.total} contributions in {new Date().getFullYear()}
            </span>
            <ContributionGraphLegend>
              {({ level }) => (
                <div
                  className="w-3 h-3 rounded-sm border border-[#232323]"
                  style={{
                    backgroundColor: blockColors[level] || "#ffffff",
                  }}
                />
              )}
            </ContributionGraphLegend>
          </ContributionGraphFooter>
        </ContributionGraph>
      </div>
    </div>
  );
}
