// Controles de abuso del endpoint publico /api/chat.
// El endpoint gasta creditos de OpenAI en cada llamada, asi que se protege por
// origen, por volumen y por tamano antes de tocar la API.

export const LIMITS = {
  MAX_MESSAGE_CHARS: 1500,   // un mensaje del visitante
  MAX_HISTORY: 20,           // turnos que se reenvian a OpenAI
  MAX_TOTAL_CHARS: 12000,    // suma del historial
  RATE_MAX: 25,              // mensajes por ventana
  RATE_WINDOW_MS: 10 * 60_000
};

const ALLOWED_HOSTS = [
  'growingsolutions.online',
  'www.growingsolutions.online',
  'localhost',
  '127.0.0.1'
];

/**
 * Solo aceptamos peticiones nacidas en nuestro propio sitio. No es infalible
 * (un script fuera del navegador puede falsear la cabecera), pero corta el uso
 * casual del endpoint desde otra web.
 */
export function originAllowed(req) {
  const raw = req.headers.origin || req.headers.referer;
  if (!raw) return process.env.NODE_ENV !== 'production'; // curl local si; en prod no
  try {
    const { hostname } = new URL(raw);
    if (ALLOWED_HOSTS.includes(hostname)) return true;
    // Previews de Vercel: solo las de ESTE proyecto. Permitir cualquier
    // *.vercel.app dejaria que un sitio ajeno gastara nuestra cuota de OpenAI.
    return hostname.endsWith('.vercel.app') && hostname.startsWith('growingsolutions');
  } catch {
    return false;
  }
}

// Rate limit en memoria del proceso. En serverless cada instancia tiene su propio
// contador, asi que es un freno, no una garantia: el tope duro de gasto se pone
// en la consola de OpenAI.
const hits = new Map();

export function rateLimited(ip) {
  const now = Date.now();
  const bucket = (hits.get(ip) || []).filter(t => now - t < LIMITS.RATE_WINDOW_MS);
  bucket.push(now);
  hits.set(ip, bucket);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every(t => now - t >= LIMITS.RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return bucket.length > LIMITS.RATE_MAX;
}

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (Array.isArray(fwd) ? fwd[0] : String(fwd || '')).split(',')[0].trim() || 'unknown';
}

/**
 * Normaliza el historial que llega del navegador.
 * Descarta cualquier rol que no sea user/assistant: el visitante NUNCA puede
 * inyectar un mensaje con rol system.
 */
export function sanitizeMessages(input) {
  if (!Array.isArray(input)) return [];
  const clean = [];
  let total = 0;

  for (const m of input.slice(-LIMITS.MAX_HISTORY)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue;
    const content = String(m.content ?? '').trim().slice(0, LIMITS.MAX_MESSAGE_CHARS);
    if (!content) continue;
    total += content.length;
    if (total > LIMITS.MAX_TOTAL_CHARS) break;
    clean.push({ role: m.role, content });
  }
  return clean;
}
