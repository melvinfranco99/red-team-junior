/* Laboratorios interactivos — Red Team Junior */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem("rt." + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("rt." + k, JSON.stringify(v)); } catch (e) {} }
  };
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const LABS = {};

  /* Utilidad: laboratorio de clasificación (escenario → opción correcta) */
  function clasificador(el, { casos, opciones }) {
    let ok = 0, n = 0;
    el.innerHTML = `<div class="lab-score">Aciertos: <b class="sc">0</b> / ${casos.length}</div>` + casos.map((c, i) => `
      <div class="card cl-item" data-i="${i}"><p>${esc(c.txt)}</p>
      <div class="btns">${opciones.map((o) => `<button data-v="${esc(o.v)}" class="btn sm">${esc(o.l)}</button>`).join("")}</div>
      <p class="fb muted"></p></div>`).join("");
    $$(".cl-item", el).forEach((card) => card.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b || card.dataset.done) return;
      const c = casos[card.dataset.i]; card.dataset.done = 1; n++;
      const right = b.dataset.v === c.ok; if (right) ok++;
      $$("button", card).forEach((x) => { x.disabled = true; if (x.dataset.v === c.ok) x.classList.add("good"); });
      if (!right) b.classList.add("bad");
      $(".fb", card).innerHTML = (right ? "✅ " : "❌ ") + esc(c.exp);
      $(".sc", el).textContent = ok;
    }));
  }

  /* 1 · Analizador de peticiones HTTP (clasificar códigos de estado) */
  LABS.http = {
    titulo: "Analizador HTTP", icono: "🌐", modulo: 2, nivel: "Fundamentos",
    desc: "Clasifica cada situación según la familia de código de estado HTTP que devolvería.",
    render(el) {
      clasificador(el, {
        opciones: [{ v: "2", l: "2xx Éxito" }, { v: "3", l: "3xx Redirección" }, { v: "4", l: "4xx Cliente" }, { v: "5", l: "5xx Servidor" }],
        casos: shuffle([
          { txt: "Pides una página que existe y la web te la devuelve correctamente.", ok: "2", exp: "200 OK: éxito (familia 2xx)." },
          { txt: "Accedes a /admin sin haber iniciado sesión y te pide autenticarte.", ok: "4", exp: "401 No autenticado (familia 4xx, error del cliente)." },
          { txt: "Pides una ruta que no existe en el servidor.", ok: "4", exp: "404 Not Found (4xx)." },
          { txt: "Tras inyectar una comilla, la aplicación revienta y muestra un error del backend.", ok: "5", exp: "500 Internal Server Error (5xx): posible fallo explotable." },
          { txt: "La URL antigua te lleva automáticamente a la nueva dirección.", ok: "3", exp: "301/302 Redirección (3xx)." },
          { txt: "Intentas ver /backup; existe, pero el servidor te prohíbe el acceso.", ok: "4", exp: "403 Forbidden (4xx): existe pero sin permiso." },
          { txt: "Envías un formulario de registro y se crea tu cuenta con éxito.", ok: "2", exp: "201 Created (2xx)." },
          { txt: "El servidor proxy de delante no obtiene respuesta del servidor real.", ok: "5", exp: "502 Bad Gateway (5xx)." }
        ])
      });
    }
  };

  /* 2 · OWASP Top 10 matcher */
  LABS.owasp = {
    titulo: "Empareja con OWASP Top 10", icono: "🎯", modulo: 7, nivel: "Metodología",
    desc: "Lee el escenario y elige la categoría del OWASP Top 10 (2021) a la que pertenece.",
    render(el) {
      clasificador(el, {
        opciones: [{ v: "a01", l: "A01 Control acceso" }, { v: "a03", l: "A03 Inyección" }, { v: "a05", l: "A05 Mala config." }, { v: "a07", l: "A07 Autenticación" }, { v: "a10", l: "A10 SSRF" }],
        casos: shuffle([
          { txt: "Cambias ?id=15 por ?id=16 y ves la factura de otro cliente.", ok: "a01", exp: "IDOR → A01 Broken Access Control." },
          { txt: "Introduces ' OR '1'='1 en el login y entras.", ok: "a03", exp: "SQL Injection → A03 Inyección." },
          { txt: "Un comentario con <script>alert(1)</script> se ejecuta al visitarlo.", ok: "a03", exp: "XSS → A03 Inyección (desde 2021)." },
          { txt: "El panel de administración usa las credenciales admin/admin por defecto.", ok: "a05", exp: "Configuración por defecto → A05 Security Misconfiguration." },
          { txt: "La web no limita los intentos de login y permite fuerza bruta.", ok: "a07", exp: "Fallo de autenticación → A07." },
          { txt: "Un parámetro 'url' hace que el servidor pida a 169.254.169.254.", ok: "a10", exp: "SSRF → A10." },
          { txt: "El servidor expone directorios y mensajes de error detallados.", ok: "a05", exp: "Exposición por configuración → A05." },
          { txt: "Un usuario normal accede al endpoint /api/admin/users.", ok: "a01", exp: "Acceso a función no permitida → A01." }
        ])
      });
    }
  };

  /* 3 · Clasificador de ataques por payload */
  LABS.inyeccion = {
    titulo: "¿Qué tipo de ataque es?", icono: "💉", modulo: 12, nivel: "Explotación web",
    desc: "Identifica el tipo de vulnerabilidad a partir del payload o la señal observada.",
    render(el) {
      clasificador(el, {
        opciones: [{ v: "sqli", l: "SQLi" }, { v: "xss", l: "XSS" }, { v: "cmd", l: "Cmd Injection" }, { v: "csrf", l: "CSRF" }, { v: "ssrf", l: "SSRF" }, { v: "idor", l: "IDOR" }],
        casos: shuffle([
          { txt: "' UNION SELECT username, password FROM users -- ", ok: "sqli", exp: "UNION para extraer datos: SQL Injection." },
          { txt: "<img src=x onerror=alert(document.cookie)>", ok: "xss", exp: "Ejecuta JS en el navegador: XSS." },
          { txt: "127.0.0.1; cat /etc/passwd", ok: "cmd", exp: "Encadena comandos del SO: Command Injection." },
          { txt: "Una web externa envía <img src='banco.com/transfer?a=hacker'> con tu sesión activa.", ok: "csrf", exp: "Acción forzada con tu cookie: CSRF." },
          { txt: "El parámetro image_url=http://169.254.169.254/ hace que el servidor pida ahí.", ok: "ssrf", exp: "El servidor pide por ti: SSRF." },
          { txt: "GET /api/users/1002 devuelve datos de otro usuario sin comprobar permisos.", ok: "idor", exp: "Acceso a objeto ajeno por id: IDOR/BOLA." },
          { txt: "'; WAITFOR DELAY '0:0:5' -- y la respuesta tarda 5 segundos.", ok: "sqli", exp: "SQLi ciega por tiempo." },
          { txt: "<svg onload=alert(1)> guardado en tu perfil, afecta a quien lo vea.", ok: "xss", exp: "XSS almacenado." }
        ])
      });
    }
  };

  /* 4 · Lectura de salida de fuzzing */
  LABS.fuzz = {
    titulo: "Lee la salida del fuzzing", icono: "🔀", modulo: 10, nivel: "Reconocimiento",
    desc: "Ante cada resultado de ffuf, decide si merece la pena investigarlo.",
    render(el) {
      clasificador(el, {
        opciones: [{ v: "si", l: "Investigar" }, { v: "no", l: "Descartar" }],
        casos: shuffle([
          { txt: "login  [Status: 200, Size: 2451]", ok: "si", exp: "200: existe y responde. Míralo." },
          { txt: "random8273  [Status: 404]", ok: "no", exp: "404: no existe, se descarta." },
          { txt: "admin  [Status: 301 → /admin/]", ok: "si", exp: "301: carpeta real, redirige. Investiga." },
          { txt: "backup  [Status: 403]", ok: "si", exp: "403: existe pero prohibido. Prueba bypass." },
          { txt: "img99  [Status: 404]", ok: "no", exp: "404: nada que ver." },
          { txt: ".git  [Status: 200]", ok: "si", exp: "¡Repositorio expuesto! Hallazgo serio." },
          { txt: "panel  [Status: 401]", ok: "si", exp: "401: requiere autenticación, hay algo detrás." },
          { txt: "noexiste55  [Status: 404]", ok: "no", exp: "404: descartar." }
        ])
      });
    }
  };

  /* 5 · Constructor de comandos Nmap */
  LABS.nmap = {
    titulo: "Constructor de comandos Nmap", icono: "🗺️", modulo: 9, nivel: "Reconocimiento",
    desc: "Marca opciones y observa el comando resultante con su explicación. Aprende Nmap construyéndolo.",
    render(el) {
      const opts = [
        { k: "sudo", f: "sudo", d: "Privilegios de root (necesario para -sS y -O)", pre: true },
        { k: "sS", f: "-sS", d: "Escaneo SYN (medio abierto), sigiloso y rápido" },
        { k: "sV", f: "-sV", d: "Detectar servicio y versión" },
        { k: "sC", f: "-sC", d: "Scripts NSE por defecto" },
        { k: "O", f: "-O", d: "Detectar sistema operativo" },
        { k: "pall", f: "-p-", d: "Todos los puertos (65535)" },
        { k: "T4", f: "-T4", d: "Velocidad rápida" },
        { k: "vuln", f: "--script vuln", d: "Buscar vulnerabilidades conocidas" },
        { k: "oA", f: "-oA informe", d: "Guardar la salida en 3 formatos" }
      ];
      el.innerHTML = `<div class="card">
        <div class="btns">${opts.map((o) => `<label class="chk"><input type="checkbox" data-k="${o.k}"> <code>${esc(o.f)}</code></label>`).join("")}</div>
        <label class="chk" style="margin-top:8px">🎯 Objetivo: <input id="tgt" value="10.10.10.5" style="width:180px;margin-left:6px"></label>
        <div class="term" style="margin-top:14px"><div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><b>comando generado</b></div><pre><span class="p">$</span> <span id="cmd" class="hl"></span></pre></div>
        <div id="expl"></div>
      </div>`;
      const upd = () => {
        const sel = opts.filter((o) => $(`input[data-k="${o.k}"]`, el).checked);
        const pre = sel.filter((o) => o.pre).map((o) => o.f);
        const flags = sel.filter((o) => !o.pre).map((o) => o.f);
        const tgt = $("#tgt", el).value.trim() || "OBJETIVO";
        $("#cmd", el).textContent = [...pre, "nmap", ...flags, tgt].join(" ");
        $("#expl", el).innerHTML = sel.length ? "<ul>" + sel.map((o) => `<li><code>${esc(o.f)}</code> — ${esc(o.d)}</li>`).join("") + "</ul>" : '<p class="muted">Marca opciones para construir tu comando.</p>';
      };
      $$("input", el).forEach((i) => i.addEventListener("input", upd));
      $("input[data-k=sV]", el).checked = true; upd();
    }
  };

  /* 6 · Calculadora CVSS 3.1 (base score) */
  LABS.cvss = {
    titulo: "Calculadora CVSS 3.1", icono: "📊", modulo: 6, nivel: "Metodología",
    desc: "Elige las métricas base y obtén la puntuación y severidad, como harías al puntuar un hallazgo.",
    render(el) {
      const M = {
        AV: { l: "Vector de ataque", o: [["N", "Red", .85], ["A", "Adyacente", .62], ["L", "Local", .55], ["P", "Físico", .2]] },
        AC: { l: "Complejidad", o: [["L", "Baja", .77], ["H", "Alta", .44]] },
        PR: { l: "Privilegios", o: [["N", "Ninguno", .85], ["L", "Bajos", .62], ["H", "Altos", .27]] },
        UI: { l: "Interacción usuario", o: [["N", "Ninguna", .85], ["R", "Requerida", .62]] },
        S: { l: "Scope", o: [["U", "Sin cambio", 0], ["C", "Cambiado", 1]] },
        C: { l: "Confidencialidad", o: [["H", "Alto", .56], ["L", "Bajo", .22], ["N", "Ninguno", 0]] },
        I: { l: "Integridad", o: [["H", "Alto", .56], ["L", "Bajo", .22], ["N", "Ninguno", 0]] },
        A: { l: "Disponibilidad", o: [["H", "Alto", .56], ["L", "Bajo", .22], ["N", "Ninguno", 0]] }
      };
      const sel = { AV: 0, AC: 0, PR: 0, UI: 0, S: 0, C: 0, I: 0, A: 0 };
      el.innerHTML = `<div class="card"><div class="cvss-grid">${Object.entries(M).map(([k, m]) => `
        <div class="cvss-row"><span>${esc(m.l)}</span><div class="btns" data-m="${k}">${m.o.map((o, i) => `<button class="btn xs ${i === 0 ? "on" : ""}" data-i="${i}">${esc(o[1])}</button>`).join("")}</div></div>`).join("")}
        </div>
        <div class="cvss-out"><div class="score"><b id="cv-score">—</b><span id="cv-sev"></span></div><code id="cv-vec" class="small"></code></div>
      </div>`;
      const roundup = (x) => Math.ceil(x * 10) / 10;
      const calc = () => {
        const prChanged = M.S.o[sel.S][0] === "C";
        const av = M.AV.o[sel.AV][2], ac = M.AC.o[sel.AC][2], ui = M.UI.o[sel.UI][2];
        let pr = M.PR.o[sel.PR][2];
        if (prChanged) { if (M.PR.o[sel.PR][0] === "L") pr = .68; else if (M.PR.o[sel.PR][0] === "H") pr = .5; }
        const c = M.C.o[sel.C][2], ii = M.I.o[sel.I][2], a = M.A.o[sel.A][2];
        const iss = 1 - (1 - c) * (1 - ii) * (1 - a);
        const impact = prChanged ? 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15) : 6.42 * iss;
        const expl = 8.22 * av * ac * pr * ui;
        let score = impact <= 0 ? 0 : roundup(Math.min((prChanged ? 1.08 : 1) * (impact + expl), 10));
        const sev = score === 0 ? ["Ninguna", "info"] : score < 4 ? ["Baja", "low"] : score < 7 ? ["Media", "med"] : score < 9 ? ["Alta", "high"] : ["Crítica", "crit"];
        $("#cv-score", el).textContent = score.toFixed(1);
        $("#cv-sev", el).innerHTML = `<span class="sev ${sev[1]}">${sev[0]}</span>`;
        $("#cv-vec", el).textContent = "CVSS:3.1/" + Object.keys(M).map((k) => `${k}:${M[k].o[sel[k]][0]}`).join("/");
      };
      $$(".btns[data-m]", el).forEach((row) => row.addEventListener("click", (e) => {
        const b = e.target.closest("button"); if (!b) return;
        const k = row.dataset.m; sel[k] = +b.dataset.i;
        $$("button", row).forEach((x) => x.classList.toggle("on", x === b)); calc();
      }));
      calc();
    }
  };

  /* 7 · Simulador de entrevista técnica */
  LABS.entrevista = {
    titulo: "Simulador de entrevista", icono: "🎤", modulo: 19, nivel: "Entrevista",
    desc: "Preguntas técnicas y de actitud reales. Responde en voz alta, controla el tiempo y compara con la respuesta modelo.",
    render(el) {
      const Q = [
        ["Enumérame el OWASP Top 10 y explícame tres de ellos.", "A01 Control de acceso (IDOR), A02 Cripto, A03 Inyección (SQLi/XSS), A04 Diseño inseguro, A05 Mala configuración, A06 Componentes vulnerables, A07 Autenticación, A08 Integridad, A09 Logging, A10 SSRF. Ejemplo: A01 es cambiar un id y ver datos ajenos; A03 es ' OR '1'='1 en un login; A05 es dejar admin/admin."],
        ["¿Cómo funciona una inyección SQL y cómo se previene?", "La app concatena mi entrada en una consulta sin separarla del código. Con ' OR '1'='1 la condición es siempre verdadera. Se previene con consultas parametrizadas (prepared statements), validación y mínimo privilegio en la BD."],
        ["Diferencia entre XSS y CSRF.", "XSS ejecuta mi JavaScript en el navegador de la víctima (falta sanear la salida). CSRF fuerza una acción usando la cookie de sesión de la víctima. XSS se defiende con encoding + CSP; CSRF con tokens anti-CSRF y SameSite."],
        ["¿Qué hace nmap -sV y por qué es importante?", "Detecta el servicio y la versión que corre en cada puerto. Con la versión exacta puedo buscar CVEs conocidos y exploits en Exploit-DB/NVD."],
        ["¿Diferencia entre los códigos 401 y 403?", "401 = no estás autenticado (falta login). 403 = estás identificado pero no tienes permiso para ese recurso. El 403 revela que el recurso existe."],
        ["¿Cómo priorizarías 200 vulnerabilidades de un escáner?", "No solo por CVSS: combino gravedad (CVSS), explotabilidad (EPSS, ¿exploit público?), exposición (¿Internet o interno?) y criticidad del activo. Primero valido falsos positivos. Una media expuesta con exploit puede superar a una crítica aislada."],
        ["Explícame el saludo de tres pasos de TCP.", "El cliente envía SYN, el servidor responde SYN/ACK y el cliente confirma con ACK. El escaneo -sS de Nmap no completa el saludo (corta con RST), por eso es 'medio abierto'."],
        ["¿Qué es un IDOR y cómo lo detectarías con Burp?", "Acceder a un recurso ajeno cambiando un identificador porque el servidor no comprueba la propiedad. Capturo la petición, la mando a Repeater, cambio el id y veo si accedo a datos de otro. La extensión Autorize lo automatiza con dos sesiones."],
        ["¿Qué es un JWT y qué fallo común tiene?", "Un token de sesión en 3 partes: header.payload.firma (en Base64, no cifrado). Fallos: alg:none (acepta tokens sin firma), firma no verificada (cambio role:user→admin) o secreto débil crackeable."],
        ["Háblame de una vez que resolviste un reto técnico difícil (STAR).", "Usa STAR: Situación (contexto), Tarea (tu objetivo), Acción (qué hiciste tú, con herramientas concretas) y Resultado (el impacto o lo aprendido). Sé concreto y honesto."],
        ["¿Qué certificación estás preparando y por qué?", "Menciona tu ruta real: eJPT o PNPT como entrada práctica, con vistas a OSCP/OSWA. Explica que buscas validar práctica ofensiva y metodología de informe."],
        ["¿Qué harías si encuentras un sistema vulnerable fuera del alcance?", "No lo toco: documentaría el hallazgo y consultaría con el responsable del engagement. Salirse del scope puede ser ilegal aunque me hayan contratado."]
      ];
      let pool = shuffle(Q), idx = 0, t = 0, timer = null;
      el.innerHTML = `<div class="card sim">
        <div class="sim-top"><span class="tag2" id="s-n"></span><span class="sim-time" id="s-t">0:00</span></div>
        <h3 id="s-q"></h3>
        <div class="btns"><button class="btn" id="s-start">▶ Responder</button><button class="btn ghost" id="s-rev">💡 Ver respuesta modelo</button><button class="btn primary" id="s-next">Siguiente →</button></div>
        <div id="s-ans" class="callout tip hidden"></div>
      </div>`;
      const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      const stop = () => { clearInterval(timer); timer = null; };
      const show = () => {
        stop(); t = 0; $("#s-t", el).textContent = "0:00";
        $("#s-n", el).textContent = `Pregunta ${idx + 1} / ${pool.length}`;
        $("#s-q", el).textContent = pool[idx][0];
        $("#s-ans", el).classList.add("hidden"); $("#s-ans", el).innerHTML = "<b>Respuesta modelo:</b> " + esc(pool[idx][1]);
      };
      $("#s-start", el).onclick = () => { stop(); timer = setInterval(() => { t++; $("#s-t", el).textContent = fmt(t); }, 1000); };
      $("#s-rev", el).onclick = () => { $("#s-ans", el).classList.toggle("hidden"); };
      $("#s-next", el).onclick = () => { idx++; if (idx >= pool.length) { pool = shuffle(Q); idx = 0; } show(); };
      show();
    }
  };

  window.LABS = LABS;
  window.LAB_UTILS = { $, $$, esc, store, shuffle };
})();
