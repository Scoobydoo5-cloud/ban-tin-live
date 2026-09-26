// Trang Cổ phiếu: thành phố 3D, mỗi tòa nhà là một mã; đổi thước đo, lọc thị trường, bấm tòa để xem hồ sơ nhanh.
import { createEngine, glowSprite, canvasTexture, THREE, UP, DOWN, FLAT, GOLD, mqMobile, REDUCED } from '../core/engine.js';
import { initShell } from '../core/shell.js';
import { createFeed, href } from '../core/data.js';
import { esc, fmt, pct, cls, clamp, dpOf, TREND, VERD, MKT, spark } from '../core/fmt.js';
import { RoundedBoxGeometry } from '../../vendor/jsm/geometries/RoundedBoxGeometry.js';

const shell = initShell('stocks');
const $ = (id) => document.getElementById(id);
let mobile = mqMobile.matches;
let DATA = null, CONTENT = null;
const DIST = { VN: -24, AU: 0, US: 24 };
const SCALE = { changePct: 0.9, chg1w: 2.2, chg1m: 4.5, chgYtd: 9 };
let metric = 'chgYtd', market = 'ALL', selected = null;

const eng = createEngine($('gl'), {
  ground: '#060b10', fog: 0.009, bloom: [0.75, 0.5, 0.6],
  dust: { n: 1600, spread: [120, 50, 90], center: [0, 16, 0], size: 0.1, opacity: 0.3 },
  camPos: [0, 34, 60], camLook: [0, 2, 0], parallax: [0.6, 0.4],
});
const std = (o) => new THREE.MeshStandardMaterial(o);

