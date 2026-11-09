/* Red Team Junior — aplicación principal (SPA sin dependencias) */
(function () {
  const { $, $$, esc, store, shuffle } = window.LAB_UTILS;
  const M = window.MODULOS, LABS = window.LABS, NIVELES = window.NIVELES, V = window.VIDEOS || [];
  const vid = (id) => V.find((v) => v.id === id);
  const mins = (s) => `${Math.round(s / 60)} min`;
  const fmtT = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const app = $("#app");
  const P = () => store.get("progreso", { done: {}, quiz: {}, examen: 0 });
  const saveP = (p) => { store.set("progreso", p); renderNavProgress(); };
  const CLS = {
    "Fundamentos": "basico", "Metodología": "intermedio", "Reconocimiento": "recon",
    "Explotación web": "profesional", "Infra y avanzado": "avanzado", "Entrevista": "entrevista"
  };
  const nivelClass = (n) => CLS[n] || "basico";

  /* ── Tema ── */
  const theme = store.get("tema", null);
  if (theme) document.documentElement.dataset.theme = theme;
  $("#theme").onclick = () => {
    const cur = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const nx = cur === "dark" ? "light" : "dark"; document.documentElement.dataset.theme = nx; store.set("tema", nx);
  };
  $("#menu").onclick = () => document.body.classList.toggle("nav-open");

  function renderNavProgress() {
    const p = P(); const n = Object.keys(p.done).length; const pct = Math.round((n / M.length) * 100);
    $("#navprog").style.setProperty("--v", pct + "%"); $("#navprog").title = `Progreso: ${pct} %`; $("#navpct").textContent = pct + "%";
  }

  /* ── Componentes ── */
  const moduloCard = (m) => {
    const p = P(); const done = p.done[m.id]; const q = p.quiz[m.id];
    return `<a class="mcard ${nivelClass(m.nivel)} ${done ? "done" : ""}" href="#/modulo/${m.id}">
      <div class="mcard-top"><span class="num">${String(m.id).padStart(2, "0")}</span>${done ? '<span class="ok">✓ Completado</span>' : ""}</div>
      <h3>${esc(m.titulo)}</h3><p>${esc(m.resumen)}</p>
      <div class="meta"><span>📖 ${m.min} min</span><span>🧩 ${m.secciones.length} secciones</span>${m.lab ? "<span>🧪 lab</span>" : ""}${q != null ? `<span>📝 ${q}/${m.quiz.length}</span>` : ""}</div></a>`;
  };

  const videoPlayer = (v, auto) => !v ? `<div class="video-ph">🎬 Vídeo en preparación</div>` : `
    <div class="player"><video controls preload="metadata" poster="videos/video${v.id}.jpg" data-id="${v.id}" ${auto ? "autoplay" : ""}>
      <source src="videos/video${v.id}.mp4" type="video/mp4"><track kind="subtitles" srclang="es" label="Español" src="videos/video${v.id}.vtt" default></video>
    <div class="chapters"><h4>Capítulos · ${mins(v.duracion)}</h4><ol>${v.capitulos.map((c) => `<li><button data-t="${c.t}"><span>${fmtT(c.t)}</span> ${esc(c.titulo)}</button></li>`).join("")}</ol></div></div>
    <details class="transcript"><summary>📄 Transcripción completa del vídeo</summary>${v.guion.map((g) => `<h5>${esc(g.titulo)}</h5><p>${esc(g.texto)}</p>`).join("")}</details>`;

  function bindPlayer(root) {
    $$(".player", root).forEach((pl) => {
      const video = $("video", pl);
      pl.addEventListener("click", (e) => { const b = e.target.closest("[data-t]"); if (b) { video.currentTime = +b.dataset.t; video.play(); } });
      video.addEventListener("timeupdate", () => {
        const t = video.currentTime; const bs = $$("[data-t]", pl); let act = 0;
        bs.forEach((b, i) => { if (+b.dataset.t <= t + 0.5) act = i; }); bs.forEach((b, i) => b.classList.toggle("on", i === act));
      });
    });
  }

  function quizHTML(qs, id) {
    return `<form class="quiz" data-q="${id}">${qs.map((q, i) => `<fieldset><legend>${i + 1}. ${esc(q.q)}</legend>${q.op.map((o, k) => `<label><input type="radio" name="q${i}" value="${k}"> ${esc(o)}</label>`).join("")}<p class="exp hidden"></p></fieldset>`).join("")}
      <div class="btns"><button class="btn primary">Corregir</button></div><p class="qres"></p></form>`;
  }
  function bindQuiz(form, qs, onScore) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); let ok = 0;
      qs.forEach((q, i) => {
        const fs = $$("fieldset", form)[i]; const sel = $(`input[name=q${i}]:checked`, form); const right = sel && +sel.value === q.ok; if (right) ok++;
        $$("label", fs).forEach((l, k) => { l.classList.toggle("good", k === q.ok); l.classList.toggle("bad", sel && +sel.value === k && !right); });
        const ex = $(".exp", fs); ex.classList.remove("hidden"); ex.innerHTML = (right ? "✅ " : "❌ ") + esc(q.exp);
      });
      $(".qres", form).innerHTML = `<b>${ok} / ${qs.length}</b> — ${ok === qs.length ? "¡Perfecto! 🎉" : ok >= qs.length * 0.6 ? "¡Aprobado! Repasa las falladas." : "Repasa la lección y vuelve a intentarlo."}`;
      onScore && onScore(ok);
    });
  }

  /* ── Vistas ── */
  const views = {};

  views.home = () => {
    const p = P(); const n = Object.keys(p.done).length;
    const next = M.find((m) => !p.done[m.id]) || M[0];
    app.innerHTML = `
    <section class="hero"><div class="hero-txt">
      <span class="eyebrow">Curso gratuito · De cero a la entrevista</span>
      <h1>Prepara la entrevista de <span class="grad">Técnico Junior Red Team</span></h1>
      <p class="lead">Todo lo que piden en la oferta de Telefónica Tech, explicado desde cero y de la forma más sencilla posible: OWASP, Nmap, Burp Suite, enumeración, fuzzing, APIs, Windows/Linux, informes y PoC. Con analogías, diagramas, chuletas de comandos, laboratorios, tests y examen final.</p>
      <div class="btns"><a class="btn primary lg" href="#/modulo/${next.id}">${n ? "Continuar" : "Empezar"}: Módulo ${next.id} →</a><a class="btn lg" href="#/ruta">Ver la ruta completa</a></div>
      <div class="kpis"><div><b>${M.length}</b><span>módulos</span></div><div><b>${V.length}</b><span>vídeos${V.length ? ` · ${Math.round(V.reduce((a, v) => a + v.duracion, 0) / 60)} min` : ""}</span></div><div><b>${Object.keys(LABS).length}</b><span>laboratorios</span></div><div><b>${M.reduce((a, m) => a + m.quiz.length, 0)}</b><span>preguntas</span></div></div>
    </div>
    <div class="hero-art" aria-hidden="true">${heroSVG()}</div></section>

    <section class="legal">⚖️ <b>Uso legal y ético.</b> Todo lo que aprendas aquí es para pruebas de intrusión <strong>autorizadas por escrito</strong> (pentesting, Red Team, CTF, laboratorios propios). Atacar sistemas sin permiso es delito (art. 197 bis y 264 del Código Penal). Practica solo en máquinas vulnerables de laboratorio (TryHackMe, HackTheBox, PortSwigger, VulnHub, DVWA).</section>

    <section class="progress-card card"><div><h3>Tu progreso</h3><p class="muted">${n} de ${M.length} módulos completados · se guarda en este navegador</p></div><div class="bigbar"><i style="--v:${(n / M.length) * 100}%"></i></div></section>

    <section><h2 class="sec">Cómo funciona</h2><div class="grid4 how">
      <div class="card"><b>1 · Lee</b><p>Lecciones cortas y visuales, con analogías y ejemplos reales de auditoría.</p></div>
      <div class="card"><b>2 · Mira</b><p>Un vídeo narrado por módulo con capítulos, subtítulos y transcripción.</p></div>
      <div class="card"><b>3 · Practica</b><p>Laboratorios interactivos: Nmap, OWASP, CVSS, SQLi/XSS, HTTP, STAR…</p></div>
      <div class="card"><b>4 · Demuestra</b><p>Test por módulo, examen final y simulador de entrevista técnica.</p></div></div></section>

    ${NIVELES.map((nv) => `<section class="lvl ${nv.color}"><div class="lvl-h"><h2>${nv.id}</h2><p>${nv.desc}</p></div><div class="mgrid">${M.filter((m) => m.nivel === nv.id).map(moduloCard).join("")}</div></section>`).join("")}

    <section class="card cta"><div><h2>¿Listo para la entrevista?</h2><p>Repasa la chuleta de comandos, haz el examen final y practica con el simulador.</p></div><div class="btns"><a class="btn primary" href="#/chuleta">⚡ Chuleta</a><a class="btn" href="#/examen">📝 Examen final</a><a class="btn ghost" href="#/lab/entrevista">🎤 Simulador</a></div></section>`;
  };

  views.ruta = () => {
    app.innerHTML = `<div class="page-h"><h1>La ruta completa</h1><p class="lead">${M.length} módulos en ${NIVELES.length} niveles, alineados con los requisitos de la oferta. Recomendación: un módulo al día con su test.</p></div>
    <div class="roadmap">${NIVELES.map((nv) => `<div class="road ${nv.color}"><h2><span class="dot"></span>${nv.id}</h2><p class="muted">${nv.desc}</p><div class="mgrid">${M.filter((m) => m.nivel === nv.id).map(moduloCard).join("")}</div></div>`).join("")}</div>`;
  };

  views.modulo = (id) => {
    const m = M.find((x) => x.id === +id); if (!m) return views.notfound();
    const p = P(); const v = vid(m.video); const prev = M.find((x) => x.id === m.id - 1), next = M.find((x) => x.id === m.id + 1);
    app.innerHTML = `<nav class="crumbs"><a href="#/ruta">Ruta</a> › <span class="pill ${nivelClass(m.nivel)}">${m.nivel}</span> › Módulo ${m.id}</nav>
    <header class="mod-h ${nivelClass(m.nivel)}"><span class="num">Módulo ${String(m.id).padStart(2, "0")}</span><h1>${esc(m.titulo)}</h1><p class="lead">${esc(m.resumen)}</p>
      <div class="meta"><span>📖 ${m.min} min de lectura</span><span>🧩 ${m.secciones.length} secciones</span>${m.lab ? `<span>🧪 ${esc(LABS[m.lab].titulo)}</span>` : ""}</div></header>
    <div class="mod-layout"><aside class="toc"><h4>En este módulo</h4><ol><li><a href="#s-obj">Objetivos</a></li>${v ? '<li><a href="#s-video">Vídeo</a></li>' : ""}${m.secciones.map((s, i) => `<li><a href="#s-${i}">${esc(s.h.replace(/^\d+\.\s*/, ""))}</a></li>`).join("")}${m.lab ? '<li><a href="#s-lab">Laboratorio</a></li>' : ""}<li><a href="#s-quiz">Test</a></li></ol></aside>
    <article class="lesson">
      <section id="s-obj" class="card objectives"><h3>🎯 Al terminar sabrás…</h3><ul class="check">${m.objetivos.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></section>
      ${v ? `<section id="s-video"><h2>🎬 Vídeo explicativo</h2>${videoPlayer(v)}</section>` : ""}
      ${m.secciones.map((s, i) => `<section id="s-${i}" class="lsec"><h2>${esc(s.h)}</h2>${s.html}</section>`).join("")}
      <section class="card keys"><h3>🔑 Ideas clave</h3><div class="chips">${m.claves.map((c) => `<span>${esc(c)}</span>`).join("")}</div></section>
      ${m.entrevista ? `<section class="card objectives"><h3>🎤 En la entrevista te pueden preguntar…</h3><ul class="check">${m.entrevista.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></section>` : ""}
      ${m.lab ? `<section id="s-lab" class="labbox"><h2>🧪 Laboratorio: ${esc(LABS[m.lab].titulo)}</h2><p class="muted">${esc(LABS[m.lab].desc)}</p><div id="labhere"></div></section>` : ""}
      <section id="s-quiz"><h2>📝 Test del módulo</h2>${p.quiz[m.id] != null ? `<p class="muted">Tu mejor nota: ${p.quiz[m.id]}/${m.quiz.length}</p>` : ""}<div id="quizhere"></div></section>
      <section class="card done-box"><label class="chk big"><input type="checkbox" id="done" ${p.done[m.id] ? "checked" : ""}> Marcar módulo como completado</label></section>
      <nav class="pager">${prev ? `<a class="btn" href="#/modulo/${prev.id}">← ${esc(prev.titulo)}</a>` : "<span></span>"}${next ? `<a class="btn primary" href="#/modulo/${next.id}">${esc(next.titulo)} →</a>` : `<a class="btn primary" href="#/examen">Examen final →</a>`}</nav>
    </article></div>`;
    bindPlayer(app);
    if (m.lab) LABS[m.lab].render($("#labhere"));
    $("#quizhere").innerHTML = quizHTML(m.quiz, m.id);
    bindQuiz($("#quizhere form"), m.quiz, (ok) => { const p = P(); p.quiz[m.id] = Math.max(ok, p.quiz[m.id] || 0); if (ok >= Math.ceil(m.quiz.length * 0.6)) p.done[m.id] = 1; saveP(p); $("#done").checked = !!p.done[m.id]; });
    $("#done").onchange = (e) => { const p = P(); if (e.target.checked) p.done[m.id] = 1; else delete p.done[m.id]; saveP(p); };
    $$(".toc a").forEach((a) => a.onclick = (e) => { e.preventDefault(); document.getElementById(a.getAttribute("href").slice(1)).scrollIntoView({ behavior: "smooth" }); });
  };

  views.videos = () => {
    const total = V.reduce((a, v) => a + v.duracion, 0);
    app.innerHTML = `<div class="page-h"><h1>Vídeos del curso</h1><p class="lead">${V.length} vídeos narrados · ${Math.round(total / 60)} minutos en total · con capítulos, subtítulos y transcripción.</p></div>
    ${NIVELES.map((nv) => { const vs = V.filter((v) => v.nivel === nv.id); return vs.length ? `<section class="lvl ${nv.color}"><div class="lvl-h"><h2>${nv.id}</h2></div><div class="vgrid">${vs.map((v) => `
      <a class="vcard" href="#/video/${v.id}"><div class="thumb"><img src="videos/video${v.id}.jpg" alt="" loading="lazy"><span class="dur">${fmtT(v.duracion)}</span><span class="play">▶</span></div>
      <div class="vinfo"><small>Vídeo ${v.id} · Módulo ${v.modulo}</small><h3>${esc(v.titulo)}</h3><p>${esc(v.subtitulo)}</p></div></a>`).join("")}</div></section>` : ""; }).join("")}`;
  };

  views.video = (id) => {
    const v = vid(id); if (!v) return views.notfound(); const m = M.find((x) => x.video === id);
    const i = V.indexOf(v), prev = V[i - 1], next = V[i + 1];
    app.innerHTML = `<nav class="crumbs"><a href="#/videos">Vídeos</a> › <span class="pill ${nivelClass(v.nivel)}">${v.nivel}</span> › Vídeo ${v.id}</nav>
      <div class="page-h"><h1>${esc(v.titulo)}</h1><p class="lead">${esc(v.subtitulo)}</p></div>${videoPlayer(v, true)}
      <nav class="pager">${prev ? `<a class="btn" href="#/video/${prev.id}">← ${esc(prev.titulo)}</a>` : "<span></span>"}${m ? `<a class="btn ghost" href="#/modulo/${m.id}">📖 Ir al módulo</a>` : ""}${next ? `<a class="btn primary" href="#/video/${next.id}">${esc(next.titulo)} →</a>` : "<span></span>"}</nav>`;
    bindPlayer(app);
  };

  views.labs = () => {
    const extra = [["glosario", "🃏", "Glosario + flashcards", "Repasa términos y comandos con tarjetas.", "#/glosario"], ["chuleta", "⚡", "Chuleta de comandos", "Comandos y herramientas listos para la entrevista.", "#/chuleta"], ["examen", "🏁", "Examen final", "30 preguntas aleatorias de todo el curso.", "#/examen"]];
    app.innerHTML = `<div class="page-h"><h1>Laboratorios</h1><p class="lead">Practica como en un proyecto real: construye comandos, clasifica vulnerabilidades, puntúa con CVSS y ensaya la entrevista.</p></div>
    <div class="lgrid">${Object.entries(LABS).map(([k, l]) => `<a class="lcard ${nivelClass(l.nivel)}" href="#/lab/${k}"><span class="ico">${l.icono}</span><div><small>${l.nivel} · Módulo ${l.modulo}</small><h3>${esc(l.titulo)}</h3><p>${esc(l.desc)}</p></div></a>`).join("")}
    ${extra.map((x) => `<a class="lcard" href="${x[4]}"><span class="ico">${x[1]}</span><div><small>Repaso</small><h3>${x[2]}</h3><p>${x[3]}</p></div></a>`).join("")}</div>`;
  };

  views.lab = (k) => {
    const l = LABS[k]; if (!l) return views.notfound();
    app.innerHTML = `<nav class="crumbs"><a href="#/labs">Laboratorios</a> › ${esc(l.titulo)}</nav><div class="page-h"><h1>${l.icono} ${esc(l.titulo)}</h1><p class="lead">${esc(l.desc)}</p><a class="btn sm ghost" href="#/modulo/${l.modulo}">📖 Módulo ${l.modulo} relacionado</a></div><div id="labhere"></div>`;
    l.render($("#labhere"));
  };

  views.chuleta = () => {
    const C = window.CHULETA;
    app.innerHTML = `<div class="page-h"><h1>⚡ Chuleta de comandos y herramientas</h1><p class="lead">Lo esencial que debes saber manejar para el puesto. Ideal para repasar el día antes de la entrevista.</p>
      <div class="btns"><input type="search" id="cq" placeholder="Buscar comando, herramienta o flag…" aria-label="Buscar"></div></div>
    <div id="cheat">
      <h2 class="sec">🧰 Herramientas imprescindibles</h2>
      <div class="toolgrid">${window.HERRAMIENTAS.map((t) => `<div class="tool" data-s="${esc((t[0] + " " + t[2] + " " + t[3]).toLowerCase())}"><h4><span class="ic">${t[1]}</span>${esc(t[0])}</h4><p>${esc(t[2])}</p><span class="cmd">${esc(t[3])}</span> <span class="tag2">${esc(t[4])}</span></div>`).join("")}</div>
      ${C.map((b) => `<div class="sheet" data-s="${esc((b.t + " " + b.filas.flat().join(" ")).toLowerCase())}"><h3>${b.ic} ${esc(b.t)}</h3><table class="tbl"><tr>${b.cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${b.filas.map((f) => `<tr>${f.map((c, i) => `<td>${i === 0 ? `<code>${esc(c)}</code>` : esc(c)}</td>`).join("")}</tr>`).join("")}</table></div>`).join("")}
    </div>`;
    $("#cq").oninput = (e) => {
      const q = e.target.value.toLowerCase().trim();
      $$("#cheat .sheet, #cheat .tool").forEach((el) => { el.style.display = !q || el.dataset.s.includes(q) ? "" : "none"; });
      $$("#cheat h2, #cheat .toolgrid").forEach((el) => { el.style.display = ""; });
    };
  };

  views.glosario = () => {
    const G = window.GLOSARIO;
    app.innerHTML = `<div class="page-h"><h1>Glosario y flashcards</h1><p class="lead">${G.length} términos, siglas y comandos esenciales. Haz clic en una tarjeta para darle la vuelta.</p>
      <div class="btns"><input type="search" id="gq" placeholder="Buscar término…" aria-label="Buscar término"><button class="btn" id="gm">🔀 Mezclar</button><button class="btn ghost" id="gf">Mostrar todas</button></div></div><div class="fgrid" id="fg"></div>`;
    let list = G.slice(); let all = false;
    const draw = () => { const q = $("#gq").value.toLowerCase(); $("#fg").innerHTML = list.filter((g) => !q || (g[0] + g[1]).toLowerCase().includes(q)).map((g) => `<button class="flip ${all ? "on" : ""}"><span class="front">${esc(g[0])}</span><span class="back"><b>${esc(g[0])}</b>${esc(g[1])}</span></button>`).join(""); };
    $("#gq").oninput = draw; $("#gm").onclick = () => { list = shuffle(list); draw(); }; $("#gf").onclick = () => { all = !all; draw(); };
    $("#fg").onclick = (e) => { const f = e.target.closest(".flip"); if (f) f.classList.toggle("on"); };
    draw();
  };

  views.examen = () => {
    const N = 30;
    const pool = shuffle(M.flatMap((m) => m.quiz.map((q) => ({ ...q, m: m.id })))).slice(0, N);
    const pass = Math.round(N * 0.7);
    const best = P().examen || 0;
    app.innerHTML = `<div class="page-h"><h1>🏁 Examen final</h1><p class="lead">${N} preguntas aleatorias de todo el curso. Aprobado: ${pass}/${N} (70 %). Tu mejor nota: <b>${best}/${N}</b>.</p><button class="btn ghost sm" id="rx">🔄 Nuevo examen</button></div><div id="ex"></div>`;
    $("#ex").innerHTML = quizHTML(pool, "final");
    bindQuiz($("#ex form"), pool, (ok) => {
      const p = P(); p.examen = Math.max(ok, p.examen || 0); saveP(p);
      const fails = [...new Set(pool.filter((q, i) => { const s = $(`#ex input[name=q${i}]:checked`); return !s || +s.value !== q.ok; }).map((q) => q.m))];
      $("#ex .qres").innerHTML += ok >= pass ? `<div class="callout tip">🎓 ¡Enhorabuena! Has superado el examen final. Repasa la <a href="#/chuleta">chuleta</a> y practica el <a href="#/lab/entrevista">simulador de entrevista</a>.</div>` : `<div class="callout">Aún no llegas al 70 %. Repasa los módulos de abajo y vuelve a intentarlo.</div>`;
      if (fails.length) $("#ex .qres").innerHTML += `<p>Repasa: ${fails.sort((a, b) => a - b).map((id) => `<a href="#/modulo/${id}">Módulo ${id}</a>`).join(" · ")}</p>`;
      $("#ex .qres").scrollIntoView({ behavior: "smooth", block: "center" });
    });
    $("#rx").onclick = views.examen;
  };

  views.notfound = () => { app.innerHTML = `<div class="page-h"><h1>Página no encontrada</h1><a class="btn primary" href="#/">Volver al inicio</a></div>`; };

  function heroSVG() {
    return `<svg viewBox="0 0 400 360" fill="none"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--acc)"/><stop offset="1" stop-color="var(--acc2)"/></linearGradient></defs>
      <circle cx="200" cy="180" r="150" stroke="var(--line)" stroke-dasharray="4 8"/><circle cx="200" cy="180" r="105" stroke="var(--line)"/>
      <path d="M200 70 L285 105 V180 C285 235 248 270 200 290 C152 270 115 235 115 180 V105 Z" fill="url(#hg)" opacity=".95"/>
      <path d="M176 178 l-14 14 M224 178 l14 14 M176 206 l-14 -14 M224 206 l14 -14" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <circle cx="200" cy="192" r="26" stroke="#fff" stroke-width="7"/>
      <g font-family="monospace" font-size="12" font-weight="700"><rect x="6" y="56" rx="9" width="112" height="32" fill="var(--card)" stroke="var(--line)"/><text x="62" y="77" text-anchor="middle" fill="var(--txt)">nmap -sV</text>
      <rect x="296" y="36" rx="9" width="92" height="32" fill="var(--card)" stroke="var(--line)"/><text x="342" y="57" text-anchor="middle" fill="var(--txt)">Burp</text>
      <rect x="300" y="268" rx="9" width="86" height="32" fill="var(--card)" stroke="var(--line)"/><text x="343" y="289" text-anchor="middle" fill="var(--txt)">OWASP</text>
      <rect x="10" y="264" rx="9" width="98" height="32" fill="var(--card)" stroke="var(--line)"/><text x="59" y="285" text-anchor="middle" fill="var(--txt)">ffuf</text>
      <rect x="156" y="316" rx="9" width="92" height="32" fill="var(--card)" stroke="var(--line)"/><text x="202" y="337" text-anchor="middle" fill="var(--txt)">CVSS</text></g></svg>`;
  }

  /* ── Router ── */
  function route() {
    const h = location.hash.replace(/^#\/?/, "").split("/");
    document.body.classList.remove("nav-open");
    $$(".nav a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#/" + h[0] || (h[0] === "" && a.getAttribute("href") === "#/")));
    const map = { "": "home", ruta: "ruta", modulo: "modulo", videos: "videos", video: "video", labs: "labs", lab: "lab", chuleta: "chuleta", glosario: "glosario", examen: "examen" };
    (views[map[h[0]]] || views.notfound)(h[1]);
    window.scrollTo(0, 0);
    const t = $("h1", app); document.title = (h[0] ? (t ? t.textContent + " · " : "") : "") + "Red Team Junior";
  }
  addEventListener("hashchange", route);
  renderNavProgress(); route();
})();
