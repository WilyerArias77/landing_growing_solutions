// ── I18N ──
const translations = {
  es: {
    lang: { esLabel: 'Español', enLabel: 'English' },
    nav: {
      servicios: 'Servicios', nosotros: 'Nosotros', metodologia: 'Metodología', contacto: 'Contacto',
      hamburgerAria: 'Menú'
    },
    brand: { tagline: 'Finanzas que evolucionan, tecnología que impulsa' },
    hero: {
      badge: 'Aliado estratégico para pequeñas y medianas Empresas en Colombia y Estados Unidos',
      titleL1: 'Tu contabilidad al día y tus procesos', titleHighlight: 'en automático,', titleL2: 'sin contratar un equipo interno',
      subtitle: 'Contabilidad, finanzas e inteligencia artificial para pymes en Colombia y Estados Unidos, a cargo de un contador senior que también automatiza.',
      ctaPrimary: 'Agenda una llamada gratis de 20 minutos', ctaSecondary: 'Conoce Nuestros Servicios', scroll: 'Descubre más'
    },
    heroCard: {
      chip1: 'Contador Público · +12 años', chip2: 'QuickBooks Advanced ProAdvisor', chip3: 'Atención en español e inglés'
    },
    stats: {
      benefit1: 'Atención directa con un contador senior', benefit2: 'Respuesta en menos de 24 horas',
      benefit3: 'Servicio en español e inglés', benefit4: 'Colombia y Estados Unidos'
    },
    servicios: {
      tag: 'Nuestros Servicios', titleL1: 'Soluciones integrales para', titleL2: 'hacer crecer tu negocio',
      subtitle: 'Una base sólida de contabilidad y finanzas, y un acelerador de automatización e inteligencia artificial para que tu empresa crezca sin crecer en trabajo manual.',
      more: 'Ver el servicio',
      baseTag: 'La base',
      baseDesc: 'Contabilidad y finanzas: tus números en orden y bajo control.',
      accelTag: 'El acelerador',
      accelDesc: 'Automatización e inteligencia artificial: que la operación avance sola.',
      card1: {
        title: 'Contabilidad',
        desc: 'Tus números en orden, todos los meses. Nos encargamos de la contabilidad completa para que decidas con información real y actualizada.',
        li1: 'Tu contabilidad al día cada mes, sin atrasos', li2: 'Tus bancos conciliados, sin diferencias sin explicar', li3: 'Tus impuestos presentados a tiempo, sin sanciones', li4: 'Estados financieros listos para tu banco o tus socios'
      },
      card2: {
        title: 'Servicios Financieros',
        desc: 'Claridad sobre la salud de tu negocio: sabes cuánta caja tienes, cuánta vas a tener y en qué se está yendo.',
        li1: 'Tu flujo de caja actualizado cada lunes, sin tocar Excel', li2: 'Sabes cuánto puedes gastar antes de gastarlo', li3: 'Un presupuesto realista para medir el año', li4: 'Indicadores claros para decidir, no solo reportes'
      },
      card3: {
        title: 'Automatización de Procesos',
        desc: 'Quitamos el trabajo repetitivo: conectamos las herramientas que ya usas para que la información se mueva sola.',
        li1: 'Tus facturas entran solas a la contabilidad', li2: 'Tus herramientas conectadas: cada dato se escribe una sola vez', li3: 'Recordatorios y reportes que salen solos', li4: 'Menos horas en tareas que no necesitan a una persona'
      },
      card4: {
        title: 'Desarrollos con IA',
        desc: 'Herramientas a la medida con inteligencia artificial: tableros, aplicaciones internas y asistentes hechos para tu negocio, sin montar un equipo de desarrollo.',
        li1: 'Un tablero con tus números clave, siempre actualizado', li2: 'Un asistente de IA que responde a tus clientes', li3: 'Aplicaciones internas hechas a tu forma de trabajar', li4: 'Tus sistemas conectados entre sí'
      }
    },
    about: {
      tag: 'Quién está detrás',
      role: 'Contador Público · Especialista en Finanzas · Responsable de Growing Solutions',
      bio: 'Contador Público con más de 12 años de experiencia en contabilidad corporativa, análisis y gestión financiera en entornos bancarios, corporativos e internacionales. Elaboro estados financieros bajo NIIF/IFRS, presupuestos y proyecciones, y me encargo del cumplimiento tributario. Uso Power BI, SQL y la inteligencia artificial para automatizar reportes y procesos, de modo que las pymes de Colombia y Estados Unidos tengan sus números al día sin un equipo interno.',
      credLabel: 'Formación y certificaciones',
      cred1: 'Contador Público — Universidad de San Buenaventura Medellín',
      cred2: 'Especialización en Finanzas — Instituto Tecnológico Metropolitano',
      cred3: 'QuickBooks Online Advanced ProAdvisor — Intuit',
      cred4: 'Diplomado en Bases de Datos e Inteligencia de Negocios (SQL Server)',
      expLabel: 'Trayectoria',
      exp1Role: 'Director Financiero',
      exp1Org: 'Servintegral Multiservicios · Colombia · 2025',
      exp1Desc: 'Dirigí contabilidad, tesorería, nómina e impuestos; reduje el ciclo de tesorería en un 15 %.',
      exp2Role: 'Contador Financiero (freelance)',
      exp2Org: 'Believe and Belong Pty Ltd · Australia · 2023–2026',
      exp2Desc: 'Automaticé los reportes financieros, reduciendo un 40 % su tiempo de generación, con SQL y Power BI.',
      exp3Role: 'Analista Administrativo',
      exp3Org: 'Bancolombia · Colombia · 2014–2021',
      exp3Desc: 'Conciliaciones y análisis financiero en la gerencia hipotecaria; automaticé los informes de cierre mensual.',
      exp4Role: 'Contabilidad en empresas',
      exp4Org: 'Importadoras Asociadas, Experto Seguridad, Hotel Dann Carlton · 2008–2014',
      exp4Desc: 'Causaciones, conciliaciones bancarias, impuestos y cierres contables.',
      expNote: 'Resultados obtenidos en esos cargos.',
      toolsLabel: 'Herramientas con las que trabajo',
      langs: 'Español nativo · Inglés B2',
      linkedin: 'Ver perfil en LinkedIn'
    },
    nosotros: {
      tag: '¿Por Qué Elegirnos?', titleL1: 'Tu aliado estratégico', titleL2: 'para crecer',
      subtitle: 'No somos solo proveedores — somos un equipo que combina experiencia financiera, contable y tecnológica para ofrecerte soluciones prácticas y resultados medibles.',
      feature1: { title: 'Sin necesidad de equipo interno', desc: 'Accede a contadores, analistas financieros y desarrolladores sin contratar internamente.' },
      feature2: { title: 'Pensado para pymes en Colombia y Estados Unidos', desc: 'Servicios adaptados a la realidad y al presupuesto de las pymes en ambos mercados.' },
      feature3: { title: 'Resultados rápidos y medibles', desc: 'Implementaciones ágiles con impacto visible desde las primeras semanas.' },
      feature4: { title: 'Acompañamiento continuo', desc: 'No te dejamos solo — te acompañamos, optimizamos y escalamos contigo.' }
    },
    metodologia: {
      tag: 'Nuestra Metodología', titleL1: 'Del diagnóstico a los resultados', titleL2: 'en cuatro pasos',
      subtitle: 'Un proceso claro, transparente y centrado en tu negocio — sin complicaciones técnicas.',
      step1: { title: 'Diagnóstico', desc: 'Analizamos tu operación actual, identificamos oportunidades de mejora y entendemos tus objetivos de negocio.' },
      step2: { title: 'Propuesta a Medida', desc: 'Diseñamos una solución personalizada con un plan claro de implementación, tiempos y costos definidos.' },
      step3: { title: 'Implementación', desc: 'Ejecutamos la solución de forma ágil. Tú sigues operando mientras nosotros nos encargamos de todo.' },
      step4: { title: 'Soporte y Evolución', desc: 'Te acompañamos con soporte continuo, optimización y escalamiento conforme tu negocio crece.' }
    },
    contacto: {
      tag: 'Agenda tu Asesoría', titleL1: '¿Listo para', titleHighlight: 'profesionalizar', titleL2: 'tu empresa?',
      subtitle: 'Cuéntanos sobre tu negocio y en menos de 24 horas uno de nuestros asesores se pondrá en contacto contigo. Sin compromiso.'
    },
    form: {
      labelName: 'Nombre', labelPhone: 'WhatsApp o teléfono', labelEmail: 'Correo electrónico',
      labelCompany: 'Nombre de la empresa', labelCountry: 'País',
      labelService: 'Servicio de interés', labelInfo: 'Mensaje',
      phName: 'Tu nombre completo', phPhone: 'Ej: +57 300 123 4567', phEmail: 'correo@tuempresa.com',
      phCompany: 'Nombre de tu empresa',
      phInfo: 'Cuéntanos sobre tu negocio, tus principales retos o qué tipo de ayuda buscas...',
      submit: 'Enviar solicitud →', note: 'Sin compromiso. Te respondemos en menos de 24h.',
      errRequired: 'Por favor completa todos los campos requeridos (*).',
      errEmail: 'Por favor ingresa un correo electrónico válido.',
      errPhone: 'Por favor ingresa un número de WhatsApp o teléfono válido (mínimo 7 dígitos).',
      errNotConfigured: 'El formulario aún no está configurado. Contacta al administrador.',
      sending: 'Enviando...',
      success: '¡Recibimos tu solicitud! Un asesor se pondrá en contacto contigo en menos de 24 horas.',
      successTitle: '¡Recibimos tu solicitud!',
      successNext: 'Te escribiremos en menos de 24 horas por correo o WhatsApp. Si prefieres no esperar, agenda ya una llamada gratis de 20 minutos.',
      successCta: 'Agenda una llamada gratis de 20 minutos',
      errNetwork: 'No se pudo enviar el formulario. Verifica tu conexión e intenta de nuevo.',
      errRateLimit: 'Recibimos varias solicitudes desde tu conexión. Intenta más tarde o escríbenos por WhatsApp.',
      consent: 'Autorizo el tratamiento de mis datos personales para que Growing Solutions me contacte y me envíe información sobre sus servicios, conforme a la',
      consentLink: 'Política de Tratamiento de Datos',
      errConsent: 'Para enviar tu solicitud debes autorizar el tratamiento de tus datos personales.'
    },
    common: { optional: '(opcional)' },
    service: {
      placeholder: '¿En qué podemos ayudarte?', opt1: 'Servicios Contables', opt2: 'Servicios Financieros',
      opt3: 'Automatización de Procesos', opt4: 'Desarrollos con IA'
    },
    country: { placeholder: 'Selecciona tu país', co: 'Colombia', us: 'Estados Unidos', other: 'Otro' },
    footer: {
      tagline: 'Soluciones integrales en contabilidad, finanzas, automatización y tecnología para microempresas y pymes en Colombia y Estados Unidos.',
      servicesHeading: 'Servicios', companyHeading: 'Empresa', contactHeading: 'Contáctanos',
      linkAutomatizacion: 'Automatización', linkUs: 'Negocios en EE. UU.', country: 'Colombia y Estados Unidos',
      copyright: '© 2026 Growing Solutions. Todos los derechos reservados.',
      bottomTagline: 'Hecho con dedicación para el crecimiento de tu empresa.',
      privacy: 'Política de Tratamiento de Datos'
    },
    wa: {
      coShort: 'Colombia', usShort: 'USA',
      coAria: 'WhatsApp Colombia +57 324 275 4406', usAria: 'WhatsApp USA +1 917 227 2181',
      ctaMobileCo: 'WhatsApp Colombia +57 324 275 4406', ctaMobileUs: 'WhatsApp USA +1 917 227 2181',
      footerCo: 'WhatsApp Colombia +57 324 275 4406', footerUs: 'WhatsApp USA +1 917 227 2181',
      tooltipCo: '¿Necesitas ayuda? Escríbenos', tooltipUs: 'Need help? Message us (USA)'
    },
    faq: {
      tag: 'Preguntas frecuentes', title: 'Lo que suelen preguntarnos',
      q1: '¿Atienden empresas en Colombia y en Estados Unidos?',
      a1: 'Sí. Atendemos pymes en los dos países, de forma principalmente remota, en español y en inglés. Para negocios en EE. UU. trabajamos con QuickBooks y llevamos el sales & use tax.',
      q2: '¿Cómo empiezo?',
      a2: 'Agenda una llamada gratis de 20 minutos o déjanos tus datos en el formulario. Te respondemos en menos de 24 horas.',
      q3: '¿Cuánto cuestan los servicios?',
      a3: 'Depende del tamaño de tu empresa, del volumen de transacciones y del alcance. Lo cotizamos a la medida después de la llamada inicial, sin compromiso.',
      q4: '¿Puedo contratar un solo servicio?',
      a4: 'Sí. Cada servicio se contrata por separado; muchas empresas empiezan por la contabilidad o por automatizar un proceso puntual.',
      q5: '¿Pueden trabajar con mi contador o CPA actual?',
      a5: 'Sí. Podemos encargarnos de toda la contabilidad o apoyar a tu contador o CPA en lo que hoy no alcanza a cubrir.',
      q6: '¿Quién atiende mi empresa?',
      a6: 'Wilyer Arias, Contador Público con Especialización en Finanzas y más de 12 años de experiencia, certificado como QuickBooks Online Advanced ProAdvisor.'
    },
    planes: {
      tag: 'Planes', title: 'Precios de referencia',
      subtitle: 'Valores de partida: el precio final depende del volumen y del alcance, y lo confirmamos después de la llamada inicial.',
      from: 'Desde', perMonth: '/ mes', custom: 'Cotización a la medida', cta: 'Agenda una llamada'
    },
    casos: {
      tag: 'Casos de éxito', title: 'Resultados con empresas reales',
      situacion: 'La situación', hicimos: 'Qué hicimos', resultado: 'El resultado'
    },
    herr: {
      calc: {
        metaTitle: 'Calculadora de ahorro por automatización | Growing Solutions',
        metaDesc: 'Calcula cuántas horas y cuánto dinero podría ahorrar tu pyme al automatizar tareas manuales de contabilidad y administración. Estimación gratuita.',
        tag: 'Calculadora de ahorro',
        title: '¿Cuánto te cuestan las tareas manuales?',
        intro: 'Escribe cuántas horas dedica tu equipo a tareas repetitivas y cuánto cuesta una hora de trabajo. Verás una estimación de lo que podrías ahorrar al mes y al año.',
        noscript: 'Esta calculadora necesita JavaScript. Si prefieres, agenda una llamada y la hacemos juntos.'
      },
      diag: {
        metaTitle: 'Diagnóstico gratis de automatización para pymes | Growing Solutions',
        metaDesc: 'Responde 8 preguntas sobre tus procesos contables y administrativos y recibe al instante tus oportunidades de automatización. Gratis y sin registro.',
        tag: 'Diagnóstico de automatización',
        title: 'Descubre qué procesos de tu empresa conviene automatizar',
        intro: '8 preguntas, 2 minutos y sin registro. Al final verás tus oportunidades de mejora por área.',
        noscript: 'Este diagnóstico necesita JavaScript. Si prefieres, agenda una llamada y lo hacemos juntos.'
      },
      band: {
        title: 'Herramientas gratis para tu empresa',
        calc: 'Calcula tu ahorro',
        calcDesc: 'Horas y dinero que podrías recuperar automatizando tareas manuales.',
        diag: 'Haz el diagnóstico',
        diagDesc: '8 preguntas para saber qué procesos conviene automatizar primero.'
      }
    },
    blog: {
      metaTitle: 'Blog de contabilidad y finanzas para pymes | Growing Solutions',
      tag: 'Blog', title: 'Ideas para ordenar las finanzas de tu pyme',
      intro: 'Contabilidad, impuestos, flujo de caja y automatización explicados en lenguaje claro.',
      soon: 'Muy pronto publicaremos aquí nuestros primeros artículos.', back: 'Todos los artículos'
    },
    recursos: {
      metaTitle: 'Recursos gratis para pymes | Growing Solutions',
      tag: 'Recursos gratis', title: 'Herramientas gratis para ordenar las finanzas de tu pyme',
      intro: 'Déjanos tu nombre y correo y descarga la plantilla al instante. También te la enviamos por correo.',
      submit: 'Descargar gratis', download: 'Descargar',
      successTitle: '¡Listo! Tu descarga está aquí', successText: 'También te enviamos el enlace a tu correo.',
      soon: 'Muy pronto publicaremos aquí plantillas y guías gratuitas. Mientras tanto, agenda una llamada o escríbenos por WhatsApp.'
    },
    pagina: {
      back: 'Todos los servicios',
      problemaTitle: 'El problema', solucionTitle: 'Cómo lo resolvemos',
      entregablesTitle: 'Qué recibes', faqTitle: 'Preguntas frecuentes',
      ctaTag: 'Siguiente paso', ctaTitle: '¿Hablamos de tu caso?',
      ctaText: 'En una llamada gratis de 20 minutos revisamos tu situación y te decimos por dónde empezar. Sin compromiso.',
      whatsapp: 'Escríbenos por WhatsApp'
    },
    cookies: {
      text: 'Usamos cookies de analítica (Google Analytics y Meta) para medir las visitas y mejorar el sitio. Solo se activan si las aceptas.',
      policy: 'Más información', accept: 'Aceptar', reject: 'Rechazar'
    },
    meta: { title: 'Growing Solutions — Contabilidad, finanzas e IA para pymes en Colombia y EE. UU.' }
  },
  en: {
    lang: { esLabel: 'Español', enLabel: 'English' },
    nav: {
      servicios: 'Services', nosotros: 'About Us', metodologia: 'Methodology', contacto: 'Contact',
      hamburgerAria: 'Menu'
    },
    brand: { tagline: 'Evolving finance, empowering technology' },
    hero: {
      badge: 'Strategic partner for small and medium-sized businesses in Colombia and the United States',
      titleL1: 'Your books up to date and your processes', titleHighlight: 'on autopilot', titleL2: '— no in-house team required',
      subtitle: 'Accounting, finance and AI for small businesses in Colombia and the U.S., led by a senior accountant who also builds automations.',
      ctaPrimary: 'Book a free 20‑minute call', ctaSecondary: 'Discover Our Services', scroll: 'Discover more'
    },
    heroCard: {
      chip1: 'Public Accountant · 12+ years', chip2: 'QuickBooks Advanced ProAdvisor', chip3: 'Service in Spanish and English'
    },
    stats: {
      benefit1: 'Direct access to a senior accountant', benefit2: 'Response in under 24 hours',
      benefit3: 'Service in Spanish and English', benefit4: 'Colombia and the United States'
    },
    servicios: {
      tag: 'Our Services', titleL1: 'Complete solutions to', titleL2: 'grow your business',
      subtitle: 'A solid foundation of accounting and finance, plus an accelerator of automation and artificial intelligence so your business grows without growing its manual work.',
      more: 'See the service',
      baseTag: 'The foundation',
      baseDesc: 'Accounting and finance: your numbers in order and under control.',
      accelTag: 'The accelerator',
      accelDesc: 'Automation and artificial intelligence: operations that move on their own.',
      card1: {
        title: 'Accounting',
        desc: 'Your numbers in order, every month. We handle your full bookkeeping so you decide with real, up-to-date information.',
        li1: 'Your books closed every month, no backlog', li2: 'Your bank accounts reconciled, no unexplained differences', li3: 'Your taxes filed on time, no penalties', li4: 'Financial statements ready for your bank or partners'
      },
      card2: {
        title: 'Financial Services',
        desc: 'Clarity on the health of your business: you know how much cash you have, how much you will have and where it is going.',
        li1: 'Your cash flow updated every Monday, no Excel needed', li2: 'Know what you can spend before you spend it', li3: 'A realistic budget to measure your year', li4: 'Clear indicators to decide, not just reports'
      },
      card3: {
        title: 'Process Automation',
        desc: 'We remove the repetitive work: we connect the tools you already use so information moves on its own.',
        li1: 'Your invoices flow into your books automatically', li2: 'Your tools connected: each piece of data is entered once', li3: 'Reminders and reports that go out on their own', li4: 'Fewer hours on tasks that do not need a person'
      },
      card4: {
        title: 'AI-Powered Development',
        desc: 'Custom tools powered by artificial intelligence: dashboards, internal apps and assistants built for your business, with no development team to hire.',
        li1: 'A dashboard with your key numbers, always up to date', li2: 'An AI assistant that answers your customers', li3: 'Internal apps built around the way you work', li4: 'Your systems connected to each other'
      }
    },
    about: {
      tag: 'Who\'s behind it',
      role: 'Public Accountant (Colombia) · Finance Specialist · Head of Growing Solutions',
      bio: 'Public Accountant with more than 12 years of experience in corporate accounting, financial analysis and financial management in banking, corporate and international environments. I prepare financial statements under IFRS, budgets and projections, and handle tax compliance. I use Power BI, SQL and artificial intelligence to automate reports and processes, so small businesses in Colombia and the U.S. keep their numbers up to date without an in-house team.',
      credLabel: 'Education and certifications',
      cred1: 'Public Accounting degree — Universidad de San Buenaventura Medellín',
      cred2: 'Graduate specialization in Finance — Instituto Tecnológico Metropolitano',
      cred3: 'QuickBooks Online Advanced ProAdvisor — Intuit',
      cred4: 'Certificate in Databases and Business Intelligence (SQL Server)',
      expLabel: 'Experience',
      exp1Role: 'Chief Financial Officer',
      exp1Org: 'Servintegral Multiservicios · Colombia · 2025',
      exp1Desc: 'Led accounting, treasury, payroll and taxes; cut the treasury cycle by 15%.',
      exp2Role: 'Financial Accountant (freelance)',
      exp2Org: 'Believe and Belong Pty Ltd · Australia · 2023–2026',
      exp2Desc: 'Automated financial reporting with SQL and Power BI, cutting report generation time by 40%.',
      exp3Role: 'Administrative Analyst',
      exp3Org: 'Bancolombia · Colombia · 2014–2021',
      exp3Desc: 'Reconciliations and financial analysis in the mortgage division; automated the monthly closing reports.',
      exp4Role: 'Accounting roles',
      exp4Org: 'Importadoras Asociadas, Experto Seguridad, Hotel Dann Carlton · 2008–2014',
      exp4Desc: 'Accruals, bank reconciliations, taxes and month-end closings.',
      expNote: 'Results achieved in those roles.',
      toolsLabel: 'Tools I work with',
      langs: 'Spanish (native) · English (B2)',
      linkedin: 'View LinkedIn profile'
    },
    nosotros: {
      tag: 'Why Choose Us?', titleL1: 'Your strategic partner', titleL2: 'to grow',
      subtitle: "We're not just providers — we're a team combining financial, accounting and technology expertise to offer you practical solutions and measurable results.",
      feature1: { title: 'No need for an in-house team', desc: 'Access accountants, financial analysts and developers without hiring internally.' },
      feature2: { title: 'Built for SMEs in Colombia and the U.S.', desc: 'Services adapted to the reality and budget of small businesses in both markets.' },
      feature3: { title: 'Fast, measurable results', desc: 'Agile implementations with visible impact from the very first weeks.' },
      feature4: { title: 'Ongoing support', desc: "We don't leave you on your own — we accompany, optimize and scale with you." }
    },
    metodologia: {
      tag: 'Our Methodology', titleL1: 'From diagnosis to results', titleL2: 'in four steps',
      subtitle: 'A clear, transparent process centered on your business — without technical complications.',
      step1: { title: 'Diagnosis', desc: 'We analyze your current operations, identify improvement opportunities and understand your business goals.' },
      step2: { title: 'Custom Proposal', desc: 'We design a personalized solution with a clear implementation plan, timeline and defined costs.' },
      step3: { title: 'Implementation', desc: 'We execute the solution swiftly. You keep operating while we take care of everything.' },
      step4: { title: 'Support & Evolution', desc: 'We provide ongoing support, optimization and scaling as your business grows.' }
    },
    contacto: {
      tag: 'Schedule Your Consultation', titleL1: 'Ready to', titleHighlight: 'professionalize', titleL2: 'your business?',
      subtitle: 'Tell us about your business and within 24 hours one of our advisors will get in touch with you. No obligation.'
    },
    form: {
      labelName: 'Name', labelPhone: 'WhatsApp or phone', labelEmail: 'Email',
      labelCompany: 'Company name', labelCountry: 'Country',
      labelService: 'Service of interest', labelInfo: 'Message',
      phName: 'Your full name', phPhone: 'e.g. +1 917 555 0123', phEmail: 'email@yourcompany.com',
      phCompany: 'Your company name',
      phInfo: 'Tell us about your business, your main challenges or what kind of help you need...',
      submit: 'Send request →', note: 'No obligation. We reply within 24h.',
      errRequired: 'Please complete all required fields (*).',
      errEmail: 'Please enter a valid email address.',
      errPhone: 'Please enter a valid WhatsApp or phone number (at least 7 digits).',
      errNotConfigured: 'The form is not configured yet. Please contact the administrator.',
      sending: 'Sending...',
      success: 'We received your request! An advisor will contact you within 24 hours.',
      successTitle: 'We received your request!',
      successNext: "We'll reach out within 24 hours by email or WhatsApp. If you'd rather not wait, book a free 20-minute call now.",
      successCta: 'Book a free 20‑minute call',
      errNetwork: 'The form could not be sent. Check your connection and try again.',
      errRateLimit: 'We received several requests from your connection. Please try later or message us on WhatsApp.',
      consent: 'I authorise Growing Solutions to process my personal data in order to contact me and send me information about its services, in accordance with the',
      consentLink: 'Personal Data Processing Policy',
      errConsent: 'To send your request you must authorise the processing of your personal data.'
    },
    common: { optional: '(optional)' },
    service: {
      placeholder: 'How can we help you?', opt1: 'Accounting Services', opt2: 'Financial Services',
      opt3: 'Process Automation', opt4: 'AI-Powered Development'
    },
    country: { placeholder: 'Select your country', co: 'Colombia', us: 'United States', other: 'Other' },
    footer: {
      tagline: 'Comprehensive accounting, finance, automation and technology solutions for microbusinesses and SMEs in Colombia and the United States.',
      servicesHeading: 'Services', companyHeading: 'Company', contactHeading: 'Contact Us',
      linkAutomatizacion: 'Automation', linkUs: 'U.S. businesses', country: 'Colombia and the United States',
      copyright: '© 2026 Growing Solutions. All rights reserved.',
      bottomTagline: "Made with dedication for your business's growth.",
      privacy: 'Personal Data Processing Policy'
    },
    wa: {
      coShort: 'Colombia', usShort: 'USA',
      coAria: 'WhatsApp Colombia +57 324 275 4406', usAria: 'WhatsApp USA +1 917 227 2181',
      ctaMobileCo: 'WhatsApp Colombia +57 324 275 4406', ctaMobileUs: 'WhatsApp USA +1 917 227 2181',
      footerCo: 'WhatsApp Colombia +57 324 275 4406', footerUs: 'WhatsApp USA +1 917 227 2181',
      tooltipCo: 'Need help? Message us (Colombia)', tooltipUs: 'Need help? Message us'
    },
    faq: {
      tag: 'Frequently asked questions', title: 'What people usually ask us',
      q1: 'Do you serve businesses in Colombia and the United States?',
      a1: 'Yes. We serve small businesses in both countries, mostly remotely, in Spanish and English. For U.S. businesses we work in QuickBooks and handle sales & use tax.',
      q2: 'How do I get started?',
      a2: 'Book a free 20-minute call or leave your details in the form. We reply within 24 hours.',
      q3: 'How much do your services cost?',
      a3: 'It depends on your company size, transaction volume and scope. We quote it after the first call, with no obligation.',
      q4: 'Can I hire just one service?',
      a4: 'Yes. Each service is hired separately; many businesses start with accounting or by automating one specific process.',
      q5: 'Can you work with my current accountant or CPA?',
      a5: 'Yes. We can take over all of your accounting or support your accountant or CPA with what they cannot cover today.',
      q6: 'Who will work on my business?',
      a6: 'Wilyer Arias, a Public Accountant with a graduate specialization in Finance and more than 12 years of experience, certified as a QuickBooks Online Advanced ProAdvisor.'
    },
    planes: {
      tag: 'Plans', title: 'Reference pricing',
      subtitle: 'Starting prices: the final price depends on volume and scope, and we confirm it after the first call.',
      from: 'From', perMonth: '/ month', custom: 'Custom quote', cta: 'Book a call'
    },
    casos: {
      tag: 'Success stories', title: 'Results with real businesses',
      situacion: 'The situation', hicimos: 'What we did', resultado: 'The result'
    },
    herr: {
      calc: {
        metaTitle: 'Automation Savings Calculator | Growing Solutions',
        metaDesc: 'Estimate how many hours and how much money your small business could save by automating manual accounting and admin tasks. Free estimate.',
        tag: 'Savings calculator',
        title: 'How much do manual tasks cost you?',
        intro: 'Enter how many hours your team spends on repetitive tasks and what an hour of work costs. You will see an estimate of what you could save per month and per year.',
        noscript: 'This calculator needs JavaScript. If you prefer, book a call and we will do it together.'
      },
      diag: {
        metaTitle: 'Free Automation Assessment for Small Businesses | Growing Solutions',
        metaDesc: 'Answer 8 questions about your accounting and admin processes and instantly get your automation opportunities. Free, no sign-up.',
        tag: 'Automation assessment',
        title: 'Find out which processes in your business are worth automating',
        intro: '8 questions, 2 minutes, no sign-up. At the end you will see your improvement opportunities by area.',
        noscript: 'This assessment needs JavaScript. If you prefer, book a call and we will do it together.'
      },
      band: {
        title: 'Free tools for your business',
        calc: 'Calculate your savings',
        calcDesc: 'Hours and money you could recover by automating manual tasks.',
        diag: 'Take the assessment',
        diagDesc: '8 questions to find out which processes to automate first.'
      }
    },
    blog: {
      metaTitle: 'Accounting and Finance Blog for Small Businesses | Growing Solutions',
      tag: 'Blog', title: 'Ideas to get your small business finances in order',
      intro: 'Accounting, taxes, cash flow and automation explained in plain language.',
      soon: 'Our first articles are coming here soon.', back: 'All articles'
    },
    recursos: {
      metaTitle: 'Free Resources for Small Businesses | Growing Solutions',
      tag: 'Free resources', title: 'Free tools to get your small business finances in order',
      intro: 'Leave your name and email and download the template instantly. We also send it to your inbox.',
      submit: 'Download for free', download: 'Download',
      successTitle: 'Done! Your download is here', successText: 'We also sent the link to your email.',
      soon: 'Free templates and guides are coming here soon. In the meantime, book a call or message us on WhatsApp.'
    },
    pagina: {
      back: 'All services',
      problemaTitle: 'The problem', solucionTitle: 'How we solve it',
      entregablesTitle: 'What you get', faqTitle: 'Frequently asked questions',
      ctaTag: 'Next step', ctaTitle: 'Shall we talk about your case?',
      ctaText: 'In a free 20-minute call we review your situation and tell you where to start. No obligation.',
      whatsapp: 'Message us on WhatsApp'
    },
    cookies: {
      text: 'We use analytics cookies (Google Analytics and Meta) to measure visits and improve the site. They are only enabled if you accept.',
      policy: 'Learn more', accept: 'Accept', reject: 'Reject'
    },
    meta: { title: 'Growing Solutions — Accounting, Finance and AI for Small Businesses in Colombia and the U.S.' }
  }
};

