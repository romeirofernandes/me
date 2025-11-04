import { Hono } from 'hono';

const app = new Hono();

const allowedOrigins = [
  "http://localhost:5173",
  "https://romeirofernandes.tech",
  "https://www.romeirofernandes.tech",
  "https://romeirofernandes.vercel.app"
];

// Map origins to env variable names
const originApiKeyMap = {
  "http://localhost:5173": "CLASH_ROYALE_API_KEY_0",
  "https://romeirofernandes.tech": "CLASH_ROYALE_API_KEY_1",
  "https://www.romeirofernandes.tech": "CLASH_ROYALE_API_KEY_1",
  "https://romeirofernandes.vercel.app": "CLASH_ROYALE_API_KEY_2"
};

app.use('*', async (c, next) => {
  const origin = c.req.header('Origin');
  if (allowedOrigins.includes(origin)) {
    c.header('Access-Control-Allow-Origin', origin);
  }
  c.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  c.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }
  await next();
});

app.get('/api/clash-royale/battlelog/:tag', async (c) => {
  const origin = c.req.header('Origin');
  const apiKeyEnvName = originApiKeyMap[origin];
  const apiKey = c.env[apiKeyEnvName];
  if (!apiKey) return c.json({ error: 'API key missing' }, 500);

  const tag = c.req.param('tag');
  const url = `https://api.clashroyale.com/v1/players/%23${tag}/battlelog`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!res.ok) {
    return c.json({ error: 'Failed to fetch battle log' }, res.status);
  }

  const data = await res.json();
  return c.json(data);
});

export default app;