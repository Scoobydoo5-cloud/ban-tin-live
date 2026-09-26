const R = String.raw;
export default {
  id: '22108-04', subject: '22108', title: 'The income statement and revenue recognition', mins: 80, level: 'Intermediate',
  summary: 'Reading and building the statement of profit or loss: its structure from revenue to total comprehensive income and EPS, the AASB 15 five-step model for revenue (bundles, over-time recognition, principal versus agent, variable consideration, gift cards), inventory costing, depreciation methods, other key expenses, and the gap between statutory and "underlying" profit.',
  objectives: [
    'Describe the structure of the statement of profit or loss and other comprehensive income',
    'Apply the five-step revenue recognition model of AASB 15 to common business situations',
    'Calculate cost of goods sold and ending inventory under FIFO and weighted average',
    'Compare straight-line and diminishing-balance depreciation and their effect on profit',
    'Calculate basic earnings per share with a weighted average number of shares',
    'Evaluate EBITDA and "underlying profit" measures critically',
  ],
  body: [
    ['h', 'The shape of the income statement'],
    ['p', R`The **statement of profit or loss** reports performance over a period. Under Australian standards it is usually combined with **other comprehensive income (OCI)**, gains and losses that bypass profit, such as foreign-currency translation of overseas subsidiaries or revaluations of property. A typical structure:`],
    ['table', {
      caption: 'Typical statement of profit or loss and other comprehensive income',
      head: ['Line', 'What it shows'],
      rows: [
        ['Revenue', 'Income from ordinary activities: sales of goods and services'],
        ['Cost of sales', 'Direct cost of the goods or services sold'],
        ['**Gross profit**', 'Revenue − cost of sales'],
        ['Other income', 'Gains, interest income, government grants'],
        ['Operating expenses', 'Selling, distribution, administration, research (by function) or employee costs, depreciation, occupancy (by nature)'],
        ['**Operating profit (EBIT)**', 'Profit before finance costs and tax (a non-IFRS label, but widely used)'],
        ['Finance costs', 'Interest on borrowings and lease liabilities'],
        ['Share of associates’ profit', 'Equity-accounted investments'],
        ['**Profit before tax**', ''],
        ['Income tax expense', 'Current and deferred tax'],
        ['**Profit from continuing operations**', ''],
        ['Profit (loss) from discontinued operations', 'Businesses sold or held for sale, shown separately'],
        ['**Profit for the year**', 'Attributable to owners of the parent and non-controlling interests'],
        ['Other comprehensive income', 'Items not in profit: FX translation, cash-flow hedges, revaluations'],
        ['**Total comprehensive income**', ''],
        ['Earnings per share (basic and diluted)', 'Profit attributable to ordinary shareholders per share'],
      ],
    }],
    ['p', R`Expenses can be classified **by function** (cost of sales, distribution, administration) or **by nature** (raw materials, employee benefits, depreciation). Retailers often use function; many other companies use nature, which makes it easier to see the cost structure. From 2027, a new international standard (IFRS 18, adopted in Australia as AASB 18) will require companies to present defined subtotals such as operating profit and to disclose management-defined performance measures, improving comparability.`],

    ['h', 'Revenue recognition: the five-step model'],
    ['p', R`Revenue is usually the largest number in the statements and the one most often manipulated. **AASB 15 Revenue from Contracts with Customers** (identical to IFRS 15) sets out one model for all industries: recognise revenue to depict the transfer of promised goods or services to customers, in an amount that reflects the consideration the entity expects to be entitled to.`],
    ['steps', [
      R`**Identify the contract** with a customer (enforceable rights and obligations, commercial substance, collection probable).`,
      R`**Identify the performance obligations**: each distinct good or service promised.`,
      R`**Determine the transaction price**, including estimates of variable consideration (discounts, rebates, bonuses) where it is highly probable there will be no significant reversal.`,
      R`**Allocate the transaction price** to the performance obligations in proportion to their stand-alone selling prices.`,
      R`**Recognise revenue when (or as) each performance obligation is satisfied**: at a point in time (control passes, often on delivery) or over time (as the service is provided, or as an asset the customer controls is built).`,
    ]],
    ['example', {
      title: 'Software licence bundled with support',
      setup: R`On 1 July a software company sells a perpetual licence together with two years of technical support for a single price of $12,000. Sold separately, the licence would cost $9,000 and two years of support $4,500.`,
      steps: [
        R`Two performance obligations: the licence (transferred at a point in time) and support (provided over two years).`,
        R`Total stand-alone selling prices \(= 9{,}000 + 4{,}500 = 13{,}500\). The bundle discount is shared proportionally.`,
        R`Allocate: licence \(12{,}000 \times 9{,}000/13{,}500 = \$8{,}000\); support \(12{,}000 \times 4{,}500/13{,}500 = \$4{,}000\).`,
        R`Recognise \$8,000 on 1 July; recognise support revenue of \$2,000 a year (\$166.67 a month) over two years, holding the rest as a contract liability (unearned revenue).`,
      ],
      answer: R`Only $8,000 is revenue on day one, not $12,000. Before AASB 15 some software companies recognised whole bundles upfront, flattering growth. For a subscription business, the contract liability (deferred revenue) on the balance sheet is a valuable leading indicator of future revenue.`,
    }],
    ['h3', 'Other common situations'],
    ['list', [
      R`**Over-time recognition**: a builder constructing an apartment block for a customer who controls the site recognises revenue as construction progresses, usually measured by costs incurred relative to total expected costs. An off-the-plan apartment developer selling units, by contrast, often recognises revenue at settlement.`,
      R`**Principal versus agent**: a travel platform that arranges a $500 hotel booking for a 15% commission, without controlling the room, is an **agent** and reports revenue of $75, not $500. Getting this wrong can inflate revenue enormously without changing profit.`,
      R`**Variable consideration**: expected volume rebates, returns and discounts reduce the transaction price. A retailer with a 30-day return policy recognises revenue net of expected returns and a refund liability.`,
      R`**Gift cards and loyalty points**: cash received for gift cards is a liability until redeemed. The portion expected never to be redeemed (**breakage**), say 8% of $1 million, or $80,000, is recognised in proportion to redemptions. Loyalty points are a separate performance obligation that defers part of each sale.`,
      R`**Bill-and-hold and channel stuffing**: shipping extra goods to distributors at quarter end, or billing for goods not delivered, are classic ways of pulling revenue forward. AASB 15’s control criteria, and auditors, are meant to stop them.`,
    ]],

    ['h', 'Cost of goods sold and inventory'],
    ['p', R`When identical items are bought at different prices, the business must choose a cost formula. Australian standards (AASB 102) permit **first-in, first-out (FIFO)** and **weighted average**; last-in, first-out (LIFO), still allowed in the United States, is not permitted.`],
    ['example', {
      title: 'FIFO versus weighted average',
      setup: R`A store buys 100 units at $10, then 200 at $12, then 100 at $15. It sells 250 units during the period.`,
      steps: [
        R`**FIFO** (oldest costs sold first): COGS \(= 100 \times 10 + 150 \times 12 = \$2{,}800\); ending inventory \(= 50 \times 12 + 100 \times 15 = \$2{,}100\).`,
        R`**Weighted average**: average cost \(= (1{,}000 + 2{,}400 + 1{,}500)/400 = \$12.25\). COGS \(= 250 \times 12.25 = \$3{,}062.50\); ending inventory \(= 150 \times 12.25 = \$1{,}837.50\).`,
      ],
      answer: R`With rising prices, FIFO gives lower COGS and higher profit (by $262.50 here) and a balance-sheet inventory closer to current cost. Weighted average smooths costs. Neither changes cash, but they change reported margins, tax timing and ratios, so analysts check which method each company uses.`,
    }],
    ['p', R`Inventory must also be measured at the **lower of cost and net realisable value**: if goods can only be sold for less than they cost (obsolete fashion, damaged stock), they are written down, and the loss hits profit immediately.`],

    ['h', 'Depreciation methods'],
    ['p', R`Straight-line depreciation (lecture 3) spreads cost evenly. The **diminishing-balance** method applies a fixed rate to the carrying amount each year, giving higher charges early, which suits assets that lose value or usefulness quickly, such as vehicles and technology. The **units-of-production** method links depreciation to usage (kilometres, machine hours, tonnes mined).`],
    ['table', {
      caption: 'Asset cost $50,000, residual $5,000, life 5 years: straight-line versus 40% diminishing balance',
      head: ['Year', 'Straight-line', 'Diminishing balance (40%)', 'Diminishing-balance carrying amount at year end'],
      rows: [
        ['1', '9,000', '20,000', '30,000'], ['2', '9,000', '12,000', '18,000'], ['3', '9,000', '7,200', '10,800'], ['4', '9,000', '4,320', '6,480'], ['5', '9,000', '1,480 (limited to reach the $5,000 residual)', '5,000'],
        ['Total', '45,000', '45,000', ''],
      ],
    }],
    ['p', R`Total depreciation is identical; only the timing differs. Diminishing balance reduces early profits and raises later ones. Companies must review useful lives, residual values and methods at least annually, and assets must also be tested for **impairment** when there are signs their recoverable amount has fallen below carrying amount.`],

    ['h', 'Other important expenses'],
    ['list', [
      R`**Employee benefits**: wages, superannuation, and provisions for annual leave and long service leave (a significant liability for Australian employers).`,
      R`**Leases** (AASB 16): most leases put a **right-of-use asset** and a **lease liability** on the balance sheet. The income statement shows depreciation of the asset and interest on the liability instead of a single rent expense, which raises EBITDA and front-loads total expense.`,
      R`**Research and development**: research is expensed; development costs are capitalised as an intangible asset only when strict criteria (technical feasibility, intention and ability to complete, probable future benefits) are met.`,
      R`**Impairments and provisions**: write-downs of goodwill and assets, restructuring provisions, legal provisions. Large and often lumpy.`,
    ]],

    ['h', 'Earnings per share'],
    ['math', R`\text{Basic EPS} = \frac{\text{Profit attributable to ordinary shareholders}}{\text{Weighted average number of ordinary shares}}`, 'Basic earnings per share equals profit attributable to ordinary shareholders divided by the weighted average number of ordinary shares.'],
    ['example', {
      title: 'Weighting new shares',
      setup: R`A company with a 30 June year end earns $12.6 million, of which $0.6 million is paid as preference dividends. It had 40 million ordinary shares on 1 July and issued 8 million more on 1 October.`,
      steps: [
        R`Profit to ordinary shareholders \(= 12.6 - 0.6 = \$12.0\) million.`,
        R`Weighted average shares \(= 40 + 8 \times 9/12 = 46\) million (the new shares were on issue for 9 months).`,
        R`Basic EPS \(= 12.0/46 = 26.1\) cents.`,
      ],
      answer: R`EPS is 26.1 cents. **Diluted EPS** also assumes that options, convertible notes and performance rights that would reduce EPS are exercised or converted; it is always at or below basic EPS. The price–earnings ratio used in valuation divides the share price by EPS.`,
    }],

    ['h', 'Statutory, underlying and EBITDA'],
    ['p', R`Many ASX companies headline an "underlying" or "normalised" profit that excludes items management considers non-recurring: restructuring costs, impairments, gains on asset sales, acquisition costs. Such measures can be informative, but they are not audited under the same rules, and management chooses what to exclude. ASIC’s Regulatory Guide 230 requires non-IFRS measures to be presented no more prominently than statutory profit and to be reconciled to it.`],
    ['warn', R`Be sceptical when "one-off" costs recur every year, when only bad items are excluded, or when underlying profit is consistently well above statutory profit. **EBITDA** (earnings before interest, tax, depreciation and amortisation) is useful for comparing operating performance across companies with different financing and asset ages, but it ignores the cost of replacing assets and the cash needed for working capital. As Warren Buffett put it, management that talks up EBITDA seems to think the tooth fairy pays for capital expenditure.`],

    ['case', {
      title: 'The subscription start-up’s record quarter',
      text: R`A Sydney software start-up announces "record revenue of $6.0 million this quarter, up 80%". The notes reveal: $2.4 million came from selling three-year subscriptions, which the company recognised in full upfront, arguing that the software is delivered on day one; $0.8 million came from a reseller who has the right to return unsold licences for 90 days; and the company now reports gross booking value for a marketplace it runs, where it earns a 12% commission on $1.5 million of transactions. Underlying EBITDA, excluding $1.1 million of "one-off" share-based payments that have occurred every quarter, is positive; statutory profit is negative.`,
      questions: [
        'Apply the five-step model: how should each of the three revenue items be treated?',
        'Estimate a more appropriate revenue figure for the quarter, stating your assumptions.',
        'Evaluate the exclusion of share-based payments from underlying EBITDA.',
        'What questions would you ask the auditor and the CFO?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`The income statement runs from revenue through gross profit, EBIT and profit before tax to profit, OCI and EPS.`,
      R`AASB 15: identify the contract and performance obligations, set and allocate the transaction price, recognise as obligations are satisfied.`,
      R`Bundles are allocated by stand-alone selling prices; agents report commissions, not gross sales; returns, rebates and breakage adjust revenue.`,
      R`FIFO and weighted average change COGS and inventory; depreciation methods change timing, not totals.`,
      R`Basic EPS uses a weighted average share count; diluted EPS includes potential shares.`,
      R`Treat underlying profit and EBITDA as supplements to statutory profit, never replacements.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A phone is sold with a 24-month plan for a total of $1,800. Stand-alone prices are $900 for the phone and $1,200 for the plan. How much revenue is allocated to the phone (recognised on delivery)? (Two decimals.)`, answer: 771.43, tol: 0.01, solution: R`\(1{,}800 \times 900/(900 + 1{,}200) = \$771.43\). The plan receives \$1,028.57, recognised over 24 months.` },
    { type: 'num', level: 'Core', q: R`Purchases: 50 units at $20, 100 at $22, then 80 at $25. 160 units are sold. What is cost of goods sold under FIFO?`, answer: 3450, tol: 0.5, solution: R`\(50 \times 20 + 100 \times 22 + 10 \times 25 = 1{,}000 + 2{,}200 + 250 = \$3{,}450\).` },
    { type: 'num', level: 'Core', q: R`For the same data, what is cost of goods sold under the weighted average method? (Two decimals.)`, answer: 3617.39, tol: 0.05, solution: R`Average cost \(= (1{,}000 + 2{,}200 + 2{,}000)/230 = \$22.6087\). COGS \(= 160 \times 22.6087 = \$3{,}617.39\).` },
    { type: 'num', level: 'Core', q: R`A company earns $8.4 million. It had 30 million shares at the start of a calendar year and issued 6 million on 1 July. What is basic EPS, in cents? (Two decimals.)`, answer: 25.45, tol: 0.01, solution: R`Weighted shares \(= 30 + 6 \times 6/12 = 33\) million. EPS \(= 8.4/33 = 25.45\) cents.` },
    { type: 'num', level: 'Core', q: R`A machine costs $30,000 and is depreciated at 30% a year on a diminishing-balance basis. What is depreciation in year 2?`, answer: 6300, tol: 0.5, solution: R`Year 1: \(9{,}000\), carrying amount \$21,000. Year 2: \(0.3 \times 21{,}000 = \$6{,}300\).` },
    { type: 'num', level: 'Core', q: R`Revenue is $84 million and cost of sales $50.4 million. What is the gross margin, in percent?`, answer: 40, tol: 0.01, solution: R`\((84 - 50.4)/84 = 40\%\).` },
    { type: 'mcq', level: 'Core', q: 'A booking website arranges a $400 flight and keeps a $32 commission, without ever controlling the seat. What revenue should it report?', options: ['$400', '$368', '$32', '$0 until the flight departs'], answer: 2, solution: R`It is an **agent**: it reports only its commission of \$32 as revenue.` },
    { type: 'mcq', level: 'Core', q: 'Which inventory cost formula is NOT permitted under Australian Accounting Standards?', options: ['FIFO', 'Weighted average', 'Specific identification for unique items', 'LIFO'], answer: 3, solution: R`**LIFO** is prohibited under AASB 102 (and IFRS), though allowed under US GAAP.` },
    { type: 'mcq', level: 'Stretch', q: 'Under AASB 16, replacing an operating rent expense with a right-of-use asset and lease liability generally causes…', options: ['Lower EBITDA', 'Higher EBITDA', 'No change to EBITDA', 'Lower total assets'], answer: 1, solution: R`Rent expense (above EBITDA) is replaced by depreciation and interest (below EBITDA), so **EBITDA rises**, even though the economics are unchanged.` },
    { type: 'long', level: 'Stretch', q: 'Explain how channel stuffing inflates revenue, which signals in the financial statements might reveal it, and how AASB 15 limits it.', answer: R`Channel stuffing means shipping more goods to distributors or retailers than they need, often near a reporting date, with incentives such as extended payment terms, discounts or informal rights of return. Revenue and receivables jump in the current period, but the goods are not truly sold to end customers, so later periods suffer lower orders, returns and bad debts.

Warning signs include receivables growing much faster than revenue (days sales outstanding rising), a surge of sales in the last weeks of a quarter, rising returns and allowances in later periods, inventory building up at distributors (sometimes disclosed or visible in industry data), falling operating cash flow relative to profit, and unusual changes in credit terms.

AASB 15 limits the practice because revenue can be recognised only when control of the goods passes to the customer and only for consideration the entity expects to be entitled to. Rights of return and price concessions are variable consideration: revenue must be reduced by expected returns and recognised only to the extent it is highly probable there will be no significant reversal. Consignment arrangements, where the distributor can return unsold goods freely, may mean control has not passed at all. Auditors test cut-off and review post-period returns. None of this makes fraud impossible, but it gives analysts and auditors clear criteria to test.`, solution: 'Look for the mechanism, at least three statement signals (DSO, cash flow vs profit, returns, quarter-end spikes), and the AASB 15 control and variable-consideration criteria.' },
  ],
  glossary: [
    ['Performance obligation', 'A promise in a contract to transfer a distinct good or service to a customer.'],
    ['Stand-alone selling price', 'The price at which a good or service would be sold separately; used to allocate bundle prices.'],
    ['Contract liability', 'Consideration received before the related performance obligation is satisfied (deferred revenue).'],
    ['Principal versus agent', 'Whether an entity controls the good or service (gross revenue) or arranges it for another (net commission).'],
    ['FIFO', 'First-in, first-out: the oldest inventory costs are expensed first.'],
    ['Diminishing balance', 'Depreciation at a fixed rate on the carrying amount, giving higher early charges.'],
    ['Earnings per share', 'Profit attributable to ordinary shareholders per weighted average share.'],
    ['Non-IFRS measure', 'A profit measure defined by management, such as underlying profit or EBITDA.'],
  ],
  resources: ['AASB', 'IFRS', 'IFRS_CF', 'ASIC_FR', 'OS_ACC', 'MIT535', 'book:KOLLER'],
};
