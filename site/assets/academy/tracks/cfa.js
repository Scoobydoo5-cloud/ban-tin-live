const R = String.raw;
export default {
  id: 'cfa', n: '07', title: 'CFA Program Roadmap', short: 'CFA', level: 'Intermediate → Advanced', color: '#9b8cff',
  blurb: 'How the CFA Program is structured, a study plan, and core modules in the exam’s style: ethics, quant, FSA and portfolio management.',
  lessons: [
    {
      id: 'cfa-map', title: 'The CFA Program: Levels, Topics & a Study Plan', mins: 20, level: 'Intermediate',
      summary: 'What each level tests, the ten topic areas, and how to plan preparation alongside a university degree.',
      objectives: ['Know the three levels and what each emphasises', 'List the ten topic areas', 'Build a realistic study timeline'],
      body: [
        ['p', 'The Chartered Financial Analyst (CFA) Program, run by CFA Institute, is a three-level, self-study programme widely regarded as the benchmark qualification for investment analysis and portfolio management. Formats, fees and rules change; always confirm details on cfainstitute.org.'],
        ['table', { head: ['Level', 'Focus', 'Style'], rows: [['I', 'Knowledge and comprehension of tools and concepts', 'Multiple-choice questions'], ['II', 'Application and analysis, especially valuation', 'Item sets built around case vignettes'], ['III', 'Synthesis: portfolio management and wealth planning', 'Item sets plus constructed-response (essay) questions, with a choice of specialised pathways in the current curriculum']] }],
        ['h', 'The ten topic areas'],
        ['list', ['Ethical and Professional Standards', 'Quantitative Methods', 'Economics', 'Financial Statement Analysis', 'Corporate Issuers', 'Equity Investments', 'Fixed Income', 'Derivatives', 'Alternative Investments', 'Portfolio Management']],
        ['h', 'A study plan that works for students'],
        ['list', ['Budget roughly 300 hours per level; many candidates report needing that much or more.', 'Six months at 12–15 hours a week, finishing the curriculum two months before the exam to leave time for mock exams.', 'Do questions from day one: the exam rewards speed and precision, not just understanding.', 'Ethics is weighted meaningfully and borderline scores can depend on it, so never leave it to the last week.', 'This academy maps to the topics: Foundations and Economics (Level I), Corporate, Investments, Fixed Income and Derivatives (Levels I–II), Portfolio Management (Level III).']],
        ['note', 'Check eligibility rules for university students on the official site: candidates can register while still studying, subject to CFA Institute’s current requirements.'],
      ],
      exercises: [
        { q: 'Which level is organised around case vignettes (item sets) with a strong valuation focus?', type: 'mcq', options: ['Level I', 'Level II', 'Level III'], answer: 1, solution: 'Level II tests application through vignettes, especially equity and fixed-income valuation and financial statement analysis.' },
        { q: 'Which of these is NOT one of the CFA topic areas?', type: 'mcq', options: ['Alternative Investments', 'Corporate Issuers', 'Marketing Management'], answer: 2, solution: 'Marketing is not part of the curriculum.' },
      ],
      resources: ['CFA', 'CFA_PL', 'CFA_ETH'],
    },
    {
      id: 'ethics', title: 'Ethics & Professional Standards', mins: 30, level: 'Intermediate',
      summary: 'The Code of Ethics, the seven Standards of Professional Conduct and how to reason through a case.',
      objectives: ['Name the seven Standards', 'Apply the material nonpublic information rule', 'Use a decision process for grey areas'],
      body: [
        ['p', 'The Code of Ethics asks members to act with integrity, place clients’ interests first, use reasonable care, practise and encourage others to practise ethically, promote the integrity of capital markets and maintain competence. The Standards make that concrete:'],
        ['table', { head: ['Standard', 'Covers'], rows: [['I. Professionalism', 'Knowledge of the law, independence and objectivity, misrepresentation, misconduct, competence'], ['II. Integrity of Capital Markets', 'Material nonpublic information, market manipulation'], ['III. Duties to Clients', 'Loyalty, fair dealing, suitability, performance presentation, confidentiality'], ['IV. Duties to Employers', 'Loyalty, additional compensation, supervisors'], ['V. Investment Analysis', 'Diligence and reasonable basis, communication, record retention'], ['VI. Conflicts of Interest', 'Disclosure, priority of transactions, referral fees'], ['VII. Responsibilities as a Member or Candidate', 'Conduct in the program, use of the CFA designation']] }],
        ['example', { title: 'A case in exam style', steps: ['An analyst overhears the CFO of a listed company at a café saying a large contract has been cancelled; nothing has been announced.', 'The information is material (it would move the price) and nonpublic.', 'Standard II(A): the analyst must not trade or cause others to trade on it, and should encourage public disclosure through proper channels.'], answer: 'Correct action: do not act on it; inform compliance.' }],
        ['note', 'When in doubt: identify the stakeholders, the relevant Standard, whether the information is material and public, then choose the action that keeps client interests and market integrity first. Disclosure resolves many conflicts; it never makes misconduct acceptable.'],
      ],
      exercises: [
        { q: 'A portfolio manager buys a stock for her own account before executing a large client order in it. Which Standard is most directly violated?', type: 'mcq', options: ['VI(B) Priority of Transactions', 'V(C) Record Retention', 'I(C) Misrepresentation'], answer: 0, solution: 'Client and employer transactions must take priority over personal ones (front-running).' },
        { q: 'Claiming “CFA Level II” on a CV after passing Level I is…', type: 'mcq', options: ['Acceptable if you have registered for Level II', 'A violation: you may only state levels passed and current candidacy accurately', 'Acceptable for students'], answer: 1, solution: 'Standard VII(B) requires accurate references to the program; you can say you passed Level I and are a Level II candidate.' },
      ],
      resources: ['CFA_ETH', 'CFA', 'CFA_PL'],
    },
    {
      id: 'quant-cfa', title: 'Quantitative Methods: Hypothesis Testing & Regression', mins: 35, level: 'Intermediate',
      summary: 'Testing whether an average return is really different from zero, and reading a regression output.',
      objectives: ['Run a t-test on a mean return', 'Interpret coefficients, t-statistics and R²', 'Recognise common regression pitfalls'],
      body: [
        ['math', R`t = \frac{\bar x - \mu_0}{s / \sqrt{n}}`],
        ['example', { title: 'Does a strategy beat zero?', steps: ['36 monthly returns, mean 1.2%, standard deviation 4%', R`\(t = 1.2 / (4 / \sqrt{36}) = 1.8\)`, 'Two-tailed 5% critical value with 35 degrees of freedom ≈ 2.03'], answer: 'Fail to reject H₀: μ = 0. Three years of 1.2% a month is not enough evidence, given 4% monthly volatility.' }],
        ['h', 'Simple linear regression'],
        ['math', R`R_{i,t} = \alpha + \beta R_{m,t} + \varepsilon_t \qquad \hat\beta = \frac{\text{Cov}(R_i, R_m)}{\text{Var}(R_m)}`],
        ['list', ['Coefficient t-stat = estimate / standard error; |t| > ~2 is significant at 5% in large samples.', 'R² = share of variance explained; a stock beta regression often has R² of only 0.2–0.4.', 'Pitfalls: heteroskedasticity, serial correlation, multicollinearity, and above all confusing correlation with causation.']],
        ['note', 'Statistical significance is not economic significance. A tiny effect can be “significant” with enough data, and a large effect can be insignificant with little data.'],
      ],
      exercises: [
        { q: '49 observations, mean return 0.8%, standard deviation 3%. t-statistic for H₀: mean = 0?', type: 'num', answer: 1.867, tol: 0.005, solution: R`\(t = 0.8 / (3/7) = 1.867\): not significant at 5% two-tailed.` },
        { q: 'A regression of a stock on the market has R² = 0.25. This means…', type: 'mcq', options: ['25% of the stock’s return variance is explained by the market', 'The stock has a beta of 0.25', 'The regression is invalid'], answer: 0, solution: 'R² measures explained variance, not the slope.' },
      ],
      resources: ['MIT18650', 'SEEING', 'CFA', 'book:WOOL'],
    },
    {
      id: 'fsa', title: 'Financial Statement Analysis: Earnings Quality & Cash', mins: 30, level: 'Intermediate',
      summary: 'Working-capital days, cash conversion and the red flags that separate real profits from accounting ones.',
      objectives: ['Compute DSO, DIO, DPO and the cash conversion cycle', 'Assess earnings quality with cash flow', 'Know common manipulation signals'],
      body: [
        ['math', R`DSO = \frac{\text{Receivables}}{\text{Revenue}} \times 365 \quad DIO = \frac{\text{Inventory}}{\text{COGS}} \times 365 \quad CCC = DSO + DIO - DPO`],
        ['example', { title: 'Working capital and cash', steps: ['Receivables 90, annual revenue 730 → DSO = 45 days', 'Net income 100 but operating cash flow 60 → CFO/NI = 0.6'], answer: 'A company that sells on longer credit to hit revenue targets shows rising DSO and a falling CFO/NI ratio: classic signs of lower earnings quality.' }],
        ['h', 'Red flags'],
        ['list', ['Revenue growing much faster than cash collections (rising DSO).', 'Inventory building faster than sales (rising DIO).', 'Large one-off gains inside operating profit (asset sales, revaluations).', 'Frequent “adjusted” metrics that exclude recurring costs.', 'Capitalising costs that peers expense.']],
        ['note', 'The stock dossiers flag examples: GMD’s 2026 profit jump was largely a one-off divestment gain, so core earnings needed separate analysis.'],
      ],
      exercises: [
        { q: 'Inventory 120, cost of goods sold 876 per year. Days inventory outstanding?', type: 'num', answer: 50, tol: 0.05, solution: '120 / 876 × 365 = 50 days.' },
        { q: 'DSO 45, DIO 50, DPO 30. Cash conversion cycle (days)?', type: 'num', answer: 65, tol: 0.01, solution: '45 + 50 − 30 = 65 days.' },
      ],
      resources: ['MIT535', 'IFRS', 'CFA', 'book:KOLLER'],
    },
    {
      id: 'pm', title: 'Portfolio Management: the IPS & Asset Allocation', mins: 30, level: 'Advanced',
      summary: 'Writing an investment policy statement and turning objectives and constraints into a strategic asset allocation.',
      objectives: ['Draft the objectives and constraints of an IPS', 'Separate ability from willingness to take risk', 'Distinguish strategic and tactical allocation'],
      body: [
        ['p', 'An investment policy statement (IPS) is the contract between an investor and a manager (or yourself). Its core is two objectives and five constraints, often remembered as “RR TTLLU”.'],
        ['table', { head: ['Element', 'Question'], rows: [['Return', 'What return is required, and what is desired?'], ['Risk', 'Ability (horizon, wealth, income stability) vs willingness (attitude)'], ['Time horizon', 'When is money needed? Single or multi-stage?'], ['Taxes', 'Which accounts, what tax rates?'], ['Liquidity', 'Upcoming cash needs, emergency fund'], ['Legal & regulatory', 'Trust law, superannuation rules, restrictions'], ['Unique circumstances', 'Ethical preferences, concentrated holdings, home-country bias']] }],
        ['example', { title: 'A 21-year-old finance student', steps: ['Horizon 40+ years, stable part-time income, small emergency fund needed → high ability to take risk', 'Willingness: moderate after seeing a 30% drawdown in a simulation', 'Strategic allocation: e.g. 80% diversified equities across home and global markets, 20% bonds/cash; rebalance yearly'], answer: 'When ability and willingness disagree, the more conservative one usually governs. This is an educational illustration, not personal advice.' }],
        ['list', ['Strategic asset allocation (SAA): the long-run policy mix, the main driver of long-term returns.', 'Tactical asset allocation (TAA): deliberate short-term deviations; costly if not skilled.', 'Rebalancing: sells what rose, buys what fell, enforcing “buy low, sell high”.']],
        ['note', 'JayV’s simulated fund is a toy IPS: long-only, maximum 25% per name, fixed rules and monthly rebalancing. Rules exist to protect you from your own biases.'],
      ],
      exercises: [
        { q: 'An investor has a long horizon and secure income but panics at small losses. Their overall risk tolerance is best described as…', type: 'mcq', options: ['High, because ability dominates', 'Moderate to low, because the lower of ability and willingness governs', 'Cannot be determined'], answer: 1, solution: 'Advisers typically defer to the more conservative of the two and educate the client over time.' },
        { q: 'Rebalancing a 60/40 portfolio after a stock rally means…', type: 'mcq', options: ['Buying more stocks', 'Selling some stocks and buying bonds', 'Doing nothing until the next rally'], answer: 1, solution: 'Stocks have drifted above 60%, so you trim them back to target.' },
      ],
      resources: ['CFA', 'MONEYSMART', 'INVESTOR', 'book:BKM', 'book:GRAHAM'],
    },
  ],
};
