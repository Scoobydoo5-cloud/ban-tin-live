// Giá trực tiếp trong trình duyệt: Việt Nam gọi thẳng KBS, Úc/Mỹ/tỷ giá/hàng hóa gọi CNBC (cả hai cho phép CORS).
// Cùng quy tắc với bảng giá chi tiết (bang-gia/): số nào không qua kiểm tra thì giữ số của máy chủ.

export const SYD = 'Australia/Sydney';
const VNTZ = 'Asia/Ho_Chi_Minh';
const KBS = 'https://kbbuddywts.kbsec.com.vn/iis-server/investment';
const VN_LIMIT = { HOSE: 0.07, HNX: 0.10, UPCOM: 0.15 };
const CNBC = 'https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&symbols=';
const CNBC_MAP = { GSPC: '.SPX', DJI: '.DJI', IXIC: '.IXIC', AXJO: '.AXJO', AUDUSD: 'AUD=', USDVND: 'VND=', TNX: 'US10Y', GOLD: '@GC.1', BRENT: '@LCO.1', WTI: '@CL.1' };
const MKT_FINAL = { AU: ['Australia/Sydney', 16 * 60 + 30], US: ['America/New_York', 16 * 60 + 15] };

export function parts(date, tz) {
  const o = {};
  new Intl.DateTimeFormat('en-GB', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short' })
    .formatToParts(date).forEach((p) => { o[p.type] = p.value; });
  return { y: +o.year, mo: +o.month, d: +o.day, h: +o.hour, mi: +o.minute, wd: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(o.weekday) };
}
export function zoned(y, mo, d, minutes, tz) {
  let guess = Date.UTC(y, mo - 1, d, Math.floor(minutes / 60), minutes % 60);
  for (let i = 0; i < 2; i++) {
    const p = parts(new Date(guess), tz);
    guess += Date.UTC(y, mo - 1, d, Math.floor(minutes / 60), minutes % 60) - Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi);
  }
  return new Date(guess);
}
export const two = (n) => (n < 10 ? '0' : '') + n;
export function hm(date, tz) { const p = parts(date, tz); return two(p.h) + ':' + two(p.mi); }
function isoTz(date, tz) { const p = parts(date, tz); return p.y + '-' + two(p.mo) + '-' + two(p.d); }
const numv = (v) => { const f = parseFloat(v); return isFinite(f) && f > 0 ? f : null; };
const cnum = (v) => { const f = parseFloat(String(v == null ? '' : v).replace(/[,%+]/g, '')); return isFinite(f) ? f : null; };

// ---------- Việt Nam: KBS ----------
function vnDay(offsetDays) { const p = parts(new Date(Date.now() + offsetDays * 864e5), VNTZ); return two(p.d) + '-' + two(p.mo) + '-' + p.y; }
function kbs(kind, sym, suffix, fromDays) {
  const url = KBS + '/' + kind + '/' + encodeURIComponent(sym) + '/data_' + suffix + '?sdate=' + vnDay(-fromDays) + '&edate=' + vnDay(1);
  return fetch(url, { cache: 'no-store' }).then((r) => { if (!r.ok) { throw new Error('HTTP ' + r.status); } return r.json(); })
    .then((j) => (j && j['data_' + suffix]) || []);
}
function parseDays(rows) {
  const by = {};
  rows.forEach((r) => { const c = numv(r.c); if (c) { const d = String(r.t).slice(0, 10); by[d] = { d, c, h: numv(r.h) || c, l: numv(r.l) || c }; } });
  return Object.keys(by).sort().map((k) => by[k]);
}
function parseBars(rows) {
  return rows.map((r) => {
    const c = numv(r.c), m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/.exec(String(r.t));
    return c && m ? { t: zoned(+m[1], +m[2], +m[3], +m[4] * 60 + +m[5], VNTZ), c, h: numv(r.h) || c, l: numv(r.l) || c } : null;
  }).filter(Boolean).sort((a, b) => a.t - b.t);
}
function vnFinal(day) { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(day); return Date.now() >= zoned(+m[1], +m[2], +m[3], 15 * 60 + 5, VNTZ).getTime(); }
function vnCalc(it, days, bars) {
  const lastD = days[days.length - 1], lastB = bars[bars.length - 1];
  if (!lastD && !lastB) { throw new Error('KBS không trả dữ liệu'); }
  const bDay = lastB ? isoTz(lastB.t, VNTZ) : null, useB = lastB && (!lastD || bDay >= lastD.d);
  const day = useB ? bDay : lastD.d, today = days.find((d) => d.d === day), fin = vnFinal(day);
  let last, lastTime = null;
  if (fin && today) { last = today.c; }
  else if (useB) { last = lastB.c; lastTime = new Date(Math.min(lastB.t.getTime() + 15 * 60000, Date.now())).toISOString(); }
  else { last = lastD.c; }
  const before = days.filter((d) => d.d < day), prev = before[before.length - 1];
  const chg = prev ? (last / prev.c - 1) * 100 : null;
  if (!it.index && last < 1000) { throw new Error('giá dưới 1.000 đ, nghi sai đơn vị'); }
  const lim = it.index ? 0.07 : (VN_LIMIT[String(it.exchange || 'HOSE').toUpperCase()] || 0.07);
  if (chg != null && Math.abs(chg) / 100 > lim + 0.0015) { throw new Error('vượt biên độ'); }
  return { last, lastTime, day, status: fin ? 'final' : 'provisional', prevClose: prev ? prev.c : null, prevDate: prev ? prev.d : null,
    change: prev ? last - prev.c : null, changePct: chg };
}
export function vnWindow() { const p = parts(new Date(), VNTZ), t = p.h * 60 + p.mi; return p.wd < 5 && t >= 8 * 60 + 50 && t <= 15 * 60 + 40; }

