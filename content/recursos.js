// Recursos descargables a cambio de nombre y correo (página /recursos).
//
// Para publicar un recurso:
//   1. Sube el archivo a la carpeta recursos/archivos/ (PDF o XLSX).
//   2. Pon su ruta en `archivo`, por ejemplo '/recursos/archivos/plantilla-flujo-de-caja.xlsx'.
//   3. Ejecuta `npm run paginas` y haz commit.
// Mientras ningún recurso tenga archivo, /recursos dice "Muy pronto", no
// muestra el formulario, no se indexa y no aparece en el sitemap.
//
// El servidor (api/recurso.js) también lee este archivo: solo entrega enlaces
// de recursos listados aquí y con archivo.
//
// {{PENDIENTE: archivo PDF/XLSX de la plantilla de flujo de caja}}
window.GS_RECURSOS = [
  {
    id: 'plantilla-flujo-de-caja',
    archivo: null,
    titulo: { es: 'Plantilla de flujo de caja para pymes', en: 'Cash flow template for small businesses' },
    descripcion: {
      es: 'Proyecta tus entradas y salidas de las próximas semanas y anticipa los meses en que te puede faltar caja.',
      en: 'Project your inflows and outflows for the coming weeks and spot the months when cash may run short.'
    }
  }
];
