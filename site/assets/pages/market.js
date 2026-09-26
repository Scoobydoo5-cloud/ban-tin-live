// Trang Toàn cảnh thị trường: địa cầu ba sàn, dải lụa 7 chỉ số, phòng trưng bày vĩ mô, bản đồ nhiệt 3D, bảng tổng hợp.
import { createEngine, createTimeline, fontsReady, glowSprite, THREE, UP, DOWN, FLAT, GOLD, mqMobile } from '../core/engine.js';
import { initShell } from '../core/shell.js';
import { createFeed, href } from '../core/data.js';
import { parts, zoned, two, hm, SYD } from '../core/live.js';
import { esc, fmt, pct, cls, clamp, dpOf, ddmm, TREND, MKT, spark, valueText } from '../core/fmt.js';
import { makeGlobe, makeCoin, makeCoinStack, makeBarrel, makeGoldBars, makeYieldCurve } from '../core/props.js';

const shell = initShell('market');
const $ = (id) => document.getElementById(id);
let mobile = mqMobile.matches;
let DATA = null;
const Z = { globe: -90, ribbons: -145, macro: -200, heat: -290 };
const IDX = [['VNINDEX', '#5fe3e0'], ['VN30', '#3fb8c4'], ['HNXINDEX', '#2a8fa6'], ['AXJO', '#e9b85c'], ['GSPC', '#9b8cff'], ['DJI', '#7fb2ff'], ['IXIC', '#ff7ab6']];
const MACRO = [['TNX', 'Lợi suất Mỹ 10 năm', 'Chi phí vốn của cả thế giới. Lợi suất tăng làm cổ phiếu tăng trưởng bị định giá lại.'],
  ['BRENT', 'Dầu Brent', 'Giá dầu chuẩn quốc tế, đi thẳng vào lạm phát của cả ba nước.'],
  ['WTI', 'Dầu WTI', 'Giá dầu Mỹ; chênh lệch với Brent cho biết cung cầu trong nước Mỹ.'],
  ['GOLD', 'Vàng', 'Tài sản không trả lãi, thường yếu đi khi lãi suất thực tăng.'],
  ['AUDUSD', 'AUD/USD', 'Đồng tiền hàng hóa, nhạy với lãi suất RBA và kinh tế Trung Quốc.'],
  ['USDVND', 'USD/VND', 'Tỷ giá thị trường quốc tế; USD mạnh gây áp lực lên VND.']];

const eng = createEngine($('gl'), {
  ground: '#070a1f', fog: 0.0125, bloom: [0.8, 0.45, 0.62],
  dust: { n: 2400, spread: [150, 70, 260], center: [0, 12, -170], size: 0.11, opacity: 0.3 },
  camPos: [-9, 3, -48], camLook: [-10, 2.5, -90],
});
const std = (o) => new THREE.MeshStandardMaterial(o);

// ================= Địa cầu =================
let globe = null, dragRot = 0, dragVel = 0;
const globeRot = { a: 0, b: 0 };
let globeP = 0;
if (eng) {
  globe = makeGlobe({ R: 11, mobile });
  globe.group.position.set(0, 2.5, Z.globe);
  eng.scene.add(globe.group);
  globeRot.a = globe.angles.VN.a; globeRot.b = globe.angles.VN.b;
  const gs = $('globe-stage');
  let dn = null;
  gs.addEventListener('pointerdown', (e) => { if (e.target.closest('a,button')) { return; } dn = { x: e.clientX, y: e.clientY, dec: e.pointerType === 'mouse', ok: e.pointerType === 'mouse' }; gs.classList.add('dragging'); });
  window.addEventListener('pointermove', (e) => {
    if (!dn) { return; }
    if (!dn.dec) { const ax = Math.abs(e.clientX - dn.x), ay = Math.abs(e.clientY - dn.y); if (ax + ay < 8) { return; } dn.dec = true; dn.ok = ax > ay; }
    if (dn.ok) { dragVel = (e.movementX || 0) * 0.006; dragRot += dragVel; }
  }, { passive: true });
  window.addEventListener('pointerup', () => { dn = null; gs.classList.remove('dragging'); });
}

