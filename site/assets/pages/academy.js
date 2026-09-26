// JayV Academy: a full Finance major in 19 subjects, a 3D subject galaxy, long-form lectures with KaTeX,
// lecture mode (the professor reads aloud), auto-checked exercises, labs, games and XP.
import { createEngine, glowSprite, canvasTexture, fontsReady, THREE, mqMobile, REDUCED } from '../core/engine.js';
import { initShell } from '../core/shell.js';
import { href } from '../core/data.js';
import { PROGRAM, SUBJECTS, subjectByCode, lessonsOf, allReady, loadLesson, MANIFEST, LABS, GAMES } from '../academy/catalog.js';
import { RES, BOOKS } from '../academy/resources.js';
import { mountLab } from '../academy/labs.js';
import { mountGame } from '../academy/games.js';
import { createLecture, segmentsFor, canSpeak } from '../academy/lecture.js';

const shell = initShell('academy', { accent: '#9b8cff' });
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Light markdown outside maths: **bold**, *italic*, `code`, [text](https://…). Maths \( … \) stays for KaTeX.
const fmt = (s) => String(s == null ? '' : s).split(/(\\\(.*?\\\)|\\\[.*?\\\])/s).map((part, i) => (i % 2 ? esc(part) : esc(part).replace(/\\\$/g, '$$')
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\w)/g, '$1<i>$2</i>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1 ↗</a>'))).join('');
const paras = (s) => String(s || '').split(/\n{2,}/).map((p) => `<p>${fmt(p).replace(/\n/g, '<br>')}</p>`).join('');
let mobile = mqMobile.matches;
const T = MANIFEST.totals;
const num = (n) => Number(n).toLocaleString('en');

// ================= Progress (this browser only) =================
const KEY = 'jayv-academy-v2';
let P = { done: {}, solved: {}, heard: {}, xp: 0, last: null };
try {
  const old = JSON.parse(localStorage.getItem('jayv-academy-v1') || 'null');
  P = Object.assign(P, old ? { xp: old.xp || 0 } : {}, JSON.parse(localStorage.getItem(KEY) || '{}'));
} catch (e) { /* storage blocked */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* ignore */ } };
const RANKS = [[0, 'Intern'], [300, 'Analyst'], [1200, 'Associate'], [3000, 'Vice President'], [6000, 'Director'], [10000, 'Managing Director']];
const rank = () => RANKS.filter((r) => P.xp >= r[0]).pop()[1];
function toast(t) { const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 1800); }
function addXp(n, why) { if (!n) { return; } P.xp += n; save(); renderXp(); toast(`+${n} XP${why ? ' · ' + why : ''}`); }
function renderXp() { $('xp').textContent = `${num(P.xp)} XP · ${rank()} · ${Object.keys(P.done).length}/${T.ready} lectures`; }
const subjDone = (s) => lessonsOf(s).filter((l) => P.done[l.id]).length;
const subjReady = (s) => lessonsOf(s).filter((l) => l.ready).length;
const stageOf = (id) => PROGRAM.stages.find((x) => x.id === id);