const LANG_KEY = 'gs_lang';
let currentLang = getInitialLang();

function getInitialLang() {
  const param = new URLSearchParams(location.search).get('lang');
  if (param === 'es' || param === 'en') return param;
  // Páginas con idioma propio (p. ej. /us en inglés) ignoran la preferencia guardada
  const pageLang = document.body.dataset.defaultLang;
  if (pageLang === 'en') return pageLang;
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'es' || stored === 'en') return stored;
  return (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'es';
}

function t(key, lang) {
  lang = lang || currentLang;
  return key.split('.').reduce((o, k) => (o ? o[k] : undefined), translations[lang]);
}

function setLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'es';
  document.documentElement.lang = currentLang;
  localStorage.setItem(LANG_KEY, currentLang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.dataset.i18n);
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = t(el.dataset.i18nPlaceholder);
    if (v !== undefined) el.placeholder = v;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const v = t(el.dataset.i18nAria);
    if (v !== undefined) {
      el.setAttribute('aria-label', v);
      if (el.hasAttribute('title')) el.title = v;
    }
  });

  // Un solo número de WhatsApp por idioma: ES → Colombia, EN → USA
  // /us fija el WhatsApp de EE. UU. aunque la página se lea en español
  const waCountry = document.body.dataset.waCountry || ((currentLang === 'en') ? 'us' : 'co');
  document.querySelectorAll('[data-wa]').forEach(el => {
    const show = el.dataset.wa === waCountry;
    el.style.display = show ? '' : 'none';
    el.setAttribute('aria-hidden', String(!show));
  });

  const title = t('page.metaTitle') || t('meta.title');
  if (title) document.title = title;
  const desc = t('page.metaDesc');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (desc && metaDesc) metaDesc.content = desc;

  document.querySelectorAll('.lang-btn').forEach(b => {
    const active = b.dataset.lang === currentLang;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
}

document.querySelectorAll('.lang-btn').forEach(b => {
  b.addEventListener('click', () => setLanguage(b.dataset.lang));
});
registerPageTexts();
renderStats();
renderPlans();
renderCases();
setLanguage(currentLang);

// ── CONTENIDO EDITABLE (planes, casos, testimonios) ──
// Los textos bilingües de content/*.js se registran en `translations` bajo
// una clave propia para que el selector de idioma los cambie como al resto.
function registerText(key, value) {
  const set = (lang) => {
    const parts = key.split('.');
    let o = translations[lang];
    parts.slice(0, -1).forEach(p => { o = o[p] = o[p] || {}; });
    o[parts[parts.length - 1]] = (value && value[lang]) || '';
  };
  set('es');
  set('en');
  return key;
}

/** Crea un elemento con texto fijo o con una clave de traducción. */
function el(tag, className, { text, i18n } = {}) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (i18n) node.dataset.i18n = i18n;
  else if (text != null) node.textContent = text;
  return node;
}