// ================= Dải lụa 7 chỉ số =================
const ribbons = new THREE.Group();
ribbons.position.z = Z.ribbons;
let ribbonTags = null;
function buildRibbons() {
  if (!eng || !DATA) { return; }
  while (ribbons.children.length) { ribbons.remove(ribbons.children[0]); }
  const floor = new THREE.GridHelper(48, 24, 0x2c7f82, 0x123a40);
  floor.material.transparent = true; floor.material.opacity = 0.4; floor.position.y = -0.6;
  ribbons.add(floor);
  const tagItems = [];
  IDX.forEach(([k, hex], r) => {
    const it = DATA.items[k];
    const v = it && it.hist ? it.hist.slice(-60) : [];
    if (v.length < 2) { return; }
    const lo = Math.min(...v), hi = Math.max(...v), n = v.length, z = (r - 3) * 3.3;
    const col = new THREE.Color(hex);
    const pos = [], colors = [], idx = [], top = [];
    v.forEach((c, i) => {
      const x = -19 + 38 * i / (n - 1), y = 0.4 + 6 * (c - lo) / ((hi - lo) || 1);
      pos.push(x, y, z, x, -0.6, z);
      colors.push(col.r, col.g, col.b, col.r * 0.05, col.g * 0.05, col.b * 0.05);
      top.push(new THREE.Vector3(x, y, z));
      if (i) { const a = (i - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    g.setIndex(idx);
    ribbons.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.42, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })));
    ribbons.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(top), 240, 0.07, 6), new THREE.MeshBasicMaterial({ color: col })));
    const end = new THREE.Mesh(new THREE.SphereGeometry(0.28, 18, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    end.position.copy(top[top.length - 1]);
    ribbons.add(end);
    const g2 = glowSprite(col, 3.2, 0.6); g2.position.copy(end.position); ribbons.add(g2);
    tagItems.push({ html: `${esc(it.label)}<span class="v ${cls(it.changePct)}">${pct(it.changePct)}</span>`, pos: new THREE.Vector3(19.5 + (r % 2) * 3.2, top[top.length - 1].y + 1.1, Z.ribbons + z) });
  });
  if (!ribbonTags) { ribbonTags = eng.tags($('tags-rib')); }
  ribbonTags.set(tagItems);
}
if (eng) { eng.scene.add(ribbons); }

// ================= Phòng trưng bày vĩ mô =================
const macro = new THREE.Group();
macro.position.z = Z.macro;
const macroObjs = [];
const MX = MACRO.map((_, i) => (i - 2.5) * 7.2);
async function buildMacro() {
  if (!eng) { return; }
  await fontsReady;
  const tnx = DATA && DATA.items.TNX && DATA.items.TNX.hist ? DATA.items.TNX.hist.slice(-60) : null;
  const objs = [
    makeYieldCurve(tnx),
    makeBarrel('BRENT', '#1c3d63', '#e9b85c'),
    makeBarrel('WTI', '#5a1d17', '#f0d9c0'),
    makeGoldBars(),
  ];
  const coinA = new THREE.Group();
  const ca = makeCoin({ sym: 'A$', metal: '#dfe5ea', dark: '#5d6a73', ink: '#1b2a33', rimText: 'AUSTRALIA · AUD · ÚC', symSize: 380 });
  ca.position.set(-0.5, 0.2, 0.4);
  const sa = makeCoinStack(5, { metal: '#cfd6db', radius: 1.15 }); sa.position.set(1.7, -1.55, -1.5);
  coinA.add(ca, sa);
  const coinV = new THREE.Group();
  const cv = makeCoin({ sym: '₫', metal: '#d9a25e', dark: '#6b3f16', ink: '#2a1a0d', rimText: 'VIỆT NAM · ĐỒNG · VND', symFont: 'Be Vietnam Pro', symSize: 560 });
  cv.position.set(-0.5, 0.2, 0.4);
  const sv = makeCoinStack(5, { metal: '#c98a4b', radius: 1.15 }); sv.position.set(1.7, -1.55, -1.5);
  coinV.add(cv, sv);
  objs.push(coinA, coinV);
  objs.forEach((g, i) => { g.position.set(MX[i], 1.8, 0); macro.add(g); macroObjs.push({ g, coin: i >= 4 ? (i === 4 ? ca : cv) : null }); });
  const pedestal = new THREE.Mesh(new THREE.BoxGeometry(50, 0.4, 5), std({ color: 0x1a0f0c, metalness: 0.3, roughness: 0.6 }));
  pedestal.position.set(0, -1.6, 0);
  const strip = new THREE.Mesh(new THREE.BoxGeometry(50, 0.04, 0.08), new THREE.MeshBasicMaterial({ color: 0xe9b85c }));
  strip.position.set(0, -1.38, 2.5);
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(40, 40, 22, 64, 1, true, Math.PI * 0.72, Math.PI * 0.56), std({ color: 0x140a07, roughness: 0.9, metalness: 0.1, side: THREE.BackSide }));
  wall.position.set(0, 6, 34);
  macro.add(pedestal, strip, wall);
  MX.forEach((x) => { const s = new THREE.SpotLight(0xffe2b0, 90, 22, 0.5, 0.6, 1.2); s.position.set(x, 9, 4); s.target.position.set(x, 0, 0); macro.add(s, s.target); });
}
if (eng) { eng.scene.add(macro); }

