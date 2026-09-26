// Interactive labs for JayV Academy. Each lab mounts into an element and returns a cleanup function.
import * as THREE from 'three';

const fmtN = (v, dp = 2) => (v == null || !isFinite(v) ? '–' : Number(v).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp }));
const pctN = (v, dp = 2) => (v == null || !isFinite(v) ? '–' : (v * 100).toFixed(dp) + '%');
const N = (x) => 0.5 * (1 + erf(x / Math.SQRT2));
const phi = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
function erf(x) { // Abramowitz–Stegun 7.1.26
  const s = Math.sign(x), a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
}
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- small SVG chart helper ----------
function niceTicks(lo, hi, n = 5) {
  const span = hi - lo || 1, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0) || mag * 10;
  const out = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) { out.push(+v.toFixed(10)); }
  return out;
}
export function chart({ w = 640, h = 300, series = [], x, y, xl = '', yl = '', xf = (v) => fmtN(v, 0), yf = (v) => fmtN(v, 0), areas = [], marks = [], vlines = [], hlines = [] }) {
  const pl = 58, pr = 16, pt = 14, pb = 40;
  const X = (v) => pl + (v - x[0]) / (x[1] - x[0]) * (w - pl - pr);
  const Y = (v) => pt + (1 - (v - y[0]) / (y[1] - y[0])) * (h - pt - pb);
  let s = `<svg class="lab-chart" viewBox="0 0 ${w} ${h}" role="img">`;
  niceTicks(y[0], y[1]).forEach((t) => { s += `<line x1="${pl}" x2="${w - pr}" y1="${Y(t)}" y2="${Y(t)}" class="grid"/><text x="${pl - 8}" y="${Y(t) + 4}" text-anchor="end" class="ax">${esc(yf(t))}</text>`; });
  niceTicks(x[0], x[1], 6).forEach((t) => { s += `<text x="${X(t)}" y="${h - pb + 18}" text-anchor="middle" class="ax">${esc(xf(t))}</text>`; });
  if (xl) { s += `<text x="${(pl + w - pr) / 2}" y="${h - 4}" text-anchor="middle" class="axl">${esc(xl)}</text>`; }
  if (yl) { s += `<text x="12" y="${pt + (h - pt - pb) / 2}" text-anchor="middle" class="axl" transform="rotate(-90 12 ${pt + (h - pt - pb) / 2})">${esc(yl)}</text>`; }
  areas.forEach((a) => {
    const top = a.top.map(([u, v]) => `${X(u).toFixed(1)},${Y(v).toFixed(1)}`), bot = (a.bottom || a.top.map(([u]) => [u, y[0]])).slice().reverse().map(([u, v]) => `${X(u).toFixed(1)},${Y(v).toFixed(1)}`);
    s += `<polygon points="${top.concat(bot).join(' ')}" fill="${a.color}" opacity="${a.opacity || 0.25}"/>`;
  });
  hlines.forEach((l) => { s += `<line x1="${pl}" x2="${w - pr}" y1="${Y(l.v)}" y2="${Y(l.v)}" stroke="${l.color || '#888'}" stroke-dasharray="4 4"/>`; });
  vlines.forEach((l) => { s += `<line x1="${X(l.v)}" x2="${X(l.v)}" y1="${pt}" y2="${h - pb}" stroke="${l.color || '#888'}" stroke-dasharray="4 4"/>${l.label ? `<text x="${X(l.v) + 4}" y="${pt + 12}" class="ax" fill="${l.color}">${esc(l.label)}</text>` : ''}`; });
  series.forEach((sr) => {
    const d = sr.pts.filter(([u, v]) => isFinite(u) && isFinite(v)).map(([u, v], i) => `${i ? 'L' : 'M'}${X(u).toFixed(1)},${Y(Math.max(y[0] - (y[1] - y[0]), Math.min(y[1] + (y[1] - y[0]), v))).toFixed(1)}`).join('');
    s += `<path d="${d}" fill="none" stroke="${sr.color}" stroke-width="${sr.width || 2.2}" ${sr.dash ? `stroke-dasharray="${sr.dash}"` : ''} stroke-linejoin="round"/>`;
  });
  marks.forEach((m) => { s += `<circle cx="${X(m.x)}" cy="${Y(m.y)}" r="${m.r || 5}" fill="${m.color}" stroke="#05080d" stroke-width="1.5"/>${m.label ? `<text x="${X(m.x) + 8}" y="${Y(m.y) - 8}" class="ax" fill="${m.color}">${esc(m.label)}</text>` : ''}`; });
  return s + '</svg>';
}