// ================= 3D galaxy: one planet per subject, one ring per stage =================
const eng = createEngine($('gl'), {
  ground: '#07061a', fog: 0.0055, bloom: [0.95, 0.55, 0.5], rimColor: 0x9b8cff, hemi: 0.4,
  dust: { n: 4200, spread: [280, 150, 280], center: [0, 0, 0], color: 0xd9d2ff, size: 0.14, opacity: 0.55 },
  camPos: [-34, 34, 92], camLook: [-30, -4, 0], parallax: [1.4, 0.9],
});
const galaxy = new THREE.Group();
const planets = [];
let focus = null, gTags = null, pulse = 0, starGlow = null;
const RING = { foundation: 10, core: 17, option: 24.5, beyond: 31 };
const SPIN = { foundation: 0.055, core: 0.04, option: 0.031, beyond: 0.024 };
if (eng) {
  const S = eng.scene;
  galaxy.rotation.x = 0.32;
  S.add(galaxy);
  galaxy.add(new THREE.Mesh(new THREE.SphereGeometry(2.8, 48, 32), new THREE.MeshBasicMaterial({ color: 0xfff1c9 })));
  starGlow = glowSprite(0xffe2a8, 16, 0.55);
  galaxy.add(starGlow);
  [[0x9b8cff, 34, 0.25], [0x5fe3e0, 64, 0.1]].forEach(([c, s, o]) => galaxy.add(glowSprite(c, s, o)));
  fontsReady.then(() => {
    const tex = canvasTexture(2048, 64, (g, w, h) => {
      g.font = '700 34px "Unbounded", sans-serif'; g.fillStyle = '#e7e2ff'; g.textBaseline = 'middle';
      const t = 'JAYV ACADEMY  ·  A FINANCE MAJOR IN 19 SUBJECTS  ·  '; let x = 0; const tw = g.measureText(t).width;
      const n = Math.max(1, Math.round(w / tw)); g.setTransform(w / (n * tw), 0, 0, 1, 0, 0);
      for (let i = 0; i < n; i++) { g.fillText(t, x, h / 2); x += tw; }
    });
    tex.wrapS = THREE.RepeatWrapping;
    const band = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 0.7, 96, 1, true), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
    band.userData.tex = tex;
    galaxy.add(band);
    galaxy.userData.band = band;
  });
  PROGRAM.stages.forEach((st) => {
    const R = RING[st.id], col = new THREE.Color(st.color);
    const orbit = new THREE.Mesh(new THREE.RingGeometry(R - 0.035, R + 0.035, 200), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.26, side: THREE.DoubleSide, depthWrite: false }));
    orbit.rotation.x = -Math.PI / 2;
    galaxy.add(orbit);
    const members = SUBJECTS.filter((s) => s.stage === st.id);
    members.forEach((s, k) => {
      const c = new THREE.Color(s.color);
      const holder = new THREE.Group();
      galaxy.add(holder);
      const size = 0.75 + s.lessons.length * 0.075;
      const planet = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 3), new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.28, roughness: 0.45, metalness: 0.2 }));
      holder.add(planet);
      holder.add(glowSprite(c, size * 5, 0.33));
      if (s.stage === 'core') { const ring = new THREE.Mesh(new THREE.TorusGeometry(size * 1.75, 0.05, 6, 80), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.8 })); ring.rotation.x = Math.PI / 2.4; holder.add(ring); }
      // One moon per lecture: bright when the lecture is ready, dim while it is being written
      const moons = lessonsOf(s).map((l, j) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(l.ready ? 0.13 : 0.09, 10, 8), new THREE.MeshBasicMaterial({ color: l.ready ? 0xffffff : 0x55507a }));
        holder.add(m);
        return { m, r: size * 1.6 + 0.32 * (j % 3), sp: 0.55 + j * 0.13, ph: j * 1.3 };
      });
      planets.push({ s, R, holder, planet, moons, a: (k / members.length) * Math.PI * 2 + (st.id === 'core' ? 0.6 : st.id === 'option' ? 1.1 : st.id === 'beyond' ? 2.2 : 0), sp: SPIN[st.id], world: new THREE.Vector3() });
    });
  });
  gTags = eng.tags($('tags-gal'));
  const els = gTags.set(planets.map((p) => ({ tag: 'a', attrs: { href: `#/subject/${p.s.code}`, style: `--c:${p.s.color}` }, html: `<span style="color:${p.s.color}">${esc(p.s.code.replace('X-', ''))}</span> ${esc(p.s.short)}`, pos: p.world })));
  planets.forEach((p, i) => { p.tag = els[i]; });
  document.addEventListener('click', (e) => {
    if (e.target.closest('a,button,input,select,textarea,.glass,.reader,.subnav,.site-header,.menu,.palette,.lecbar')) { return; }
    const hit = eng.pick((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, planets.map((p) => p.planet));
    if (hit) { const p = planets.find((x) => x.planet === hit.object); if (p) { location.hash = `#/subject/${p.s.code}`; } }
  });
  eng.rig.auto = 0;
  eng.onFrame((t, dt) => {
    planets.forEach((p) => {
      if (!REDUCED && (!focus || focus === p)) { p.a += dt * p.sp * (focus ? 0.25 : 1); }
      p.holder.position.set(Math.cos(p.a) * p.R, Math.sin(p.a * 2) * 0.35, Math.sin(p.a) * p.R);
      p.planet.rotation.y += dt * 0.3;
      p.moons.forEach((m) => { const a = t * m.sp + m.ph; m.m.position.set(Math.cos(a) * m.r, Math.sin(a * 0.7) * 0.4, Math.sin(a) * m.r); });
      p.holder.getWorldPosition(p.world);
      p.world.y += 2;
      p.planet.material.emissiveIntensity = 0.28 + (focus === p ? 0.4 : 0);
    });
    if (galaxy.userData.band) { galaxy.userData.band.userData.tex.offset.x = (t * 0.01) % 1; galaxy.userData.band.rotation.y = t * 0.03; }
    pulse *= Math.exp(-dt * 5);
    if (starGlow) { const k = 16 * (1 + pulse * 0.35); starGlow.scale.set(k, k, 1); }
    if (focus) {
      const w = focus.world.clone(); w.y -= 2;
      if (routeName === 'subject') { eng.setTarget(mobile ? [w.x, w.y + 5, w.z + 14] : [w.x + 5, w.y + 3.5, w.z + 11], mobile ? [w.x, w.y - 2.4, w.z] : [w.x - 3.5, w.y, w.z]); }
      else { eng.setTarget([w.x + 7, w.y + 5, w.z + 16], [w.x, w.y, w.z]); }
    }
    gTags.update((!focus && !(mobile && routeName === 'home')) || routeName === 'subject');
  });
  eng.start();
  shell.onWarp = () => eng.warp();
}

