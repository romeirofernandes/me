import { Hono } from 'hono';
import { createTransporter, sendMail } from './mailer.js';

const app = new Hono();

// CORS middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://romeirofernandes.tech",
  "https://www.romeirofernandes.tech",
  "https://romeirofernandes.vercel.app", 
  "https://blog.romeirofernandes.tech",
  "https://www.blog.romeirofernandes.tech"
];

app.use('*', async (c, next) => {
  const origin = c.req.header('Origin');
  // Temporarily allow all origins for testing
  c.header('Access-Control-Allow-Origin', '*');
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

app.post('/api/mail-blog-update', async (c) => {
  // Expecting: { emails: [..], blog: { title, excerpt, url } }
  const { emails, blog } = await c.req.json();
  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return c.json({ error: 'No emails provided' }, 400);
  }
  if (!blog || !blog.title || !blog.url) {
    return c.json({ error: 'Blog info missing' }, 400);
  }

  // SMTP credentials from env
  const transporter = createTransporter({
    host: 'smtp.gmail.com',
    port: 465,
    user: c.env.GMAIL_USER,
    pass: c.env.GMAIL_PASSWORD,
  });

  const subject = `New blog by Romeiro: ${blog.title}`;

  let sent = 0, failed = 0;
  for (const to of emails) {
    const unsubscribeUrl = `https://blog.romeirofernandes.tech/unsubscribe?email=${encodeURIComponent(to)}`;
    const html = `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;">
        <h2 style="margin-bottom:0.5em;">${blog.title}</h2>
        <p style="color:#555;">${blog.excerpt || ''}</p>
        <a href="${blog.url}" style="display:inline-block;margin:1em 0;padding:0.5em 1em;background:#222;color:#fff;text-decoration:none;border-radius:4px;">Read the full post</a>
        <p style="font-size:12px;color:#888;margin-top:2em;">If you wish to unsubscribe, <a href="${unsubscribeUrl}">click here</a>.</p>
      </div>
    `;
    const text = `${blog.title}\n${blog.excerpt || ''}\nRead: ${blog.url}\nUnsubscribe: ${unsubscribeUrl}`;

    try {
      await sendMail({ transporter, to, subject, html, text });
      sent++;
    } catch (e) {
      failed++;
    }
  }
  // After sending emails
  const response = c.json({ sent, failed });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  return response;
});

export default app;