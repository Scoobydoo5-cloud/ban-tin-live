// Trang Bản tin: lốc giấy báo quanh tiêu đề, đường bay qua chuỗi nguyên nhân, rừng cột xác suất của sổ dự báo.
import { createEngine, createTimeline, fontsReady, glowSprite, canvasTexture, THREE, UP, DOWN, GOLD, mqMobile, REDUCED } from '../core/engine.js';
import { initShell } from '../core/shell.js';
import { createFeed } from '../core/data.js';
import { esc, clamp, probOf } from '../core/fmt.js';

const shell = initShell('brief');
const $ = (id) => document.getElementById(id);
let mobile = mqMobile.matches;
let CONTENT = null;
const SKY = new THREE.Color('#7fb2ff');
const WAIT = new THREE.Color('#3f6fff');
const Z = { hero: 0, chain: -60, fc: -240 };

const eng = createEngine($('gl'), {
  ground: '#070b18', fog: 0.012, bloom: [0.75, 0.45, 0.66], rimColor: 0x7fb2ff,
  dust: { n: 2200, spread: [140, 70, 320], center: [0, 10, -130], color: 0x9fc3ff, size: 0.11, opacity: 0.3 },
  camPos: [-7, 3, 24], camLook: [-7, 2, 0],
});
const std = (o) => new THREE.MeshStandardMaterial(o);

// ================= 1. Lốc giấy báo =================
function wrapLines(g, text, maxW, maxLines) {
  const words = String(text || '').split(/\s+/), out = [];
  let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (g.measureText(t).width > maxW && line) { out.push(line); line = w; if (out.length >= maxLines) { break; } } else { line = t; }
  }
  if (out.length < maxLines && line) { out.push(line); }
  return out;
}
function sheetTexture(head, when) {
  return canvasTexture(2048, 1280, (g, w, h) => {
    g.fillStyle = '#f3eee3'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#16130e'; g.font = '800 120px "Unbounded", sans-serif'; g.textBaseline = 'top'; g.fillText('BẢN TIN', 90, 70);
    g.font = '700 40px "Be Vietnam Pro", sans-serif'; g.fillStyle = '#7a5a1c'; g.fillText('JAYV FINANCE', w - 90 - g.measureText('JAYV FINANCE').width, 110);
    g.font = '500 34px "Be Vietnam Pro", sans-serif'; g.fillStyle = '#6b6254'; g.fillText(when || 'Việt Nam · Úc · Mỹ', 94, 220);
    g.fillStyle = '#16130e'; g.fillRect(90, 280, w - 180, 8); g.fillRect(90, 298, w - 180, 3);
    g.font = '700 74px "Be Vietnam Pro", sans-serif'; g.fillStyle = '#16130e';
    const lines = wrapLines(g, head, w - 180, 4);
    lines.forEach((l, i) => g.fillText(l, 90, 340 + i * 92));
    const y0 = 360 + lines.length * 92 + 20;
    g.fillStyle = 'rgba(22,19,14,0.2)';
    for (let c = 0; c < 3; c++) { for (let r = 0; r < 12; r++) { const x = 90 + c * ((w - 180) / 3 + 10), yy = y0 + r * 44; if (yy > h - 60) { break; } g.fillRect(x, yy, (w - 180) / 3 - 40 - (r % 5 === 4 ? 140 : 0), 18); } }
  });
}
let hero = null;
if (eng) {
  const S = eng.scene;
  hero = new THREE.Group();
  S.add(hero);
  const small = canvasTexture(512, 360, (g, w, h) => {
    g.fillStyle = '#efe9dd'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#16130e'; g.fillRect(24, 22, 200, 30); g.fillRect(24, 64, w - 48, 4);
    g.fillStyle = 'rgba(22,19,14,0.25)';
    for (let r = 0; r < 12; r++) { g.fillRect(24 + (r % 2) * 0, 84 + r * 22, w - 48 - (r % 4 === 3 ? 120 : 0), 9); }
  });
  const N = mobile ? 120 : 240;
  const papers = new THREE.InstancedMesh(new THREE.PlaneGeometry(1.7, 1.2), std({ map: small, color: 0xa8a296, roughness: 0.9, side: THREE.DoubleSide }), N);
  const P = Array.from({ length: N }, () => ({ r: 7 + Math.random() * 12, a: Math.random() * Math.PI * 2, y: -5 + Math.random() * 14, sp: 0.04 + Math.random() * 0.12, rx: Math.random() * 6, ry: Math.random() * 6, rs: 0.3 + Math.random() }));
  hero.add(papers);
  hero.userData.tick = (t, dt) => {
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(1, 1, 1), p = new THREE.Vector3();
    P.forEach((o, i) => {
      o.a += dt * o.sp * (REDUCED ? 0 : 1);
      p.set(Math.cos(o.a) * o.r, o.y + Math.sin(t * 0.4 + i) * 0.5, Math.sin(o.a) * o.r);
      e.set(o.rx + t * 0.3 * o.rs, o.ry + t * 0.2 * o.rs, 0);
      m4.compose(p, q.setFromEuler(e), s);
      papers.setMatrixAt(i, m4);
    });
    papers.instanceMatrix.needsUpdate = true;
  };
  const main = new THREE.Mesh(new THREE.PlaneGeometry(10, 6.25), std({ color: 0xcfc9bd, roughness: 0.85, side: THREE.DoubleSide }));
  main.position.set(0, 2, 0);
  hero.add(main);
  hero.userData.main = main;
  const halo = glowSprite(SKY, 30, 0.25); halo.position.set(0, 2, -4); hero.add(halo);
}

