const R = String.raw;
export default {
  id: '22108-03', subject: '22108', title: 'Adjusting entries, closing and preparing the statements', mins: 75, level: 'Foundation',
  summary: 'Turning a trial balance into financial statements: the four types of adjusting entries (prepayments, unearned revenue, accrued expenses and accrued revenue), depreciation, inventory shrinkage and income tax; the adjusted trial balance; the income statement, statement of changes in equity and balance sheet; and closing entries, completing Mekong Roasters’ first month.',
  objectives: [
    'Explain why adjusting entries are needed under accrual accounting',
    'Record adjustments for prepaid expenses, unearned revenue, accrued expenses and accrued revenue',
    'Calculate and record straight-line depreciation and an inventory shrinkage adjustment',
    'Prepare an adjusted trial balance, income statement, statement of changes in equity and classified balance sheet',
    'Record closing entries and explain the difference between temporary and permanent accounts',
    'Explain how adjustments create opportunities for judgement and earnings management',
  ],
  body: [
    ['h', 'Why adjust?'],
    ['p', R`The trial balance at the end of lecture 2 recorded every transaction that involved an external document: invoices, receipts, bank transfers. But some events happen continuously, or without any document at the moment the period ends: rent is used up day by day, equipment wears out, interest accrues on a loan, staff work days they have not yet been paid for, and goods are delivered before an invoice is sent. Accrual accounting requires that these be recognised in the period in which they occur. **Adjusting entries** do that, just before the statements are prepared.`],
    ['table', {
      caption: 'The four families of adjustments',
      head: ['Type', 'Situation', 'Before adjustment', 'Adjusting entry'],
      rows: [
        ['Prepaid expense (deferral)', 'Cash paid in advance; benefit used over time', 'Asset overstated, expense understated', 'Dr Expense, Cr Prepaid asset'],
        ['Unearned revenue (deferral)', 'Cash received in advance; service provided over time', 'Liability overstated, revenue understated', 'Dr Unearned revenue, Cr Revenue'],
        ['Accrued expense', 'Expense incurred but not yet paid or billed', 'Liability and expense understated', 'Dr Expense, Cr Payable'],
        ['Accrued revenue', 'Revenue earned but not yet billed or received', 'Asset and revenue understated', 'Dr Receivable, Cr Revenue'],
      ],
    }],
    ['p', R`Notice the pattern: every adjustment touches **one income statement account and one balance sheet account**, and none of them involves cash. If an adjustment debits or credits cash, it is not an adjustment; it is a transaction you forgot.`],

    ['h', 'Adjusting Mekong Roasters at 31 July 2026'],
    ['p', R`Continuing from the unadjusted trial balance in lecture 2, the accountant identifies the following items.`],
    ['h3', '(a) Rent used up'],
    ['p', R`The company paid $9,000 for three months on 3 July. One month has been used: \(9{,}000/3 = \$3{,}000\).`],
    ['code', { lang: 'journal', say: 'Debit rent expense three thousand, credit prepaid rent three thousand.', src: R`31 Jul  Rent expense                     3,000
          Prepaid rent                                3,000` }],
    ['h3', '(b) Depreciation of equipment'],
    ['p', R`Equipment is used to generate revenue over several years, so its cost is spread over its useful life as **depreciation**. The roaster cost $60,000, is expected to last 5 years and to have a residual value of $6,000. Straight-line depreciation is:`],
    ['math', R`\text{Annual depreciation} = \frac{\text{Cost} - \text{Residual value}}{\text{Useful life}} = \frac{60{,}000 - 6{,}000}{5} = \$10{,}800 \text{ a year} = \$900 \text{ a month}`, 'Annual depreciation equals cost minus residual value, divided by useful life: sixty thousand minus six thousand, over five, is ten thousand eight hundred dollars a year, or nine hundred dollars a month.'],
    ['code', { lang: 'journal', say: 'Debit depreciation expense nine hundred, credit accumulated depreciation nine hundred.', src: R`31 Jul  Depreciation expense               900
          Accumulated depreciation - equipment          900` }],
    ['p', R`**Accumulated depreciation** is a **contra-asset** account: it has a credit balance and is deducted from the equipment’s cost on the balance sheet, so the original cost remains visible. Cost minus accumulated depreciation is the **carrying amount** (book value): here \(60{,}000 - 900 = \$59{,}100\). Carrying amount is an accounting allocation, not a market value.`],
    ['h3', '(c) Interest accrued on the loan'],
    ['p', R`The $50,000 loan charges 8% a year, payable quarterly. One month of interest has accrued but not been paid: \(50{,}000 \times 0.08/12 = \$333\) (rounded).`],
    ['code', { lang: 'journal', say: 'Debit interest expense three hundred and thirty three, credit interest payable.', src: R`31 Jul  Interest expense                   333
          Interest payable                              333` }],
    ['h3', '(d) Wages earned but unpaid'],
    ['p', R`A casual roaster worked the last three days of July and will be paid $600 in the first pay run of August.`],
    ['code', { lang: 'journal', say: 'Debit wages expense six hundred, credit wages payable six hundred.', src: R`31 Jul  Wages expense                      600
          Wages payable                                 600` }],
    ['h3', '(e) Revenue earned but not yet invoiced'],
    ['p', R`On 31 July the company delivered $1,500 of coffee to a café under a supply agreement; the invoice will be sent on 2 August. The beans cost $600. The performance obligation was satisfied in July, so the revenue belongs to July.`],
    ['code', { lang: 'journal', say: 'Debit accounts receivable fifteen hundred, credit sales revenue. Debit cost of goods sold six hundred, credit inventory.', src: R`31 Jul  Accounts receivable              1,500
          Sales revenue                               1,500
31 Jul  Cost of goods sold                 600
          Inventory                                     600` }],
    ['h3', '(f) Inventory shrinkage'],
    ['p', R`A stocktake finds beans on hand costing $7,950. The ledger shows \(8{,}800 - 600 = \$8{,}200\). The $250 difference (moisture damage and spillage) is written off to cost of goods sold.`],
    ['code', { lang: 'journal', say: 'Debit cost of goods sold two hundred and fifty, credit inventory.', src: R`31 Jul  Cost of goods sold                 250
          Inventory                                     250` }],
    ['h3', '(g) Income tax'],
    ['p', R`Mekong Roasters is a small "base rate entity", taxed at 25% in Australia (large companies pay 30%). After adjustments (a) to (f), profit before tax is $10,217 (see the income statement below), so tax expense is \(0.25 \times 10{,}217 = \$2{,}554\). (In practice taxable income differs from accounting profit, creating deferred tax, which is beyond this lecture.)`],
    ['code', { lang: 'journal', say: 'Debit income tax expense, credit income tax payable.', src: R`31 Jul  Income tax expense               2,554
          Income tax payable                          2,554` }],

    ['h', 'The adjusted financial statements'],
    ['table', {
      caption: 'Mekong Roasters Pty Ltd: income statement for July 2026',
      head: ['', '$', '$'],
      rows: [
        ['Sales revenue', '', '39,500'],
        ['Cost of goods sold', '', '(16,050)'],
        ['**Gross profit**', '', '**23,450**'],
        ['Wages', '8,100', ''], ['Rent', '3,000', ''], ['Utilities', '900', ''], ['Depreciation', '900', ''],
        ['Total operating expenses', '', '(12,900)'],
        ['**Operating profit (EBIT)**', '', '**10,550**'],
        ['Interest expense', '', '(333)'],
        ['**Profit before tax**', '', '**10,217**'],
        ['Income tax expense (25%)', '', '(2,554)'],
        ['**Profit after tax**', '', '**7,663**'],
      ],
    }],
    ['p', R`Before adjustments the figures suggested a profit of $14,400. Proper accruals, depreciation, interest, shrinkage and tax reduce it to $7,663. Adjustments matter.`],
    ['table', {
      caption: 'Statement of changes in equity for July 2026',
      head: ['', 'Share capital ($)', 'Retained earnings ($)', 'Total ($)'],
      rows: [
        ['Opening balance, 1 July', '0', '0', '0'],
        ['Shares issued', '80,000', '', '80,000'],
        ['Profit for the month', '', '7,663', '7,663'],
        ['Dividends', '', '(1,000)', '(1,000)'],
        ['**Closing balance, 31 July**', '**80,000**', '**6,663**', '**86,663**'],
      ],
    }],
    ['table', {
      caption: 'Balance sheet (statement of financial position) at 31 July 2026',
      head: ['', '$', '$'],
      rows: [
        ['**Current assets**', '', ''],
        ['Cash', '63,500', ''], ['Accounts receivable', '13,500', ''], ['Inventory', '7,950', ''], ['Prepaid rent', '6,000', ''],
        ['Total current assets', '', '90,950'],
        ['**Non-current assets**', '', ''],
        ['Equipment at cost', '60,000', ''], ['Less accumulated depreciation', '(900)', ''],
        ['Total non-current assets', '', '59,100'],
        ['**Total assets**', '', '**150,050**'],
        ['**Current liabilities**', '', ''],
        ['Accounts payable', '9,000', ''], ['Utilities payable', '900', ''], ['Wages payable', '600', ''], ['Interest payable', '333', ''], ['Income tax payable', '2,554', ''], ['Current portion of bank loan', '10,000', ''],
        ['Total current liabilities', '', '23,387'],
        ['**Non-current liabilities**', '', ''],
        ['Bank loan (non-current portion)', '', '40,000'],
        ['**Total liabilities**', '', '**63,387**'],
        ['**Equity**', '', ''],
        ['Share capital', '80,000', ''], ['Retained earnings', '6,663', ''],
        ['**Total equity**', '', '**86,663**'],
        ['**Total liabilities and equity**', '', '**150,050**'],
      ],
    }],
    ['p', R`A **classified** balance sheet separates **current** items (expected to be realised or settled within 12 months, or within the operating cycle) from **non-current** ones. The loan requires $10,000 of principal to be repaid each year, so $10,000 is shown as current. Classification matters for analysis: the **current ratio** here is \(90{,}950/23{,}387 = 3.9\), comfortable liquidity for a start-up.`],
    ['note', R`The statements link together. Profit from the income statement flows into retained earnings in the statement of changes in equity, and closing equity appears in the balance sheet. The statement of cash flows (lecture 6) explains the change in the cash line. Analysts call this articulation, and a forecast model that does not articulate is wrong.`],

    ['h', 'Closing entries'],
    ['p', R`Revenue, expense and dividend accounts are **temporary** accounts: they accumulate one period’s activity and must start the next period at zero. Balance sheet accounts are **permanent**: their balances carry forward. At year end (and for Mekong Roasters, we will close July to illustrate), **closing entries** transfer temporary balances to retained earnings:`],
    ['steps', [
      R`Debit each revenue account and credit retained earnings (or a temporary income summary account) for total revenue: $39,500.`,
      R`Debit retained earnings and credit each expense account for total expenses: \(16{,}050 + 12{,}900 + 333 + 2{,}554 = \$31{,}837\).`,
      R`Debit retained earnings and credit dividends: $1,000.`,
    ]],
    ['p', R`Retained earnings then equal \(39{,}500 - 31{,}837 - 1{,}000 = \$6{,}663\), matching the statement of changes in equity. A post-closing trial balance contains only permanent accounts.`],

    ['h', 'Judgement, estimates and earnings management'],
    ['p', R`Adjustments require estimates: useful lives and residual values, how much of the receivables will not be collected, whether inventory is worth its cost, how much warranty work will be needed. Reasonable people can differ, and managers can nudge estimates to smooth or inflate profit, which is called **earnings management**. Stretching the roaster’s life from 5 to 8 years would cut monthly depreciation from $900 to about $563 and raise reported profit, without any change in the business. Analysts therefore read the accounting policy notes, compare estimates with peers, and watch for changes in estimates, especially when they help a company just meet a target.`],
    ['warn', R`Depreciation is not a cash flow: the cash left when the equipment was bought. That is why analysts add it back when estimating cash flows (EBITDA, operating cash flow). But ignoring depreciation entirely is dangerous: the equipment will need replacing, so over time depreciation approximates a real economic cost.`],

    ['case', {
      title: 'Year-end adjustments at a Hanoi training centre',
      text: R`A training company in Hanoi prepares its accounts at 31 December. Its trial balance shows: prepaid insurance of 36 million dong (a 12-month policy bought on 1 October); unearned tuition of 240 million dong, received on 1 November for a six-month course starting that day; office equipment costing 480 million dong, bought on 1 January with a 4-year life and no residual value, not yet depreciated; and no entry yet for December staff salaries of 95 million dong, which will be paid on 5 January.`,
      questions: [
        'Prepare the four adjusting entries at 31 December.',
        'By how much does each adjustment change profit before tax?',
        'Which balance sheet accounts change, and by how much?',
        'Which of these estimates involves the most judgement, and how might a manager misuse it?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Adjusting entries recognise prepayments used, unearned revenue earned, expenses accrued and revenue accrued; none involves cash.`,
      R`Straight-line depreciation = (cost − residual)/life; accumulated depreciation is a contra-asset.`,
      R`Adjusted trial balance → income statement → statement of changes in equity → balance sheet; the statements articulate.`,
      R`Closing entries reset temporary accounts to zero through retained earnings.`,
      R`Estimates in adjustments create room for earnings management; read the notes.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A delivery van costs $48,000, has a residual value of $8,000 and a useful life of 4 years. What is the annual straight-line depreciation?`, answer: 10000, tol: 0.5, solution: R`\((48{,}000 - 8{,}000)/4 = \$10{,}000\) a year.` },
    { type: 'num', level: 'Core', q: R`A $120,000 loan at 6% a year was taken out on 1 April; interest is paid annually on 31 March. How much interest should be accrued at 30 June?`, answer: 1800, tol: 0.5, solution: R`Three months: \(120{,}000 \times 0.06 \times 3/12 = \$1{,}800\). Dr Interest expense, Cr Interest payable.` },
    { type: 'num', level: 'Core', q: R`A 12-month insurance policy costing $7,200 was paid on 1 February. How much insurance expense belongs to the year ending 30 June?`, answer: 3000, tol: 0.5, solution: R`February to June is 5 months: \(7{,}200 \times 5/12 = \$3{,}000\). The remaining \$4,200 is a prepaid asset.` },
    { type: 'num', level: 'Core', q: R`Supplies on hand were recorded at $1,850 in the ledger; a count at year end finds $620 on hand. What is supplies expense for the adjustment?`, answer: 1230, tol: 0.5, solution: R`\(1{,}850 - 620 = \$1{,}230\) used: Dr Supplies expense, Cr Supplies.` },
    { type: 'num', level: 'Stretch', q: R`If Mekong Roasters had depreciated its $60,000 roaster over 8 years (residual $6,000) instead of 5, by how much would July profit before tax have been higher? (Nearest dollar.)`, answer: 338, tol: 1, solution: R`New monthly depreciation \(= (60{,}000 - 6{,}000)/8/12 = \$562.50\). Difference \(= 900 - 562.50 = \$337.50\), about **$338**.` },
    { type: 'mcq', level: 'Core', q: 'Which adjusting entry records salaries earned by staff but not yet paid at year end?', options: ['Dr Salaries payable, Cr Cash', 'Dr Salaries expense, Cr Salaries payable', 'Dr Cash, Cr Salaries expense', 'Dr Salaries expense, Cr Cash'], answer: 1, solution: R`An **accrued expense**: recognise the expense and the liability. Cash is paid later.` },
    { type: 'mcq', level: 'Core', q: 'A magazine publisher received $24,000 for 12-month subscriptions on 1 January. What is the adjusting entry at 31 March?', options: ['Dr Revenue 6,000, Cr Unearned revenue 6,000', 'Dr Unearned revenue 6,000, Cr Revenue 6,000', 'Dr Cash 6,000, Cr Revenue 6,000', 'No entry is needed'], answer: 1, solution: R`Three months of the obligation have been satisfied: move \(24{,}000 \times 3/12 = \$6{,}000\) from the liability to revenue.` },
    { type: 'mcq', level: 'Core', q: 'Which account is a permanent (real) account that is not closed at year end?', options: ['Sales revenue', 'Depreciation expense', 'Accumulated depreciation', 'Dividends'], answer: 2, solution: R`**Accumulated depreciation** is a balance sheet (contra-asset) account; its balance carries forward. Revenue, expenses and dividends are temporary.` },
    { type: 'long', level: 'Stretch', q: 'Explain why every adjusting entry affects one income statement account and one balance sheet account, and why no adjusting entry involves cash.', answer: R`Adjusting entries exist to allocate revenue and expenses to the correct period under accrual accounting. The mismatch they correct is always one of timing between when an economic event occurs and when cash moves or a document is recorded. When cash moved earlier (a prepayment or advance receipt), the original entry created a balance sheet item (prepaid asset or unearned revenue liability); the adjustment moves the portion that belongs to this period into the income statement. When cash will move later (accrued expenses and revenue), nothing has yet been recorded; the adjustment recognises the income statement effect now and creates the balance sheet item (payable or receivable) that will be settled later.

In both cases one side of the entry is the revenue or expense being allocated to the period, and the other is the balance sheet account that carries the timing difference. Cash cannot be involved, because the cash movement either already happened and was recorded, or has not happened yet. If an end-of-period entry needs to debit or credit cash, it is correcting an unrecorded transaction or an error, not making an accrual adjustment.`, solution: 'Look for the timing-difference explanation with both deferrals and accruals, and the reason cash is never part of an adjustment.' },
  ],
  glossary: [
    ['Adjusting entry', 'An end-of-period entry that allocates revenue or expense to the correct period.'],
    ['Deferral', 'A cash flow that occurs before the related revenue or expense is recognised.'],
    ['Accrual', 'Revenue or expense recognised before the related cash flow.'],
    ['Depreciation', 'The systematic allocation of an asset’s cost over its useful life.'],
    ['Accumulated depreciation', 'A contra-asset account holding total depreciation to date.'],
    ['Carrying amount', 'Cost less accumulated depreciation (and impairment).'],
    ['Closing entries', 'Entries that transfer temporary account balances to retained earnings.'],
    ['Earnings management', 'Using accounting discretion to influence reported profit.'],
  ],
  resources: ['OS_ACC', 'MIT501', 'AASB', 'IFRS_CF', 'ATO_RATES'],
};
