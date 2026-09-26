// Định dạng số, ngày, văn bản dùng chung.
export const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fmt = (v, dp = 2) => (v == null || !isFinite(v) ? '–' : Number(v).toLocaleString('vi-VN', { minimumFractionDigits: dp, maximumFractionDigits: dp }));
export const dpOf = (it) => (it.dp != null ? it.dp : it.currency === 'VND' ? 0 : 2);
export const pct = (v, d = 2) => (v == null || !isFinite(v) ? '–' : (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(d).replace('.', ',') + '%');
export const cls = (v) => (v == null ? '' : v > 0 ? 'up' : v < 0 ? 'down' : '');
export const ddmmyy = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ''); return m ? `${m[3]}/${m[2]}/${m[1]}` : ''; };
export const ddmm = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || ''); return m ? `${m[3]}/${m[2]}` : ''; };
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const smooth = (f) => f * f * (3 - 2 * f);
export const lerp = (a, b, t) => a + (b - a) * t;
export const TREND = { up: 'Đang tăng', down: 'Đang giảm', mixed: 'Giằng co' };
export const VERD = { bullish: 'Tích cực', neutral: 'Trung lập', bearish: 'Tiêu cực' };
export const MKT = { VN: 'Việt Nam', AU: 'Úc', US: 'Mỹ' };
export const valueText = (it) => (it.unit === '%' ? fmt(it.last, 2) + '%' : fmt(it.last, dpOf(it)));
export const probOf = (s) => { const v = parseFloat(String(s == null ? '' : s).replace(',', '.').replace(/[^\d.]/g, '')); return isFinite(v) ? clamp(v / 100, 0, 1) : null; };

// Đường nhỏ (sparkline) bằng SVG
export function spark(vals, { w = 300, h = 54, up = null, cls: c = '' } = {}) {
  const v = (vals || []).filter((x) => x != null && isFinite(x));
  if (v.length < 2) { return ''; }
  const lo = Math.min(...v), hi = Math.max(...v);
  const X = (i) => (i / (v.length - 1)) * w, Y = (x) => 3 + (hi - x) / ((hi - lo) || 1) * (h - 6);
  const d = v.map((x, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ',' + Y(x).toFixed(1)).join('');
  const isUp = up == null ? v[v.length - 1] >= v[0] : up;
  const col = isUp ? 'var(--up)' : 'var(--down)';
  return `<svg class="spark ${c}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}L${w},${h}L0,${h}Z" fill="${col}" opacity="0.14"/><path d="${d}" fill="none" stroke="${col}" stroke-width="1.8" vector-effect="non-scaling-stroke"/></svg>`;
}

// Đếm số chạy lên khi xuất hiện
export function countUp(el, to, { dp = 0, dur = 1400, suffix = '' } = {}) {
  if (!el) { return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t0 = performance.now(), from = 0;
  const step = (t) => {
    const f = reduced ? 1 : Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - f, 3);
    el.textContent = fmt(from + (to - from) * e, dp) + suffix;
    if (f < 1) { requestAnimationFrame(step); }
  };
  requestAnimationFrame(step);
}
