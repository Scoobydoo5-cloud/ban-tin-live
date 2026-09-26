// Trang Báo cáo tuần (nền giấy): ba khối đá khắc số cho ba ý chính, cây kịch bản có quả to nhỏ theo xác suất.
import { createEngine, createTimeline, fontsReady, canvasTexture, THREE, mqMobile, REDUCED } from '../core/engine.js';
import { initShell } from '../core/shell.js';
import { createFeed } from '../core/data.js';
import { esc, clamp, probOf } from '../core/fmt.js';
import { RoundedBoxGeometry } from '../../vendor/jsm/geometries/RoundedBoxGeometry.js';

const shell = initShell('report', { accent: '#b8862e' });
const $ = (id) => document.getElementById(id);
let mobile = mqMobile.matches;
let CONTENT = null;
const GROUND = '#ece5d6';
const INK = new THREE.Color('#1b1813'), BRONZE = new THREE.Color('#b8862e');
const SC_COL = [new THREE.Color('#c9962e'), new THREE.Color('#17693f'), new THREE.Color('#a8331f')];

const eng = createEngine($('gl'), {
  ground: GROUND, fog: 0.011, bloom: [0.14, 0.3, 0.9], exposure: 1.0, env: 'room', shadows: true, shadowBox: 40,
  hemi: 0.8, skyLight: 0xfff6e6, groundLight: 0xb8a88a, key: 2.2, keyColor: 0xfff1dc, rim: 0.4, rimColor: 0xffe2b0,
  dust: { n: 900, spread: [120, 40, 160], center: [10, 10, -20], color: 0x8a6420, size: 0.09, opacity: 0.35, blending: 'normal' },
  camPos: [-9, 6, 22], camLook: [-7, 4, 0], parallax: [0.8, 0.5],
});
const std = (o) => new THREE.MeshStandardMaterial(o);
const SLABS = [new THREE.Vector3(-5.5, 0, 0), new THREE.Vector3(0.5, 0, -3), new THREE.Vector3(6.5, 0, 0.5)];
const TREE = new THREE.Vector3(34, 0, -44);
let slabs = [], orbs = [], tree = null;

if (eng) {
  const S = eng.scene;
  eng.key.position.set(-18, 34, 22);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), std({ color: 0xe6dcc8, roughness: 0.95, metalness: 0 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
  S.add(floor);
  // đường kẻ mảnh như giấy kẻ ô
  const grid = new THREE.GridHelper(160, 80, 0xcdbf9f, 0xd9ccb0);
  grid.position.y = 0.01; grid.material.transparent = true; grid.material.opacity = 0.55;
  S.add(grid);
}

function slabTexture(n, lead) {
  return canvasTexture(512, 1280, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = '#e9c27a'; g.font = '800 260px "Unbounded", sans-serif'; g.textBaseline = 'top';
    g.fillText(n, 40, 70);
    g.fillStyle = 'rgba(233,194,122,0.85)'; g.fillRect(44, 380, w - 88, 6);
    g.font = '600 40px "Be Vietnam Pro", sans-serif'; g.fillStyle = 'rgba(244,239,228,0.92)';
    const words = String(lead || '').split(/\s+/); let line = '', y = 420;
    for (const wd of words) { const t = line ? line + ' ' + wd : wd; if (g.measureText(t).width > w - 88 && line) { g.fillText(line, 44, y); y += 54; line = wd; if (y > h - 200) { break; } } else { line = t; } }
    if (line && y <= h - 200) { g.fillText(line, 44, y); }
    g.fillStyle = 'rgba(233,194,122,0.5)';
    for (let i = 0; i < 6; i++) { g.fillRect(44, h - 170 + i * 22, w - 88 - (i % 3) * 60, 4); }
  });
}
function buildSlabs(keys) {
  if (!eng) { return; }
  slabs.forEach((s) => eng.scene.remove(s.g));
  slabs = [];
  SLABS.forEach((p, i) => {
    const g = new THREE.Group();
    g.position.copy(p);
    const body = new THREE.Mesh(new RoundedBoxGeometry(3.4, 8.4, 0.9, 5, 0.14), std({ color: INK, roughness: 0.55, metalness: 0.25 }));
    body.position.y = 4.2; body.castShadow = true; body.receiveShadow = true;
    const tex = slabTexture(String(i + 1).padStart(2, '0'), keys[i] ? keys[i].lead : '');
    const face = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 7.75), std({ map: tex, transparent: true, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.4 }));
    face.position.set(0, 4.2, 0.46);
    const plinth = new THREE.Mesh(new RoundedBoxGeometry(4.2, 0.45, 1.8, 3, 0.1), std({ color: BRONZE, metalness: 0.9, roughness: 0.3 }));
    plinth.position.y = 0.22; plinth.castShadow = true; plinth.receiveShadow = true;
    g.add(body, face, plinth);
    g.rotation.y = [0.28, 0, -0.26][i];
    eng.scene.add(g);
    slabs.push({ g, body, face, lift: 0 });
  });
}

