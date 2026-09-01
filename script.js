// ── I18N ──
const translations = {
  es: {
    lang: { esLabel: 'Español', enLabel: 'English' },
    nav: {
      servicios: 'Servicios', nosotros: 'Nosotros', metodologia: 'Metodología', contacto: 'Contacto',
      hamburgerAria: 'Menú'
    },
    brand: { tagline: 'Servicios Contables, Financieros y Desarrollos con IA' },
    hero: {
      badge: 'Aliado estratégico para pequeñas y medianas Empresas en Colombia y Estados Unidos',
      titleL1: 'Impulsa tu empresa', titleL2: 'con soluciones', titleHighlight: 'integrales',
      subtitle: 'Ayudamos a micro, pequeñas y medianas empresas a organizar su operación, mejorar su control financiero y automatizar procesos — sin necesidad de un equipo interno especializado.',
      ctaPrimary: 'Solicitar Asesoría Gratis', ctaSecondary: 'Conoce Nuestros Servicios', scroll: 'Descubre más'
    },
    stats: {
      item1: 'Empresas asesoradas en Colombia y Estados Unidos', item2: 'Reducción en tareas manuales',
      item3: 'Más rápido en reportes financieros', item4: 'Enfocados en pymes y microempresas'
    },
    servicios: {
      tag: 'Nuestros Servicios', titleL1: 'Soluciones integrales para', titleL2: 'hacer crecer tu negocio',
      subtitle: 'Cuatro líneas de servicio diseñadas para que tu empresa opere de forma profesional, eficiente y escalable.',
      card1: {
        title: 'Contabilidad',
        desc: 'Mantén tus números en orden con un servicio contable confiable. Nos encargamos de la gestión contable integral para que tomes decisiones basadas en información real y actualizada.',
        li1: 'Registros contables diarios', li2: 'Conciliaciones Bancarias', li3: 'Impuestos', li4: 'Cierres contables', li5: 'Estados financieros'
      },
      card2: {
        title: 'Servicios Financieros',
        desc: 'Obtén claridad sobre la salud de tu negocio. Te ayudamos con análisis financiero, planeación de flujo de caja, presupuestos e indicadores clave para un control total de tus finanzas.',
        li1: 'Flujo de caja', li2: 'Presupuestos y proyecciones', li3: 'Indicadores KPI', li4: 'Análisis financiero'
      },
      card3: {
        title: 'Automatización de Procesos',
        desc: 'Elimina tareas repetitivas y ahorra tiempo. Diseñamos flujos de trabajo automatizados que conectan tus herramientas, optimizan tu operación y liberan a tu equipo para lo importante.',
        li1: 'Workflows', li2: 'Integraciones', li3: 'Procesos digitales', li4: 'Eficiencia'
      },
      card4: {
        title: 'Desarrollos a la Medida',
        desc: 'Soluciones de software personalizadas para tu negocio. Desde aplicaciones web hasta sistemas internos, construimos la tecnología que necesitas sin que tengas un equipo de desarrollo propio.',
        li1: 'Aplicaciones web', li2: 'Sistemas a medida', li3: 'Dashboards', li4: 'APIs'
      }
    },
    nosotros: {
      tag: '¿Por Qué Elegirnos?', titleL1: 'Tu aliado estratégico', titleL2: 'para crecer',
      subtitle: 'No somos solo proveedores — somos un equipo que combina experiencia financiera, contable y tecnológica para ofrecerte soluciones prácticas y resultados medibles.',
      feature1: { title: 'Sin necesidad de equipo interno', desc: 'Accede a contadores, analistas financieros y desarrolladores sin contratar internamente.' },
      feature2: { title: 'Pensado para pymes en Colombia', desc: 'Servicios adaptados a la realidad y presupuesto del mercado empresarial local.' },
      feature3: { title: 'Resultados rápidos y medibles', desc: 'Implementaciones ágiles con impacto visible desde las primeras semanas.' },
      feature4: { title: 'Acompañamiento continuo', desc: 'No te dejamos solo — te acompañamos, optimizamos y escalamos contigo.' },
      visual: {
        label1: 'Eficiencia Operativa', sub1: 'mejora promedio después de la implementación',
        label2: 'Horas ahorradas / mes', support: '● Soporte activo', status: 'En línea'
      }
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
      labelName: 'Nombre', labelPhone: 'Teléfono de contacto', labelEmail: 'Correo electrónico',
      labelCompany: 'Nombre de la empresa', labelWebsite: 'Página web', labelBudget: 'Presupuesto',
      labelService: 'Seleccione el Servicio', labelInfo: 'Información adicional',
      phName: 'Tu nombre completo', phPhone: 'Ej: 300 123 4567', phEmail: 'correo@tuempresa.com',
      phCompany: 'Nombre de tu empresa', phBudget: 'Escribe tu presupuesto',
      phInfo: 'Cuéntanos sobre tu negocio, tus principales retos o qué tipo de ayuda buscas...',
      submit: 'Enviar solicitud →', note: 'Sin compromiso. Te respondemos en menos de 24h.',
      errRequired: 'Por favor completa todos los campos requeridos (*).',
      errEmail: 'Por favor ingresa un correo electrónico válido.',
      errNotConfigured: 'El formulario aún no está configurado. Contacta al administrador.',
      sending: 'Enviando...',
      success: '¡Recibimos tu solicitud! Un asesor se pondrá en contacto contigo en menos de 24 horas.',
      errNetwork: 'No se pudo enviar el formulario. Verifica tu conexión e intenta de nuevo.'
    },
    common: { optional: '(opcional)' },
    service: {
      placeholder: '¿En qué podemos ayudarte?', opt1: 'Servicios Contables', opt2: 'Servicios Financieros',
      opt3: 'Automatización de Procesos', opt4: 'Desarrollos a la Medida'
    },
    footer: {
      tagline: 'Soluciones integrales en contabilidad, finanzas, automatización y tecnología para microempresas y pymes en Colombia.',
      servicesHeading: 'Servicios', companyHeading: 'Empresa', contactHeading: 'Contáctanos',
      linkAutomatizacion: 'Automatización', country: 'Colombia',
      copyright: '© 2026 Growing Solutions. Todos los derechos reservados.',
      bottomTagline: 'Hecho con dedicación para el crecimiento de tu empresa.'
    },
    wa: {
      coShort: 'Colombia', usShort: 'USA',
      coAria: 'WhatsApp Colombia +57 324 275 4406', usAria: 'WhatsApp USA +1 917 227 2181',
      ctaMobileCo: 'WhatsApp Colombia +57 324 275 4406', ctaMobileUs: 'WhatsApp USA +1 917 227 2181',
      footerCo: 'WhatsApp Colombia +57 324 275 4406', footerUs: 'WhatsApp USA +1 917 227 2181',
      tooltipCo: '¿Necesitas ayuda? Escríbenos', tooltipUs: 'Need help? Message us (USA)'
    },
    meta: { title: 'Growing Solutions — Soluciones Integrales para tu Empresa' }
  },
  en: {
    lang: { esLabel: 'Español', enLabel: 'English' },
    nav: {
      servicios: 'Services', nosotros: 'About Us', metodologia: 'Methodology', contacto: 'Contact',
      hamburgerAria: 'Menu'
    },
    brand: { tagline: 'Accounting, Financial and AI-Driven Development Services' },
    hero: {
      badge: 'Strategic partner for small and medium-sized businesses in Colombia and the United States',
      titleL1: 'Grow your business', titleL2: 'with complete', titleHighlight: 'solutions',
      subtitle: 'We help micro, small and medium-sized businesses organize their operations, improve financial control and automate processes — without needing a specialized in-house team.',
      ctaPrimary: 'Request a Free Consultation', ctaSecondary: 'Discover Our Services', scroll: 'Discover more'
    },
    stats: {
      item1: 'Businesses advised in Colombia', item2: 'Reduction in manual tasks',
      item3: 'Faster financial reporting', item4: 'Focused on SMEs and microbusinesses'
    },
    servicios: {
      tag: 'Our Services', titleL1: 'Complete solutions to', titleL2: 'grow your business',
      subtitle: 'Four service lines designed so your business operates professionally, efficiently and at scale.',
      card1: {
        title: 'Accounting',
        desc: 'Keep your numbers in order with a reliable accounting service. We handle full accounting management so you make decisions based on real, up-to-date information.',
        li1: 'Daily bookkeeping', li2: 'Bank reconciliations', li3: 'Taxes', li4: 'Financial closings', li5: 'Financial statements'
      },
      card2: {
        title: 'Financial Services',
        desc: 'Get clarity on the health of your business. We help you with financial analysis, cash flow planning, budgets and key indicators for full control of your finances.',
        li1: 'Cash flow', li2: 'Budgets and projections', li3: 'KPI indicators', li4: 'Financial analysis'
      },
      card3: {
        title: 'Process Automation',
        desc: 'Eliminate repetitive tasks and save time. We design automated workflows that connect your tools, optimize your operations and free your team for what matters.',
        li1: 'Workflows', li2: 'Integrations', li3: 'Digital processes', li4: 'Efficiency'
      },
      card4: {
        title: 'Custom Development',
        desc: 'Custom software solutions for your business. From web applications to internal systems, we build the technology you need without an in-house development team.',
        li1: 'Web applications', li2: 'Custom systems', li3: 'Dashboards', li4: 'APIs'
      }
    },
    nosotros: {
      tag: 'Why Choose Us?', titleL1: 'Your strategic partner', titleL2: 'to grow',
      subtitle: "We're not just providers — we're a team combining financial, accounting and technology expertise to offer you practical solutions and measurable results.",
      feature1: { title: 'No need for an in-house team', desc: 'Access accountants, financial analysts and developers without hiring internally.' },
      feature2: { title: 'Built for SMEs in Colombia', desc: 'Services adapted to the reality and budget of the local business market.' },
      feature3: { title: 'Fast, measurable results', desc: 'Agile implementations with visible impact from the very first weeks.' },
      feature4: { title: 'Ongoing support', desc: "We don't leave you on your own — we accompany, optimize and scale with you." },
      visual: {
        label1: 'Operational Efficiency', sub1: 'average improvement after implementation',
        label2: 'Hours saved / month', support: '● Active support', status: 'Online'
      }
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
      labelName: 'Name', labelPhone: 'Contact phone', labelEmail: 'Email',
      labelCompany: 'Company name', labelWebsite: 'Website', labelBudget: 'Budget',
      labelService: 'Select the Service', labelInfo: 'Additional information',
      phName: 'Your full name', phPhone: 'e.g. 300 123 4567', phEmail: 'email@yourcompany.com',
      phCompany: 'Your company name', phBudget: 'Enter your budget',
      phInfo: 'Tell us about your business, your main challenges or what kind of help you need...',
      submit: 'Send request →', note: 'No obligation. We reply within 24h.',
      errRequired: 'Please complete all required fields (*).',
      errEmail: 'Please enter a valid email address.',
      errNotConfigured: 'The form is not configured yet. Please contact the administrator.',
      sending: 'Sending...',
      success: 'We received your request! An advisor will contact you within 24 hours.',
      errNetwork: 'The form could not be sent. Check your connection and try again.'
    },
    common: { optional: '(optional)' },
    service: {
      placeholder: 'How can we help you?', opt1: 'Accounting Services', opt2: 'Financial Services',
      opt3: 'Process Automation', opt4: 'Custom Development'
    },
    footer: {
      tagline: 'Comprehensive accounting, finance, automation and technology solutions for microbusinesses and SMEs in Colombia.',
      servicesHeading: 'Services', companyHeading: 'Company', contactHeading: 'Contact Us',
      linkAutomatizacion: 'Automation', country: 'Colombia',
      copyright: '© 2026 Growing Solutions. All rights reserved.',
      bottomTagline: "Made with dedication for your business's growth."
    },
    wa: {
      coShort: 'Colombia', usShort: 'USA',
      coAria: 'WhatsApp Colombia +57 324 275 4406', usAria: 'WhatsApp USA +1 917 227 2181',
      ctaMobileCo: 'WhatsApp Colombia +57 324 275 4406', ctaMobileUs: 'WhatsApp USA +1 917 227 2181',
      footerCo: 'WhatsApp Colombia +57 324 275 4406', footerUs: 'WhatsApp USA +1 917 227 2181',
      tooltipCo: 'Need help? Message us (Colombia)', tooltipUs: 'Need help? Message us'
    },
    meta: { title: 'Growing Solutions — Complete Solutions for Your Business' }
  }
};

