// Trang chủ JayV Finance: biểu tượng JV giữa các vòng giá chạy, rồi bay qua 7 cổng dẫn vào từng mục.
import { createEngine, createTimeline, fontsReady, glowSprite, canvasTexture, THREE, UP, DOWN, FLAT, GOLD, TEAL, mqMobile, REDUCED } from '../core/engine.js';
import { initShell, PAGES } from '../core/shell.js';
import { createFeed, href } from '../core/data.js';
import { esc, fmt, pct, cls, countUp, clamp, dpOf, probOf } from '../core/fmt.js';
import { makeEmblem, makeGlobe, makeCoin, makeAllocRing, unitBox } from '../core/props.js';
import { RoundedBoxGeometry } from '../../vendor/jsm/geometries/RoundedBoxGeometry.js';
import { MANIFEST } from '../academy/manifest.js';

const shell = initShell('home');
const $ = (id) => document.getElementById(id);
let mobile = mqMobile.matches;
let DATA = null, CONTENT = null;

const FEATS = {
  market: ['Quả địa cầu ba sàn và giờ mở cửa từng nơi', 'Sáu con số vĩ mô thành vật thể 3D', 'Bảng tổng hợp mọi chỉ số, tỷ giá, hàng hóa'],
  brief: ['Bay qua chuỗi nguyên nhân của ngày', 'Sổ dự báo: cột xác suất đúng, sai, chờ', 'Một bài học tài chính mỗi ngày'],
  report: ['Ba ý chính của tuần', 'Cây kịch bản cơ sở, tích cực, tiêu cực', 'Lịch sự kiện và sổ kịch bản'],
  stocks: ['Mỗi tòa nhà là một mã đang theo dõi', 'Đổi thước đo: hôm nay, 1 tuần, từ đầu năm', 'Bấm một tòa để xem hồ sơ nhanh'],
  fund: ['Vòng phân bổ: cổ phiếu và tiền mặt', 'Giá trị quỹ so với chỉ số', 'Quy tắc cố định, không cảm xúc'],
  academy: ['Taught in English, từ nền tảng tới nâng cao', 'CFA, kinh tế học, quant: ví dụ và bài tập', 'Phòng thí nghiệm tương tác và trò chơi'],
  board: ['Giá trực tiếp, đối chiếu hai nguồn', 'Hành vi giá: RSI, xu hướng, biến động', 'Gọn nhẹ, dùng tốt trên điện thoại'],
};
const PORTALS = ['market', 'brief', 'report', 'stocks', 'fund', 'academy', 'board'].map((id, i) => ({ ...PAGES.find((p) => p.id === id), feats: FEATS[id], i }));
PORTALS.forEach((p) => { p.pos = new THREE.Vector3((p.i % 2 ? 1 : -1) * 10, 1.5 + Math.sin(p.i * 1.3) * 1.2, -64 - p.i * 30); });

const eng = createEngine($('gl'), {
  ground: '#05080d', fog: 0.0105, bloom: [0.85, 0.5, 0.58], exposure: 1.05,
  dust: { n: 3200, spread: [180, 90, 360], center: [0, 12, -120], size: 0.13, opacity: 0.42 },
  camPos: mobile ? [0, 3, 40] : [-7.5, 5, 27], camLook: mobile ? [0, -2, 0] : [-7.5, 4.2, 0],
});
const std = (o) => new THREE.MeshStandardMaterial(o);

