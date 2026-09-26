const R = String.raw;
export default {
  id: '22108-02', subject: '22108', title: 'Recording transactions: the accounting equation and double entry', mins: 75, level: 'Foundation',
  summary: 'How every transaction flows into the accounts: the accounting equation, the dual effect of transactions, debits and credits, journals, ledgers and T-accounts, and the trial balance, worked through a full first month of a coffee-roasting start-up.',
  objectives: [
    'State the accounting equation and show how every transaction keeps it in balance',
    'Analyse transactions into their effects on assets, liabilities, equity, revenue and expenses',
    'Apply the rules of debit and credit and record journal entries',
    'Post entries to ledger (T) accounts and calculate balances',
    'Prepare a trial balance and explain what it can and cannot detect',
    'Distinguish capital contributions and dividends from revenue and expenses',
  ],
  body: [
    ['h', 'The accounting equation'],
    ['p', R`Every entity’s resources were supplied by someone: either by lenders and other creditors, who have claims called liabilities, or by the owners, whose residual claim is equity. This gives the **accounting equation**, which must hold at every moment:`],
    ['math', R`\text{Assets} = \text{Liabilities} + \text{Equity}`, 'Assets equal liabilities plus equity.'],
    ['p', R`Equity grows when owners contribute capital and when the business earns profit (revenue minus expenses), and shrinks when it makes losses or distributes dividends. So the expanded equation is:`],
    ['math', R`\text{Assets} = \text{Liabilities} + \text{Share capital} + \text{Retained earnings}, \quad \text{Retained earnings} = \text{Opening RE} + \text{Revenue} - \text{Expenses} - \text{Dividends}`, 'Assets equal liabilities plus share capital plus retained earnings, where retained earnings equal opening retained earnings plus revenue minus expenses minus dividends.'],
    ['p', R`Every transaction affects at least two items in a way that keeps the equation balanced. This **dual effect** is the foundation of **double-entry bookkeeping**, a system recorded by the Italian mathematician Luca Pacioli in 1494 and used by every organisation in the world today, from the corner café to the Commonwealth Bank.`],

    ['h', 'Our company: Mekong Roasters Pty Ltd'],
    ['p', R`Throughout the next lectures we follow a start-up: **Mekong Roasters Pty Ltd**, founded by two UTS graduates to import green coffee beans from Vietnam’s Central Highlands and sell roasted coffee to Sydney cafés. Here is its first month, July 2026 (a fictional company with illustrative numbers).`],
    ['table', {
      caption: 'Mekong Roasters: July 2026 transactions',
      head: ['#', 'Date', 'Transaction'],
      rows: [
        ['1', '1 Jul', 'The founders invest $80,000 cash in exchange for shares.'],
        ['2', '1 Jul', 'The company borrows $50,000 from a bank (a 5-year loan at 8% a year).'],
        ['3', '2 Jul', 'Buys roasting equipment for $60,000 cash.'],
        ['4', '3 Jul', 'Pays $9,000 rent in advance for July, August and September.'],
        ['5', '5 Jul', 'Buys green beans (inventory) for $24,000 on credit, due in 30 days.'],
        ['6', '15 Jul', 'Sells roasted coffee to cafés for $30,000 on credit; the beans used cost $12,000.'],
        ['7', '20 Jul', 'Cash sales at a market stall of $8,000; the beans used cost $3,200.'],
        ['8', '25 Jul', 'Collects $18,000 from café customers.'],
        ['9', '28 Jul', 'Pays suppliers $15,000.'],
        ['10', '31 Jul', 'Pays July wages of $7,500 in cash.'],
        ['11', '31 Jul', 'Receives a $900 electricity bill for July, to be paid in August.'],
        ['12', '31 Jul', 'Pays a $1,000 dividend to the founders.'],
      ],
    }],

    ['h', 'Analysing transactions with the equation'],
    ['p', R`Before any debits and credits, ask two questions of each transaction: **which items change**, and **by how much, in which direction**?`],
    ['table', {
      caption: 'Effect of each transaction on the accounting equation ($)',
      head: ['#', 'Assets', 'Liabilities', 'Equity', 'Explanation'],
      rows: [
        ['1', 'Cash +80,000', '', 'Share capital +80,000', 'Owners contribute capital. Not revenue.'],
        ['2', 'Cash +50,000', 'Loan +50,000', '', 'Borrowing creates an obligation. Not revenue.'],
        ['3', 'Equipment +60,000; Cash −60,000', '', '', 'One asset exchanged for another.'],
        ['4', 'Prepaid rent +9,000; Cash −9,000', '', '', 'Paying in advance creates an asset: three months of use.'],
        ['5', 'Inventory +24,000', 'Accounts payable +24,000', '', 'Bought on credit.'],
        ['6', 'Receivables +30,000; Inventory −12,000', '', 'Revenue +30,000; Cost of goods sold −12,000', 'A credit sale: revenue earned now; the cost of the beans sold becomes an expense.'],
        ['7', 'Cash +8,000; Inventory −3,200', '', 'Revenue +8,000; Cost of goods sold −3,200', 'A cash sale.'],
        ['8', 'Cash +18,000; Receivables −18,000', '', '', 'Collecting a receivable is not new revenue.'],
        ['9', 'Cash −15,000', 'Accounts payable −15,000', '', 'Paying a debt is not an expense.'],
        ['10', 'Cash −7,500', '', 'Wages expense −7,500', 'An expense reduces equity.'],
        ['11', '', 'Utilities payable +900', 'Utilities expense −900', 'An expense incurred but unpaid.'],
        ['12', 'Cash −1,000', '', 'Dividends −1,000', 'A distribution to owners. Not an expense.'],
      ],
    }],
    ['warn', R`Three of the most common beginner errors appear in this table. Borrowing money (2) and owners’ contributions (1) are **not revenue**. Collecting a receivable (8) is **not revenue** again: the revenue was recognised when the sale was made. Paying a supplier (9) or a dividend (12) is **not an expense**.`],

    ['h', 'Debits and credits'],
    ['p', R`Accountants record the dual effect using **debits** (Dr, the left side of an account) and **credits** (Cr, the right side). The words simply mean left and right; they have nothing to do with good or bad. The rules follow from the accounting equation: items on the left of the equation (assets) increase on the left (debit); items on the right (liabilities and equity) increase on the right (credit). Because revenue increases equity it is credited; because expenses and dividends decrease equity they are debited.`],
    ['table', {
      caption: 'The rules of debit and credit',
      head: ['Account type', 'Increase', 'Decrease', 'Normal balance'],
      rows: [
        ['Assets', 'Debit', 'Credit', 'Debit'],
        ['Expenses (and dividends)', 'Debit', 'Credit', 'Debit'],
        ['Liabilities', 'Credit', 'Debit', 'Credit'],
        ['Equity (share capital, retained earnings)', 'Credit', 'Debit', 'Credit'],
        ['Revenue', 'Credit', 'Debit', 'Credit'],
      ],
    }],
    ['key', R`In every journal entry, total debits equal total credits. That single rule keeps the accounting equation in balance and makes errors detectable.`],
    ['p', R`A helpful mnemonic is **DEAD CLIC**: **D**ebits increase **E**xpenses, **A**ssets and **D**ividends (drawings); **C**redits increase **L**iabilities, **I**ncome and **C**apital.`],

    ['h', 'The journal'],
    ['p', R`Transactions are first recorded in chronological order in the **general journal**, with the date, the accounts debited and credited, the amounts and a short explanation.`],
    ['code', { lang: 'journal', say: 'The general journal lists each transaction with its debit and credit, for example debit cash and credit share capital for eighty thousand dollars.', src: R`Date    Account                          Debit      Credit
1 Jul   Cash                            80,000
          Share capital                              80,000   (issue of shares)
1 Jul   Cash                            50,000
          Bank loan                                  50,000   (5-year loan)
2 Jul   Equipment                       60,000
          Cash                                       60,000
3 Jul   Prepaid rent                     9,000
          Cash                                        9,000   (rent Jul-Sep)
5 Jul   Inventory                       24,000
          Accounts payable                           24,000
15 Jul  Accounts receivable             30,000
          Sales revenue                              30,000
15 Jul  Cost of goods sold              12,000
          Inventory                                  12,000
20 Jul  Cash                             8,000
          Sales revenue                               8,000
20 Jul  Cost of goods sold               3,200
          Inventory                                   3,200
25 Jul  Cash                            18,000
          Accounts receivable                        18,000
28 Jul  Accounts payable                15,000
          Cash                                       15,000
31 Jul  Wages expense                    7,500
          Cash                                        7,500
31 Jul  Utilities expense                  900
          Utilities payable                             900
31 Jul  Dividends                        1,000
          Cash                                        1,000` }],
    ['p', R`Mekong Roasters uses a **perpetual inventory system**: each sale records both the revenue and the cost of the goods sold, so the inventory account always shows what should be on hand. The alternative, a periodic system, calculates cost of goods sold at period end from a stock count.`],

    ['h', 'The ledger and T-accounts'],
    ['p', R`Each journal entry is then **posted** to the individual accounts in the **general ledger**. A simple way to picture a ledger account is a **T-account**, with debits on the left and credits on the right. Here is the cash account for July:`],
    ['table', {
      caption: 'Cash (T-account)',
      head: ['Debit (increases)', '$', 'Credit (decreases)', '$'],
      rows: [
        ['1 Jul Share capital', '80,000', '2 Jul Equipment', '60,000'],
        ['1 Jul Bank loan', '50,000', '3 Jul Prepaid rent', '9,000'],
        ['20 Jul Sales', '8,000', '28 Jul Accounts payable', '15,000'],
        ['25 Jul Accounts receivable', '18,000', '31 Jul Wages', '7,500'],
        ['', '', '31 Jul Dividends', '1,000'],
        ['Total', '156,000', 'Total', '92,500'],
        ['**Balance (debit)**', '**63,500**', '', ''],
      ],
    }],
    ['p', R`The other balances at 31 July are: accounts receivable \(30{,}000 - 18{,}000 = \$12{,}000\); inventory \(24{,}000 - 12{,}000 - 3{,}200 = \$8{,}800\); accounts payable \(24{,}000 - 15{,}000 = \$9{,}000\).`],

    ['h', 'The trial balance'],
    ['p', R`At the end of the period we list every ledger balance in a **trial balance**. If the double entry has been done correctly, total debits equal total credits.`],
    ['table', {
      caption: 'Mekong Roasters: unadjusted trial balance at 31 July 2026',
      head: ['Account', 'Debit ($)', 'Credit ($)'],
      rows: [
        ['Cash', '63,500', ''], ['Accounts receivable', '12,000', ''], ['Inventory', '8,800', ''], ['Prepaid rent', '9,000', ''], ['Equipment', '60,000', ''],
        ['Accounts payable', '', '9,000'], ['Utilities payable', '', '900'], ['Bank loan', '', '50,000'], ['Share capital', '', '80,000'],
        ['Sales revenue', '', '38,000'], ['Cost of goods sold', '15,200', ''], ['Wages expense', '7,500', ''], ['Utilities expense', '900', ''], ['Dividends', '1,000', ''],
        ['**Totals**', '**177,900**', '**177,900**'],
      ],
    }],
    ['p', R`The trial balance balances. But a balanced trial balance does **not** prove the accounts are right. It cannot detect a transaction left out entirely, an entry posted to the wrong account of the same type (wages recorded as rent), equal errors on both sides, or a transaction recorded at the wrong amount on both sides. It only confirms that debits equal credits.`],
    ['p', R`Check the accounting equation using the balances: assets \(= 63{,}500 + 12{,}000 + 8{,}800 + 9{,}000 + 60{,}000 = \$153{,}300\). Liabilities \(= 9{,}000 + 900 + 50{,}000 = \$59{,}900\). Equity \(= 80{,}000 + (38{,}000 - 15{,}200 - 7{,}500 - 900) - 1{,}000 = \$93{,}400\). And \(59{,}900 + 93{,}400 = \$153{,}300\). ✓`],
    ['note', R`This trial balance is **unadjusted**. It ignores several things that happened in July but are not yet recorded: a month of rent has been used up, the equipment has started to wear out, and a month of interest has accrued on the loan. Lecture 3 makes those **adjusting entries**, which will reduce July’s profit below the \$14,400 the unadjusted figures suggest.`],

    ['h', 'Why this matters for finance'],
    ['p', R`You will rarely record journal entries as a finance professional, but you will constantly reason about them. When a company announces that it has "sold its head office and leased it back", "capitalised software costs", "raised $500 million of hybrid capital" or "pre-sold apartments", you need to know which accounts move and how the statements change. When an analyst models a company, every forecast balance sheet must balance for exactly the reasons in this lecture. And many frauds, from WorldCom recording expenses as assets to companies booking fictitious receivables, were simply wrong debits and credits on a massive scale.`],

    ['case', {
      title: 'August at Mekong Roasters',
      text: R`In August 2026 Mekong Roasters: (a) collects the remaining $12,000 of receivables; (b) pays the $900 electricity bill and the remaining $9,000 owed to suppliers; (c) buys $30,000 of beans on credit; (d) sells coffee for $46,000 on credit, with beans costing $18,400; (e) receives a $4,000 deposit from a hotel chain for coffee to be delivered in September; (f) pays wages of $8,200; (g) repays $2,000 of the bank loan principal and pays $330 of interest.`,
      questions: [
        'Show the effect of each transaction on the accounting equation.',
        'Write the journal entries.',
        'Which of these items are revenue or expenses, and which are not? Explain the deposit in (e) and the loan repayment in (g).',
        'Calculate the cash balance at the end of August, starting from $63,500.',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Assets = Liabilities + Equity, always; every transaction has a dual effect.`,
      R`Equity rises with capital contributions and revenue; falls with expenses and dividends.`,
      R`Debits increase assets, expenses and dividends; credits increase liabilities, equity and revenue. Debits always equal credits.`,
      R`Journal → ledger (T-accounts) → trial balance.`,
      R`A balanced trial balance does not guarantee correct accounts; adjustments come next.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A company has assets of $420,000 and liabilities of $265,000. What is its equity?`, answer: 155000, tol: 0.5, solution: R`Equity \(= 420{,}000 - 265{,}000 = \$155{,}000\).` },
    { type: 'num', level: 'Core', q: R`Opening retained earnings were $40,000. During the year revenue was $310,000, expenses $268,000 and dividends $15,000. What are closing retained earnings?`, answer: 67000, tol: 0.5, solution: R`\(40{,}000 + 310{,}000 - 268{,}000 - 15{,}000 = \$67{,}000\).` },
    { type: 'num', level: 'Core', q: R`In the case study for August, what is Mekong Roasters’ cash balance at 31 August? (Start from $63,500.)`, answer: 59070, tol: 0.5, solution: R`Receipts: 12,000 + 4,000 = 16,000. Payments: 900 + 9,000 + 8,200 + 2,000 + 330 = 20,430. Balance \(= 63{,}500 + 16{,}000 - 20{,}430 = \$59{,}070\). The bean purchase (c) and the credit sale (d) do not affect cash in August.` },
    { type: 'mcq', level: 'Core', q: 'A company pays $5,000 owed to a supplier. What is the journal entry?', options: ['Dr Expense, Cr Cash', 'Dr Accounts payable, Cr Cash', 'Dr Cash, Cr Accounts payable', 'Dr Inventory, Cr Cash'], answer: 1, solution: R`The liability falls (**debit accounts payable**) and cash falls (**credit cash**). No expense arises: the expense (or inventory) was recorded when the goods were bought.` },
    { type: 'mcq', level: 'Core', q: 'Which account normally has a credit balance?', options: ['Prepaid rent', 'Wages expense', 'Sales revenue', 'Dividends'], answer: 2, solution: R`Revenue increases equity, so it has a normal **credit** balance. Assets, expenses and dividends have debit balances.` },
    { type: 'mcq', level: 'Core', q: 'A company receives $10,000 from a bank loan. Which statement is correct?', options: ['Revenue increases by $10,000', 'Assets and liabilities each increase by $10,000', 'Equity increases by $10,000', 'Assets increase and equity decreases'], answer: 1, solution: R`Cash (asset) and the loan (liability) both rise. Borrowing is **not revenue** and does not change equity.` },
    { type: 'mcq', level: 'Stretch', q: 'Wages of $2,000 were mistakenly debited to rent expense instead of wages expense. Will the trial balance detect this?', options: ['Yes, debits will exceed credits', 'Yes, credits will exceed debits', 'No, because total debits and credits are unaffected', 'No, because wages are not in the trial balance'], answer: 2, solution: R`An error of **classification** within the same type of account leaves total debits equal to total credits, so the trial balance still balances.` },
    { type: 'long', level: 'Core', q: 'Explain why paying a dividend reduces equity but is not an expense, and why collecting cash from a customer who bought on credit does not increase profit.', answer: R`An expense is a decrease in assets (or increase in liabilities) arising from the entity’s activities to earn revenue, other than distributions to owners. A dividend is a **distribution to owners**: it transfers part of the owners’ residual interest back to them. Equity falls because the company’s assets (cash) fall and nothing is owed in return, but the payment is not a cost of running the business, so it is excluded from profit and shown in the statement of changes in equity instead. Treating dividends as expenses would make a company’s performance depend on how much it chooses to distribute, which would be misleading.

When a customer buys on credit, revenue is recognised at the time of sale because the company has satisfied its obligation to deliver the goods; at that point an asset, accounts receivable, is recorded. When the customer later pays, one asset (receivables) is simply exchanged for another (cash). Total assets and equity do not change, so there is no additional revenue or profit. Counting the collection as revenue would double-count the sale.`, solution: 'Look for the owner-distribution argument for dividends and the asset-exchange argument for collections.' },
  ],
  glossary: [
    ['Accounting equation', 'Assets = Liabilities + Equity.'],
    ['Double entry', 'Recording every transaction with equal debits and credits in at least two accounts.'],
    ['Debit', 'An entry on the left side of an account; increases assets and expenses.'],
    ['Credit', 'An entry on the right side of an account; increases liabilities, equity and revenue.'],
    ['General journal', 'The chronological record of transactions.'],
    ['General ledger', 'The collection of all accounts and their balances.'],
    ['Trial balance', 'A list of all ledger balances to check that debits equal credits.'],
    ['Perpetual inventory', 'A system that updates inventory and cost of goods sold with every purchase and sale.'],
  ],
  resources: ['OS_ACC', 'MIT501', 'AASB', 'IFRS_CF', 'KHAN'],
};
