// Games for JayV Academy: Bull or Bear (real data) and Formula Sprint.
import { chart } from './labs.js';

const R = String.raw;
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* bỏ qua */ } } };
const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

function bullbear(el, { data, onXp }) {
  const pool = data ? Object.values(data.items).filter((it) => it.hist && it.hist.length >= 60 && it.hist.every((v) => v > 0)) : [];
  if (pool.length < 5) { el.innerHTML = '<p class="muted">Market data is still loading. Try again in a moment.</p>'; return () => {}; }
  let round = 0, score = 0, cur = null;
  const best = store.get('jayv-bb-best', 0);
  el.innerHTML = `<div class="game"><div class="g-top"><span class="g-round"></span><span class="g-score"></span><span class="muted">Best: ${best}/10</span></div><div class="g-chart"></div><div class="g-q">Where will this chart be <b>5 sessions later</b>?</div><div class="g-btns"><button type="button" class="btn g-up">Bull ▲ higher</button><button type="button" class="btn g-dn">Bear ▼ lower</button></div><div class="g-res"></div></div>`;
  const $ = (s) => el.querySelector(s);
  function next() {
    round += 1;
    if (round > 10) { finish(); return; }
    const it = pool[Math.floor(Math.random() * pool.length)];
    const h = it.hist.slice(-60), base = h[0], v = h.map((x) => (x / base) * 100);
    cur = { it, v, up: v[59] > v[54] };
    $('.g-round').textContent = `Round ${round} / 10`;
    $('.g-score').textContent = `Score ${score}`;
    $('.g-res').innerHTML = '';
    $('.g-btns').hidden = false;
    draw(false);
  }
  function draw(reveal) {
    const v = cur.v, pts = v.slice(0, 55).map((y, i) => [i, y]), fut = v.slice(54).map((y, i) => [54 + i, y]);
    const ys = reveal ? v : v.slice(0, 55), lo = Math.min(...ys), hi = Math.max(...ys), pad = (hi - lo) * 0.15 || 1;
    $('.g-chart').innerHTML = chart({ w: 640, h: 260, series: [{ pts, color: '#9fb3b2', width: 2.4 }].concat(reveal ? [{ pts: fut, color: cur.up ? '#38d99c' : '#ff6b5c', width: 3.4 }] : []), vlines: [{ v: 54, color: '#e9b85c', label: 'now' }], x: [0, 59], y: [lo - pad, hi + pad], xl: 'Session', yl: 'Indexed to 100', xf: (t) => t.toFixed(0), yf: (t) => t.toFixed(0) });
  }
  function answer(sayUp) {
    const ok = sayUp === cur.up;
    if (ok) { score += 1; if (onXp) { onXp(5); } }
    $('.g-btns').hidden = true;
    draw(true);
    const ch = (cur.v[59] / cur.v[54] - 1) * 100;
    $('.g-res').innerHTML = `<p class="${ok ? 'up' : 'down'}"><b>${ok ? 'Correct!' : 'Not this time.'}</b> This was <b>${esc(cur.it.label)}</b>${cur.it.name ? ' (' + esc(cur.it.name) + ')' : ''}: ${ch >= 0 ? '+' : ''}${ch.toFixed(2)}% over the next 5 sessions.</p><button type="button" class="btn gold g-next">${round < 10 ? 'Next chart →' : 'See results'}</button>`;
    $('.g-score').textContent = `Score ${score}`;
  }
  function finish() {
    if (score > best) { store.set('jayv-bb-best', score); }
    $('.g-btns').hidden = true;
    $('.g-chart').innerHTML = '';
    $('.g-q').innerHTML = `<h3 style="font-size:28px">You scored ${score} / 10</h3>`;
    $('.g-res').innerHTML = `<p class="muted">A coin flip would score about 5. Short-term moves are close to a random walk, which is exactly the lesson: be humble about predicting the next five sessions, and focus on process, diversification and costs.</p><button type="button" class="btn gold g-again">Play again</button>`;
  }
  el.addEventListener('click', (e) => {
    if (e.target.closest('.g-up')) { answer(true); }
    else if (e.target.closest('.g-dn')) { answer(false); }
    else if (e.target.closest('.g-next')) { next(); }
    else if (e.target.closest('.g-again')) { round = 0; score = 0; $('.g-q').innerHTML = 'Where will this chart be <b>5 sessions later</b>?'; next(); }
  });
  next();
  return () => {};
}