// ================= Cảnh mở màn =================
const hero = new THREE.Group();
hero.position.set(0, 4, 0);
let emblem = null, ring1 = null, ring2 = null, candles = null, candleGroup = null;
let spinVel = 0, flip = 0;
if (eng) {
  const S = eng.scene;
  S.add(hero);
  emblem = makeEmblem();
  emblem.group.scale.setScalar(0.62);
  hero.add(emblem.group);
  const halo = glowSprite(0xe9b85c, 22, 0.35); halo.position.z = -2; hero.add(halo);
  [[0x5fe3e0, 60, [-30, 10, -60], 0.18], [0x9b8cff, 70, [34, 20, -90], 0.16], [0xe9b85c, 50, [10, -10, -30], 0.12]].forEach(([c, s, p, o]) => { const g = glowSprite(c, s, o); g.position.set(...p); S.add(g); });
  const polar = new THREE.PolarGridHelper(30, 24, 14, 96, 0x2c7f82, 0x123a40);
  polar.position.y = -6.5;
  polar.material.transparent = true; polar.material.opacity = 0.45;
  hero.add(polar);

  // Hai vòng giá chạy
  const mkRing = (R, h, tilt) => {
    const tex = canvasTexture(4096, 96, () => {});
    tex.wrapS = THREE.RepeatWrapping;
    const m = new THREE.Mesh(new THREE.CylinderGeometry(R, R, h, 160, 1, true), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, side: THREE.FrontSide }));
    const holder = new THREE.Group();
    holder.rotation.set(tilt[0], 0, tilt[1]);
    holder.add(m);
    hero.add(holder);
    return { mesh: m, tex, holder };
  };
  ring1 = mkRing(7.6, 0.95, [0.3, -0.16]);
  ring2 = mkRing(9.2, 0.8, [-0.2, 0.26]);
  // Vòng nến VN-Index
  candleGroup = new THREE.Group();
  candleGroup.rotation.set(0.14, 0, -0.06);
  hero.add(candleGroup);
  candles = new THREE.InstancedMesh(unitBox(0.34, 0.34), new THREE.MeshBasicMaterial({ color: 0xffffff }), 60);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < 60; i++) { candles.setMatrixAt(i, m4.makeScale(0.001, 0.001, 0.001)); candles.setColorAt(i, FLAT); }
  candleGroup.add(candles);
}

function drawTicker(ring, keys, extra) {
  if (!ring || !DATA) { return; }
  const cvs = ring.tex.image, g = cvs.getContext('2d');
  const parts = [];
  keys.forEach((k) => {
    const it = DATA.items[k];
    if (!it || it.last == null) { return; }
    const v = it.unit === '%' ? fmt(it.last, 2) + '%' : fmt(it.last, dpOf(it));
    parts.push([String(it.label || k).toUpperCase(), v, it.changePct]);
  });
  if (extra) { parts.push(extra); }
  g.font = '600 50px "JetBrains Mono", monospace';
  const gap = 70, seg = parts.map(([a, b, c]) => g.measureText(a + '  ' + b + '  ' + (c == null ? '' : (c >= 0 ? '▲ ' : '▼ ') + pct(c))).width + gap);
  const W = seg.reduce((a, b) => a + b, 0) || 1;
  const n = Math.max(1, Math.round(cvs.width / W));
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, cvs.width, cvs.height);
  g.setTransform(cvs.width / (n * W), 0, 0, 1, 0, 0);
  g.textBaseline = 'middle';
  let x = 0;
  for (let r = 0; r < n; r++) {
    parts.forEach(([a, b, c], i) => {
      g.fillStyle = 'rgba(160,220,215,0.85)'; g.fillText(a, x, 50);
      let w = g.measureText(a + '  ').width;
      g.fillStyle = '#ffffff'; g.fillText(b, x + w, 50);
      w += g.measureText(b + '  ').width;
      if (c != null) { g.fillStyle = c > 0 ? '#38d99c' : c < 0 ? '#ff6b5c' : '#9fb3b2'; g.fillText((c >= 0 ? '▲ ' : '▼ ') + pct(c), x + w, 50); }
      g.fillStyle = 'rgba(233,184,92,0.9)'; g.fillRect(x + seg[i] - gap / 2 - 5, 45, 10, 10);
      x += seg[i];
    });
  }
  ring.tex.needsUpdate = true;
}

function setCandles() {
  if (!candles || !DATA) { return; }
  const it = DATA.items.VNINDEX;
  const v = it && it.hist ? it.hist.slice(-60) : [];
  if (v.length < 2) { return; }
  const lo = Math.min(...v), hi = Math.max(...v), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  v.forEach((c, i) => {
    const a = (i / v.length) * Math.PI * 2, R = 12.2;
    const d = i ? (c / v[i - 1] - 1) * 100 : 0;
    const h = 0.25 + Math.min(4, Math.abs(d) * 1.5);
    const y = -2.2 + 4.4 * (c - lo) / ((hi - lo) || 1) - h / 2;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -a);
    m4.compose(p.set(Math.sin(a) * R, y, Math.cos(a) * R), q, s.set(1, h, 1));
    candles.setMatrixAt(i, m4);
    candles.setColorAt(i, d > 0 ? UP : d < 0 ? DOWN : FLAT);
  });
  candles.instanceMatrix.needsUpdate = true;
  if (candles.instanceColor) { candles.instanceColor.needsUpdate = true; }
}

