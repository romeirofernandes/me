const CACHE_KEY = "gh_contributions";
const CACHE_TTL = 24 * 60 * 60 * 1000;

export async function fetchGitHubContributions(username) {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL && data.contributions) {
      return data;
    }
  }

  const url = new URL(`/v4/${username}`, "https://github-contributions-api.jogruber.de");
  const response = await fetch(url);
  if (!response.ok) return null;
  const json = await response.json();
  const total = json.total[new Date().getFullYear()];
  const data = { contributions: json.contributions, total };

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {}

  return data;
}
