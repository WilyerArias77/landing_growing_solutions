/* Herramientas interactivas: calculadora de ahorro (/calculadora) y
 * diagnóstico de automatización (/diagnostico).
 *
 * Todo se construye con textContent (nunca innerHTML). Los textos viven aquí
 * en ES/EN y se repintan cuando cambia el idioma de la página (atributo lang
 * de <html>, que maneja script.js).
 *
 * Nada de cifras de clientes: la calculadora solo multiplica lo que escribe el
 * visitante, con un porcentaje automatizable que él mismo ajusta.
 */
(function () {
  'use strict';

  var lang = function () { return document.documentElement.lang === 'en' ? 'en' : 'es'; };
  var track = function (ev, params) { if (window.gsTrack) window.gsTrack(ev, params); };

  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function onLangChange(fn) {
    new MutationObserver(fn).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  // Enlace de agenda (BOOKING_URL vía /api/config); sin agenda, el formulario
  function bookingLink(label) {
    var a = make('a', 'btn btn-green', label);
    a.href = '/#contacto';
    a.setAttribute('data-booking', '');
    if (window.siteConfig) {
      window.siteConfig.then(function (cfg) {
        if (cfg && cfg.bookingUrl) {
          a.href = cfg.bookingUrl;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
      });
    }
    return a;
  }

  // ════════════════════════ CALCULADORA ════════════════════════

  var CALC = {
    es: {
      hours: 'Horas a la semana en tareas manuales',
      hoursHelp: 'Digitar facturas, conciliar, armar reportes, copiar datos entre herramientas…',
      rate: 'Costo de una hora de trabajo',
      rateHelp: 'Salario más prestaciones dividido entre las horas trabajadas.',
      currency: 'Moneda',
      pct: 'Porcentaje que se podría automatizar',
      pctHelp: 'Es un supuesto: ajústalo según tu caso. Lo afinamos juntos en el diagnóstico.',
      month: 'Al mes', year: 'Al año', hoursUnit: 'horas',
      disclaimer: 'Estimación aproximada basada solo en los datos que escribiste. No es una cotización ni una promesa de resultados: el ahorro real depende de tus procesos y se calcula en el diagnóstico.',
      emailTitle: 'Recibe el detalle por correo',
      name: 'Nombre', email: 'Correo electrónico',
      consent: 'Autorizo el tratamiento de mis datos personales para que Growing Solutions me contacte y me envíe información sobre sus servicios, conforme a la',
      consentLink: 'Política de Tratamiento de Datos',
      send: 'Enviarme el detalle', sending: 'Enviando...',
      sent: '¡Listo! Te enviamos el detalle a tu correo.',
      sentLater: 'Recibimos tus datos. Hoy ya te habíamos escrito, así que te enviaremos el detalle junto con nuestra respuesta.',
      err: 'No se pudo enviar. Revisa los datos e intenta de nuevo.',
      errConsent: 'Debes autorizar el tratamiento de tus datos.',
      errRate: 'Recibimos varias solicitudes desde tu conexión. Intenta más tarde.',
      cta: 'Agenda una llamada gratis de 20 minutos'
    },
    en: {
      hours: 'Hours per week on manual tasks',
      hoursHelp: 'Typing invoices, reconciling, building reports, copying data between tools…',
      rate: 'Cost of one hour of work',
      rateHelp: 'Salary plus benefits divided by hours worked.',
      currency: 'Currency',
      pct: 'Share that could be automated',
      pctHelp: 'This is an assumption: adjust it to your case. We refine it together in the assessment.',
      month: 'Per month', year: 'Per year', hoursUnit: 'hours',
      disclaimer: 'Rough estimate based only on the numbers you entered. It is not a quote or a promise of results: actual savings depend on your processes and are calculated in the assessment.',
      emailTitle: 'Get the details by email',
      name: 'Name', email: 'Email',
      consent: 'I authorise Growing Solutions to process my personal data in order to contact me and send me information about its services, in accordance with the',
      consentLink: 'Personal Data Processing Policy',
      send: 'Send me the details', sending: 'Sending...',
      sent: 'Done! We sent the details to your email.',
      sentLater: 'We received your details. We already emailed you today, so we will send the details with our reply.',
      err: 'It could not be sent. Check your details and try again.',
      errConsent: 'You must authorise the processing of your data.',
      errRate: 'We received several requests from your connection. Please try later.',
      cta: 'Book a free 20-minute call'
    }
  };

  // Mismo cálculo que api/calculadora.js (el servidor recalcula, no confía en esto)
  function calcular(hours, rate, pct) {
    var monthHours = hours * (pct / 100) * 52 / 12;
    return { monthHours: monthHours, monthMoney: monthHours * rate, yearHours: monthHours * 12, yearMoney: monthHours * rate * 12 };
  }

  function money(n, currency) {
    var loc = currency === 'USD' ? 'en-US' : 'es-CO';
    return (currency === 'USD' ? 'US$' : '$') + Math.round(n).toLocaleString(loc) + (currency === 'USD' ? '' : ' COP');
  }

  function initCalculadora(root) {
    var state = { hours: 10, rate: 50000, currency: 'COP', pct: 50 };
    var refs = {};

    function field(labelKey, helpKey, input) {
      var g = make('div', 'calc-field');
      var l = make('label');
      l.htmlFor = input.id;
      refs[labelKey] = l;
      g.appendChild(l);
      g.appendChild(input);
      if (helpKey) { var h = make('p', 'calc-help'); refs[helpKey] = h; g.appendChild(h); }
      return g;
    }

    function numberInput(id, value, min, max, step) {
      var i = make('input');
      i.type = 'number'; i.id = id; i.min = min; i.max = max; i.step = step; i.value = value;
      i.inputMode = 'decimal';
      return i;
    }

    var hours = numberInput('c-hours', state.hours, 0, 168, 1);
    var rate = numberInput('c-rate', state.rate, 0, 10000000, 1000);
    var currency = make('select'); currency.id = 'c-currency';
    ['COP', 'USD'].forEach(function (c) { var o = make('option', null, c); o.value = c; currency.appendChild(o); });
    var pct = make('input'); pct.type = 'range'; pct.id = 'c-pct'; pct.min = 10; pct.max = 90; pct.step = 5; pct.value = state.pct;
    var pctOut = make('output', 'calc-pct-value'); pctOut.htmlFor = 'c-pct';

    var form = make('div', 'calc-inputs');
    form.appendChild(field('hours', 'hoursHelp', hours));
    var rateRow = make('div', 'calc-row');
    rateRow.appendChild(field('rate', 'rateHelp', rate));
    rateRow.appendChild(field('currency', null, currency));
    form.appendChild(rateRow);
    var pctField = field('pct', 'pctHelp', pct);
    pctField.insertBefore(pctOut, pctField.children[1]);
    form.appendChild(pctField);

    var results = make('div', 'calc-results');
    results.setAttribute('aria-live', 'polite');
    function card(key) {
      var c = make('div', 'calc-card');
      var t = make('div', 'calc-card-label'); refs[key] = t;
      var h = make('div', 'calc-card-hours');
      var m = make('div', 'calc-card-money');
      c.appendChild(t); c.appendChild(h); c.appendChild(m);
      results.appendChild(c);
      return { h: h, m: m };
    }
    var mes = card('month');
    var ano = card('year');
    var disclaimer = make('p', 'calc-disclaimer'); refs.disclaimer = disclaimer;

    // Formulario para recibir el detalle por correo
    var mail = make('form', 'calc-email');
    mail.noValidate = true;
    var mailTitle = make('h3'); refs.emailTitle = mailTitle;
    var nameI = make('input'); nameI.type = 'text'; nameI.id = 'c-name'; nameI.maxLength = 80; nameI.autocomplete = 'name';
    var emailI = make('input'); emailI.type = 'email'; emailI.id = 'c-email'; emailI.maxLength = 120; emailI.autocomplete = 'email';
    var hp = make('input'); hp.type = 'text'; hp.tabIndex = -1; hp.autocomplete = 'off'; hp.className = 'hp-field'; hp.setAttribute('aria-hidden', 'true');
    var consent = make('input'); consent.type = 'checkbox'; consent.id = 'c-consent';
    var consentLabel = make('label'); consentLabel.htmlFor = 'c-consent';
    var consentText = make('span'); var consentA = make('a'); consentA.href = '/politica-datos'; consentA.target = '_blank'; consentA.rel = 'noopener';
    consentLabel.appendChild(consentText); consentLabel.appendChild(document.createTextNode(' ')); consentLabel.appendChild(consentA); consentLabel.appendChild(document.createTextNode('.'));
    var consentRow = make('div', 'consent-row'); consentRow.appendChild(consent); consentRow.appendChild(consentLabel);
    var sendBtn = make('button', 'btn-submit'); sendBtn.type = 'submit';
    var status = make('div', 'form-status'); status.setAttribute('role', 'alert');
    var mailGrid = make('div', 'form-grid');
    mailGrid.appendChild(field('name', null, nameI));
    mailGrid.appendChild(field('email', null, emailI));
    mail.appendChild(mailTitle); mail.appendChild(mailGrid); mail.appendChild(hp); mail.appendChild(consentRow);
    var row = make('div', 'form-submit-row'); row.appendChild(sendBtn); mail.appendChild(row); mail.appendChild(status);

    var ctaWrap = make('div', 'calc-cta');
    var cta = bookingLink('');
    ctaWrap.appendChild(cta);

    var layout = make('div', 'calc-layout');
    var left = make('div', 'calc-panel'); left.appendChild(form);
    var right = make('div', 'calc-panel calc-panel-results');
    right.appendChild(results); right.appendChild(disclaimer); right.appendChild(ctaWrap);
    layout.appendChild(left); layout.appendChild(right);
    root.appendChild(layout);
    root.appendChild(mail);

    function read() {
      var num = function (el, max) { var v = Number(el.value); return isFinite(v) ? Math.min(Math.max(v, 0), max) : 0; };
      state.hours = num(hours, 168);
      state.rate = num(rate, 10000000);
      state.currency = currency.value === 'USD' ? 'USD' : 'COP';
      state.pct = num(pct, 90);
    }

    function paint() {
      var T = CALC[lang()];
      Object.keys(refs).forEach(function (k) { if (T[k]) refs[k].textContent = T[k]; });
      consentText.textContent = T.consent;
      consentA.textContent = T.consentLink;
      cta.textContent = T.cta;
      if (!sendBtn.disabled) sendBtn.textContent = T.send;
      pctOut.textContent = state.pct + ' %';
      var r = calcular(state.hours, state.rate, state.pct);
      var fmtH = function (h) { return Math.round(h).toLocaleString(lang() === 'en' ? 'en-US' : 'es-CO') + ' ' + T.hoursUnit; };
      mes.h.textContent = fmtH(r.monthHours);
      mes.m.textContent = money(r.monthMoney, state.currency);
      ano.h.textContent = fmtH(r.yearHours);
      ano.m.textContent = money(r.yearMoney, state.currency);
    }

    [hours, rate, currency, pct].forEach(function (el) {
      el.addEventListener('input', function () { read(); paint(); });
    });
    onLangChange(paint);
    read(); paint();

    var used = false;
    mail.addEventListener('submit', function (e) {
      e.preventDefault();
      var T = CALC[lang()];
      var say = function (type, msg) { status.className = 'form-status ' + type; status.textContent = msg; };
      var name = nameI.value.trim().slice(0, 80);
      var email = emailI.value.trim().slice(0, 120);
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say('error', T.err);
      if (!consent.checked) return say('error', T.errConsent);
      read();
      sendBtn.disabled = true;
      sendBtn.textContent = T.sending;
      fetch('/api/calculadora', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name, email: email, lang: lang(), consent: true, companyFax: hp.value,
          hours: state.hours, rate: state.rate, currency: state.currency, pct: state.pct
        })
      }).then(function (res) {
        if (res.status === 201) {
          if (!used) track('generate_lead', { lead_type: 'calculadora' });
          used = true;
          return res.json().catch(function () { return {}; }).then(function (data) {
            say('success', data.enviado === false ? T.sentLater : T.sent);
            mail.reset();
          });
        } else if (res.status === 429) {
          say('error', T.errRate);
        } else if (res.status === 422) {
          say('error', T.errConsent);
        } else {
          say('error', T.err);
        }
      }).catch(function () {
        say('error', T.err);
      }).then(function () {
        sendBtn.disabled = false;
        sendBtn.textContent = CALC[lang()].send;
      });
    });
  }

  // ════════════════════════ DIAGNÓSTICO ════════════════════════

  // Cada respuesta vale 0 (gran oportunidad), 1 (oportunidad) o 2 (bien resuelto).
  // `area` decide en qué servicio cae la oportunidad.
  var QUESTIONS = [
    {
      area: 'automatizacion',
      es: { q: '¿Cómo entran tus facturas de compra y venta a la contabilidad?', o: ['Las digitamos a mano', 'Usamos un software, pero digitando', 'Se importan solas'],
        tip: 'Automatizar la captura de facturas: que lleguen solas a la contabilidad desde el correo o la facturación electrónica.' },
      en: { q: 'How do your sales and purchase invoices get into your books?', o: ['We type them by hand', 'We use software, but type them in', 'They are imported automatically'],
        tip: 'Automate invoice capture so invoices flow into your books from email or e-invoicing.' }
    },
    {
      area: 'contabilidad',
      es: { q: '¿Cada cuánto concilias tus cuentas bancarias?', o: ['No lo hacemos', 'Una vez al mes, a mano', 'Cada semana o de forma automática'],
        tip: 'Conciliaciones bancarias mensuales (o automáticas) para detectar a tiempo diferencias y errores.' },
      en: { q: 'How often do you reconcile your bank accounts?', o: ['We do not', 'Once a month, by hand', 'Weekly or automatically'],
        tip: 'Monthly (or automated) bank reconciliations to catch differences and errors early.' }
    },
    {
      area: 'contabilidad',
      es: { q: '¿Qué tan al día está tu contabilidad?', o: ['Más de dos meses atrasada', 'Un mes atrasada', 'Al día'],
        tip: 'Poner la contabilidad al día y fijar un calendario de cierre mensual.' },
      en: { q: 'How up to date are your books?', o: ['More than two months behind', 'One month behind', 'Up to date'],
        tip: 'Catch up your books and set a monthly closing calendar.' }
    },
    {
      area: 'finanzas',
      es: { q: '¿Sabes cuánta caja vas a tener el próximo mes?', o: ['No lo sé', 'Tengo un Excel que actualizo a veces', 'Sí, con un flujo de caja actualizado'],
        tip: 'Un flujo de caja proyectado para anticipar los meses en que te puede faltar dinero.' },
      en: { q: 'Do you know how much cash you will have next month?', o: ['I do not know', 'I have a spreadsheet I update sometimes', 'Yes, with an up-to-date cash flow'],
        tip: 'A projected cash flow to anticipate the months when cash may run short.' }
    },
    {
      area: 'finanzas',
      es: { q: '¿Cómo obtienes los reportes para tomar decisiones?', o: ['No tenemos reportes', 'Los armamos a mano en Excel', 'Un tablero que se actualiza solo'],
        tip: 'Un tablero de indicadores (por ejemplo en Power BI) que se actualice sin trabajo manual.' },
      en: { q: 'How do you get reports to make decisions?', o: ['We have no reports', 'We build them by hand in Excel', 'A dashboard that updates itself'],
        tip: 'A KPI dashboard (for example in Power BI) that updates with no manual work.' }
    },
    {
      area: 'automatizacion',
      es: { q: '¿Tus herramientas (correo, hojas de cálculo, facturación, banco) están conectadas?', o: ['No, copiamos datos entre ellas', 'Algunas sí, otras no', 'Sí, la información fluye sola'],
        tip: 'Conectar tus herramientas para que cada dato se escriba una sola vez.' },
      en: { q: 'Are your tools (email, spreadsheets, invoicing, bank) connected?', o: ['No, we copy data between them', 'Some are, some are not', 'Yes, information flows on its own'],
        tip: 'Connect your tools so each piece of data is entered only once.' }
    },
    {
      area: 'ia',
      es: { q: '¿Cómo respondes las preguntas repetidas de tus clientes?', o: ['Una persona responde todo', 'Con respuestas guardadas que copiamos', 'Con un asistente automático'],
        tip: 'Un asistente de IA que responda las preguntas frecuentes y tome los datos de contacto.' },
      en: { q: 'How do you answer your customers’ repeated questions?', o: ['One person answers everything', 'With saved replies we copy', 'With an automated assistant'],
        tip: 'An AI assistant that answers frequent questions and collects contact details.' }
    },
    {
      area: 'contabilidad',
      es: { q: '¿Cómo controlas las fechas de impuestos y pagos?', o: ['De memoria', 'En un calendario que actualizamos a mano', 'Con alertas automáticas'],
        tip: 'Un calendario tributario con alertas para presentar y pagar a tiempo, sin sanciones.' },
      en: { q: 'How do you track tax and payment deadlines?', o: ['From memory', 'In a calendar we update by hand', 'With automatic alerts'],
        tip: 'A tax calendar with alerts so you file and pay on time, with no penalties.' }
    }
  ];

  var AREAS = {
    contabilidad: { href: '/servicios/contabilidad', es: 'Contabilidad', en: 'Accounting' },
    finanzas: { href: '/servicios/finanzas', es: 'Finanzas', en: 'Finance' },
    automatizacion: { href: '/servicios/automatizacion', es: 'Automatización', en: 'Automation' },
    ia: { href: '/servicios/desarrollos-ia', es: 'Inteligencia artificial', en: 'Artificial intelligence' }
  };

  var DIAG = {
    es: {
      progress: function (n, t) { return 'Pregunta ' + n + ' de ' + t; },
      back: '← Anterior', restart: 'Empezar de nuevo',
      resultTitle: 'Tus oportunidades de mejora',
      resultIntro: 'Según tus respuestas, estas son las áreas donde más podrías ganar, de mayor a menor:',
      high: 'Prioridad alta', mid: 'Prioridad media', ok: 'Bien resuelto',
      none: 'Tus procesos ya están bien encaminados. En una llamada podemos buscar mejoras más finas.',
      see: 'Ver el servicio',
      note: 'Resultado orientativo, calculado solo con tus respuestas. En una llamada gratis lo revisamos con tu caso real.',
      cta: 'Agenda una llamada gratis de 20 minutos'
    },
    en: {
      progress: function (n, t) { return 'Question ' + n + ' of ' + t; },
      back: '← Back', restart: 'Start over',
      resultTitle: 'Your improvement opportunities',
      resultIntro: 'Based on your answers, these are the areas where you could gain the most, from highest to lowest:',
      high: 'High priority', mid: 'Medium priority', ok: 'Well handled',
      none: 'Your processes are already on track. On a call we can look for finer improvements.',
      see: 'See the service',
      note: 'Indicative result, based only on your answers. On a free call we review it with your real situation.',
      cta: 'Book a free 20-minute call'
    }
  };

  function initDiagnostico(root) {
    var answers = [];
    var step = 0;

    function render() {
      root.textContent = '';
      var L = lang(), T = DIAG[L];
      if (step < QUESTIONS.length) {
        var q = QUESTIONS[step][L];
        var card = make('div', 'diag-card');
        var bar = make('div', 'diag-progress');
        var fill = make('span');
        fill.style.width = Math.round((step / QUESTIONS.length) * 100) + '%';
        bar.appendChild(fill);
        card.appendChild(bar);
        card.appendChild(make('p', 'diag-step', T.progress(step + 1, QUESTIONS.length)));
        card.appendChild(make('h2', 'diag-question', q.q));
        var opts = make('div', 'diag-options');
        q.o.forEach(function (label, i) {
          var b = make('button', 'diag-option' + (answers[step] === i ? ' selected' : ''), label);
          b.type = 'button';
          b.addEventListener('click', function () {
            answers[step] = i;
            step++;
            if (step === QUESTIONS.length) track('diagnostic_complete');
            render();
          });
          opts.appendChild(b);
        });
        card.appendChild(opts);
        if (step > 0) {
          var back = make('button', 'diag-back', T.back);
          back.type = 'button';
          back.addEventListener('click', function () { step--; render(); });
          card.appendChild(back);
        }
        root.appendChild(card);
        var first = opts.querySelector('button');
        if (first && document.activeElement && root.contains(document.activeElement)) first.focus();
        return;
      }

      // Resultado: puntaje por área (0 = todo por hacer, 1 = bien resuelto)
      var totals = {};
      QUESTIONS.forEach(function (q, i) {
        var a = totals[q.area] || (totals[q.area] = { got: 0, max: 0, tips: [] });
        a.got += answers[i];
        a.max += 2;
        if (answers[i] < 2) a.tips.push({ text: q[L].tip, weight: 2 - answers[i] });
      });
      var ranked = Object.keys(totals).map(function (k) {
        return { key: k, score: totals[k].got / totals[k].max, tips: totals[k].tips.sort(function (a, b) { return b.weight - a.weight; }) };
      }).sort(function (a, b) { return a.score - b.score; });

      var res = make('div', 'diag-result');
      res.appendChild(make('h2', null, T.resultTitle));
      var pending = ranked.filter(function (r) { return r.tips.length; });
      res.appendChild(make('p', 'diag-intro', pending.length ? T.resultIntro : T.none));
      ranked.forEach(function (r) {
        var area = AREAS[r.key];
        var level = r.score < 0.5 ? 'high' : r.score < 1 ? 'mid' : 'ok';
        var box = make('div', 'diag-area diag-' + level);
        var head = make('div', 'diag-area-head');
        head.appendChild(make('h3', null, area[L]));
        head.appendChild(make('span', 'diag-badge', T[level]));
        box.appendChild(head);
        if (r.tips.length) {
          var ul = make('ul');
          r.tips.forEach(function (tip) { ul.appendChild(make('li', null, tip.text)); });
          box.appendChild(ul);
          var see = make('a', 'service-more', T.see + ' →');
          see.href = area.href;
          box.appendChild(see);
        }
        res.appendChild(box);
      });
      res.appendChild(make('p', 'calc-disclaimer', T.note));
      var actions = make('div', 'diag-actions');
      actions.appendChild(bookingLink(T.cta));
      var again = make('button', 'btn btn-ghost', T.restart);
      again.type = 'button';
      again.addEventListener('click', function () { answers = []; step = 0; render(); });
      actions.appendChild(again);
      res.appendChild(actions);
      root.appendChild(res);
    }

    onLangChange(render);
    render();
  }

  var calc = document.getElementById('calculadora');
  if (calc) initCalculadora(calc);
  var diag = document.getElementById('diagnostico');
  if (diag) initDiagnostico(diag);
})();