// ================= 7 cổng =================
const portalObjs = [];
function halo(color, r = 3.8) {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.18, 96), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  ring.rotation.x = -Math.PI / 2;
  const disc = new THREE.Mesh(new THREE.CircleGeometry(r, 64), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, depthWrite: false, blending: THREE.AdditiveBlending }));
  disc.rotation.x = -Math.PI / 2;
  const glow = glowSprite(color, r * 4.2, 0.22);
  glow.position.y = 1.5;
  g.add(ring, disc, glow);
  g.position.y = -3.1;
  return { g, ring };
}
const updaters = [];
function paperTexture() {
  return canvasTexture(1024, 720, (g, w, h) => {
    g.fillStyle = '#f2ede2'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#16130e'; g.font = '800 92px "Unbounded", sans-serif'; g.textBaseline = 'top'; g.fillText('BẢN TIN', 48, 40);
    g.font = '600 26px "Be Vietnam Pro", sans-serif'; g.fillStyle = '#6b6254'; g.fillText('JAYV FINANCE · VIỆT NAM · ÚC · MỸ', 52, 150);
    g.fillStyle = '#16130e'; g.fillRect(48, 196, w - 96, 5); g.fillRect(48, 208, w - 96, 2);
    const head = (CONTENT && CONTENT.brief && CONTENT.brief.headline) || 'Thị trường hôm nay: chuyện gì vừa xảy ra, vì sao, và điều cần theo dõi.';
    g.font = '700 38px "Be Vietnam Pro", sans-serif'; g.fillStyle = '#16130e';
    const words = head.split(' '); let line = '', y = 236, lines = 0;
    for (const wd of words) { const t = line ? line + ' ' + wd : wd; if (g.measureText(t).width > w - 100) { g.fillText(line, 48, y); y += 48; line = wd; if (++lines >= 3) { break; } } else { line = t; } }
    if (lines < 3 && line) { g.fillText(line, 48, y); y += 48; }
    g.fillStyle = 'rgba(22,19,14,0.22)';
    for (let c = 0; c < 3; c++) { for (let r = 0; r < 9; r++) { const x = 48 + c * ((w - 96) / 3 + 6), yy = y + 26 + r * 30; g.fillRect(x, yy, (w - 96) / 3 - 24 - (r % 4 === 3 ? 60 : 0), 12); } }
  });
}
function buildPortals() {
  PORTALS.forEach((P) => {
    const g = new THREE.Group();
    g.position.copy(P.pos);
    const col = new THREE.Color(P.c);
    const h = halo(col);
    g.add(h.g);
    const body = new THREE.Group();
    g.add(body);
    let spinner = null;
    if (P.id === 'market') {
      const gl = makeGlobe({ R: 3.2, n: 6000, mobile });
      gl.spin.rotation.x = 0.35;
      body.add(gl.group);
      spinner = (t, dt) => { gl.spin.rotation.y += dt * 0.25; gl.tick(t); };
      updaters.push(() => DATA && gl.setData(DATA));
    } else if (P.id === 'brief') {
      const mats = [0, 1, 2].map(() => std({ map: paperTexture(), color: 0x9a948a, roughness: 0.9, metalness: 0 }));
      const side = std({ color: 0xd8d0bf, roughness: 0.9 });
      mats.forEach((mt, i) => {
        const s = new THREE.Mesh(new THREE.BoxGeometry(6, 0.05, 4.2), [side, side, mt, side, side, side]);
        s.position.set(i * 0.25 - 0.25, i * 0.12 - 0.6, -i * 0.2);
        s.rotation.set(0.95, -0.35 + i * 0.16, 0.08 * i);
        body.add(s);
      });
      spinner = (t) => { body.rotation.y = Math.sin(t * 0.4) * 0.12; body.position.y = Math.sin(t * 0.9) * 0.15; };
      updaters.push(() => { if (CONTENT) { const tex = paperTexture(); mats.forEach((mt) => { mt.map = tex; mt.needsUpdate = true; }); } });
    } else if (P.id === 'report') {
      const bronze = std({ color: 0xd9a654, metalness: 0.85, roughness: 0.3 });
      const trunk = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, -3, 0), new THREE.Vector3(0.1, -1.5, 0.1), new THREE.Vector3(0, 0, 0)]), 24, 0.34, 12), bronze);
      body.add(trunk);
      const tips = [[-2.8, 2.1, 0.4, UP], [0, 2.9, -0.3, GOLD], [2.8, 1.9, 0.3, DOWN]];
      const branchMeshes = [];
      tips.forEach(([x, y, z, c]) => {
        const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x * 0.3, y * 0.55, z * 0.5), new THREE.Vector3(x, y, z)]);
        const br = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.2, 10), bronze);
        const orb = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 16), std({ color: c, emissive: c, emissiveIntensity: 1.2, roughness: 0.3 }));
        orb.position.set(x, y, z);
        body.add(br, orb);
        branchMeshes.push({ br, orb, curve });
      });
      spinner = (t) => { body.rotation.y = t * 0.3; };
      updaters.push(() => {
        const sc = (CONTENT && CONTENT.report && CONTENT.report.scenarios) || [];
        const order = [1, 0, 2];
        branchMeshes.forEach((b, i) => { const pr = sc[order[i]] ? probOf(sc[order[i]].prob) : null; if (pr != null) { b.orb.scale.setScalar(0.6 + pr * 1.4); b.br.scale.setScalar(1); } });
      });
    } else if (P.id === 'stocks') {
      const plate = new THREE.Mesh(new RoundedBoxGeometry(6.4, 0.18, 6.4, 3, 0.08), std({ color: 0x0e2a30, metalness: 0.5, roughness: 0.2, transparent: true, opacity: 0.85 }));
      plate.position.y = -2.6; body.add(plate);
      const towers = [];
      for (let i = 0; i < 16; i++) {
        const m = new THREE.Mesh(new RoundedBoxGeometry(1, 1, 1, 2, 0.08), std({ color: FLAT, emissive: FLAT, emissiveIntensity: 0.35, roughness: 0.25, metalness: 0.3 }));
        const x = (i % 4) * 1.45 - 2.2, z = Math.floor(i / 4) * 1.45 - 2.2;
        m.position.set(x, -2.5, z);
        body.add(m); towers.push(m);
      }
      const setT = () => {
        const ks = DATA ? (DATA.groups.watchlist || []).filter((k) => DATA.items[k]) : [];
        towers.forEach((m, i) => {
          const it = ks[i] ? DATA.items[ks[i]] : null;
          const y = it ? it.chgYtd || 0 : (Math.sin(i * 7.1) * 20);
          const h = 0.35 + Math.min(4.2, Math.abs(y) / 10);
          const c = y > 0 ? UP : y < 0 ? DOWN : FLAT;
          m.scale.set(1, h, 1); m.position.y = -2.5 + h / 2;
          m.material.color.copy(c); m.material.emissive.copy(c);
          if (it && (it.tags || []).includes('fund')) { m.material.color.copy(GOLD); m.material.emissive.copy(GOLD); }
        });
      };
      setT();
      updaters.push(setT);
      spinner = (t) => { body.rotation.y = t * 0.22; };
    } else if (P.id === 'fund') {
      const coin = makeCoin({ sym: 'JV', metal: '#f2c46a', dark: '#8a5a14', ink: '#3a2408', rimText: 'JAYV FINANCE · QUỸ MÔ PHỎNG', symSize: 380 });
      coin.scale.setScalar(1.25);
      body.add(coin);
      let ring = makeAllocRing([{ w: 0.25, col: GOLD, metal: true, thick: 0.75 }, { w: 0.75, col: new THREE.Color('#3aa7a8'), thick: 0.45 }], { R: 3.4 });
      ring.rotation.x = -Math.PI / 2 + 0.25; ring.position.y = -0.4;
      body.add(ring);
      spinner = (t) => { coin.rotation.y = t * 0.8; ring.rotation.z = t * 0.12; };
      updaters.push(() => {
        const f = DATA && DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
        if (!f) { return; }
        body.remove(ring);
        const segs = (f.holdings || []).map((x) => ({ w: x.weight, col: GOLD, metal: true, thick: 0.75 })).concat([{ w: f.cashWeight || 0, col: new THREE.Color('#3aa7a8'), thick: 0.45 }]);
        ring = makeAllocRing(segs, { R: 3.4 });
        ring.rotation.x = -Math.PI / 2 + 0.25; ring.position.y = -0.4;
        body.add(ring);
      });
    } else if (P.id === 'academy') {
      const coreGeo = new THREE.IcosahedronGeometry(1.8, 0);
      const core = new THREE.Mesh(coreGeo, new THREE.MeshPhysicalMaterial({ color: 0xb3a8ff, metalness: 0.1, roughness: 0.06, transparent: true, opacity: 0.6, emissive: 0x5a3fe0, emissiveIntensity: 0.7, clearcoat: 1, flatShading: true }));
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(coreGeo), new THREE.LineBasicMaterial({ color: 0xe7e2ff }));
      const cage = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.1, 1)), new THREE.LineBasicMaterial({ color: 0x9b8cff, transparent: true, opacity: 0.35 }));
      body.add(core, edges, cage);
      const orbits = [0, 1, 2].map((k) => {
        const o = new THREE.Group();
        o.rotation.set(k * 1.05, k * 0.7, 0.3 * k);
        const tr = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.012, 6, 120), new THREE.MeshBasicMaterial({ color: 0xcfc7ff, transparent: true, opacity: 0.5 }));
        const e = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        o.add(tr, e); body.add(o);
        return { o, e, sp: 0.8 + k * 0.35 };
      });
      spinner = (t) => { core.rotation.set(t * 0.3, t * 0.45, 0); edges.rotation.copy(core.rotation); cage.rotation.y = -t * 0.1; orbits.forEach((x) => { const a = t * x.sp; x.e.position.set(Math.cos(a) * 2.6, Math.sin(a) * 2.6, 0); }); };
    } else if (P.id === 'board') {
      const panel = new THREE.Mesh(new RoundedBoxGeometry(7.2, 4.4, 0.24, 4, 0.18), new THREE.MeshPhysicalMaterial({ color: 0x0b1820, metalness: 0.3, roughness: 0.15, clearcoat: 1, transparent: true, opacity: 0.92 }));
      body.add(panel);
      const bars = new THREE.InstancedMesh(unitBox(0.16, 0.08), std({ emissive: 0xffffff, emissiveIntensity: 0.35, roughness: 0.4 }), 40);
      bars.position.z = 0.16;
      body.add(bars);
      let line = null;
      const setB = () => {
        const it = DATA && DATA.items.GSPC;
        const v = it && it.hist ? it.hist.slice(-40) : Array.from({ length: 40 }, (_, i) => 100 + Math.sin(i / 3) * 3 + i * 0.2);
        const lo = Math.min(...v), hi = Math.max(...v), m4 = new THREE.Matrix4();
        const pts = [];
        v.forEach((c, i) => {
          const d = i ? c / v[i - 1] - 1 : 0, x = -3.2 + (i / (v.length - 1)) * 6.4, y = -1.6 + 3.2 * (c - lo) / ((hi - lo) || 1);
          const hh = 0.12 + Math.min(1.2, Math.abs(d) * 90);
          bars.setMatrixAt(i, m4.makeScale(1, hh, 1).setPosition(x, y - hh / 2, 0));
          bars.setColorAt(i, d >= 0 ? UP : DOWN);
          pts.push(new THREE.Vector3(x, y, 0.3));
        });
        bars.instanceMatrix.needsUpdate = true;
        if (bars.instanceColor) { bars.instanceColor.needsUpdate = true; }
        if (line) { body.remove(line); }
        line = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.035, 6), new THREE.MeshBasicMaterial({ color: 0xff7ab6 }));
        body.add(line);
      };
      setB();
      updaters.push(setB);
      spinner = (t) => { body.rotation.y = Math.sin(t * 0.35) * 0.35; body.position.y = Math.sin(t * 0.8) * 0.12; };
    }
    eng.scene.add(g);
    portalObjs.push({ P, g, body, halo: h, spinner, hover: 0 });
  });
}

