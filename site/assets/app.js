// Điều phối trang: tải dữ liệu, vẽ lớp chữ, biến vị trí cuộn thành đường bay của camera.
import { createWorld } from './world.js';
import { createLive, parts, zoned, two, hm, SYD } from './live.js';

const $ = (id) => document.getElementById(id);
const mqMobile = window.matchMedia('(max-width: 820px)');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let mobile = mqMobile.matches;
let DATA = null, CONTENT = null, world = null;

// ---------- định dạng ----------
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (v, dp) => (v == null ? '–' : Number(v).toLocaleString('vi-VN', { minimumFractionDigits: dp, maximumFractionDigits: dp }));
const dpOf = (it) => (it.dp != null ? it.dp : it.currency === 'VND' ? 0 : 2);
const pct = (v, d = 2) => (v == null ? '–' : (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(d).replace('.', ',') + '%');
const cls = (v) => (v == null ? '' : v > 0 ? 'up' : v < 0 ? 'down' : '');
const ddmmyy = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ''); return m ? `${m[3]}/${m[2]}/${m[1]}` : ''; };
const ddmm = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ''); return m ? `${m[3]}/${m[2]}` : ''; };
const TREND = { up: 'Đang tăng', down: 'Đang giảm', mixed: 'Giằng co' };
const VERD = { bullish: 'Tích cực', neutral: 'Trung lập', bearish: 'Tiêu cực' };
const unitOf = (it) => (it.unit === '%' ? '%' : it.unit || it.currency || (it.index ? 'điểm' : ''));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = (f) => f * f * (3 - 2 * f);

// ---------- 3D ----------
try { world = createWorld($('gl'), { mobile, reduced }); } catch (e) { document.documentElement.classList.add('no-webgl'); world = null; }

// Khung hình camera theo từng chặng (vị trí, điểm nhìn); p là tiến độ cuộn trong chặng.
function camPlan() {
  const m = mobile;
  const orbit = (th, R, y) => [Math.sin(th) * R, y, -260 + Math.cos(th) * R];
  return {
    's-hero': { ground: '#061016', bloom: 0.75, keys: [
      { p: 0, pos: m ? [30, 16, 40] : [40, 14, 30], look: m ? [12, 3, -2] : [16, 3, -2] },
      { p: 0.85, pos: m ? [-30, 16, 40] : [-40, 14, 30], look: m ? [-12, 3, -2] : [-16, 3, -2] },
      { p: 1, pos: [-18, 22, 34], look: [-4, 2, -8] }] },
    's-globe': { ground: '#070a1f', bloom: 0.9, keys: m
      ? [{ p: 0, pos: [0, -2, -42], look: [0, -7, -90] }, { p: 1, pos: [0, -1, -44], look: [0, -7, -90] }]
      : [{ p: 0, pos: [-9, 3, -48], look: [-10, 2.5, -90] }, { p: 1, pos: [-8, 6, -51], look: [-10, 2.5, -90] }] },
    's-macro': { ground: '#150a07', bloom: 0.8, keys: [
      { p: 0, pos: [-18, m ? 0.5 : 1.6, m ? -155 : -159], look: [-18, m ? -2.4 : -0.9, -175] },
      { p: 1, pos: [18, m ? 0.5 : 1.6, m ? -155 : -159], look: [18, m ? -2.4 : -0.9, -175] }] },
    's-brief': { ground: '#08121a', bloom: 0.7, keys: [{ p: 0.5, pos: [0, 12, -205], look: [0, 4, -236] }] },
    's-city': { ground: '#0a1013', bloom: 0.9, keys: [-0.5, 0.3, 1.1, 1.9, 2.6].map((th, i) => ({ p: i / 4, pos: orbit(th, m ? 38 : 30, m ? 22 : 15), look: [0, m ? -3 : 1, -260] })) },
    's-report': { ground: '#ece5d6', bloom: 0.12, keys: [{ p: 0.5, pos: [0, 30, -290], look: [0, 0, -322] }] },
    's-fund': { ground: '#d9e1d2', bloom: 0.18, keys: m
      ? [{ p: 0, pos: [0, 2, -310], look: [0, -6, -345] }, { p: 1, pos: [0, 5, -312], look: [0, -6, -345] }]
      : [{ p: 0, pos: [-5, 3, -318], look: [-7, 1.5, -345] }, { p: 1, pos: [-4, 8, -320], look: [-7, 1.5, -345] }] },
    's-term': { ground: '#0a0d0c', bloom: 0.5, keys: [{ p: 0.5, pos: [0, 24, -300], look: [0, 2, -345] }] },
  };
}

