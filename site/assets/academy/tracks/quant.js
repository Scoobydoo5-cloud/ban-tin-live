const R = String.raw;
export default {
  id: 'quant', n: '08', title: 'Quantitative Finance', short: 'Quant', level: 'Advanced', color: '#c6f36b',
  blurb: 'Random walks, time series, Monte Carlo, stochastic calculus, risk measures and honest backtesting, with Python you can run.',
  lessons: [
    {
      id: 'randomwalk', title: 'Random Walks, Log Returns & Lognormal Prices', mins: 30, level: 'Advanced',
      summary: 'Why quants work with log returns, and what a lognormal price distribution implies for the median and the mean.',
      objectives: ['Use log returns and their additivity', 'Relate drift, volatility, median and mean of a lognormal price', 'Understand volatility drag'],
      body: [
        ['math', R`r_t = \ln\frac{P_t}{P_{t-1}} \qquad \ln\frac{P_T}{P_0} = \sum_{t=1}^{T} r_t`],
        ['p', 'Log returns add over time, which makes multi-period maths clean. If log returns are normal with mean \((\mu - \sigma^2/2)\) per year and volatility σ, prices are lognormal: never negative, skewed to the right.'],
        ['math', R`\text{median}(P_T) = P_0\,e^{(\mu - \sigma^2/2)T} \qquad E[P_T] = P_0\,e^{\mu T}`],
        ['example', { title: 'P₀ = 100, μ = 8%, σ = 20%, one year', steps: [R`Median \(= 100\,e^{0.06} = 106.18\)`, R`Mean \(= 100\,e^{0.08} = 108.33\)`], answer: 'The typical outcome is below the average outcome: a few big winners pull the mean up. This gap is the same volatility drag seen in geometric vs arithmetic returns.' }],
        ['code', { lang: 'python', src: 'import numpy as np\n\nprices = np.array([100, 110, 104.5, 106.59])\nlog_r = np.diff(np.log(prices))      # [0.0953, -0.0513, 0.0198]\nprint(log_r.sum(), np.log(prices[-1] / prices[0]))  # identical' }],
        ['note', 'A random walk says returns are unpredictable, not that prices are meaningless. It is the natural null hypothesis every trading idea must beat.'],
      ],
      exercises: [
        { q: 'Three simple returns: +10%, −5%, +2%. Sum of the log returns (as a decimal, 4 dp)?', type: 'num', answer: 0.0638, tol: 0.0002, solution: R`\(\ln 1.10 + \ln 0.95 + \ln 1.02 = 0.0638\), and \(e^{0.0638} - 1 = 6.59\%\), the total simple return.` },
        { q: 'For a lognormal price with positive volatility, which is true?', type: 'mcq', options: ['Mean = median', 'Mean > median', 'Mean < median'], answer: 1, solution: 'Right skew pulls the mean above the median.' },
      ],
      resources: ['MIT18S096', 'QE', 'SEEING', 'book:MALKIEL'],
    },
    {
      id: 'timeseries', title: 'Time Series: Autocorrelation, Stationarity & AR(1)', mins: 35, level: 'Advanced',
      summary: 'Modelling dependence over time: when yesterday tells you something about today.',
      objectives: ['Define stationarity and why it matters', 'Estimate and interpret an AR(1)', 'Spot spurious regressions'],
      body: [
        ['math', R`r_t = c + \phi\, r_{t-1} + \varepsilon_t \qquad E[r] = \frac{c}{1 - \phi}\ (|\phi| < 1)`],
        ['p', 'A process is (weakly) stationary if its mean, variance and autocorrelations do not change over time. Returns are roughly stationary; prices are not (they wander). Regressing one non-stationary series on another often shows a high R² for no real reason: the spurious regression problem.'],
        ['example', { title: 'An AR(1) for monthly returns', steps: [R`\(r_t = 0.1 + 0.3\,r_{t-1} + \varepsilon_t\)`, R`Long-run mean \(= 0.1 / (1 - 0.3) = 0.143\)`, 'A shock decays by 70% each period: half-life ≈ ln 0.5 / ln 0.3 ≈ 0.58 periods'], answer: 'Positive φ means momentum; negative φ means mean reversion. Equity index returns show only weak autocorrelation, while volatility is highly persistent (GARCH effects).' }],
        ['code', { lang: 'python', src: 'import numpy as np\nrng = np.random.default_rng(7)\nphi, c, n = 0.3, 0.1, 5000\nr = np.zeros(n)\nfor t in range(1, n):\n    r[t] = c + phi * r[t-1] + rng.normal()\nX = np.column_stack([np.ones(n-1), r[:-1]])\nc_hat, phi_hat = np.linalg.lstsq(X, r[1:], rcond=None)[0]\nprint(round(c_hat, 3), round(phi_hat, 3))   # close to 0.1 and 0.3' }],
        ['note', 'Test for unit roots (e.g. augmented Dickey–Fuller) before modelling levels, and model differences or returns instead of prices.'],
      ],
      exercises: [
        { q: R`An AR(1) has \(c = 0.002\) and \(\phi = 0.15\) (daily returns). Long-run mean daily return?`, type: 'num', answer: 0.002353, tol: 0.00001, solution: R`\(0.002 / 0.85 = 0.002353\).` },
        { q: 'Which series is most likely non-stationary?', type: 'mcq', options: ['Daily log returns of an index', 'The index level itself', 'Daily changes in a 10-year yield'], answer: 1, solution: 'Price levels drift without a fixed mean; returns and changes are closer to stationary.' },
      ],
      resources: ['MIT18S096', 'MIT450', 'QE', 'book:TSAY'],
    },
    {
      id: 'montecarlo', title: 'Monte Carlo Simulation of Price Paths', mins: 35, level: 'Advanced',
      summary: 'Simulating thousands of futures to price options, measure risk and see the shape of uncertainty.',
      objectives: ['Discretise geometric Brownian motion exactly', 'Price a European option by simulation', 'Understand standard error and convergence'],
      body: [
        ['math', R`S_{t+\Delta t} = S_t \exp\!\left[\left(\mu - \tfrac{1}{2}\sigma^2\right)\Delta t + \sigma\sqrt{\Delta t}\,Z\right],\quad Z \sim N(0,1)`],
        ['p', 'To price an option, simulate under the risk-neutral drift (μ = r), average the discounted payoffs, and report the standard error \(s/\sqrt{N}\). Quadrupling the number of paths halves the error.'],
        ['code', { lang: 'python', src: 'import numpy as np\nS0, K, r, sigma, T, N = 100, 100, 0.05, 0.20, 1.0, 200_000\nrng = np.random.default_rng(42)\nZ = rng.standard_normal(N)\nST = S0 * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)\npay = np.exp(-r * T) * np.maximum(ST - K, 0)\nprint(pay.mean(), pay.std() / np.sqrt(N))   # ≈ 10.45 ± 0.03 (Black–Scholes: 10.4506)' }],
        ['list', ['Variance reduction: antithetic variates (use Z and −Z), control variates.', 'Path-dependent products (Asian, barrier options) have no simple formula; Monte Carlo handles them easily.', 'For risk, simulate under the real-world drift and read percentiles of the P&L.']],
        ['lab', 'montecarlo'],
      ],
      exercises: [
        { q: 'With 10,000 paths the standard error is 0.12. Roughly how many paths for a standard error of 0.03?', type: 'num', answer: 160000, tol: 1, solution: 'Error scales with 1/√N: to cut it by 4× you need 16× the paths: 160,000.' },
        { q: 'To price an option by simulation, the drift used for the stock should be…', type: 'mcq', options: ['The expected real-world return', 'The risk-free rate (minus any dividend yield)', 'Zero'], answer: 1, solution: 'Risk-neutral pricing: discounting at r is only consistent if the asset drifts at r under the pricing measure.' },
      ],
      resources: ['QE', 'QE_PY', 'HULL', 'MIT18S096'],
    },
    {
      id: 'ito', title: 'Brownian Motion & Itô’s Lemma (Intuition)', mins: 40, level: 'Advanced',
      summary: 'The calculus of random paths, and why the −σ²/2 keeps appearing.',
      objectives: ['State the properties of Brownian motion', 'Apply Itô’s lemma to ln S', 'Connect it to Black–Scholes'],
      body: [
        ['p', R`Brownian motion \(W_t\) starts at 0, has independent increments, and \(W_t - W_s \sim N(0, t - s)\). Its paths are continuous but nowhere differentiable, and its squared increments add up deterministically: \((dW)^2 = dt\).`],
        ['math', R`dS = \mu S\,dt + \sigma S\,dW`],
        ['p', R`Itô’s lemma is the chain rule with an extra second-order term, because \((dW)^2\) is not negligible:`],
        ['math', R`df(S,t) = \left(\frac{\partial f}{\partial t} + \mu S \frac{\partial f}{\partial S} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 f}{\partial S^2}\right)dt + \sigma S \frac{\partial f}{\partial S}\,dW`],
        ['example', { title: 'Apply it to f = ln S', steps: [R`\(\partial f/\partial S = 1/S\), \(\partial^2 f/\partial S^2 = -1/S^2\)`, R`\(d\ln S = (\mu - \tfrac{1}{2}\sigma^2)\,dt + \sigma\,dW\)`], answer: R`So \(\ln S_T\) is normal with mean \(\ln S_0 + (\mu - \sigma^2/2)T\): exactly the lognormal model and the Monte Carlo formula from the previous lessons.` }],
        ['p', 'Black–Scholes follows by building a portfolio of the option and −Δ shares whose dW terms cancel, so it must earn the risk-free rate. That gives a partial differential equation whose solution is the Black–Scholes formula.'],
        ['note', 'You do not need measure theory to use these tools, but Shreve’s two volumes are the standard path if you want the full rigour.'],
      ],
      exercises: [
        { q: R`If \(dS = \mu S\,dt + \sigma S\,dW\), the drift of \(\ln S\) is…`, type: 'mcq', options: ['μ', 'μ − σ²/2', 'μ + σ²/2'], answer: 1, solution: 'The −σ²/2 comes from the second-order Itô term with a negative second derivative.' },
        { q: 'Over a small interval dt, the variance of dW is…', type: 'mcq', options: ['dt', '√dt', 'dt²'], answer: 0, solution: 'Increments are N(0, dt): variance dt, standard deviation √dt.' },
      ],
      resources: ['MIT18S096', 'MIT070', 'HULL', 'book:SHREVE'],
    },
    {
      id: 'var', title: 'Value at Risk & Expected Shortfall', mins: 30, level: 'Advanced',
      summary: 'How much could we lose on a bad day? Parametric and historical VaR, and why regulators prefer expected shortfall.',
      objectives: ['Compute parametric VaR and scale it over time', 'Compute expected shortfall under normality', 'Know the weaknesses of VaR'],
      body: [
        ['math', R`VaR_{\alpha} = z_{\alpha}\,\sigma\,V \qquad VaR_{T\text{ days}} \approx VaR_{1\text{ day}}\sqrt{T} \qquad ES_{\alpha} = \sigma V\,\frac{\phi(z_\alpha)}{1 - \alpha}`],
        ['example', { title: 'A $1,000,000 portfolio with 1.5% daily volatility', steps: [R`99% one-day VaR \(= 2.326 \times 1.5\% \times 1{,}000{,}000 = \$34{,}895\)`, R`10-day VaR \(\approx 34{,}895 \times \sqrt{10} = \$110{,}348\)`, R`99% expected shortfall \(= 1.5\% \times 2.665 \times 1{,}000{,}000 = \$39{,}978\)`], answer: 'VaR says “on 99 days out of 100 we lose less than $34,895”. It says nothing about how bad the other day is; expected shortfall averages that tail.' }],
        ['list', ['Historical VaR: take the empirical 1st percentile of past daily P&L; no normality assumption, but only as good as the history window.', 'VaR is not sub-additive in general: diversification can appear to increase it. Expected shortfall is coherent.', 'Fat tails and volatility clustering make normal VaR too optimistic in crises.']],
        ['lab', 'var'],
      ],
      exercises: [
        { q: 'A $500,000 portfolio with 1.2% daily volatility. 95% one-day parametric VaR ($)?', type: 'num', answer: 9869, tol: 3, solution: R`\(1.645 \times 0.012 \times 500{,}000 = \$9{,}869\).` },
        { q: 'Why did the Basel framework move trading-book capital from VaR to expected shortfall?', type: 'mcq', options: ['ES is easier to compute', 'ES captures the size of tail losses and is coherent', 'ES is always smaller'], answer: 1, solution: 'ES looks beyond the cut-off and satisfies sub-additivity.' },
      ],
      resources: ['BIS', 'MIT450', 'HULL', 'book:HULLB'],
    },
    {
      id: 'backtest', title: 'Backtesting Without Fooling Yourself', mins: 30, level: 'Advanced',
      summary: 'Overfitting, look-ahead and survivorship bias, multiple testing, and a protocol for honest research.',
      objectives: ['Recognise the common backtest biases', 'Understand the multiple-testing problem', 'Use walk-forward validation'],
      body: [
        ['list', ['Look-ahead bias: using data that was not available at the time (restated financials, today’s index membership).', 'Survivorship bias: testing only companies that still exist, ignoring the ones that went bust.', 'Overfitting: tuning parameters until the past looks great; the model memorises noise.', 'Transaction costs and liquidity: many paper strategies vanish after spreads and market impact.']],
        ['h', 'The multiple-testing trap'],
        ['p', R`Test 100 random strategies at the 5% significance level and about 5 will look “significant” by luck. The chance that at least one of 20 useless strategies passes is \(1 - 0.95^{20} = 64\%\). Adjust for the number of trials (Bonferroni, or the deflated Sharpe ratio of Bailey and López de Prado).`],
        ['code', { lang: 'python', src: '# Walk-forward: fit on a rolling window, test on the next unseen block\nimport numpy as np\n\ndef walk_forward(returns, fit, predict, train=252, test=21):\n    out = []\n    for start in range(0, len(returns) - train - test + 1, test):\n        model = fit(returns[start:start + train])\n        signal = predict(model, returns[start + train - 1:start + train + test - 1])\n        out.extend(signal * returns[start + train:start + train + test])\n    return np.array(out)   # purely out-of-sample strategy returns' }],
        ['note', 'Write the hypothesis and the test rules down before you look at the results, just as JayV writes forecasts with probabilities before the outcome is known.'],
      ],
      exercises: [
        { q: 'You test 20 strategies with no true edge at the 5% level. Probability at least one looks significant (%)?', type: 'num', answer: 64.15, tol: 0.1, solution: R`\(1 - 0.95^{20} = 64.2\%\).` },
        { q: 'A backtest uses today’s S&P 500 members for the last 20 years. The main bias is…', type: 'mcq', options: ['Survivorship bias', 'Transaction-cost bias', 'Rounding bias'], answer: 0, solution: 'Firms that failed or were dropped are excluded, inflating past returns.' },
      ],
      resources: ['PV', 'QE_PY', 'FRENCH', 'book:LDP'],
    },
  ],
};