// ================= Thành phố =================
const city = new THREE.Group();
let towers = [], tags = null;
const windowTex = canvasTexture(128, 256, (g, w, h) => {
  g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
  for (let y = 6; y < h; y += 14) {
    for (let x = 8; x < w - 8; x += 18) {
      const on = Math.random();
      g.fillStyle = on > 0.35 ? `rgba(255,255,255,${0.35 + on * 0.65})` : 'rgba(255,255,255,0.05)';
      g.fillRect(x, y, 10, 7);
    }
  }
});
windowTex.wrapS = windowTex.wrapT = THREE.RepeatWrapping;
if (eng) {
  const S = eng.scene;
  S.add(city);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(160, 110), std({ color: 0x0b2229, roughness: 0.08, metalness: 0.6, transparent: true, opacity: 0.8 }));
  glass.rotation.x = -Math.PI / 2; glass.position.y = -0.02;
  S.add(glass);
  const grid = new THREE.GridHelper(160, 80, 0x1f5f63, 0x0f3036);
  grid.material.transparent = true; grid.material.opacity = 0.45;
  S.add(grid);
  Object.entries(DIST).forEach(([m, x]) => {
    const plate = new THREE.Mesh(new RoundedBoxGeometry(18, 0.3, 26, 3, 0.12), std({ color: 0x0f2c33, metalness: 0.6, roughness: 0.25 }));
    plate.position.set(x, 0.15, 0);
    const edge = new THREE.Mesh(new THREE.TorusGeometry(1, 0.02, 4, 4), new THREE.MeshBasicMaterial({ color: 0x5fe3e0 }));
    edge.scale.set(12.8, 18.4, 1); edge.rotation.set(Math.PI / 2, 0, Math.PI / 4); edge.position.set(x, 0.32, 0);
    S.add(plate, edge);
  });
}
function valOf(it, k) { return k === 'chg1w' ? (it.pa || {}).chg1w : it[k]; }
function buildCity() {
  if (!eng || !DATA) { return; }
  towers.forEach((t) => city.remove(t.g));
  towers = [];
  const keys = (DATA.groups.watchlist || []).filter((k) => DATA.items[k] && !DATA.items[k].index);
  const rows = { VN: [], AU: [], US: [] };
  keys.forEach((k) => (rows[DATA.items[k].market] || []).push(k));
  Object.entries(rows).forEach(([m, ks]) => {
    ks.forEach((k, i) => {
      const it = DATA.items[k];
      const col = i % 3, row = Math.floor(i / 3);
      const x = DIST[m] + (col - 1) * 5.2, z = (row - (Math.ceil(ks.length / 3) - 1) / 2) * 5.6;
      const g = new THREE.Group();
      g.position.set(x, 0.3, z);
      const tex = windowTex.clone(); tex.needsUpdate = true;
      const mat = std({ color: 0x0c1a20, emissive: FLAT, emissiveMap: tex, emissiveIntensity: 1.2, roughness: 0.18, metalness: 0.7 });
      const body = new THREE.Mesh(new RoundedBoxGeometry(2.6, 1, 2.6, 3, 0.1), mat);
      body.userData.key = k;
      const roof = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.08, 2.7), new THREE.MeshBasicMaterial({ color: FLAT }));
      g.add(body, roof);
      let crown = null, ring = null;
      const tg = it.tags || [];
      if (tg.includes('fund')) {
        crown = new THREE.Group();
        const cone = new THREE.Mesh(new THREE.ConeGeometry(1.1, 1.6, 4), std({ color: GOLD, metalness: 1, roughness: 0.2, emissive: 0x6a4300, emissiveIntensity: 0.7 }));
        cone.rotation.y = Math.PI / 4; cone.position.y = 0.8;
        const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 30, 8), new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
        beam.position.y = 15.8;
        crown.add(cone, beam);
        g.add(crown);
      }
      if (tg.includes('waiting')) {
        ring = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.06, 8, 64), new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.7 }));
        ring.rotation.x = Math.PI / 2; ring.position.y = 0.05;
        g.add(ring);
      }
      city.add(g);
      towers.push({ k, g, body, roof, crown, ring, mat, tex, h: 0.4, th: 1, market: m, dim: 0 });
    });
  });
  if (!tags) { tags = eng.tags($('tags-city')); }
  towers.forEach((t) => { t.tagPos = new THREE.Vector3(t.g.position.x, 2, t.g.position.z); });
  const els = tags.set(towers.map((t) => ({ cls: (DATA.items[t.k].tags || []).includes('fund') ? 'fund' : '', attrs: { 'data-k': t.k, role: 'button', tabindex: '0' }, html: `${esc(DATA.items[t.k].label)}<span class="v"></span>`, pos: t.tagPos }))
    .concat(Object.entries(DIST).map(([m, x]) => ({ cls: 'dist', html: MKT[m].toUpperCase(), pos: new THREE.Vector3(x, 0.4, 14.5) }))));
  towers.forEach((t, i) => { t.tag = els[i]; });
  applyMetric();
}
function applyMetric() {
  if (!DATA) { return; }
  towers.forEach((t) => {
    const v = valOf(DATA.items[t.k], metric);
    const c = v > 0 ? UP : v < 0 ? DOWN : FLAT;
    t.th = 0.8 + Math.min(16, Math.abs(v || 0) / SCALE[metric] * 1.6);
    t.mat.emissive.copy(c); t.roof.material.color.copy(c);
    if (t.tag) { const s = t.tag.querySelector('.v'); s.textContent = pct(v, metric === 'changePct' ? 2 : 1); s.className = 'v ' + cls(v); }
  });
  renderList();
}

