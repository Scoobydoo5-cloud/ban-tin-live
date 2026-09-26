const R = String.raw;
export default {
  id: '25400-01', subject: '25400', title: 'The financial world you live in', mins: 55, level: 'Foundation',
  summary: 'What finance is, why every household is a small financial firm, how savers meet borrowers through markets and intermediaries, the price of money, and who protects you in Australia, the US and Vietnam.',
  objectives: [
    'Explain the three questions every financial decision answers: time, risk and who bears the consequences',
    'Build a personal balance sheet and cash-flow statement and interpret net worth',
    'Describe how funds flow from savers to borrowers directly through markets and indirectly through intermediaries',
    'Explain why banks and other intermediaries exist, using transaction costs, information asymmetry and asset transformation',
    'Convert nominal returns into real, after-tax returns with the Fisher relation',
    'Name the main Australian regulators and consumer protections, and their counterparts in the US and Vietnam',
    'Apply a structured six-step framework to a personal financial decision',
  ],
  body: [
    ['h', 'Why finance is everyone’s business'],
    ['p', R`Welcome to the first lecture of the program. Before we touch a single formula, I want you to see that finance is not a subject about banks or stock screens. It is the study of how people, firms and governments make decisions about money **across time** and **under uncertainty**. Every one of you already makes such decisions. You chose to study rather than work full time: that is an investment decision. You may pay rent weekly while your pay arrives fortnightly: that is a liquidity problem. You may be carrying a HELP debt: that is a financing decision, made on your behalf with generous terms.`],
    ['p', R`Strip any financial decision down and you will find three questions. First, **when** do the cash flows happen? A dollar today and a dollar in five years are different goods. Second, **how certain** are they? A promised dollar from the Australian Government and a promised dollar from a start-up are different goods too. Third, **who** bears the consequences if things go wrong, and who has the information? That third question is about contracts, incentives and institutions, and it is why we need banks, regulators and laws.`],
    ['key', R`Finance is about three things: the time value of money, the price of risk, and the design of contracts and institutions that allow strangers to trust each other with money.`],
    ['p', R`Many introductory textbooks summarise the subject with a handful of principles. I will use five throughout this program, and you will meet each of them again and again:`],
    ['olist', [
      R`**Money has a time value.** A dollar received earlier can be invested, so it is worth more than a dollar received later.`,
      R`**Risk requires a reward.** Investors will only hold risky assets if they expect, on average, to be compensated with a higher return.`,
      R`**Cash flows are what matter.** Value comes from the cash an asset produces, not from accounting profit or from how a number is presented.`,
      R`**Market prices are usually well informed.** In deep, competitive markets, prices quickly reflect public information, so beating the market consistently is hard.`,
      R`**Conflicts of interest are everywhere.** Managers, advisers, brokers and borrowers do not always act in your interest, so contracts, disclosure and regulation matter.`,
    ]],
    ['note', R`Keep these five principles in your pocket. When a product, a pitch or a newspaper article confuses you, ask which principle it is quietly violating. A "guaranteed 15% return with no risk" violates principle 2. A company celebrating record profit while running out of cash reminds you of principle 3.`],

    ['h', 'Your household is a small financial firm'],
    ['p', R`A company summarises its finances in two main statements: a **balance sheet**, which is a snapshot of what it owns and owes at one moment, and an **income or cash-flow statement**, which records what came in and went out over a period. A household can use exactly the same tools, and learning them now will make the accounting subject in this program feel familiar.`],
    ['defs', [
      ['Asset', 'Something you own that has monetary value: cash, deposits, shares, a car, your superannuation balance.'],
      ['Liability', 'Money you owe to someone else: a credit card balance, a car loan, a HELP debt, a mortgage.'],
      ['Net worth (equity)', 'Assets minus liabilities. It is what would be left if you sold everything you own and repaid everything you owe.'],
      ['Liquidity', 'How quickly and cheaply an asset can be turned into cash without losing value. Cash is perfectly liquid; a house is not.'],
      ['Cash flow', 'Money actually received or paid during a period, as opposed to a change in the value of something you own.'],
    ]],
    ['math', R`\text{Net worth} = \text{Total assets} - \text{Total liabilities}`, 'Net worth equals total assets minus total liabilities.'],
    ['example', {
      title: 'A student’s personal balance sheet',
      setup: R`Linh is a second-year business student in Sydney. On 30 June she lists what she owns and owes. Her laptop and car are recorded at what they would sell for today, not at what she paid.`,
      steps: [
        R`Assets: transaction account $1,800; high-interest savings $6,500; laptop $1,400; car $9,000; superannuation $4,200; ETF units $2,100. Total assets = $25,000.`,
        R`Liabilities: credit card $1,250; car loan $5,600; HELP debt $18,400. Total liabilities = $25,250.`,
        R`Net worth = $25,000 − $25,250 = −$250.`,
        R`Liquid assets (cash and savings) = $8,300. Short-term debt that could be demanded soon (the credit card) = $1,250, so she can cover it more than six times over.`,
      ],
      answer: R`Linh’s net worth is slightly negative, −$250, but her position is healthy: she is liquid, her largest debt (HELP) is indexed rather than charged commercial interest, and her biggest asset, her future earning power from a degree, does not appear on the balance sheet at all.`,
    }],
    ['p', R`That last point deserves a moment. Economists call your future earning power **human capital**. For a young person it is by far the largest asset, and it explains why borrowing to study can be perfectly rational even though it pushes measured net worth below zero. As you age, you gradually convert human capital into financial capital by saving part of your income. Much of personal finance is about managing that conversion well.`],
    ['p', R`The second statement is the **cash-flow statement**, sometimes called a budget when it looks forward rather than back. It separates regular income, regular spending, irregular spending and saving. The single most useful number it produces is the **saving rate**: the share of after-tax income that is not spent.`],
    ['math', R`\text{Saving rate} = \frac{\text{After-tax income} - \text{Consumption spending}}{\text{After-tax income}}`, 'The saving rate is after-tax income minus consumption spending, divided by after-tax income.'],
    ['table', {
      caption: 'Linh’s monthly cash flow (illustrative)',
      head: ['Item', 'Amount per month', 'Comment'],
      rows: [
        ['Pay from casual job, after tax', '$2,600', 'About 22 hours a week'],
        ['Rent (share house)', '−$1,300', 'The largest fixed cost'],
        ['Food and groceries', '−$450', 'Variable; can be managed'],
        ['Transport, phone, internet', '−$220', 'Mostly fixed'],
        ['Car loan repayment', '−$210', 'Contractual; part interest, part principal'],
        ['Entertainment and other', '−$170', 'Discretionary'],
        ['Left over for saving', '$250', 'Saving rate = 250 / 2,600 ≈ 9.6%'],
      ],
    }],
    ['warn', R`Students often count the whole car loan repayment as "spending". Only the interest part is a cost. The principal part reduces a liability, so it is a form of saving: your net worth rises by that amount. We will split repayments into interest and principal properly in lecture 3.`],

    ['h', 'How money flows from savers to borrowers'],
    ['p', R`At any moment an economy contains people and organisations with **more money than they currently need** (surplus units, or savers) and others with **productive uses for money they do not yet have** (deficit units, or borrowers). A retiree with savings, a company with spare cash and a super fund receiving contributions are surplus units. A young couple buying a home, a firm building a factory and a government running a budget deficit are deficit units. The job of the financial system is to move funds from the first group to the second, at a price, while sharing the risks sensibly.`],
    ['p', R`There are two routes. In **direct finance**, the borrower sells a security straight to the saver through a financial market: a company issues shares or bonds on the ASX, and investors buy them. In **indirect finance**, a **financial intermediary** stands in the middle: you deposit money with a bank, and the bank lends it to a home buyer. You have a claim on the bank, not on the home buyer, and the bank carries the credit risk.`],
    ['table', {
      caption: 'Direct versus indirect finance',
      head: ['Feature', 'Direct finance (markets)', 'Indirect finance (intermediaries)'],
      rows: [
        ['Who the saver has a claim on', 'The issuer: the company or government', 'The intermediary: the bank, insurer or fund'],
        ['Typical instruments', 'Shares, corporate and government bonds, commercial paper', 'Deposits, loans, insurance policies, super accounts'],
        ['Who assesses the borrower', 'The investor, helped by ratings, analysts and disclosure rules', 'The intermediary’s credit team'],
        ['Main users', 'Large firms, governments, institutional investors', 'Households and small and medium businesses'],
        ['Australian examples', 'An ASX listing; an Australian Government bond auction run by the AOFM', 'A Commonwealth Bank home loan; an AustralianSuper account'],
      ],
    }],
    ['h3', 'Why intermediaries exist at all'],
    ['p', R`If markets let savers lend directly, why do banks exist? Because lending to strangers is expensive and dangerous, and intermediaries reduce both problems.`],
    ['list', [
      R`**Transaction costs.** Writing a loan contract, checking a borrower, collecting repayments and chasing defaults cost money. A bank does this thousands of times a day and spreads the fixed costs, so each loan is cheaper than if you did it yourself.`,
      R`**Information asymmetry.** The borrower knows more about their own honesty and prospects than the lender does. This creates two problems. **Adverse selection** happens before the deal: the borrowers most eager to accept a high interest rate are often the riskiest ones. **Moral hazard** happens after the deal: once funded, a borrower may take risks or shirk because the lender bears part of the loss. Intermediaries specialise in screening borrowers, taking collateral, writing covenants and monitoring.`,
      R`**Asset transformation.** Intermediaries turn the assets borrowers want to issue into the assets savers want to hold. They transform **maturity** (short-term deposits fund 30-year mortgages), **liquidity** (your deposit is available at call, the mortgage is not), **size or denomination** (many small deposits fund one large loan) and **risk** (a diversified loan book is far safer than any single loan).`,
    ]],
    ['p', R`Asset transformation is enormously useful, but notice the danger it creates. A bank that funds long, illiquid loans with short deposits can be destroyed if depositors all ask for their money at once, even if its loans are sound. That is a **bank run**. It is the reason banks are among the most heavily regulated businesses on earth, and it is why governments guarantee small deposits, as you will see shortly.`],
    ['note', R`The economist George Akerlof described adverse selection in a famous 1970 paper about used cars, "The Market for Lemons". If buyers cannot tell good cars from bad ones, they offer an average price; owners of good cars then refuse to sell, the average quality falls, and the market can unravel. Credit markets face the same threat, which is why lenders obsess over information.`],

    ['h', 'The main products you will meet in your first decade'],
    ['p', R`You do not need to master every product yet, but you should know what each one is for, what it costs and how risky it is. We will study the important ones in depth in later lectures.`],
    ['table', {
      caption: 'A first map of personal financial products',
      head: ['Product', 'What it is for', 'Main cost or risk', 'Covered in depth'],
      rows: [
        ['Transaction account and debit card', 'Receiving pay and paying bills', 'Usually little or no interest', 'Lecture 4'],
        ['High-interest savings account', 'An emergency fund and short-term goals', 'Bonus rates often need conditions each month; interest is taxable', 'Lectures 2 and 4'],
        ['Term deposit', 'Locking a rate for a fixed period', 'Early withdrawal penalties; rate fixed even if market rates rise', 'Lecture 2'],
        ['Credit card', 'Convenience and short-term credit', 'Very high interest if the balance is not repaid in full', 'Lecture 4'],
        ['Buy now, pay later', 'Splitting a purchase into instalments', 'Late fees; easy to overcommit across several providers', 'Lecture 4'],
        ['Personal and car loans', 'Buying durable goods', 'Interest and fees; the asset may lose value faster than the loan falls', 'Lecture 5'],
        ['HELP loan', 'Paying university fees', 'Indexed to inflation; compulsory repayments once income passes a threshold', 'Lecture 4'],
        ['Home loan (mortgage)', 'Buying a home', 'Interest-rate risk and very long commitment', 'Lecture 5'],
        ['Shares and ETFs', 'Long-term growth', 'Prices can fall sharply; returns are uncertain', 'Lectures 6 and 7'],
        ['Superannuation', 'Retirement saving, largely compulsory', 'Investment risk and fees; mostly locked until preservation age', 'Lecture 4'],
        ['Insurance', 'Transferring large, unlikely losses to an insurer', 'Premiums; exclusions in the fine print', 'Lecture 4'],
      ],
    }],

    ['h', 'Interest rates: the price of money'],
    ['p', R`An interest rate is the price of using someone else’s money for a period of time. It rewards the lender for three things: postponing their own consumption, the expected loss of purchasing power from inflation, and the risk that they will not be repaid in full or on time. Different rates in the economy differ mainly because of differences in **time** (maturity), **risk** (credit quality) and **liquidity**.`],
    ['p', R`In Australia, the anchor for all short-term rates is the **cash rate**: the interest rate on unsecured overnight loans between banks. The Reserve Bank’s Monetary Policy Board sets a target for it. After three increases of 0.25 percentage points in February, March and May 2026, the target stood at **4.35%** after the RBA’s August 2026 meeting (source: RBA cash rate table, high confidence). Changes to the cash rate flow through to deposit rates, variable mortgage rates and business loan rates, usually within weeks.`],
    ['h3', 'Nominal and real interest rates'],
    ['p', R`A **nominal** rate is quoted in dollars: deposit $100 at 4% and you get $104. A **real** rate is measured in purchasing power: what you can actually buy with that $104 after prices have risen. If prices rose 3.5% over the year, the extra purchasing power is much smaller than 4%. The exact relationship is called the **Fisher relation**, after the economist Irving Fisher.`],
    ['math', R`(1 + r_{\text{nominal}}) = (1 + r_{\text{real}})(1 + \pi) \quad\Rightarrow\quad r_{\text{real}} = \frac{1 + r_{\text{nominal}}}{1 + \pi} - 1 \approx r_{\text{nominal}} - \pi`, 'One plus the nominal rate equals one plus the real rate, times one plus inflation. So the real rate equals one plus the nominal rate, divided by one plus inflation, minus one, which is approximately the nominal rate minus inflation.'],
    ['p', R`Here \(\pi\) (the Greek letter pi, used by economists for inflation) is the inflation rate. The approximation \(r_{real} \approx r_{nominal} - \pi\) is fine when rates are small, but always use the exact version in exams and models.`],
    ['example', {
      title: 'Is cash really earning anything?',
      setup: R`In the 12 months to July 2026, Australia’s Consumer Price Index rose 3.5% (source: ABS, high confidence). Suppose you hold money in a savings account paying 4.75% a year, and your marginal tax rate is 15%. Ignore the Medicare levy.`,
      steps: [
        R`Real return before tax: \((1.0475 / 1.035) - 1 = 0.0121\), or about 1.21% a year.`,
        R`Tax: interest is taxable income, so the after-tax nominal return is \(4.75\% \times (1 - 0.15) = 4.04\%\).`,
        R`Real return after tax: \((1.0404 / 1.035) - 1 = 0.0052\), or about 0.52% a year.`,
        R`Compare with the cash rate itself: \((1.0435 / 1.035) - 1 = 0.82\%\) real, before tax.`,
      ],
      answer: R`Your purchasing power grows by only about half a percent a year after tax and inflation. Cash is a safe place to park money, not a machine for building wealth. That is why long-term savers accept the risk of shares and property.`,
    }],
    ['p', R`Inflation also works silently on anything fixed in dollars. If prices rise 3.5% every year, $1,000 of cash kept under the mattress buys only \(1000 / 1.035^{10} \approx \$709\) of today’s goods after ten years. A handy mental shortcut is the **rule of 72**: divide 72 by a growth rate in percent to estimate the number of years it takes to double. At 3.5% inflation prices double in roughly \(72/3.5 \approx 20.6\) years (the exact answer is 20.1 years).`],
    ['warn', R`Do not compare a nominal return with a real one. A property "rising 5% a year" and a deposit "earning 2% above inflation" cannot be ranked until you express both in the same terms.`],

    ['h', 'Risk and return: a first look'],
    ['p', R`Principle 2 says risk requires a reward. In finance, **risk** means that outcomes are uncertain: the return you get may differ from the return you expected, in either direction. Assets whose returns can swing widely, such as shares, have historically offered higher average returns than assets whose returns are predictable, such as deposits. This extra expected return is called a **risk premium**.`],
    ['table', {
      caption: 'Broad asset classes, from safest to riskiest (qualitative)',
      head: ['Asset class', 'Where the return comes from', 'Main risks', 'Liquidity'],
      rows: [
        ['Cash and at-call deposits', 'Interest', 'Inflation; low real return', 'Very high'],
        ['Term deposits', 'Fixed interest', 'Inflation; rates may rise after you lock in', 'Low until maturity'],
        ['Government bonds', 'Coupons plus price changes', 'Interest-rate risk if sold before maturity', 'High'],
        ['Corporate bonds', 'Higher coupons than government bonds', 'Default risk plus interest-rate risk', 'Medium'],
        ['Listed property (REITs)', 'Rents plus capital growth', 'Property cycles and borrowing', 'High on an exchange'],
        ['Shares', 'Dividends plus capital growth', 'Large falls in recessions; company failure', 'High for large companies'],
        ['Crypto-assets', 'Price changes only, for most coins', 'Extreme volatility; fraud and platform failure', 'Varies'],
      ],
    }],
    ['p', R`Notice two things. First, higher risk does not guarantee higher returns; it means higher **expected** returns, together with a real chance of doing badly. If risky assets always paid more, they would not be risky. Second, the table says nothing yet about how to combine assets. The most powerful idea in investing, diversification, is about combining risky assets so that their bad outcomes partly cancel. We will build that idea carefully in lecture 7 and again in the Investment Analysis subject.`],

    ['h', 'Who protects you: regulators and safety nets'],
    ['p', R`Because finance runs on trust and information, every developed country builds a system of regulators around it. Australia uses a model often described as "twin peaks": one regulator for the **safety** of institutions and one for **conduct** in markets, supported by the central bank and the Treasury. The main agencies meet as the Council of Financial Regulators.`],
    ['table', {
      caption: 'Australia’s financial regulators',
      head: ['Agency', 'Main job', 'What it means for you'],
      rows: [
        ['Reserve Bank of Australia (RBA)', 'Monetary policy, financial stability, the payments system, banknotes', 'Sets the cash rate that drives your deposit and loan rates'],
        ['APRA (Australian Prudential Regulation Authority)', 'Prudential supervision of banks, insurers and most super funds', 'Makes sure the institution holding your money is likely to stay solvent'],
        ['ASIC (Australian Securities and Investments Commission)', 'Conduct and disclosure in markets, licensing of advisers and credit providers, consumer protection', 'Runs Moneysmart; you can check an adviser on its register'],
        ['The Treasury', 'Economic and financial policy advice to the government', 'Designs the laws the regulators enforce'],
        ['ATO (Australian Taxation Office)', 'Tax and superannuation administration', 'Collects tax on your interest and gains; tracks your super'],
        ['ACCC and AUSTRAC', 'Competition and consumer law; anti-money-laundering', 'Fair pricing; fighting financial crime'],
      ],
    }],
    ['p', R`Three safety nets matter to you personally. The **Financial Claims Scheme** guarantees deposits of up to **$250,000 per person per authorised deposit-taking institution** if a bank, building society or credit union fails (source: Moneysmart, high confidence). The **Australian Financial Complaints Authority (AFCA)** handles disputes with financial firms free of charge once the firm’s own complaint process has failed. And ASIC’s **financial advisers register** lets you confirm that anyone giving you personal advice is actually authorised to do so.`],
    ['table', {
      caption: 'The same functions in the US and Vietnam',
      head: ['Function', 'United States', 'Vietnam'],
      rows: [
        ['Central bank', 'Federal Reserve (the Fed)', 'State Bank of Vietnam (SBV), which also supervises banks'],
        ['Securities regulator', 'Securities and Exchange Commission (SEC)', 'State Securities Commission (SSC), under the Ministry of Finance'],
        ['Deposit guarantee', 'FDIC: $250,000 per depositor, per insured bank, per ownership category', 'Deposit Insurance of Vietnam (DIV): 125 million dong per depositor per institution since 2021'],
        ['Main stock exchanges', 'NYSE and Nasdaq', 'HOSE (Ho Chi Minh City) and HNX (Hanoi), plus UPCoM'],
      ],
    }],
    ['warn', R`Deposit guarantees cover deposits, not investments. Shares, bonds, managed funds, crypto-assets and "high-yield notes" sold by non-banks are not covered by the Financial Claims Scheme, whatever the marketing implies. Scams frequently borrow the language of safety ("capital guaranteed", "government regulated") precisely because it works.`],

    ['h', 'Your first international money problem'],
    ['p', R`Many of you receive money from family overseas or plan to work abroad. As soon as money crosses a border, a new risk appears: the **exchange rate**. An exchange rate is simply the price of one currency in terms of another, and it moves every second the markets are open.`],
    ['example', {
      title: 'Tuition money from Vietnam',
      setup: R`A family in Hanoi plans to send 100,000,000 dong to their daughter in Sydney. When they first plan the transfer, one Australian dollar costs 17,000 dong. By the time they send it, the Australian dollar has strengthened to 17,500 dong. (These rates are illustrative, chosen to be close to 2026 levels.)`,
      steps: [
        R`At 17,000 dong per dollar: \(100{,}000{,}000 / 17{,}000 = \$5{,}882.35\).`,
        R`At 17,500 dong per dollar: \(100{,}000{,}000 / 17{,}500 = \$5{,}714.29\).`,
        R`Difference: \(\$5{,}882.35 - \$5{,}714.29 = \$168.07\), about 2.9% less.`,
      ],
      answer: R`A 2.9% rise in the Australian dollar cost the family about $168. Exchange-rate risk runs both ways, and it can be managed by timing, by splitting transfers over several dates, or with the hedging tools you will study in the Financial System and Derivative Securities subjects. Remember also to compare transfer fees and the margin hidden in the exchange rate a provider quotes.`,
    }],

    ['h', 'A framework for every financial decision'],
    ['p', R`Good financial decisions are rarely about clever tricks. They come from a disciplined process. I want you to use these six steps for every decision in this program, from choosing a savings account to recommending a takeover in the capstone.`],
    ['steps', [
      R`**Define the goal.** What exactly are you trying to achieve, by when, and how will you know you have succeeded? "Save $6,000 for an emergency fund within 12 months" is a goal; "save more" is not.`,
      R`**Gather the facts.** Income, expenses, assets, debts, interest rates, tax rates, fees and deadlines. Write them down.`,
      R`**List the alternatives.** Include the option of doing nothing, and the option of paying down debt.`,
      R`**Evaluate each alternative** on return, risk, liquidity, cost, tax and fit with your goal. Convert everything to comparable terms: after-tax, real, and over the same period.`,
      R`**Decide and act.** Choose the best alternative and implement it, including the boring details such as setting up automatic transfers.`,
      R`**Review.** Circumstances change. Revisit the decision on a schedule, for example every six months.`,
    ]],
    ['p', R`Underneath step 4 sits the most important economic idea in the whole subject: **opportunity cost**. The true cost of any choice is the value of the best alternative you give up. Money sitting in a transaction account at 0% has an opportunity cost equal to the rate you could have earned elsewhere, or the interest you could have avoided by repaying a debt.`],
    ['example', {
      title: 'Where should $5,000 go?',
      setup: R`Sam has $5,000 in a transaction account paying nothing, and a credit card balance of $5,000 charged at 20.99% a year. A high-interest savings account pays 4.75%. Sam’s marginal tax rate is 15%. Treat interest as simple annual interest to keep the numbers clear.`,
      steps: [
        R`Option A, move the cash to savings: interest earned \(= 5{,}000 \times 4.75\% = \$237.50\) before tax, or \(\$237.50 \times (1 - 0.15) = \$201.88\) after tax.`,
        R`Option B, repay the credit card: interest avoided \(= 5{,}000 \times 20.99\% = \$1{,}049.50\). Interest you avoid paying is not taxable income, so this is the after-tax benefit too.`,
        R`Advantage of B over A: \(\$1{,}049.50 - \$201.88 \approx \$847.62\) a year.`,
        R`Check liquidity: after repaying, Sam has no cash buffer. A sensible plan repays most of the card and keeps a small emergency amount, then rebuilds savings with the money no longer spent on interest.`,
      ],
      answer: R`Repaying high-interest debt is a guaranteed, tax-free "return" equal to the interest rate avoided: here almost 21%. No legitimate risk-free investment comes close. The only reason to hold back some cash is liquidity for genuine emergencies.`,
    }],

    ['h', 'Tax: the partner in every return'],
    ['p', R`Governments share in most investment returns, so every comparison must be made after tax. In Australia, individuals pay tax on taxable income at progressive marginal rates. For the 2026–27 income year the resident rates are shown below; they exclude the 2% Medicare levy and any offsets (source: ATO, high confidence).`],
    ['table', {
      caption: 'Australian resident income tax rates, 2026–27',
      head: ['Taxable income', 'Tax on this income'],
      rows: [
        ['$0 – $18,200', 'Nil'],
        ['$18,201 – $45,000', '15c for each $1 over $18,200'],
        ['$45,001 – $135,000', '$4,020 plus 30c for each $1 over $45,000'],
        ['$135,001 – $190,000', '$31,020 plus 37c for each $1 over $135,000'],
        ['$190,001 and over', '$51,370 plus 45c for each $1 over $190,000'],
      ],
    }],
    ['p', R`Two ideas from this table recur throughout finance. The **marginal tax rate** is the rate on your next dollar of income, and it is the rate that matters for decisions: an extra $100 of interest earned by someone with $75,000 of taxable income costs $30 in tax (plus Medicare levy). The **average tax rate** is total tax divided by total income. On $75,000 the tax is \(4{,}020 + 0.30 \times 30{,}000 = \$13{,}020\), an average rate of 17.4%, well below the 30% marginal rate.`],
    ['key', R`Decisions are made at the margin. Use your marginal tax rate when comparing investments, and your average rate only when describing your overall tax burden.`],

    ['h', 'Getting started in Excel'],
    ['p', R`This subject is taught with Excel, and so is most of the finance industry. Here is a small but real model of Linh’s balance sheet and of the purchasing-power calculation. Type it in yourself; the habit of building clean, labelled spreadsheets is worth more than any single formula.`],
    ['code', { lang: 'excel', say: 'The sheet lists assets and liabilities, sums them, computes net worth, and then deflates one thousand dollars by an inflation rate kept in its own input cell.', src: R`     A                          B
1    Inflation rate (input)     3.5%
2
3    Assets
4    Transaction account        1800
5    Savings                    6500
6    Laptop                     1400
7    Car                        9000
8    Superannuation             4200
9    ETF units                  2100
10   Total assets               =SUM(B4:B9)
11   Liabilities
12   Credit card                1250
13   Car loan                   5600
14   HELP debt                  18400
15   Total liabilities          =SUM(B12:B14)
16   Net worth                  =B10-B15
17
18   Years                      10
19   Today's value of $1,000    =1000/(1+$B$1)^B18
20   Real return on 4.75%       =(1+4.75%)/(1+$B$1)-1` }],
    ['list', [
      R`Keep **inputs** (like the inflation rate in B1) in their own clearly labelled cells, and refer to them. Never type a number such as 3.5% inside a formula.`,
      R`The dollar signs in $B$1 make an **absolute reference**, so the formula still points at B1 when you copy it down a column.`,
      R`Colour inputs one way (many analysts use blue text) and formulas another (black), so anyone can see what can be changed.`,
    ]],

    ['case', {
      title: 'Mai’s first year in Sydney',
      text: R`Mai has just arrived from Da Nang to study finance. Her parents will send money for fees each semester, and she plans to work up to the hours her visa allows at a café. She has opened a transaction account, has been offered a credit card with a $6,000 limit "because you are a student", and a friend has invited her to join a group chat promising 3% a week from "AI crypto trading".

Her employer will pay superannuation into a fund for her, and she has heard that she can claim her super when she leaves Australia. She wants to build a small emergency fund and perhaps start investing in an ETF by the end of the year.`,
      questions: [
        'Draft Mai’s personal balance sheet and a simple monthly cash-flow statement, using reasonable assumptions that you state clearly.',
        'Which of the five principles does the 3% a week offer violate? What checks should Mai perform, and where can she report it?',
        'What exchange-rate risk does Mai’s family face, and what simple steps could reduce it?',
        'Should Mai accept the full $6,000 credit limit? Discuss using opportunity cost and the risks of revolving credit.',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Finance studies decisions about money across time and under uncertainty, and the contracts and institutions that make those decisions possible.`,
      R`A household can be analysed like a firm: a balance sheet (assets, liabilities, net worth) and a cash-flow statement (income, spending, saving rate).`,
      R`Funds flow from savers to borrowers directly through markets or indirectly through intermediaries, which exist because of transaction costs, information asymmetry and the value of asset transformation.`,
      R`Interest is the price of money. Real returns remove inflation using the Fisher relation, and every comparison should be after tax.`,
      R`Australia’s regulators are the RBA, APRA, ASIC and the Treasury, with consumer protections such as the $250,000 Financial Claims Scheme and AFCA.`,
      R`Use the six-step decision framework, and remember that repaying high-interest debt is often the best risk-free return available.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`Tom owns a car worth $7,500, has $2,300 in savings, $900 in his transaction account and $3,100 of super. He owes $4,200 on a car loan, $1,600 on a credit card and $12,000 of HELP debt. What is his net worth in dollars? (Enter a negative number if appropriate.)`, answer: -4000, tol: 0.5, hint: 'Add up assets, add up liabilities, then subtract.', solution: R`Assets = 7,500 + 2,300 + 900 + 3,100 = $13,800. Liabilities = 4,200 + 1,600 + 12,000 = $17,800. Net worth = 13,800 − 17,800 = **−$4,000**.` },
    { type: 'num', level: 'Core', q: R`A one-year term deposit pays 6.0% and inflation over the year is 3.5%. Using the exact Fisher relation, what is the real return, in percent?`, answer: 2.4155, tol: 0.01, hint: R`\(r_{real} = (1 + r_{nominal}) / (1 + \pi) - 1\).`, solution: R`\(r_{real} = 1.06 / 1.035 - 1 = 0.024155\), so **2.42%**. The approximation 6.0 − 3.5 = 2.5% overstates it slightly.` },
    { type: 'num', level: 'Core', q: R`If inflation averages 3% a year, what will $10,000 of cash be worth in today’s purchasing power after 15 years? Give your answer in dollars.`, answer: 6418.62, tol: 1, solution: R`Real value = \(10{,}000 / 1.03^{15} = 10{,}000 / 1.557967 = \$6{,}418.62\). Over 15 years, 3% inflation removes about 36% of the purchasing power of cash that earns nothing.` },
    { type: 'num', level: 'Core', q: R`Using the 2026–27 Australian resident tax rates, how much income tax is payable on a taxable income of $52,000, before offsets and the Medicare levy?`, answer: 6120, tol: 1, hint: 'The income falls in the $45,001 – $135,000 bracket.', solution: R`Tax = $4,020 + 0.30 × (52,000 − 45,000) = 4,020 + 2,100 = **$6,120**. The marginal rate is 30%; the average rate is 6,120 / 52,000 = 11.8%.` },
    { type: 'num', level: 'Core', q: R`Priya has $3,000 in savings earning 4.5% and a $3,000 credit card balance at 19.99%. Using simple annual interest and ignoring tax, how much better off is she per year if she uses the savings to repay the card?`, answer: 464.7, tol: 0.5, solution: R`Interest avoided on the card = 3,000 × 19.99% = $599.70. Interest given up on savings = 3,000 × 4.5% = $135.00. Net gain = **$464.70** a year. After tax the gain is even larger, because the savings interest would have been taxed.` },
    { type: 'num', level: 'Core', q: R`A family sends 150,000,000 dong when one Australian dollar costs 17,200 dong. How many Australian dollars arrive, before fees?`, answer: 8720.93, tol: 0.5, solution: R`150,000,000 / 17,200 = **$8,720.93**. Always divide the foreign amount by the price of one Australian dollar in that currency.` },
    { type: 'mcq', level: 'Core', q: 'Which Australian agency licenses financial advisers and credit providers and runs the Moneysmart website?', options: ['The Reserve Bank of Australia', 'APRA', 'ASIC', 'The Australian Taxation Office'], answer: 2, solution: R`**ASIC** regulates conduct and disclosure, licenses advisers and credit providers, and runs Moneysmart. APRA supervises the safety of banks, insurers and super funds; the RBA runs monetary policy; the ATO administers tax and super.` },
    { type: 'mcq', level: 'Core', q: 'Under the Financial Claims Scheme, what is protected if an Australian bank fails?', options: ['All investments bought through the bank, with no limit', 'Deposits up to $250,000 per person per authorised deposit-taking institution', 'Deposits up to $250,000 in total per person across all banks', 'Only term deposits, up to $100,000'], answer: 1, solution: R`The FCS covers **deposits up to $250,000 per person per authorised deposit-taking institution**. Someone with deposits at two separate banks is covered up to $250,000 at each. Shares, managed funds and other investments are not covered.` },
    { type: 'mcq', level: 'Stretch', q: 'A lender raises its interest rate, and the borrowers who still accept the loan turn out to be riskier on average than before. Which concept does this illustrate?', options: ['Moral hazard', 'Adverse selection', 'Maturity transformation', 'Diversification'], answer: 1, solution: R`This is **adverse selection**, which happens before the contract: a higher price drives away safer borrowers and attracts riskier ones. Moral hazard is a change in behaviour after the contract is signed.` },
    { type: 'mcq', level: 'Stretch', q: 'Someone with taxable income of $75,000 in 2026–27 earns an extra $1,000 of interest. Ignoring the Medicare levy and offsets, how much extra income tax is payable?', options: ['$150', '$174', '$300', '$370'], answer: 2, solution: R`The extra income is taxed at the **marginal** rate of 30%, so the extra tax is **$300**. The average rate of about 17.4% describes the whole tax bill, not the next dollar.` },
    { type: 'long', level: 'Core', q: 'Explain, with an example for each, the four kinds of asset transformation that banks perform. Then explain why maturity transformation creates the risk of a bank run.', answer: R`Banks transform **maturity**: they take deposits that can be withdrawn at call or within months and use them to fund loans lasting up to 30 years, such as mortgages. They transform **liquidity**: depositors hold a claim they can turn into cash at once, even though the underlying loans cannot be sold quickly at a fair price. They transform **denomination**: thousands of deposits of a few hundred or thousand dollars are pooled to fund a single $700,000 home loan or a $20 million business loan. They transform **risk**: each depositor holds a claim on a bank whose loan book is diversified across thousands of borrowers, regions and industries, and which has its own capital to absorb losses, so the deposit is far safer than any one loan.

Maturity transformation creates run risk because the bank’s liabilities are short-term and its assets are long-term and illiquid. If many depositors fear the bank is in trouble and withdraw together, the bank cannot call in 30-year mortgages. It must sell assets quickly at a loss or borrow in a hurry, and those losses can make the fear self-fulfilling even if the loans were sound. Deposit guarantees, capital and liquidity rules, and the central bank’s role as lender of last resort exist to break that cycle.`, solution: 'A strong answer names all four transformations with a concrete example each, and explains the mismatch between short-term liabilities and long-term illiquid assets, the self-fulfilling nature of runs, and at least one policy response.' },
    { type: 'long', level: 'Stretch', q: 'Use the six-step decision framework to decide what a student with $4,000 of savings, no debt except HELP, and a stable part-time income should do with that money. State your assumptions.', answer: R`**1. Goal.** For example: keep a buffer for emergencies equal to about three months of essential spending, and start long-term investing with anything above that.

**2. Facts.** Assume essential spending of $1,100 a month, so a three-month buffer is about $3,300; a high-interest savings account pays about 4.75% if conditions are met; HELP debt is indexed and repaid through the tax system; marginal tax rate 15%.

**3. Alternatives.** Leave the money in a transaction account; move it to a high-interest savings account; make a voluntary HELP repayment; invest in a diversified ETF; or split between these.

**4. Evaluate.** A transaction account has an opportunity cost of about 4.75% a year. Voluntary HELP repayment saves only indexation, which is tied to inflation, and gives up liquidity permanently, so it is usually low priority for a student. A diversified ETF has higher expected return but can fall 20% or more in a bad year, so it suits money not needed for several years. A high-interest account is safe, liquid and protected by the Financial Claims Scheme.

**5. Decide.** Keep about $3,300 in a high-interest savings account as the emergency fund and consider investing the remaining $700, plus future savings, in a low-cost diversified ETF, after checking fees and understanding the risk.

**6. Review.** Revisit every six months, or when income, rent or study plans change.`, solution: 'Any reasonable conclusion earns full credit if it states assumptions, compares alternatives on return, risk, liquidity, cost and tax, uses opportunity cost, and includes a review step.' },
  ],
  glossary: [
    ['Adverse selection', 'Before a deal, the parties most eager to trade are disproportionately the ones the other side would least want, because of hidden information.'],
    ['Moral hazard', 'After a deal, one party changes behaviour and takes more risk because someone else bears part of the cost.'],
    ['Financial intermediary', 'An institution such as a bank, insurer or fund that raises money from savers and lends or invests it.'],
    ['Cash rate', 'The interest rate on overnight interbank loans in Australia; its target is set by the RBA.'],
    ['Real interest rate', 'The return measured in purchasing power, after removing inflation.'],
    ['Opportunity cost', 'The value of the best alternative given up when a choice is made.'],
    ['Marginal tax rate', 'The rate of tax on the next dollar of income.'],
    ['Human capital', 'The present value of a person’s future earning power.'],
  ],
  resources: ['MS_BUDGET', 'MS_SAVINGS', 'MS_SCAMS', 'MS_ADVISERS', 'RBA_EXPL', 'RBA_CASH', 'RBA_INFL', 'ABS_CPI', 'ATO_RATES', 'FCS', 'ASIC', 'APRA', 'KHAN_PF', 'OS_FIN', 'MIT401'],
};
