// Guarda los leads (formulario y chatbot) en la tabla public.leads de Supabase.
//
// La tabla tiene RLS activo y NINGUNA politica: anon/authenticated no pueden ni
// leer ni escribir. Solo este codigo de servidor escribe, con la clave secreta
// (SUPABASE_SECRET_KEY), que vive en las variables de entorno de Vercel y jamas
// se envia al navegador.
//
// Se habla con la API REST (PostgREST) con fetch para no sumar dependencias.

import { createHmac } from 'node:crypto';
import { notifyLead } from './notify.js';

const MAX = {
  name: 80, phone: 25, email: 120, company: 120,
  website: 200, budget: 60, service: 60, additionalInfo: 2000
};

// Tope de leads por IP en la ventana. Se cuenta en la base, asi que vale para
// todas las instancias serverless (el rate limit en memoria no).
const IP_MAX_LEADS = 5;
const IP_WINDOW_MS = 60 * 60_000;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]*$/;

const clamp = (v, max) => String(v ?? '').trim().slice(0, max);

// Evita inyeccion de formulas cuando se exporta la tabla a CSV/Excel. Recorta a
// max-1 antes de anteponer ' para no chocar con el CHECK de longitud.
const FORMULA_RE = /^[=+\-@\t\r]/;
const safeText = (v, max) => {
  const s = clamp(v, max);
  return FORMULA_RE.test(s) ? `'${s.slice(0, max - 1)}` : s;
};

// Servicios aceptados (formulario y chatbot), comparados sin tildes ni mayusculas.
const norm = (v) => String(v ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
const SERVICES = new Set([
  'servicios contables', 'servicios financieros', 'automatizacion de procesos',
  'desarrollos a la medida', 'varios', 'sin especificar'
].map(norm));

export function configured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}

function headers(extra = {}) {
  const key = process.env.SUPABASE_SECRET_KEY;
  return { apikey: key, Authorization: `Bearer ${key}`, ...extra };
}

function endpoint(query = '') {
  return `${process.env.SUPABASE_URL.replace(/\/+$/, '')}/rest/v1/leads${query}`;
}

/** HMAC de la IP: permite limitar abuso sin guardar la IP en claro. */
export function hashIp(ip) {
  if (!ip || ip === 'unknown' || !process.env.SUPABASE_SECRET_KEY) return null;
  return createHmac('sha256', process.env.SUPABASE_SECRET_KEY).update(ip).digest('hex');
}

/**
 * Normaliza y valida un lead. Devuelve { ok, row } o { ok:false, reason }.
 * `input` usa los nombres del formulario (name, email, phone, ...).
 */
export function buildLead(input, { source, lang, ipHash }) {
  const name = safeText(input.name, MAX.name);
  const email = clamp(input.email, MAX.email).toLowerCase();
  const phone = clamp(input.phone, MAX.phone);
  const service = clamp(input.service, MAX.service);
  let website = clamp(input.website, MAX.website);

  if (!name) return { ok: false, reason: 'falta_nombre' };
  if (!EMAIL_RE.test(email) || FORMULA_RE.test(email)) return { ok: false, reason: 'email_invalido' };
  if (!PHONE_RE.test(phone)) return { ok: false, reason: 'telefono_invalido' };
  if (service && !SERVICES.has(norm(service))) return { ok: false, reason: 'servicio_invalido' };
  if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`.slice(0, MAX.website);

  return {
    ok: true,
    row: {
      source,
      lang: lang === 'en' ? 'en' : 'es',
      name,
      email,
      phone: phone || null,
      company: safeText(input.company, MAX.company) || null,
      website: website || null,
      budget: safeText(input.budget, MAX.budget) || null,
      service: service || null,
      additional_info: safeText(input.additionalInfo, MAX.additionalInfo) || null,
      ip_hash: ipHash
    }
  };
}

async function request(url, init) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8_000);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * true si esa IP ya envio demasiados leads en la ventana. Es un freno, no una
 * garantia: si la consulta falla deja pasar (preferimos no perder leads reales) y
 * envios simultaneos pueden superar el tope por unos pocos.
 */
export async function ipOverLimit(ipHash) {
  if (!ipHash) return false;
  const since = new Date(Date.now() - IP_WINDOW_MS).toISOString();
  try {
    const res = await request(
      endpoint(`?select=id&ip_hash=eq.${ipHash}&created_at=gte.${encodeURIComponent(since)}&limit=${IP_MAX_LEADS}`),
      { headers: headers() }
    );
    if (!res.ok) return false;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length >= IP_MAX_LEADS;
  } catch {
    return false;
  }
}

/**
 * Inserta la fila. @returns {Promise<{ok: boolean, reason?: string}>}
 * Nunca registra datos personales en los logs: solo el codigo de estado.
 */
export async function insertLead(row) {
  if (!configured()) return { ok: false, reason: 'no_configurado' };
  try {
    const res = await request(endpoint(), {
      method: 'POST',
      headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
      body: JSON.stringify(row)
    });
    if (!res.ok) {
      // Solo estado y codigo: el mensaje de Postgres puede incluir valores del lead.
      const code = await res.json().then(j => j?.code, () => undefined);
      console.error('[leads] Supabase respondio', res.status, code || '');
      return { ok: false, reason: 'db_error' };
    }
    // El lead ya esta a salvo en la base; el aviso es best-effort y nunca lanza.
    await notifyLead(row);
    return { ok: true };
  } catch (err) {
    console.error('[leads] Fallo al guardar el lead:', err?.name || 'error');
    return { ok: false, reason: 'network' };
  }
}