// ================= Giao diện =================
function renderList() {
  if (!DATA) { return; }
  const keys = towers.map((t) => t.k).filter((k) => market === 'ALL' || DATA.items[k].market === market);
  const by = { VN: [], AU: [], US: [] };
  keys.forEach((k) => by[DATA.items[k].market].push(k));
  $('c-list').innerHTML = Object.entries(by).filter(([, ks]) => ks.length).map(([m, ks]) => `<div class="grp">${MKT[m]}</div>` + ks.sort((a, b) => (valOf(DATA.items[b], metric) || 0) - (valOf(DATA.items[a], metric) || 0)).map((k) => {
    const it = DATA.items[k], v = valOf(it, metric);
    return `<button type="button" data-k="${esc(k)}" class="${k === selected ? 'on' : ''}"><i style="background:${(it.tags || []).includes('fund') ? 'var(--gold)' : v > 0 ? 'var(--up)' : v < 0 ? 'var(--down)' : 'var(--faint)'}"></i><span class="l"><b>${esc(it.label)}</b><small>${esc(it.name || '')}</small></span><span class="v ${cls(v)}">${pct(v, metric === 'changePct' ? 2 : 1)}</span></button>`;
  }).join('')).join('');
}
function renderDrawer(k) {
  const d = $('drawer');
  if (!k || !DATA || !DATA.items[k]) { d.classList.remove('on'); return; }
  const it = DATA.items[k], pa = it.pa || {}, w = ((CONTENT && CONTENT.watch) || []).find((x) => x.id === k) || {};
  const tg = it.tags || [];
  const fund = tg.includes('fund') ? `<div class="goldtag">Trong Quỹ JayV · tỷ trọng ${fmt((it.weight || 0) * 100, 1)}%</div>` : tg.includes('waiting') ? '<div class="goldtag">Đã đạt chuẩn, chờ kỳ cân lại của Quỹ JayV</div>' : '';
  const ma = it.ma50 && it.ma200 ? (it.last > it.ma50 ? 'trên' : 'dưới') + ' MA50, ' + (it.last > it.ma200 ? 'trên' : 'dưới') + ' MA200' : '–';
  d.innerHTML = `<button class="icon-btn x" type="button" data-close aria-label="Đóng">✕</button>
    <div class="eyebrow">${esc(MKT[it.market] || '')}${it.exchange ? ' · ' + esc(it.exchange) : ''}</div>
    <h2>${esc(it.label)}</h2><div class="nm">${esc(it.name || '')}</div>${fund}
    <div class="price"><span class="v num">${fmt(it.last, dpOf(it))}</span><span class="muted">${esc(it.currency || '')}</span><span class="num ${cls(it.changePct)}">${pct(it.changePct)}</span></div>
    ${spark(it.hist, { h: 60 })}
    <dl><div><dt>1 tuần</dt><dd class="${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</dd></div><div><dt>1 tháng</dt><dd class="${cls(it.chg1m)}">${pct(it.chg1m, 1)}</dd></div>
      <div><dt>Từ đầu năm</dt><dd class="${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</dd></div><div><dt>Cách đỉnh 52 tuần</dt><dd>${pct(pa.fromHi52, 1)}</dd></div>
      <div><dt>RSI 14</dt><dd>${pa.rsi14 != null ? fmt(pa.rsi14, 0) : '–'}</dd></div><div><dt>Xu hướng</dt><dd style="font-family:var(--f-body)">${TREND[pa.trend] || '–'}</dd></div>
      <div><dt>Biến động 20 phiên</dt><dd>${pa.vol20 != null ? fmt(pa.vol20, 1) + '%' : '–'}</dd></div><div><dt>Đường trung bình</dt><dd style="font-family:var(--f-body);font-size:13px">${ma}</dd></div></dl>
    ${it.verdict ? `<div><span class="verdict ${esc(it.verdict)}">Mô phỏng Buffett: ${VERD[it.verdict] || it.verdict}${it.confidence != null ? ' · ' + it.confidence + '/100' : ''}</span></div>` : ''}
    ${w.growth ? `<p class="txt"><b>Tăng trưởng:</b> ${esc(w.growth)}</p>` : ''}${w.risk ? `<p class="txt"><b>Rủi ro:</b> ${esc(w.risk)}</p>` : ''}
    <div class="row-btns"><a class="btn gold" href="${href('bang-gia/')}" data-nav>Bảng giá chi tiết</a><a class="btn" href="https://claude.ai/artifact/1ivWHfw7vfybPnV2a4QpZV#nghien-cuu-${encodeURIComponent(k)}" target="_blank" rel="noopener">Hồ sơ đầy đủ ↗</a></div>
    <p class="txt" style="font-size:12px">Mô tả quá khứ và nhận định mô phỏng, không phải tín hiệu mua bán.</p>`;
  d.classList.add('on');
}
function renderCards() {
  if (!DATA) { return; }
  const keys = (DATA.groups.watchlist || []).filter((k) => DATA.items[k] && !DATA.items[k].index);
  const W = (CONTENT && CONTENT.watch) || [];
  $('cards').innerHTML = keys.map((k) => {
    const it = DATA.items[k], w = W.find((x) => x.id === k) || {}, tg = it.tags || [];
    return `<article class="panel sc rise" data-tilt><div class="top"><h3>${esc(it.label)}</h3><span class="badge">${esc(MKT[it.market])}</span></div><div class="nm">${esc(it.name || '')}</div>
      <div class="row"><span>Giá <b>${fmt(it.last, dpOf(it))}</b></span><span>Năm nay <b class="${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</b></span>${tg.includes('fund') ? '<span class="goldtag">Trong Quỹ JayV</span>' : ''}</div>
      ${w.growth ? `<p>${esc(w.growth)}</p>` : '<p class="muted">Chưa có tóm tắt tăng trưởng.</p>'}${w.risk ? `<p class="risk">Rủi ro: ${esc(w.risk)}</p>` : ''}
      ${it.verdict ? `<div><span class="verdict ${esc(it.verdict)}">${VERD[it.verdict]}${it.confidence != null ? ' · ' + it.confidence : ''}</span></div>` : ''}
      <a class="more" href="#${esc(k)}" data-k="${esc(k)}">Xem trong thành phố →</a></article>`;
  }).join('');
  shell.observe($('cards'));
}

