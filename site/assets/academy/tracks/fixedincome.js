const R = String.raw;
export default {
  id: 'fixedincome', n: '04', title: 'Fixed Income', short: 'Fixed income', level: 'Intermediate', color: '#7fb2ff',
  blurb: 'Bond prices and yields, duration and convexity, the term structure and credit risk: the market that sets the price of money.',
  lessons: [
    {
      id: 'bonds', title: 'Bond Pricing & Yield to Maturity', mins: 30, level: 'Intermediate',
      summary: 'A bond is an annuity plus a lump sum. Its price and its yield are two views of the same thing.',
      objectives: ['Price a coupon bond from its yield', 'Solve for yield to maturity', 'Explain why prices and yields move in opposite directions'],
      body: [
        ['math', R`P = \sum_{t=1}^{n} \frac{C}{(1+y)^t} + \frac{F}{(1+y)^n}`],
        ['example', { title: '5-year bond, 6% annual coupon, face 1,000, yield 7%', steps: [R`Coupons: \(60 \times \frac{1 - 1.07^{-5}}{0.07} = 246.01\)`, R`Face: \(1{,}000 / 1.07^5 = 712.99\)`, R`\(P = 959.00\): a discount bond, because the coupon (6%) is below the market yield (7%)`], answer: 'Current yield = 60 / 959.00 = 6.26%. Yield to maturity (7%) also counts the pull-to-par gain from 959 to 1,000.' }],
        ['h', 'Premium, par, discount'],
        ['list', ['Coupon rate > yield → price above par (premium).', 'Coupon rate = yield → price at par.', 'Coupon rate < yield → price below par (discount).']],
        ['p', 'Yield to maturity is the IRR of buying the bond and holding it to maturity, assuming coupons are reinvested at the same yield. For semi-annual bonds (US Treasuries), use half the coupon and half the yield per period.'],
        ['note', 'When the US 10-year yield rose from about 4.2% to over 5.1% in 2026, existing long bonds lost roughly 7–8% of their price, as the next lesson on duration explains.'],
        ['lab', 'bond'],
      ],
      exercises: [
        { q: '10-year bond, 5% coupon paid semi-annually, face 1,000, yield 4.5% (semi-annual compounding). Price?', type: 'num', answer: 1039.91, tol: 0.1, solution: R`20 periods of 25, discounted at 2.25%: \(P = 25 \times \frac{1 - 1.0225^{-20}}{0.0225} + 1000 / 1.0225^{20} = 1{,}039.91\).` },
        { q: 'A 3-year, 4% annual-coupon bond trades at 950. Yield to maturity (%)?', type: 'num', answer: 5.866, tol: 0.01, solution: 'Solve 40/(1+y) + 40/(1+y)² + 1040/(1+y)³ = 950 → y ≈ 5.87%.' },
      ],
      resources: ['TREASURY', 'FRED', 'MIT401', 'book:FAB'],
    },
    {
      id: 'duration', title: 'Duration & Convexity', mins: 35, level: 'Intermediate',
      summary: 'How much a bond’s price moves when yields move, to first and second order.',
      objectives: ['Compute Macaulay and modified duration', 'Estimate price changes with duration and convexity', 'Explain why long, low-coupon bonds are the most rate-sensitive'],
      body: [
        ['math', R`D_{Mac} = \frac{1}{P}\sum_{t=1}^{n} t \cdot \frac{CF_t}{(1+y)^t} \qquad D_{Mod} = \frac{D_{Mac}}{1+y}`],
        ['math', R`\frac{\Delta P}{P} \approx -D_{Mod}\,\Delta y + \tfrac{1}{2}\,\text{Convexity}\,(\Delta y)^2`],
        ['example', { title: 'The 5-year, 6% bond at 7% (price 959.00)', steps: ['Macaulay duration = 4.452 years', 'Modified duration = 4.452 / 1.07 = 4.161', 'Convexity = 22.41', R`Yield +50 bp: \(\Delta P \approx (-4.161 \times 0.005 + \tfrac{1}{2} \times 22.41 \times 0.005^2) \times 959.00 = -19.68\)`], answer: 'Repricing exactly at 7.5% gives −19.69: duration plus convexity is almost perfect for small moves.' }],
        ['list', ['A zero-coupon bond’s Macaulay duration equals its maturity.', 'Longer maturity → higher duration. Lower coupon → higher duration.', 'Convexity is good for the holder: prices rise more when yields fall than they drop when yields rise.']],
        ['note', 'Banks, insurers and pension funds match the duration of assets and liabilities (immunisation) so that a rate move changes both sides equally.'],
      ],
      exercises: [
        { q: 'A bond has modified duration 7.2. Yields rise 25 bp. Approximate price change (%)?', type: 'num', answer: -1.8, tol: 0.01, solution: '−7.2 × 0.0025 = −1.8%.' },
        { q: 'Which is most sensitive to interest rates?', type: 'mcq', options: ['2-year bond, 8% coupon', '10-year bond, 8% coupon', '10-year zero-coupon bond'], answer: 2, solution: 'Longest maturity and no coupons: all value sits at year 10, so duration = 10.' },
      ],
      resources: ['MIT401', 'TREASURY', 'book:FAB', 'book:BKM'],
    },
    {
      id: 'termstructure', title: 'Spot Rates, Forward Rates & the Yield Curve', mins: 30, level: 'Advanced',
      summary: 'Bootstrapping zero-coupon rates, implied forwards, and what the shape of the curve may say about the economy.',
      objectives: ['Bootstrap spot rates from coupon bonds', 'Compute implied forward rates', 'Interpret normal, flat and inverted curves'],
      body: [
        ['math', R`(1 + s_2)^2 = (1 + s_1)(1 + f_{1,1})`],
        ['p', R`If the 1-year spot rate is 4% and the 2-year spot is 4.6%, the market implies a one-year rate one year from now of \(1.046^2 / 1.04 - 1 = 5.20\%\).`],
        ['example', { title: 'Bootstrapping the 2-year spot rate', steps: ['A 2-year 5% annual-coupon bond trades at 100.2; the 1-year spot is 4%', R`\(100.2 = \frac{5}{1.04} + \frac{105}{(1+s_2)^2}\)`, R`\((1+s_2)^2 = 105 / 95.392\), so \(s_2 = 4.915\%\)`], answer: 'Repeat with longer bonds to build the whole zero curve, which is then used to price any cash-flow stream.' }],
        ['h', 'Shapes and theories'],
        ['list', ['Expectations theory: long rates average expected future short rates.', 'Liquidity premium: investors demand extra for tying money up longer, so curves slope up on average.', 'An inverted curve (short above long) has preceded most US recessions, because markets expect the central bank to cut.']],
        ['note', 'In late 2026 the US curve steepened with the 10-year near 5.2% while the Fed funds target sat at 3.75–4.00%: markets priced sticky inflation and a larger term premium.'],
      ],
      exercises: [
        { q: 'The 1-year spot rate is 4.5% and the 3-year spot is 5%. What 2-year rate, starting one year from now, is implied (% per year)?', type: 'num', answer: 5.251, tol: 0.01, solution: R`\((1.05^3 / 1.045)^{1/2} - 1 = 5.25\%\).` },
        { q: 'Under pure expectations theory, an upward-sloping curve means the market expects short rates to…', type: 'mcq', options: ['Rise', 'Fall', 'Stay flat'], answer: 0, solution: 'Long rates are the average of expected short rates, so higher long rates imply rising expected short rates.' },
      ],
      resources: ['TREASURY', 'FRED', 'MIT18S096', 'book:FAB'],
    },
    {
      id: 'credit', title: 'Credit Risk & Spreads', mins: 25, level: 'Intermediate',
      summary: 'Default probability, loss given default and the spread investors demand over government bonds.',
      objectives: ['Compute expected loss', 'Relate spreads to default risk', 'Understand ratings and their limits'],
      body: [
        ['math', R`EL = PD \times LGD \times EAD \qquad \text{spread} \approx PD \times LGD`],
        ['example', { title: 'A $1m loan', steps: ['Probability of default 2% a year; recovery 40% → LGD 60%', R`\(EL = 0.02 \times 0.60 \times 1{,}000{,}000 = \$12{,}000\)`, R`Break-even spread ≈ \(0.02 \times 0.60 = 1.2\%\)`], answer: 'Actual spreads are usually wider than expected loss because investors also demand compensation for default risk being systematic (it clusters in recessions) and for illiquidity.' }],
        ['list', ['Ratings (AAA to D) summarise credit quality; the investment-grade line is BBB−/Baa3.', 'Credit spreads widen in recessions and crises, often before equities fall.', 'For banks, non-performing loan ratios and provisions are the lead indicators of credit stress (see HDB and STB in the stock city).']],
        ['note', 'Treat ratings as opinions, not guarantees: many AAA-rated mortgage securities defaulted in 2008.'],
      ],
      exercises: [
        { q: 'A bond trades at a 1.8% credit spread; assume LGD of 55%. Implied annual default probability (%)?', type: 'num', answer: 3.27, tol: 0.02, solution: 'PD ≈ spread / LGD = 1.8% / 0.55 = 3.27%.' },
        { q: 'Why are observed spreads usually larger than PD × LGD?', type: 'mcq', options: ['Rating agencies add fees', 'Investors demand premia for systematic default risk and illiquidity', 'Governments tax corporate bonds'], answer: 1, solution: 'Defaults cluster in bad times, when losses hurt most; illiquidity adds a further premium.' },
      ],
      resources: ['BIS', 'FRED', 'MIT450', 'book:FAB'],
    },
  ],
};
