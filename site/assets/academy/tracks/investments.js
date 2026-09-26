const R = String.raw;
export default {
  id: 'investments', n: '03', title: 'Investments & Portfolio Theory', short: 'Investments', level: 'Intermediate', color: '#38d99c',
  blurb: 'Risk and return, diversification, the efficient frontier, CAPM, factor models and how to judge a fund manager.',
  lessons: [
    {
      id: 'riskreturn', title: 'Risk, Return & Diversification', mins: 30, level: 'Intermediate',
      summary: 'Why a portfolio can be less risky than every asset in it, and the only free lunch in finance.',
      objectives: ['Compute expected return and volatility of a two-asset portfolio', 'See how correlation drives diversification', 'Find the minimum-variance mix'],
      body: [
        ['math', R`E[R_p] = w_1 E[R_1] + w_2 E[R_2]`],
        ['math', R`\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2 w_1 w_2 \rho_{12}\,\sigma_1\sigma_2`],
        ['example', { title: '60% stocks (10%, σ 18%) + 40% bonds (5%, σ 7%), correlation 0.2', steps: [R`\(E[R_p] = 0.6 \times 10\% + 0.4 \times 5\% = 8\%\)`, R`\(\sigma_p^2 = 0.36(0.0324) + 0.16(0.0049) + 2(0.6)(0.4)(0.2)(0.18)(0.07) = 0.013658\)`, R`\(\sigma_p = 11.69\%\)`], answer: 'If the two were perfectly correlated, volatility would be the weighted average, 13.6%. Low correlation removes 1.9 points of risk for free.' }],
        ['p', R`The mix with the lowest possible variance puts \(w_1^* = \frac{\sigma_2^2 - \rho\sigma_1\sigma_2}{\sigma_1^2 + \sigma_2^2 - 2\rho\sigma_1\sigma_2}\) in asset 1: here only 7.4% in stocks.`],
        ['h', 'Systematic vs idiosyncratic risk'],
        ['p', 'Adding more stocks averages away company-specific (idiosyncratic) risk. What remains is market-wide (systematic) risk that no amount of diversification removes, and it is the only risk markets pay you to bear.'],
        ['lab', 'frontier'],
      ],
      exercises: [
        { q: 'Two assets, each with 20% volatility, correlation −0.3, held 50/50. Portfolio volatility (%)?', type: 'num', answer: 11.83, tol: 0.02, solution: R`\(\sigma_p^2 = 0.25(0.04) + 0.25(0.04) + 2(0.25)(-0.3)(0.04) = 0.014\); \(\sigma_p = 11.83\%\).` },
        { q: 'Which risk earns a premium in equilibrium?', type: 'mcq', options: ['Idiosyncratic (firm-specific) risk', 'Systematic (market) risk', 'Both equally'], answer: 1, solution: 'Idiosyncratic risk can be diversified away at no cost, so no one is compensated for holding it.' },
      ],
      resources: ['MIT433', 'YALE252', 'KHAN', 'book:BKM'],
    },
    {
      id: 'frontier', title: 'Efficient Frontier, Sharpe Ratio & the CAL', mins: 30, level: 'Intermediate',
      summary: 'Mean–variance optimisation, the tangency portfolio and why everyone should hold the same risky mix.',
      objectives: ['Define the efficient frontier', 'Compute and interpret the Sharpe ratio', 'Use the capital allocation line to hit a target risk'],
      body: [
        ['p', 'Plot every possible portfolio by volatility (x) and expected return (y). The upper edge of that cloud is the efficient frontier: for each level of risk, the highest achievable return.'],
        ['math', R`\text{Sharpe} = \frac{E[R_p] - r_f}{\sigma_p}`],
        ['p', 'Add a risk-free asset and draw a line from it to the frontier. The steepest such line touches the frontier at the tangency portfolio, the risky mix with the highest Sharpe ratio. Every investor should hold that mix, and adjust risk by lending or borrowing along the line (two-fund separation).'],
        ['math', R`E[R_c] = r_f + y\,(E[R_p] - r_f) \qquad \sigma_c = y\,\sigma_p`],
        ['example', { title: 'The 60/40 portfolio from the last lesson, risk-free 4%', steps: [R`Sharpe = (8% − 4%) / 11.69% = 0.342`, R`To target 12% volatility: \(y = 12\% / 11.69\% = 1.027\), i.e. borrow 2.7% of wealth`], answer: 'A conservative investor holds y < 1 (part cash); an aggressive one levers up. The risky mix itself stays the same.' }],
        ['note', 'Mean–variance optimisers are extremely sensitive to expected-return inputs. Small estimation errors produce extreme weights, which is why practitioners use constraints, shrinkage or Black–Litterman.'],
      ],
      exercises: [
        { q: 'Fund A: 11% return, 15% volatility. Fund B: 9% return, 10% volatility. Risk-free 4%. Sharpe ratio of B?', type: 'num', answer: 0.5, tol: 0.005, solution: 'B: (9 − 4)/10 = 0.50; A: (11 − 4)/15 = 0.467. B is better on a risk-adjusted basis.' },
        { q: 'Two-fund separation says investors differ only in…', type: 'mcq', options: ['Which risky portfolio they hold', 'How much they put in the tangency portfolio vs the risk-free asset', 'Their expected returns'], answer: 1, solution: 'All hold the same tangency portfolio; risk preferences set the split with the risk-free asset.' },
      ],
      resources: ['MIT433', 'PV', 'INV_SHARPE', 'book:BKM'],
    },
    {
      id: 'capm', title: 'CAPM, Beta & the Security Market Line', mins: 30, level: 'Intermediate',
      summary: 'The model behind most costs of equity: expected return depends only on exposure to the market.',
      objectives: ['Compute beta from covariance', 'Price required returns with the SML', 'Interpret alpha'],
      body: [
        ['math', R`E[R_i] = r_f + \beta_i\,(E[R_m] - r_f) \qquad \beta_i = \frac{\text{Cov}(R_i, R_m)}{\text{Var}(R_m)}`],
        ['example', { title: 'A stock with beta 1.3', steps: [R`\(r_f = 4.5\%\), \(E[R_m] = 10\%\)`, R`\(E[R_i] = 4.5\% + 1.3 \times 5.5\% = 11.65\%\)`, 'If analysts expect 14%, the stock plots above the SML: alpha = 2.35%'], answer: 'Beta from data: covariance 0.024 with market variance 0.020 gives β = 1.2.' }],
        ['h', 'Reading beta'],
        ['list', ['β > 1: amplifies market moves (tech, small caps, cyclicals).', 'β < 1: defensive (utilities, staples).', 'β is estimated with noise; use 2–5 years of weekly or monthly data and consider industry averages.']],
        ['note', 'Empirically, CAPM explains less than it promises: low-beta stocks have historically earned more than CAPM predicts. It remains the standard for its simplicity, which is why factor models were built on top of it.'],
      ],
      exercises: [
        { q: 'Risk-free 4%, beta 0.8, market risk premium 6%. Required return (%)?', type: 'num', answer: 8.8, tol: 0.01, solution: '4% + 0.8 × 6% = 8.8%.' },
        { q: 'A stock plots above the SML. It is…', type: 'mcq', options: ['Overpriced (negative alpha)', 'Underpriced (positive alpha)', 'Fairly priced'], answer: 1, solution: 'Its expected return exceeds what its beta requires, so buyers would push its price up (and expected return down) until it sits on the line.' },
      ],
      resources: ['MIT433', 'DAMO_DATA', 'YALE252', 'book:BKM'],
    },
    {
      id: 'factors', title: 'Factor Models: Fama–French & APT', mins: 30, level: 'Advanced',
      summary: 'Size, value, profitability, investment and momentum: the extra dimensions of risk and return.',
      objectives: ['Write and interpret a factor regression', 'Know the main equity factors', 'Separate factor exposure from true alpha'],
      body: [
        ['math', R`R_i - r_f = \alpha_i + \beta_i\,MKT + s_i\,SMB + h_i\,HML + \varepsilon_i`],
        ['p', 'Fama and French added size (small minus big) and value (high minus low book-to-market) to the market factor; later versions add profitability (RMW) and investment (CMA). Carhart added momentum. The free Kenneth French Data Library publishes these factor returns monthly.'],
        ['example', { title: 'A fund’s exposures', steps: ['Loadings: MKT 1.1, SMB 0.4, HML −0.2', 'Expected factor premia: MKT 6%, SMB 2%, HML 3%', R`Expected excess return \(= 1.1(6) + 0.4(2) - 0.2(3) = 6.8\%\)`], answer: 'If the fund earned 6.8% above cash, its alpha is zero: the “skill” was just small-cap, growth-tilted beta.' }],
        ['h', 'Arbitrage Pricing Theory'],
        ['p', 'APT (Ross) says any set of systematic factors can price assets if arbitrage is impossible. It does not name the factors; practitioners use macro factors (inflation, growth, credit spreads) or statistical ones.'],
        ['note', 'Hundreds of “factors” have been published. Many are data-mined. Demand economic logic, out-of-sample evidence and survival after trading costs.'],
      ],
      exercises: [
        { q: R`Loadings MKT 0.9, SMB −0.3, HML 0.5; premia 5.5%, 2%, 3.5%. Expected excess return (%)?`, type: 'num', answer: 6.1, tol: 0.01, solution: '0.9 × 5.5 − 0.3 × 2 + 0.5 × 3.5 = 4.95 − 0.6 + 1.75 = 6.1%.' },
        { q: 'A manager’s alpha disappears after adding SMB and HML. Most likely…', type: 'mcq', options: ['The manager had genuine stock-picking skill', 'The returns came from size and value tilts', 'The regression is wrong'], answer: 1, solution: 'The “alpha” was compensation for factor exposures you could buy cheaply through factor funds.' },
      ],
      resources: ['FRENCH', 'MIT450', 'PV', 'book:BKM'],
    },
    {
      id: 'efficiency', title: 'Market Efficiency & Behavioral Finance', mins: 25, level: 'Intermediate',
      summary: 'How much information prices already contain, and the psychological biases that sometimes push them off course.',
      objectives: ['Distinguish weak, semi-strong and strong-form efficiency', 'Name the common behavioural biases', 'Understand limits to arbitrage'],
      body: [
        ['table', { head: ['Form', 'Prices reflect…', 'Implication'], rows: [['Weak', 'Past prices and volume', 'Technical analysis cannot earn abnormal returns'], ['Semi-strong', 'All public information', 'Fundamental analysis of public data cannot either'], ['Strong', 'All information, even private', 'Even insiders cannot (and insider trading is illegal anyway)']] }],
        ['h', 'Biases that move prices'],
        ['list', ['Overconfidence: trading too much, underestimating risk.', 'Loss aversion: losses hurt roughly twice as much as equal gains feel good (prospect theory).', 'Anchoring: sticking to a reference price (“it used to be 100”).', 'Herding and extrapolation: chasing what went up recently.', 'Disposition effect: selling winners too early, holding losers too long.']],
        ['p', 'Mispricing can persist because arbitrage is risky and costly: shorting is constrained, noise traders can push prices further away, and arbitrageurs face funding limits (Shleifer and Vishny, “limits to arbitrage”).'],
        ['note', 'JayV’s forecast ledger exists because of overconfidence: writing down a probability and scoring it later is the most reliable cure.'],
      ],
      exercises: [
        { q: 'If markets are weak-form efficient, which strategy should fail to beat the market after costs?', type: 'mcq', options: ['Buying stocks that crossed above their 50-day moving average', 'Trading on unreleased earnings figures', 'Holding an index fund'], answer: 0, solution: 'Weak-form efficiency rules out profits from past price patterns. (The second is illegal insider trading.)' },
        { q: 'An investor refuses to sell a stock until it gets back to what they paid. This is…', type: 'mcq', options: ['Anchoring with the disposition effect', 'Rational rebalancing', 'Momentum investing'], answer: 0, solution: 'The purchase price is irrelevant to future returns; anchoring on it and avoiding the realised loss is a classic bias.' },
      ],
      resources: ['YALE252', 'COURSERA_FM', 'book:MALKIEL', 'book:KAHNEMAN'],
    },
    {
      id: 'performance', title: 'Performance Measurement', mins: 25, level: 'Intermediate',
      summary: 'Sharpe, Treynor, Jensen’s alpha, information ratio and maximum drawdown: judging a manager fairly.',
      objectives: ['Compute and choose between risk-adjusted measures', 'Measure maximum drawdown', 'Understand tracking error and the information ratio'],
      body: [
        ['table', { head: ['Measure', 'Formula', 'Use when…'], rows: [['Sharpe', '(Rp − rf) / σp', 'The portfolio is your whole risky wealth'], ['Treynor', '(Rp − rf) / βp', 'The portfolio is one part of a diversified whole'], ['Jensen’s alpha', 'Rp − [rf + βp(Rm − rf)]', 'Testing for return beyond CAPM'], ['Information ratio', 'Active return / tracking error', 'Judging an active manager against a benchmark'], ['Max drawdown', 'Largest peak-to-trough fall', 'Understanding pain and ruin risk']] }],
        ['example', { title: 'A fund returns 12% with beta 1.1; market 10%; risk-free 4%', steps: ['Treynor = (12 − 4) / 1.1 = 7.27%', 'Jensen’s alpha = 12 − (4 + 1.1 × 6) = 1.4%', 'Active return 2%, tracking error 5% → information ratio 0.4'], answer: 'Positive alpha, but an IR of 0.4 is typical of good, not exceptional, managers.' }],
        ['p', 'Drawdown example: a portfolio goes 100 → 130 → 91 → 120. The maximum drawdown is 91/130 − 1 = −30%, even though it ends up 20%.'],
        ['note', 'Short track records are mostly noise. With 12% volatility, distinguishing a 2% alpha from zero at 95% confidence takes decades of data.'],
      ],
      exercises: [
        { q: 'A portfolio goes 100 → 140 → 70 → 110. Maximum drawdown (%)?', type: 'num', answer: -50, tol: 0.01, solution: '70/140 − 1 = −50%.' },
        { q: 'You judge a small satellite fund inside a big diversified portfolio. Best measure?', type: 'mcq', options: ['Sharpe ratio', 'Treynor ratio', 'Maximum drawdown'], answer: 1, solution: 'In a diversified whole, only systematic risk (beta) matters, so Treynor is appropriate.' },
      ],
      resources: ['MIT433', 'PV', 'INV_SHARPE', 'CFA', 'book:BKM'],
    },
  ],
};