// Declaraciones de función (no const): renderPlans() corre antes de esta línea
function formatCOP(n) { return '$' + Math.round(n).toLocaleString('es-CO') + ' COP'; }
function formatUSD(n) { return 'US$' + Math.round(n).toLocaleString('en-US'); }
function isPrice(n) { return typeof n === 'number' && n > 0; }

function renderPlans() {
  const section = document.getElementById('planes');
  const plans = window.GS_PLANES || [];
  // Sin ningún precio la sección no se publica (ver content/planes.js)
  if (!section || !plans.some(p => isPrice(p.desdeCOP) || isPrice(p.desdeUSD))) return;

  const grid = document.getElementById('plansGrid');
  plans.forEach((p, i) => {
    const base = 'dyn.planes.' + i;
    const card = el('div', 'plan-card fade-in visible');
    card.append(
      el('h3', 'plan-name', { i18n: registerText(base + '.nombre', p.nombre) }),
      el('p', 'plan-desc', { i18n: registerText(base + '.descripcion', p.descripcion) })
    );

    const price = el('div', 'plan-price');
    if (isPrice(p.desdeCOP) || isPrice(p.desdeUSD)) {
      price.append(el('span', 'plan-from', { i18n: 'planes.from' }));
      if (isPrice(p.desdeCOP)) price.append(el('strong', null, { text: formatCOP(p.desdeCOP) }));
      if (isPrice(p.desdeUSD)) price.append(el('strong', null, { text: formatUSD(p.desdeUSD) }));
      if (p.periodo === 'mes') price.append(el('span', 'plan-period', { i18n: 'planes.perMonth' }));
    } else {
      price.append(el('strong', null, { i18n: 'planes.custom' }));
    }
    card.append(price);

    const list = el('ul', 'plan-list');
    const items = (p.incluye && p.incluye.es) || [];
    items.forEach((_, n) => {
      list.append(el('li', null, { i18n: registerText(base + '.incluye.' + n, { es: p.incluye.es[n], en: (p.incluye.en || [])[n] }) }));
    });
    card.append(list);

    const cta = el('a', 'btn btn-ghost plan-cta', { i18n: 'planes.cta' });
    cta.href = '#contacto';
    cta.setAttribute('data-booking', '');
    card.append(cta);
    grid.append(card);
  });
  section.hidden = false;
}