// ================= 2. Chuỗi nguyên nhân =================
const chain = new THREE.Group();
let nodes = [], chainCurve = null, pulses = [];
function nodePos(i) { return new THREE.Vector3(Math.sin(i * 1.15) * 8, 2 + Math.cos(i * 0.9) * 2.2, Z.chain - i * 24); }
function buildChain(items) {
  if (!eng) { return; }
  while (chain.children.length) { chain.remove(chain.children[0]); }
  nodes = []; pulses = [];
  const n = Math.max(1, items.length);
  const pts = [];
  for (let i = 0; i < n; i++) {
    const p = nodePos(i), last = i === n - 1;
    const col = last ? GOLD : SKY;
    const g = new THREE.Group();
    g.position.copy(p);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(last ? 1.6 : 1.15, 1), std({ color: col, emissive: col, emissiveIntensity: 0.3, roughness: 0.25, metalness: 0.5, flatShading: true }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(last ? 2.6 : 2, 0.04, 8, 96), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.7 }));
    const ring2 = ring.clone(); ring2.rotation.x = Math.PI / 2; ring2.scale.setScalar(1.25);
    const glow = glowSprite(col, 8, 0.16);
    g.add(core, ring, ring2, glow);
    chain.add(g);
    nodes.push({ g, core, ring, ring2, last });
    pts.push(p);
  }
  if (pts.length > 1) {
    chainCurve = new THREE.CatmullRomCurve3(pts);
    chain.add(new THREE.Mesh(new THREE.TubeGeometry(chainCurve, 300, 0.07, 8), new THREE.MeshBasicMaterial({ color: SKY, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false })));
    for (let k = 0; k < 8; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffffff })); chain.add(s); pulses.push(s); }
  }
}
if (eng) { eng.scene.add(chain); }

// ================= 3. Rừng cột xác suất =================
const forest = new THREE.Group();
forest.position.z = Z.fc;
let pillars = [];
function buildForest(fc) {
  if (!eng) { return; }
  while (forest.children.length) { forest.remove(forest.children[0]); }
  pillars = [];
  const floor = new THREE.Mesh(new THREE.CircleGeometry(30, 64), std({ color: 0x0b1428, roughness: 0.3, metalness: 0.5 }));
  floor.rotation.x = -Math.PI / 2; forest.add(floor);
  const grid = new THREE.PolarGridHelper(28, 16, 8, 64, 0x2a4f8f, 0x16284a);
  grid.position.y = 0.02; forest.add(grid);
  const n = fc.length;
  fc.forEach((x, j) => {
    const pr = probOf(x.prob) || 0.5, col = x.result === 'ok' ? UP : x.result === 'miss' ? DOWN : WAIT;
    const px = (j - (n - 1) / 2) * 2.7, pz = -Math.abs(j - (n - 1) / 2) * 0.9;
    const H = 7;
    const g = new THREE.Group();
    g.position.set(px, 0, pz);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, H, 40, 1, true), new THREE.MeshPhysicalMaterial({ color: 0xbfd6ff, transparent: true, opacity: 0.16, roughness: 0.05, metalness: 0, side: THREE.DoubleSide, depthWrite: false }));
    glass.position.y = H / 2;
    const liqGeo = new THREE.CylinderGeometry(0.56, 0.56, 1, 32); liqGeo.translate(0, 0.5, 0);
    const liq = new THREE.Mesh(liqGeo, std({ color: col, emissive: col, emissiveIntensity: 0.8, roughness: 0.2, transparent: true, opacity: 0.92 }));
    liq.scale.y = 0.001;
    const cap = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.05, 8, 48), new THREE.MeshBasicMaterial({ color: col }));
    cap.rotation.x = Math.PI / 2; cap.position.y = H;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 0.25, 40), std({ color: 0x1b2a44, metalness: 0.7, roughness: 0.3 }));
    base.position.y = 0.12;
    g.add(glass, liq, cap, base);
    forest.add(g);
    pillars.push({ g, liq, target: Math.max(0.05, pr) * H, cur: 0, x, glass, delay: j * 0.08 });
  });
}
if (eng) { eng.scene.add(forest); }

