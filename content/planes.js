// Planes con precio de referencia. Edita este archivo para publicarlos.
//
// La sección "Planes" de la portada NO aparece mientras ningún plan tenga
// precio. Cuando al menos uno lo tenga, se muestran los tres; los que sigan
// sin precio dicen "Cotización a la medida".
//
// Precios "desde", como número entero sin puntos ni símbolos:
//   desdeCOP: 1200000   → se muestra "Desde $1.200.000 COP"
//   desdeUSD: 300       → se muestra "Desde US$300"
// `periodo` es opcional: 'mes' para precios mensuales, null para pago único.
//
// {{PENDIENTE: precios de referencia en COP y USD}}
// {{PENDIENTE: revisar qué incluye cada plan antes de publicar}}
window.GS_PLANES = [
  {
    id: 'contabilidad-mensual',
    desdeCOP: null, desdeUSD: null, periodo: 'mes',
    nombre: { es: 'Contabilidad mensual', en: 'Monthly accounting' },
    descripcion: {
      es: 'Tu contabilidad al día todos los meses, con cierre y estados financieros.',
      en: 'Your books up to date every month, with closing and financial statements.'
    },
    incluye: {
      es: ['Registro y causación de operaciones', 'Conciliaciones bancarias', 'Calendario de impuestos', 'Cierre y estados financieros mensuales'],
      en: ['Bookkeeping and accruals', 'Bank reconciliations', 'Tax calendar', 'Monthly closing and financial statements']
    }
  },
  {
    id: 'diagnostico-financiero',
    desdeCOP: null, desdeUSD: null, periodo: null,
    nombre: { es: 'Diagnóstico financiero', en: 'Financial assessment' },
    descripcion: {
      es: 'Una foto clara de la salud de tu negocio y un plan de acción.',
      en: 'A clear picture of your business health and an action plan.'
    },
    incluye: {
      es: ['Revisión de tu contabilidad y tu caja', 'Flujo de caja proyectado', 'Indicadores clave', 'Informe con recomendaciones'],
      en: ['Review of your books and cash', 'Projected cash flow', 'Key indicators', 'Report with recommendations']
    }
  },
  {
    id: 'automatizacion-inicial',
    desdeCOP: null, desdeUSD: null, periodo: null,
    nombre: { es: 'Automatización inicial', en: 'Starter automation' },
    descripcion: {
      es: 'Automatizamos el proceso que hoy te consume más horas manuales.',
      en: 'We automate the process that takes the most manual hours today.'
    },
    incluye: {
      es: ['Mapa del proceso actual', 'Automatización de un proceso', 'Pruebas y puesta en marcha', 'Acompañamiento posterior'],
      en: ['Map of the current process', 'Automation of one process', 'Testing and go-live', 'Follow-up support']
    }
  }
];
