const R = String.raw;
export default {
  id: '25400-07', subject: '25400', title: 'Portfolios, diversification and funds', mins: 70, level: 'Foundation',
  summary: 'Why a portfolio is more than the sum of its parts: portfolio return and variance, covariance and correlation, the minimum-variance mix, how diversification removes firm-specific risk but not market risk, asset allocation and rebalancing, and how managed funds, ETFs and index investing work in practice.',
  objectives: [
    'Compute the expected return and standard deviation of a two-asset portfolio',
    'Explain covariance and correlation and show how correlation drives diversification',
    'Find the minimum-variance combination of two assets',
    'Explain why diversification removes idiosyncratic risk but leaves systematic risk',
    'Describe strategic asset allocation, risk profiles and rebalancing',
    'Compare managed funds, ETFs and listed investment companies, and index versus active management',
    'Evaluate dollar-cost averaging against lump-sum investing',
  ],
  body: [
    ['h', 'The only free lunch in finance'],
    ['p', R`Harry Markowitz, who won the Nobel Prize for the ideas in this lecture, is often quoted as calling diversification "the only free lunch in finance". Everywhere else in finance, higher expected return requires higher risk. Diversification is the exception: by combining assets that do not move perfectly together, you can **reduce risk without giving up expected return**. Understanding exactly why, with numbers, is one of the most valuable things you will learn in this degree, and it underpins portfolio theory, the CAPM, the cost of capital and modern fund management.`],

    ['h', 'Portfolio return'],
    ['p', R`A portfolio’s return is simply the weighted average of the returns of its assets, where each weight \(w_i\) is the fraction of the portfolio’s value invested in asset \(i\), and the weights sum to one.`],
    ['math', R`E[r_p] = \sum_{i=1}^{N} w_i\,E[r_i] \qquad \text{with} \qquad \sum_{i=1}^{N} w_i = 1`, 'The expected return of the portfolio is the sum of each weight times the asset’s expected return, and the weights add up to one.'],
    ['p', R`Nothing surprising here. If Australian shares are expected to return 8% and Australian bonds 4.5% (illustrative figures used throughout this lecture), a 60/40 portfolio is expected to return \(0.6 \times 8\% + 0.4 \times 4.5\% = 6.6\%\). The surprise comes with risk.`],

    ['h', 'Portfolio risk: why correlation matters'],
    ['p', R`Risk does **not** average in the same way, because assets do not all rise and fall together. To measure how two assets move together we use the **covariance** and its scaled version, the **correlation coefficient** \(\rho\), which always lies between −1 and +1.`],
    ['defs', [
      ['Covariance', R`\(\text{Cov}(r_1, r_2) = E[(r_1 - E[r_1])(r_2 - E[r_2])]\). Positive when the assets tend to be above their means at the same time.`],
      ['Correlation', R`\(\rho_{12} = \text{Cov}(r_1, r_2)/(\sigma_1 \sigma_2)\). +1 means they move in perfect lockstep, 0 means no linear relationship, −1 means perfectly opposite.`],
    ]],
    ['math', R`\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2\,w_1 w_2\,\rho_{12}\,\sigma_1\sigma_2`, 'The portfolio variance equals w one squared sigma one squared, plus w two squared sigma two squared, plus two times w one times w two times the correlation times sigma one times sigma two.'],
    ['p', R`The first two terms are each asset’s own risk, scaled by the square of its weight. The third term is the interaction. When \(\rho = 1\), the formula collapses to \((w_1\sigma_1 + w_2\sigma_2)^2\), so portfolio risk is just the weighted average of the risks: no diversification benefit at all. Whenever \(\rho < 1\), portfolio risk is **less** than the weighted average. That gap is the free lunch.`],
    ['example', {
      title: 'A 50/50 mix under different correlations',
      setup: R`Shares: \(\sigma_1 = 16\%\). Bonds: \(\sigma_2 = 5\%\). Invest 50% in each and vary the correlation.`,
      steps: [
        R`\(\rho = +1\): \(\sigma_p = 0.5(16\%) + 0.5(5\%) = 10.50\%\), the weighted average.`,
        R`\(\rho = +0.5\): \(\sigma_p = \sqrt{0.25(0.0256) + 0.25(0.0025) + 2(0.25)(0.5)(0.16)(0.05)} = 9.50\%\).`,
        R`\(\rho = 0\): \(\sigma_p = 8.38\%\).`,
        R`\(\rho = -0.5\): \(\sigma_p = 7.09\%\).`,
        R`\(\rho = -1\): \(\sigma_p = |0.5(16\%) - 0.5(5\%)| = 5.50\%\).`,
      ],
      answer: R`The expected return is 6.25% in every case, yet risk ranges from 10.5% down to 5.5% depending only on correlation. With \(\rho = -1\), you could even eliminate risk entirely by holding 23.8% shares and 76.2% bonds (weights proportional to the other asset’s risk).`,
    }],
    ['lab', 'frontier'],

    ['h', 'The minimum-variance portfolio and the efficient set'],
    ['p', R`Now take a realistic correlation between Australian shares and bonds, say \(\rho = 0.1\) (illustrative: the actual correlation has varied a lot over time and was notably positive during the 2022 inflation shock). Tracing out every mix from 0% to 100% shares gives the following.`],
    ['table', {
      caption: 'Shares (E = 8%, σ = 16%) and bonds (E = 4.5%, σ = 5%), ρ = 0.1',
      head: ['Shares weight', 'Expected return', 'Standard deviation', 'Sharpe ratio (rf = 4.35%)'],
      rows: [
        ['0%', '4.50%', '5.00%', '0.030'],
        ['10%', '4.85%', '4.92%', '0.102'],
        ['20%', '5.20%', '5.37%', '0.158'],
        ['30%', '5.55%', '6.22%', '0.193'],
        ['50%', '6.25%', '8.62%', '0.220'],
        ['70%', '6.95%', '11.45%', '0.227'],
        ['85%', '7.48%', '13.70%', '0.228'],
        ['100%', '8.00%', '16.00%', '0.228'],
      ],
    }],
    ['p', R`Look at the first rows. Moving from 100% bonds to 10% shares **raises** expected return from 4.50% to 4.85% **and lowers** risk from 5.00% to 4.92%. Adding a small amount of a riskier asset made the portfolio safer. The mix with the lowest possible risk is the **global minimum-variance portfolio**. For two assets its weight on asset 1 is:`],
    ['math', R`w_1^{*} = \frac{\sigma_2^2 - \rho\,\sigma_1\sigma_2}{\sigma_1^2 + \sigma_2^2 - 2\rho\,\sigma_1\sigma_2}`, 'The minimum-variance weight on asset one equals sigma two squared minus rho sigma one sigma two, divided by sigma one squared plus sigma two squared minus two rho sigma one sigma two.'],
    ['p', R`Here \(w_1^* = (0.0025 - 0.0008)/(0.0256 + 0.0025 - 0.0016) = 6.4\%\) in shares, giving a standard deviation of 4.89%, lower than holding bonds alone. Every portfolio with less than 6.4% in shares is **inefficient**: some other mix offers a higher return for the same or lower risk. The upper part of the curve, from the minimum-variance point upwards, is the **efficient set**. Which efficient portfolio you choose depends on your tolerance for risk. In Investment Analysis you will add a risk-free asset and discover that the best risky portfolio is the one with the highest Sharpe ratio, a result that leads straight to the CAPM.`],

    ['h', 'Many assets: what diversification can and cannot do'],
    ['p', R`With \(N\) assets the variance formula has \(N\) own-variance terms and \(N(N-1)\) covariance terms. In an equally weighted portfolio where every asset has variance \(\sigma^2\) and every pair has covariance \(\overline{\text{cov}}\), the algebra simplifies beautifully:`],
    ['math', R`\sigma_p^2 = \frac{1}{N}\,\sigma^2 + \frac{N-1}{N}\,\overline{\text{cov}} \;\xrightarrow{\;N \to \infty\;}\; \overline{\text{cov}}`, 'Portfolio variance equals one over N times sigma squared, plus N minus one over N times the average covariance. As N goes to infinity, it approaches the average covariance.'],
    ['p', R`The first term, each stock’s own risk, disappears as \(N\) grows. The second term, the average covariance, does not. Suppose individual shares each have a 40% standard deviation and every pair has a correlation of 0.3.`],
    ['table', {
      caption: 'Risk of an equally weighted portfolio of N shares (σ = 40%, ρ = 0.3)',
      head: ['Number of shares', 'Portfolio standard deviation'],
      rows: [['1', '40.0%'], ['2', '32.2%'], ['5', '26.5%'], ['10', '24.3%'], ['20', '23.2%'], ['50', '22.4%'], ['100', '22.2%'], ['Unlimited', '21.9%']],
    }],
    ['p', R`Most of the benefit arrives with the first 10 to 20 shares, and the risk never falls below \(\sqrt{0.3} \times 40\% = 21.9\%\). This splits total risk into two kinds:`],
    ['list', [
      R`**Idiosyncratic (firm-specific, diversifiable) risk**: a CEO resigns, a mine floods, a drug trial fails. These events are largely independent across firms and cancel out in a large portfolio.`,
      R`**Systematic (market, non-diversifiable) risk**: recessions, interest-rate shocks, pandemics. These hit most firms at once and remain however many shares you hold.`,
    ]],
    ['key', R`Because idiosyncratic risk can be removed at almost no cost, markets do not reward investors for bearing it. Only systematic risk earns a risk premium. This single insight is the foundation of the Capital Asset Pricing Model you will meet in Fundamentals of Business Finance.`],
    ['h3', 'Diversify across countries, too'],
    ['p', R`The Australian share market is highly concentrated: banks and miners make up a large share of the S&P/ASX 200, and a handful of companies dominate its value. Vietnam’s market is similarly concentrated in banks and real estate. Investors everywhere show **home bias**, holding far more domestic shares than their country’s share of world markets. International shares add diversification across industries and economies, at the cost of **currency risk**, which can be hedged or left unhedged. For an Australian investor, unhedged global shares have often cushioned local crises, because the Australian dollar tends to fall when global risk rises.`],

    ['h', 'Asset allocation and rebalancing'],
    ['p', R`Research on pension funds has long found that the mix of broad asset classes, the **strategic asset allocation**, explains most of the variation in a diversified portfolio’s returns over time, far more than the choice of individual securities. Australian super funds package allocations into options such as conservative, balanced, growth and high growth, based on the split between **growth assets** (shares, property, infrastructure, private equity) and **defensive assets** (cash and bonds).`],
    ['table', {
      caption: 'Typical super investment options (indicative, varies by fund)',
      head: ['Option', 'Growth assets', 'Suits', 'Expect a negative year'],
      rows: [
        ['Conservative', 'About 30%', 'Short horizons, low risk tolerance', 'Rarely'],
        ['Balanced', 'About 60–70%', 'Medium-to-long horizons', 'Around one year in six or seven'],
        ['Growth', 'About 80–85%', 'Long horizons', 'Somewhat more often'],
        ['High growth', 'About 95–100%', 'Very long horizons, high tolerance', 'Around one year in four or five'],
      ],
    }],
    ['p', R`Choosing an allocation depends on your **time horizon** (money needed in two years should not be in shares), your **capacity for risk** (stable income and other assets allow more risk) and your **tolerance for risk** (how you will behave in a crash). A 25-year-old with 40 years until retirement can usually hold mostly growth assets in super; a retiree drawing an income faces **sequence risk**, the danger that a crash early in retirement permanently depletes the balance.`],
    ['example', {
      title: 'Rebalancing after a strong year',
      setup: R`You set a 70/30 allocation with $70,000 in shares and $30,000 in bonds. Over the year shares rise 25% and bonds 3%.`,
      steps: [
        R`New values: shares \(70{,}000 \times 1.25 = \$87{,}500\); bonds \(30{,}000 \times 1.03 = \$30{,}900\); total \$118,400.`,
        R`Shares are now \(87{,}500/118{,}400 = 73.9\%\) of the portfolio: your risk has drifted upwards.`,
        R`To restore 70/30: target shares \(= 0.7 \times 118{,}400 = \$82{,}880\). Sell \$4,620 of shares and buy bonds (or direct new contributions to bonds).`,
      ],
      answer: R`Rebalancing keeps risk at the level you chose, and it forces you to trim what has risen and add to what has lagged, a disciplined form of "buy low, sell high". Rebalance on a schedule (say yearly) or when weights drift beyond a band (say 5 points), and use new contributions to minimise tax and costs.`,
    }],

    ['h', 'Funds: how most people actually diversify'],
    ['p', R`Few people can buy 50 shares and a global bond portfolio directly. Pooled vehicles solve this: investors’ money is combined and invested by a professional manager, giving each investor a slice of a diversified portfolio.`],
    ['table', {
      caption: 'Common pooled investment vehicles in Australia',
      head: ['Vehicle', 'How you buy and sell', 'Price', 'Notes'],
      rows: [
        ['Unlisted managed fund', 'Apply and redeem directly with the fund manager', 'Net asset value per unit, less a buy–sell spread', 'Wide range; minimum investments; can be active or index'],
        ['Exchange-traded fund (ETF)', 'Buy and sell on the ASX like a share', 'Market price, kept close to NAV by market makers', 'Mostly low-cost index funds; transparent holdings; some active ETFs'],
        ['Listed investment company (LIC)', 'Buy and sell on the ASX', 'Market price, which can trade at a premium or discount to NAV', 'A company, so it pays tax and can pay franked dividends'],
        ['Superannuation fund', 'Contributions through employer and personally', 'Unit price or crediting rate', 'Tax-advantaged but preserved until retirement'],
      ],
    }],
    ['h3', 'Index versus active management'],
    ['p', R`An **index fund** simply holds the securities in a market index in proportion to their weights, aiming to match the index return minus a small fee. An **active fund** tries to beat the index by selecting securities or timing the market, and charges higher fees for the attempt. The evidence, including S&P Dow Jones Indices’ long-running SPIVA scorecards for Australia and the US, consistently finds that **most active funds underperform their benchmark after fees over long periods**, and that past winners rarely stay winners. The logic is simple arithmetic, set out by William Sharpe: before costs, the average actively managed dollar must earn the market return, because together active investors hold the market; after costs, it must earn less.`],
    ['example', {
      title: 'What a fee difference does over 30 years',
      setup: R`$100,000 invested for 30 years in a market returning 7% a year before fees. An index ETF charges 0.07% a year; an active fund charges 0.90% and, like the average active fund, matches the market before fees.`,
      steps: [
        R`Index ETF: \(100{,}000 \times 1.0693^{30} = \$746{,}426\).`,
        R`Active fund: \(100{,}000 \times 1.0610^{30} = \$590{,}829\).`,
      ],
      answer: R`The difference is about $155,600, over a fifth of the final value, purely from fees. An active manager must beat the market by about 0.83% a year, every year, just to break even with the index fund. Some do; identifying them in advance is the hard part.`,
    }],
    ['note', R`Vietnam has its own ETFs tracking the VN30 and other indices, and several foreign-listed funds invest in Vietnamese shares. Foreign-ownership limits on some Vietnamese companies mean foreign investors sometimes pay a premium for shares whose foreign "room" is full, one reason Vietnam-focused funds can deviate from the local index.`],

    ['h', 'Lump sum or dollar-cost averaging?'],
    ['p', R`**Dollar-cost averaging (DCA)** means investing a fixed amount at regular intervals. Because a fixed dollar amount buys more units when prices are low, your average cost per unit is below the average price. For example, investing $1,000 at each of the prices $10, $8, $12, $9 and $11 buys 510.35 units at an average cost of \$9.80, below the average price of \$10.00.`],
    ['p', R`That arithmetic is real, but it does not make DCA better than investing a lump sum. If you already have the money and markets are expected to rise on average, investing it all at once gives it more time in the market, and studies of historical data find that lump-sum investing has beaten DCA in roughly two-thirds of periods. DCA’s genuine benefits are **behavioural**: it reduces the regret of investing just before a fall and builds a habit. For most people saving from their pay, DCA is not a choice but simply how investing happens, and that is fine.`],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'The formulas compute portfolio return and variance for two assets, and the variance of many assets with matrix multiplication.', src: R`Inputs: E1 in B1 (8%), s1 in B2 (16%), E2 in C1 (4.5%), s2 in C2 (5%), rho in B3 (0.1), w1 in B4 (60%)
Portfolio return   =B4*B1+(1-B4)*C1
Portfolio sd       =SQRT(B4^2*B2^2+(1-B4)^2*C2^2+2*B4*(1-B4)*B3*B2*C2)
Min-variance w1    =(C2^2-B3*B2*C2)/(B2^2+C2^2-2*B3*B2*C2)
Many assets: weights in a row W (1xN), covariance matrix S (NxN)
Portfolio variance =MMULT(MMULT(W,S),TRANSPOSE(W))` }],
    ['code', { lang: 'python', say: 'The Python code builds a covariance matrix from volatilities and correlations and computes the portfolio standard deviation.', src: R`import numpy as np

vol = np.array([0.16, 0.05])            # shares, bonds
corr = np.array([[1.0, 0.1],
                 [0.1, 1.0]])
cov = np.outer(vol, vol) * corr         # covariance matrix
w = np.array([0.6, 0.4])
er = np.array([0.08, 0.045])
print('return', w @ er)                 # 0.066
print('sd', np.sqrt(w @ cov @ w))       # 0.1000` }],

    ['case', {
      title: 'Hoa’s concentrated portfolio',
      text: R`Hoa, 26, has $40,000 invested: $25,000 in shares of the bank she works for, $10,000 in a Vietnamese real-estate developer recommended by her uncle, and $5,000 in cash. Her super is in her fund’s default balanced option. She says her portfolio is "diversified because I have three things".`,
      questions: [
        'Identify the sources of risk in Hoa’s portfolio, including the link between her job and her largest holding.',
        'Using the idea of systematic versus idiosyncratic risk, explain why she is taking risk that is unlikely to be rewarded.',
        'Propose a simple, low-cost diversified alternative, including a split between Australian and international shares and an emergency buffer.',
        'Given her age and horizon, is the balanced option in super appropriate? What would you want to know first?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Portfolio return is a weighted average; portfolio risk is not, because of correlation.`,
      R`\(\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho\sigma_1\sigma_2\): whenever \(\rho < 1\), diversification lowers risk for free.`,
      R`The minimum-variance mix can contain some of the riskier asset; portfolios below it are inefficient.`,
      R`Diversification removes idiosyncratic risk; systematic risk remains and is the only risk the market rewards.`,
      R`Asset allocation drives most portfolio outcomes; rebalance to keep risk where you chose it.`,
      R`Index funds win on costs; most active funds underperform after fees over long periods. DCA helps behaviour more than returns.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A portfolio holds 60% in an asset with expected return 10% and 40% in an asset with expected return 4%. What is the portfolio’s expected return, in percent?`, answer: 7.6, tol: 0.01, solution: R`\(0.6 \times 10\% + 0.4 \times 4\% = 7.6\%\).` },
    { type: 'num', level: 'Core', q: R`In the previous portfolio, the assets have standard deviations of 20% and 6% and a correlation of 0.2. What is the portfolio standard deviation, in percent?`, answer: 12.7, tol: 0.02, solution: R`\(\sigma_p^2 = 0.36(0.04) + 0.16(0.0036) + 2(0.6)(0.4)(0.2)(0.2)(0.06) = 0.0144 + 0.000576 + 0.001152 = 0.016128\). \(\sigma_p = 12.70\%\), below the weighted average of 14.4%.` },
    { type: 'num', level: 'Core', q: R`Two assets have standard deviations of 25% and 10% and a correlation of 0.4. What is their covariance? (Four decimals.)`, answer: 0.01, tol: 0.0001, solution: R`\(\text{Cov} = \rho\sigma_1\sigma_2 = 0.4 \times 0.25 \times 0.10 = 0.0100\).` },
    { type: 'num', level: 'Stretch', q: R`For the assets in exercise 2 (σ₁ = 20%, σ₂ = 6%, ρ = 0.2), what weight in asset 1 gives the minimum-variance portfolio, in percent?`, answer: 3.09, tol: 0.03, solution: R`\(w_1^* = (0.0036 - 0.2 \times 0.2 \times 0.06)/(0.04 + 0.0036 - 2 \times 0.2 \times 0.2 \times 0.06) = (0.0036 - 0.0024)/(0.0436 - 0.0048) = 0.0012/0.0388 = 3.09\%\).` },
    { type: 'num', level: 'Stretch', q: R`An equally weighted portfolio holds 25 shares, each with a standard deviation of 35%, and every pair has a correlation of 0.25. What is the portfolio standard deviation, in percent?`, answer: 18.52, tol: 0.03, solution: R`\(\sigma_p^2 = \sigma^2/N + (N-1)/N \times \rho\sigma^2 = 0.1225/25 + 0.96 \times 0.25 \times 0.1225 = 0.0049 + 0.0294 = 0.0343\). \(\sigma_p = 18.52\%\). The floor with unlimited shares is \(\sqrt{0.25} \times 35\% = 17.5\%\).` },
    { type: 'num', level: 'Core', q: R`You invest $600 a month for three months at unit prices of $5, $4 and $6. What is your average cost per unit? (Two decimals.)`, answer: 4.86, tol: 0.01, solution: R`Units: 120 + 150 + 100 = 370. Cost $1,800. Average cost \(= 1{,}800/370 = \$4.86\), below the average price of \$5.00.` },
    { type: 'num', level: 'Core', q: R`A 60/40 portfolio of $50,000 (shares/bonds) sees shares rise 20% and bonds fall 2% over a year. How many dollars of shares must be sold to restore 60/40?`, answer: 2640, tol: 1, solution: R`Shares \(30{,}000 \times 1.2 = 36{,}000\); bonds \(20{,}000 \times 0.98 = 19{,}600\); total 55,600. Target shares \(0.6 \times 55{,}600 = 33{,}360\). Sell \(36{,}000 - 33{,}360 = \$2{,}640\).` },
    { type: 'mcq', level: 'Core', q: 'Which risk remains in a very large, well-diversified share portfolio?', options: ['The risk that one company’s CEO resigns', 'The risk of a recession that lowers most companies’ profits', 'The risk of a single mine flooding', 'The risk of one product recall'], answer: 1, solution: R`Economy-wide shocks are **systematic** and cannot be diversified away. Firm-specific events cancel out across many holdings.` },
    { type: 'mcq', level: 'Core', q: 'When does combining two risky assets give no reduction in risk below the weighted average of their standard deviations?', options: ['When the correlation is 0', 'When the correlation is −1', 'When the correlation is +1', 'Never; diversification always reduces risk'], answer: 2, solution: R`With \(\rho = +1\), portfolio standard deviation equals the weighted average of the individual standard deviations. Any correlation below +1 gives some benefit.` },
    { type: 'mcq', level: 'Stretch', q: 'An active fund charges 1.0% a year and an index fund 0.1% on the same market. Before fees the average active fund earns the market return. What does Sharpe’s arithmetic imply?', options: ['The average active fund beats the index fund by 0.9%', 'The average active fund trails the index fund by about 0.9% a year after fees', 'They earn the same after fees', 'Active funds always lose money'], answer: 1, solution: R`Before costs, active investors as a group hold the market and earn its return. After costs, the average active dollar must trail the low-cost index by roughly the fee difference, here about 0.9% a year.` },
    { type: 'long', level: 'Stretch', q: 'Explain, using the variance formula for many assets, why investors are not rewarded for bearing idiosyncratic risk, and why this matters for how companies should compute their cost of capital.', answer: R`For an equally weighted portfolio of N assets, portfolio variance is \(\sigma^2/N + ((N-1)/N)\overline{\text{cov}}\). The first term, which contains each asset’s own (idiosyncratic) variance, shrinks towards zero as N grows, while the average covariance, which reflects exposure to common (systematic) shocks, remains. Because any investor can eliminate idiosyncratic risk cheaply by holding a broad portfolio or an index fund, competition among diversified investors means no one needs to be paid for bearing it: an asset that offered a premium for idiosyncratic risk would be bought by diversified investors, who do not bear that risk, until its price rose and the premium disappeared. Only systematic risk, which cannot be diversified away, commands a risk premium.

For companies, this means the discount rate for a project should reflect only its systematic risk (for example, its beta against the market), not its total volatility. A risky drug-development project whose outcome is independent of the economy may deserve a lower cost of capital than its total risk suggests. Using total risk would lead firms to reject valuable projects, a mistake you will analyse with the CAPM in Fundamentals of Business Finance.`, solution: 'Look for the variance decomposition, the competitive argument that diversifiable risk is not priced, and the implication for discount rates (beta, not total risk).' },
  ],
  glossary: [
    ['Correlation', 'A measure from −1 to +1 of how closely two returns move together.'],
    ['Covariance', 'The expected product of two assets’ deviations from their means.'],
    ['Minimum-variance portfolio', 'The combination of assets with the lowest possible risk.'],
    ['Efficient set', 'Portfolios offering the highest expected return for each level of risk.'],
    ['Idiosyncratic risk', 'Firm-specific risk that can be diversified away.'],
    ['Systematic risk', 'Economy-wide risk that cannot be diversified away and earns a risk premium.'],
    ['Strategic asset allocation', 'The long-term target mix of asset classes.'],
    ['Exchange-traded fund (ETF)', 'A fund whose units trade on an exchange, usually tracking an index.'],
  ],
  resources: ['MS_FUNDS', 'MS_SUPER', 'PV', 'MIT433', 'MIT401', 'YALE252', 'FRENCH', 'book:BKM', 'book:MALKIEL'],
};