// ================= Bản đồ nhiệt 3D =================
const heat = new THREE.Group();
heat.position.z = Z.heat;
let heatTiles = [], heatKey = 'changePct', heatTags = null;
const SCALE = { changePct: 1.2, chg1w: 3, chg1m: 6, chgYtd: 12 };
function buildHeat() {
  if (!eng || !DATA) { return; }
  while (heat.children.length) { heat.remove(heat.children[0]); }
  heatTiles = [];
  const keys = (DATA.groups.watchlist || []).filter((k) => DATA.items[k]);
  const cols = mobile ? 4 : 6;
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), std({ color: 0x0e2a30, transparent: true, opacity: 0.55, roughness: 0.1, metalness: 0.4, depthWrite: false }));
  glass.rotation.x = -Math.PI / 2; heat.add(glass);
  const tagItems = [];
  keys.forEach((k, i) => {
    const x = ((i % cols) - (cols - 1) / 2) * 3.4, z = (Math.floor(i / cols) - (Math.ceil(keys.length / cols) - 1) / 2) * 3.4;
    const m = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1, 2.8), std({ color: FLAT, emissive: FLAT, emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.2 }));
    m.position.set(x, 0.5, z);
    heat.add(m);
    let rim = null;
    if ((DATA.items[k].tags || []).includes('fund')) {
      rim = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.08, 8, 4), std({ color: GOLD, metalness: 1, roughness: 0.2, emissive: 0x5a3a00, emissiveIntensity: 0.8 }));
      rim.rotation.set(Math.PI / 2, 0, Math.PI / 4); heat.add(rim);
    }
    heatTiles.push({ k, m, rim, h: 1, th: 1 });
    tagItems.push({ tag: 'a', cls: 'link' + ((DATA.items[k].tags || []).includes('fund') ? ' fund' : ''), attrs: { href: href('co-phieu/') + '#' + k, 'data-nav': '' }, html: `${esc(DATA.items[k].label)}<span class="v"></span>`, pos: new THREE.Vector3(x, 1.2, Z.heat + z) });
  });
  if (!heatTags) { heatTags = eng.tags($('tags-heat')); }
  const els = heatTags.set(tagItems);
  heatTiles.forEach((t, i) => { t.tag = els[i]; t.pos = tagItems[i].pos; });
  setHeatMetric(heatKey);
}
function metricOf(it, k) { return k === 'chg1w' ? (it.pa || {}).chg1w : it[k]; }
function setHeatMetric(k) {
  heatKey = k;
  if (!DATA) { return; }
  heatTiles.forEach((t) => {
    const v = metricOf(DATA.items[t.k], k);
    const c = v > 0 ? UP : v < 0 ? DOWN : FLAT;
    t.th = 0.25 + Math.min(7, Math.abs(v || 0) / SCALE[k] * 1.2);
    t.m.material.color.copy(c); t.m.material.emissive.copy(c);
    if (t.tag) { const s = t.tag.querySelector('.v'); s.textContent = pct(v, k === 'changePct' ? 2 : 1); s.className = 'v ' + cls(v); }
  });
}
if (eng) { eng.scene.add(heat); }

