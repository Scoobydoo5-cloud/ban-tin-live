const R = String.raw;
export default {
  id: '22108-07', subject: '22108', title: 'Financial statement analysis', mins: 85, level: 'Intermediate',
  summary: 'Turning statements into insight: horizontal and vertical analysis, the full ratio toolkit (profitability, efficiency, liquidity, solvency and market ratios), DuPont decomposition of ROE, ROIC, the cash conversion cycle, and a complete two-year analysis of a retailer whose profits grow while its free cash flow disappears.',
  objectives: [
    'Perform horizontal (trend) and vertical (common-size) analysis',
    'Calculate and interpret profitability, efficiency, liquidity, solvency and market ratios',
    'Decompose return on equity with the three- and five-step DuPont models',
    'Calculate ROIC and explain why it matters for value creation',
    'Calculate the cash conversion cycle and link it to operating cash flow',
    'Recognise the limitations of ratio analysis and build a coherent analytical story',
  ],
  body: [
    ['h', 'From numbers to a story'],
    ['p', R`Financial statement analysis is detective work. The statements contain hundreds of numbers; ratios compress them into comparable signals; and the analyst’s job is to assemble those signals into a coherent story about how the business makes money, how well it is doing, what risks it runs and what might happen next. Ratios mean little in isolation. They become informative when compared **over time** (is the business improving?), **against peers** (is it better than competitors?) and **against expectations** (is it better than the share price assumes?).`],

    ['h', 'Our company: Harbour Retail Ltd'],
    ['p', R`Harbour Retail Ltd is a fictional ASX-listed homewares retailer with 200 million shares. Figures are in $ million.`],
    ['table', {
      caption: 'Income statement ($m)',
      head: ['', 'Year 1', 'Year 2'],
      rows: [
        ['Revenue', '1,050.0', '1,200.0'], ['Cost of goods sold', '(672.0)', '(780.0)'], ['**Gross profit**', '**378.0**', '**420.0**'],
        ['Operating expenses (including depreciation of 45 and 50)', '(231.0)', '(252.0)'], ['**EBIT**', '**147.0**', '**168.0**'], ['Interest expense', '(18.0)', '(24.0)'],
        ['**Profit before tax**', '**129.0**', '**144.0**'], ['Income tax (30%)', '(38.7)', '(43.2)'], ['**Net profit**', '**90.3**', '**100.8**'],
      ],
    }],
    ['table', {
      caption: 'Balance sheet at year end ($m)',
      head: ['', 'Year 1', 'Year 2'],
      rows: [
        ['Cash', '55', '40'], ['Receivables', '80', '110'], ['Inventory', '120', '160'], ['Other current assets', '10', '10'], ['Property, plant and equipment', '480', '520'], ['Intangibles', '60', '60'],
        ['**Total assets**', '**805**', '**900**'],
        ['Payables', '90', '95'], ['Short-term debt', '30', '40'], ['Other current liabilities', '40', '45'], ['Long-term debt', '200', '260'], ['Equity', '445', '460'],
        ['**Total liabilities and equity**', '**805**', '**900**'],
      ],
    }],
    ['p', R`Share price at the end of year 2: $7.20. Dividends paid in year 2: $85.8 million.`],

    ['h', 'Horizontal and vertical analysis'],
    ['p', R`**Horizontal analysis** computes growth rates. Revenue grew 14.3% and net profit 11.6%, a healthy picture at first sight. But receivables grew **37.5%** and inventory **33.3%**, far faster than sales. That mismatch is the first clue.`],
    ['p', R`**Vertical (common-size) analysis** expresses each line as a percentage of revenue (income statement) or total assets (balance sheet), making companies of different sizes comparable. Gross margin fell from 36.0% to 35.0%; the EBIT margin held at 14.0% because operating expenses fell as a share of sales.`],

    ['h', 'Profitability ratios'],
    ['table', {
      caption: 'Profitability',
      head: ['Ratio', 'Formula', 'Year 1', 'Year 2'],
      rows: [
        ['Gross margin', 'Gross profit / Revenue', '36.0%', '35.0%'],
        ['EBIT margin', 'EBIT / Revenue', '14.0%', '14.0%'],
        ['Net margin', 'Net profit / Revenue', '8.6%', '8.4%'],
        ['Return on assets (ROA)', 'Net profit / Average total assets', '', '11.8%'],
        ['Return on equity (ROE)', 'Net profit / Average equity', '', '22.3%'],
        ['Return on invested capital (ROIC)', 'EBIT(1 − t) / Average invested capital', '', '17.6%'],
      ],
    }],
    ['p', R`Use **average** balances when a ratio divides a flow (profit over a year) by a stock (assets at a point in time). **Invested capital** is the capital provided by lenders and shareholders to run the operations: debt plus equity minus surplus cash, here \(40 + 260 + 460 - 40 = 720\) at the end of year 2 and 620 at the end of year 1. ROIC uses after-tax operating profit, \(168 \times 0.7 = 117.6\), so it measures the return on the business independent of how it is financed. **A company creates value only when ROIC exceeds its weighted average cost of capital (WACC).** If Harbour’s WACC is about 9%, a 17.6% ROIC means its stores are genuinely valuable, which also helps explain why the shares trade at more than three times book value.`],

    ['h', 'DuPont analysis: why is ROE 22%?'],
    ['p', R`The DuPont model, developed at the DuPont company in the 1920s, splits ROE into three drivers:`],
    ['math', R`ROE = \underbrace{\frac{\text{Net profit}}{\text{Revenue}}}_{\text{net margin}} \times \underbrace{\frac{\text{Revenue}}{\text{Average assets}}}_{\text{asset turnover}} \times \underbrace{\frac{\text{Average assets}}{\text{Average equity}}}_{\text{equity multiplier}}`, 'Return on equity equals net margin times asset turnover times the equity multiplier.'],
    ['p', R`For Harbour in year 2: \(8.4\% \times 1.408 \times 1.884 = 22.3\%\). The **five-step** version splits the margin further: \(ROE = \frac{NP}{PBT} \times \frac{PBT}{EBIT} \times \frac{EBIT}{Revenue} \times \frac{Revenue}{Assets} \times \frac{Assets}{Equity}\) = tax burden 0.70 × interest burden 0.857 × EBIT margin 14.0% × turnover 1.408 × leverage 1.884.`],
    ['key', R`Two companies can have the same ROE for very different reasons: a luxury brand with high margins and low turnover, a supermarket with thin margins and high turnover, or a company with ordinary margins and turnover but high leverage. Only the last one gets its ROE from risk. DuPont shows which.`],
    ['p', R`Retailers typically combine modest margins with high asset turnover. Harbour’s leverage (equity multiplier 1.88) is moderate. The 22% ROE is therefore largely operational, which is good news, but the next ratios show that growth is consuming cash.`],

    ['h', 'Efficiency and the cash conversion cycle'],
    ['math', R`DSO = \frac{\text{Receivables}}{\text{Revenue}} \times 365 \quad DIO = \frac{\text{Inventory}}{\text{COGS}} \times 365 \quad DPO = \frac{\text{Payables}}{\text{COGS}} \times 365 \quad CCC = DSO + DIO - DPO`, 'Days sales outstanding equals receivables over revenue times 365. Days inventory outstanding equals inventory over cost of goods sold times 365. Days payables outstanding equals payables over cost of goods sold times 365. The cash conversion cycle equals DSO plus DIO minus DPO.'],
    ['table', {
      caption: 'Working-capital efficiency (year-end balances)',
      head: ['Measure', 'Year 1', 'Year 2', 'Change'],
      rows: [
        ['Days sales outstanding (DSO)', '27.8 days', '33.5 days', 'Customers paying more slowly'],
        ['Days inventory outstanding (DIO)', '65.2 days', '74.9 days', 'Stock sitting longer'],
        ['Days payables outstanding (DPO)', '48.9 days', '44.5 days', 'Paying suppliers faster'],
        ['**Cash conversion cycle**', '**44.1 days**', '**63.9 days**', '**Up almost 20 days**'],
      ],
    }],
    ['p', R`The **cash conversion cycle** is the number of days between paying suppliers and collecting from customers: how long each dollar is tied up in operations. Harbour’s cycle lengthened by nearly 20 days. On annual cost of sales of $780 million, 20 extra days of working capital ties up roughly \(780 \times 20/365 \approx \$43\) million of cash. That is why operating cash flow (about $90.8 million) fell short of profit ($100.8 million), and after capital expenditure of about $90 million, **free cash flow was almost zero**. The company funded its dividend of $85.8 million and its growth with **new borrowing**: debt rose by $70 million.`],

    ['h', 'Liquidity and solvency'],
    ['table', {
      caption: 'Liquidity and solvency',
      head: ['Ratio', 'Formula', 'Year 1', 'Year 2'],
      rows: [
        ['Current ratio', 'Current assets / Current liabilities', '1.66', '1.78'],
        ['Quick ratio', '(Current assets − Inventory) / Current liabilities', '0.91', '0.89'],
        ['Debt-to-equity', 'Total debt / Equity', '0.52', '0.65'],
        ['Net debt / EBITDA', '(Debt − Cash) / (EBIT + D&A)', '0.91×', '1.19×'],
        ['Interest cover', 'EBIT / Interest', '8.2×', '7.0×'],
      ],
    }],
    ['p', R`The current ratio **rose**, which looks like better liquidity, but only because slow-moving inventory and receivables grew. The **quick ratio**, which excludes inventory, fell slightly. Leverage is still modest (net debt about 1.2 times EBITDA, interest covered 7 times), but it is rising, and lenders’ covenants are usually written on exactly these ratios.`],
    ['warn', R`A rising current ratio is not always good news. Liquidity from inventory that may need discounting, or receivables that may not be collected, is weaker than it looks. Always check what makes up current assets.`],

    ['h', 'Market ratios'],
    ['table', {
      caption: 'Market ratios at a share price of $7.20',
      head: ['Ratio', 'Calculation', 'Value'],
      rows: [
        ['Earnings per share', '100.8 / 200', '$0.504'],
        ['Price–earnings (P/E)', '7.20 / 0.504', '14.3×'],
        ['Market capitalisation', '7.20 × 200', '$1,440m'],
        ['Enterprise value (EV)', 'Market cap + net debt (1,440 + 260)', '$1,700m'],
        ['EV / EBITDA', '1,700 / (168 + 50)', '7.8×'],
        ['Dividend yield', '(85.8 / 200) / 7.20', '6.0%'],
        ['Payout ratio', '85.8 / 100.8', '85%'],
        ['Price-to-book', '1,440 / 460', '3.1×'],
      ],
    }],
    ['p', R`**Enterprise value** is the value of the whole business to all capital providers, so it is compared with EBITDA or EBIT (pre-interest measures), while market capitalisation is compared with profit after interest (P/E). A 6% dividend yield with an 85% payout ratio looks attractive, but with free cash flow near zero the dividend was effectively paid with borrowed money. Unless working capital is brought under control, either debt keeps climbing or the dividend is cut.`],

    ['h', 'Putting the story together'],
    ['steps', [
      R`**Business model**: a homewares retailer with healthy margins, high asset turnover and a strong ROIC (17.6%) well above its likely cost of capital.`,
      R`**Performance**: revenue up 14%, profit up 12%, margins broadly stable, ROE 22%.`,
      R`**Warning signs**: receivables and inventory growing far faster than sales, cash conversion cycle up 20 days, operating cash below profit, free cash flow near zero, debt rising to fund dividends.`,
      R`**Questions for management**: why did DSO rise (new trade customers? looser credit?), is the inventory saleable at full price, and what is the plan for working capital and the dividend?`,
      R`**Implication**: the P/E of 14.3 may be reasonable if working capital normalises, but there is risk of inventory write-downs (margin pressure) and a dividend cut.`,
    ]],

    ['h', 'Limitations of ratio analysis'],
    ['list', [
      R`**Accounting choices** (depreciation lives, inventory methods, capitalisation) and different standards (IFRS versus VAS or US GAAP) reduce comparability.`,
      R`**Year-end window dressing**: balances at one date may not represent the year.`,
      R`**Seasonality**: retailers’ inventory peaks before Christmas; compare the same season.`,
      R`**Industry differences**: a "good" current ratio for a manufacturer is too high for a supermarket.`,
      R`**Inflation and historical cost** distort asset-based ratios for companies with old assets.`,
      R`**Ratios describe the past**; valuation depends on the future.`,
    ]],

    ['case', {
      title: 'Comparing two Vietnamese retailers',
      text: R`An analyst compares two listed Vietnamese retailers. Company P (electronics and phones) has a net margin of 2.5%, asset turnover of 2.4 and an equity multiplier of 2.8. Company Q (a pharmacy chain) has a net margin of 1.2%, asset turnover of 2.9 and an equity multiplier of 4.5. Q has been opening stores rapidly, funded by short-term bank loans, and its inventory days have risen from 70 to 105. P reports under VAS; Q has voluntarily adopted IFRS.`,
      questions: [
        'Calculate each company’s ROE using the DuPont model. Which is higher, and why?',
        'Which company’s ROE is of higher quality? Discuss leverage and working capital.',
        'Why might differences between VAS and IFRS affect your comparison?',
        'What additional information would you seek before recommending either share?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Compare ratios over time, against peers and against expectations; use average balances for flow-to-stock ratios.`,
      R`Profitability: margins, ROA, ROE, and ROIC versus WACC for value creation.`,
      R`DuPont: ROE = margin × turnover × leverage (five-step: tax burden × interest burden × EBIT margin × turnover × leverage).`,
      R`Cash conversion cycle = DSO + DIO − DPO; a longer cycle ties up cash and weakens operating cash flow.`,
      R`Liquidity and solvency ratios feed lenders’ covenants; market ratios link fundamentals to price (P/E, EV/EBITDA, yield, P/B).`,
      R`Build a coherent story and state the questions the numbers raise.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A company has a net margin of 8%, asset turnover of 1.25 and an equity multiplier of 2.0. What is its ROE, in percent?`, answer: 20, tol: 0.01, solution: R`\(0.08 \times 1.25 \times 2.0 = 0.20 = 20\%\).` },
    { type: 'num', level: 'Core', q: R`DSO is 45 days, DIO is 60 days and DPO is 38 days. What is the cash conversion cycle, in days?`, answer: 67, tol: 0.01, solution: R`\(45 + 60 - 38 = 67\) days.` },
    { type: 'num', level: 'Core', q: R`EBIT is $90 million and interest expense is $15 million. What is interest cover?`, answer: 6, tol: 0.01, solution: R`\(90/15 = 6.0\) times.` },
    { type: 'num', level: 'Core', q: R`Current assets are $250 million, of which inventory is $100 million; current liabilities are $125 million. What is the quick ratio?`, answer: 1.2, tol: 0.001, solution: R`\((250 - 100)/125 = 1.2\).` },
    { type: 'num', level: 'Core', q: R`ROA is 6% and the equity multiplier is 2.5. What is ROE, in percent?`, answer: 15, tol: 0.01, solution: R`ROE \(= ROA \times\) equity multiplier \(= 6\% \times 2.5 = 15\%\).` },
    { type: 'num', level: 'Core', q: R`Market capitalisation is $3,000 million, net debt $800 million and EBITDA $475 million. What is EV/EBITDA?`, answer: 8, tol: 0.01, solution: R`EV \(= 3{,}000 + 800 = 3{,}800\). EV/EBITDA \(= 3{,}800/475 = 8.0\).` },
    { type: 'num', level: 'Stretch', q: R`For Harbour Retail, how much cash (in $ million, nearest million) is tied up by the 19.8-day increase in the cash conversion cycle, using year-2 cost of goods sold of $780 million?`, answer: 42, tol: 1, solution: R`\(780 \times 19.8/365 = \$42.3\) million, roughly the gap between what free cash flow could have been and what it was.` },
    { type: 'mcq', level: 'Core', q: 'Which ratio is the best measure of whether a company creates value from its operations, independent of financing?', options: ['ROE', 'ROIC compared with WACC', 'Current ratio', 'Dividend yield'], answer: 1, solution: R`**ROIC versus WACC**: ROIC uses after-tax operating profit and all invested capital, so leverage does not distort it.` },
    { type: 'mcq', level: 'Core', q: 'A company’s ROE rose from 12% to 18% while its net margin and asset turnover were unchanged. What drove the increase?', options: ['Higher profitability', 'Better asset efficiency', 'Higher financial leverage', 'Lower tax'], answer: 2, solution: R`With margin and turnover unchanged, the DuPont identity says the **equity multiplier** (leverage) rose, making ROE higher but riskier.` },
    { type: 'long', level: 'Stretch', q: 'Harbour Retail pays an 85% payout ratio while its free cash flow is close to zero. Explain how this is possible, whether it is sustainable, and what options management has.', answer: R`Dividends are paid in cash, but the payout ratio compares them with accounting profit. Harbour earned $100.8 million of profit, but its operating cash flow was only about $90.8 million because receivables and inventory absorbed cash, and capital expenditure of about $90 million consumed almost all of it, leaving free cash flow of about $0.8 million. The $85.8 million dividend was therefore financed mainly by new borrowing: debt rose by $70 million and cash fell by $15 million.

This is not sustainable indefinitely. Borrowing to pay dividends raises leverage each year, weakens interest cover and moves the company towards its covenants, while the working-capital build-up may signal slowing sales or unsaleable stock that could require write-downs.

Management’s options are to release working capital (tighter credit terms, inventory reduction and better supplier terms, which could free up about $40 million or more), slow capital expenditure on new stores until returns are proven, reduce the payout ratio to a level covered by free cash flow, or raise equity if growth opportunities genuinely earn more than the cost of capital. Investors attracted by the 6% yield should recognise that it is at risk unless cash generation improves.`, solution: 'Look for the profit-versus-cash distinction, the debt funding, sustainability limits and concrete options.' },
  ],
  glossary: [
    ['Common-size analysis', 'Expressing statement lines as percentages of revenue or total assets.'],
    ['Return on equity', 'Net profit divided by average shareholders’ equity.'],
    ['ROIC', 'After-tax operating profit divided by invested capital.'],
    ['DuPont analysis', 'Decomposing ROE into margin, turnover and leverage.'],
    ['Cash conversion cycle', 'DSO + DIO − DPO: days cash is tied up in operations.'],
    ['Quick ratio', 'Current assets excluding inventory, divided by current liabilities.'],
    ['Enterprise value', 'Market capitalisation plus net debt: the value of the whole business.'],
    ['Payout ratio', 'Dividends divided by net profit.'],
  ],
  resources: ['MIT535', 'DAMO', 'DAMO_DATA', 'OS_ACC', 'ASX', 'HOSE', 'book:KOLLER', 'book:DAMOB'],
};
