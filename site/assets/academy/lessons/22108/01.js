const R = String.raw;
export default {
  id: '22108-01', subject: '22108', title: 'What accounting is for: users, the conceptual framework and accruals', mins: 65, level: 'Foundation',
  summary: 'Why a finance professional must read accounts fluently: the users of financial information and what they need, accountability and agency, Australia’s reporting framework (Corporations Act, AASB, ASIC, auditors), the Conceptual Framework’s qualitative characteristics and element definitions, and the difference between accrual and cash accounting.',
  objectives: [
    'Explain the purpose of financial reporting and identify its main users and their needs',
    'Describe Australia’s financial reporting framework and the roles of the AASB, FRC, ASIC, auditors and the ASX',
    'Explain the qualitative characteristics of useful financial information in the Conceptual Framework',
    'Apply the definitions of assets, liabilities, equity, income and expenses',
    'Distinguish accrual from cash accounting and calculate profit under each',
    'Explain the core assumptions: entity, period, monetary unit and going concern',
  ],
  body: [
    ['h', 'The language of business'],
    ['p', R`Accounting is often called the language of business, and for a finance professional it is the language in which most of the evidence arrives. When you value a company, lend to it, rate its bonds, advise on a takeover or manage a portfolio, you read its financial statements. Finance and accounting ask different questions (finance looks forward at cash flows and risk; accounting records what has happened under agreed rules), but you cannot do finance well without understanding how the accounting numbers are built, what they include, and where they can mislead.`],
    ['p', R`Accounting is the process of **identifying, measuring, recording and communicating** economic information about an entity to people who make decisions. **Financial accounting** produces general-purpose reports for external users; **management accounting** produces internal reports for managers (budgets, costing, performance measures). This subject focuses on financial accounting from the point of view of a finance professional who must use the numbers.`],

    ['h', 'Who uses financial reports, and why'],
    ['table', {
      caption: 'Users of financial information',
      head: ['User', 'Main questions', 'Key information'],
      rows: [
        ['Shareholders and potential investors', 'Is the company creating value? What are its shares worth?', 'Profitability, growth, cash flows, return on equity, dividends'],
        ['Lenders and bondholders', 'Can the company pay interest and repay principal?', 'Cash flows, leverage, interest cover, assets available as security, covenants'],
        ['Suppliers and trade creditors', 'Will we be paid on time?', 'Liquidity, working capital'],
        ['Employees and unions', 'Is the business stable? Can it afford pay rises?', 'Profitability, solvency'],
        ['Customers', 'Will the supplier survive to honour warranties and service?', 'Solvency, going concern'],
        ['Governments and regulators', 'Is tax paid correctly? Are rules followed? Is the system stable?', 'Taxable income, capital (for banks and insurers), disclosures'],
        ['Analysts, rating agencies and the public', 'How does this company compare and what are its risks and impacts?', 'Everything above, plus sustainability disclosures'],
      ],
    }],
    ['p', R`Behind this sits a deeper idea: **accountability**. Shareholders entrust their money to directors and managers, whom they cannot watch every day. This separation of ownership and control creates an **agency problem**: managers may act in their own interests. Audited financial reports are one of the main mechanisms that hold managers to account, which is why the rules around them are so detailed, and why accounting scandals destroy so much value when those mechanisms fail.`],

    ['h', 'Australia’s reporting framework'],
    ['list', [
      R`**Corporations Act 2001**: requires public companies, large proprietary companies and certain other entities to prepare annual financial reports that comply with accounting standards and give a **true and fair view**, and to have them audited.`,
      R`**Australian Accounting Standards Board (AASB)**: makes Australian Accounting Standards. For for-profit entities these are equivalent to International Financial Reporting Standards (IFRS), so Australian companies’ accounts are comparable with those in more than 140 jurisdictions. The AASB also issues sustainability reporting standards (AASB S1 and S2).`,
      R`**Financial Reporting Council (FRC)**: oversees the standard-setting and auditing frameworks.`,
      R`**Auditors**: independent registered company auditors examine the accounts under Australian Auditing Standards (issued by the AUASB) and give an opinion on whether they present a true and fair view.`,
      R`**ASIC**: enforces the financial reporting and audit requirements, reviews company accounts and takes action over misleading reporting.`,
      R`**ASX Listing Rules**: listed entities must also publish half-year reports and comply with **continuous disclosure**, promptly announcing information a reasonable person would expect to have a material effect on the share price.`,
    ]],
    ['note', R`Vietnam uses its own Vietnamese Accounting Standards (VAS), which differ from IFRS in important areas such as fair value measurement. In 2020 the Ministry of Finance set a roadmap for applying IFRS, starting with voluntary adoption by larger listed and state-owned groups. When you compare an Australian company with a Vietnamese one, check which standards each uses before comparing ratios.`],

    ['h', 'The Conceptual Framework'],
    ['p', R`Standards cannot cover every situation, so standard setters built a **Conceptual Framework for Financial Reporting** (issued by the IASB in 2018 and adopted by the AASB). It is the constitution of accounting: it states the objective of financial reporting, the qualities that make information useful, and the definitions of the elements. The **objective** is to provide financial information about the reporting entity that is useful to existing and potential investors, lenders and other creditors in making decisions about providing resources to the entity.`],
    ['h3', 'Qualitative characteristics'],
    ['table', {
      caption: 'What makes financial information useful',
      head: ['Characteristic', 'Type', 'Meaning'],
      rows: [
        ['Relevance', 'Fundamental', 'Capable of making a difference to decisions: it has predictive value, confirmatory value, or both. Includes **materiality**: information is material if omitting or misstating it could reasonably be expected to influence users’ decisions.'],
        ['Faithful representation', 'Fundamental', 'Depicts the substance of what it claims to represent: complete, neutral (without bias) and free from error.'],
        ['Comparability', 'Enhancing', 'Users can identify similarities and differences between entities and over time.'],
        ['Verifiability', 'Enhancing', 'Independent, knowledgeable observers could reach consensus that the depiction is faithful.'],
        ['Timeliness', 'Enhancing', 'Available in time to influence decisions.'],
        ['Understandability', 'Enhancing', 'Classified, characterised and presented clearly for users with reasonable knowledge of business.'],
      ],
    }],
    ['p', R`The framework also recognises a **cost constraint**: the benefits of reporting information should justify its costs. Relevance and faithful representation can pull in different directions. The fair value of an unlisted investment may be highly relevant but hard to measure reliably; historical cost is verifiable but may be out of date. Much of accounting judgement is about managing this tension, and much of the analyst’s job is understanding which choice was made.`],
    ['h3', 'The elements'],
    ['defs', [
      ['Asset', 'A present economic resource controlled by the entity as a result of past events. An economic resource is a right that has the potential to produce economic benefits.'],
      ['Liability', 'A present obligation of the entity to transfer an economic resource as a result of past events.'],
      ['Equity', 'The residual interest in the assets after deducting all liabilities.'],
      ['Income', 'Increases in assets, or decreases in liabilities, that increase equity, other than contributions from owners.'],
      ['Expenses', 'Decreases in assets, or increases in liabilities, that decrease equity, other than distributions to owners.'],
    ]],
    ['p', R`Notice what is **not** an asset: a company’s skilled staff (it does not control them; they can leave), its reputation built internally, or a planned purchase (no past event yet). Notice also what **is** a liability even without a bill: an obligation to repair products under warranty, or to restore a mine site. The definitions shape everything on the balance sheet, and several major scandals involved companies hiding obligations that met the liability definition.`],

    ['h', 'Core assumptions'],
    ['list', [
      R`**Entity**: the business is accounted for separately from its owners. A café owner’s personal holiday is not a business expense.`,
      R`**Accounting period**: performance is measured over periods (usually a year, and half-years for listed companies), which forces judgements about what belongs to which period.`,
      R`**Monetary unit**: items are measured in money (Australian dollars), which ignores what cannot be measured and assumes a stable unit despite inflation.`,
      R`**Going concern**: statements are prepared on the assumption that the entity will continue operating for the foreseeable future. If that is in doubt, directors must disclose it and auditors must address it; if the entity will be liquidated, a different basis applies.`,
    ]],

    ['h', 'Accrual accounting versus cash accounting'],
    ['p', R`The single most important idea in financial accounting is **accrual accounting**: the effects of transactions are recognised **when they occur**, not when cash is received or paid. Revenue is recognised when the entity satisfies its obligations to a customer; expenses are recognised when they are incurred (often matched with the revenue they help to generate). Cash accounting, by contrast, records only cash movements.`],
    ['example', {
      title: 'A web agency’s June',
      setup: R`In June, a small web agency: (1) completes and bills $12,000 of work for a client, who will pay in July; (2) receives a $5,000 deposit for a project to be done in July; (3) owes staff $4,000 of wages for June work, paid on 3 July; (4) pays $6,000 on 1 June for a 12-month insurance policy.`,
      steps: [
        R`**Cash basis**: cash in \(= \$5{,}000\) (deposit); cash out \(= \$6{,}000\) (insurance). "Profit" \(= -\$1{,}000\).`,
        R`**Accrual basis, revenue**: \$12,000 earned in June. The \$5,000 deposit is **not** revenue yet; it is a liability (**unearned revenue**) because the agency owes the client the work.`,
        R`**Accrual basis, expenses**: wages \$4,000 (incurred in June, recorded with a **wages payable** liability); insurance \(6{,}000/12 = \$500\) for June, with the remaining \$5,500 recorded as a **prepaid** asset.`,
        R`Accrual profit \(= 12{,}000 - 4{,}000 - 500 = \$7{,}500\).`,
      ],
      answer: R`Cash accounting says June was a loss of $1,000; accrual accounting says the agency earned a profit of $7,500. Accrual accounting better measures **performance** in June. But cash still matters enormously: the agency must pay wages on 3 July, before the client pays. That is why companies report both an income statement (accrual) and a statement of cash flows (cash), and why finance professionals read both.`,
    }],
    ['key', R`Profit measures performance; cash determines survival. A profitable company can go bankrupt if it runs out of cash, and a company can generate cash while making losses (for example by collecting customer deposits in advance). Always read the income statement and the cash flow statement together.`],

    ['h', 'The financial report'],
    ['p', R`An annual financial report under Australian standards contains:`],
    ['olist', [
      R`**Statement of financial position** (balance sheet): assets, liabilities and equity at the reporting date.`,
      R`**Statement of profit or loss and other comprehensive income** (income statement): revenue, expenses and profit for the period.`,
      R`**Statement of changes in equity**: how each component of equity moved, including profit, dividends and share issues.`,
      R`**Statement of cash flows**: cash from operating, investing and financing activities.`,
      R`**Notes**: accounting policies, judgements, estimates and breakdowns. Experienced analysts often start here.`,
    ]],
    ['p', R`Around the statements sit the directors’ report, the directors’ declaration, the independent auditor’s report and, for listed companies, the operating and financial review and a remuneration report. The next lectures build each statement from individual transactions.`],

    ['case', {
      title: 'The café that looked profitable',
      text: R`Linh runs a café in Melbourne through a company. Her accountant reports a profit of $62,000 for the year. Yet Linh says she has "never been so short of cash": the business bank account has only $3,000, she has a $25,000 overdraft, and she personally paid $9,000 of the café’s electricity bills from her own account. During the year the café sold $40,000 of catering on 60-day credit terms to corporate clients, bought a $35,000 coffee machine with cash, and prepaid a year’s rent of $48,000 in June.`,
      questions: [
        'Explain how the café can be profitable but short of cash. Identify each item that separates profit from cash flow.',
        'How should the $9,000 of electricity Linh paid personally be treated under the entity assumption?',
        'Which users of the café’s accounts would care most about the difference between profit and cash, and why?',
        'What would you recommend Linh monitor each month?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Financial reporting provides useful information to investors, lenders and other creditors; it supports accountability where ownership and control are separated.`,
      R`In Australia, the Corporations Act, AASB standards (IFRS-equivalent), auditors, ASIC and ASX rules frame reporting.`,
      R`Useful information is relevant (including material) and faithfully represented, enhanced by comparability, verifiability, timeliness and understandability.`,
      R`Assets are controlled economic resources from past events; liabilities are present obligations to transfer resources.`,
      R`Accrual accounting recognises transactions when they occur; cash accounting when cash moves. Profit and cash can differ greatly.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`In March a consultant completes and bills $8,000 of work (paid in April), receives $3,000 in advance for April work, pays $2,400 on 1 March for a 12-month software subscription, and owes $1,500 of March wages paid on 2 April. What is March profit under accrual accounting?`, answer: 6300, tol: 0.5, solution: R`Revenue \$8,000 (the \$3,000 is unearned). Expenses: software \(2{,}400/12 = \$200\); wages \$1,500. Profit \(= 8{,}000 - 200 - 1{,}500 = \$6{,}300\).` },
    { type: 'num', level: 'Core', q: R`For the same consultant, what is the net cash flow for March?`, answer: 600, tol: 0.5, solution: R`Cash in \$3,000 (advance); cash out \$2,400 (subscription). Net \(= +\$600\).` },
    { type: 'num', level: 'Core', q: R`What is the balance of the prepaid software subscription asset at 31 March?`, answer: 2200, tol: 0.5, solution: R`\(2{,}400 - 200 = \$2{,}200\): eleven months of service still to be received.` },
    { type: 'mcq', level: 'Core', q: 'Which of the following is an asset of a company under the Conceptual Framework?', options: ['A talented chief executive', 'A signed contract to buy equipment next month', 'Trade receivables from customers for goods already delivered', 'A strong brand reputation built internally over decades'], answer: 2, solution: R`Receivables are a **right to receive cash** that the company controls because of a past event (the sale). Employees are not controlled, a future purchase has no past event, and internally generated brands are generally not recognised.` },
    { type: 'mcq', level: 'Core', q: 'Information is material if…', options: ['It exceeds $1 million', 'Omitting or misstating it could reasonably be expected to influence users’ decisions', 'It has been audited', 'It relates to cash'], answer: 1, solution: R`Materiality is judged by its **potential to influence users’ decisions**, considering size and nature, not a fixed dollar threshold.` },
    { type: 'mcq', level: 'Core', q: 'A customer pays a gym $600 in advance for 12 months of membership. Immediately after receiving the cash, the gym should record…', options: ['Revenue of $600', 'A liability (unearned revenue) of $600', 'An expense of $600', 'Nothing until the year ends'], answer: 1, solution: R`The gym owes a year of service, a present obligation: **unearned revenue**. It recognises revenue of \$50 each month as it provides the service.` },
    { type: 'mcq', level: 'Core', q: 'Which body makes Australian Accounting Standards?', options: ['ASIC', 'The AASB', 'The ASX', 'The ATO'], answer: 1, solution: R`The **Australian Accounting Standards Board** makes the standards; ASIC enforces reporting obligations; the ASX sets listing rules; the ATO administers tax.` },
    { type: 'mcq', level: 'Stretch', q: 'Why might fair value be more relevant but less faithfully representable than historical cost for an unlisted investment?', options: ['Fair value is always lower', 'Fair value reflects current conditions but may require subjective estimates when no market price exists', 'Historical cost is not allowed', 'Fair value ignores inflation'], answer: 1, solution: R`Fair value is more up to date (relevant), but without an active market it must be **estimated** with models and assumptions, reducing verifiability and potentially neutrality.` },
    { type: 'long', level: 'Core', q: 'Explain why a lender assessing a small business should look at both its accrual profit and its cash flows, using an example where they diverge.', answer: R`Accrual profit measures economic performance: revenue earned and expenses incurred in the period, regardless of when cash moves. It is the best measure of whether the business model creates value. But a lender is repaid in cash, on specific dates, so it must also know whether the business generates enough cash, and when.

The two can diverge widely. A fast-growing wholesaler might report a strong profit while selling on 60-day credit terms and building inventory ahead of demand: its receivables and inventory absorb cash, so operating cash flow can be negative even though profit is positive, and it may need to borrow just to keep trading. Conversely, a business collecting large customer deposits in advance can show strong cash inflows while making accounting losses, because the deposits are liabilities, not revenue.

A lender therefore looks at profit (is the business viable in the long run?), operating cash flow (can it service debt now?), the working-capital cycle (how long cash is tied up), and the timing of obligations against the timing of receipts. Covenants often include both profit-based measures (interest cover based on EBIT) and cash-based measures (debt service cover).`, solution: 'Look for the role of each measure, a concrete divergence example (credit sales, inventory, deposits, capex), and implications for debt service.' },
  ],
  glossary: [
    ['Accrual accounting', 'Recognising transactions when they occur rather than when cash moves.'],
    ['Unearned revenue', 'Cash received for goods or services not yet provided: a liability.'],
    ['Prepaid expense', 'Cash paid in advance for future benefits: an asset.'],
    ['Materiality', 'Information whose omission or misstatement could influence users’ decisions.'],
    ['Faithful representation', 'Information that is complete, neutral and free from error.'],
    ['Going concern', 'The assumption that the entity will continue operating for the foreseeable future.'],
    ['True and fair view', 'The Corporations Act requirement that financial reports fairly present the entity’s position and performance.'],
    ['Agency problem', 'The conflict of interest between owners and the managers who act for them.'],
  ],
  resources: ['IFRS_CF', 'AASB', 'FRC', 'AUASB', 'ASIC_FR', 'ASX_RULES', 'OS_ACC', 'MIT501', 'book:KOLLER'],
};