function renderCases() {
  const section = document.getElementById('casos');
  if (!section) return;
  const cases = (window.GS_CASOS || []).filter(c => c && c.autorizado === true);
  const quotes = (window.GS_TESTIMONIOS || []).filter(t => t && t.autorizado === true && t.texto);
  if (!cases.length && !quotes.length) return;

  const casesGrid = document.getElementById('casesGrid');
  cases.forEach((c, i) => {
    const base = 'dyn.casos.' + i;
    const card = el('article', 'case-card fade-in visible');
    card.append(el('div', 'case-client', { text: c.cliente || '' }));
    [['situacion', 'casos.situacion'], ['hicimos', 'casos.hicimos'], ['resultado', 'casos.resultado']].forEach(([field, label]) => {
      card.append(
        el('h4', field === 'resultado' ? 'case-label case-label-result' : 'case-label', { i18n: label }),
        el('p', field === 'resultado' ? 'case-result' : null, { i18n: registerText(base + '.' + field, c[field]) })
      );
    });
    casesGrid.append(card);
  });
  casesGrid.hidden = !cases.length;

  const quotesGrid = document.getElementById('testimonialsGrid');
  quotes.forEach((q, i) => {
    const base = 'dyn.testimonios.' + i;
    const card = el('figure', 'quote-card fade-in visible');
    card.append(el('blockquote', null, { i18n: registerText(base + '.texto', q.texto) }));
    const who = el('figcaption', 'quote-author');
    // Foto solo desde el propio sitio: nada de URLs externas
    if (typeof q.foto === 'string' && q.foto.startsWith('/') && !q.foto.startsWith('//')) {
      const img = el('img');
      img.src = q.foto;
      img.alt = q.nombre || '';
      img.width = 48;
      img.height = 48;
      img.loading = 'lazy';
      who.append(img);
    }
    const meta = el('div');
    meta.append(el('strong', null, { text: q.nombre || '' }));
    const role = el('span');
    role.append(el('span', null, { i18n: registerText(base + '.cargo', q.cargo) }));
    if (q.empresa) role.append(document.createTextNode(' · ' + q.empresa));
    meta.append(role);
    who.append(meta);
    card.append(who);
    quotesGrid.append(card);
  });
  quotesGrid.hidden = !quotes.length;
  section.hidden = false;
}

