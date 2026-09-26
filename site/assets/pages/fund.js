// Trang Quỹ JayV: vòng phân bổ quanh đồng xu JV, hai dải hiệu suất quỹ và chỉ số, ba kho Việt Nam, Úc, Mỹ.
import { createEngine, createTimeline, fontsReady, glowSprite, THREE, GOLD, TEAL, mqMobile, REDUCED } from '../core/engine.js';
import { initShell, DISCLAIMER } from '../core/shell.js';
import { createFeed, href } from '../core/data.js';
import { esc, fmt, pct, cls, clamp, ddmmyy, VERD, MKT } from '../core/fmt.js';
import { makeCoin, makeAllocRing, makeGoldBars } from '../core/props.js';

const shell = initShell('fund');
const $ = (id) => document.getElementById(id);
let mobile = mqMobile.matches;
let DATA = null;
const Z = { hero: 0, perf: -80, vault: -160 };
const CASH = new THREE.Color('#3aa7a8');
const HOLD_COL = ['#e9b85c', '#ffd98a', '#c9962e', '#f2c46a', '#b8862e', '#ffe7ad'];

const eng = createEngine($('gl'), {
  ground: '#0b0906', fog: 0.012, bloom: [0.7, 0.5, 0.62], envTop: '#fff0d0', envSide: '#e9b85c',
  dust: { n: 1800, spread: [120, 60, 240], center: [0, 10, -80], color: 0xffd98a, size: 0.12, opacity: 0.35 },
  camPos: mobile ? [0, 7, 36] : [-9, 5, 24], camLook: mobile ? [0, -2.5, 0] : [-8, 2.5, 0],
});
const std = (o) => new THREE.MeshStandardMaterial(o);

// ================= Phân bổ =================
const hero = new THREE.Group();
let ring = null, coin = null, sparks = null;
if (eng) {
  eng.scene.add(hero);
  const halo = glowSprite(GOLD, 26, 0.25); halo.position.set(0, 2, -3); hero.add(halo);
  const pg = new THREE.PolarGridHelper(22, 16, 10, 96, 0x6a4a18, 0x2a1d08);
  pg.position.y = -5.5; pg.material.transparent = true; pg.material.opacity = 0.5; hero.add(pg);
  const n = mobile ? 300 : 700, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, r = 5 + Math.random() * 9; pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = -4 + Math.random() * 12; pos[i * 3 + 2] = Math.sin(a) * r; }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  sparks = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.12, color: 0xffd98a, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }));
  hero.add(sparks);
  fontsReady.then(() => {
    coin = makeCoin({ sym: 'JV', metal: '#f2c46a', dark: '#7a4d10', ink: '#3a2408', rimText: 'JAYV FINANCE · QUỸ MÔ PHỎNG · TIỀN ẢO', symSize: 380, radius: 2.6, thick: 0.34 });
    coin.position.y = 2;
    hero.add(coin);
  });
}
function buildRing(f) {
  if (!eng) { return; }
  if (ring) { hero.remove(ring); }
  const segs = (f ? f.holdings || [] : []).map((h, i) => ({ w: h.weight, col: new THREE.Color(HOLD_COL[i % HOLD_COL.length]), metal: true, thick: 1.1, data: { id: h.id } }));
  segs.push({ w: f ? f.cashWeight || 0 : 1, col: CASH, thick: 0.7, opacity: 0.55, data: { id: 'cash' } });
  ring = makeAllocRing(segs, { R: 7 });
  ring.rotation.x = -Math.PI / 2 + 0.32; ring.position.y = 1.2;
  hero.add(ring);
}