// ================= Dữ liệu =================
function renderKpis() {
  if (!DATA) { return; }
  const cells = [['VNINDEX', 'VN-Index'], ['AXJO', 'S&P/ASX 200'], ['GSPC', 'S&P 500']].map(([k, n]) => {
    const it = DATA.items[k];
    if (!it) { return ''; }
    return `<div class="kpi panel"><div class="k"><span>${esc(n)}</span><span class="badge${it.live ? ' live' : ''}">${it.live ? 'trực tiếp' : it.status === 'final' ? 'đóng cửa' : 'tạm tính'}</span></div><div class="v num">${fmt(it.last, 2)}</div><div class="c num ${cls(it.changePct)}">${pct(it.changePct)}</div></div>`;
  });
  const f = DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
  if (f) {
    const bench = benchSince(f);
    cells.push(`<a class="kpi panel fund" href="quy/" data-nav style="text-decoration:none"><div class="k"><span>Quỹ JayV · VN</span><span>100 = 24/09</span></div><div class="v num">${fmt(f.nav, 2)}</div><div class="c num">${bench != null ? `VN-Index <span class="${cls(bench - 100)}">${fmt(bench, 2)}</span>` : 'so với VN-Index'}</div></a>`);
  }
  $('kpis').innerHTML = cells.join('');
}
function benchSince(f) {
  const it = DATA.items.VNINDEX;
  if (!it || !it.histD || !it.hist) { return null; }
  const i = it.histD.indexOf('2026-09-24');
  return i >= 0 ? (it.last / it.hist[i]) * 100 : null;
}
function renderStats() {
  const wl = DATA ? (DATA.groups.watchlist || []).length : 16;
  const inFund = DATA ? (DATA.groups.watchlist || []).filter((k) => DATA.items[k] && (DATA.items[k].tags || []).includes('fund')).length : 1;
  const waiting = DATA ? (DATA.groups.watchlist || []).filter((k) => DATA.items[k] && (DATA.items[k].tags || []).includes('waiting')).length : 0;
  const fc = (CONTENT && CONTENT.brief && CONTENT.brief.forecasts) || [];
  const ok = fc.filter((x) => x.result === 'ok').length, miss = fc.filter((x) => x.result === 'miss').length;
  const f = DATA && DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
  const checks = DATA && DATA.summary ? DATA.summary : null;
  const cards = [
    { v: 3, k: 'thị trường', p: 'Việt Nam, Úc, Mỹ; giờ Sydney làm mốc chung.', c: 'var(--teal)' },
    { v: wl, k: 'mã đang theo dõi', p: `${inFund} mã trong quỹ, ${waiting} mã chờ kỳ cân lại.`, c: 'var(--up)' },
    { v: fc.length, k: 'dự báo trong sổ', p: ok + miss ? `Đã chấm ${ok + miss}: đúng ${ok}, sai ${miss}.` : 'Chưa có dự báo nào đến hạn chấm.', c: 'var(--sky)' },
    { v: checks ? checks.ok : 0, k: 'con số qua kiểm tra', p: checks ? `trên ${checks.total} số của bảng giá lần gần nhất.` : 'Đang tải…', c: 'var(--rose)' },
    { v: f ? f.nav : 100, dp: 2, k: 'giá trị Quỹ JayV', p: '100 điểm vào ngày 24/09/2026; tiền ảo.', c: 'var(--gold)' },
    { v: MANIFEST.totals.ready, k: 'bài giảng ở Học viện', p: `${MANIFEST.totals.subjects} môn của một chương trình Finance major, ${MANIFEST.totals.planned} bài theo kế hoạch, dạy bằng tiếng Anh.`, c: 'var(--violet)' },
  ];
  $('stats').innerHTML = cards.map((x, i) => `<div class="panel stat rise" data-tilt style="--c:${x.c}"><div class="v num" data-to="${x.v}" data-dp="${x.dp || 0}">0</div><div class="k">${esc(x.k)}</div><p>${esc(x.p)}</p></div>`).join('');
  shell.observe($('stats'));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); countUp(e.target, +e.target.dataset.to, { dp: +e.target.dataset.dp }); } }), { threshold: 0.4 });
  $('stats').querySelectorAll('.v').forEach((el) => io.observe(el));
}