let TL = [], SEC = [];
function buildTimeline() {
  const plan = camPlan(), vh = window.innerHeight;
  TL = []; SEC = [];
  document.querySelectorAll('main > section').forEach((el) => {
    const top = el.offsetTop, h = el.offsetHeight, sticky = el.classList.contains('scene');
    const span = sticky ? Math.max(1, h - vh) : Math.max(1, h - vh * 0.2);
    SEC.push({ id: el.id, el, top, h, span, sticky });
    const pl = plan[el.id];
    if (!pl) { return; }
    pl.keys.forEach((k) => {
      const y = sticky ? top + k.p * span : top - vh * 0.4 + k.p * (h - vh * 0.2);
      TL.push({ y, pos: k.pos, look: k.look, ground: pl.ground, bloom: pl.bloom });
    });
  });
  TL.sort((a, b) => a.y - b.y);
}
const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function sample(y) {
  if (!TL.length) { return null; }
  if (y <= TL[0].y) { return { ...TL[0], f: 0 }; }
  for (let i = 0; i < TL.length - 1; i++) {
    const a = TL[i], b = TL[i + 1];
    if (y < b.y) {
      const e = smooth(clamp((y - a.y) / ((b.y - a.y) || 1), 0, 1));
      const L = (u, v) => u.map((x, j) => x + (v[j] - x) * e);
      const ca = hexRgb(a.ground), cb = hexRgb(b.ground);
      const g = L(ca, cb).map((x) => Math.round(x).toString(16).padStart(2, '0')).join('');
      return { pos: L(a.pos, b.pos), look: L(a.look, b.look), ground: '#' + g, bloom: a.bloom + (b.bloom - a.bloom) * e };
    }
  }
  return { ...TL[TL.length - 1] };
}
const progressOf = (id) => { const s = SEC.find((x) => x.id === id); return s ? clamp((window.scrollY - s.top) / s.span, 0, 1) : 0; };

// ---------- giờ sàn ----------
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

// ---------- lớp chữ ----------
const HERO_KEYS = [['VNINDEX', 'VN-Index'], ['AXJO', 'S&P/ASX 200'], ['GSPC', 'S&P 500']];
let heroIdx = -1;
function renderReadout(force) {
  if (!DATA) { return; }
  const n = world ? world.heroN : 60;
  const p = progressOf('s-hero');
  const back = Math.round(clamp(p / 0.85, 0, 1) * (n - 1));
  const idx = n - 1 - back;
  if (world) { world.setHero(idx); }
  if (idx === heroIdx && !force) { return; }
  heroIdx = idx;
  const today = idx === n - 1;
  const ref = DATA.items.VNINDEX || DATA.items.GSPC;
  const dates = ref && ref.histD ? ref.histD.slice(-n) : [];
  const date = dates[idx - (n - dates.length)];
  $('ro-k').textContent = today ? 'Hôm nay' : `Tua lại ${back} phiên`;
  $('ro-when').textContent = today ? 'Phiên mới nhất' : date ? `Phiên ${ddmmyy(date)}` : '…';
  $('ro-rows').innerHTML = HERO_KEYS.map(([k, name]) => {
    const it = DATA.items[k];
    if (!it) { return ''; }
    const h = (it.hist || []).slice(-n), j = idx - (n - h.length);
    const v = today ? it.last : h[j];
    const c = today ? it.changePct : (v ? (it.last / v - 1) * 100 : null);
    const d = today ? `${it.status === 'final' ? 'Đóng cửa ' + ddmm(it.day) : it.status === 'provisional' ? 'Tạm tính' : ''}` : 'đến nay';
    return `<div class="row"><span class="n">${esc(name)}</span><span class="v num">${fmt(v, 2)}</span><span class="n">${esc(d)}</span><span class="c num ${cls(c)}">${pct(c)}</span></div>`;
  }).join('');
}

