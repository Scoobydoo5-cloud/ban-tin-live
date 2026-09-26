// JayV Academy: a 3D galaxy of tracks, a lesson reader with KaTeX, auto-checked exercises, labs, games and XP.
import { createEngine, glowSprite, canvasTexture, fontsReady, THREE, mqMobile, REDUCED } from '../core/engine.js';
import { initShell } from '../core/shell.js';
import { href } from '../core/data.js';
import { TRACKS, LABS, GAMES, findLesson, allLessons, META_LIVE } from '../academy/catalog.js';
import { RES, BOOKS } from '../academy/resources.js';
import { mountLab } from '../academy/labs.js';
import { mountGame } from '../academy/games.js';

const shell = initShell('academy', { accent: '#9b8cff' });
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let mobile = mqMobile.matches;

// ================= Tiến độ (chỉ lưu trong trình duyệt này) =================
const KEY = 'jayv-academy-v1';
let P = { done: {}, solved: {}, xp: 0 };
try { P = Object.assign(P, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* trình duyệt chặn lưu trữ */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* bỏ qua */ } };
const RANKS = [[0, 'Intern'], [200, 'Analyst'], [600, 'Associate'], [1200, 'Vice President'], [2000, 'Director'], [3000, 'Managing Director']];
const rank = () => RANKS.filter((r) => P.xp >= r[0]).pop()[1];
function toast(t) { const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 1800); }
function addXp(n, why) { if (!n) { return; } P.xp += n; save(); renderXp(); toast(`+${n} XP${why ? ' · ' + why : ''}`); }
function renderXp() { const d = Object.keys(P.done).length; $('xp').textContent = `${P.xp} XP · ${rank()} · ${d}/${META_LIVE.lessons} lessons`; }
const trackDone = (t) => t.lessons.filter((l) => P.done[t.id + '/' + l.id]).length;

