// Contenido de las páginas de servicio (ES/EN).
//
// Lo usan dos piezas:
//   - tools/generar-paginas.mjs: genera servicios/<slug>.html con el texto en
//     español, el título, la meta descripción y los datos estructurados.
//   - script.js: cambia los textos al inglés con el selector de idioma.
// Después de editar este archivo ejecuta `npm run paginas` y haz commit de
// los .html generados.
//
// Regla: nada de cifras, precios, clientes ni promesas que no se puedan
// respaldar. Las respuestas de las preguntas frecuentes deben ser ciertas hoy.
window.GS_PAGES = {
  contabilidad: {
    icon: 'calculator',
    servicio: 'Servicios contables',
    es: {
      metaTitle: 'Contador para pymes en Colombia y EE. UU. | Growing Solutions',
      metaDesc: 'Contabilidad mensual para pymes en Colombia y Estados Unidos: registros, conciliaciones, impuestos y cierres a cargo de un contador senior. Agenda una llamada gratis.',
      kicker: 'Contabilidad',
      h1: 'Tu contabilidad al día, todos los meses',
      intro: 'Registros, conciliaciones, impuestos y cierres a cargo de un contador senior, para que decidas con números reales y no con estimaciones.',
      problema: 'Cuando la contabilidad se atrasa, las decisiones se toman a ciegas: no sabes cuánto ganaste el mes pasado, aparecen diferencias en los bancos que nadie explica y los impuestos se preparan a última hora, con riesgo de sanciones.',
      solucion: 'Nos encargamos de la contabilidad completa de tu empresa, con un calendario fijo de cierres. Trabajamos con tus documentos y herramientas, coordinamos con tus asesores tributarios cuando hace falta y te entregamos información lista para decidir.',
      entregables: [
        'Registro contable y causación de tus operaciones',
        'Conciliaciones bancarias mensuales',
        'Preparación y control del calendario de impuestos (IVA en Colombia, sales & use tax en EE. UU.)',
        'Cierre contable mensual',
        'Estados financieros para ti, tu banco o tus socios'
      ],
      faqs: [
        { q: '¿Con qué software contable trabajan?', a: 'Trabajamos con SAP y QuickBooks, y usamos Power BI y SQL para los reportes. Si tu empresa usa otra herramienta, lo revisamos en la llamada inicial.' },
        { q: '¿Pueden trabajar junto a mi contador actual?', a: 'Sí. Podemos encargarnos de toda la contabilidad o apoyar a tu contador en lo que hoy no alcanza a cubrir. Lo definimos en el diagnóstico.' },
        { q: '¿Atienden empresas en Estados Unidos?', a: 'Sí. Atendemos pymes en Colombia y en Estados Unidos, en español y en inglés.' },
        { q: '¿Cuánto cuesta?', a: 'Depende del volumen de transacciones y del alcance. Lo cotizamos a la medida después de una llamada gratis de 20 minutos.' }
      ]
    },
    en: {
      metaTitle: 'Accountant for Small Businesses in Colombia and the U.S. | Growing Solutions',
      metaDesc: 'Monthly accounting for small businesses in Colombia and the U.S.: bookkeeping, reconciliations, taxes and closings handled by a senior accountant. Book a free call.',
      kicker: 'Accounting',
      h1: 'Your books up to date, every month',
      intro: 'Bookkeeping, reconciliations, taxes and closings handled by a senior accountant, so you decide with real numbers instead of estimates.',
      problema: 'When the books fall behind, decisions are made blind: you do not know how much you earned last month, bank differences show up that nobody can explain, and taxes are prepared at the last minute, at the risk of penalties.',
      solucion: 'We handle your company’s full accounting on a fixed closing calendar. We work with your documents and tools, coordinate with your tax advisors when needed, and deliver information ready for decisions.',
      entregables: [
        'Bookkeeping and accrual of your transactions',
        'Monthly bank reconciliations',
        'Tax calendar preparation and tracking (VAT in Colombia, sales & use tax in the U.S.)',
        'Monthly closing',
        'Financial statements for you, your bank or your partners'
      ],
      faqs: [
        { q: 'Which accounting software do you work with?', a: 'We work with SAP and QuickBooks, and use Power BI and SQL for reporting. If your business uses another tool, we review it on the first call.' },
        { q: 'Can you work alongside my current accountant?', a: 'Yes. We can take over all of your accounting or support your accountant with what they cannot cover today. We define it in the assessment.' },
        { q: 'Do you serve businesses in the United States?', a: 'Yes. We serve small businesses in Colombia and the United States, in Spanish and English.' },
        { q: 'How much does it cost?', a: 'It depends on your transaction volume and scope. We quote it after a free 20-minute call.' }
      ]
    }
  },

  finanzas: {
    icon: 'chart-line',
    servicio: 'Servicios financieros',
    es: {
      metaTitle: 'Flujo de caja y presupuestos para pymes | Growing Solutions',
      metaDesc: 'Servicios financieros para pymes: flujo de caja, presupuestos, proyecciones e indicadores para decidir con claridad. Colombia y Estados Unidos. Agenda una llamada gratis.',
      kicker: 'Servicios financieros',
      h1: 'Sabe cuánta caja tienes y cuánta vas a tener',
      intro: 'Flujo de caja, presupuestos e indicadores para que decidas cuánto gastar, cuándo invertir y dónde se está yendo el dinero.',
      problema: 'Muchas empresas venden bien y aun así se quedan sin caja. Sin un flujo de caja proyectado ni un presupuesto, cada pago grande es una sorpresa y las decisiones se toman mirando solo el saldo del banco.',
      solucion: 'Armamos tu flujo de caja, tu presupuesto y un tablero de indicadores a partir de tu contabilidad real, y los mantenemos actualizados para que veas con anticipación lo que viene.',
      entregables: [
        'Flujo de caja actual y proyectado',
        'Presupuesto anual con seguimiento frente a lo real',
        'Proyecciones para evaluar decisiones (contratar, invertir, endeudarte)',
        'Indicadores clave (KPI) de tu negocio',
        'Análisis financiero con recomendaciones claras'
      ],
      faqs: [
        { q: '¿Necesito tener la contabilidad al día para empezar?', a: 'Ayuda mucho, porque el análisis parte de números reales. Si está atrasada, podemos empezar por ponerla al día con nuestro servicio de contabilidad.' },
        { q: '¿En qué herramienta veo los indicadores?', a: 'Normalmente en un tablero de Power BI o en el formato que ya uses. Lo definimos según cómo trabaja tu equipo.' },
        { q: '¿Cada cuánto se actualiza el flujo de caja?', a: 'Lo acordamos contigo según tu operación. Si automatizamos la captura de datos, puede actualizarse sin trabajo manual.' },
        { q: '¿Cuánto cuesta?', a: 'Depende del alcance. Lo cotizamos a la medida después de una llamada gratis de 20 minutos.' }
      ]
    },
    en: {
      metaTitle: 'Cash Flow and Budgeting for Small Businesses | Growing Solutions',
      metaDesc: 'Financial services for small businesses: cash flow, budgets, projections and KPIs to decide with clarity. Colombia and the U.S. Book a free call.',
      kicker: 'Financial services',
      h1: 'Know how much cash you have — and will have',
      intro: 'Cash flow, budgets and indicators so you decide how much to spend, when to invest and where the money is going.',
      problema: 'Many businesses sell well and still run out of cash. Without a projected cash flow or a budget, every large payment is a surprise and decisions are made by looking only at the bank balance.',
      solucion: 'We build your cash flow, your budget and a KPI dashboard from your real books, and keep them up to date so you can see what is coming ahead of time.',
      entregables: [
        'Current and projected cash flow',
        'Annual budget tracked against actuals',
        'Projections to evaluate decisions (hiring, investing, borrowing)',
        'Key indicators (KPIs) for your business',
        'Financial analysis with clear recommendations'
      ],
      faqs: [
        { q: 'Do my books need to be up to date to start?', a: 'It helps a lot, because the analysis starts from real numbers. If they are behind, we can start by catching them up with our accounting service.' },
        { q: 'Where do I see the indicators?', a: 'Usually in a Power BI dashboard or in the format you already use. We define it based on how your team works.' },
        { q: 'How often is the cash flow updated?', a: 'We agree on it with you based on your operations. If we automate data capture, it can update with no manual work.' },
        { q: 'How much does it cost?', a: 'It depends on the scope. We quote it after a free 20-minute call.' }
      ]
    }
  },

  automatizacion: {
    icon: 'zap',
    servicio: 'Automatización de procesos',
    es: {
      metaTitle: 'Automatización de procesos contables para pymes | Growing Solutions',
      metaDesc: 'Automatizamos procesos contables y administrativos de pymes: facturas, conciliaciones, reportes y recordatorios que funcionan solos. Colombia y EE. UU.',
      kicker: 'Automatización de procesos',
      h1: 'Que el trabajo repetitivo se haga solo',
      intro: 'Conectamos las herramientas que ya usas para que las facturas, los reportes y los recordatorios dejen de depender de alguien copiando y pegando.',
      problema: 'En muchas pymes la misma información se escribe tres veces: en el correo, en una hoja de cálculo y en la contabilidad. Eso consume horas, genera errores y hace que todo dependa de una persona.',
      solucion: 'Revisamos cómo fluye la información en tu empresa, identificamos las tareas repetitivas y construimos automatizaciones que conectan tus herramientas, con un contador que entiende qué debe quedar registrado y cómo.',
      entregables: [
        'Mapa de tus procesos y de las tareas que conviene automatizar',
        'Flujos automatizados entre tus herramientas (correo, hojas de cálculo, contabilidad)',
        'Captura automática de facturas y documentos',
        'Reportes y recordatorios programados',
        'Documentación y acompañamiento para tu equipo'
      ],
      faqs: [
        { q: '¿Tengo que cambiar mis herramientas actuales?', a: 'No necesariamente. Primero buscamos conectar lo que ya usas; solo proponemos cambios cuando de verdad simplifican el proceso.' },
        { q: '¿Qué pasa si una automatización falla?', a: 'Las diseñamos con avisos para que un error no pase desapercibido, y te acompañamos después de la implementación.' },
        { q: '¿Por dónde conviene empezar?', a: 'Por el proceso que más horas manuales consume. Lo identificamos juntos en la llamada inicial.' },
        { q: '¿Cuánto cuesta?', a: 'Depende de cuántos procesos y herramientas haya que conectar. Lo cotizamos a la medida después de una llamada gratis de 20 minutos.' }
      ]
    },
    en: {
      metaTitle: 'Accounting Process Automation for Small Businesses | Growing Solutions',
      metaDesc: 'We automate accounting and admin processes for small businesses: invoices, reconciliations, reports and reminders that run on their own. Colombia and the U.S.',
      kicker: 'Process automation',
      h1: 'Let the repetitive work do itself',
      intro: 'We connect the tools you already use so invoices, reports and reminders stop depending on someone copying and pasting.',
      problema: 'In many small businesses the same information is typed three times: in email, in a spreadsheet and in the books. That eats up hours, creates errors and makes everything depend on one person.',
      solucion: 'We review how information flows through your business, identify the repetitive tasks and build automations that connect your tools — designed by an accountant who knows what must be recorded and how.',
      entregables: [
        'A map of your processes and the tasks worth automating',
        'Automated flows between your tools (email, spreadsheets, accounting)',
        'Automatic capture of invoices and documents',
        'Scheduled reports and reminders',
        'Documentation and support for your team'
      ],
      faqs: [
        { q: 'Do I have to change my current tools?', a: 'Not necessarily. We first look to connect what you already use; we only suggest changes when they truly simplify the process.' },
        { q: 'What happens if an automation fails?', a: 'We build them with alerts so an error does not go unnoticed, and we support you after implementation.' },
        { q: 'Where should we start?', a: 'With the process that takes the most manual hours. We identify it together on the first call.' },
        { q: 'How much does it cost?', a: 'It depends on how many processes and tools need to be connected. We quote it after a free 20-minute call.' }
      ]
    }
  },

  'desarrollos-ia': {
    icon: 'code-xml',
    servicio: 'Desarrollos a la medida',
    es: {
      metaTitle: 'Desarrollo de herramientas con IA para pymes | Growing Solutions',
      metaDesc: 'Tableros, aplicaciones internas y asistentes de inteligencia artificial hechos a la medida de tu pyme, sin montar un equipo de desarrollo. Colombia y EE. UU.',
      kicker: 'Desarrollos con IA',
      h1: 'Herramientas con IA hechas para tu negocio',
      intro: 'Tableros, aplicaciones internas y asistentes de inteligencia artificial a la medida, sin que tengas que contratar un equipo de desarrollo.',
      problema: 'El software genérico no siempre encaja con la forma en que trabaja una pyme, y contratar desarrolladores de planta no tiene sentido para un proyecto puntual. El resultado: procesos a medias entre hojas de cálculo y correos.',
      solucion: 'Diseñamos y construimos la herramienta que necesitas, conectada a tus datos contables y financieros, y la acompañamos después de entregarla. Si encaja, sumamos inteligencia artificial para responder, clasificar o resumir información.',
      entregables: [
        'Tableros con tus números clave',
        'Aplicaciones web internas a la medida',
        'Asistentes de IA para atender clientes o consultar información',
        'Integraciones y APIs entre tus sistemas',
        'Soporte y mejoras después de la entrega'
      ],
      faqs: [
        { q: '¿Qué tipo de asistente de IA pueden hacer?', a: 'Por ejemplo, un asistente que responda las preguntas frecuentes de tus clientes y tome sus datos de contacto, como el que ves en este sitio.' },
        { q: '¿Mis datos quedan seguros?', a: 'Las claves y los datos sensibles se manejan del lado del servidor, nunca en el navegador, y solo se comparten con los proveedores que la herramienta necesita.' },
        { q: '¿Necesito saber programar?', a: 'No. Nosotros construimos y mantenemos la herramienta; tú la usas.' },
        { q: '¿Cuánto cuesta?', a: 'Depende del alcance del desarrollo. Lo cotizamos a la medida después de una llamada gratis de 20 minutos.' }
      ]
    },
    en: {
      metaTitle: 'AI-Powered Tools for Small Businesses | Growing Solutions',
      metaDesc: 'Dashboards, internal apps and AI assistants built for your small business, with no development team to hire. Colombia and the U.S.',
      kicker: 'AI-powered development',
      h1: 'AI-powered tools built for your business',
      intro: 'Custom dashboards, internal apps and artificial intelligence assistants, without having to hire a development team.',
      problema: 'Generic software does not always fit the way a small business works, and hiring in-house developers makes no sense for a one-off project. The result: processes stuck halfway between spreadsheets and email.',
      solucion: 'We design and build the tool you need, connected to your accounting and financial data, and support it after delivery. Where it fits, we add artificial intelligence to answer, classify or summarize information.',
      entregables: [
        'Dashboards with your key numbers',
        'Custom internal web apps',
        'AI assistants to serve customers or look up information',
        'Integrations and APIs between your systems',
        'Support and improvements after delivery'
      ],
      faqs: [
        { q: 'What kind of AI assistant can you build?', a: 'For example, an assistant that answers your customers’ frequent questions and collects their contact details, like the one on this site.' },
        { q: 'Is my data safe?', a: 'Keys and sensitive data are handled on the server, never in the browser, and are only shared with the providers the tool needs.' },
        { q: 'Do I need to know how to code?', a: 'No. We build and maintain the tool; you use it.' },
        { q: 'How much does it cost?', a: 'It depends on the scope. We quote it after a free 20-minute call.' }
      ]
    }
  }
};