// ---------- Úc, Mỹ, vĩ mô: CNBC ----------
function cnbcSym(it) {
  if (CNBC_MAP[it.key]) { return CNBC_MAP[it.key]; }
  if (it.market === 'AU' && /\.AX$/.test(it.symbol || '')) { return it.symbol.replace(/\.AX$/, '') + '-AU'; }
  if (it.market === 'US' && !it.index) { return it.symbol; }
  return null;
}
function cnbcCalc(it, q) {
  let last = cnum(q.last), chgPct = cnum(q.change_pct), change = cnum(q.change);
  const opened = !!cnum(q.open);
  if (!last || last <= 0) { throw new Error('không có giá'); }
  if (change == null && String(q.change || '').toUpperCase() === 'UNCH') {
    if (!opened) { return null; }  // chưa vào phiên mới: giữ số máy chủ
    change = 0; chgPct = 0;
  }
  const t = String(q.last_time || ''), when = /T/.test(t) ? new Date(t.replace(/([+-]\d{2})(\d{2})$/, '$1:$2')) : null, fz = MKT_FINAL[it.market];
  if (when && isNaN(when.getTime())) { throw new Error('không đọc được giờ'); }
  const day = when ? isoTz(when, fz ? fz[0] : 'UTC') : t.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) { throw new Error('không rõ ngày'); }
  if (it.day && day < it.day) { throw new Error('cũ hơn số máy chủ'); }
  let status = '24h';
  if (fz) { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(day); status = Date.now() >= zoned(+m[1], +m[2], +m[3], fz[1], fz[0]).getTime() ? 'final' : 'provisional'; }
  const prevClose = change != null ? last - change : (chgPct != null ? last / (1 + chgPct / 100) : null);
  if (chgPct != null && Math.abs(chgPct) > (fz ? 25 : 10)) { throw new Error('thay đổi bất thường'); }
  let ref = null, cmp = null;
  const tol = fz ? 0.005 : 0.01;
  if (it.day === day && it.prevClose && prevClose) { ref = it.prevClose; cmp = prevClose; }
  else if (day > (it.day || '') && prevClose) { ref = it.last; cmp = prevClose; }
  if (ref && cmp && Math.abs(cmp / ref - 1) > tol) { throw new Error('lệch số máy chủ'); }
  return { last, day, status, changePct: chgPct, change, prevClose, lastTime: when ? when.toISOString() : null };
}

// ---------- Ghép vào dữ liệu máy chủ ----------
export function createLive(onChange) {
  const VN = {}, WORLD = {}, DAYS = {};
  const st = { vnAt: null, worldAt: null, busyVN: false, busyW: false, errors: [] };
  function apply(DATA, layer, src) {
    Object.keys(layer).forEach((k) => {
      const it = DATA.items[k], L = layer[k];
      if (!it || !L || (it.day && it.day > L.day)) { return; }
      const hist = (it.hist || []).slice(), histD = (it.histD || []).slice();
      if (hist.length) {
        if (it.day === L.day) { hist[hist.length - 1] = L.last; }
        else { hist.push(L.last); histD.push(L.day); }
      }
      Object.assign(it, L, { hist: hist.slice(-60), histD: histD.slice(-60), live: src });
    });
  }
  return {
    state: st,
    applyAll(DATA) { if (DATA) { apply(DATA, VN, 'KBS'); apply(DATA, WORLD, 'CNBC'); } },
    refreshVN(DATA, force) {
      if (!DATA || st.busyVN || (!force && !vnWindow())) { return; }
      const keys = Object.keys(DATA.items).filter((k) => DATA.items[k].market === 'VN');
      st.busyVN = true;
      Promise.all(keys.map((k) => {
        const it = DATA.items[k], kind = it.index ? 'index' : 'stocks';
        const dP = DAYS[k] && !force ? Promise.resolve(DAYS[k]) : kbs(kind, it.symbol, 'day', 12).then(parseDays);
        return Promise.all([dP, kbs(kind, it.symbol, '15P', 4).then(parseBars)])
          .then((r) => { DAYS[k] = r[0]; VN[k] = vnCalc(it, r[0], r[1]); })
          .catch(() => { delete VN[k]; });
      })).then(() => { st.vnAt = new Date(); apply(DATA, VN, 'KBS'); onChange(); })
        .finally(() => { st.busyVN = false; });
    },
    refreshWorld(DATA) {
      if (!DATA || st.busyW) { return; }
      const keys = Object.keys(DATA.items).filter((k) => DATA.items[k].market !== 'VN' && cnbcSym(DATA.items[k]));
      if (!keys.length) { return; }
      const syms = {};
      keys.forEach((k) => { syms[cnbcSym(DATA.items[k])] = k; });
      st.busyW = true;
      fetch(CNBC + encodeURIComponent(Object.keys(syms).join('|')), { cache: 'no-store' })
        .then((r) => { if (!r.ok) { throw new Error('HTTP ' + r.status); } return r.json(); })
        .then((d) => {
          const qs = (((d || {}).FormattedQuoteResult || {}).FormattedQuote) || [];
          qs.forEach((q) => {
            const k = syms[q.symbol];
            if (!k) { return; }
            try { const L = cnbcCalc(DATA.items[k], q); if (L) { WORLD[k] = L; } else { delete WORLD[k]; } } catch (e) { delete WORLD[k]; }
          });
          st.worldAt = new Date(); apply(DATA, WORLD, 'CNBC'); onChange();
        })
        .catch(() => {})
        .finally(() => { st.busyW = false; });
    },
  };
}