// ================= Lớp chữ =================
const SESS = { VN: { tz: 'Asia/Ho_Chi_Minh', s: [[540, 690], [780, 885]] }, AU: { tz: 'Australia/Sydney', s: [[600, 972]] }, US: { tz: 'America/New_York', s: [[570, 960]] } };
const ST = { open: 'Đang giao dịch', lunch: 'Nghỉ trưa', pre: 'Chưa mở cửa', closed: 'Đã đóng cửa', weekend: 'Cuối tuần' };
function marketClock(m) {
  const S = SESS[m], now = new Date(), p = parts(now, S.tz), t = p.h * 60 + p.mi;
  let st = 'closed', next = null, what = '';
  if (p.wd < 5) {
    for (let i = 0; i < S.s.length; i++) {
      const [a, b] = S.s[i];
      if (t >= a && t < b) { st = 'open'; next = zoned(p.y, p.mo, p.d, b, S.tz); what = i < S.s.length - 1 ? 'nghỉ trưa' : 'đóng cửa'; break; }
      if (t < a) { st = i === 0 ? 'pre' : 'lunch'; next = zoned(p.y, p.mo, p.d, a, S.tz); what = i === 0 ? 'mở cửa' : 'giao dịch lại'; break; }
    }
  }
  if (!next) {
    st = p.wd >= 5 ? 'weekend' : 'closed';
    for (let n = 1; n <= 7; n++) {
      const base = new Date(Date.UTC(p.y, p.mo - 1, p.d + n));
      if ((p.wd + n) % 7 < 5) { next = zoned(base.getUTCFullYear(), base.getUTCMonth() + 1, base.getUTCDate(), S.s[0][0], S.tz); what = 'mở cửa'; break; }
    }
  }
  const mins = Math.max(0, Math.round((next - now) / 60000)), hh = Math.floor(mins / 60);
  const dur = hh >= 24 ? `${Math.floor(hh / 24)} ngày ${hh % 24} giờ` : hh ? `${hh} giờ ${mins % 60} phút` : `${mins} phút`;
  return { st, local: two(p.h) + ':' + two(p.mi), text: `${what.charAt(0).toUpperCase() + what.slice(1)} sau ${dur} · ${hm(next, SYD)} giờ Sydney` };
}
function renderGlobe() {
  $('mk-panels').innerHTML = [['VN', 'Việt Nam', 'TP.HCM · HOSE', 'VNINDEX', ['VN30', 'HNXINDEX']], ['AU', 'Úc', 'Sydney · ASX', 'AXJO', []], ['US', 'Mỹ', 'New York · NYSE, Nasdaq', 'GSPC', ['DJI', 'IXIC']]].map(([m, name, place, key, others], i) => {
    const c = marketClock(m), it = DATA.items[key] || {}, pa = it.pa || {};
    return `<div class="mkp panel${i === globeStep ? ' on' : ''}" data-m="${m}">
      <div class="head"><h3>${esc(name)}</h3><span class="st ${c.st === 'open' ? 'open' : ''}">${ST[c.st]}</span></div>
      <div class="clock">${esc(place)} · giờ địa phương ${c.local}<br>${esc(c.text)}</div>
      <div class="muted" style="font-size:13px">${esc(it.label || key)}</div>
      <div class="main"><span class="v num">${fmt(it.last, 2)}</span><span class="c num ${cls(it.changePct)}">${pct(it.changePct)}</span></div>
      <div class="kv"><div>1 tuần<b class="num ${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</b></div><div>Từ đầu năm<b class="num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</b></div><div>Xu hướng<b>${TREND[pa.trend] || '–'}</b></div></div>
      ${others.length ? `<div class="others">${others.map((k) => { const o = DATA.items[k]; return o ? `<div>${esc(o.label)} <span class="v num">${fmt(o.last, 2)}</span> <span class="num ${cls(o.changePct)}">${pct(o.changePct)}</span></div>` : ''; }).join('')}</div>` : ''}
    </div>`;
  }).join('');
}
let globeStep = 0;
function updateGlobeStep() {
  const step = globeP < 1 / 3 ? 0 : globeP < 2 / 3 ? 1 : 2;
  if (step === globeStep) { return; }
  globeStep = step;
  document.querySelectorAll('.mkp').forEach((el, i) => el.classList.toggle('on', i === step));
  document.querySelectorAll('.mk-tabs button').forEach((el, i) => el.classList.toggle('on', i === step));
}
document.querySelector('.mk-tabs').addEventListener('click', (e) => { const b = e.target.closest('button[data-m]'); if (b) { tl.scrollToStep('m-globe', [0.08, 0.5, 0.92][+b.dataset.m]); } });