const FORMULAS = [
  ['Future value', R`PV(1+r)^n`], ['Effective annual rate', R`(1 + \tfrac{APR}{m})^m - 1`], ['Present value of an annuity', R`C\,\frac{1-(1+r)^{-n}}{r}`],
  ['Growing perpetuity', R`\frac{C_1}{r-g}`], ['Net present value', R`\sum_t \frac{CF_t}{(1+r)^t}`], ['WACC', R`\tfrac{E}{V} r_E + \tfrac{D}{V} r_D (1-T)`],
  ['CAPM', R`r_f + \beta (E[R_m]-r_f)`], ['Beta', R`\frac{\mathrm{Cov}(R_i,R_m)}{\mathrm{Var}(R_m)}`], ['Sharpe ratio', R`\frac{R_p - r_f}{\sigma_p}`],
  ['Treynor ratio', R`\frac{R_p - r_f}{\beta_p}`], ['Two-asset portfolio variance', R`w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho\sigma_1\sigma_2`], ['DuPont ROE', R`\tfrac{NI}{S}\cdot\tfrac{S}{A}\cdot\tfrac{A}{E}`],
  ['Modified duration price change', R`\tfrac{\Delta P}{P} \approx -D_{mod}\Delta y`], ['Forward price (cost of carry)', R`S_0 e^{(r-q)T}`], ['Put–call parity', R`C - P = S_0 - Ke^{-rT}`],
  ['Risk-neutral probability', R`\frac{(1+r)-d}{u-d}`], ['Black–Scholes d₁', R`\frac{\ln(S/K) + (r+\sigma^2/2)T}{\sigma\sqrt{T}}`], ['Taylor rule', R`r^* + \pi + 0.5(\pi-\pi^*) + 0.5\,\text{gap}`],
  ['Fisher relation', R`\frac{1+i}{1+\pi} - 1`], ['Covered interest parity', R`S\,\frac{1+i_{quote}}{1+i_{base}}`], ['Parametric VaR', R`z_\alpha\,\sigma\,V`],
  ['Sustainable growth', R`ROE \times (1 - \text{payout})`], ['Drift of ln S (Itô)', R`\mu - \tfrac{1}{2}\sigma^2`], ['Spending multiplier', R`\frac{1}{1-MPC}`],
  ['Expected loss', R`PD \times LGD \times EAD`], ['Gordon terminal value', R`\frac{FCF_N(1+g)}{WACC-g}`], ['Long-run mean of AR(1)', R`\frac{c}{1-\phi}`],
];
function sprint(el, { onXp }) {
  let score = 0, left = 60, timer = null, q = null, deck = shuffle(FORMULAS);
  const best = store.get('jayv-sprint-best', 0);
  el.innerHTML = `<div class="game"><div class="g-top"><span class="g-time">60 s</span><span class="g-score">Score 0</span><span class="muted">Best: ${best}</span></div><div class="g-formula"></div><div class="g-opts"></div><div class="g-res"></div><button type="button" class="btn gold g-start">Start the 60-second sprint</button></div>`;
  const $ = (s) => el.querySelector(s);
  const katex = window.katex;
  function ask() {
    if (!deck.length) { deck = shuffle(FORMULAS); }
    const [name, tex] = deck.pop();
    const wrong = shuffle(FORMULAS.filter((f) => f[0] !== name)).slice(0, 2).map((f) => f[0]);
    q = { name, opts: shuffle([name].concat(wrong)) };
    const box = $('.g-formula');
    if (katex) { katex.render(tex, box, { displayMode: true, throwOnError: false }); } else { box.textContent = tex; }
    $('.g-opts').innerHTML = q.opts.map((o) => `<button type="button" class="btn g-opt">${esc(o)}</button>`).join('');
  }
  function end() {
    clearInterval(timer); timer = null;
    $('.g-opts').innerHTML = ''; $('.g-formula').innerHTML = '';
    if (score > best) { store.set('jayv-sprint-best', score); }
    $('.g-res').innerHTML = `<h3 style="font-size:26px">Time! ${score} formulas matched.</h3><p class="muted">Every formula here appears in a lesson. Missed one? Search it with Ctrl K.</p>`;
    const b = $('.g-start'); b.hidden = false; b.textContent = 'Play again';
    if (onXp) { onXp(score * 2); }
  }
  el.addEventListener('click', (e) => {
    if (e.target.closest('.g-start')) {
      score = 0; left = 60; $('.g-res').innerHTML = ''; e.target.closest('.g-start').hidden = true;
      $('.g-score').textContent = 'Score 0'; ask();
      timer = setInterval(() => { left -= 1; $('.g-time').textContent = left + ' s'; if (left <= 0) { end(); } }, 1000);
    }
    const o = e.target.closest('.g-opt');
    if (o && timer) {
      const ok = o.textContent === q.name;
      if (ok) { score += 1; }
      $('.g-score').textContent = `Score ${score}`;
      $('.g-res').innerHTML = ok ? '<p class="up">Correct</p>' : `<p class="down">That was: ${esc(q.name)}</p>`;
      ask();
    }
  });
  return () => { if (timer) { clearInterval(timer); } };
}

export function mountGame(id, el, ctx) { return id === 'bullbear' ? bullbear(el, ctx) : id === 'sprint' ? sprint(el, ctx) : (() => { el.innerHTML = '<p>Game not found.</p>'; return () => {}; })(); }