function select(k, fly = true) {
  selected = k && DATA && DATA.items[k] ? k : null;
  renderDrawer(selected);
  renderList();
  towers.forEach((t) => { if (t.tag) { t.tag.classList.toggle('sel', t.k === selected); } });
  if (!eng) { return; }
  if (selected && fly) {
    const t = towers.find((x) => x.k === selected);
    if (t) {
      const p = t.g.position, h = t.th;
      eng.rig.tYaw = 0; eng.rig.tPitch = 0; eng.rig.tZoom = 1;
      eng.setTarget(mobile ? [p.x, h + 16, p.z + 26] : [p.x + 7, h + 15, p.z + 24], mobile ? [p.x, h * 0.4, p.z] : [p.x + 5, h * 0.45, p.z]);
    }
  } else if (!selected) { frameMarket(); }
  if (selected && location.hash !== '#' + selected) { history.replaceState(null, '', '#' + selected); }
}
function frameMarket() {
  if (!eng) { return; }
  const x = market === 'ALL' ? 0 : DIST[market];
  eng.rig.tZoom = 1;
  if (market === 'ALL') { eng.setTarget(mobile ? [0, 52, 78] : [0, 34, 60], [0, 2, 0]); }
  else { eng.setTarget(mobile ? [x, 30, 40] : [x + 4, 20, 32], [x, 3, 0]); }
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-k]');
  if (b && (b.closest('#c-list') || b.closest('#tags-city') || b.closest('#cards'))) {
    e.preventDefault();
    if (b.closest('#cards')) { window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); }
    select(b.dataset.k);
    return;
  }
  if (e.target.closest('[data-close]')) { select(null); history.replaceState(null, '', location.pathname); }
});
$('seg-metric').addEventListener('click', (e) => { const b = e.target.closest('button[data-k]'); if (!b) { return; } metric = b.dataset.k; $('seg-metric').querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); applyMetric(); });
$('seg-mkt').addEventListener('click', (e) => { const b = e.target.closest('button[data-m]'); if (!b) { return; } market = b.dataset.m; $('seg-mkt').querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); selected = null; renderDrawer(null); renderList(); frameMarket(); });
$('c-list').addEventListener('mouseover', (e) => { const b = e.target.closest('button[data-k]'); towers.forEach((t) => { t.hover = b && t.k === b.dataset.k; }); });
$('c-list').addEventListener('mouseleave', () => towers.forEach((t) => { t.hover = false; }));