function renderIndices() {
  $('idx-grid').innerHTML = IDX.map(([k, hex]) => {
    const it = DATA.items[k];
    if (!it) { return ''; }
    const pa = it.pa || {};
    return `<article class="panel idx rise" data-tilt style="--c:${hex}"><div class="top"><span class="name">${esc(it.label)}</span><span class="badge">${esc(MKT[it.market] || '')}</span></div>
      <div><span class="v num">${fmt(it.last, 2)}</span> <span class="num ${cls(it.changePct)}">${pct(it.changePct)}</span></div>
      ${spark(it.hist, {})}
      <div class="mini"><div>1 tuần<b class="num ${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</b></div><div>Từ đầu năm<b class="num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</b></div><div>Cách đỉnh 52T<b class="num">${pct(pa.fromHi52, 1)}</b></div><div>RSI 14<b class="num">${pa.rsi14 != null ? fmt(pa.rsi14, 0) : '–'}</b></div><div>Xu hướng<b>${TREND[pa.trend] || '–'}</b></div><div>Biến động 20p<b class="num">${pa.vol20 != null ? fmt(pa.vol20, 1) + '%' : '–'}</b></div></div></article>`;
  }).join('');
  shell.observe($('idx-grid'));
}

function renderMacro() {
  $('rail').innerHTML = MACRO.map(([k, name, why]) => {
    const it = DATA.items[k];
    if (!it) { return ''; }
    const pa = it.pa || {}, h = it.hist || [];
    return `<article class="mc panel" data-k="${k}"><div class="k">${esc(name)}</div>
      <div class="v num">${valueText(it)}${it.unit && it.unit !== '%' ? `<small>${esc(it.unit)}</small>` : ''}</div>
      <div class="chg"><span>Hôm nay <b class="num ${cls(it.changePct)}">${pct(it.changePct)}</b></span><span>1 tuần <b class="num ${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</b></span><span>Từ đầu năm <b class="num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</b></span></div>
      ${spark(h)}<p>${esc(why)}${it.rollSuspected ? ' <b style="color:var(--gold)">Đang đổi kỳ hạn hợp đồng: % trong ngày có thể méo.</b>' : ''}</p></article>`;
  }).join('');
}
let macroP = 0, macroAct = -1;
function updateMacro() {
  macroP = tl.progressOf('m-macro');
  const rail = $('rail');
  const max = Math.max(0, rail.scrollWidth - window.innerWidth);
  rail.style.transform = `translate3d(${(-macroP * max).toFixed(1)}px,0,0)`;
  const act = Math.round(macroP * (MACRO.length - 1));
  if (act !== macroAct) { macroAct = act; rail.querySelectorAll('.mc').forEach((el, i) => el.classList.toggle('act', i === act)); }
}