// ================= Chữ =================
function render() {
  const b = (CONTENT && CONTENT.brief) || {};
  $('b-when').textContent = b.updated ? `Bản tin · ${b.updated}` : 'Bản tin hôm nay';
  $('b-lead').textContent = b.headline || 'Chưa có bản tin.';
  const fc = b.forecasts || [];
  const ok = fc.filter((x) => x.result === 'ok').length, miss = fc.filter((x) => x.result === 'miss').length;
  $('b-meta').innerHTML = `<span class="badge">${(b.chain || []).length} mắt xích nguyên nhân</span><span class="badge">${fc.length} dự báo trong sổ</span>${ok + miss ? `<span class="badge live">đúng ${ok}/${ok + miss}</span>` : ''}`;
  $('b-paras').innerHTML = (b.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('');
  $('b-lesson').textContent = b.lesson || '';
  $('fc-score').innerHTML = ok + miss ? `<b class="num">${ok}/${ok + miss}</b><span class="muted">đã chấm là đúng · ${fc.length - ok - miss} đang chờ</span>` : `<b class="num">${fc.length}</b><span class="muted">dự báo đang chờ đến hạn</span>`;
  $('fc-body').innerHTML = fc.slice().reverse().map((x) => {
    const pr = probOf(x.prob);
    return `<tr><td class="num">${esc(x.made)}</td><td class="t">${esc(x.text)}</td><td class="r num">${esc(x.prob)}${pr != null ? `<span class="pbar"><i style="width:${Math.round(pr * 100)}%"></i></span>` : ''}</td><td class="num">${esc(x.due)}</td><td><span class="pill ${esc(x.result)}">${x.result === 'ok' ? 'Đúng' : x.result === 'miss' ? 'Sai' : 'Chờ'}</span></td></tr>`;
  }).join('');
  const ch = b.chain || [];
  $('c-list').innerHTML = ch.map((c, i) => `<li><button type="button" data-i="${i}"><b>${String(i + 1).padStart(2, '0')}</b><span>${esc(c)}</span></button></li>`).join('');
  chainStep = -1;
  $('b-chain').style.height = (Math.max(2, ch.length) * 80 + 100) + 'vh';
  if (eng) {
    buildChain(ch);
    buildForest(fc);
    fontsReady.then(() => { hero.userData.main.material.map = sheetTexture(b.headline, b.updated); hero.userData.main.material.needsUpdate = true; });
  }
  requestAnimationFrame(() => tl.build());
}
let chainStep = -1;
function showChain(i) {
  const ch = (CONTENT && CONTENT.brief && CONTENT.brief.chain) || [];
  if (!ch.length || i === chainStep) { return; }
  const first = chainStep < 0;
  chainStep = i;
  const box = $('chain-copy');
  const fill = () => {
    $('c-step').textContent = `${i + 1} / ${ch.length}`;
    $('c-node').textContent = ch[i];
    $('c-so').textContent = i < ch.length - 1 ? `→ dẫn tới: ${ch[i + 1]}` : 'Kết quả cuối chuỗi: điều thị trường vừa phản ánh.';
    box.classList.remove('out');
  };
  $('c-list').querySelectorAll('button').forEach((b, j) => { b.classList.toggle('on', j === i); b.classList.toggle('done', j < i); });
  if (first || REDUCED) { fill(); } else { box.classList.add('out'); setTimeout(fill, 200); }
}
$('c-list').addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) { const n = CONTENT.brief.chain.length; tl.scrollToStep('b-chain', n > 1 ? +b.dataset.i / (n - 1) : 0); } });

