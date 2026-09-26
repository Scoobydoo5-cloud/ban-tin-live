const R = String.raw;
export default {
  id: '25400-08', subject: '25400', title: 'Financial modelling in Excel, fintech and sustainable finance', mins: 70, level: 'Foundation',
  summary: 'How professionals build spreadsheet models that others can trust, with sensitivity tables, Goal Seek and error checks; how technology is reshaping payments, banking and advice; and how sustainable finance, ESG investing, greenwashing enforcement and mandatory climate reporting are changing the industry you are entering.',
  objectives: [
    'Apply the principles of good model design: separate inputs, calculations and outputs, and make the model transparent and testable',
    'Build a retirement projection with a two-way sensitivity table and use Goal Seek to solve for an input',
    'Use XNPV and XIRR for irregular cash flows and recognise common spreadsheet errors',
    'Describe the main fintech developments in Australia and Vietnam and the risks they create',
    'Distinguish the main approaches to responsible investment and explain how ESG preferences can affect expected returns',
    'Explain greenwashing and Australia’s mandatory climate-related financial disclosure regime',
  ],
  body: [
    ['h', 'Why modelling is a professional skill'],
    ['p', R`Almost every financial decision in business passes through a spreadsheet: a loan offer, a budget, a project appraisal, a valuation, an investment committee paper. A model is a simplified representation of reality that turns assumptions into numbers, and the people who rely on it usually never see the formulas. That is why modelling is a **professional** skill, not a technical one. A good model is correct, but it is also easy to follow, easy to change, and easy to check. A bad model can be correct today and dangerously wrong after one careless edit tomorrow.`],
    ['p', R`Spreadsheet errors have caused real damage. In 1994 a missing minus sign in the Fidelity Magellan Fund’s accounts turned an expected loss into a reported gain and produced a $2.6 billion error in a forecast distribution. In 2013 researchers found a spreadsheet range error in an influential economics paper on government debt and growth by Reinhart and Rogoff. And the 2012 "London Whale" losses at JPMorgan Chase were partly linked, according to the bank’s own task force report, to a risk model that relied on manual copy-and-paste steps and contained a formula error. None of these errors required advanced mathematics; all of them required discipline to prevent.`],

    ['h', 'Principles of good model design'],
    ['p', R`Several published standards codify good practice, such as the FAST Standard (Flexible, Appropriate, Structured, Transparent). They differ in details but agree on the essentials.`],
    ['steps', [
      R`**Separate inputs, calculations and outputs.** Put every assumption on an inputs sheet or block, clearly labelled with units and sources. Calculations refer to inputs; outputs summarise results. Never type a number inside a calculation formula.`,
      R`**Make time flow in one direction.** Use one column per period with a consistent timeline across all sheets, so the same column always means the same date.`,
      R`**One formula per row.** A row should contain the same formula copied across all periods. If one cell needs a different formula, the row is really two concepts and should be split.`,
      R`**Keep formulas short and readable.** Break long formulas into intermediate rows with clear labels. Someone else should be able to follow the logic in a few minutes.`,
      R`**Format by role.** A common convention: blue font for hard-coded inputs, black for formulas, green for links to other sheets. Format consistently and label units (dollars, %, months).`,
      R`**Build in checks.** Add rows that should equal zero if the model is consistent: the balance sheet balances, the loan balance reaches zero, totals match. Show a clear error flag if any check fails.`,
      R`**Document and version.** Include a cover sheet explaining purpose, structure, key assumptions and sources, and save dated versions.`,
    ]],
    ['warn', R`The most dangerous spreadsheet habit is the "hard-code override": typing a number over a formula to make an answer look right. It silently breaks the model the next time inputs change. If you must override, do it in an input cell with a clear label.`],

    ['h', 'A worked model: will my savings plan reach $1 million?'],
    ['p', R`Let us build a small but properly structured model. A 25-year-old plans to invest a fixed amount at the end of every month for 40 years in a diversified portfolio. How much will they have, and how sensitive is the answer to the assumptions?`],
    ['code', { lang: 'excel', say: 'The inputs block holds the monthly contribution, the annual return, the number of years and the target. The calculation uses the future value function. A check compares it with a month-by-month schedule.', src: R`INPUTS (blue)                          CALCULATIONS
B3  Monthly contribution   500         B10 Monthly rate        =B4/12
B4  Annual return (nominal) 7.0%       B11 Number of months    =B5*12
B5  Years                  40          B12 Future value        =FV(B10,B11,-B3)          → 1,312,407
B6  Target                 1,000,000   B13 Total contributed   =B3*B11                   → 240,000
                                       B14 Growth from returns =B12-B13                  → 1,072,407
OUTPUTS                                B15 Target reached?     =IF(B12>=B6,"Yes","No")
                                       CHECK
                                       B17 Schedule end value (month-by-month sheet) minus B12 → should be 0` }],
    ['p', R`The result, about $1.31 million, is striking: only $240,000 comes from contributions and over $1 million from compounding. But the number is only as good as the 7% assumption, which is exactly why we test sensitivity.`],
    ['h3', 'Two-way sensitivity with a data table'],
    ['p', R`Excel’s **Data Table** (Data → What-If Analysis → Data Table) recalculates a result for a grid of two inputs. Put returns across the top row, contributions down the left column, a reference to the output cell in the corner, and Excel fills the grid.`],
    ['table', {
      caption: 'Value after 40 years of monthly contributions (nominal dollars)',
      head: ['Monthly contribution', 'Return 5%', 'Return 6%', 'Return 7%', 'Return 8%'],
      rows: [
        ['$300', '$457,806', '$597,447', '$787,444', '$1,047,302'],
        ['$500', '$763,010', '$995,745', '$1,312,407', '$1,745,504'],
        ['$800', '$1,220,816', '$1,593,193', '$2,099,851', '$2,792,806'],
      ],
    }],
    ['p', R`Reading the table teaches two lessons. First, the return assumption matters as much as the contribution: moving from 5% to 8% more than doubles the outcome. Second, because these are nominal dollars, remember lecture 2: with 2.5% inflation, $1.31 million in 40 years buys roughly what $490,000 buys today. Always present long-horizon results in both nominal and real terms.`],
    ['h3', 'Goal Seek: solving backwards'],
    ['p', R`**Goal Seek** (Data → What-If Analysis → Goal Seek) changes one input until an output reaches a target. Setting the future value cell to $1,000,000 by changing the contribution gives **$380.98 a month at 7%**, or **$655.30 a month at 5%**. You could solve these algebraically with the annuity formula from lecture 3, but Goal Seek works on any model, however complicated, as long as the output depends smoothly on one input.`],
    ['h3', 'Irregular cash flows: XNPV and XIRR'],
    ['p', R`NPV and IRR assume equally spaced periods. Real cash flows arrive on specific dates. **XNPV(rate, values, dates)** discounts each cash flow by \((1+r)^{-(d_i - d_0)/365}\), and **XIRR(values, dates)** finds the rate that sets XNPV to zero.`],
    ['example', {
      title: 'An investment with irregular dates',
      setup: R`You invest $10,000 on 15 January 2026 and receive $2,500 on 1 July 2026, $4,000 on 31 March 2027 and $5,500 on 15 February 2028.`,
      steps: [
        R`XNPV at 8%: about \$744, so the investment beats an 8% hurdle.`,
        R`XIRR: about **13.6%** a year.`,
        R`Using IRR with the cash flows treated as if they were one year apart would give about 8.5%, badly understating the true return, because the actual gaps are 5.5, 9 and 10.5 months.`,
      ],
      answer: R`Use XNPV and XIRR whenever cash flows are not evenly spaced, which in practice is most of the time.`,
    }],
    ['list', [
      R`**INDEX/MATCH or XLOOKUP** to pull values from tables robustly (avoid VLOOKUP with a hard-coded column number).`,
      R`**SUMPRODUCT** for weighted sums, such as portfolio returns.`,
      R`**EDATE and EOMONTH** to build monthly timelines from a start date.`,
      R`**Data validation** to restrict inputs (for example, a rate between 0% and 20%), and **conditional formatting** to highlight failed checks.`,
      R`**Named ranges** such as Rate or Years make formulas self-explanatory, as in =FV(Rate/12, Years*12, -Contribution).`,
    ]],

    ['h', 'Fintech: technology reshaping finance'],
    ['p', R`"Fintech" covers any technology that changes how financial services are produced or delivered. For you it matters in two ways: it changes the products you will use and the jobs you will do.`],
    ['table', {
      caption: 'Major fintech developments',
      head: ['Area', 'What changed', 'Examples in Australia', 'Examples in Vietnam'],
      rows: [
        ['Real-time payments', 'Payments settle in seconds, around the clock, using simple identifiers', 'The New Payments Platform (2018) with Osko and PayID; PayTo for authorised account-to-account payments', 'Instant interbank transfers and VietQR codes, now standard for everyday payments'],
        ['Open banking', 'Customers can share their banking data securely with accredited third parties', 'The Consumer Data Right, which began with banking in 2020', 'Open API frameworks being developed by the State Bank of Vietnam'],
        ['Digital banks and wallets', 'App-first banking and e-wallets', 'Digital banks and bank apps; mobile wallets such as Apple Pay and Google Pay', 'E-wallets such as MoMo and ZaloPay; digital banking apps of major banks'],
        ['Credit', 'Algorithmic lending decisions and instalment products', 'BNPL, now regulated as credit since June 2025', 'Consumer finance apps and BNPL partnerships'],
        ['Investing and advice', 'Low-cost platforms and automated portfolios', 'Micro-investing apps, low-cost brokers, robo-advisers', 'Online brokerage accounts growing rapidly since 2020'],
        ['Crypto-assets', 'Tokens, exchanges and stablecoins', 'Exchanges must register with AUSTRAC; ASIC treats many crypto products as financial products', 'A legal framework for crypto-assets is being introduced'],
      ],
    }],
    ['p', R`Technology lowers costs and widens access, but it also creates new risks: **cyber attacks and data breaches**, **scams** that exploit instant irreversible payments, **algorithmic bias** in lending decisions, **operational outages** that can stop payments for millions of people, and products designed to encourage impulsive spending. Regulators respond with rules on data security, scam prevention obligations for banks and platforms, and licensing. As a finance professional you will increasingly work with data scientists, and the skills of this subject, clear modelling and clear communication, are exactly what makes that collaboration work.`],
    ['note', R`Artificial intelligence is now used for fraud detection, credit scoring, customer service, research and code. It can make an analyst much faster, but it can also produce confident, fluent and wrong numbers. The discipline of this lecture applies even more strongly: every figure that goes to a client must be traceable to a source and checked.`],

    ['h', 'Sustainable finance'],
    ['p', R`Sustainable finance means taking environmental, social and governance (**ESG**) factors into account in financial decisions. It has grown from a niche into a mainstream part of the industry, driven by three forces: investors’ values, the financial materiality of risks such as climate change, and regulation.`],
    ['table', {
      caption: 'Approaches to responsible investment',
      head: ['Approach', 'What it means', 'Example'],
      rows: [
        ['Negative (exclusionary) screening', 'Exclude sectors or companies on ethical grounds', 'Excluding tobacco, controversial weapons or thermal coal miners'],
        ['Positive or best-in-class screening', 'Favour companies with better ESG performance than peers', 'Holding the most energy-efficient companies in each industry'],
        ['ESG integration', 'Include material ESG risks in normal financial analysis', 'Adjusting a miner’s valuation for rehabilitation costs and carbon prices'],
        ['Thematic investing', 'Target themes such as renewable energy or water', 'A clean-energy ETF'],
        ['Impact investing', 'Seek measurable social or environmental benefit alongside a financial return', 'Financing affordable housing or community energy'],
        ['Stewardship and engagement', 'Use shareholder rights to influence companies', 'Voting on climate resolutions; meeting boards'],
      ],
    }],
    ['h3', 'Does ESG investing cost returns?'],
    ['p', R`Theory gives a clear but subtle answer. If many investors refuse to hold certain assets, those assets must offer **higher expected returns** to attract the remaining holders, so avoiding them lowers the expected return of the portfolio that avoids them. Research on so-called sin stocks (tobacco, alcohol, gambling) found higher returns consistent with this. Conversely, "green" assets that investors like should have **lower expected returns**. But **realised** returns can differ from expected returns: when concern about climate change rises unexpectedly, green assets can outperform as their prices adjust. And ESG integration, which uses financially material information, can improve risk management without sacrificing return. The honest summary is that values-based exclusions usually cost a little diversification and possibly some expected return, while financially material ESG analysis is simply good analysis.`],
    ['example', {
      title: 'Measuring a portfolio’s carbon intensity',
      setup: R`A portfolio holds three companies with weights 40%, 35% and 25%, and carbon intensities of 120, 30 and 450 tonnes of CO₂-equivalent per million dollars of revenue. A common metric is the weighted average carbon intensity (WACI).`,
      steps: [
        R`WACI \(= 0.40(120) + 0.35(30) + 0.25(450) = 48 + 10.5 + 112.5 = 171\) tonnes per $ million of revenue.`,
        R`Tilting the weights to 50%, 45% and 5% gives \(60 + 13.5 + 22.5 = 96\), a 44% reduction.`,
      ],
      answer: R`Portfolio tilts can cut measured carbon intensity sharply, but at the cost of concentration and tracking error, and a lower portfolio intensity does not by itself reduce real-world emissions. Engagement and financing the transition are also part of the picture.`,
    }],
    ['h3', 'Greenwashing'],
    ['p', R`**Greenwashing** means overstating how environmentally friendly or sustainable a product or company is. In Australia it is treated as misleading conduct, and ASIC has made it an enforcement priority. In 2024 the Federal Court ordered Mercer Superannuation to pay an \$11.3 million penalty over misleading statements about its "Sustainable Plus" options, and Vanguard Investments Australia to pay a then-record \$12.9 million penalty for misleading claims about the ESG screens applied to a bond fund (source: ASIC media releases, high confidence). The lesson for future professionals is simple: every sustainability claim must be specific, accurate and supported by what the product actually does.`],
    ['h3', 'Mandatory climate reporting'],
    ['p', R`Australia now requires large companies and financial institutions to publish climate-related financial disclosures in an annual sustainability report. The first group of entities began reporting for financial years starting on or after **1 January 2025**, with smaller entities phased in over the following years. Reports follow the Australian Sustainability Reporting Standard **AASB S2**, based on the international ISSB standard IFRS S2, and cover governance, strategy (including climate scenario analysis), risk management, and metrics and targets such as Scope 1, 2 and 3 greenhouse-gas emissions. For analysts this creates a large new source of comparable data; for companies it brings climate risk into the boardroom alongside financial risk.`],

    ['case', {
      title: 'Building a model for a friend’s café',
      text: R`A friend plans to open a café in Hanoi and asks you to model the first three years. She has a spreadsheet with revenue typed as a single number for each year, costs calculated in a long formula with numbers embedded, and a "profit" line that includes the loan principal repayments as an expense. She wants to know whether a 400 million dong bank loan at 9% a year over three years is affordable, and she wants to advertise the café as "carbon neutral" because she will use paper cups.`,
      questions: [
        'Redesign the model structure: which inputs, calculations, outputs and checks would you include?',
        'What is wrong with treating loan principal repayments as an expense? Where should they appear instead?',
        'Which two inputs would you put in a sensitivity table, and why?',
        'Is "carbon neutral" a responsible claim here? What would she need to measure and do before making it?',
      ],
    }],

    ['h', 'Summary of the subject'],
    ['p', R`This lecture closes Financial Literacy. Look back at what you can now do: build a personal balance sheet and budget; move any cash flow through time; value annuities and loans; compare borrowing costs and savings products after tax and inflation; understand super, HELP, franking credits and the coming CGT changes; measure returns and risk honestly; build diversified portfolios; and present all of it in a clean, checkable spreadsheet. These are the tools the rest of the degree assumes. Next, Economics for Business explains the forces that move interest rates, inflation and markets in the first place.`],
    ['list', [
      R`Good models separate inputs, calculations and outputs, use one formula per row, and include checks.`,
      R`Sensitivity tables and Goal Seek reveal which assumptions matter; XNPV and XIRR handle real-world dates.`,
      R`Fintech brings instant payments, open banking and cheaper investing, along with scam, cyber and conduct risks.`,
      R`Responsible investment ranges from exclusions to integration and engagement; exclusions can lower expected returns.`,
      R`Greenwashing is misleading conduct in Australia, and large entities must now report climate-related financial information under AASB S2.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`What monthly contribution, invested at the end of each month for 30 years at 6% p.a. compounded monthly, reaches $500,000? (Two decimals.)`, answer: 497.75, tol: 0.5, solution: R`\(PMT = 500{,}000 \times 0.005/(1.005^{360} - 1) = 500{,}000 \times 0.005/5.02258 = \$497.75\). In Excel: =PMT(6%/12,360,0,-500000) or Goal Seek on an FV model.` },
    { type: 'num', level: 'Core', q: R`Using the sensitivity table in the lecture, by how many dollars does the 40-year value of $500 a month rise when the return assumption moves from 6% to 7%?`, answer: 316662, tol: 2, solution: R`\(\$1{,}312{,}407 - \$995{,}745 = \$316{,}662\). A one-point change in the return assumption changes the outcome by about 32%.` },
    { type: 'num', level: 'Core', q: R`A portfolio holds 30% in a company with carbon intensity 200, 50% in one with 40 and 20% in one with 600 (tonnes CO₂e per $ million revenue). What is its weighted average carbon intensity?`, answer: 200, tol: 0.5, solution: R`\(0.3(200) + 0.5(40) + 0.2(600) = 60 + 20 + 120 = 200\).` },
    { type: 'num', level: 'Stretch', q: R`$1,312,407 in 40 years’ time is worth how much in today’s dollars if inflation averages 2.5% a year? (Nearest dollar.)`, answer: 488781, tol: 50, solution: R`\(1.025^{40} = 2.685064\), so the real value is \(1{,}312{,}407/2.685064 = \$488{,}781\). Nearly two-thirds of the nominal figure is inflation, which is why long-horizon projections should always be shown in today’s dollars too.` },
    { type: 'mcq', level: 'Core', q: 'Which practice most improves a spreadsheet model’s reliability?', options: ['Typing assumptions directly into formulas so they are close to the calculation', 'Keeping all inputs in one labelled block and adding checks that should equal zero', 'Using the longest possible formulas to reduce the number of rows', 'Overwriting formulas with the correct numbers when results look odd'], answer: 1, solution: R`Separate, labelled inputs plus explicit checks make a model transparent and testable. The other options are classic sources of spreadsheet errors.` },
    { type: 'mcq', level: 'Core', q: 'When should you use XIRR rather than IRR?', options: ['When cash flows are all positive', 'When cash flows occur on irregular dates', 'When the discount rate is known', 'Never; they always give the same answer'], answer: 1, solution: R`XIRR uses the actual dates of each cash flow. IRR assumes equal periods between cash flows, which is often untrue.` },
    { type: 'mcq', level: 'Core', q: 'According to asset-pricing theory, if many investors refuse to hold an asset for ethical reasons, what happens to its expected return?', options: ['It falls, because demand is lower', 'It rises, because its price falls until remaining investors are compensated', 'It is unaffected', 'It becomes equal to the risk-free rate'], answer: 1, solution: R`Lower demand lowers the price, which raises the expected return for those willing to hold the asset. This is why exclusions can reduce the excluding investor’s expected return.` },
    { type: 'mcq', level: 'Core', q: 'Which standard sets out Australia’s mandatory climate-related financial disclosures?', options: ['AASB 9', 'AASB S2', 'IFRS 16', 'Basel III'], answer: 1, solution: R`**AASB S2 Climate-related Disclosures**, based on the ISSB’s IFRS S2, applies to the first group of reporting entities for years beginning on or after 1 January 2025.` },
    { type: 'long', level: 'Stretch', q: 'A super fund markets an option as "fossil-fuel free" but holds a diversified mining company that earns 12% of revenue from thermal coal. Explain why this could be greenwashing, what harm it causes, and what the fund should do.', answer: R`The claim is absolute ("fossil-fuel free"), yet the option holds a company with material thermal-coal revenue. Members who chose the option because of that claim have been misled about what they own, which is misleading conduct under Australian consumer and financial services law; ASIC has taken court action and obtained multi-million-dollar penalties in similar cases, such as Mercer ($11.3 million) and Vanguard ($12.9 million) in 2024.

The harm is threefold. Members make decisions, including choosing the option over cheaper alternatives, on false information. Honest sustainable products are undermined because investors cannot trust labels. And capital is misallocated, weakening the signal that sustainable finance is meant to send.

The fund should correct the claim immediately, define its screens precisely (for example, "excludes companies earning more than 5% of revenue from thermal coal extraction"), apply them through a documented and audited process, disclose any exceptions and holdings, review similar claims across other products, and consider remediation for affected members. Governance should make one person accountable for sustainability claims.`, solution: 'Look for the mismatch between claim and holdings, the legal framing (misleading conduct, ASIC enforcement), the harms, and concrete remedies.' },
  ],
  glossary: [
    ['Financial model', 'A structured spreadsheet or program that turns assumptions into financial outputs.'],
    ['Sensitivity analysis', 'Recalculating an output for a range of input values to see which assumptions matter.'],
    ['Goal Seek', 'An Excel tool that changes one input until an output reaches a target value.'],
    ['XIRR', 'The internal rate of return for cash flows on specific, irregular dates.'],
    ['Consumer Data Right', 'Australia’s framework allowing consumers to share their data securely with accredited providers (open banking).'],
    ['ESG', 'Environmental, social and governance factors considered in investment decisions.'],
    ['Greenwashing', 'Misleading claims that a product or company is more sustainable than it is.'],
    ['AASB S2', 'Australia’s climate-related disclosure standard, based on IFRS S2.'],
  ],
  resources: ['FAST', 'XL_XIRR', 'XL_XNPV', 'XL_GOALSEEK', 'NPPA', 'CDR', 'ASIC_GREEN', 'ASIC_VANGUARD', 'TREASURY_CLIMATE', 'ISSB', 'PRI', 'ASFI', 'MS_SCAMS'],
};