function renderLegend() {
  $('idx-legend').innerHTML = IDX.map(([k, hex]) => {
    const it = DATA.items[k];
    return it ? `<li style="--c:${hex}"><i></i><span>${esc(it.label)}</span><span class="num ${cls(it.changePct)}">${pct(it.changePct)}</span><span class="y num">năm ${pct(it.chgYtd, 1)}</span></li>` : '';
  }).join('');
}
document.querySelector('.heat-tools').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-k]');
  if (!b) { return; }
  document.querySelectorAll('.heat-tools button').forEach((x) => x.classList.toggle('on', x === b));
  setHeatMetric(b.dataset.k);
});

function renderTerm() {
  const g = DATA.groups, groups = [['Chỉ số', g.indices], ['Vĩ mô, hàng hóa, tỷ giá', g.macro], ['Cổ phiếu theo dõi', g.watchlist]];
  $('term-body').innerHTML = groups.map(([name, ks]) => `<tr class="g"><td colspan="6">${name}</td></tr>` + (ks || []).map((k) => {
    const it = DATA.items[k];
    if (!it) { return ''; }
    const pa = it.pa || {};
    const badge = it.live ? `<span class="badge live">Trực tiếp ${it.lastTime ? hm(new Date(it.lastTime), SYD) : ''}</span>` : it.status === 'final' ? `<span class="badge">Đóng cửa ${ddmm(it.day)}</span>` : it.status === 'provisional' ? '<span class="badge">Tạm tính</span>' : `<span class="badge">24 giờ · ${ddmm(it.day)}</span>`;
    return `<tr><td>${esc(it.label)}</td><td class="r num">${valueText(it)}</td><td class="r num ${cls(it.changePct)}">${pct(it.changePct)}</td><td class="r num ${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</td><td class="r num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</td><td>${badge}</td></tr>`;
  }).join('')).join('');
  $('term-note').textContent = `Số của máy chủ chốt lúc ${DATA.generatedAtSydney} giờ Sydney; khi trang đang mở, giá Việt Nam, Úc, Mỹ được lấy trực tiếp và đối chiếu mỗi phút.`;
}

let macroBuilt = false, firstData = true;
createFeed({
  onData(d, why) {
    DATA = d;
    renderGlobe(); renderIndices(); renderLegend(); renderMacro(); renderTerm();
    if (eng) {
      globe.setData(DATA);
      if (firstData || why === 'server') { buildRibbons(); buildHeat(); }
      else { setHeatMetric(heatKey); }
      if (!macroBuilt) { macroBuilt = true; buildMacro(); }
    }
    firstData = false;
    requestAnimationFrame(() => tl.build());
  },
  onFresh(f) { shell.setFresh(f); },
  content: false,
});

// ================= Camera =================
const tl = createTimeline(() => {
  const m = mobile;
  return {
    'm-globe': { ground: '#070a1f', bloom: 0.9, keys: m
      ? [{ p: 0, pos: [0, -2, -42], look: [0, -7, Z.globe] }, { p: 1, pos: [0, -1, -44], look: [0, -7, Z.globe] }]
      : [{ p: 0, pos: [-9, 3, -48], look: [-10, 2.5, Z.globe] }, { p: 1, pos: [-8, 6, -51], look: [-10, 2.5, Z.globe] }] },
    'm-indices': { ground: '#06121a', bloom: 0.85, keys: [
      { p: 0, pos: [m ? -8 : -20, m ? 26 : 19, Z.ribbons + (m ? 52 : 42)], look: [m ? 0 : -4, m ? 7 : 5, Z.ribbons] },
      { p: 1, pos: [m ? 8 : 12, m ? 24 : 15, Z.ribbons + (m ? 50 : 38)], look: [m ? 0 : -4, m ? 7 : 5, Z.ribbons] }] },
    'm-idxcards': { ground: '#050b10', bloom: 0.6, keys: [{ p: 0.5, pos: [0, 34, Z.ribbons + 20], look: [0, 0, Z.ribbons - 10] }] },
    'm-macro': { ground: '#150a07', bloom: 0.8, keys: [
      { p: 0, pos: [-18, m ? 3.4 : 3.3, Z.macro + (m ? 24 : 19)], look: [-18, m ? 2.4 : 1.2, Z.macro] },
      { p: 1, pos: [18, m ? 3.4 : 3.3, Z.macro + (m ? 24 : 19)], look: [18, m ? 2.4 : 1.2, Z.macro] }] },
    'm-heat': { ground: '#0a1013', bloom: 0.8, keys: [{ p: 0, pos: [m ? -4 : -14, m ? 30 : 22, Z.heat + (m ? 30 : 24)], look: [m ? 0 : -3, 0, Z.heat + 2] }, { p: 1, pos: [m ? 4 : 12, m ? 28 : 20, Z.heat + (m ? 28 : 22)], look: [m ? 0 : -3, 0, Z.heat + 2] }] },
    'm-table': { ground: '#05080d', bloom: 0.6, keys: [{ p: 0.5, pos: [30, 34, Z.heat + 14], look: [0, 0, Z.heat - 40] }] },
  };
});