// ================= Hiệu suất =================
const perf = new THREE.Group();
perf.position.z = Z.perf;
let perfTags = null;
function buildPerf(f) {
  if (!eng || !DATA) { return; }
  while (perf.children.length) { perf.remove(perf.children[0]); }
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(46, 20), std({ color: 0x120e08, roughness: 0.8, metalness: 0.2 }));
  wall.position.set(0, 6, -1); perf.add(wall);
  const grid = new THREE.GridHelper(46, 23, 0x5a4318, 0x2a2010); grid.rotation.x = Math.PI / 2; grid.position.set(0, 6, -0.9); perf.add(grid);
  const inc = (f && f.inception) || '2026-09-24';
  const it = DATA.items.VNINDEX;
  const bench = [];
  if (it && it.histD && it.hist) {
    const i0 = it.histD.indexOf(inc);
    if (i0 >= 0) { for (let i = i0; i < it.hist.length; i++) { bench.push({ d: it.histD[i], v: it.hist[i] / it.hist[i0] * 100 }); } }
    if (bench.length && it.day && it.day > bench[bench.length - 1].d) { bench.push({ d: it.day, v: it.last / it.hist[i0] * 100 }); }
  }
  let fund = (f && f.history && f.history.length ? f.history.map((x) => ({ d: x.d, v: x.nav })) : [{ d: inc, v: 100 }]);
  if (f && f.asOf && f.nav != null && fund[fund.length - 1].d < f.asOf) { fund = fund.concat([{ d: f.asOf, v: f.nav }]); }
  const days = [...new Set(bench.map((x) => x.d).concat(fund.map((x) => x.d)))].sort();
  const all = bench.map((x) => x.v).concat(fund.map((x) => x.v), [100]);
  const lo = Math.min(...all) - 0.4, hi = Math.max(...all) + 0.4;
  const X = (d) => -20 + 40 * (days.length > 1 ? days.indexOf(d) / (days.length - 1) : 0.5);
  const Y = (v) => -2.5 + 17 * (v - lo) / ((hi - lo) || 1);
  const tube = (pts, col, r) => {
    const v3 = pts.map((p) => new THREE.Vector3(X(p.d), Y(p.v), 0.2));
    if (v3.length === 1) { v3.push(v3[0].clone().add(new THREE.Vector3(0.5, 0, 0))); }
    const curve = new THREE.CatmullRomCurve3(v3, false, 'catmullrom', 0.1);
    perf.add(new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(20, v3.length * 20), r, 10), new THREE.MeshBasicMaterial({ color: col })));
    v3.forEach((p) => { const s = new THREE.Mesh(new THREE.SphereGeometry(r * 2.4, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })); s.position.copy(p); perf.add(s); });
    return v3[v3.length - 1];
  };
  const base = new THREE.Mesh(new THREE.BoxGeometry(42, 0.05, 0.05), new THREE.MeshBasicMaterial({ color: 0x888070 }));
  base.position.set(0, Y(100), 0.1); perf.add(base);
  const eF = tube(fund, GOLD, 0.16), eB = bench.length ? tube(bench, TEAL, 0.11) : null;
  if (!perfTags) { perfTags = eng.tags($('tags-perf')); }
  const items = [{ html: `Quỹ JayV <span class="num" style="color:var(--gold)">${fmt(fund[fund.length - 1].v, 2)}</span>`, pos: eF.clone().add(new THREE.Vector3(0, 1.4, 0)) }];
  if (eB) { items.push({ html: `VN-Index <span class="num" style="color:var(--teal)">${fmt(bench[bench.length - 1].v, 2)}</span>`, pos: eB.clone().add(new THREE.Vector3(0, -1.4, 0)) }); }
  items.push({ html: `Mốc 100 · ${ddmmyy(inc)}`, pos: new THREE.Vector3(-20, Y(100) + 0.9, Z.perf) });
  items.forEach((x, i) => { if (i < 2) { x.pos.z += Z.perf; } });
  perfTags.set(items);
  const diff = bench.length ? fund[fund.length - 1].v - bench[bench.length - 1].v : null;
  $('perf-note').textContent = `Quỹ chạy từ ${ddmmyy(inc)} (${days.length} phiên có số). ${diff != null ? `Hiện quỹ ${diff >= 0 ? 'hơn' : 'kém'} VN-Index ${fmt(Math.abs(diff), 2)} điểm trên thang 100.` : ''} Quãng thời gian còn rất ngắn nên chênh lệch chưa nói lên kỹ năng; cần nhiều tháng để so sánh có ý nghĩa.`;
}
if (eng) { eng.scene.add(perf); }

