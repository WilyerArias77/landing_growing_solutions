// Verificacion de Google Search Console por archivo HTML, sin escribir el
// token en el codigo. Search Console entrega un archivo "googleXXXX.html";
// pon ese nombre en la variable GSC_VERIFICATION_FILE de Vercel y vercel.json
// redirige internamente /googleXXXX.html aqui.
//
// (Se usa el archivo y no la meta etiqueta porque el sitio es estatico: el
// HTML no puede leer variables de entorno. La verificacion por DNS en Hostinger
// tambien sirve y no necesita codigo.)

const FILE_RE = /^google[0-9a-f]{8,32}\.html$/;

export default function handler(req, res) {
  const expected = String(process.env.GSC_VERIFICATION_FILE || '').trim();
  const file = String(req.query?.file || '');
  if (!FILE_RE.test(expected) || file !== expected) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(404).send('Not found');
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600');
  return res.status(200).send(`google-site-verification: ${expected}`);
}
