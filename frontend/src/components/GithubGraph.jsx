import React, { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";

export default function GithubGraph({ username }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transformData = (contributions) => {
    const weeksToShow = isMobile ? 170 : 280;
    return contributions.slice(-weeksToShow);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-[#18181b] rounded-lg p-4 w-[fit-content] flex justify-end ">
        <GitHubCalendar
          username={username}
          colorScheme="dark"
          blockSize={isMobile ? 10 : 12}
          blockMargin={isMobile ? 3 : 4}
          fontSize={12}
          transformData={transformData}
          hideTotalCount
        />
      </div>
    </div>
  );
}