// ── PÁGINAS DE SERVICIO ──
// <body data-page="contabilidad"> toma sus textos de content/paginas.js.
function registerPageTexts() {
  const tool = { calculadora: 'calc', diagnostico: 'diag' }[document.body.dataset.page];
  if (tool) {
    translations.es.page = translations.es.herr[tool];
    translations.en.page = translations.en.herr[tool];
    return;
  }
  if (document.body.dataset.page === 'recursos') {
    // Mismo filtro que el generador: solo recursos con archivo
    const items = (window.GS_RECURSOS || []).filter(r => r.archivo);
    ['es', 'en'].forEach(lang => {
      translations[lang].page = {
        metaTitle: translations[lang].recursos.metaTitle,
        items: items.map(r => ({ titulo: r.titulo[lang], descripcion: r.descripcion[lang] }))
      };
    });
    return;
  }
  if (document.body.dataset.page === 'blog') {
    translations.es.page = { metaTitle: translations.es.blog.metaTitle };
    translations.en.page = { metaTitle: translations.en.blog.metaTitle };
    return;
  }
  // Un artículo conserva su propio título (está en un solo idioma)
  if (document.body.dataset.page === 'blog-post') {
    translations.es.page = translations.en.page = { metaTitle: document.title };
    return;
  }
  const page = window.GS_PAGES && window.GS_PAGES[document.body.dataset.page];
  if (!page) return;
  translations.es.page = page.es;
  translations.en.page = page.en;
}