// ================= Ba kho =================
const vaults = [];
const VX = [-13, 0, 13];
function buildVaults() {
  if (!eng) { return; }
  const steel = std({ color: 0x3a3f44, metalness: 0.9, roughness: 0.35 });
  const dark = std({ color: 0x14161a, metalness: 0.6, roughness: 0.5 });
  ['VN', 'AU', 'US'].forEach((m, i) => {
    const open = !!(DATA && DATA.sync && DATA.sync.funds && DATA.sync.funds[m]);
    const g = new THREE.Group();
    g.position.set(VX[i], 4, Z.vault);
    const wall = new THREE.Mesh(new THREE.BoxGeometry(11, 11, 1.2), dark);
    wall.position.z = -0.8; g.add(wall);
    const frame = new THREE.Mesh(new THREE.TorusGeometry(3.7, 0.35, 16, 96), steel); g.add(frame);
    const inside = new THREE.Mesh(new THREE.CircleGeometry(3.6, 64), new THREE.MeshBasicMaterial({ color: open ? 0x3a2600 : 0x05070a }));
    inside.position.z = -0.2; g.add(inside);
    if (open) {
      const bars = makeGoldBars(); bars.scale.setScalar(0.9); bars.position.set(0, -1.2, -0.1); g.add(bars);
      const gl = glowSprite(GOLD, 12, 0.5); gl.position.z = 0.2; g.add(gl);
    }
    const hinge = new THREE.Group();
    hinge.position.set(-3.5, 0, 0.3);
    g.add(hinge);
    const door = new THREE.Group(); door.position.x = 3.5; hinge.add(door);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.7, 64), steel); disc.rotation.x = Math.PI / 2; door.add(disc);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.1, 8, 64), std({ color: 0x8a9096, metalness: 1, roughness: 0.2 })); rim.position.z = 0.36; door.add(rim);
    for (let b = 0; b < 8; b++) { const a = b / 8 * Math.PI * 2; const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 12), std({ color: 0xb0b6bc, metalness: 1, roughness: 0.2 })); bolt.rotation.x = Math.PI / 2; bolt.position.set(Math.cos(a) * 2.6, Math.sin(a) * 2.6, 0.45); door.add(bolt); }
    const wheel = new THREE.Group(); wheel.position.z = 0.55;
    wheel.add(new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.09, 10, 48), std({ color: 0xd9dde1, metalness: 1, roughness: 0.15 })));
    for (let s = 0; s < 3; s++) { const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 8), std({ color: 0xd9dde1, metalness: 1, roughness: 0.15 })); sp.rotation.z = s * Math.PI / 3; wheel.add(sp); }
    door.add(wheel);
    const label = new THREE.Mesh(new THREE.CircleGeometry(0.5, 32), new THREE.MeshBasicMaterial({ color: open ? GOLD : new THREE.Color('#ff6b5c') }));
    label.position.set(0, -2.1, 0.37); door.add(label);
    if (!open) {
      const lock = new THREE.Group(); lock.position.set(2.6, -0.4, 0.8);
      lock.add(new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 0.35), std({ color: 0xc9962e, metalness: 1, roughness: 0.25 })));
      const sh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.07, 8, 24, Math.PI), std({ color: 0xd9dde1, metalness: 1, roughness: 0.2 })); sh.position.y = 0.4; lock.add(sh);
      door.add(lock);
    }
    eng.scene.add(g);
    vaults.push({ g, hinge, wheel, open, openT: open ? 1 : 0, cur: 0 });
  });
}

