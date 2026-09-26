const R = String.raw;
export default {
  id: 'economics', n: '06', title: 'Economics for Investors', short: 'Economics', level: 'Beginner → Intermediate', color: '#d9a654',
  blurb: 'Micro and macro foundations, central banks, fiscal policy and exchange rates, applied to Vietnam, Australia and the US.',
  lessons: [
    {
      id: 'micro', title: 'Microeconomics: Supply, Demand & Elasticity', mins: 25, level: 'Beginner',
      summary: 'Prices clear markets; elasticity tells you who has pricing power and what happens to revenue when prices change.',
      objectives: ['Read supply and demand shifts', 'Compute price elasticity of demand', 'Link market structure to margins'],
      body: [
        ['math', R`\varepsilon = \frac{\%\Delta Q}{\%\Delta P}`],
        ['p', 'If demand is inelastic (|ε| < 1), raising prices raises revenue; if elastic (|ε| > 1), it lowers revenue. Pricing power is a core part of a company’s competitive advantage, and it is why investors love inelastic products.'],
        ['example', { title: 'A retailer raises prices 10% and volume falls 4%', steps: ['ε = −4% / 10% = −0.4 (inelastic)', 'Revenue change ≈ 1.10 × 0.96 − 1 = +5.6%'], answer: 'The retailer has pricing power. A commodity producer rarely does: its customers switch at the first price rise.' }],
        ['table', { head: ['Structure', 'Firms', 'Pricing power', 'Example'], rows: [['Perfect competition', 'Many', 'None', 'Rice farming'], ['Monopolistic competition', 'Many, differentiated', 'Some', 'Restaurants, apparel'], ['Oligopoly', 'Few', 'Significant', 'Airlines, telecoms, banks'], ['Monopoly', 'One', 'High (regulated)', 'Utilities, exchanges']] }],
        ['note', 'When you read that a company’s margins expanded, ask whether it came from pricing power, mix, or input costs falling. Only the first is durable.'],
      ],
      exercises: [
        { q: 'Price rises 5% and quantity demanded falls 15%. Elasticity?', type: 'num', answer: -3, tol: 0.01, solution: '−15% / 5% = −3: highly elastic, so revenue falls.' },
        { q: 'Demand for a product is inelastic. A 10% price increase will…', type: 'mcq', options: ['Increase total revenue', 'Decrease total revenue', 'Leave revenue unchanged'], answer: 0, solution: 'Quantity falls by less than 10%, so price × quantity rises.' },
      ],
      resources: ['MIT1401', 'OS_ECO', 'KHAN', 'book:MANKIW'],
    },
    {
      id: 'macro', title: 'Macroeconomics: GDP, Inflation & Unemployment', mins: 30, level: 'Beginner',
      summary: 'The three numbers central banks watch, how they are measured and how they move markets.',
      objectives: ['Break GDP into its expenditure components', 'Compute inflation and real growth', 'Read the business cycle and Okun’s law'],
      body: [
        ['math', R`GDP = C + I + G + (X - M)`],
        ['p', 'Consumption dominates rich economies like the US and Australia; investment and net exports matter more for Vietnam, whose exports exceed 80% of GDP. Real GDP strips out inflation; nominal GDP does not.'],
        ['math', R`\pi_t = \frac{CPI_t}{CPI_{t-1}} - 1 \qquad u = \frac{\text{unemployed}}{\text{labour force}}`],
        ['example', { title: 'Quick calculations', steps: ['CPI rises from 125 to 131 → inflation 4.8%', '1.2 million unemployed in a labour force of 24 million → 5.0% unemployment'], answer: 'Vietnam’s August 2026 CPI was +4.89% year on year; Australia’s monthly CPI was 3.5% in July; US PCE inflation 3.7%. All above target, which is why rates rose in 2026.' }],
        ['list', ['Okun’s law: each point of unemployment above its natural rate costs roughly 2 points of GDP (a rule of thumb).', 'Phillips curve: in the short run, tight labour markets push inflation up.', 'Leading indicators (PMIs, jobless claims, yield curve) move before GDP; GDP is a lagging, revised number.']],
        ['note', 'Markets react to surprises relative to forecasts, not to the level of the data. A “strong” jobs report that matched expectations moves nothing.'],
      ],
      exercises: [
        { q: 'Nominal GDP grows 7% while inflation is 4.5%. Real GDP growth (%, exact)?', type: 'num', answer: 2.392, tol: 0.01, solution: '1.07 / 1.045 − 1 = 2.39%.' },
        { q: 'Which component of GDP is usually largest in the US?', type: 'mcq', options: ['Government spending', 'Household consumption', 'Net exports'], answer: 1, solution: 'Consumption is roughly two-thirds of US GDP; US net exports are negative.' },
      ],
      resources: ['MIT1402', 'OS_ECO', 'FRED', 'ABS', 'WB', 'book:MANKIW'],
    },
    {
      id: 'monetary', title: 'Monetary Policy: Fed, RBA, SBV & the Taylor Rule', mins: 35, level: 'Intermediate',
      summary: 'How central banks set interest rates, how policy reaches markets, and a simple rule to judge whether policy is tight or loose.',
      objectives: ['Explain the transmission mechanism', 'Apply the Taylor rule', 'Compare the mandates and tools of the Fed, RBA and SBV'],
      body: [
        ['p', 'Central banks steer a short-term interest rate: the federal funds rate (Fed), the cash rate (RBA) or policy rates such as the refinancing rate (SBV). Changes pass through to bank lending rates, asset prices, the exchange rate and expectations, and eventually to spending and inflation, with lags of one to two years.'],
        ['h', 'The Taylor rule'],
        ['math', R`i = r^* + \pi + 0.5\,(\pi - \pi^*) + 0.5\,(y - y^*)`],
        ['example', { title: 'A rough check on US policy in 2026', steps: [R`Neutral real rate \(r^* = 1\%\), inflation \(\pi = 3.7\%\) (PCE), target \(\pi^* = 2\%\), output gap +0.5%`, R`\(i = 1 + 3.7 + 0.85 + 0.25 = 5.8\%\)`, 'Actual target range: 3.75–4.00%'], answer: 'By this simple rule, policy looks loose, which helps explain why markets priced further hikes. Different r* or inflation measures change the answer: treat it as a benchmark, not a verdict.' }],
        ['table', { head: ['', 'Fed (US)', 'RBA (Australia)', 'SBV (Vietnam)'], rows: [['Mandate', 'Maximum employment, stable prices', 'Price stability (2–3% target), full employment', 'Monetary stability, supporting growth'], ['Main tool', 'Fed funds target range', 'Cash rate target', 'Policy rates, credit growth targets, FX management'], ['Meetings', '8 per year (FOMC)', '8 per year', 'As needed']] }],
        ['note', 'Vietnam also manages the dong against the dollar through a central rate with a trading band, so US rate moves and the dollar feed directly into SBV decisions.'],
      ],
      exercises: [
        { q: R`With \(r^* = 1\%\), inflation 3.5%, target 2.5%, output gap −1%, what rate does the Taylor rule suggest (%)?`, type: 'num', answer: 4.5, tol: 0.01, solution: '1 + 3.5 + 0.5(1.0) + 0.5(−1) = 4.5%.' },
        { q: 'A surprise rate hike most likely causes, on the day…', type: 'mcq', options: ['Bond prices fall and the currency strengthens', 'Bond prices rise and the currency weakens', 'No change until inflation data'], answer: 0, solution: 'Higher expected rates lower bond prices and attract capital into the currency.' },
      ],
      resources: ['FED_MP', 'FOMC', 'RBA_MP', 'RBA_EDU', 'SBV', 'MIT1402'],
    },
    {
      id: 'fiscal', title: 'Fiscal Policy, Multipliers & Public Debt', mins: 25, level: 'Intermediate',
      summary: 'Government spending and taxes, the multiplier, and the arithmetic of debt sustainability.',
      objectives: ['Compute a simple spending multiplier', 'Apply the debt-dynamics equation', 'Recognise crowding out'],
      body: [
        ['math', R`\text{multiplier} = \frac{1}{1 - MPC} \qquad \text{with taxes: } \frac{1}{1 - MPC(1-t)}`],
        ['p', 'With a marginal propensity to consume of 0.75, each dollar of government spending can raise output by up to 4 dollars in the simple model; with a 25% tax rate, by about 2.29. Real-world multipliers are smaller, especially when the central bank offsets fiscal stimulus by raising rates (crowding out).'],
        ['h', 'Debt dynamics'],
        ['math', R`\Delta d \approx \frac{r - g}{1 + g}\,d - pb`],
        ['example', { title: 'Debt 90% of GDP, interest rate 5%, nominal growth 3%, primary deficit 1% of GDP', steps: [R`\(\Delta d = \frac{0.05 - 0.03}{1.03} \times 0.90 + 0.01 = 2.75\) points of GDP a year`], answer: 'When interest rates exceed growth, debt ratios rise on autopilot unless the government runs primary surpluses. Rising bond yields make this arithmetic harder, feeding back into term premia.' }],
        ['note', 'US government funding deadlines and deficits are why term premia matter for the 10-year yield: more supply of bonds needs a higher yield to clear.'],
      ],
      exercises: [
        { q: 'MPC = 0.8 in a closed economy with no taxes. Simple spending multiplier?', type: 'num', answer: 5, tol: 0.01, solution: '1 / (1 − 0.8) = 5.' },
        { q: 'If r < g and the primary balance is zero, the debt-to-GDP ratio…', type: 'mcq', options: ['Rises', 'Falls', 'Stays constant'], answer: 1, solution: 'With (r − g) negative, the first term is negative, so the ratio shrinks over time.' },
      ],
      resources: ['MIT1402', 'OS_ECO', 'FRED', 'book:MANKIW'],
    },
    {
      id: 'fx', title: 'Exchange Rates: Interest Rate Parity & PPP', mins: 30, level: 'Intermediate',
      summary: 'Why forward exchange rates follow interest differentials, and how inflation shapes currencies in the long run.',
      objectives: ['Price a currency forward with covered interest parity', 'Apply relative purchasing power parity', 'Read AUD/USD and USD/VND quotes correctly'],
      body: [
        ['p', 'Quotes are “base/quote”: AUD/USD 0.7026 means 1 Australian dollar costs 0.7026 US dollars; USD/VND 25,974 means 1 US dollar costs 25,974 dong.'],
        ['math', R`F = S \times \frac{1 + i_{\text{quote}}}{1 + i_{\text{base}}}`],
        ['example', { title: 'One-year AUD/USD forward', steps: ['Spot 0.7026; USD rate 3.9%; AUD rate 4.35%', R`\(F = 0.7026 \times 1.039 / 1.0435 = 0.6996\)`], answer: 'The higher-yielding currency (AUD) trades at a forward discount. Covered interest parity is an arbitrage condition and holds closely in liquid markets.' }],
        ['h', 'Purchasing power parity'],
        ['math', R`\frac{S_1}{S_0} \approx \frac{1 + \pi_{\text{quote}}}{1 + \pi_{\text{base}}}`],
        ['p', 'If Vietnam’s inflation is 4.5% and US inflation 3%, relative PPP suggests USD/VND drifting from 25,974 to about 26,352 over a year. PPP works poorly over months but reasonably over many years.'],
        ['note', 'Uncovered interest parity (high-yield currencies should depreciate) often fails in the short run: that failure is the “carry trade”, profitable most of the time and painful in crises.'],
      ],
      exercises: [
        { q: 'USD/VND spot 25,974; VND interest 5%, USD interest 4%. One-year forward (VND per USD)?', type: 'num', answer: 26223.75, tol: 1, solution: '25,974 × 1.05 / 1.04 = 26,223.75.' },
        { q: 'AUD/USD rises from 0.70 to 0.72. The Australian dollar has…', type: 'mcq', options: ['Appreciated', 'Depreciated', 'Not changed in value'], answer: 0, solution: 'Each AUD now buys more USD.' },
      ],
      resources: ['MIT1454', 'RBA_EDU', 'SBV', 'BIS', 'FRED'],
    },
  ],
};
