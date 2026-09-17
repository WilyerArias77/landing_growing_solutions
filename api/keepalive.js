// Ping de Vercel Cron (lunes y jueves) para que el proyecto gratuito de Supabase
// no se pause por inactividad. Solo responde a Vercel: exige CRON_SECRET.

import { createHash, timingSafeEqual } from 'node:crypto';

const digest = (v) => createHash('sha256').update(String(v)).digest();

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const secret = process.env.CRON_SECRET;
  if (!secret || !timingSafeEqual(digest(req.headers.authorization || ''), digest(`Bearer ${secret}`))) {
    return res.status(401).json({ ok: false });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    return res.status(503).json({ ok: false });
  }

  const key = process.env.SUPABASE_SECRET_KEY;
  try {
    const r = await fetch(`${process.env.SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/leads?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }
    });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch {
    return res.status(502).json({ ok: false });
  }
}