// ================= Chữ =================
function benchSince(inc) {
  const it = DATA.items.VNINDEX;
  if (!it || !it.histD) { return null; }
  const i = it.histD.indexOf(inc || '2026-09-24');
  return i >= 0 ? it.last / it.hist[i] * 100 : null;
}
function render() {
  const f = DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
  const bench = f ? benchSince(f.inception) : null;
  $('navbox').innerHTML = f ? `<div><div class="k">Giá trị quỹ</div><div class="v">${fmt(f.nav, 2)}</div></div><div><div class="k">VN-Index cùng mốc</div><div class="v">${bench != null ? fmt(bench, 2) : '–'}</div></div><div><div class="k">Tiền mặt</div><div class="v">${fmt((f.cashWeight || 0) * 100, 0)}%</div></div>` : '<div><div class="k">Quỹ chưa khởi tạo</div><div class="v">–</div></div>';
  $('ring-nav').textContent = f ? fmt(f.nav, 2) : '–';
  $('hold').innerHTML = f ? (f.holdings || []).map((h, i) => {
    const it = DATA.items[h.id] || {};
    const ret = h.entryPrice && it.last ? (it.last / h.entryPrice - 1) * 100 : h.return != null ? h.return * 100 : null;
    return `<li><i style="background:${HOLD_COL[i % HOLD_COL.length]}"></i><span><b>${esc(it.label || h.id)}</b> <small>${h.entryDate ? 'vào ' + ddmmyy(h.entryDate) : ''}${ret != null ? ` · <span class="${cls(ret)}">${pct(ret)}</span> từ giá vào` : ''}</small></span><span class="num">${fmt(h.weight * 100, 1)}%</span></li>`;
  }).join('') + `<li><i style="background:#3aa7a8"></i><span>Tiền mặt</span><span class="num">${fmt((f.cashWeight || 0) * 100, 1)}%</span></li>` + ((f.waiting || []).length ? `<li><i style="background:transparent;box-shadow:inset 0 0 0 1.5px var(--gold)"></i><span>Chờ kỳ cân lại: <b>${esc((f.waiting || []).map((id) => id.split('-')[1]).join(', '))}</b></span><span></span></li>` : '') : '';
  // Kho
  const F = (DATA.sync && DATA.sync.funds) || {};
  $('v-copy').innerHTML = ['VN', 'AU', 'US'].map((m, i) => {
    const q = F[m];
    const bm = { VN: 'VN-Index', AU: 'S&P/ASX 200', US: 'S&P 500' }[m], cur = { VN: 'VND', AU: 'AUD', US: 'USD' }[m];
    return `<article class="panel vault" data-i="${i}"><div class="st" style="color:${q ? 'var(--gold)' : 'var(--down)'}">${q ? '● Đang hoạt động' : '● Đang khóa'}</div><h3>${MKT[m]} · ${cur}</h3><p>${q ? `Giá trị ${fmt(q.nav, 2)} · ${(q.holdings || []).length} mã · so với ${bm}.` : `Mở khi có ít nhất một mã ${MKT[m]} được chấm Tích cực và có giá đóng cửa đáng tin. So với ${bm}.`}</p></article>`;
  }).join('');
  // Bảng nhận định
  const keys = (DATA.groups.watchlist || []).filter((k) => DATA.items[k] && DATA.items[k].verdict);
  const col = (v) => keys.filter((k) => DATA.items[k].verdict === v).sort((a, b) => (DATA.items[b].confidence || 0) - (DATA.items[a].confidence || 0));
  $('board').innerHTML = [['bullish', 'var(--up)'], ['neutral', 'var(--dim)'], ['bearish', 'var(--down)']].map(([v, c]) => `<div class="col"><h4 style="color:${c}">${VERD[v]} · ${col(v).length}</h4>${col(v).map((k) => {
    const it = DATA.items[k], on = Math.round((it.confidence || 0) / 10), inF = (it.tags || []).includes('fund');
    return `<a class="vc${inF ? ' in' : ''}" href="${href('co-phieu/')}#${esc(k)}" data-nav style="color:${c}"><span class="t" style="color:var(--ink)"><span>${esc(it.label)} <small class="muted" style="font-weight:500">${esc(MKT[it.market])}</small></span><span class="num">${it.confidence != null ? it.confidence : '–'}</span></span><span class="m">${Array.from({ length: 10 }, (_, j) => `<i class="${j < on ? 'on' : ''}"></i>`).join('')}</span>${inF ? '<span class="goldtag" style="color:var(--gold);font-size:12px;font-weight:600">Trong Quỹ JayV</span>' : ''}</a>`;
  }).join('') || '<p class="muted" style="font-size:13px;margin:0">Chưa có mã.</p>'}</div>`).join('');
  const log = f && f.log && f.log.length ? f.log : [{ d: f ? f.inception : '', text: 'Nhật ký chi tiết sẽ hiện sau lần đồng bộ kế tiếp của routine.' }];
  $('log').innerHTML = log.map((x) => `<li><span class="d">${esc(ddmmyy(x.d))}</span><span>${esc(x.text)}</span></li>`).join('');
  $('disc2').textContent = DISCLAIMER;
  shell.observe(document);
}