const LANG_KEY = 'gs_lang';
let currentLang = getInitialLang();

function getInitialLang() {
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
  const waCountry = (currentLang === 'en') ? 'us' : 'co';
  document.querySelectorAll('[data-wa]').forEach(el => {
    const show = el.dataset.wa === waCountry;
    el.style.display = show ? '' : 'none';
    el.setAttribute('aria-hidden', String(!show));
  });

  const title = t('meta.title');
  if (title) document.title = title;

  document.querySelectorAll('.lang-btn').forEach(b => {
    const active = b.dataset.lang === currentLang;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
}

document.querySelectorAll('.lang-btn').forEach(b => {
  b.addEventListener('click', () => setLanguage(b.dataset.lang));
});
setLanguage(currentLang);

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
for (let i = 0; i < 16; i++) {
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
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
function closeMobile() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMobile);
});

// ── LEAD FORM ──
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBaVuQfB1RV5BTWi_wxx8whpoJIgWcg-EaI-yeGryjVsZRxaxe0BMt7KdbMjt5Hn8emA/exec';

const leadForm = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Limita la longitud enviada aunque el atributo maxlength sea manipulado en el navegador
const clamp = (value, max) => String(value == null ? '' : value).trim().slice(0, max);

leadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Honeypot: si está relleno es un bot -> no se envía nada, respuesta neutra
  if (document.getElementById('f-hp').value.trim() !== '') {
    showStatus('success', t('form.success'));
    leadForm.reset();
    return;
  }

  const name           = clamp(document.getElementById('f-name').value, 80);
  const phone          = clamp(document.getElementById('f-phone').value, 25);
  const email          = clamp(document.getElementById('f-email').value, 120);
  const company        = clamp(document.getElementById('f-company').value, 120);
  const website        = clamp(document.getElementById('f-url').value, 200);
  const budget         = clamp(document.getElementById('f-budget').value, 60);
  const service        = clamp(document.getElementById('f-service').value, 60);
  const additionalInfo = clamp(document.getElementById('f-info').value, 2000);

  if (!name || !email || !budget || !service) {
    showStatus('error', t('form.errRequired'));
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('error', t('form.errEmail'));
    return;
  }
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('REEMPLAZA')) {
    showStatus('error', t('form.errNotConfigured'));
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = t('form.sending');
  formStatus.className = 'form-status';

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name, phone, email, company, website, budget, service, additionalInfo })
    });
    showStatus('success', t('form.success'));
    leadForm.reset();
  } catch (err) {
    showStatus('error', t('form.errNetwork'));
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t('form.submit');
  }
});

function showStatus(type, message) {
  formStatus.className = 'form-status ' + type;
  formStatus.style.display = 'block';
  formStatus.textContent = message;
}