function buildTree(scen) {
  if (!eng) { return; }
  if (tree) { eng.scene.remove(tree); }
  orbs = [];
  tree = new THREE.Group();
  tree.position.copy(TREE);
  const bark = std({ color: BRONZE, metalness: 0.85, roughness: 0.32 });
  const trunk = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 3, 0.2), new THREE.Vector3(-0.2, 6, 0)]), 40, 0.55, 14), bark);
  trunk.castShadow = true; tree.add(trunk);
  const root = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.8, 0.5, 32), bark); root.position.y = 0.25; root.castShadow = true; tree.add(root);
  const tips = [new THREE.Vector3(-0.4, 12.5, -0.5), new THREE.Vector3(-6.4, 10.2, 1.2), new THREE.Vector3(6.2, 9.6, 1.0)];
  tips.forEach((tip, k) => {
    const sc = scen[k] || {};
    const pr = probOf(sc.prob) || 0.33;
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.2, 6, 0), new THREE.Vector3(tip.x * 0.35, 6 + (tip.y - 6) * 0.55, tip.z * 0.4), tip]);
    const br = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.16 + pr * 0.42, 12), bark);
    br.castShadow = true; tree.add(br);
    const col = SC_COL[k];
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.7 + pr * 1.9, 40, 28), new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.18, metalness: 0.2, clearcoat: 1, emissive: col, emissiveIntensity: 0.18 }));
    orb.position.copy(tip); orb.castShadow = true;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.2 + pr * 2.1, 0.035, 8, 96), new THREE.MeshBasicMaterial({ color: col }));
    ring.position.copy(tip); ring.rotation.x = Math.PI / 2;
    tree.add(orb, ring);
    orbs.push({ orb, ring, tip: tip.clone().add(TREE), pr, base: orb.scale.x });
  });
  eng.scene.add(tree);
  if (!scenTags) { scenTags = eng.tags($('tags-scen')); }
  scenTags.set(orbs.map((o, k) => ({ html: `${esc(['Cơ sở', 'Tích cực', 'Tiêu cực'][k])} <b class="num">${esc((scen[k] || {}).prob || '')}</b>`, pos: o.tip.clone().add(new THREE.Vector3(0, 1.6 + o.pr * 2, 0)) })));
}
let scenTags = null;

// ================= Chữ =================
function render() {
  const r = (CONTENT && CONTENT.report) || {};
  $('r-issue').textContent = r.issue || 'Báo cáo tuần';
  $('r-title-t').textContent = r.title || 'Chưa có báo cáo tuần.';
  $('r-calendar').innerHTML = (r.calendar || []).map((c) => `<li><span class="w">${esc(c.when)}</span><b>${esc(c.what)}</b><span class="r">Mốc để so: ${esc(c.ref)}</span>${c.why ? `<span class="y">${esc(c.why)}</span>` : ''}</li>`).join('');
  $('r-journal').innerHTML = (r.journal || []).map((x) => `<tr><td class="num">${esc(x.made)}</td><td>${esc(x.text)}</td><td class="r num">${esc(x.prob)}</td><td class="num">${esc(x.due)}</td><td><span class="pill ${esc(x.result)}">${x.result === 'ok' ? 'Đúng' : x.result === 'miss' ? 'Sai' : 'Chờ'}</span></td></tr>`).join('');
  $('r-lesson').textContent = r.lesson || '';
  keyStep = -1; scenStep = -1;
  if (eng) { fontsReady.then(() => { buildSlabs(r.keys || []); buildTree(r.scenarios || []); requestAnimationFrame(() => tl.build()); }); }
  requestAnimationFrame(() => tl.build());
}
let keyStep = -1, scenStep = -1;
function swap(box, first, fill) { if (first || REDUCED) { fill(); box.classList.remove('out'); } else { box.classList.add('out'); setTimeout(() => { fill(); box.classList.remove('out'); }, 200); } }
function showKey(i) {
  const keys = (CONTENT && CONTENT.report && CONTENT.report.keys) || [];
  if (!keys.length || i === keyStep) { return; }
  const first = keyStep < 0; keyStep = i;
  swap($('k-copy'), first, () => { $('k-n').textContent = String(i + 1).padStart(2, '0'); $('k-h').textContent = keys[i].lead; $('k-p').textContent = keys[i].text; });
}
function showScen(i) {
  const sc = (CONTENT && CONTENT.report && CONTENT.report.scenarios) || [];
  if (!sc.length || i === scenStep) { return; }
  const first = scenStep < 0; scenStep = i;
  document.querySelectorAll('.s-tabs button').forEach((b, j) => b.classList.toggle('on', j === i));
  const s = sc[i] || {};
  swap($('s-card'), first, () => { $('s-name').textContent = s.name || ''; $('s-prob').textContent = s.prob || ''; $('s-prob').style.color = '#' + SC_COL[i].getHexString(); $('s-when').textContent = s.when || ''; $('s-then').textContent = s.then || ''; $('s-wrong').textContent = s.wrong || ''; });
}
document.querySelector('.s-tabs').addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) { tl.scrollToStep('r-scen', +b.dataset.i / 2); } });

