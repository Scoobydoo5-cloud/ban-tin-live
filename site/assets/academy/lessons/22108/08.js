const R = String.raw;
export default {
  id: '22108-08', subject: '22108', title: 'Reporting quality, ethics and sustainability reporting', mins: 75, level: 'Intermediate',
  summary: 'When accounts can be trusted and when they cannot: earnings quality, the techniques and motives of earnings management, famous frauds and what they teach, detecting red flags with accruals, the role and limits of audit, professional ethics and whistleblowing, corporate governance, and Australia’s new mandatory climate-related sustainability reporting.',
  objectives: [
    'Define earnings quality and assess it using persistence and cash backing',
    'Describe accrual-based and real earnings management techniques and the incentives behind them',
    'Draw lessons from major accounting scandals in Australia and abroad',
    'Use the accruals ratio and other red flags to screen for low-quality earnings',
    'Explain the auditor’s role, types of audit opinion and key audit matters',
    'Describe professional ethics, governance and Australia’s climate-related reporting under AASB S2',
  ],
  body: [
    ['h', 'Not all profits are equal'],
    ['p', R`Two companies each report $100 million of profit. One earns it from recurring sales to loyal customers, collected in cash within 30 days. The other earns it from a one-off asset sale, a change in depreciation estimates and a jump in receivables from customers on generous terms. An analyst should value the first much more highly. **Earnings quality** describes how well reported earnings reflect the company’s true, sustainable economic performance. High-quality earnings are **persistent** (likely to recur), **backed by cash** and produced with **neutral** accounting choices.`],

    ['h', 'Earnings management'],
    ['p', R`Managers have legitimate discretion in accounting estimates, and some use it to shape results. **Earnings management** ranges from aggressive but legal choices to outright fraud.`],
    ['table', {
      caption: 'Common techniques',
      head: ['Technique', 'How it works', 'Effect'],
      rows: [
        ['Revenue acceleration', 'Channel stuffing, bill-and-hold, recognising multi-year contracts upfront', 'Raises current revenue at the expense of future periods'],
        ['Capitalising expenses', 'Recording operating costs as assets (software, customer acquisition, maintenance)', 'Raises profit and operating cash flow now; depreciation later'],
        ['Changing estimates', 'Longer useful lives, higher residual values, lower bad-debt or warranty provisions', 'Raises profit quietly'],
        ['Cookie-jar reserves', 'Over-provisioning in good years and releasing provisions in bad years', 'Smooths earnings, hiding volatility'],
        ['Big bath', 'Taking huge write-offs in one bad year (often under a new CEO) to make future years look better', 'Depresses one year, flatters the following ones'],
        ['Off-balance-sheet financing', 'Special-purpose vehicles, guarantees, supply-chain finance', 'Hides debt and risk'],
        ['Real earnings management', 'Cutting R&D, maintenance or advertising, or discounting to boost quarter-end sales', 'Real economic cost to the business, not just accounting'],
      ],
    }],
    ['p', R`The **incentives** are predictable: bonuses tied to profit targets, share options, avoiding loan covenant breaches, meeting analysts’ forecasts, raising capital at a higher price (for example before an IPO) and protecting careers. Research consistently finds more earnings just above zero and just above the previous year’s earnings than chance would predict, a fingerprint of managers nudging results over thresholds.`],

    ['h', 'Lessons from scandals'],
    ['table', {
      caption: 'Selected accounting failures',
      head: ['Case', 'Where and when', 'What happened', 'Lesson'],
      rows: [
        ['HIH Insurance', 'Australia, 2001', 'Australia’s second-largest general insurer collapsed with a deficiency of about $5.3 billion after years of under-reserving for claims and poor governance; the Royal Commission led to criminal convictions', 'Provisions are estimates that can hide insolvency; led to CLERP 9 reforms of audit and disclosure'],
        ['Enron', 'US, 2001', 'Used special-purpose entities to hide debt and inflate profit; its auditor Arthur Andersen collapsed', 'Off-balance-sheet structures and auditor independence; led to the Sarbanes–Oxley Act'],
        ['WorldCom', 'US, 2002', 'Capitalised billions of dollars of ordinary line costs as assets', 'Capitalisation games flatter both profit and operating cash flow'],
        ['Wirecard', 'Germany, 2020', 'About €1.9 billion of cash supposedly held in Asian trust accounts did not exist', 'Verify cash with third parties; short-sellers and journalists raised red flags for years'],
        ['Corporate bond and banking scandals', 'Vietnam, 2022–24', 'Cases involving Tân Hoàng Minh and the Vạn Thịnh Phát group exposed misleading bond issuance and massive misappropriation linked to a bank, leading to major criminal trials', 'Related-party transactions, weak disclosure and governance in fast-growing credit markets'],
      ],
    }],
    ['note', R`A recurring theme is that the warning signs were visible in the numbers long before the collapse: profits not turning into cash, rapid growth in receivables or unusual assets, complex related-party structures, frequent changes of auditor or CFO, and executives who attacked critics instead of answering questions.`],

    ['h', 'Screening for low-quality earnings'],
    ['p', R`The simplest screen compares profit with operating cash flow. The **accruals ratio** measures how much of profit is non-cash:`],
    ['math', R`\text{Accruals ratio} = \frac{\text{Net profit} - \text{Operating cash flow}}{\text{Average total assets}}`, 'The accruals ratio equals net profit minus operating cash flow, divided by average total assets.'],
    ['p', R`A company with profit of $120 million, operating cash flow of $40 million and average assets of $1,000 million has an accruals ratio of 8%: a large share of its profit is accruals. A peer with profit of $95 million and operating cash flow of $110 million on assets of $900 million has −1.7%. Research since Richard Sloan’s 1996 study has found that high-accrual firms tend to have lower future earnings and returns, as accruals reverse.`],
    ['list', [
      R`**Receivables or inventory growing faster than revenue** (days sales outstanding or inventory days rising).`,
      R`**Rising "other" assets**, capitalised costs or intangibles without clear explanation.`,
      R`**Declining provisions** (warranty, bad debts) as a share of sales while conditions worsen.`,
      R`**Large gap between underlying and statutory profit**, with "one-offs" every year.`,
      R`**Frequent changes in accounting policies, estimates, auditors or CFOs.**`,
      R`**Complex related-party transactions** and opaque subsidiaries in secrecy jurisdictions.`,
      R`**Qualitative signals**: aggressive guidance, heavy insider selling, hostility to short-sellers and journalists.`,
    ]],
    ['p', R`Statistical models such as the Beneish M-score combine several of these ratios to estimate the probability of manipulation. No screen proves fraud, but together they tell an analyst where to dig.`],

    ['h', 'The role and limits of audit'],
    ['p', R`An external audit provides **reasonable assurance**, not a guarantee, that the financial report is free from material misstatement. Auditors test controls and transactions, confirm balances with third parties, and evaluate management’s estimates. The **audit opinion** can be:`],
    ['list', [
      R`**Unmodified** ("clean"): the report presents a true and fair view.`,
      R`**Qualified**: true and fair **except for** a specific matter.`,
      R`**Adverse**: the report does **not** present a true and fair view.`,
      R`**Disclaimer**: the auditor could not obtain enough evidence to form an opinion.`,
    ]],
    ['p', R`Audit reports of listed companies also describe **key audit matters**, the areas of most significance in the audit (often goodwill impairment, revenue recognition or provisions), and highlight any **material uncertainty related to going concern**. Analysts should read them: they point directly at the most judgemental numbers. Auditor independence is protected by rules on non-audit services, rotation of the lead audit partner (generally after five years for listed entities in Australia) and oversight by audit committees and ASIC.`],
    ['warn', R`Audit failures still happen, and auditors can have conflicts of interest because the company pays them. The 2023 scandal in which PwC Australia partners misused confidential government tax information, while not an audit failure, damaged trust in the profession and led to parliamentary inquiries and reforms. Professional scepticism is required of auditors, and should be practised by analysts too.`],

    ['h', 'Ethics and governance'],
    ['p', R`Accountants in Australia are bound by **APES 110 Code of Ethics for Professional Accountants**, based on the international code, whose fundamental principles are integrity, objectivity, professional competence and due care, confidentiality and professional behaviour. CFA charterholders follow the CFA Institute’s Code and Standards, which you will study in Ethics in Finance. Common ethical pressures in reporting include being asked to "find" profit to meet a target, to delay recognising a loss, or to classify a cost favourably.`],
    ['p', R`**Whistleblowers** who report misconduct in companies are protected under the Corporations Act, including confidentiality and protection from victimisation, and large companies must have a whistleblower policy. **Corporate governance** structures, such as an independent board and audit committee, an internal audit function and the ASX Corporate Governance Council’s Principles and Recommendations (reported on an "if not, why not" basis), aim to make reliable reporting the norm rather than the exception.`],

    ['h', 'Sustainability and climate reporting'],
    ['p', R`Financial statements capture financial capital. Investors increasingly want to know how environmental and social factors affect a company’s prospects, and how the company affects the world. Australia now requires large entities to include a **sustainability report** in their annual report, containing **climate-related financial disclosures** prepared under **AASB S2**, which is based on the ISSB’s IFRS S2. Reporting is phased in by size: the largest entities for financial years starting on or after **1 January 2025**, a second group from **1 July 2026** and a third from **1 July 2027**, with entities also brought in by greenhouse-gas reporting obligations or large assets under management (source: ASIC, high confidence).`],
    ['table', {
      caption: 'The four pillars of climate-related disclosure (AASB S2 / IFRS S2)',
      head: ['Pillar', 'What is disclosed'],
      rows: [
        ['Governance', 'How the board and management oversee climate-related risks and opportunities'],
        ['Strategy', 'Climate risks and opportunities, their effects on the business model and financial position, transition plans, and resilience under climate scenarios'],
        ['Risk management', 'How climate risks are identified, assessed and managed'],
        ['Metrics and targets', 'Greenhouse-gas emissions (Scopes 1, 2 and 3), climate-related targets and progress'],
      ],
    }],
    ['defs', [
      ['Scope 1 emissions', 'Direct emissions from sources the company owns or controls: fuel burned in its boilers and vehicles.'],
      ['Scope 2 emissions', 'Indirect emissions from purchased electricity, heat or steam.'],
      ['Scope 3 emissions', 'All other indirect emissions in the value chain: suppliers’ emissions and the use of products sold. Usually the largest and hardest to measure.'],
    ]],
    ['example', {
      title: 'Emissions intensity',
      setup: R`A manufacturer reports Scope 1 emissions of 12,000 tonnes CO₂-e, Scope 2 of 8,000 tonnes and Scope 3 of 95,000 tonnes, on revenue of $250 million.`,
      steps: [
        R`Total emissions \(= 12{,}000 + 8{,}000 + 95{,}000 = 115{,}000\) tonnes CO₂-e; Scope 3 is 83% of the total.`,
        R`Scope 1 + 2 intensity \(= 20{,}000/250 = 80\) tonnes per $ million of revenue.`,
      ],
      answer: R`Intensity metrics allow comparison across companies of different size, and trends show progress towards targets. Because Scope 3 dominates for many businesses, a company can cut its own emissions while its value-chain emissions rise, which is why investors look at all three scopes.`,
    }],
    ['p', R`The quality concerns of this lecture apply equally to sustainability data: selective boundaries, optimistic assumptions and vague targets are the sustainability versions of earnings management, and **greenwashing** is prosecuted as misleading conduct (lecture 8 of Financial Literacy). Assurance of sustainability reports is being phased in, moving from limited towards reasonable assurance over several years.`],

    ['case', {
      title: 'The target that must be met',
      text: R`You are an assistant accountant at a listed company. It is two days before the half-year close. Profit is $3 million short of guidance. The CFO asks you to (a) extend the useful life of the delivery fleet from 5 to 8 years "in line with some peers"; (b) reduce the warranty provision by 20% because "claims were lower this half"; (c) record $4 million of sales for goods that customers have ordered but that will ship next week; and (d) move $1.5 million of marketing costs into a "brand development" intangible asset. The CFO says all four are "judgement calls".`,
      questions: [
        'Evaluate each request against accounting standards. Which could be legitimate, and under what conditions?',
        'Which ethical principles in APES 110 are at stake?',
        'What should you do, and what protections and channels are available to you?',
        'As an external analyst, which signals in the half-year report might reveal these choices?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`High-quality earnings are persistent, cash-backed and neutrally measured.`,
      R`Earnings management uses estimates, timing, classification and real actions, driven by bonuses, covenants, targets and capital raising.`,
      R`Scandals from HIH to Wirecard show the signs: profit without cash, unusual assets, related parties, governance failures.`,
      R`Screen with the accruals ratio, working-capital trends, provision trends and statutory-versus-underlying gaps.`,
      R`Audit gives reasonable assurance; read the opinion, key audit matters and going-concern notes.`,
      R`APES 110, whistleblower protection and governance support integrity; AASB S2 climate reporting is phasing in from 2025.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A company reports profit of $150 million and operating cash flow of $45 million, with average total assets of $1,500 million. What is its accruals ratio, in percent?`, answer: 7, tol: 0.01, solution: R`\((150 - 45)/1{,}500 = 7\%\): a high share of non-cash profit, which deserves investigation.` },
    { type: 'num', level: 'Core', q: R`Another company reports profit of $80 million and operating cash flow of $95 million, with average total assets of $1,200 million. What is its accruals ratio, in percent? (Include the sign; two decimals.)`, answer: -1.25, tol: 0.01, solution: R`\((80 - 95)/1{,}200 = -1.25\%\): cash exceeds profit, a sign of conservative or high-quality earnings.` },
    { type: 'num', level: 'Core', q: R`A company emits 4,500 tonnes CO₂-e (Scope 1) and 3,000 tonnes (Scope 2) on revenue of $120 million. What is its Scope 1 + 2 intensity, in tonnes per $ million?`, answer: 62.5, tol: 0.01, solution: R`\((4{,}500 + 3{,}000)/120 = 62.5\) tonnes per $ million.` },
    { type: 'mcq', level: 'Core', q: 'A new CEO writes off $400 million of assets and books large restructuring provisions in her first year. Profits then recover strongly. Which technique might this be?', options: ['Channel stuffing', 'Big bath', 'Capitalising expenses', 'Cookie-jar release only'], answer: 1, solution: R`A **big bath** clears the decks in one bad year, lowering future depreciation and allowing later provision releases, which flatter subsequent results. It is not always manipulation, but it deserves scrutiny.` },
    { type: 'mcq', level: 'Core', q: 'An auditor concludes that the financial report is true and fair except for the valuation of one subsidiary. The opinion is…', options: ['Unmodified', 'Qualified', 'Adverse', 'Disclaimer'], answer: 1, solution: R`"Except for" a specific material matter: a **qualified** opinion.` },
    { type: 'mcq', level: 'Core', q: 'Emissions from the electricity a retailer buys to power its stores are classified as…', options: ['Scope 1', 'Scope 2', 'Scope 3', 'Not reported'], answer: 1, solution: R`Purchased electricity is **Scope 2**. Fuel burned in the retailer’s own trucks is Scope 1; emissions from making the goods it sells are Scope 3.` },
    { type: 'mcq', level: 'Stretch', q: 'Which signal is most consistent with capitalising operating costs to boost results?', options: ['Rising dividend payout', 'Operating cash flow rising while capital expenditure and "other intangible assets" rise sharply, and free cash flow does not improve', 'Falling share price', 'A lower effective tax rate'], answer: 1, solution: R`Capitalisation shifts outflows from operating to investing: CFO improves, but capex and intangibles jump and **free cash flow does not improve**.` },
    { type: 'long', level: 'Stretch', q: 'Explain why an unmodified audit opinion does not guarantee that a company’s accounts are free of fraud, and describe how an analyst should use the audit report.', answer: R`An audit provides reasonable, not absolute, assurance that the financial report is free from material misstatement. Auditors test samples of transactions and rely partly on internal controls and management representations. Well-planned fraud, especially when it involves collusion among senior management or with third parties, forged documents or fictitious assets held with complicit counterparties (as in Wirecard’s non-existent trust-account cash), can evade normal audit procedures for years. Materiality thresholds also mean smaller misstatements are not the auditor’s focus. And auditors face incentives that can weaken scepticism, since the client pays the fee and non-audit relationships may exist.

An analyst should therefore treat the audit as a necessary but not sufficient safeguard. Read the audit report carefully: key audit matters identify the most judgemental areas (goodwill, revenue, provisions), which are where the analyst’s own scrutiny should focus; any emphasis of matter or material uncertainty about going concern is a serious warning. Check who the auditor is, how long they have served, whether there were recent changes of auditor, and the size of non-audit fees. Then combine the audit report with independent evidence: cash-flow analysis, accruals and working-capital trends, related-party disclosures, industry data and, where possible, verification of key assets such as cash balances and major contracts.`, solution: 'Look for reasonable versus absolute assurance, collusion and sampling limits, incentives, and practical use of KAMs, going-concern notes, auditor tenure and independent checks.' },
  ],
  glossary: [
    ['Earnings quality', 'How well reported earnings reflect sustainable, cash-backed economic performance.'],
    ['Earnings management', 'Using accounting or real decisions to influence reported results.'],
    ['Big bath', 'Taking large write-offs in one period to improve future reported results.'],
    ['Accruals ratio', '(Profit − operating cash flow) / average total assets.'],
    ['Key audit matters', 'The areas of most significance in the auditor’s work, described in the audit report.'],
    ['Qualified opinion', 'An audit opinion that the report is true and fair except for a specific matter.'],
    ['Scope 3 emissions', 'Indirect greenhouse-gas emissions in a company’s value chain.'],
    ['AASB S2', 'Australia’s climate-related disclosure standard for sustainability reports.'],
  ],
  resources: ['ASIC_FR', 'AUASB', 'FRC', 'AASB', 'ISSB', 'TREASURY_CLIMATE', 'ASIC_GREEN', 'CAANZ', 'CFA_ETH', 'OS_ACC'],
};
