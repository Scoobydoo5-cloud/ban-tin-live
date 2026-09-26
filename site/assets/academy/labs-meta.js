// Metadata for labs and games (no three.js import, so build tools can read it).
export const LABS = [
  { id: 'compound', title: 'Compound Growth', blurb: 'Watch a monthly saving plan compound into a 3D tower of money.', subject: '25400', color: '#5fe3e0' },
  { id: 'loan', title: 'Loan Amortization', blurb: 'Split every repayment into interest and principal.', subject: '25400', color: '#5fe3e0' },
  { id: 'npv', title: 'NPV & IRR Calculator', blurb: 'Type cash flows, see NPV across discount rates and the IRR crossing.', subject: '25300', color: '#38d99c' },
  { id: 'frontier', title: 'Two-Asset Frontier', blurb: 'Drag correlation and see diversification bend the frontier.', subject: '25503', color: '#f2c46a' },
  { id: 'bond', title: 'Bond Price–Yield', blurb: 'Coupon, maturity and yield sliders with duration and convexity.', subject: '25503', color: '#f2c46a' },
  { id: 'payoff', title: 'Option Payoff Builder', blurb: 'Stack calls, puts and stock into any strategy.', subject: '25620', color: '#ff7ab6' },
  { id: 'bsm', title: 'Black–Scholes & Greeks', blurb: 'Price calls and puts and watch the Greeks move.', subject: '25620', color: '#ff7ab6' },
  { id: 'montecarlo', title: 'Monte Carlo in 3D', blurb: 'Fly through hundreds of simulated price paths.', subject: 'X-QNT', color: '#8f7bff' },
  { id: 'var', title: 'Value at Risk', blurb: 'Parametric VaR and expected shortfall on a live bell curve.', subject: 'X-QNT', color: '#8f7bff' },
];
export const GAMES = [
  { id: 'bullbear', title: 'Bull or Bear?', blurb: 'Real 60-session charts from JayV’s markets. Guess the next five sessions.', color: '#38d99c' },
  { id: 'sprint', title: 'Formula Sprint', blurb: 'Sixty seconds, as many finance formulas as you can match.', color: '#e9b85c' },
];