function renderGlobe() {
  const box = $('mk-panels');
  box.innerHTML = [['VN', 'Việt Nam', 'TP.HCM · HOSE', 'VNINDEX', ['VN30', 'HNXINDEX']], ['AU', 'Úc', 'Sydney · ASX', 'AXJO', []], ['US', 'Mỹ', 'New York · NYSE, Nasdaq', 'GSPC', ['DJI', 'IXIC']]].map(([m, name, place, key, others], i) => {
    const c = marketClock(m), it = DATA.items[key] || {}, pa = it.pa || {};
    return `<div class="mkp panel${i === 0 ? ' on' : ''}" data-m="${m}">
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
function updateGlobe() {
  const p = progressOf('s-globe');
  if (world) { world.setGlobe(p); }
  const step = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;
  if (step === globeStep) { return; }
  globeStep = step;
  document.querySelectorAll('.mkp').forEach((el, i) => el.classList.toggle('on', i === step));
  document.querySelectorAll('.steps3 i').forEach((el, i) => el.classList.toggle('on', i <= step));
}

const MACRO = [['TNX', 'Lợi suất Mỹ 10 năm', 'Chi phí vốn của cả thế giới. Lợi suất tăng làm cổ phiếu tăng trưởng bị định giá lại.'],
  ['BRENT', 'Dầu Brent', 'Giá dầu chuẩn quốc tế, đi thẳng vào lạm phát của cả ba nước.'],
  ['WTI', 'Dầu WTI', 'Giá dầu Mỹ; chênh lệch với Brent cho biết cung cầu trong nước Mỹ.'],
  ['GOLD', 'Vàng', 'Tài sản không trả lãi, thường yếu đi khi lãi suất thực tăng.'],
  ['AUDUSD', 'AUD/USD', 'Đồng tiền hàng hóa, nhạy với lãi suất RBA và kinh tế Trung Quốc.'],
  ['USDVND', 'USD/VND', 'Tỷ giá thị trường quốc tế; USD mạnh gây áp lực lên VND.']];
function spark(vals, up) {
  const v = (vals || []).filter((x) => x != null);
  if (v.length < 2) { return ''; }
  const lo = Math.min(...v), hi = Math.max(...v), w = 300, h = 54;
  const X = (i) => (i / (v.length - 1)) * w, Y = (x) => 3 + (hi - x) / ((hi - lo) || 1) * (h - 6);
  const d = v.map((x, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ',' + Y(x).toFixed(1)).join('');
  const col = up ? 'var(--up)' : 'var(--down)';
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path class="a" d="${d}L${w},${h}L0,${h}Z" fill="${col}"/><path class="l" d="${d}" stroke="${col}"/></svg>`;
}
function renderMacro() {
  $('rail').innerHTML = MACRO.map(([k, name, why]) => {
    const it = DATA.items[k];
    if (!it) { return ''; }
    const pa = it.pa || {}, h = it.hist || [];
    const v = it.unit === '%' ? fmt(it.last, 2) + '%' : fmt(it.last, dpOf(it));
    return `<article class="mc panel" data-k="${k}"><div class="k">${esc(name)}</div>
      <div class="v num">${v}${it.unit && it.unit !== '%' ? `<small>${esc(it.unit)}</small>` : ''}</div>
      <div class="chg"><span>Hôm nay <b class="num ${cls(it.changePct)}">${pct(it.changePct)}</b></span><span>1 tuần <b class="num ${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</b></span><span>Từ đầu năm <b class="num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</b></span></div>
      ${spark(h, h.length > 1 ? h[h.length - 1] >= h[0] : true)}<p>${esc(why)} <span class="num">${h.length} phiên gần nhất.</span></p></article>`;
  }).join('');
}
let macroAct = -1;
function updateMacro() {
  const p = progressOf('s-macro');
  if (world) { world.setMacro(p); }
  const rail = $('rail');
  const max = Math.max(0, rail.scrollWidth - window.innerWidth);
  rail.style.transform = `translate3d(${(-p * max).toFixed(1)}px,0,0)`;
  const act = Math.round(p * (MACRO.length - 1));
  if (act !== macroAct) { macroAct = act; rail.querySelectorAll('.mc').forEach((el, i) => el.classList.toggle('act', i === act)); }
}

function renderBrief() {
  const b = (CONTENT && CONTENT.brief) || {};
  $('brief-when').textContent = b.updated ? `Bản tin hôm nay · cập nhật ${b.updated}` : 'Bản tin hôm nay';
  $('brief-lead').textContent = b.headline || 'Chưa có bản tin.';
  $('brief-paras').innerHTML = (b.paragraphs || []).slice(0, 2).map((p) => `<p>${esc(p)}</p>`).join('');
  $('brief-chain').innerHTML = (b.chain || []).map((c) => `<li>${esc(c)}</li>`).join('');
  const fc = b.forecasts || [], ok = fc.filter((x) => x.result === 'ok').length, miss = fc.filter((x) => x.result === 'miss').length, wait = fc.length - ok - miss;
  $('fc-score').innerHTML = ok + miss ? `<b class="num">${ok}/${ok + miss}</b><span class="muted">dự báo đã chấm là đúng · ${wait} đang chờ</span>` : `<span class="muted">${wait} dự báo đang chờ đến hạn</span>`;
  $('fc-list').innerHTML = fc.slice(-5).reverse().map((x) => `<li><span>${esc(x.text)}<div class="m">Lập ${esc(x.made)} · hạn ${esc(x.due)} · xác suất ${esc(x.prob)}</div></span><span class="pill ${x.result}">${x.result === 'ok' ? 'Đúng' : x.result === 'miss' ? 'Sai' : 'Chờ'}</span></li>`).join('');
  $('brief-lesson').textContent = b.lesson || '';
}

function renderCity() {
  const keys = (DATA.groups.watchlist || []).filter((k) => DATA.items[k] && !DATA.items[k].index);
  const sorted = keys.slice().sort((a, b) => (DATA.items[b].chgYtd || 0) - (DATA.items[a].chgYtd || 0));
  const row = (k) => { const it = DATA.items[k]; return `<div><span>${esc(it.label)}</span><span class="num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</span></div>`; };
  $('movers').innerHTML = `<div class="muted" style="font-size:12px">Tăng nhiều nhất</div><div class="muted" style="font-size:12px">Giảm nhiều nhất</div>` +
    [0, 1, 2].map((i) => (sorted[i] ? row(sorted[i]) : '<div></div>') + (sorted[sorted.length - 1 - i] ? row(sorted[sorted.length - 1 - i]) : '<div></div>')).join('');
  $('tags-city').innerHTML = keys.map((k) => `<span class="tag3d" data-a="tower-${esc(k)}">${esc(DATA.items[k].label)}</span>`).join('');
}
function tipHtml(k) {
  const it = DATA.items[k], pa = it.pa || {}, c = (CONTENT && CONTENT.watch || []).find((w) => w.id === k);
  const fund = (it.tags || []).includes('fund') ? `<div class="gold-tag">Trong quỹ Buffett mô phỏng · ${Math.round((it.weight || 0) * 100)}%</div>` : (it.tags || []).includes('waiting') ? '<div class="gold-tag">Chờ vào quỹ ở kỳ cân lại</div>' : '';
  return `<div class="t">${esc(it.label)} <span class="muted" style="font-size:12px;font-family:var(--f-body)">${esc(it.name || '')}</span></div>${fund}
    <dl><dt>Giá</dt><dd class="num">${fmt(it.last, dpOf(it))} ${esc(it.currency || '')}</dd><dt>Hôm nay</dt><dd class="num ${cls(it.changePct)}">${pct(it.changePct)}</dd>
    <dt>Từ đầu năm</dt><dd class="num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</dd><dt>1 tuần</dt><dd class="num ${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</dd>
    <dt>RSI 14</dt><dd class="num">${pa.rsi14 != null ? fmt(pa.rsi14, 0) : '–'}</dd><dt>Xu hướng</dt><dd>${TREND[pa.trend] || '–'}</dd>
    ${it.verdict ? `<dt>Mô phỏng Buffett</dt><dd>${VERD[it.verdict] || it.verdict}${it.confidence ? ' · ' + it.confidence : ''}</dd>` : ''}</dl>
    ${c && c.growth ? `<p class="muted" style="font-size:12.5px;margin:8px 0 0">${esc(c.growth)}</p>` : ''}`;
}

function renderReport() {
  const r = (CONTENT && CONTENT.report) || {};
  $('rp-issue').textContent = r.issue || 'Báo cáo tuần';
  $('rp-title').textContent = r.title || 'Chưa có báo cáo tuần.';
  $('rp-keys').innerHTML = (r.keys || []).map((k) => `<li><b>${esc(k.lead)}</b><p>${esc(k.text)}</p></li>`).join('');
  $('rp-scen').innerHTML = (r.scenarios || []).map((s) => {
    const w = clamp(parseFloat(String(s.prob).replace(',', '.')) / 100 || 0, 0, 1);
    return `<div class="row"><div class="top"><span>${esc(s.name)}</span><span class="num">${esc(s.prob)}</span></div><div class="bar"><i style="--w:${w}"></i></div><p>Nếu: ${esc(s.when)}</p></div>`;
  }).join('');
  $('rp-cal').innerHTML = (r.calendar || []).slice(0, 6).map((c) => `<li><span class="num">${esc(c.when)}</span><div><b>${esc(c.what)}</b><div style="color:var(--paper-dim);font-size:13px">${esc(c.ref)}</div></div></li>`).join('');
  $('rp-journal').innerHTML = (r.journal || []).slice(0, 8).map((x) => `<li><span>${esc(x.text)}<div class="m" style="color:var(--paper-dim)">Tự tin ${esc(x.prob)} · hạn ${esc(x.due)}</div></span><span class="pill ${x.result}">${x.result === 'ok' ? 'Đúng' : x.result === 'miss' ? 'Sai' : 'Chờ'}</span></li>`).join('');
}

function renderFund() {
  const f = DATA.sync && DATA.sync.funds && DATA.sync.funds.VN;
  if (!f) { $('fund-nav').textContent = '–'; $('fund-alloc').innerHTML = '<li><i></i><span>Quỹ chưa khởi tạo.</span><span></span></li>'; return; }
  $('fund-nav').textContent = fmt(f.nav, 2);
  $('fund-alloc').innerHTML = (f.holdings || []).map((h) => {
    const it = DATA.items[h.id] || {};
    return `<li><i style="background:var(--gold)"></i><span><b>${esc(it.label || h.id)}</b> <span class="num ${cls(it.changePct)}" style="font-size:12.5px">${pct(it.changePct)} hôm nay</span></span><span class="num">${fmt(h.weight * 100, 1)}%</span></li>`;
  }).join('') + `<li><i style="background:#3aa7a8"></i><span>Tiền mặt</span><span class="num">${fmt((f.cashWeight || 0) * 100, 1)}%</span></li>` +
    ((f.waiting || []).length ? `<li><i style="background:transparent;box-shadow:inset 0 0 0 1.5px var(--sage-dim)"></i><span>Chờ kỳ cân lại: ${esc((f.waiting || []).map((id) => id.split('-')[1]).join(', '))}</span><span></span></li>` : '');
  $('fund-note').textContent = `Quỹ ảo theo quy tắc cố định: chỉ mua mã được chấm Tích cực, tối đa 25% mỗi mã, còn lại giữ tiền mặt. Số liệu tính đến ${ddmmyy(f.asOf)}. Không phải lời khuyên đầu tư.`;
}

function renderTerm() {
  const g = DATA.groups, groups = [['Chỉ số', g.indices], ['Vĩ mô, hàng hóa, tỷ giá', g.macro], ['Cổ phiếu theo dõi', g.watchlist]];
  $('term-body').innerHTML = groups.map(([name, ks]) => `<tr class="g"><td colspan="6">${name}</td></tr>` + (ks || []).map((k) => {
    const it = DATA.items[k];
    if (!it) { return ''; }
    const pa = it.pa || {};
    const badge = it.live ? `<span class="badge live">Trực tiếp ${it.lastTime ? hm(new Date(it.lastTime), SYD) : ''}</span>` : it.status === 'final' ? `<span class="badge">Đóng cửa ${ddmm(it.day)}</span>` : it.status === 'provisional' ? '<span class="badge">Tạm tính</span>' : `<span class="badge">24 giờ · ${ddmm(it.day)}</span>`;
    const v = it.unit === '%' ? fmt(it.last, 2) + '%' : fmt(it.last, dpOf(it));
    return `<tr><td>${esc(it.label)}</td><td class="r num">${v}</td><td class="r num ${cls(it.changePct)}">${pct(it.changePct)}</td><td class="r num ${cls(pa.chg1w)}">${pct(pa.chg1w, 1)}</td><td class="r num ${cls(it.chgYtd)}">${pct(it.chgYtd, 1)}</td><td>${badge}</td></tr>`;
  }).join('')).join('');
  $('term-note').textContent = `Số của máy chủ chốt lúc ${DATA.generatedAtSydney} giờ Sydney; khi trang đang mở, giá Việt Nam, Úc, Mỹ được lấy trực tiếp và đối chiếu mỗi phút.`;
}

function renderFresh() {
  if (!DATA) { return; }
  const st = live.state, at = [st.vnAt, st.worldAt].filter(Boolean).sort((a, b) => b - a)[0];
  const age = Math.round((Date.now() - new Date(DATA.generatedAt).getTime()) / 60000);
  $('fresh-t').innerHTML = at ? `Trực tiếp ${hm(at, SYD)}<span class="lbl-long"> · máy chủ ${age < 1 ? 'vừa xong' : age < 60 ? age + ' phút trước' : Math.round(age / 60) + ' giờ trước'}</span>` : `Cập nhật ${age < 1 ? 'vừa xong' : age < 60 ? age + ' phút trước' : Math.round(age / 60) + ' giờ trước'}`;
}

function renderAll() {
  if (!DATA) { return; }
  renderReadout(true); renderGlobe(); globeStep = -1; updateGlobe(); renderMacro(); macroAct = -1; updateMacro();
  renderCity(); renderFund(); renderTerm(); renderFresh();
  $('tags-hero').innerHTML = HERO_KEYS.map(([k, n]) => `<span class="tag3d" data-a="hero-${k}">${esc(n)}</span>`).join('');
  if (world) { world.setData(DATA); }
  requestAnimationFrame(buildTimeline);
}

// ---------- dữ liệu ----------
const live = createLive(() => { renderAll(); });
let first = true;
function load() {
  fetch('data/latest.json?t=' + Date.now(), { cache: 'no-store' }).then((r) => r.json()).then((d) => {
    const changed = !DATA || d.generatedAt !== DATA.generatedAt;
    if (changed) { DATA = d; live.applyAll(DATA); renderAll(); } else { renderFresh(); }
    if (first) { first = false; live.refreshVN(DATA, true); live.refreshWorld(DATA); }
  }).catch(() => { $('fresh-t').textContent = 'Chưa tải được số liệu'; });
}
function loadContent() {
  fetch('data/content.json?t=' + Date.now(), { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((c) => {
    if (c) { CONTENT = c; renderBrief(); renderReport(); if (DATA) { renderCity(); } requestAnimationFrame(buildTimeline); }
  }).catch(() => {});
}
load(); loadContent();
setInterval(() => { if (!document.hidden) { load(); live.refreshVN(DATA, false); live.refreshWorld(DATA); } }, 60000);
setInterval(() => { if (!document.hidden) { loadContent(); } }, 600000);

// ---------- hiện dần khi cuộn tới ----------
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 });
document.querySelectorAll('.lines:not(.in), .rise, .scen').forEach((el) => io.observe(el));

// ---------- con trỏ ----------
let px = 0, py = 0, pointerOn = false;
window.addEventListener('pointermove', (e) => {
  px = (e.clientX / window.innerWidth) * 2 - 1; py = (e.clientY / window.innerHeight) * 2 - 1; pointerOn = true;
  if (world && e.pointerType === 'mouse') { world.pointer(px, py); }
  if (active === 's-city') { pickTower(e.clientX, e.clientY); }
}, { passive: true });
window.addEventListener('pointerdown', (e) => { if (active === 's-city') { pickTower(e.clientX, e.clientY); } }, { passive: true });
function pickTower(x, y) {
  if (!world || !DATA) { return; }
  const k = world.pick((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
  const tip = $('tip');
  if (!k) { tip.classList.remove('on'); return; }
  tip.innerHTML = tipHtml(k);
  const w = 250, left = clamp(x, w / 2 + 12, window.innerWidth - w / 2 - 12), top = Math.max(y, 260);
  tip.style.left = left + 'px'; tip.style.top = top + 'px';
  tip.classList.add('on');
}

// ---------- vòng lặp ----------
let active = 's-hero';
const dots = [...document.querySelectorAll('.dots a')];
function tick() {
  const y = window.scrollY, vh = window.innerHeight;
  const s = sample(y + vh * 0.0);
  if (s) {
    if (world) { world.setCamera(s.pos, s.look); world.setGround(s.ground, s.bloom); }
    else { document.body.style.background = s.ground; }
    const [r, g, b] = hexRgb(s.ground);
    document.body.classList.toggle('on-light', (r * 0.299 + g * 0.587 + b * 0.114) > 150);
  }
  const mid = y + vh * 0.5;
  const cur = SEC.find((x) => mid >= x.top && mid < x.top + x.h);
  if (cur && cur.id !== active) {
    active = cur.id;
    dots.forEach((d) => d.classList.toggle('on', d.getAttribute('href') === '#' + active));
    if (active !== 's-city') { $('tip').classList.remove('on'); }
  }
  $('progress').style.transform = `scaleX(${clamp(y / Math.max(1, document.documentElement.scrollHeight - vh), 0, 1)})`;
  if (DATA) {
    renderReadout(false); updateGlobe(); updateMacro();
    if (world) {
      world.setCity(progressOf('s-city')); world.setFund(progressOf('s-fund'));
      placeTags('tags-hero', active === 's-hero' && progressOf('s-hero') < 0.95);
      placeTags('tags-city', active === 's-city');
      const fa = world.anchors.fund;
      if (fa && active === 's-fund') { const q = world.project(fa); $('s-fund').querySelector('.fund-center').style.cssText = `left:${q.x}px;top:${q.y}px`; }
    }
  }
  if (world) { world.frame(); }
  requestAnimationFrame(tick);
}
function placeTags(boxId, show) {
  const box = $(boxId);
  box.style.display = show ? '' : 'none';
  if (!show) { return; }
  box.querySelectorAll('.tag3d').forEach((el) => {
    const a = world.anchors[el.dataset.a];
    if (!a) { el.style.opacity = 0; return; }
    const q = world.project(a);
    el.style.opacity = q.on ? 1 : 0;
    el.style.transform = `translate(${q.x.toFixed(1)}px, ${q.y.toFixed(1)}px) translate(-50%, -50%)`;
  });
}
window.addEventListener('resize', () => {
  mobile = mqMobile.matches;
  if (world) { world.resize(); }
  buildTimeline();
});
buildTimeline();
if (world) { const s = sample(window.scrollY); if (s) { world.setCamera(s.pos, s.look); world.jumpCamera(); } }
requestAnimationFrame(tick);