// ================= Thiên hà 3D =================
const eng = createEngine($('gl'), {
  ground: '#07061a', fog: 0.006, bloom: [0.95, 0.55, 0.5], rimColor: 0x9b8cff, hemi: 0.4,
  dust: { n: 4200, spread: [260, 140, 260], center: [0, 0, 0], color: 0xd9d2ff, size: 0.14, opacity: 0.55 },
  camPos: [-14, 22, 52], camLook: [-12, -2, 0], parallax: [1.4, 0.9],
});
const galaxy = new THREE.Group();
const planets = [];
let focus = null, gTags = null;
if (eng) {
  const S = eng.scene;
  galaxy.rotation.x = 0.32;
  S.add(galaxy);
  const star = new THREE.Mesh(new THREE.SphereGeometry(2.8, 48, 32), new THREE.MeshBasicMaterial({ color: 0xfff1c9 }));
  galaxy.add(star);
  [[0xffe2a8, 16, 0.55], [0x9b8cff, 34, 0.25], [0x5fe3e0, 60, 0.1]].forEach(([c, s, o]) => galaxy.add(glowSprite(c, s, o)));
  fontsReady.then(() => {
    const tex = canvasTexture(2048, 64, (g, w, h) => {
      g.font = '700 34px "Unbounded", sans-serif'; g.fillStyle = '#e7e2ff'; g.textBaseline = 'middle';
      const t = 'JAYV ACADEMY  ·  FINANCE, TAUGHT PROPERLY  ·  '; let x = 0; const tw = g.measureText(t).width;
      const n = Math.max(1, Math.round(w / tw)); g.setTransform(w / (n * tw), 0, 0, 1, 0, 0);
      for (let i = 0; i < n; i++) { g.fillText(t, x, h / 2); x += tw; }
    });
    tex.wrapS = THREE.RepeatWrapping;
    const band = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 4.6, 0.7, 96, 1, true), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false }));
    band.userData.tex = tex;
    galaxy.add(band);
    galaxy.userData.band = band;
  });
  TRACKS.forEach((t, i) => {
    const R = 9 + i * 3.3, col = new THREE.Color(t.color);
    const orbit = new THREE.Mesh(new THREE.RingGeometry(R - 0.03, R + 0.03, 160), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }));
    orbit.rotation.x = -Math.PI / 2;
    galaxy.add(orbit);
    const holder = new THREE.Group();
    galaxy.add(holder);
    const size = 0.9 + t.lessons.length * 0.12;
    const planet = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 3), new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.28, roughness: 0.45, metalness: 0.2 }));
    holder.add(planet);
    const atm = glowSprite(col, size * 5, 0.35); holder.add(atm);
    if (i % 3 === 1) { const ring = new THREE.Mesh(new THREE.TorusGeometry(size * 1.7, 0.05, 6, 80), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8 })); ring.rotation.x = Math.PI / 2.4; holder.add(ring); }
    const moons = t.lessons.map((l, k) => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff })); holder.add(m); return { m, r: size * 1.6 + 0.35 * (k % 3), sp: 0.6 + k * 0.17, ph: k * 1.3 }; });
    planets.push({ t, R, holder, planet, moons, a: i * 0.78 + 0.3, sp: 0.09 / Math.sqrt(1 + i * 0.6), world: new THREE.Vector3() });
  });
  gTags = eng.tags($('tags-gal'));
  const els = gTags.set(planets.map((p) => ({ tag: 'a', attrs: { href: `#/track/${p.t.id}`, style: `--c:${p.t.color}` }, html: `<span style="color:${p.t.color}">${p.t.n}</span> ${esc(p.t.short)}`, pos: p.world })));
  planets.forEach((p, i) => { p.tag = els[i]; });
  // Bấm vào hành tinh
  document.addEventListener('click', (e) => {
    if (e.target.closest('a,button,input,select,textarea,.glass,.reader,.subnav,.site-header,.menu,.palette')) { return; }
    const hit = eng.pick((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, planets.map((p) => p.planet));
    if (hit) { const p = planets.find((x) => x.planet === hit.object); if (p) { location.hash = `#/track/${p.t.id}`; } }
  });
  eng.rig.auto = 0;
  eng.onFrame((t, dt) => {
    planets.forEach((p) => {
      if (!REDUCED && (!focus || focus === p)) { p.a += dt * p.sp * (focus ? 0.25 : 1); }
      p.holder.position.set(Math.cos(p.a) * p.R, Math.sin(p.a * 2) * 0.35, Math.sin(p.a) * p.R);
      p.planet.rotation.y += dt * 0.3;
      p.moons.forEach((m) => { const a = t * m.sp + m.ph; m.m.position.set(Math.cos(a) * m.r, Math.sin(a * 0.7) * 0.4, Math.sin(a) * m.r); });
      p.holder.getWorldPosition(p.world);
      p.world.y += 2.1;
      const hot = focus === p ? 1 : 0;
      p.planet.material.emissiveIntensity = 0.28 + hot * 0.4;
    });
    if (galaxy.userData.band) { galaxy.userData.band.userData.tex.offset.x = (t * 0.01) % 1; galaxy.userData.band.rotation.y = t * 0.03; }
    if (focus) {
      const w = focus.world.clone(); w.y -= 2.1;
      const view = routeName;
      if (view === 'track') { eng.setTarget(mobile ? [w.x, w.y + 5, w.z + 14] : [w.x + 5, w.y + 3.5, w.z + 11], mobile ? [w.x, w.y - 2.4, w.z] : [w.x - 3.5, w.y, w.z]); }
      else { eng.setTarget([w.x + 7, w.y + 5, w.z + 16], [w.x, w.y, w.z]); }
    }
    gTags.update((!focus && !(mobile && routeName === 'home')) || routeName === 'track');
  });
  eng.start();
  shell.onWarp = () => eng.warp();
}