// ================= Rendering helpers =================
function mathify(el) {
  if (!el) { return; }
  el.querySelectorAll('.math[data-tex]').forEach((m) => { try { window.katex.render(m.dataset.tex, m, { displayMode: true, throwOnError: false }); } catch (e) { m.textContent = m.dataset.tex; } });
  if (window.renderMathInElement) { window.renderMathInElement(el, { delimiters: [{ left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }], throwOnError: false, ignoredClasses: ['math'] }); }
}
const resItem = (k) => {
  if (k.startsWith('book:')) { const b = BOOKS[k.slice(5)]; return b ? `<li>📘 ${esc(b)} <small>(textbook)</small></li>` : ''; }
  const r = RES[k];
  return r ? `<li><a href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.t)} ↗</a> <small>· ${esc(r.src)} · ${esc(r.kind)}</small></li>` : '';
};
const labCard = (x) => `<a class="glass lc rise" data-tilt href="#/lab/${x.id}" style="--c:${x.color}"><b>🧪 ${esc(x.title)}</b><span>${esc(x.blurb)}</span></a>`;
const gameCard = (x) => `<a class="glass lc rise" data-tilt href="#/game/${x.id}" style="--c:${x.color}"><b>🎮 ${esc(x.title)}</b><span>${esc(x.blurb)}</span></a>`;
function subjCard(s) {
  const r = subjReady(s), d = subjDone(s), n = s.lessons.length;
  return `<a class="glass tc rise" data-tilt href="#/subject/${s.code}" style="--c:${s.color}"><span class="n">${esc(s.code.replace('X-', ''))}</span><h3>${esc(s.title)}</h3><p>${esc(s.blurb)}</p>
    <div class="meta"><span>${esc(s.type)}</span><span>· ${n} lectures</span><span>· ${r === n ? 'all ready' : `${r} ready`}</span>${d ? `<span>· ${d} done</span>` : ''}</div>
    <div class="bar"><i style="width:${Math.round(100 * r / n)}%"></i><em style="width:${Math.round(100 * d / n)}%"></em></div></a>`;
}
const nextLecture = () => { const all = allReady(); return all.find((l) => l.id === P.last && !P.done[l.id]) || all.find((l) => !P.done[l.id]) || null; };

