import React from "react";
import GitHubCalendar from "react-github-calendar";

export default function GithubGraph({ username }) {
  return (
    <div className="bg-[#18181b] rounded-lg p-4">
      <GitHubCalendar
        username={username}
        colorScheme="dark"
        blockSize={12}
        blockMargin={4}
        fontSize={14}
        weeks={4}
        hideTotalCount
      />
    </div>
  );
}