// ================= Hiển thị =================
function mathify(el) {
  if (!el) { return; }
  el.querySelectorAll('.math[data-tex]').forEach((m) => { try { window.katex.render(m.dataset.tex, m, { displayMode: true, throwOnError: false }); } catch (e) { m.textContent = m.dataset.tex; } });
  if (window.renderMathInElement) { window.renderMathInElement(el, { delimiters: [{ left: '\\(', right: '\\)', display: false }, { left: '\\[', right: '\\]', display: true }], throwOnError: false, ignoredClasses: ['math'] }); }
}
const resItem = (k) => {
  if (k.startsWith('book:')) { const b = BOOKS[k.slice(5)]; return b ? `<li>📘 ${esc(b)} <small>(book)</small></li>` : ''; }
  const r = RES[k];
  return r ? `<li><a href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.t)} ↗</a> <small>· ${esc(r.src)} · ${esc(r.kind)}</small></li>` : '';
};
function trackCard(t) {
  const d = trackDone(t);
  return `<a class="glass tc rise" data-tilt href="#/track/${t.id}" style="--c:${t.color}"><span class="n">${t.n}</span><h3>${esc(t.title)}</h3><p>${esc(t.blurb)}</p><div class="meta"><span>${t.lessons.length} lessons</span><span>· ${esc(t.level)}</span><span>· ${d}/${t.lessons.length} done</span></div><div class="bar"><i style="width:${Math.round(100 * d / t.lessons.length)}%"></i></div></a>`;
}
const labCard = (x) => `<a class="glass lc rise" data-tilt href="#/lab/${x.id}" style="--c:${x.color}"><b>🧪 ${esc(x.title)}</b><span>${esc(x.blurb)}</span></a>`;
const gameCard = (x) => `<a class="glass lc rise" data-tilt href="#/game/${x.id}" style="--c:${x.color}"><b>🎮 ${esc(x.title)}</b><span>${esc(x.blurb)}</span></a>`;
const PATHS = [
  { name: 'University finance core', c: '#e9b85c', d: 'The spine of a Finance degree, in the order most courses teach it.', ids: [['foundations', 'tvm'], ['foundations', 'statements'], ['corporate', 'capbudget'], ['corporate', 'wacc'], ['investments', 'riskreturn'], ['investments', 'capm'], ['fixedincome', 'bonds'], ['derivatives', 'options']] },
  { name: 'CFA Level I warm-up', c: '#9b8cff', d: 'Build the base the Level I curriculum assumes, then start on ethics.', ids: [['cfa', 'cfa-map'], ['foundations', 'stats'], ['economics', 'macro'], ['cfa', 'fsa'], ['cfa', 'ethics'], ['cfa', 'quant-cfa']] },
  { name: 'Quant starter', c: '#c6f36b', d: 'From log returns to Monte Carlo and honest backtests.', ids: [['foundations', 'returns'], ['quant', 'randomwalk'], ['quant', 'timeseries'], ['quant', 'montecarlo'], ['derivatives', 'bsm'], ['quant', 'backtest']] },
];