createFeed({ live: false, onContent(c) { CONTENT = c; render(); }, onFresh(f) { shell.setFresh(f); } });

// ================= Camera =================
const tl = createTimeline(() => {
  const m = mobile;
  const kf = (p, v, i) => ({ p, pos: m ? [v.x, v.y + 5.5, v.z + 20] : [v.x + 7.5, v.y + 6.5, v.z + 16.5], look: m ? [v.x, v.y + 1.2, v.z] : [v.x - 4.6, v.y + 4.2, v.z] });
  const ok = (k) => (orbs[k] ? orbs[k].tip : TREE.clone().add(new THREE.Vector3([0, -6, 6][k], [12, 10, 10][k], 0)));
  return {
    'r-hero': { ground: GROUND, bloom: 0.14, keys: [
      { p: 0, pos: m ? [0.5, 5, 32] : [-8, 6.5, 27], look: m ? [0.5, 7, 0] : [-6.5, 4.4, 0] },
      { p: 1, pos: m ? [0.5, 8, 32] : [-7, 9, 30], look: m ? [0.5, 6, 0] : [-3, 4, 0] }] },
    'r-keys': { ground: '#ebe3d2', bloom: 0.14, keys: SLABS.map((v, i) => kf(i / 2, v, i)) },
    'r-scen': { ground: '#e8e0ce', bloom: 0.14, keys: [0, 1, 2].map((k) => { const v = ok(k); return { p: k / 2, pos: m ? [v.x, v.y + 2, v.z + 26] : [v.x + 9, v.y + 1.5, v.z + 22], look: m ? [v.x, v.y - 3.5, v.z] : [v.x - 6.5, v.y - 1.6, v.z] }; }) },
    'r-cal': { ground: GROUND, bloom: 0.12, keys: [{ p: 0.5, pos: [12, 34, 34], look: [16, 2, -18] }] },
  };
});

let active = 'r-hero';
const dots = [...document.querySelectorAll('.dots a')];
if (eng) {
  let first = true;
  eng.onFrame((t, dt) => {
    const s = tl.sample(window.scrollY);
    if (s) { eng.setTarget(s.pos, s.look); eng.setGround(s.ground, s.bloom); if (first) { eng.jump(); first = false; } }
    slabs.forEach((sl, i) => {
      const on = active === 'r-keys' && i === keyStep ? 1 : 0;
      sl.lift += (on - sl.lift) * Math.min(1, dt * 4);
      sl.g.position.y = SLABS[i].y + sl.lift * 0.6 + Math.sin(t * 0.8 + i) * 0.05;
      sl.face.material.emissiveIntensity = 0.3 + sl.lift * 0.5;
    });
    orbs.forEach((o, k) => {
      const on = active === 'r-scen' && k === scenStep ? 1 : 0;
      const sc = 1 + on * 0.12 + Math.sin(t * 1.4 + k) * 0.02;
      o.orb.scale.setScalar(sc);
      o.ring.rotation.z = t * 0.4 + k;
      o.ring.rotation.x = Math.PI / 2 + Math.sin(t * 0.6 + k) * 0.3;
      o.orb.material.emissiveIntensity = 0.12 + on * 0.35;
    });
    if (tree) { tree.rotation.y = Math.sin(t * 0.15) * 0.12; }
    if (scenTags) { scenTags.update(active === 'r-scen'); }
  });
  eng.start();
  shell.onWarp = () => eng.warp();
}
function tick() {
  const y = window.scrollY, vh = window.innerHeight;
  const cur = tl.current();
  if (cur && cur !== active) { active = cur; dots.forEach((d) => d.classList.toggle('on', d.getAttribute('href') === '#' + active)); }
  if (CONTENT) { showKey(Math.round(tl.progressOf('r-keys') * 2)); showScen(Math.round(tl.progressOf('r-scen') * 2)); }
  $('progress').style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - vh), 0, 1)})`;
  requestAnimationFrame(tick);
}
window.addEventListener('resize', () => { mobile = mqMobile.matches; tl.build(); });
window.addEventListener('load', () => tl.build());
tl.build();
requestAnimationFrame(tick);
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
