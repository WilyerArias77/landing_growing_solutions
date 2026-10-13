// Configuracion publica del sitio, leida de las variables de entorno de Vercel.
//
// El sitio es estatico (sin build), asi que el navegador no puede leer
// process.env: este endpoint entrega solo valores pensados para ser publicos
// (enlace de agenda e IDs de analitica). Nunca agregues aqui claves secretas.

const GA_ID_RE = /^G-[A-Z0-9]{4,20}$/;
const PIXEL_ID_RE = /^\d{6,20}$/;

/** Solo https: evita que un valor mal puesto termine como javascript: en un href. */
function safeUrl(value) {
  try {
    const url = new URL(String(value || '').trim());
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

function match(value, re) {
  const v = String(value || '').trim();
  return re.test(v) ? v : null;
}

export default function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'metodo_no_permitido' });
  }
  // Cambia poco: cache corto en la CDN para no invocar la funcion en cada visita.
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=600');
  return res.status(200).json({
    bookingUrl: safeUrl(process.env.BOOKING_URL),
    gaId: match(process.env.GA_ID, GA_ID_RE),
    metaPixelId: match(process.env.META_PIXEL_ID, PIXEL_ID_RE)
  });
}