let firstData = true;
createFeed({
  onData(d, why) {
    DATA = d;
    render();
    const f = DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
    if (eng && (firstData || why === 'server')) { buildRing(f); buildPerf(f); if (firstData) { buildVaults(); } }
    firstData = false;
    requestAnimationFrame(() => tl.build());
  },
  content: false,
  onFresh(f) { shell.setFresh(f); },
});

// ================= Camera =================
const tl = createTimeline(() => {
  const m = mobile;
  return {
    'f-hero': { ground: '#0b0906', bloom: 0.7, keys: [
      { p: 0, pos: m ? [0, 7, 36] : [-9, 5, 24], look: m ? [0, -2.5, 0] : [-8, 2.2, 0] },
      { p: 1, pos: m ? [0, 14, 32] : [-6, 14, 22], look: m ? [0, -3.5, 0] : [-4, 1, 0] }] },
    'f-perf': { ground: '#0d0a06', bloom: 0.75, keys: [
      { p: 0, pos: [m ? 0 : 4, 7, Z.perf + (m ? 62 : 44)], look: [m ? 0 : 8, m ? 3 : 5, Z.perf] },
      { p: 1, pos: [m ? 0 : 10, 9, Z.perf + (m ? 60 : 40)], look: [m ? 0 : 8, m ? 3 : 5.5, Z.perf] }] },
    'f-vaults': { ground: '#08090b', bloom: 0.75, keys: VX.map((x, i) => ({ p: i / 2, pos: [x * (m ? 1 : 0.7), 6, Z.vault + (m ? 22 : 20)], look: [x * (m ? 1 : 0.8), m ? 5.5 : 3.5, Z.vault] })) },
    'f-rules': { ground: '#05080d', bloom: 0.6, keys: [{ p: 0.5, pos: [0, 30, Z.vault + 40], look: [0, 0, Z.vault] }] },
  };
});

let active = 'f-hero', vaultStep = -1;
const dots = [...document.querySelectorAll('.dots a')];
if (eng) {
  let first = true;
  eng.onFrame((t, dt) => {
    const s = tl.sample(window.scrollY);
    if (s) { eng.setTarget(s.pos, s.look); eng.setGround(s.ground, s.bloom); if (first) { eng.jump(); first = false; } }
    const hp = tl.progressOf('f-hero');
    if (ring) { ring.rotation.z = -hp * Math.PI * 1.4 + (REDUCED ? 0 : t * 0.06); }
    if (coin) { coin.rotation.y = t * 0.6; coin.position.y = 2 + Math.sin(t * 0.9) * 0.2; }
    if (sparks) { sparks.rotation.y = t * 0.05; }
    vaults.forEach((v, i) => {
      const on = active === 'f-vaults' && i === vaultStep;
      const goal = v.open ? (on ? -1.25 : -0.55) : 0;
      v.cur += (goal - v.cur) * Math.min(1, dt * 2.5);
      v.hinge.rotation.y = v.cur;
      v.wheel.rotation.z = v.open ? t * 0.6 : Math.sin(t * 3 + i) * (on ? 0.08 : 0.02);
    });
    // nhãn giá trị quỹ đặt giữa vòng
    const q = eng.project(new THREE.Vector3(0, 6.2, 0));
    const lbl = $('ring-label');
    lbl.style.left = q.x + 'px'; lbl.style.top = q.y + 'px';
    lbl.style.opacity = active === 'f-hero' && q.on ? '1' : '0';
    if (perfTags) { perfTags.update(active === 'f-perf'); }
    perf.visible = active !== 'f-hero';
  });
  eng.start();
  shell.onWarp = () => eng.warp();
}
function tick() {
  const y = window.scrollY, vh = window.innerHeight;
  const cur = tl.current();
  if (cur && cur !== active) { active = cur; dots.forEach((d) => d.classList.toggle('on', d.getAttribute('href') === '#' + active)); }
  const vs = Math.round(tl.progressOf('f-vaults') * 2);
  if (vs !== vaultStep) { vaultStep = vs; document.querySelectorAll('.vault').forEach((el, i) => el.classList.toggle('on', i === vs)); }
  $('progress').style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - vh), 0, 1)})`;
  requestAnimationFrame(tick);
}
window.addEventListener('resize', () => { mobile = mqMobile.matches; tl.build(); });
window.addEventListener('load', () => tl.build());
tl.build();
requestAnimationFrame(tick);
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