if (eng) {
  eng.enableDrag($('city-stage'), { zoom: true, minZoom: 0.45, maxZoom: 1.7, maxPitch: 0.7, onTap(nx, ny) {
    const hit = eng.pick(nx, ny, towers.map((t) => t.body));
    if (hit) { select(hit.object.userData.key); }
  } });
  $('city-stage').addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || eng.rig.dragging) { return; }
    const hit = eng.pick((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1, towers.map((t) => t.body));
    towers.forEach((t) => { t.hover = hit && hit.object.userData.key === t.k; });
    $('city-stage').style.cursor = hit ? 'pointer' : '';
  }, { passive: true });
  eng.rig.auto = 0.04;
  eng.onFrame((t, dt) => {
    const low = window.scrollY > window.innerHeight * 0.45;
    if (low) { eng.setGround('#05080d', 0.6); } else { eng.setGround('#060b10', 0.75); }
    towers.forEach((tw, i) => {
      tw.h += (tw.th - tw.h) * Math.min(1, dt * 3.2);
      tw.body.scale.y = tw.h; tw.body.position.y = tw.h / 2;
      tw.roof.position.y = tw.h + 0.02;
      tw.tex.repeat.set(1, Math.max(1, tw.h / 2.2));
      if (tw.crown) { tw.crown.position.y = tw.h; tw.crown.rotation.y = t * 0.6; }
      const dimT = market !== 'ALL' && tw.market !== market ? 1 : 0;
      tw.dim += (dimT - tw.dim) * Math.min(1, dt * 5);
      const hot = tw.hover || tw.k === selected ? 1 : 0;
      tw.mat.emissiveIntensity += ((1.1 + hot * 1.1) * (1 - tw.dim * 0.8) - tw.mat.emissiveIntensity) * Math.min(1, dt * 8);
      if (tw.k === selected) { tw.roof.scale.setScalar(1 + Math.sin(t * 4) * 0.04); } else { tw.roof.scale.setScalar(1); }
      if (tw.ring) { tw.ring.rotation.z = t * 0.8; }
      if (tw.tag) { tw.tag.style.visibility = tw.dim > 0.5 ? 'hidden' : ''; }
      if (tw.tagPos) { tw.tagPos.y = tw.h + 1.5 + (tw.crown ? 1.8 : 0); }
    });
    if (tags) { tags.update(!low); }
  });
  eng.start();
  shell.onWarp = () => eng.warp();
  window.addEventListener('resize', () => { mobile = mqMobile.matches; });
}

createFeed({
  onData(d, why) {
    const firstTime = !DATA;
    DATA = d;
    if (firstTime || why === 'server') { buildCity(); } else { applyMetric(); }
    renderCards();
    if (selected) { renderDrawer(selected); }
    if (firstTime) {
      const h = decodeURIComponent(location.hash.slice(1));
      if (h && DATA.items[h]) { setTimeout(() => select(h), 300); } else { frameMarket(); if (eng) { eng.jump(); } }
    }
  },
  onContent(c) { CONTENT = c; renderCards(); if (selected) { renderDrawer(selected); } },
  onFresh(f) { shell.setFresh(f); },
});
window.addEventListener('hashchange', () => { const h = decodeURIComponent(location.hash.slice(1)); if (h && DATA && DATA.items[h] && h !== selected) { select(h); } });
requestAnimationFrame(() => requestAnimationFrame(shell.ready));
