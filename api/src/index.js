import { Hono } from 'hono';

const app = new Hono();

// CORS middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://romeirofernandes.tech",
  "https://www.romeirofernandes.tech",
  "https://romeirofernandes.vercel.app"
];

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
  const apiKey = c.env.CLASH_ROYALE_API_KEY;
  if (!apiKey) return c.json({ error: 'API key missing' }, 500);

  const tag = c.req.param('tag');
  const url = `https://proxy.royaleapi.dev/v1/players/%23${tag}/battlelog`;
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