// ================= Views =================
function viewHome() {
  const next = nextLecture(), d = Object.keys(P.done).length;
  return `<section class="a-hero">
      <div class="eyebrow" style="color:#b3a8ff">07 · JayV Academy · a Finance major, taught in English</div>
      <h1 class="display lines in"><span class="ln"><span>Finance,</span></span><span class="ln"><span class="v">taught properly.</span></span></h1>
      <div class="prof"><span class="av">Prof</span><p>Welcome to my lecture hall. This academy follows the full structure of a university Finance major: business foundations, the five core finance subjects, seven options, and extensions to the CFA Program and quantitative finance. Every lecture builds the intuition first, then the theory and the formulas, then worked examples with real numbers, then exercises with full solutions. Press <b>Start the lecture</b> on any lesson and I will read it to you, one idea at a time.</p></div>
      <div class="astats"><span><b>${T.subjects}</b> subjects</span><span><b>${T.ready}</b> of ${T.planned} lectures ready</span><span><b>${num(T.words)}</b> words of notes</span><span><b>${num(T.exercises)}</b> exercises</span><span><b>${LABS.length}</b> labs · <b>${GAMES.length}</b> games</span><span>You: <b>${d}</b> done · <b>${num(P.xp)}</b> XP · ${rank()}</span></div>
      <div class="row-btns">${next ? `<a class="btn gold" href="#/lesson/${next.id}">${d ? 'Continue' : 'Start'}: ${esc(next.title)} <span class="arr">→</span></a>` : ''}<a class="btn" href="#/program">See the whole program</a><a class="btn" href="#/game/bullbear">Play Bull or Bear</a></div>
      <p class="faint" style="font-size:12.5px;margin:0;max-width:640px">The program map follows the public structure of the Finance major in an Australian Bachelor of Business (UTS Course Handbook 2026, MAJ08440). JayV Academy is an independent study guide: it is not affiliated with or endorsed by any university, and subject descriptions are paraphrased. Click a planet to fly to its subject.</p>
    </section>
    <section class="how glass rise"><div class="eyebrow" style="color:#b3a8ff">How every lecture works</div>
      <ol class="how-steps"><li><b>Intuition</b><span>Why the idea exists and what problem it solves, in plain English.</span></li><li><b>Theory</b><span>Definitions, assumptions and the derivation of every formula you use.</span></li><li><b>Worked examples</b><span>Step-by-step calculations with Australian, US and Vietnamese numbers.</span></li><li><b>Practice</b><span>Exercises checked instantly, plus written questions with model answers.</span></li><li><b>Go deeper</b><span>Free lectures and official sources: MIT, Yale, RBA, ASIC, CFA Institute and more.</span></li></ol>
      <p class="muted" style="margin:0;font-size:14px">${canSpeak() ? '🎧 <b>Lecture mode</b> uses your device’s English voice to read each lesson aloud, highlighting the paragraph being explained. Choose the voice and speed you like.' : 'Lecture mode needs a browser with speech synthesis (Chrome, Edge or Safari).'}</p></section>
    ${PROGRAM.stages.map((st) => `<section style="display:grid;gap:14px"><div class="sec-h"><div><div class="eyebrow" style="color:${st.color}">${esc(st.title)}</div><p class="muted" style="margin:6px 0 0;max-width:720px">${esc(st.blurb)}</p></div></div><div class="tracks">${SUBJECTS.filter((s) => s.stage === st.id).map(subjCard).join('')}</div></section>`).join('')}
    <section style="display:grid;gap:16px"><div class="sec-h"><h2 class="big" style="font-size:clamp(24px,3vw,40px)">Labs &amp; games</h2><a class="btn" href="#/labs">All labs →</a></div><div class="cards3">${LABS.slice(0, 5).map(labCard).join('')}${GAMES.map(gameCard).join('')}</div></section>
    <section class="glass rise" style="display:grid;gap:10px"><div class="eyebrow" style="color:#b3a8ff">Library</div><p style="margin:0;font-family:var(--f-serif);font-size:17px">Every lecture links to free, reputable sources: MIT OpenCourseWare, Open Yale Courses, OpenStax, Khan Academy, Aswath Damodaran at NYU Stern, the CFA Institute, the RBA, APRA, ASIC, the Federal Reserve and more.</p><div><a class="btn" href="#/library">Open the library →</a></div></section>`;
}
function viewProgram() {
  return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">The program</div><h1>Every subject, every lecture.</h1><p class="lead-p">${esc(PROGRAM.source)} <a href="${esc(PROGRAM.handbook)}" target="_blank" rel="noopener">Official major outline ↗</a></p></section>` +
    PROGRAM.stages.map((st) => `<section style="display:grid;gap:14px"><h2 class="stage-h" style="--c:${st.color}">${esc(st.title)}</h2>${SUBJECTS.filter((s) => s.stage === st.id).map((s) => `<section class="glass" style="--c:${s.color};display:grid;gap:12px"><a href="#/subject/${s.code}" style="text-decoration:none"><span class="n num" style="color:${s.color}">${esc(s.code)}</span> <b style="font-family:var(--f-display);font-size:21px">${esc(s.title)}</b> <small class="muted">· ${esc(s.type)}</small></a>${lessonList(s)}</section>`).join('')}</section>`).join('');
}
function lessonList(s, cur) {
  return `<ol class="lessons">${lessonsOf(s).map((l) => l.ready
    ? `<li><a href="#/lesson/${l.id}"${l.id === cur ? ' class="on"' : ''}><span class="i">${l.n}</span><span><b>${esc(l.title)}</b><span class="s">${esc(l.meta.summary)}</span></span>${P.done[l.id] ? '<span class="ok">✓ done</span>' : `<span class="s">${l.meta.mins} min · ${esc(l.meta.level)}</span>`}</a></li>`
    : `<li class="soon"><div><span class="i">${l.n}</span><span><b>${esc(l.title)}</b><span class="s">This lecture is being written.</span></span><span class="s">soon</span></div></li>`).join('')}</ol>`;
}
function viewSubject(s) {
  const st = stageOf(s.stage), r = subjReady(s), d = subjDone(s), n = s.lessons.length;
  const labs = LABS.filter((x) => x.subject === s.code);
  const res = [...new Set(lessonsOf(s).filter((l) => l.ready).flatMap((l) => l.meta.res || []))];
  const words = lessonsOf(s).filter((l) => l.ready).reduce((a, l) => a + (l.meta.words || 0), 0);
  const first = lessonsOf(s).find((l) => l.ready && !P.done[l.id]) || lessonsOf(s).find((l) => l.ready);
  return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><a href="#/program">Program</a><span>/</span><span>${esc(s.code)}</span></nav>
    <section class="t-head" style="--c:${s.color}"><span class="n">${esc(s.code)} · ${esc(s.type)} · ${esc(st ? st.title : '')}</span><h1>${esc(s.title)}</h1><p class="lead-p">${esc(s.blurb)}</p>
      <div class="astats"><span><b>${n}</b> lectures</span><span><b>${r}</b> ready</span>${words ? `<span><b>${num(words)}</b> words</span>` : ''}<span><b>${d}</b> done</span></div>
      <div class="row-btns">${first ? `<a class="btn gold" href="#/lesson/${first.id}">${d ? 'Continue' : 'Start'}: ${esc(first.title)} →</a>` : ''}<a class="btn" href="${esc(s.handbook)}" target="_blank" rel="noopener">Official subject outline ↗</a>${s.handbook2 ? `<a class="btn" href="${esc(s.handbook2)}" target="_blank" rel="noopener">Companion subject ↗</a>` : ''}</div></section>
    <section class="glass" style="--c:${s.color};display:grid;gap:10px"><div class="eyebrow" style="color:${s.color}">What you will be able to do</div><ul class="outc">${s.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></section>
    <section class="glass" style="--c:${s.color};display:grid;gap:12px"><div class="eyebrow" style="color:${s.color}">Lectures</div>${lessonList(s)}</section>
    ${labs.length ? `<section style="display:grid;gap:12px"><div class="eyebrow" style="color:#b3a8ff">Labs for this subject</div><div class="cards3">${labs.map(labCard).join('')}</div></section>` : ''}
    ${res.length ? `<section class="glass" style="display:grid;gap:10px"><div class="eyebrow" style="color:#b3a8ff">Readings and sources</div><ul class="res">${res.map(resItem).join('')}</ul></section>` : ''}`;
}
function block(b, i) {
  const [k, v] = b, a = ` data-i="${i}"`;
  switch (k) {
    case 'p': return `<p${a}>${fmt(v)}</p>`;
    case 'h': return `<h2${a} id="sec-${i}">${fmt(v)}</h2>`;
    case 'h3': return `<h3${a}>${fmt(v)}</h3>`;
    case 'math': return `<div class="math"${a} data-tex="${esc(v)}"></div>`;
    case 'list': return `<ul${a}>${v.map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>`;
    case 'olist': return `<ol${a}>${v.map((x) => `<li>${fmt(x)}</li>`).join('')}</ol>`;
    case 'steps': return `<ol class="steps"${a}>${v.map((x) => `<li>${fmt(x)}</li>`).join('')}</ol>`;
    case 'note': return `<div class="call note"${a}><b>Professor’s note</b>${fmt(v)}</div>`;
    case 'key': return `<div class="call key"${a}><b>Key idea</b>${fmt(v)}</div>`;
    case 'warn': return `<div class="call warn"${a}><b>Common mistake</b>${fmt(v)}</div>`;
    case 'defs': return `<dl class="defs"${a}>${v.map(([t, d]) => `<div><dt>${fmt(t)}</dt><dd>${fmt(d)}</dd></div>`).join('')}</dl>`;
    case 'example': return `<div class="ex"${a}><div class="h"><small>Worked example</small>${fmt(v.title)}</div>${v.setup ? `<div class="setup">${paras(v.setup)}</div>` : ''}<ol>${v.steps.map((x) => `<li>${fmt(x)}</li>`).join('')}</ol><div class="ans"><b>Answer.</b> ${fmt(v.answer)}</div></div>`;
    case 'table': return `<figure class="tw"${a}>${v.caption ? `<figcaption>${fmt(v.caption)}</figcaption>` : ''}<div class="tscroll"><table><thead><tr>${v.head.map((h) => `<th>${fmt(h)}</th>`).join('')}</tr></thead><tbody>${v.rows.map((r) => `<tr>${r.map((c) => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></figure>`;
    case 'code': return `<div class="code"${a}><div class="h"><span>${esc(v.lang === 'excel' ? 'Excel' : v.lang === 'py' || v.lang === 'python' ? 'Python' : v.lang === 'r' ? 'R' : v.lang || 'code')}</span><button type="button" class="copy">Copy</button></div><pre><code>${esc(v.src)}</code></pre></div>`;
    case 'lab': { const x = LABS.find((l) => l.id === v); return x ? `<div class="labcall"${a}><span><b>🧪 Try it: ${esc(x.title)}</b><br><span class="muted" style="font-size:14px">${esc(x.blurb)}</span></span><a class="btn small" href="#/lab/${x.id}">Open the lab →</a></div>` : ''; }
    case 'case': return `<div class="case"${a}><div class="h"><small>Case study</small>${fmt(v.title)}</div><div class="t">${paras(v.text)}</div>${v.questions && v.questions.length ? `<div class="cq"><b>Questions to discuss</b><ol>${v.questions.map((q) => `<li>${fmt(q)}</li>`).join('')}</ol></div>` : ''}</div>`;
    default: return '';
  }
}
const EXL = { num: 'Calculation · auto-checked', mcq: 'Multiple choice', long: 'Written answer · model answer' };
function exHtml(x, j, id) {
  const solved = P.solved[id + '#' + j];
  let body;
  if (x.type === 'num') { body = `<div class="row"><input type="text" inputmode="decimal" placeholder="Your answer${x.unit ? ' (' + esc(x.unit) + ')' : ''}" aria-label="Answer to exercise ${j + 1}"><button type="button" class="btn small chk">Check</button><span class="fb"></span></div>${x.hint ? `<details class="hint"><summary>Hint</summary><div>${paras(x.hint)}</div></details>` : ''}`; }
  else if (x.type === 'mcq') { body = `<div class="opts">${x.options.map((o, k) => `<button type="button" class="btn small opt" data-k="${k}"><b>${String.fromCharCode(65 + k)}.</b> ${fmt(o)}</button>`).join('')}</div><span class="fb"></span>`; }
  else { body = `<textarea rows="4" placeholder="Write your answer first. It stays in this box only." aria-label="Your answer to exercise ${j + 1}"></textarea><div class="row"><button type="button" class="btn small rev">Compare with the model answer</button></div>`; }
  const sol = x.type === 'long'
    ? `<details class="sol"${solved ? ' open' : ''}><summary>Model answer</summary><div>${paras(x.answer)}${x.solution ? `<div class="guide">${paras(x.solution)}</div>` : ''}</div></details>`
    : `<details class="sol"${solved ? ' open' : ''}><summary>Worked solution</summary><div>${paras(x.solution)}</div></details>`;
  return `<div class="exq ${x.type}${solved ? ' done' : ''}" data-j="${j}"><div class="tagl">${EXL[x.type] || ''}${x.level ? ' · ' + esc(x.level) : ''}</div><div class="q"><b>${j + 1}.</b> ${fmt(x.q)}</div>${body}${sol}</div>`;
}
function viewLessonShell(l, s) {
  return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><a href="#/subject/${s.code}">${esc(s.code)} ${esc(s.title)}</a><span>/</span><span>Lecture ${l.n}</span></nav><div id="lesson-host"><div class="glass" style="--c:${s.color}"><p class="muted" style="margin:0">Loading the lecture…</p></div></div>`;
}
function viewLesson(L, l, s) {
  const list = lessonsOf(s), ready = list.filter((x) => x.ready);
  const all = allReady(), k = all.findIndex((x) => x.id === l.id);
  const prev = all[k - 1], next = all[k + 1];
  const secs = L.body.map((b, i) => [b, i]).filter(([b]) => b[0] === 'h');
  return `<div class="lesson-wrap">
    <article class="reader" id="reader" style="--c:${s.color}">
      <header class="lhead" data-i="intro"><div class="mline"><span class="badge" style="color:${s.color};border-color:${s.color}">${esc(s.code)} · ${esc(s.short)}</span><span class="badge">Lecture ${l.n} of ${list.length}</span><span class="badge">${L.mins} min</span><span class="badge">${esc(L.level)}</span>${P.done[l.id] ? '<span class="badge live">✓ completed</span>' : ''}</div>
        <h1>${fmt(L.title)}</h1><p class="sum">${fmt(L.summary)}</p></header>
      ${canSpeak() ? `<div class="lec-cta"><button type="button" class="btn gold" id="lec-start">🎧 Start the lecture</button><span class="muted">I will read this lesson aloud with your device’s English voice and highlight each part as we go. Tip: while the lecture is playing, click any paragraph to jump there.</span></div>` : ''}
      <div class="obj" data-i="obj"><h4>By the end of this lecture you will be able to</h4><ul>${L.objectives.map((o) => `<li>${fmt(o)}</li>`).join('')}</ul></div>
      <div class="rb" id="rb">${L.body.map(block).join('')}</div>
      <h2 class="ex-h" data-i="exh">Exercises <small>${L.exercises.length}</small></h2>
      <p class="muted" style="margin:0 0 6px;font-size:14px">Numeric answers are checked instantly; small rounding differences are accepted. Written questions have a model answer to compare with once you have tried.</p>
      <div class="exs">${L.exercises.map((x, j) => exHtml(x, j, l.id)).join('')}</div>
      ${L.glossary && L.glossary.length ? `<h2 class="ex-h">Key terms</h2><dl class="defs gl">${L.glossary.map(([t, d]) => `<div><dt>${fmt(t)}</dt><dd>${fmt(d)}</dd></div>`).join('')}</dl>` : ''}
      <div class="row-btns" style="margin-top:26px">${P.done[l.id] ? '<span class="badge live">Lecture completed</span>' : '<button type="button" class="btn gold" id="complete">Mark lecture complete · +50 XP</button>'}</div>
      ${(L.resources || []).length ? `<h2 class="ex-h">Go deeper</h2><ul class="res">${L.resources.map(resItem).join('')}</ul>` : ''}
      <div class="pn">${prev ? `<a class="btn" href="#/lesson/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn gold" href="#/lesson/${next.id}">${next.code !== s.code ? 'Next subject: ' : ''}${esc(next.title)} →</a>` : ''}</div>
    </article>
    <aside class="side-card glass" style="--c:${s.color}"><div class="eyebrow" style="color:${s.color}"><a href="#/subject/${s.code}" style="color:inherit;text-decoration:none">${esc(s.code)} · ${esc(s.title)}</a></div>
      <div class="sbar"><i style="width:${Math.round(100 * subjDone(s) / list.length)}%;background:${s.color}"></i></div>
      ${secs.length ? `<div class="toc"><h5>In this lecture</h5><ol>${secs.map(([b, i]) => `<li><button type="button" data-go="${i}">${fmt(b[1])}</button></li>`).join('')}<li><button type="button" data-go="exh">Exercises</button></li></ol></div>` : ''}
      <div class="toc"><h5>All lectures in ${esc(s.short)} · ${ready.length}/${list.length} ready</h5><ol>${list.map((x) => x.ready ? `<li><a class="${x.id === l.id ? 'on' : ''}" href="#/lesson/${x.id}">${esc(x.title)}${P.done[x.id] ? ' ✓' : ''}</a></li>` : `<li class="soon">${esc(x.title)}</li>`).join('')}</ol></div>
    </aside>
  </div>`;
}
// Accepts 8,655.38 · 8655.38 · 8655,38 · −1.8 · 13% · $343.86 · A$1,200 · ₫10,623,522
const parseNum = (s) => {
  let c = String(s).trim().replace(/[−–]/g, '-').replace(/[\s$₫%A-Za-z]/g, '');
  if (c.includes('.') && c.includes(',')) { c = c.replace(/,/g, ''); }
  else if (/^-?\d+,\d{1,2}$/.test(c)) { c = c.replace(',', '.'); }
  else { c = c.replace(/,/g, ''); }
  return parseFloat(c);
};
let lecture = null;
function bindLesson(L, l, s) {
  const view = $('view');
  P.last = l.id; save();
  view.querySelectorAll('.exq').forEach((box) => {
    const j = +box.dataset.j, x = L.exercises[j], sk = l.id + '#' + j, fb = box.querySelector('.fb');
    const sol = box.querySelector('details.sol');
    const win = (xp) => { box.classList.add('done'); sol.open = true; if (!P.solved[sk]) { P.solved[sk] = 1; save(); addXp(xp, xp > 5 ? 'correct' : 'answer compared'); } };
    if (x.type === 'num') {
      const inp = box.querySelector('input'), go = () => {
        const v = parseNum(inp.value);
        if (!isFinite(v)) { fb.innerHTML = '<span class="muted">Enter a number.</span>'; return; }
        const ok = Math.abs(v - x.answer) <= (x.tol != null ? x.tol : Math.abs(x.answer) * 0.005);
        fb.innerHTML = ok ? '<span class="up">✓ Correct</span>' : '<span class="down">Not quite. Check your steps or open the hint.</span>';
        if (ok) { win(10); }
      };
      box.querySelector('.chk').addEventListener('click', go);
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { go(); } });
    } else if (x.type === 'mcq') {
      box.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
        const k = +b.dataset.k, ok = k === x.answer;
        box.querySelectorAll('.opt').forEach((o) => o.classList.remove('right', 'wrong'));
        b.classList.add(ok ? 'right' : 'wrong');
        if (!ok) { box.querySelector(`.opt[data-k="${x.answer}"]`).classList.add('right'); }
        fb.innerHTML = ok ? '<span class="up">✓ Correct</span>' : '<span class="down">The right answer is highlighted. Read the solution.</span>';
        if (ok) { win(10); } else { sol.open = true; }
      }));
    } else {
      box.querySelector('.rev').addEventListener('click', () => { const t = box.querySelector('textarea').value.trim(); if (t.length < 15) { toast('Write a short answer first'); box.querySelector('textarea').focus(); return; } win(5); });
    }
  });
  view.querySelectorAll('.code .copy').forEach((b) => b.addEventListener('click', () => {
    const src = b.closest('.code').querySelector('code').textContent;
    const done = () => { b.textContent = 'Copied'; setTimeout(() => { b.textContent = 'Copy'; }, 1400); };
    try { navigator.clipboard.writeText(src).then(done, () => { selectCode(b); }); } catch (e) { selectCode(b); }
  }));
  view.querySelectorAll('.toc [data-go]').forEach((b) => b.addEventListener('click', () => { const el = view.querySelector(`[data-i="${b.dataset.go}"]`); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }));
  const c = $('complete');
  if (c) { c.addEventListener('click', () => { P.done[l.id] = 1; save(); addXp(50, 'lecture complete'); c.outerHTML = '<span class="badge live">Lecture completed</span>'; }); }
  // Scroll-spy for the table of contents
  const heads = [...view.querySelectorAll('.rb h2[data-i], .ex-h[data-i]')];
  if ('IntersectionObserver' in window && heads.length) {
    const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { view.querySelectorAll('.toc [data-go]').forEach((b) => b.classList.toggle('on', b.dataset.go === e.target.dataset.i)); } }); }, { rootMargin: '-15% 0px -70% 0px' });
    heads.forEach((h) => io.observe(h));
    const prevClean = cleanup; cleanup = () => { io.disconnect(); if (prevClean) { prevClean(); } };
  }
  // Lecture mode
  const startBtn = $('lec-start');
  if (startBtn) {
    const meta = { n: l.n, subject: `${s.title}` };
    const reader = $('reader');
    const begin = (from) => {
      if (!lecture) {
        lecture = createLecture(reader, segmentsFor(L, meta), {
          onPulse: () => { pulse = 1; },
          onDone: (closed) => { if (!closed && !P.heard[l.id]) { P.heard[l.id] = 1; save(); addXp(20, 'lecture heard'); } if (closed) { lecture = null; startBtn.textContent = '🎧 Start the lecture'; } },
        });
      }
      if (lecture) { lecture.start(from); startBtn.textContent = '🎧 Restart the lecture'; }
    };
    startBtn.addEventListener('click', () => begin(null));
    reader.addEventListener('click', (e) => {
      if (!lecture || e.target.closest('a,button,input,textarea,select,summary,details')) { return; }
      const el = e.target.closest('[data-i]');
      if (el) { lecture.jump(el.dataset.i); }
    });
  }
}
function selectCode(b) { const r = document.createRange(); r.selectNodeContents(b.closest('.code').querySelector('code')); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = 'Press Ctrl+C'; }
function viewSoon(l, s) {
  return `<section class="glass" style="--c:${s.color};display:grid;gap:12px"><div class="eyebrow" style="color:${s.color}">${esc(s.code)} · Lecture ${l.n}</div><h1 style="font-family:var(--f-display);font-size:clamp(26px,3vw,40px);margin:0">${esc(l.title)}</h1><p class="muted" style="margin:0">This lecture is being written. Lectures are published subject by subject, each with full notes, worked examples and exercises.</p><div class="row-btns"><a class="btn gold" href="#/subject/${s.code}">Back to ${esc(s.title)}</a></div></section>`;
}
function viewLabs() { return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">Labs</div><h1>Learn by playing with the numbers.</h1><p class="lead-p">Every lab is live: move a slider and the maths updates instantly. Two of them are fully 3D.</p></section><div class="cards3">${LABS.map(labCard).join('')}</div>`; }
function viewGames() { return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">Games</div><h1>Serious fun.</h1><p class="lead-p">Short games that teach a real lesson about markets and formulas. Scores give XP.</p></section><div class="cards3">${GAMES.map(gameCard).join('')}</div>`; }
function viewLibrary() {
  const by = {};
  Object.entries(RES).forEach(([k, r]) => { (by[r.kind] = by[r.kind] || []).push(k); });
  return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">Library</div><h1>The best free material, curated.</h1><p class="lead-p">Every link was checked to load. Official sources for data, law and policy; university lectures for depth; classic textbooks listed without links.</p></section>
    <section class="glass lib">${Object.entries(by).map(([kind, ks]) => `<div class="grp"><h4>${esc(kind)}</h4><ul>${ks.map((k) => { const r = RES[k]; return `<li><a href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.t)} ↗</a><small>${esc(r.src)}</small></li>`; }).join('')}</ul></div>`).join('')}<div class="grp"><h4>Textbooks</h4><ul>${Object.values(BOOKS).map((b) => `<li>📘 ${esc(b)}</li>`).join('')}</ul></div></section>`;
}
function viewLab(x) {
  const s = subjectByCode(x.subject);
  return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><a href="#/labs">Labs</a><span>/</span><span>${esc(x.title)}</span></nav>
    <section class="t-head" style="--c:${x.color}"><span class="n">Lab${s ? ' · ' + esc(s.code) + ' ' + esc(s.title) : ''}</span><h1>${esc(x.title)}</h1><p class="lead-p">${esc(x.blurb)}</p></section>
    <section class="glass" id="lab-box" style="--c:${x.color}"></section>
    ${s ? `<p class="muted">Learn the theory in <a href="#/subject/${s.code}">${esc(s.code)} ${esc(s.title)}</a>.</p>` : ''}`;
}
function viewGame(x) { return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><a href="#/games">Games</a><span>/</span><span>${esc(x.title)}</span></nav><section class="t-head" style="--c:${x.color}"><span class="n">Game</span><h1>${esc(x.title)}</h1><p class="lead-p">${esc(x.blurb)}</p></section><section class="glass" id="game-box"></section>`; }

// ================= Router =================
let cleanup = null, routeName = 'home', DATA = null, token = 0;
function loadData() { if (DATA) { return Promise.resolve(DATA); } return fetch(href('data/latest.json') + '?t=' + Date.now(), { cache: 'no-store' }).then((r) => r.json()).then((d) => { DATA = d; return d; }).catch(() => null); }
function finish(view) {
  mathify(view);
  shell.observe(view);
  view.querySelectorAll('.rise').forEach((el) => el.classList.add('in'));
}
function route() {
  if (cleanup) { try { cleanup(); } catch (e) { /* ignore */ } cleanup = null; }
  if (lecture) { lecture.destroy(); lecture = null; }
  const my = ++token;
  const h = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const view = $('view');
  let name = h[0] || 'home', html = '', after = null, focusSubj = null, title = '';
  if (name === 'subject' && subjectByCode(h[1])) { const s = subjectByCode(h[1]); html = viewSubject(s); focusSubj = s; title = `${s.code} ${s.title}`; }
  else if (name === 'lesson' && h[1]) {
    const code = h[1].replace(/-\d+$/, ''), s = subjectByCode(code), l = s ? lessonsOf(s).find((x) => x.id === h[1]) : null;
    if (l) {
      focusSubj = s; title = l.title;
      if (!l.ready) { html = viewSoon(l, s); }
      else {
        html = viewLessonShell(l, s);
        after = () => loadLesson(l.id).then((L) => {
          if (my !== token) { return; }
          const host = $('lesson-host');
          host.outerHTML = viewLesson(L, l, s);
          bindLesson(L, l, s);
          finish(view);
        }).catch(() => { if (my === token) { $('lesson-host').innerHTML = '<div class="glass"><p class="muted" style="margin:0">Could not load this lecture. Check your connection and reload.</p></div>'; } });
      }
    } else { name = 'home'; html = viewHome(); }
  }
  else if (name === 'lab' && LABS.find((x) => x.id === h[1])) { const x = LABS.find((q) => q.id === h[1]); html = viewLab(x); focusSubj = subjectByCode(x.subject); title = x.title; after = () => { cleanup = mountLab(x.id, $('lab-box')); }; }
  else if (name === 'game' && GAMES.find((x) => x.id === h[1])) { const x = GAMES.find((g) => g.id === h[1]); html = viewGame(x); title = x.title; after = () => { $('game-box').innerHTML = '<p class="muted">Loading…</p>'; loadData().then((d) => { if (my !== token) { return; } cleanup = mountGame(x.id, $('game-box'), { data: d, onXp: (n) => addXp(n, 'game') }); mathify($('game-box')); }); }; }
  else if (name === 'program' || name === 'tracks') { name = 'program'; html = viewProgram(); title = 'Program'; }
  else if (name === 'labs') { html = viewLabs(); title = 'Labs'; }
  else if (name === 'games') { html = viewGames(); title = 'Games'; }
  else if (name === 'library') { html = viewLibrary(); title = 'Library'; }
  else { name = 'home'; html = viewHome(); }
  routeName = name;
  view.innerHTML = html;
  document.querySelectorAll('.subnav a').forEach((a) => a.classList.toggle('on', a.dataset.v === (name === 'subject' || name === 'lesson' ? 'program' : name === 'lab' ? 'labs' : name === 'game' ? 'games' : name)));
  if (after) { after(); }
  finish(view);
  window.scrollTo({ top: 0, behavior: 'auto' });
  focus = focusSubj && name !== 'lesson' && !(mobile && name === 'subject') ? planets.find((p) => p.s === focusSubj) || null : null;
  if (eng && !focus) {
    if (name === 'home') { eng.setTarget(mobile ? [0, 40, 96] : [-34, 34, 92], mobile ? [0, 10, 0] : [-30, -4, 0]); }
    else if (name === 'lesson' || name === 'subject') { eng.setTarget([0, 16, 74], [0, 62, -60]); }
    else { eng.setTarget([0, 54, 76], [0, 0, 0]); }
  }
  document.title = (title ? title + ' · ' : '') + 'JayV Academy · JayV Finance';
}
window.addEventListener('hashchange', route);
window.addEventListener('resize', () => { mobile = mqMobile.matches; });
window.addEventListener('pagehide', () => { if (lecture) { lecture.destroy(); } });
renderXp();
route();
if (eng) { eng.jump(); }
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