// ── CIFRAS ──
// Vienen de content/stats.js. Solo se publican las verificadas; sin ninguna,
// la barra conserva los beneficios del HTML y el bloque visual sigue oculto.
// Las etiquetas se registran en `translations` para que cambien con el idioma.
function renderStats() {
  const verified = (window.GS_STATS || []).filter(s => s && s.verificada === true && s.valor);
  verified.forEach(s => {
    translations.es.statsData = translations.es.statsData || {};
    translations.en.statsData = translations.en.statsData || {};
    translations.es.statsData[s.id] = s.etiqueta.es;
    translations.en.statsData[s.id] = s.etiqueta.en;
  });

  const bar = verified.filter(s => s.ubicacion === 'barra').slice(0, 4);
  const grid = document.getElementById('statsGrid');
  if (grid && bar.length) {
    grid.replaceChildren(...bar.map(s => {
      const item = document.createElement('div');
      item.className = 'stat-item';
      const num = document.createElement('div');
      num.className = 'stat-number grad-text';
      num.textContent = s.valor;
      const label = document.createElement('div');
      label.className = 'stat-label';
      label.dataset.i18n = 'statsData.' + s.id;
      item.append(num, label);
      return item;
    }));
  }

  const main = verified.find(s => s.ubicacion === 'visual');
  const float = verified.find(s => s.ubicacion === 'visual-flotante');
  if (main) {
    document.getElementById('vcMainValue').textContent = main.valor;
    document.getElementById('vcMainLabel').dataset.i18n = 'statsData.' + main.id;
    if (float) {
      document.getElementById('vcFloatValue').textContent = float.valor;
      document.getElementById('vcFloatLabel').dataset.i18n = 'statsData.' + float.id;
      document.getElementById('vcFloat').hidden = false;
    }
    document.getElementById('valueVisual').hidden = false;
    document.getElementById('valueGrid').classList.remove('no-visual');
  }
}

