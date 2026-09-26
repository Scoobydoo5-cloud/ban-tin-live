const R = String.raw;
export default {
  id: 'derivatives', n: '05', title: 'Derivatives', short: 'Derivatives', level: 'Advanced', color: '#ff7ab6',
  blurb: 'Forwards, futures, options and swaps: pricing by no-arbitrage, from cost of carry to Black–Scholes and the Greeks.',
  lessons: [
    {
      id: 'forwards', title: 'Forwards, Futures & Cost of Carry', mins: 30, level: 'Intermediate',
      summary: 'Why a forward price is pinned down by the spot price and interest rates, and what contango and backwardation mean.',
      objectives: ['Price a forward with cost of carry', 'Distinguish forwards from futures', 'Explain contango, backwardation and roll yield'],
      body: [
        ['math', R`F_0 = S_0\,e^{(r + u - q - y)T}`],
        ['p', R`Here \(r\) is the risk-free rate, \(u\) storage costs, \(q\) income such as dividends and \(y\) the convenience yield of holding the physical good. If the forward traded above this, you could buy spot, store it and sell forward for a riskless profit (cash-and-carry arbitrage).`],
        ['example', { title: 'Gold and an equity index', steps: [R`Gold at 4,320 USD/oz, r = 5%, no storage cost, 1 year: \(F = 4{,}320\,e^{0.05} = 4{,}541.49\)`, R`Index at 100, r = 5%, dividend yield 2%, 6 months: \(F = 100\,e^{0.03 \times 0.5} = 101.51\)`], answer: 'Neither price is a forecast of the future spot price; both follow from no-arbitrage.' }],
        ['h', 'Contango, backwardation and the roll'],
        ['p', 'When futures are above spot the curve is in contango; below spot, backwardation. Oil is often backwardated when supply is tight, because having barrels now (convenience yield) is valuable. On 25 September 2026 the continuous Brent series rolled from a contract near 106.60 to the next one near 97.47: an apparent −8.6% “move” that was just the curve shape.'],
        ['note', 'Always check contract expiry before reading a continuous futures chart. JayV’s price board flags these roll days automatically.'],
        ['p', 'Futures differ from forwards by being exchange-traded, standardised and marked to market daily through margin accounts, which removes most counterparty risk.'],
      ],
      exercises: [
        { q: 'A stock trades at 50 and pays no dividends; r = 4% (continuous). Fair 9-month forward price?', type: 'num', answer: 51.52, tol: 0.01, solution: R`\(50\,e^{0.04 \times 0.75} = 51.52\).` },
        { q: 'A market where futures prices are below the spot price is in…', type: 'mcq', options: ['Contango', 'Backwardation', 'Equilibrium'], answer: 1, solution: 'Backwardation: typical when the convenience yield of holding the physical commodity is high.' },
      ],
      resources: ['HULL', 'MIT18S096', 'book:HULLB'],
    },
    {
      id: 'options', title: 'Option Payoffs & Put–Call Parity', mins: 30, level: 'Intermediate',
      summary: 'Calls and puts, payoff diagrams, and the arbitrage relation that ties call and put prices together.',
      objectives: ['Draw payoffs for long and short calls and puts', 'Build simple strategies (covered call, protective put, spreads)', 'Apply put–call parity'],
      body: [
        ['math', R`\text{Call payoff} = \max(S_T - K, 0) \qquad \text{Put payoff} = \max(K - S_T, 0)`],
        ['p', 'A call is the right to buy at the strike K; a put is the right to sell. Buyers pay a premium for that right; writers collect it and take on the obligation. Profit = payoff − premium paid.'],
        ['h', 'Put–call parity (European options, no dividends)'],
        ['math', R`C - P = S_0 - K e^{-rT}`],
        ['example', { title: 'S = 100, K = 100, r = 5%, T = 1', steps: [R`\(C - P = 100 - 100\,e^{-0.05} = 4.88\)`, 'If the call costs 10.45, the put must cost 5.57 (compare with the Black–Scholes lesson)'], answer: 'If market prices break parity, buying the cheap side and selling the expensive side locks in an arbitrage.' }],
        ['list', ['Covered call = long stock + short call (caps upside for income).', 'Protective put = long stock + long put (insurance with a deductible).', 'Bull call spread = long call K₁ + short call K₂ > K₁ (cheaper, capped upside).']],
        ['lab', 'payoff'],
      ],
      exercises: [
        { q: R`A 6-month European call on a stock at 50 with strike 52 costs 6.00; r = 4%. What should the put with the same strike cost?`, type: 'num', answer: 6.97, tol: 0.02, solution: R`\(P = C - S + K e^{-rT} = 6.00 - 50 + 52\,e^{-0.02} = 6.97\).` },
        { q: 'You buy a call with strike 110 for 3.50. The stock ends at 118. Profit per share?', type: 'num', answer: 4.5, tol: 0.01, solution: 'Payoff 8 minus premium 3.50 = 4.50.' },
      ],
      resources: ['HULL', 'KHAN', 'book:HULLB'],
    },
    {
      id: 'binomial', title: 'The Binomial Model', mins: 30, level: 'Advanced',
      summary: 'Price an option by replicating it with the stock and a bond, and discover risk-neutral probabilities.',
      objectives: ['Build a one-step binomial tree', 'Compute the replicating delta', 'Price with risk-neutral probabilities'],
      body: [
        ['math', R`p^* = \frac{(1 + r) - d}{u - d} \qquad C_0 = \frac{p^* C_u + (1 - p^*) C_d}{1 + r}`],
        ['example', { title: 'S = 100, up 20% (u = 1.2), down 20% (d = 0.8), r = 5% per period, call K = 100', steps: ['Payoffs: C_u = 20, C_d = 0', R`\(p^* = (1.05 - 0.8)/(1.2 - 0.8) = 0.625\)`, R`\(C_0 = 0.625 \times 20 / 1.05 = 11.905\)`, R`Replication: hold \(\Delta = (20 - 0)/(120 - 80) = 0.5\) shares, financed partly by borrowing`], answer: 'The put with the same strike is (0.375 × 20)/1.05 = 7.143, and C − P = 100 − 100/1.05 checks parity.' }],
        ['p', 'The real-world probability of an up move never appears. Because the option can be replicated, its price cannot depend on anyone’s forecast, only on the ability to hedge. Chaining many small steps converges to Black–Scholes.'],
        ['note', 'Risk-neutral probabilities are a pricing device, not a belief about the future.'],
      ],
      exercises: [
        { q: 'S = 50, u = 1.1, d = 0.9, r = 4% per period. One-period call with K = 50?', type: 'num', answer: 3.365, tol: 0.01, solution: R`\(p^* = (1.04 - 0.9)/(0.2) = 0.7\); \(C = 0.7 \times 5 / 1.04 = 3.365\).` },
        { q: 'In the model above, what must hold to rule out arbitrage?', type: 'mcq', options: ['d < 1 + r < u', 'u > d > 1 + r', 'p* > 0.5'], answer: 0, solution: 'If the risk-free return were outside [d, u], the stock would dominate or be dominated by the bond.' },
      ],
      resources: ['HULL', 'MIT18S096', 'book:HULLB', 'book:SHREVE'],
    },
    {
      id: 'bsm', title: 'Black–Scholes–Merton & the Greeks', mins: 40, level: 'Advanced',
      summary: 'The continuous-time option formula and the sensitivities traders use to hedge.',
      objectives: ['Compute a call and put with Black–Scholes', 'Interpret delta, gamma, vega, theta', 'Understand implied volatility'],
      body: [
        ['math', R`C = S\,N(d_1) - K e^{-rT} N(d_2) \qquad P = K e^{-rT} N(-d_2) - S\,N(-d_1)`],
        ['math', R`d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}} \qquad d_2 = d_1 - \sigma\sqrt{T}`],
        ['example', { title: 'S = 100, K = 100, r = 5%, σ = 20%, T = 1', steps: [R`\(d_1 = (0 + 0.07)/0.2 = 0.35\), \(d_2 = 0.15\)`, R`\(N(0.35) = 0.6368\), \(N(0.15) = 0.5596\)`, R`\(C = 100(0.6368) - 95.123(0.5596) = 10.45\)`, R`\(P = 5.57\)`], answer: 'Delta = 0.637, gamma = 0.0188, vega = 0.375 per volatility point.' }],
        ['table', { head: ['Greek', 'Measures', 'Long call'], rows: [['Delta Δ', 'Price change per $1 in S', '0 to 1'], ['Gamma Γ', 'Change in delta per $1 in S', 'Positive'], ['Vega', 'Price change per 1 point of σ', 'Positive'], ['Theta Θ', 'Price change per day', 'Usually negative'], ['Rho ρ', 'Price change per 1 point of r', 'Positive']] }],
        ['p', 'Implied volatility is the σ that makes the formula match the market price. Plotting it across strikes shows a skew: markets charge more for crash protection than the lognormal model assumes.'],
        ['note', 'Black–Scholes assumes constant volatility, continuous trading and lognormal prices. It is wrong in all three ways and still the market’s common language for quoting options.'],
        ['lab', 'bsm'],
      ],
      exercises: [
        { q: 'S = 50, K = 55, r = 4%, σ = 30%, T = 0.5. Black–Scholes call price?', type: 'num', answer: 2.706, tol: 0.01, solution: R`\(d_1 = -0.2489\), \(d_2 = -0.4611\), \(C = 50N(d_1) - 55e^{-0.02}N(d_2) = 2.706\).` },
        { q: 'A trader is long gamma. When the stock jumps up and down a lot, the trader…', type: 'mcq', options: ['Gains from rebalancing the hedge', 'Loses from rebalancing the hedge', 'Is unaffected'], answer: 0, solution: 'Long gamma means delta rises as the price rises: re-hedging sells high and buys low, profiting from realised volatility (at the cost of theta).' },
      ],
      resources: ['HULL', 'MIT18S096', 'MIT450', 'book:HULLB'],
    },
    {
      id: 'swaps', title: 'Interest-Rate Swaps', mins: 25, level: 'Advanced',
      summary: 'Exchanging fixed for floating payments: the par swap rate and how a swap gains or loses value.',
      objectives: ['Compute a par swap rate from discount factors', 'Value an existing swap', 'Use swaps to change a balance sheet’s rate exposure'],
      body: [
        ['p', 'In a plain-vanilla interest-rate swap one side pays a fixed rate and receives a floating rate on a notional amount. The floating leg is worth par at reset dates, so the fixed rate that makes the swap worth zero is:'],
        ['math', R`s = \frac{1 - DF_n}{\sum_{i=1}^{n} DF_i}`],
        ['example', { title: 'Spot rates 4%, 4.5%, 5% for 1, 2, 3 years', steps: [R`\(DF_1 = 0.9615\), \(DF_2 = 0.9157\), \(DF_3 = 0.8638\)`, R`\(s = (1 - 0.8638)/(0.9615 + 0.9157 + 0.8638) = 4.967\%\)`], answer: 'A company paying floating on a loan can swap into a fixed 4.97% to lock in its funding cost.' }],
        ['p', R`An existing swap that receives fixed at rate \(k\) is worth approximately \((k - s) \times \text{Notional} \times \sum DF_i\).`],
        ['note', 'Swap markets are among the largest in the world by notional; central banks and regulators watch swap spreads as a gauge of funding stress.'],
      ],
      exercises: [
        { q: R`Using the same discount factors, what is a 3-year swap receiving fixed 5.50% on $10 million worth (in $, to the fixed receiver)?`, type: 'num', answer: 145984, tol: 60, solution: R`\((5.50\% - 4.967\%) \times 10{,}000{,}000 \times 2.7411 \approx \$145{,}984\).` },
        { q: 'A bank has floating-rate deposits and fixed-rate mortgages. To reduce its exposure to rising rates, it should…', type: 'mcq', options: ['Pay fixed, receive floating', 'Receive fixed, pay floating', 'Do nothing'], answer: 0, solution: 'Paying fixed and receiving floating converts its fixed-rate assets into floating ones, matching its deposit costs.' },
      ],
      resources: ['HULL', 'BIS', 'book:HULLB'],
    },
  ],
};
