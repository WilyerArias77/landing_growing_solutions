// Cifras del sitio. Edita este archivo para publicar o retirar una cifra.
//
// Solo se muestran las que tienen `verificada: true`: pon true únicamente
// cuando tengas cómo respaldar el número (clientes reales, mediciones propias).
// Mientras no haya ninguna verificada, la barra muestra beneficios sin número
// y el bloque visual de "¿Por qué elegirnos?" no aparece.
//
// ubicacion:
//   'barra'          → franja bajo el hero (hasta 4 cifras).
//   'visual'         → tarjeta grande de "¿Por qué elegirnos?" (usa la primera).
//   'visual-flotante'→ tarjeta pequeña de "¿Por qué elegirnos?" (usa la primera).
window.GS_STATS = [
  {
    id: 'empresas', valor: '+25', verificada: false, ubicacion: 'barra',
    etiqueta: { es: 'Empresas asesoradas en Colombia y Estados Unidos', en: 'Businesses advised in Colombia and the U.S.' }
  },
  {
    id: 'tareasManuales', valor: '80%', verificada: false, ubicacion: 'barra',
    etiqueta: { es: 'Reducción en tareas manuales', en: 'Reduction in manual tasks' }
  },
  {
    id: 'reportes', valor: '3×', verificada: false, ubicacion: 'barra',
    etiqueta: { es: 'Más rápido en reportes financieros', en: 'Faster financial reporting' }
  },
  {
    id: 'enfoquePymes', valor: '100%', verificada: false, ubicacion: 'barra',
    etiqueta: { es: 'Enfocados en pymes y microempresas', en: 'Focused on SMEs and microbusinesses' }
  },
  {
    id: 'eficiencia', valor: '+85%', verificada: false, ubicacion: 'visual',
    etiqueta: { es: 'Eficiencia operativa: mejora promedio después de la implementación', en: 'Operational efficiency: average improvement after implementation' }
  },
  {
    id: 'horasAhorradas', valor: '120h', verificada: false, ubicacion: 'visual-flotante',
    etiqueta: { es: 'Horas ahorradas / mes', en: 'Hours saved / month' }
  }
];