let active = 'm-globe';
const dots = [...document.querySelectorAll('.dots a')];
if (eng) {
  let first = true;
  eng.onFrame((t, dt, k) => {
    const s = tl.sample(window.scrollY);
    if (s) { eng.setTarget(s.pos, s.look); eng.setGround(s.ground, s.bloom); if (first) { eng.jump(); first = false; } }
    // Địa cầu: cuộn đưa lần lượt VN, Úc, Mỹ ra trước; kéo để xoay thêm
    const segs = ['VN', 'AU', 'US'];
    const gp = Math.min(1.999, Math.max(0, globeP * 2));
    const i0 = Math.floor(gp), f = gp - i0, e = f * f * (3 - 2 * f);
    const A = globe.angles[segs[i0]], B = globe.angles[segs[Math.min(2, i0 + 1)]];
    let da = B.a - A.a;
    if (da > Math.PI) { da -= Math.PI * 2; } else if (da < -Math.PI) { da += Math.PI * 2; }
    globeRot.a += (A.a + da * e - globeRot.a) * k; globeRot.b += (A.b + (B.b - A.b) * e - globeRot.b) * k;
    dragVel *= Math.pow(0.1, dt); dragRot += dragVel * 0.3;
    globe.spin.rotation.set(globeRot.b * 0.8, globeRot.a + dragRot + Math.sin(t * 0.15) * 0.05, 0);
    globe.tick(t);
    // Vĩ mô
    macroObjs.forEach((o, i) => {
      const act = 1 - Math.min(1, Math.abs(macroP * 5 - i));
      o.g.rotation.y += dt * (0.25 + act * 0.6);
      const sc = 1 + act * 0.18;
      o.g.scale.setScalar(o.g.scale.x + (sc - o.g.scale.x) * k);
      o.g.position.y = 1.8 + Math.sin(t * 0.9 + i) * 0.12 + act * 0.3;
    });
    // Bản đồ nhiệt: cột mọc theo thước đo
    heatTiles.forEach((tt, i) => { tt.h += (tt.th - tt.h) * Math.min(1, dt * 4); tt.m.scale.y = tt.h; tt.m.position.y = tt.h / 2; if (tt.rim) { tt.rim.position.set(tt.m.position.x, tt.h + 0.1, tt.m.position.z); } tt.pos.y = tt.h + 0.9; });
    if (ribbonTags) { ribbonTags.update(active === 'm-indices'); }
    if (heatTags) { heatTags.update(active === 'm-heat'); }
  });
  eng.start();
  shell.onWarp = () => eng.warp();
}
function tick() {
  const y = window.scrollY, vh = window.innerHeight;
  const cur = tl.current();
  if (cur && cur !== active) { active = cur; dots.forEach((d) => d.classList.toggle('on', d.getAttribute('href') === '#' + active)); }
  globeP = tl.progressOf('m-globe');
  updateGlobeStep();
  if (DATA) { updateMacro(); }
  $('progress').style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - vh), 0, 1)})`;
  requestAnimationFrame(tick);
}
window.addEventListener('resize', () => { mobile = mqMobile.matches; tl.build(); });
window.addEventListener('load', () => tl.build());
tl.build();
requestAnimationFrame(tick);
setInterval(() => { if (DATA && !document.hidden) { renderGlobe(); } }, 30000);
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