const feed = createFeed({
  onData(d) {
    DATA = d;
    renderKpis(); renderStats();
    if (eng) {
      drawTicker(ring1, ['VNINDEX', 'VN30', 'HNXINDEX', 'AXJO', 'GSPC', 'DJI', 'IXIC']);
      const f = DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
      drawTicker(ring2, ['GOLD', 'BRENT', 'WTI', 'TNX', 'AUDUSD', 'USDVND'], f ? ['QUỸ JAYV', fmt(f.nav, 2), f.nav - 100] : null);
      setCandles();
      updaters.forEach((u) => u());
    }
  },
  onContent(c) { CONTENT = c; renderStats(); if (eng) { updaters.forEach((u) => u()); } },
  onFresh(f) { shell.setFresh(f); },
});

// ================= Cổng: chữ và điều hướng =================
const idx = $('portal-index'), bar = $('portal-bar');
idx.innerHTML = PORTALS.map((p) => `<li><button type="button" data-i="${p.i}" style="--c:${p.c}"><span class="n">${p.n}</span><span class="t">${esc(p.short)}</span></button></li>`).join('');
bar.innerHTML = PORTALS.map((p) => `<i style="--c:${p.c}"><b></b></i>`).join('');
let step = -1;
function showStep(i) {
  if (i === step) { return; }
  const first = step < 0;
  step = i;
  const P = PORTALS[i], box = $('portal-copy');
  idx.querySelectorAll('button').forEach((b, j) => b.classList.toggle('on', j === i));
  const fill = () => {
    box.style.setProperty('--pc', P.c);
    $('pc-n').textContent = P.n;
    $('pc-t').innerHTML = esc(P.name) + (P.en ? `<em>${esc(P.en)}</em>` : '');
    $('pc-d').textContent = P.desc;
    $('pc-f').innerHTML = P.feats.map((f) => `<li>${esc(f)}</li>`).join('');
    const go = $('pc-go');
    go.href = href(P.path);
    go.innerHTML = `Vào ${esc(P.short)} <span class="arr">→</span>`;
    box.classList.remove('out');
  };
  if (first || REDUCED) { fill(); } else { box.classList.add('out'); setTimeout(fill, 220); }
}
idx.addEventListener('click', (e) => { const b = e.target.closest('button[data-i]'); if (b) { tl.scrollToStep('h-portals', +b.dataset.i / (PORTALS.length - 1)); } });