function viewHome() {
  const d = Object.keys(P.done).length;
  const next = allLessons().find((x) => !P.done[x.track.id + '/' + x.lesson.id]);
  return `<section class="a-hero">
      <div class="eyebrow" style="color:#b3a8ff">07 · JayV Academy · taught in English</div>
      <h1 class="display lines in"><span class="ln"><span>Finance,</span></span><span class="ln"><span class="v">taught properly.</span></span></h1>
      <div class="prof"><span class="av">Prof</span><p>I’m your professor for this academy: rigorous, practical and honest about what finance can and cannot predict. Every lesson has the intuition, the formula, a worked example with real numbers, exercises that check your answer, and links to the best free university material.</p></div>
      <div class="astats"><span><b>${META_LIVE.tracks}</b> tracks</span><span><b>${META_LIVE.lessons}</b> lessons</span><span><b>${META_LIVE.labs}</b> interactive labs</span><span><b>${META_LIVE.games}</b> games</span><span>You: <b>${d}</b> done · <b>${P.xp}</b> XP · ${rank()}</span></div>
      <div class="row-btns">${next ? `<a class="btn gold" href="#/lesson/${next.track.id}/${next.lesson.id}">${d ? 'Continue' : 'Start'}: ${esc(next.lesson.title)} <span class="arr">→</span></a>` : ''}<a class="btn" href="#/tracks">Browse all tracks</a><a class="btn" href="#/game/bullbear">Play Bull or Bear</a></div>
      <p class="faint" style="font-size:12.5px;margin:0">Click a planet in the galaxy to fly to its track. Progress is stored only in this browser.</p>
    </section>
    <section style="display:grid;gap:16px"><div class="sec-h"><h2 class="big" style="font-size:clamp(24px,3vw,40px)">Eight tracks</h2><a class="btn" href="#/tracks">All lessons →</a></div><div class="tracks">${TRACKS.map(trackCard).join('')}</div></section>
    <section style="display:grid;gap:16px"><h2 class="big" style="font-size:clamp(24px,3vw,40px)">Learning paths</h2><div class="paths">${PATHS.map((p) => `<div class="glass path rise" style="--c:${p.c}"><b style="font-size:18px">${esc(p.name)}</b><p class="muted" style="margin:6px 0 0;font-size:14px">${esc(p.d)}</p><ol>${p.ids.map(([t, l], i) => { const f = findLesson(t, l); return f ? `<li><a href="#/lesson/${t}/${l}" style="--c:${f.track.color}">${i + 1}. ${esc(f.lesson.title)}${P.done[t + '/' + l] ? ' ✓' : ''}</a></li>` : ''; }).join('')}</ol></div>`).join('')}</div></section>
    <section style="display:grid;gap:16px"><div class="sec-h"><h2 class="big" style="font-size:clamp(24px,3vw,40px)">Labs &amp; games</h2><a class="btn" href="#/labs">All labs →</a></div><div class="cards3">${LABS.slice(0, 5).map(labCard).join('')}${GAMES.map(gameCard).join('')}</div></section>
    <section class="glass rise" style="display:grid;gap:10px"><div class="eyebrow" style="color:#b3a8ff">Library</div><p style="margin:0;font-family:var(--f-serif);font-size:17px">The academy links to free, reputable sources: MIT OpenCourseWare, Yale, Khan Academy, OpenStax, NYU’s Aswath Damodaran, CFA Institute, the Fed, the RBA and more.</p><div><a class="btn" href="#/library">Open the library →</a></div></section>`;
}
function viewTracks() {
  return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">All tracks</div><h1>Every lesson, in order.</h1></section>` + TRACKS.map((t) => `<section class="glass" style="--c:${t.color};display:grid;gap:12px"><a href="#/track/${t.id}" style="text-decoration:none"><span class="n num" style="color:${t.color}">${t.n}</span> <b style="font-family:var(--f-display);font-size:22px">${esc(t.title)}</b></a><ol class="lessons">${t.lessons.map((l, i) => `<li><a href="#/lesson/${t.id}/${l.id}"><span class="i">${i + 1}</span><span><b>${esc(l.title)}</b><span class="s">${esc(l.summary)}</span></span>${P.done[t.id + '/' + l.id] ? '<span class="ok">✓ done</span>' : `<span class="s">${l.mins} min</span>`}</a></li>`).join('')}</ol></section>`).join('');
}
function viewTrack(t) {
  const labs = LABS.filter((x) => x.track === t.id);
  const res = [...new Set(t.lessons.flatMap((l) => l.resources || []))];
  return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><span>${esc(t.title)}</span></nav>
    <section class="t-head" style="--c:${t.color}"><span class="n">${t.n} · ${esc(t.level)} · ${t.lessons.length} lessons · ${trackDone(t)} done</span><h1>${esc(t.title)}</h1><p class="lead-p">${esc(t.blurb)}</p></section>
    <section class="glass" style="--c:${t.color}"><ol class="lessons">${t.lessons.map((l, i) => `<li><a href="#/lesson/${t.id}/${l.id}"><span class="i">${i + 1}</span><span><b>${esc(l.title)}</b><span class="s">${esc(l.summary)}</span></span>${P.done[t.id + '/' + l.id] ? '<span class="ok">✓ done</span>' : `<span class="s">${l.mins} min · ${esc(l.level)}</span>`}</a></li>`).join('')}</ol></section>
    ${labs.length ? `<section style="display:grid;gap:12px"><div class="eyebrow" style="color:#b3a8ff">Labs for this track</div><div class="cards3">${labs.map(labCard).join('')}</div></section>` : ''}
    <section class="glass" style="display:grid;gap:10px"><div class="eyebrow" style="color:#b3a8ff">Go deeper</div><ul class="res">${res.map(resItem).join('')}</ul></section>`;
}
function block(b) {
  const [k, v] = b;
  if (k === 'p') { return `<p>${esc(v)}</p>`; }
  if (k === 'h') { return `<h2>${esc(v)}</h2>`; }
  if (k === 'math') { return `<div class="math" data-tex="${esc(v)}"></div>`; }
  if (k === 'list') { return `<ul>${v.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`; }
  if (k === 'note') { return `<div class="note"><b>Professor’s note</b>${esc(v)}</div>`; }
  if (k === 'example') { return `<div class="ex"><div class="h"><small>Worked example</small>${esc(v.title)}</div><ol>${v.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol><div class="ans">${esc(v.answer)}</div></div>`; }
  if (k === 'table') { return `<div class="tw"><table><thead><tr>${v.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${v.rows.map((r) => `<tr>${r.map((c) => `<td style="white-space:normal">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; }
  if (k === 'code') { return `<pre><code>${esc(v.src)}</code></pre>`; }
  if (k === 'lab') { const x = LABS.find((l) => l.id === v); return x ? `<div class="labcall"><span><b>🧪 Try it: ${esc(x.title)}</b><br><span class="muted" style="font-size:14px">${esc(x.blurb)}</span></span><a class="btn small" href="#/lab/${x.id}">Open the lab →</a></div>` : ''; }
  return '';
}
function viewLesson(f) {
  const { track: t, lesson: l, i } = f, key = t.id + '/' + l.id;
  const prev = t.lessons[i - 1], next = t.lessons[i + 1];
  const nextTrack = !next ? TRACKS[TRACKS.indexOf(t) + 1] : null;
  return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><a href="#/track/${t.id}">${esc(t.title)}</a><span>/</span><span>Lesson ${i + 1}</span></nav>
  <div class="lesson-wrap">
    <article class="reader" style="--c:${t.color}">
      <div class="mline"><span class="badge" style="color:${t.color};border-color:${t.color}">${t.n} · ${esc(t.short)}</span><span class="badge">${l.mins} min</span><span class="badge">${esc(l.level)}</span>${P.done[key] ? '<span class="badge live">✓ completed</span>' : ''}</div>
      <h1>${esc(l.title)}</h1><p class="sum">${esc(l.summary)}</p>
      <div class="obj"><h4>You will be able to</h4><ul>${l.objectives.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>
      <div class="rb">${l.body.map(block).join('')}</div>
      <h2 style="font-family:var(--f-display);font-size:26px;margin-top:34px">Exercises</h2>
      <div class="exs">${l.exercises.map((x, j) => {
        const sk = key + '#' + j, solved = P.solved[sk];
        return `<div class="exq${solved ? ' done' : ''}" data-j="${j}"><div class="q"><b>${j + 1}.</b> ${esc(x.q)}</div>${x.type === 'num'
          ? `<div class="row"><input type="text" inputmode="decimal" placeholder="Your answer" aria-label="Answer to exercise ${j + 1}"><button type="button" class="btn small chk">Check</button><span class="fb"></span></div>${x.hint ? `<details><summary>Hint</summary><div>${esc(x.hint)}</div></details>` : ''}`
          : `<div class="row">${x.options.map((o, k) => `<button type="button" class="btn small opt" data-k="${k}">${String.fromCharCode(65 + k)}. ${esc(o)}</button>`).join('')}</div><span class="fb"></span>`}
          <details${solved ? ' open' : ''}><summary>Show worked solution</summary><div>${esc(x.solution)}</div></details></div>`;
      }).join('')}</div>
      <div class="row-btns" style="margin-top:26px">${P.done[key] ? '<span class="badge live">Lesson completed</span>' : '<button type="button" class="btn gold" id="complete">Mark lesson complete · +50 XP</button>'}</div>
      <h2 style="font-family:var(--f-display);font-size:22px;margin-top:34px">Go deeper</h2>
      <ul class="res">${(l.resources || []).map(resItem).join('')}</ul>
      <div class="pn">${prev ? `<a class="btn" href="#/lesson/${t.id}/${prev.id}">← ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a class="btn gold" href="#/lesson/${t.id}/${next.id}">${esc(next.title)} →</a>` : nextTrack ? `<a class="btn gold" href="#/track/${nextTrack.id}">Next track: ${esc(nextTrack.title)} →</a>` : ''}</div>
    </article>
    <aside class="side-card glass"><div class="eyebrow" style="color:${t.color}">${esc(t.title)}</div><div class="bar" style="height:5px;border-radius:3px;background:rgba(255,255,255,0.08);overflow:hidden"><i style="display:block;height:100%;width:${Math.round(100 * trackDone(t) / t.lessons.length)}%;background:${t.color}"></i></div><ol>${t.lessons.map((x) => `<li><a class="${x.id === l.id ? 'on' : ''}" href="#/lesson/${t.id}/${x.id}">${esc(x.title)}${P.done[t.id + '/' + x.id] ? ' ✓' : ''}</a></li>`).join('')}</ol></aside>
  </div>`;
}
function bindLesson(f) {
  const { track: t, lesson: l } = f, key = t.id + '/' + l.id;
  const view = $('view');
  // Chấp nhận 8,655.38 · 8655.38 · 8655,38 · −1.8 · 13% · $343.86 · ₫10,623,522
  const parseNum = (s) => {
    let c = String(s).trim().replace(/[−–]/g, '-').replace(/[\s$₫%A-Za-z]/g, '');
    if (c.includes('.') && c.includes(',')) { c = c.replace(/,/g, ''); }
    else if (/^-?\d+,\d{1,2}$/.test(c)) { c = c.replace(',', '.'); }
    else { c = c.replace(/,/g, ''); }
    return parseFloat(c);
  };
  view.querySelectorAll('.exq').forEach((box) => {
    const j = +box.dataset.j, x = l.exercises[j], sk = key + '#' + j, fb = box.querySelector('.fb');
    const win = () => { box.classList.add('done'); box.querySelector('details:last-of-type').open = true; if (!P.solved[sk]) { P.solved[sk] = 1; save(); addXp(10, 'correct'); } };
    if (x.type === 'num') {
      const inp = box.querySelector('input'), go = () => {
        const v = parseNum(inp.value);
        if (!isFinite(v)) { fb.innerHTML = '<span class="muted">Enter a number.</span>'; return; }
        const ok = Math.abs(v - x.answer) <= (x.tol != null ? x.tol : Math.abs(x.answer) * 0.005);
        fb.innerHTML = ok ? '<span class="up">✓ Correct</span>' : '<span class="down">Not quite. Check your steps or open the hint.</span>';
        if (ok) { win(); }
      };
      box.querySelector('.chk').addEventListener('click', go);
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { go(); } });
    } else {
      box.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
        const k = +b.dataset.k, ok = k === x.answer;
        box.querySelectorAll('.opt').forEach((o) => o.classList.remove('right', 'wrong'));
        b.classList.add(ok ? 'right' : 'wrong');
        if (!ok) { box.querySelector(`.opt[data-k="${x.answer}"]`).classList.add('right'); }
        fb.innerHTML = ok ? '<span class="up">✓ Correct</span>' : '<span class="down">The right answer is highlighted.</span>';
        if (ok) { win(); } else { box.querySelector('details:last-of-type').open = true; }
      }));
    }
  });
  const c = $('complete');
  if (c) { c.addEventListener('click', () => { P.done[key] = 1; save(); addXp(50, 'lesson complete'); c.outerHTML = '<span class="badge live">Lesson completed</span>'; }); }
}
function viewLabs() { return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">Labs</div><h1>Learn by playing with the numbers.</h1><p class="lead-p">Every lab is live: move a slider and the maths updates instantly. Two of them are fully 3D.</p></section><div class="cards3">${LABS.map(labCard).join('')}</div>`; }
function viewGames() { return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">Games</div><h1>Serious fun.</h1><p class="lead-p">Short games that teach a real lesson about markets and formulas. Scores give XP.</p></section><div class="cards3">${GAMES.map(gameCard).join('')}</div>`; }
function viewLibrary() {
  const by = {};
  Object.entries(RES).forEach(([k, r]) => { (by[r.kind] = by[r.kind] || []).push(k); });
  return `<section class="t-head"><div class="eyebrow" style="color:#b3a8ff">Library</div><h1>The best free material, curated.</h1><p class="lead-p">Every link was checked to load. Official sources for data and policy; university lectures for depth; classic textbooks listed without links.</p></section>
    <section class="glass lib">${Object.entries(by).map(([kind, ks]) => `<div class="grp"><h4>${esc(kind)}</h4><ul>${ks.map((k) => { const r = RES[k]; return `<li><a href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.t)} ↗</a><small>${esc(r.src)}</small></li>`; }).join('')}</ul></div>`).join('')}<div class="grp"><h4>Textbooks</h4><ul>${Object.values(BOOKS).map((b) => `<li>📘 ${esc(b)}</li>`).join('')}</ul></div></section>`;
}
function viewLab(x) {
  const lessons = allLessons().filter((f) => f.lesson.body.some((b) => b[0] === 'lab' && b[1] === x.id));
  return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><a href="#/labs">Labs</a><span>/</span><span>${esc(x.title)}</span></nav>
    <section class="t-head" style="--c:${x.color}"><span class="n">Lab</span><h1>${esc(x.title)}</h1><p class="lead-p">${esc(x.blurb)}</p></section>
    <section class="glass" id="lab-box" style="--c:${x.color}"></section>
    ${lessons.length ? `<p class="muted">Learn the theory: ${lessons.map((f) => `<a href="#/lesson/${f.track.id}/${f.lesson.id}">${esc(f.lesson.title)}</a>`).join(', ')}.</p>` : ''}`;
}
function viewGame(x) { return `<nav class="crumbs"><a href="#/">Academy</a><span>/</span><a href="#/games">Games</a><span>/</span><span>${esc(x.title)}</span></nav><section class="t-head" style="--c:${x.color}"><span class="n">Game</span><h1>${esc(x.title)}</h1><p class="lead-p">${esc(x.blurb)}</p></section><section class="glass" id="game-box"></section>`; }

// ================= Định tuyến =================
let cleanup = null, routeName = 'home', DATA = null;
function loadData() { if (DATA) { return Promise.resolve(DATA); } return fetch(href('data/latest.json') + '?t=' + Date.now(), { cache: 'no-store' }).then((r) => r.json()).then((d) => { DATA = d; return d; }).catch(() => null); }
function route() {
  if (cleanup) { try { cleanup(); } catch (e) { /* bỏ qua */ } cleanup = null; }
  const h = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const view = $('view');
  let name = h[0] || 'home', html = '', after = null, focusTrack = null;
  if (name === 'track' && TRACKS.find((t) => t.id === h[1])) { const t = TRACKS.find((x) => x.id === h[1]); html = viewTrack(t); focusTrack = t; }
  else if (name === 'lesson' && findLesson(h[1], h[2])) { const f = findLesson(h[1], h[2]); html = viewLesson(f); focusTrack = f.track; after = () => bindLesson(f); }
  else if (name === 'lab' && LABS.find((x) => x.id === h[1])) { const x = LABS.find((l) => l.id === h[1]); html = viewLab(x); focusTrack = TRACKS.find((t) => t.id === x.track); after = () => { cleanup = mountLab(x.id, $('lab-box')); }; }
  else if (name === 'game' && GAMES.find((x) => x.id === h[1])) { const x = GAMES.find((g) => g.id === h[1]); html = viewGame(x); after = () => { $('game-box').innerHTML = '<p class="muted">Loading…</p>'; loadData().then((d) => { cleanup = mountGame(x.id, $('game-box'), { data: d, onXp: (n) => addXp(n, 'game') }); mathify($('game-box')); }); }; }
  else if (name === 'tracks') { html = viewTracks(); }
  else if (name === 'labs') { html = viewLabs(); }
  else if (name === 'games') { html = viewGames(); }
  else if (name === 'library') { html = viewLibrary(); }
  else { name = 'home'; html = viewHome(); }
  routeName = name;
  view.innerHTML = html;
  document.querySelectorAll('.subnav a').forEach((a) => a.classList.toggle('on', a.dataset.v === (name === 'track' || name === 'lesson' ? 'tracks' : name === 'lab' ? 'labs' : name === 'game' ? 'games' : name)));
  if (after) { after(); }
  mathify(view);
  shell.observe(view);
  view.querySelectorAll('.rise').forEach((el) => el.classList.add('in'));
  window.scrollTo({ top: 0, behavior: 'auto' });
  // camera
  focus = focusTrack ? planets.find((p) => p.t === focusTrack) || null : null;
  if (eng && !focus) {
    if (name === 'home') { eng.setTarget(mobile ? [0, 30, 70] : [-14, 22, 52], mobile ? [0, 8, 0] : [-12, -2, 0]); }
    else { eng.setTarget([0, 46, 64], [0, 0, 0]); }
  }
  document.title = (name === 'lesson' && focusTrack ? findLesson(h[1], h[2]).lesson.title + ' · ' : '') + 'JayV Academy · JayV Finance';
}
window.addEventListener('hashchange', route);
window.addEventListener('resize', () => { mobile = mqMobile.matches; });
renderXp();
route();
if (eng) { eng.jump(); }
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