// Intersection Observer - fade in sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Animate bar fill when visible
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animate');
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const barFill = document.getElementById('barFill');
if (barFill) barObserver.observe(barFill);

// Generate upward particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; particlesContainer && i < 16; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const h = 40 + Math.random() * 80;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    bottom: ${-h}px;
    height: ${h}px;
    opacity: 0;
    animation-duration: ${6 + Math.random() * 8}s;
    animation-delay: ${Math.random() * 10}s;
  `;
  particlesContainer.appendChild(p);
}

// Nav scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
function closeMobile() {
  if (!hamburger) return;
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobile);
});

// ── CONFIGURACIÓN PÚBLICA ──
// /api/config entrega el enlace de agenda y los IDs de analítica desde las
// variables de entorno de Vercel. Sin enlace de agenda, los botones
// [data-booking] conservan su destino de respaldo (#contacto, el formulario).
// En window para que analytics.js reutilice la misma petición.
window.siteConfig = fetch('/api/config')
  .then(res => (res.ok ? res.json() : {}))
  .catch(() => ({}));

window.siteConfig.then(cfg => {
  if (!cfg.bookingUrl) return;
  document.querySelectorAll('[data-booking]').forEach(a => {
    a.href = cfg.bookingUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });
});

// ── EVENTOS DE MEDICIÓN ──
// gsTrack lo define analytics.js; sin consentimiento no envía nada.
const track = (event, params) => { if (window.gsTrack) window.gsTrack(event, params); };

document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  if (link.hasAttribute('data-booking')) {
    track('click_booking', { link_url: link.href });
  } else if (link.href.startsWith('https://wa.me/57')) {
    track('click_whatsapp_co');
  } else if (link.href.startsWith('https://wa.me/1')) {
    track('click_whatsapp_us');
  }
});

// ── LEAD FORM ──
// El servidor valida y guarda en Supabase (api/lead.js). Mismo origen: la clave
// de la base nunca pasa por el navegador.
const LEAD_ENDPOINT = '/api/lead';

const leadForm = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Limita la longitud enviada aunque el atributo maxlength sea manipulado en el navegador
const clamp = (value, max) => String(value == null ? '' : value).trim().slice(0, max);

if (leadForm) leadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot: si está relleno es un bot -> no se envía nada, respuesta neutra
  if (document.getElementById('f-hp').value.trim() !== '') {
    showSuccess();
    return;
  }

  const name           = clamp(document.getElementById('f-name').value, 80);
  const phone          = clamp(document.getElementById('f-phone').value, 25);
  const email          = clamp(document.getElementById('f-email').value, 120);
  const company        = clamp(document.getElementById('f-company').value, 120);
  const country        = clamp(document.getElementById('f-country').value, 10);
  const service        = clamp(document.getElementById('f-service').value, 60);
  const additionalInfo = clamp(document.getElementById('f-info').value, 2000);

  if (!name || !email || !phone || !service) {
    showStatus('error', t('form.errRequired'));
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('error', t('form.errEmail'));
    return;
  }
  // Mismo criterio que el servidor (api/lead.js): solo dígitos y signos, 7+ dígitos
  if (!/^[0-9+()\-.\s]*$/.test(phone) || phone.replace(/\D/g, '').length < 7) {
    showStatus('error', t('form.errPhone'));
    return;
  }
  // Ley 1581 de 2012: sin autorización expresa no se envía nada.
  if (!document.getElementById('f-consent').checked) {
    showStatus('error', t('form.errConsent'));
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = t('form.sending');
  formStatus.className = 'form-status';

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, phone, email, company, country, service, additionalInfo,
        lang: currentLang,
        consent: true,
        companyFax: document.getElementById('f-hp').value
      })
    });
    // Respuesta real del servidor: solo es exito si el lead quedo guardado.
    if (res.status === 201) {
      track('generate_lead', { lead_type: 'formulario', service });
      showSuccess();
    } else if (res.status === 400) {
      const { error } = await res.json().catch(() => ({}));
      showStatus('error', t(/telefono/.test(error || '') ? 'form.errPhone' : 'form.errRequired'));
    } else if (res.status === 422) {
      showStatus('error', t('form.errConsent'));
    } else if (res.status === 429) {
      showStatus('error', t('form.errRateLimit'));
    } else if (res.status === 503) {
      showStatus('error', t('form.errNotConfigured'));
    } else {
      showStatus('error', t('form.errNetwork'));
    }
  } catch (err) {
    showStatus('error', t('form.errNetwork'));
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t('form.submit');
  }
});

// ── DESCARGA DE RECURSOS (/recursos) ──
const resourceForm = document.getElementById('resourceForm');
if (resourceForm) resourceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('r-status');
  const button = document.getElementById('r-submit');
  const say = (type, msg) => { status.className = 'form-status ' + type; status.textContent = msg; };

  const name = clamp(document.getElementById('r-name').value, 80);
  const email = clamp(document.getElementById('r-email').value, 120);
  const resource = (resourceForm.querySelector('input[name="resource"]:checked') || {}).value;
  if (!name || !email || !resource) return say('error', t('form.errRequired'));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say('error', t('form.errEmail'));
  if (!document.getElementById('r-consent').checked) return say('error', t('form.errConsent'));

  button.disabled = true;
  button.textContent = t('form.sending');
  try {
    const res = await fetch('/api/recurso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, resource, lang: currentLang, consent: true,
        companyFax: document.getElementById('r-hp').value
      })
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 201 && data.url) {
      track('generate_lead', { lead_type: 'recurso', resource });
      const link = document.getElementById('r-download');
      link.href = data.url;
      resourceForm.hidden = true;
      const panel = document.getElementById('r-success');
      panel.hidden = false;
      panel.focus();
    } else if (res.status === 422) {
      say('error', t('form.errConsent'));
    } else if (res.status === 429) {
      say('error', t('form.errRateLimit'));
    } else if (res.status === 400) {
      say('error', t('form.errRequired'));
    } else {
      say('error', t('form.errNetwork'));
    }
  } catch {
    say('error', t('form.errNetwork'));
  } finally {
    button.disabled = false;
    button.textContent = t('recursos.submit');
  }
});

// Reemplaza el formulario por el siguiente paso: esperar el contacto o agendar ya
function showSuccess() {
  leadForm.reset();
  leadForm.hidden = true;
  formStatus.className = 'form-status';
  const panel = document.getElementById('formSuccess');
  panel.hidden = false;
  panel.focus();
}

function showStatus(type, message) {
  formStatus.className = 'form-status ' + type;
  formStatus.style.display = 'block';
  formStatus.textContent = message;
}