// Kéo để xoay biểu tượng, bấm để lật
const hs = $('hero-stage');
let dragX = null;
hs.addEventListener('pointerdown', (e) => { if (e.target.closest('a,button')) { return; } dragX = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false }; });
window.addEventListener('pointermove', (e) => {
  if (!dragX) { return; }
  const dx = e.clientX - dragX.x;
  if (Math.abs(dx) > 4) { dragX.moved = true; }
  spinVel += (e.movementX || 0) * 0.0025;
}, { passive: true });
window.addEventListener('pointerup', () => { if (dragX && !dragX.moved && performance.now() - dragX.t < 350) { flip += Math.PI * 2; } dragX = null; });

// Bấm vào vật thể ở chặng cổng để đi thẳng vào mục
const ps = $('portal-stage');
ps.addEventListener('click', (e) => {
  if (!eng || e.target.closest('a,button')) { return; }
  const hit = eng.pick((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, portalObjs.map((o) => o.body), true);
  if (!hit) { return; }
  const o = portalObjs.find((x) => { let n = hit.object; while (n) { if (n === x.body) { return true; } n = n.parent; } return false; });
  if (o) { shell.go(href(o.P.path), e.target); }
});
ps.addEventListener('pointermove', (e) => {
  if (!eng) { return; }
  const hit = eng.pick((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, portalObjs.map((o) => o.body), true);
  ps.style.cursor = hit ? 'pointer' : '';
  portalObjs.forEach((o) => { o.hoverT = hit && (() => { let n = hit.object; while (n) { if (n === o.body) { return true; } n = n.parent; } return false; })() ? 1 : 0; });
}, { passive: true });

// ================= Dòng thời gian camera =================
const tl = createTimeline(() => {
  const m = mobile;
  return {
    'h-hero': { ground: '#05080d', bloom: 0.85, keys: [
      { p: 0, pos: m ? [0, 3, 40] : [-7.5, 5, 27], look: m ? [0, -2, 0] : [-7.5, 4.2, 0] },
      { p: 1, pos: m ? [0, 16, 46] : [-3, 15, 40], look: m ? [0, 3, -24] : [0, 2, -28] }] },
    'h-portals': { ground: '#060a12', bloom: 0.8, keys: PORTALS.map((P) => ({ p: P.i / (PORTALS.length - 1), pos: m ? [P.pos.x, P.pos.y + 3.2, P.pos.z + 19] : [P.pos.x + 5.2, P.pos.y + 3, P.pos.z + 16.5], look: m ? [P.pos.x, P.pos.y - 2.8, P.pos.z] : [P.pos.x - 3.4, P.pos.y + 0.2, P.pos.z] })) },
    'h-numbers': { ground: '#070a12', bloom: 0.7, keys: [{ p: 0.5, pos: [38, 46, -150], look: [0, -2, -160] }] },
    'h-story': { ground: '#080a10', bloom: 0.7, keys: [{ p: 0.5, pos: [-36, 24, -230], look: [0, 0, -200] }] },
    'h-principles': { ground: '#05080d', bloom: 0.85, keys: [{ p: 0.1, pos: [20, 14, 36], look: [0, 3, 0] }, { p: 1, pos: m ? [0, 8, 38] : [0, 6, 30], look: [0, 4, 0] }] },
  };
});

let active = 'h-hero';
const dots = [...document.querySelectorAll('.dots a')];
if (eng) {
  if (fontsReady) { fontsReady.then(() => { if (DATA) { drawTicker(ring1, ['VNINDEX', 'VN30', 'HNXINDEX', 'AXJO', 'GSPC', 'DJI', 'IXIC']); const f = DATA.sync && DATA.sync.funds && DATA.sync.funds.VN; drawTicker(ring2, ['GOLD', 'BRENT', 'WTI', 'TNX', 'AUDUSD', 'USDVND'], f ? ['QUỸ JAYV', fmt(f.nav, 2), f.nav - 100] : null); } }); }
  fontsReady.then(() => { buildPortals(); updaters.forEach((u) => u()); });
  let flipped = 0, first = true;
  eng.onFrame((t, dt) => {
    const y = window.scrollY;
    const s = tl.sample(y);
    if (s) { eng.setTarget(s.pos, s.look); eng.setGround(s.ground, s.bloom); if (first) { eng.jump(); first = false; } }
    // Biểu tượng
    spinVel *= Math.pow(0.08, dt);
    flipped += (flip - flipped) * Math.min(1, dt * 3.2);
    if (emblem) {
      emblem.group.rotation.y = Math.sin(t * 0.5) * 0.35 + flipped + (emblem.group.userData.spin = (emblem.group.userData.spin || 0) + spinVel);
      emblem.group.rotation.x = Math.sin(t * 0.37) * 0.08;
      emblem.group.position.y = Math.sin(t * 0.8) * 0.25;
    }
    if (ring1) { ring1.tex.offset.x = (t * 0.012) % 1; ring1.holder.rotation.y = t * 0.05; }
    if (ring2) { ring2.tex.offset.x = (-t * 0.009) % 1; ring2.holder.rotation.y = -t * 0.04; }
    if (candleGroup) { candleGroup.rotation.y = -t * 0.06; }
    portalObjs.forEach((o) => {
      if (o.spinner) { o.spinner(t, dt); }
      o.hover = (o.hover || 0) + (((o.hoverT || 0) + (o.P.i === step && active === 'h-portals' ? 0.6 : 0)) - (o.hover || 0)) * Math.min(1, dt * 6);
      const sc = 1 + o.hover * 0.12;
      o.body.scale.setScalar(sc);
      o.halo.ring.material.opacity = 0.35 + o.hover * 0.6;
      o.halo.ring.scale.setScalar(1 + ((t * 0.5 + o.P.i * 0.2) % 1) * 0.08);
    });
  });
  eng.start();
  shell.onWarp = () => eng.warp();
}

function tick() {
  const y = window.scrollY, vh = window.innerHeight;
  const cur = tl.current();
  if (cur && cur !== active) { active = cur; dots.forEach((d) => d.classList.toggle('on', d.getAttribute('href') === '#' + active)); }
  const pp = tl.progressOf('h-portals');
  const i = Math.round(pp * (PORTALS.length - 1));
  showStep(i);
  bar.querySelectorAll('b').forEach((b, j) => { b.style.setProperty('--f', clamp(pp * (PORTALS.length - 1) - j + 0.5, 0, 1).toFixed(3)); });
  $('progress').style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - vh), 0, 1)})`;
  requestAnimationFrame(tick);
}
window.addEventListener('resize', () => { mobile = mqMobile.matches; tl.build(); });
tl.build();
showStep(0);
requestAnimationFrame(tick);
window.addEventListener('load', () => { tl.build(); });
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
