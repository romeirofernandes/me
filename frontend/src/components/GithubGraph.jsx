import React from "react";
import GitHubCalendar from "react-github-calendar";

export default function GithubGraph({ username }) {
  // Show only the last 12 weeks
  const transformData = (contributions) => {
    const weeksToShow = 280;
    return contributions.slice(-weeksToShow);
  };

  return (
    <div className="bg-[#18181b] rounded-lg p-4 overflow-x-auto">
      <GitHubCalendar
        username={username}
        colorScheme="dark"
        blockSize={12}
        blockMargin={4}
        fontSize={14}
        transformData={transformData}
        hideTotalCount
      />
    </div>
  );
}