// Rê lên cột để xem dự báo
const fcStage = document.querySelector('#b-fc .stage');
fcStage.addEventListener('pointermove', (e) => {
  if (!eng || !pillars.length) { return; }
  const hit = eng.pick((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, pillars.map((p) => p.g), true);
  const p = hit && pillars.find((x) => { let n = hit.object; while (n) { if (n === x.g) { return true; } n = n.parent; } return false; });
  pillars.forEach((x) => { x.hot = x === p; });
  if (p) {
    const x = p.x;
    $('fc-detail').innerHTML = `<div class="m">Lập ${esc(x.made)} · hạn ${esc(x.due)} · xác suất ${esc(x.prob)}</div><div class="t">${esc(x.text)}</div><div><span class="pill ${esc(x.result)}">${x.result === 'ok' ? 'Đúng' : x.result === 'miss' ? 'Sai' : 'Chờ chấm'}</span></div>`;
  }
}, { passive: true });

createFeed({ live: false, onContent(c) { CONTENT = c; render(); }, onFresh(f) { shell.setFresh(f); } });

// ================= Camera =================
const tl = createTimeline(() => {
  const m = mobile;
  const ch = (CONTENT && CONTENT.brief && CONTENT.brief.chain) || [0, 0, 0, 0, 0];
  const n = ch.length;
  return {
    'b-hero': { ground: '#070b18', bloom: 0.75, keys: [
      { p: 0, pos: m ? [0, 1, 30] : [-7.5, 3, 22], look: m ? [0, 5.5, 0] : [-7.5, 2.2, 0] },
      { p: 1, pos: m ? [0, 6, 26] : [-4, 7, 19], look: m ? [0, 3, -10] : [0, 2, -12] }] },
    'b-chain': { ground: '#060a1a', bloom: 0.85, keys: Array.from({ length: n }, (_, i) => {
      const v = nodePos(i);
      return { p: n > 1 ? i / (n - 1) : 0, pos: m ? [v.x, v.y + 2.5, v.z + 15] : [v.x + 6, v.y + 2.2, v.z + 12.5], look: m ? [v.x, v.y - 2.6, v.z] : [v.x - 4.2, v.y, v.z] };
    }) },
    'b-story': { ground: '#080b16', bloom: 0.6, keys: [{ p: 0.5, pos: [-26, 30, Z.chain - n * 24 + 20], look: [0, 0, Z.chain - n * 12] }] },
    'b-fc': { ground: '#071022', bloom: 0.85, keys: [
      { p: 0, pos: m ? [-4, 14, Z.fc + 30] : [-12, 11, Z.fc + 23], look: m ? [0, 7, Z.fc] : [3, 6.2, Z.fc] },
      { p: 1, pos: m ? [4, 15, Z.fc + 28] : [10, 12, Z.fc + 21], look: m ? [0, 7, Z.fc] : [2, 6.4, Z.fc] }] },
    'b-fclist': { ground: '#05080d', bloom: 0.6, keys: [{ p: 0.5, pos: [0, 26, Z.fc + 30], look: [0, 0, Z.fc - 10] }] },
  };
});

let active = 'b-hero';
const dots = [...document.querySelectorAll('.dots a')];
if (eng) {
  let first = true;
  eng.onFrame((t, dt) => {
    const s = tl.sample(window.scrollY);
    if (s) { eng.setTarget(s.pos, s.look); eng.setGround(s.ground, s.bloom); if (first) { eng.jump(); first = false; } }
    if (hero.userData.tick) { hero.userData.tick(t, dt); }
    const main = hero.userData.main;
    main.rotation.y = -0.32 + Math.sin(t * 0.4) * 0.08; main.rotation.x = Math.sin(t * 0.3) * 0.05; main.position.y = 2 + Math.sin(t * 0.7) * 0.2;
    nodes.forEach((nd, i) => {
      const on = i === chainStep && active === 'b-chain' ? 1 : 0;
      nd.core.rotation.set(t * 0.4 + i, t * 0.5, 0);
      nd.ring.rotation.z = t * (0.6 + i * 0.1); nd.ring2.rotation.y = -t * 0.4;
      const sc = nd.core.scale.x + ((1 + on * 0.35) - nd.core.scale.x) * Math.min(1, dt * 5);
      nd.core.scale.setScalar(sc);
      nd.core.material.emissiveIntensity = 0.25 + on * 0.45;
    });
    if (chainCurve) { pulses.forEach((p, k) => p.position.copy(chainCurve.getPoint((t * 0.05 + k / pulses.length) % 1))); }
    const fcOn = active === 'b-fc' || active === 'b-fclist';
    pillars.forEach((p, j) => {
      const goal = fcOn ? p.target : 0.001;
      if (fcOn && t < (p.t0 || (p.t0 = t)) + p.delay) { return; }
      p.cur += (goal - p.cur) * Math.min(1, dt * 2.2);
      p.liq.scale.y = Math.max(0.001, p.cur);
      const hs = p.hot ? 1.12 : 1;
      p.g.scale.x += (hs - p.g.scale.x) * Math.min(1, dt * 8); p.g.scale.z = p.g.scale.x;
    });
  });
  eng.start();
  shell.onWarp = () => eng.warp();
}
function tick() {
  const y = window.scrollY, vh = window.innerHeight;
  const cur = tl.current();
  if (cur && cur !== active) { active = cur; dots.forEach((d) => d.classList.toggle('on', d.getAttribute('href') === '#' + active)); }
  const ch = (CONTENT && CONTENT.brief && CONTENT.brief.chain) || [];
  if (ch.length) { showChain(Math.round(tl.progressOf('b-chain') * (ch.length - 1))); }
  $('progress').style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - vh), 0, 1)})`;
  requestAnimationFrame(tick);
}
window.addEventListener('resize', () => { mobile = mqMobile.matches; tl.build(); });
window.addEventListener('load', () => tl.build());
tl.build();
requestAnimationFrame(tick);
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
