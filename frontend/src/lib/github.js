export async function fetchGitHubContributions(username) {
  const url = new URL(`/v4/${username}`, "https://github-contributions-api.jogruber.de");
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  const total = data.total[new Date().getFullYear()];
  return { contributions: data.contributions, total };
}
