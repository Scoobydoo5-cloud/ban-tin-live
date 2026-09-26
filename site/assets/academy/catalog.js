// Danh mục Học viện: 8 lộ trình, bài học, phòng thí nghiệm, trò chơi.
import foundations from './tracks/foundations.js';
import corporate from './tracks/corporate.js';
import investments from './tracks/investments.js';
import fixedincome from './tracks/fixedincome.js';
import derivatives from './tracks/derivatives.js';
import economics from './tracks/economics.js';
import cfa from './tracks/cfa.js';
import quant from './tracks/quant.js';

export const TRACKS = [foundations, corporate, investments, fixedincome, derivatives, economics, cfa, quant];

export const LABS = [
  { id: 'compound', title: 'Compound Growth', blurb: 'Watch a monthly saving plan compound into a 3D tower of money.', track: 'foundations', color: '#5fe3e0' },
  { id: 'loan', title: 'Loan Amortization', blurb: 'Split every repayment into interest and principal.', track: 'foundations', color: '#5fe3e0' },
  { id: 'npv', title: 'NPV & IRR Calculator', blurb: 'Type cash flows, see NPV across discount rates and the IRR crossing.', track: 'corporate', color: '#e9b85c' },
  { id: 'frontier', title: 'Two-Asset Frontier', blurb: 'Drag correlation and see diversification bend the frontier.', track: 'investments', color: '#38d99c' },
  { id: 'bond', title: 'Bond Price–Yield', blurb: 'Coupon, maturity and yield sliders with duration and convexity.', track: 'fixedincome', color: '#7fb2ff' },
  { id: 'payoff', title: 'Option Payoff Builder', blurb: 'Stack calls, puts and stock into any strategy.', track: 'derivatives', color: '#ff7ab6' },
  { id: 'bsm', title: 'Black–Scholes & Greeks', blurb: 'Price calls and puts and watch the Greeks move.', track: 'derivatives', color: '#ff7ab6' },
  { id: 'montecarlo', title: 'Monte Carlo in 3D', blurb: 'Fly through hundreds of simulated price paths.', track: 'quant', color: '#c6f36b' },
  { id: 'var', title: 'Value at Risk', blurb: 'Parametric VaR and expected shortfall on a live bell curve.', track: 'quant', color: '#c6f36b' },
];
export const GAMES = [
  { id: 'bullbear', title: 'Bull or Bear?', blurb: 'Real 60-session charts from JayV’s markets. Guess the next five sessions.', color: '#38d99c' },
  { id: 'sprint', title: 'Formula Sprint', blurb: 'Sixty seconds, as many finance formulas as you can match.', color: '#e9b85c' },
];

export function allLessons() {
  const out = [];
  TRACKS.forEach((t) => t.lessons.forEach((l, i) => out.push({ track: t, lesson: l, i })));
  return out;
}
export function findLesson(trackId, lessonId) {
  const t = TRACKS.find((x) => x.id === trackId);
  if (!t) { return null; }
  const i = t.lessons.findIndex((l) => l.id === lessonId);
  return i < 0 ? null : { track: t, lesson: t.lessons[i], i };
}
export const META_LIVE = { tracks: TRACKS.length, lessons: TRACKS.reduce((a, t) => a + t.lessons.length, 0), labs: LABS.length, games: GAMES.length };

// Chỉ mục tìm kiếm cho bảng lệnh Ctrl/⌘K
export function searchIndex() {
  const items = [];
  TRACKS.forEach((t) => {
    items.push({ t: `${t.title}`, d: t.blurb, hash: `#/track/${t.id}`, c: t.color, k: 'academy học viện lộ trình track' });
    t.lessons.forEach((l) => items.push({ t: l.title, d: `${t.short} · ${l.summary}`, hash: `#/lesson/${t.id}/${l.id}`, c: t.color, k: (l.objectives || []).join(' ') }));
  });
  LABS.forEach((x) => items.push({ t: `Lab: ${x.title}`, d: x.blurb, hash: `#/lab/${x.id}`, c: x.color, k: 'lab phòng thí nghiệm' }));
  GAMES.forEach((x) => items.push({ t: `Game: ${x.title}`, d: x.blurb, hash: `#/game/${x.id}`, c: x.color, k: 'game trò chơi' }));
  return items;
}