// ---------- form helper ----------
function form(el, fields, onChange) {
  el.querySelector('.lab-inputs').innerHTML = fields.map((f) => f.type === 'select'
    ? `<label class="lf"><span>${esc(f.label)}</span><select data-k="${f.k}">${f.options.map((o) => `<option value="${esc(o[0])}"${o[0] == f.v ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>`
    : f.type === 'text'
      ? `<label class="lf wide"><span>${esc(f.label)}</span><input type="text" data-k="${f.k}" value="${esc(f.v)}"></label>`
      : `<label class="lf"><span>${esc(f.label)} <b data-o="${f.k}"></b></span><input type="range" data-k="${f.k}" min="${f.min}" max="${f.max}" step="${f.step}" value="${f.v}"></label>`).join('');
  const read = () => {
    const o = {};
    el.querySelectorAll('[data-k]').forEach((inp) => { o[inp.dataset.k] = inp.type === 'range' ? parseFloat(inp.value) : inp.value; });
    fields.forEach((f) => { const b = el.querySelector(`[data-o="${f.k}"]`); if (b) { b.textContent = f.fmt ? f.fmt(o[f.k]) : o[f.k]; } });
    return o;
  };
  const run = () => onChange(read());
  el.querySelectorAll('[data-k]').forEach((inp) => inp.addEventListener('input', run));
  run();
  return run;
}
const shell = (title, sub) => `<div class="lab-grid"><div class="lab-inputs"></div><div class="lab-out"><div class="lab-kpis"></div><div class="lab-vis"></div><div class="lab-note"></div></div></div>`;
const kpis = (el, arr) => { el.querySelector('.lab-kpis').innerHTML = arr.map(([k, v, c]) => `<div class="lk"><span>${esc(k)}</span><b style="${c ? `color:${c}` : ''}">${v}</b></div>`).join(''); };

// ---------- mini three.js stage for 3D labs ----------
function mini(el, { camPos = [0, 8, 26], look = [0, 4, 0], bg = 0x070a12 } = {}) {
  const box = el.querySelector('.lab-vis');
  box.innerHTML = '<canvas class="lab-3d"></canvas>';
  const cv = box.querySelector('canvas');
  const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: false });
  r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  r.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bg);
  scene.add(new THREE.HemisphereLight(0xcfefff, 0x0a0f14, 1.1));
  const d = new THREE.DirectionalLight(0xffffff, 1.6); d.position.set(10, 20, 14); scene.add(d);
  const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
  let yaw = 0, raf = 0, drag = null, auto = true;
  const target = new THREE.Vector3(...look), base = new THREE.Vector3(...camPos).sub(target);
  const size = () => { const w = box.clientWidth, h = Math.max(260, Math.min(420, w * 0.55)); r.setSize(w, h, false); cv.style.height = h + 'px'; cam.aspect = w / h; cam.updateProjectionMatrix(); };
  size();
  const ro = new ResizeObserver(size); ro.observe(box);
  const onUp = () => { drag = null; }, onMove = (e) => { if (drag != null) { yaw -= (e.clientX - drag) * 0.008; drag = e.clientX; } };
  cv.addEventListener('pointerdown', (e) => { drag = e.clientX; auto = false; });
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointermove', onMove);
  const tick = () => {
    if (auto) { yaw += 0.0025; }
    const p = base.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw).add(target);
    cam.position.copy(p); cam.lookAt(target);
    r.render(scene, cam);
    raf = requestAnimationFrame(tick);
  };
  tick();
  return { scene, cam, r, target, dispose() { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointermove', onMove); r.dispose(); scene.traverse((o) => { if (o.geometry) { o.geometry.dispose(); } if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose()); } }); } };
}

// ================= Labs =================
const LAB = {};

LAB.compound = (el) => {
  el.innerHTML = shell();
  const st = mini(el, { camPos: [26, 18, 34], look: [0, 6, 0] });
  const grp = new THREE.Group(); st.scene.add(grp);
  const grid = new THREE.GridHelper(40, 20, 0x2c7f82, 0x123a40); st.scene.add(grid);
  form(el, [
    { k: 'pv', label: 'Initial amount ($)', min: 0, max: 50000, step: 500, v: 10000, fmt: (v) => fmtN(v, 0) },
    { k: 'pmt', label: 'Monthly contribution ($)', min: 0, max: 3000, step: 50, v: 500, fmt: (v) => fmtN(v, 0) },
    { k: 'r', label: 'Annual return (%)', min: 0, max: 15, step: 0.1, v: 7, fmt: (v) => v.toFixed(1) + '%' },
    { k: 'yrs', label: 'Years', min: 1, max: 40, step: 1, v: 30 },
  ], (o) => {
    const i = o.r / 100 / 12; let bal = o.pv, contrib = o.pv;
    const rows = [];
    for (let m = 1; m <= o.yrs * 12; m++) { bal = bal * (1 + i) + o.pmt; contrib += o.pmt; if (m % 12 === 0) { rows.push([bal, contrib]); } }
    kpis(el, [['Final balance', '$' + fmtN(bal, 0), '#5fe3e0'], ['You contributed', '$' + fmtN(contrib, 0)], ['Growth from returns', '$' + fmtN(bal - contrib, 0), '#e9b85c'], ['Doubling time (Rule of 72)', o.r > 0 ? (72 / o.r).toFixed(1) + ' yrs' : '–']]);
    while (grp.children.length) { grp.remove(grp.children[0]); }
    const max = rows[rows.length - 1][0] || 1, n = rows.length;
    rows.forEach(([b, c], k) => {
      const hB = 14 * b / max, hC = 14 * Math.min(c, b) / max;
      const x = (k - (n - 1) / 2) * Math.min(1.1, 36 / n);
      const w = Math.min(0.9, 30 / n);
      const mC = new THREE.Mesh(new THREE.BoxGeometry(w, Math.max(0.01, hC), w), new THREE.MeshStandardMaterial({ color: 0x3aa7a8, metalness: 0.4, roughness: 0.35 }));
      mC.position.set(x, hC / 2, 0);
      const mI = new THREE.Mesh(new THREE.BoxGeometry(w, Math.max(0.01, hB - hC), w), new THREE.MeshStandardMaterial({ color: 0xe9b85c, metalness: 0.9, roughness: 0.25, emissive: 0x3a2400, emissiveIntensity: 0.4 }));
      mI.position.set(x, hC + (hB - hC) / 2, 0);
      grp.add(mC, mI);
    });
    el.querySelector('.lab-note').innerHTML = 'Teal = money you put in; gold = growth from compounding. Drag to rotate. Late years dominate: that is interest on interest.';
  });
  return () => st.dispose();
};

LAB.loan = (el) => {
  el.innerHTML = shell();
  form(el, [
    { k: 'P', label: 'Loan amount', min: 10000, max: 2000000, step: 10000, v: 600000, fmt: (v) => fmtN(v, 0) },
    { k: 'r', label: 'Interest rate (% p.a.)', min: 0.5, max: 15, step: 0.05, v: 6.2, fmt: (v) => v.toFixed(2) + '%' },
    { k: 'yrs', label: 'Term (years)', min: 1, max: 40, step: 1, v: 30 },
  ], (o) => {
    const i = o.r / 100 / 12, n = o.yrs * 12, pay = o.P * i / (1 - Math.pow(1 + i, -n));
    let bal = o.P; const intP = [], prinP = [], balP = [];
    for (let m = 1; m <= n; m++) { const it = bal * i, pr = pay - it; bal -= pr; if (m % 12 === 0 || m === 1) { const yr = m / 12; intP.push([yr, it]); prinP.push([yr, pay]); balP.push([yr, Math.max(0, bal)]); } }
    kpis(el, [['Monthly payment', fmtN(pay, 2), '#5fe3e0'], ['Total repaid', fmtN(pay * n, 0)], ['Total interest', fmtN(pay * n - o.P, 0), '#ff6b5c'], ['First payment that is interest', pctN(o.P * i / pay, 1)]]);
    el.querySelector('.lab-vis').innerHTML = chart({ series: [{ pts: prinP, color: '#5fe3e0' }, { pts: intP, color: '#ff6b5c' }], areas: [{ top: intP, color: '#ff6b5c', opacity: 0.2 }, { top: prinP, bottom: intP, color: '#5fe3e0', opacity: 0.15 }], x: [0, o.yrs], y: [0, pay * 1.08], xl: 'Year', yl: 'Monthly amount', xf: (v) => v.toFixed(0), yf: (v) => fmtN(v, 0) });
    el.querySelector('.lab-note').innerHTML = 'Red area = the interest part of each payment; teal band above it = principal repaid. Early on you mostly pay interest.';
  });
};

LAB.npv = (el) => {
  el.innerHTML = shell();
  const npv = (r, cf) => cf.reduce((a, c, t) => a + c / Math.pow(1 + r, t), 0);
  form(el, [
    { k: 'cf', label: 'Cash flows from year 0 (comma separated)', type: 'text', v: '-1000, 300, 400, 500, 200' },
    { k: 'r', label: 'Discount rate (%)', min: 0, max: 40, step: 0.25, v: 10, fmt: (v) => v.toFixed(2) + '%' },
  ], (o) => {
    const cf = String(o.cf).split(/[,;\s]+/).map(Number).filter((v) => isFinite(v));
    if (cf.length < 2) { kpis(el, [['Enter at least two cash flows', '']]); return; }
    let irr = null, lo = -0.99, hi = 5, flo = npv(lo, cf);
    if (flo * npv(hi, cf) < 0) { for (let k = 0; k < 200; k++) { const mid = (lo + hi) / 2, f = npv(mid, cf); if (f * flo > 0) { lo = mid; flo = f; } else { hi = mid; } } irr = (lo + hi) / 2; }
    let cum = 0, pb = null;
    cf.forEach((c, t) => { const prev = cum; cum += c; if (pb == null && t > 0 && cum >= 0 && prev < 0) { pb = t - 1 + (-prev) / c; } });
    const v = npv(o.r / 100, cf);
    kpis(el, [['NPV', fmtN(v, 2), v >= 0 ? '#38d99c' : '#ff6b5c'], ['IRR', irr != null ? pctN(irr, 2) : 'n/a'], ['Payback (years)', pb != null ? pb.toFixed(2) : 'never'], ['Decision at this rate', v >= 0 ? 'Accept' : 'Reject']]);
    const pts = []; for (let r = 0; r <= 0.4001; r += 0.005) { pts.push([r * 100, npv(r, cf)]); }
    const ys = pts.map((p) => p[1]);
    el.querySelector('.lab-vis').innerHTML = chart({ series: [{ pts, color: '#e9b85c' }], hlines: [{ v: 0, color: '#8fa3a8' }], vlines: irr != null && irr <= 0.4 ? [{ v: irr * 100, color: '#38d99c', label: 'IRR' }] : [], marks: [{ x: o.r, y: v, color: '#5fe3e0', label: 'NPV at your rate' }], x: [0, 40], y: [Math.min(0, ...ys), Math.max(0, ...ys)], xl: 'Discount rate (%)', yl: 'NPV', yf: (t) => fmtN(t, 0) });
    el.querySelector('.lab-note').innerHTML = 'The NPV profile crosses zero at the IRR. Try cash flows like -100, 230, -132 to see two IRRs.';
  });
};

LAB.frontier = (el) => {
  el.innerHTML = shell();
  form(el, [
    { k: 'e1', label: 'Stocks: expected return (%)', min: 0, max: 20, step: 0.5, v: 10, fmt: (v) => v + '%' },
    { k: 's1', label: 'Stocks: volatility (%)', min: 1, max: 40, step: 0.5, v: 18, fmt: (v) => v + '%' },
    { k: 'e2', label: 'Bonds: expected return (%)', min: 0, max: 15, step: 0.5, v: 5, fmt: (v) => v + '%' },
    { k: 's2', label: 'Bonds: volatility (%)', min: 1, max: 30, step: 0.5, v: 7, fmt: (v) => v + '%' },
    { k: 'rho', label: 'Correlation ρ', min: -1, max: 1, step: 0.05, v: 0.2, fmt: (v) => v.toFixed(2) },
    { k: 'rf', label: 'Risk-free rate (%)', min: 0, max: 8, step: 0.25, v: 4, fmt: (v) => v + '%' },
  ], (o) => {
    const e1 = o.e1 / 100, e2 = o.e2 / 100, s1 = o.s1 / 100, s2 = o.s2 / 100, rf = o.rf / 100;
    const P = (w) => ({ e: w * e1 + (1 - w) * e2, s: Math.sqrt(w * w * s1 * s1 + (1 - w) * (1 - w) * s2 * s2 + 2 * w * (1 - w) * o.rho * s1 * s2) });
    const pts = []; let best = null, mv = null;
    for (let w = 0; w <= 1.0001; w += 0.01) {
      const p = P(w); pts.push([p.s * 100, p.e * 100]);
      const sh = (p.e - rf) / p.s;
      if (!best || sh > best.sh) { best = { w, ...p, sh }; }
      if (!mv || p.s < mv.s) { mv = { w, ...p }; }
    }
    kpis(el, [['Min-variance mix', `${(mv.w * 100).toFixed(0)}% stocks`], ['Min volatility', pctN(mv.s, 2)], ['Tangency mix', `${(best.w * 100).toFixed(0)}% stocks`, '#38d99c'], ['Max Sharpe ratio', best.sh.toFixed(3), '#38d99c']]);
    const cal = [[0, rf * 100], [Math.max(...pts.map((p) => p[0])) * 1.1, (rf + best.sh * Math.max(...pts.map((p) => p[0])) * 1.1 / 100) * 100]];
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]).concat([rf * 100]);
    el.querySelector('.lab-vis').innerHTML = chart({ series: [{ pts: cal, color: '#e9b85c', dash: '6 5', width: 1.6 }, { pts, color: '#38d99c', width: 3 }], marks: [{ x: mv.s * 100, y: mv.e * 100, color: '#5fe3e0', label: 'min variance' }, { x: best.s * 100, y: best.e * 100, color: '#e9b85c', label: 'tangency' }, { x: s1 * 100, y: e1 * 100, color: '#ff7ab6', r: 4, label: 'stocks' }, { x: s2 * 100, y: e2 * 100, color: '#7fb2ff', r: 4, label: 'bonds' }], x: [0, Math.max(...xs) * 1.15], y: [Math.min(...ys) * 0.9, Math.max(...ys) * 1.1], xl: 'Volatility (%)', yl: 'Expected return (%)', xf: (v) => v.toFixed(0), yf: (v) => v.toFixed(1) });
    el.querySelector('.lab-note').innerHTML = 'Move ρ toward −1: the curve bends left and can reach zero risk. The dashed line is the capital allocation line through the tangency portfolio.';
  });
};

LAB.bond = (el) => {
  el.innerHTML = shell();
  const price = (c, y, n, m) => { let p = 0; for (let t = 1; t <= n * m; t++) { p += (1000 * c / m) / Math.pow(1 + y / m, t); } return p + 1000 / Math.pow(1 + y / m, n * m); };
  form(el, [
    { k: 'c', label: 'Coupon rate (%)', min: 0, max: 12, step: 0.25, v: 6, fmt: (v) => v + '%' },
    { k: 'n', label: 'Years to maturity', min: 1, max: 30, step: 1, v: 5 },
    { k: 'y', label: 'Yield to maturity (%)', min: 0.25, max: 15, step: 0.05, v: 7, fmt: (v) => v.toFixed(2) + '%' },
    { k: 'm', label: 'Payments per year', type: 'select', v: '1', options: [['1', 'Annual'], ['2', 'Semi-annual']] },
  ], (o) => {
    const c = o.c / 100, y = o.y / 100, n = o.n, m = +o.m;
    const P = price(c, y, n, m);
    let mac = 0, conv = 0;
    for (let t = 1; t <= n * m; t++) { const cf = 1000 * c / m + (t === n * m ? 1000 : 0), df = Math.pow(1 + y / m, -t); mac += (t / m) * cf * df; conv += (t * (t + 1)) * cf * df / Math.pow(1 + y / m, 2) / (m * m); }
    mac /= P; conv /= P;
    const mod = mac / (1 + y / m);
    kpis(el, [['Price (per 1,000 face)', fmtN(P, 2), '#7fb2ff'], ['Macaulay duration', mac.toFixed(3) + ' yrs'], ['Modified duration', mod.toFixed(3)], ['Convexity', conv.toFixed(2)]]);
    const pts = [], tan = [];
    for (let yy = 0.0025; yy <= 0.15001; yy += 0.0025) { pts.push([yy * 100, price(c, yy, n, m)]); tan.push([yy * 100, P * (1 - mod * (yy - y))]); }
    el.querySelector('.lab-vis').innerHTML = chart({ series: [{ pts: tan, color: '#e9b85c', dash: '6 5', width: 1.6 }, { pts, color: '#7fb2ff', width: 3 }], marks: [{ x: o.y, y: P, color: '#fff', label: fmtN(P, 1) }], hlines: [{ v: 1000, color: '#8fa3a8' }], x: [0, 15], y: [Math.min(...pts.map((p) => p[1])) * 0.95, Math.max(...pts.map((p) => p[1])) * 1.02], xl: 'Yield (%)', yl: 'Price', yf: (v) => fmtN(v, 0) });
    el.querySelector('.lab-note').innerHTML = 'Blue = true price; dashed = duration’s straight-line estimate. The gap is convexity, always in the holder’s favour.';
  });
};

LAB.payoff = (el) => {
  el.innerHTML = `<div class="lab-grid"><div class="lab-inputs"><div class="presets"></div><div class="legs"></div><button type="button" class="btn small add">+ Add leg</button></div><div class="lab-out"><div class="lab-kpis"></div><div class="lab-vis"></div><div class="lab-note">Profit at expiry, including premiums paid (−) or received (+). Try the presets, then edit strikes.</div></div></div>`;
  const PRESETS = {
    'Long call': [{ t: 'call', s: 1, K: 100, p: 6 }],
    'Covered call': [{ t: 'stock', s: 1, K: 100, p: 100 }, { t: 'call', s: -1, K: 110, p: 3 }],
    'Protective put': [{ t: 'stock', s: 1, K: 100, p: 100 }, { t: 'put', s: 1, K: 95, p: 3 }],
    'Bull call spread': [{ t: 'call', s: 1, K: 100, p: 6 }, { t: 'call', s: -1, K: 115, p: 2 }],
    'Long straddle': [{ t: 'call', s: 1, K: 100, p: 6 }, { t: 'put', s: 1, K: 100, p: 5 }],
    'Iron condor': [{ t: 'put', s: 1, K: 85, p: 1 }, { t: 'put', s: -1, K: 92, p: 2.6 }, { t: 'call', s: -1, K: 108, p: 2.6 }, { t: 'call', s: 1, K: 115, p: 1 }],
  };
  let legs = PRESETS['Covered call'].map((l) => ({ ...l }));
  const pre = el.querySelector('.presets');
  pre.innerHTML = Object.keys(PRESETS).map((k) => `<button type="button" class="chipb">${esc(k)}</button>`).join('');
  pre.addEventListener('click', (e) => { const b = e.target.closest('.chipb'); if (b) { legs = PRESETS[b.textContent].map((l) => ({ ...l })); draw(); } });
  el.querySelector('.add').addEventListener('click', () => { legs.push({ t: 'call', s: 1, K: 100, p: 5 }); draw(); });
  const legsBox = el.querySelector('.legs');
  const pay = (l, S) => l.s * ((l.t === 'call' ? Math.max(S - l.K, 0) : l.t === 'put' ? Math.max(l.K - S, 0) : S) - l.p);
  function draw() { drawLegs(); drawChart(); }
  function drawLegs() {
    legsBox.innerHTML = legs.map((l, i) => `<div class="leg" data-i="${i}"><select data-f="s"><option value="1"${l.s > 0 ? ' selected' : ''}>Long</option><option value="-1"${l.s < 0 ? ' selected' : ''}>Short</option></select><select data-f="t">${['call', 'put', 'stock'].map((t) => `<option${l.t === t ? ' selected' : ''}>${t}</option>`).join('')}</select><label>K <input type="number" data-f="K" value="${l.K}" ${l.t === 'stock' ? 'disabled' : ''}></label><label>${l.t === 'stock' ? 'Price' : 'Premium'} <input type="number" step="0.1" data-f="p" value="${l.p}"></label><button type="button" class="x" aria-label="Remove leg">✕</button></div>`).join('');
  }
  function drawChart() {
    const S = []; for (let s = 50; s <= 150.001; s += 0.5) { S.push([s, legs.reduce((a, l) => a + pay(l, s), 0)]); }
    const ys = S.map((p) => p[1]);
    const be = []; for (let k = 1; k < S.length; k++) { if (Math.sign(S[k][1]) !== Math.sign(S[k - 1][1]) && S[k - 1][1] !== 0) { be.push(S[k - 1][0] + (S[k][0] - S[k - 1][0]) * (-S[k - 1][1]) / (S[k][1] - S[k - 1][1])); } }
    kpis(el, [['Max profit (50–150)', fmtN(Math.max(...ys), 2), '#38d99c'], ['Max loss (50–150)', fmtN(Math.min(...ys), 2), '#ff6b5c'], ['Breakeven(s)', be.length ? be.map((b) => b.toFixed(1)).join(', ') : 'none'], ['Net premium', fmtN(-legs.filter((l) => l.t !== 'stock').reduce((a, l) => a + l.s * l.p, 0), 2)]]);
    el.querySelector('.lab-vis').innerHTML = chart({ series: [{ pts: S, color: '#ff7ab6', width: 3 }], areas: [{ top: S.map(([x, y]) => [x, Math.max(0, y)]), bottom: S.map(([x]) => [x, 0]), color: '#38d99c', opacity: 0.18 }, { top: S.map(([x]) => [x, 0]), bottom: S.map(([x, y]) => [x, Math.min(0, y)]), color: '#ff6b5c', opacity: 0.18 }], hlines: [{ v: 0, color: '#8fa3a8' }], x: [50, 150], y: [Math.min(-1, ...ys) * 1.1, Math.max(1, ...ys) * 1.1], xl: 'Stock price at expiry', yl: 'Profit', yf: (v) => fmtN(v, 0) });
  }
  legsBox.addEventListener('input', (e) => { const row = e.target.closest('.leg'); if (!row) { return; } const l = legs[+row.dataset.i], f = e.target.dataset.f; l[f] = f === 't' ? e.target.value : parseFloat(e.target.value) || 0; if (f === 't' || f === 's') { draw(); } else { drawChart(); } });
  legsBox.addEventListener('click', (e) => { const x = e.target.closest('.x'); if (x) { legs.splice(+x.closest('.leg').dataset.i, 1); draw(); } });
  draw();
};

export function bsm(S, K, r, s, T, q = 0) {
  const sq = s * Math.sqrt(T), d1 = (Math.log(S / K) + (r - q + s * s / 2) * T) / sq, d2 = d1 - sq;
  const eq = Math.exp(-q * T), er = Math.exp(-r * T);
  const call = S * eq * N(d1) - K * er * N(d2), put = K * er * N(-d2) - S * eq * N(-d1);
  return { d1, d2, call, put, dC: eq * N(d1), dP: eq * (N(d1) - 1), gamma: eq * phi(d1) / (S * sq), vega: S * eq * phi(d1) * Math.sqrt(T) / 100,
    thC: (-S * eq * phi(d1) * s / (2 * Math.sqrt(T)) - r * K * er * N(d2) + q * S * eq * N(d1)) / 365,
    thP: (-S * eq * phi(d1) * s / (2 * Math.sqrt(T)) + r * K * er * N(-d2) - q * S * eq * N(-d1)) / 365,
    rhoC: K * T * er * N(d2) / 100, rhoP: -K * T * er * N(-d2) / 100 };
}
LAB.bsm = (el) => {
  el.innerHTML = shell();
  form(el, [
    { k: 'S', label: 'Stock price S', min: 20, max: 200, step: 1, v: 100 },
    { k: 'K', label: 'Strike K', min: 20, max: 200, step: 1, v: 100 },
    { k: 'T', label: 'Time to expiry (years)', min: 0.02, max: 3, step: 0.01, v: 1, fmt: (v) => v.toFixed(2) },
    { k: 'sig', label: 'Volatility σ (%)', min: 5, max: 100, step: 1, v: 20, fmt: (v) => v + '%' },
    { k: 'r', label: 'Risk-free rate (%)', min: 0, max: 10, step: 0.25, v: 5, fmt: (v) => v + '%' },
    { k: 'q', label: 'Dividend yield (%)', min: 0, max: 8, step: 0.25, v: 0, fmt: (v) => v + '%' },
  ], (o) => {
    const b = bsm(o.S, o.K, o.r / 100, o.sig / 100, o.T, o.q / 100);
    kpis(el, [['Call', fmtN(b.call, 4), '#38d99c'], ['Put', fmtN(b.put, 4), '#ff7ab6'], ['d1 / d2', `${b.d1.toFixed(4)} / ${b.d2.toFixed(4)}`], ['Delta call / put', `${b.dC.toFixed(4)} / ${b.dP.toFixed(4)}`], ['Gamma', b.gamma.toFixed(5)], ['Vega (per 1 vol pt)', b.vega.toFixed(4)], ['Theta call / put (per day)', `${b.thC.toFixed(4)} / ${b.thP.toFixed(4)}`], ['Rho call / put (per 1%)', `${b.rhoC.toFixed(4)} / ${b.rhoP.toFixed(4)}`]]);
    const cv = [], pv = [], iv = [];
    for (let s = o.K * 0.5; s <= o.K * 1.5; s += o.K / 100) { const x = bsm(s, o.K, o.r / 100, o.sig / 100, o.T, o.q / 100); cv.push([s, x.call]); pv.push([s, x.put]); iv.push([s, Math.max(0, s - o.K)]); }
    el.querySelector('.lab-vis').innerHTML = chart({ series: [{ pts: iv, color: '#8fa3a8', dash: '5 4', width: 1.4 }, { pts: pv, color: '#ff7ab6' }, { pts: cv, color: '#38d99c', width: 3 }], marks: [{ x: o.S, y: b.call, color: '#38d99c' }, { x: o.S, y: b.put, color: '#ff7ab6' }], x: [o.K * 0.5, o.K * 1.5], y: [0, o.K * 0.6], xl: 'Stock price', yl: 'Option value', yf: (v) => fmtN(v, 0) });
    el.querySelector('.lab-note').innerHTML = 'Green = call value, pink = put value, dashed = call payoff at expiry. Shorten T and watch the curve collapse onto the payoff (theta).';
  });
};

LAB.montecarlo = (el) => {
  el.innerHTML = shell();
  const st = mini(el, { camPos: [18, 14, 30], look: [0, 4, 0] });
  const grp = new THREE.Group(); st.scene.add(grp);
  const axis = new THREE.GridHelper(40, 20, 0x3a5a2a, 0x1b2a14); st.scene.add(axis);
  let seed = 1;
  const rand = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  const gauss = () => { let u = 0, v = 0; while (u === 0) { u = rand(); } while (v === 0) { v = rand(); } return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  let last = null;
  const run = form(el, [
    { k: 'mu', label: 'Drift μ (% p.a.)', min: -10, max: 25, step: 0.5, v: 8, fmt: (v) => v + '%' },
    { k: 'sig', label: 'Volatility σ (% p.a.)', min: 5, max: 80, step: 1, v: 25, fmt: (v) => v + '%' },
    { k: 'T', label: 'Horizon (years)', min: 0.25, max: 5, step: 0.25, v: 1 },
    { k: 'n', label: 'Number of paths', min: 20, max: 400, step: 10, v: 160 },
  ], (o) => {
    const key = JSON.stringify(o);
    if (key === last) { return; } last = key;
    while (grp.children.length) { grp.remove(grp.children[0]); }
    seed = 12345;
    const steps = 60, dt = o.T / steps, mu = o.mu / 100, s = o.sig / 100, S0 = 100, finals = [];
    const maxS = S0 * Math.exp((mu + 3 * s) * o.T);
    for (let p = 0; p < o.n; p++) {
      let S = S0; const pts = [new THREE.Vector3(-16, 8 * S / maxS * 1.6, (p / o.n - 0.5) * 16)];
      for (let k = 1; k <= steps; k++) { S *= Math.exp((mu - s * s / 2) * dt + s * Math.sqrt(dt) * gauss()); pts.push(new THREE.Vector3(-16 + 32 * k / steps, Math.min(22, 12 * S / maxS * 1.6), (p / o.n - 0.5) * 16)); }
      finals.push(S);
      const up = S >= S0;
      grp.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: up ? 0x38d99c : 0xff6b5c, transparent: true, opacity: 0.55 })));
    }
    finals.sort((a, b) => a - b);
    const mean = finals.reduce((a, b) => a + b, 0) / finals.length, q = (f) => finals[Math.floor(f * (finals.length - 1))];
    kpis(el, [['Mean final price', fmtN(mean, 2), '#c6f36b'], ['Median', fmtN(q(0.5), 2)], ['5th – 95th percentile', `${fmtN(q(0.05), 1)} – ${fmtN(q(0.95), 1)}`], ['Probability below start', pctN(finals.filter((x) => x < S0).length / finals.length, 1)], ['Theory: E[S_T]', fmtN(S0 * Math.exp(mu * o.T), 2)], ['Theory: median', fmtN(S0 * Math.exp((mu - s * s / 2) * o.T), 2)]]);
    el.querySelector('.lab-note').innerHTML = 'Each line is one simulated future of a stock starting at 100 (green ends above, red below). Drag to rotate. The mean sits above the median: lognormal right skew.';
  });
  return () => st.dispose();
};

LAB.var = (el) => {
  el.innerHTML = shell();
  form(el, [
    { k: 'V', label: 'Portfolio value ($)', min: 10000, max: 5000000, step: 10000, v: 1000000, fmt: (v) => fmtN(v, 0) },
    { k: 'sig', label: 'Daily volatility (%)', min: 0.2, max: 5, step: 0.05, v: 1.5, fmt: (v) => v.toFixed(2) + '%' },
    { k: 'cl', label: 'Confidence', type: 'select', v: '0.99', options: [['0.9', '90%'], ['0.95', '95%'], ['0.99', '99%'], ['0.995', '99.5%']] },
    { k: 'h', label: 'Horizon (days)', min: 1, max: 20, step: 1, v: 1 },
  ], (o) => {
    const cl = +o.cl, s = o.sig / 100 * Math.sqrt(o.h);
    let lo = -10, hi = 10; for (let k = 0; k < 100; k++) { const m = (lo + hi) / 2; if (N(m) < cl) { lo = m; } else { hi = m; } }
    const z = (lo + hi) / 2, VaR = z * s * o.V, ES = s * o.V * phi(z) / (1 - cl);
    kpis(el, [['z-score', z.toFixed(3)], [`VaR (${(cl * 100).toFixed(1)}%, ${o.h}d)`, '$' + fmtN(VaR, 0), '#ff6b5c'], ['Expected shortfall', '$' + fmtN(ES, 0), '#ff6b5c'], ['VaR as % of value', pctN(VaR / o.V, 2)]]);
    const pts = []; for (let x = -4.5; x <= 4.5001; x += 0.05) { pts.push([x, phi(x)]); }
    const tail = pts.filter(([x]) => x <= -z);
    el.querySelector('.lab-vis').innerHTML = chart({ series: [{ pts, color: '#c6f36b', width: 2.6 }], areas: [{ top: tail, color: '#ff6b5c', opacity: 0.55 }], vlines: [{ v: -z, color: '#ff6b5c', label: 'VaR' }], x: [-4.5, 4.5], y: [0, 0.42], xl: 'Return in standard deviations', yl: 'Density', xf: (v) => v.toFixed(0) + 'σ', yf: (v) => v.toFixed(2) });
    el.querySelector('.lab-note').innerHTML = 'The red tail holds (1 − confidence) of outcomes. VaR marks where it starts; expected shortfall is the average loss inside it.';
  });
};

export function mountLab(id, el) { const f = LAB[id]; if (!f) { el.innerHTML = '<p>Lab not found.</p>'; return () => {}; } return f(el) || (() => {}); }
