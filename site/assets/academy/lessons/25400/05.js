const R = String.raw;
export default {
  id: '25400-05', subject: '25400', title: 'Financing choices: mortgages, car loans, leases and business funding', mins: 70, level: 'Foundation',
  summary: 'How to borrow well: affordability tests, the true cost of a loan including fees, the Australian home-loan market (deposits, LMI, the 5% Deposit Scheme, APRA’s buffer and debt-to-income limits, offset accounts, fixed versus variable), rent versus buy, car loans with balloons, leases, and how small businesses fund themselves.',
  objectives: [
    'Assess whether a loan is affordable using the debt-service ratio, loan-to-value ratio and debt-to-income ratio',
    'Calculate the effective cost of a loan that has upfront and ongoing fees',
    'Explain deposits, LMI, the 5% Deposit Scheme, APRA’s serviceability buffer and its debt-to-income limit',
    'Compare fixed and variable rates, interest-only and principal-and-interest loans, and value an offset account',
    'Evaluate a refinancing decision and the rent-versus-buy decision using user cost',
    'Price a car loan with a balloon payment and recognise expensive consumer leases',
    'Describe the main funding sources for a small business and their trade-offs',
  ],
  body: [
    ['h', 'Borrowing is a tool, not a verdict'],
    ['p', R`Debt has a bad reputation, and some of it is deserved. But borrowing is simply a way to move consumption or investment through time: you get the house, the car or the equipment now and pay for it out of future income. The time-value tools of lectures 2 and 3 tell you exactly what that costs. Whether it is wise depends on three questions. **Can you afford it?** Will repayments fit comfortably in your budget, even if rates rise or income falls? **Is the price fair?** What is the effective interest rate once fees are included, compared with the alternatives? **Does the asset justify it?** Does it produce income, save you rent, or hold its value, or will it be worth little long before the debt is gone?`],
    ['key', R`Good debt finances something that lasts longer than the loan and creates value (education, a home, productive equipment) at a fair price you can comfortably repay. Bad debt finances consumption that is gone long before the repayments end.`],

    ['h', 'Affordability: the three ratios lenders use'],
    ['defs', [
      ['Debt-service ratio (DSR)', 'Annual debt repayments divided by gross annual income. Above roughly 30–35% of gross income, households usually feel real strain.'],
      ['Loan-to-value ratio (LVR)', 'Loan amount divided by the property’s value. An 80% LVR means a 20% deposit.'],
      ['Debt-to-income ratio (DTI)', 'Total debt divided by gross annual income. APRA watches loans with a DTI of six or more closely.'],
    ]],
    ['p', R`Lenders in Australia must also meet **responsible lending** obligations: they must make reasonable inquiries about your income and expenses and must not lend if the loan is unsuitable. For home loans, APRA adds two macroprudential rules that you should know by name (source: APRA, high confidence):`],
    ['list', [
      R`**The serviceability buffer.** Banks must assess whether you could meet repayments at an interest rate at least **3 percentage points above** the loan’s actual rate. APRA has kept the buffer at 3 points.`,
      R`**The debt-to-income limit.** Since February 2026, loans with a DTI of **six or more** may make up no more than **20%** of each bank’s new owner-occupier lending and 20% of its new investor lending, with exemptions such as loans for new dwellings.`,
    ]],
    ['example', {
      title: 'Would the bank lend $600,000?',
      setup: R`A couple on a combined gross income of $110,000 wants a $600,000 home loan over 30 years at 6.20% (illustrative).`,
      steps: [
        R`Actual repayment at 6.20%: \$3,674.81 a month, or \$44,098 a year. DSR \(= 44{,}098 / 110{,}000 = 40\%\).`,
        R`Assessed repayment at 9.20% (the 3-point buffer): \$4,914.33 a month, which must still fit their verified budget.`,
        R`DTI \(= 600{,}000 / 110{,}000 = 5.45\), below 6, so the loan does not count against the bank’s high-DTI limit.`,
      ],
      answer: R`The loan might pass the DTI test, but a 40% debt-service ratio at today’s rate, and more at the buffer rate, is stretching. The bank’s answer depends on their living expenses; the couple’s own answer should also consider job security, plans for children and how they would cope with a rate rise.`,
    }],

    ['h', 'The true cost of a loan'],
    ['p', R`The advertised rate is rarely the full cost. Establishment fees, monthly account fees, and discharge fees all raise the effective rate. The correct way to measure cost is the **internal rate of return** of the loan from the borrower’s side: the interest rate that equates the **net** amount you actually receive to the present value of everything you pay. Australian lenders must publish a comparison rate for a standard example loan, but you can compute the exact figure for your own loan with RATE in Excel.`],
    ['example', {
      title: 'A personal loan with fees',
      setup: R`You borrow $20,000 over 3 years at an advertised 9.5% p.a., with a $500 establishment fee deducted at the start and a $10 monthly account fee.`,
      steps: [
        R`Scheduled repayment at 9.5%: \(PMT(0.095/12, 36, 20{,}000) = \$640.66\). With the fee you pay \$650.66 a month.`,
        R`You actually receive \(20{,}000 - 500 = \$19{,}500\).`,
        R`Solve \(19{,}500 = 650.66 \times\) annuity factor for the monthly rate: 1.0266% a month (Excel: =RATE(36,-650.66,19500)).`,
        R`Annualised: APR \(= 12.32\%\); effective annual rate \(= 1.010266^{12} - 1 = 13.04\%\).`,
      ],
      answer: R`The "9.5%" loan really costs about 12.3% a year as an APR, or 13.0% effective. Fees matter most on small, short loans, because they are spread over less money and less time.`,
    }],

    ['h', 'Home loans in Australia'],
    ['h3', 'Deposits, LMI and the 5% Deposit Scheme'],
    ['p', R`Most lenders want a deposit of 20% of the property’s value (an 80% LVR). Borrowers with a smaller deposit usually pay **lenders mortgage insurance (LMI)**, a one-off premium that protects the **lender**, not you, if you default and the sale proceeds fall short. On a large loan, LMI can cost tens of thousands of dollars, and it is often added to the loan.`],
    ['p', R`The Australian Government’s **5% Deposit Scheme** (formerly the Home Guarantee Scheme) lets eligible first home buyers purchase with a 5% deposit without paying LMI: the government guarantees part of the loan. Since 1 October 2025 places are uncapped, income caps have been removed and property price caps are higher (source: Treasury, high confidence). Remember what a smaller deposit means, though: a larger loan, larger repayments and more interest over the life of the loan. On a $750,000 home at 6.20% over 30 years, a 5% deposit means borrowing $712,500 and repaying \$4,363.84 a month, against \$3,674.81 with a 20% deposit.`],
    ['p', R`Buyers also face **transfer (stamp) duty**, a state tax on the purchase that can reach several percent of the price. Every state offers concessions or exemptions for first home buyers below certain price thresholds, and the rules change often, so always check your state revenue office.`],
    ['h3', 'Fixed or variable?'],
    ['table', {
      caption: 'Fixed versus variable home-loan rates',
      head: ['Feature', 'Variable rate', 'Fixed rate (typically 1–5 years)'],
      rows: [
        ['Repayments', 'Move with the lender’s rate, which usually follows the RBA cash rate', 'Certain for the fixed period'],
        ['Risk borne by', 'The borrower bears interest-rate risk', 'The lender bears it during the fixed term'],
        ['Extra repayments', 'Usually unlimited', 'Often capped (for example $10,000 a year)'],
        ['Offset account and redraw', 'Usually available', 'Often limited or unavailable'],
        ['Leaving early', 'Small or no exit costs', 'Break costs if rates have fallen since you fixed'],
      ],
    }],
    ['p', R`Fixing is not a bet you can expect to win: fixed rates already reflect the market’s expectations of future variable rates, plus a premium. Fixing buys **certainty**, which is valuable if a rate rise would break your budget. Many borrowers **split** their loan, fixing part and leaving part variable, to balance certainty with flexibility. The rate-rise episode of 2022–23, when many borrowers rolled off very low fixed rates onto much higher variable rates, showed how large the "fixed-rate cliff" can be.`],
    ['h3', 'Interest-only versus principal and interest'],
    ['p', R`With an **interest-only (IO)** loan you pay just the interest for a period, commonly up to five years, after which the loan converts to principal and interest over the remaining term. On $600,000 at 6.20%, the IO payment is \(600{,}000 \times 0.062/12 = \$3{,}100\) a month, against \$3,674.81 for principal and interest. But after five years the full $600,000 must be repaid over 25 years instead of 30, lifting the repayment to \$3,939.49, and total repayments rise by about $44,900. Interest-only loans suit some property investors for tax and cash-flow reasons; for owner-occupiers they mostly postpone the pain.`],
    ['h3', 'Offset accounts and redraw'],
    ['p', R`An **offset account** is a transaction account linked to your home loan. Its balance is subtracted from the loan balance before interest is calculated. Every dollar in the offset therefore "earns" your mortgage rate, **tax-free**, because you are saving interest rather than receiving income, while remaining available to spend. A **redraw** facility is similar but the money is technically repaid into the loan, and access can be restricted.`],
    ['example', {
      title: 'Offset account versus savings account',
      setup: R`You hold a $30,000 emergency fund. Your variable home loan charges 6.20%. A savings account pays 4.75%, and your marginal rate is 32%.`,
      steps: [
        R`In the offset: interest saved \(= 30{,}000 \times 6.20\% = \$1{,}860\) a year, not taxable.`,
        R`In the savings account: interest \(= 30{,}000 \times 4.75\% = \$1{,}425\), minus 32% tax \(= \$969\) after tax.`,
        R`Advantage of the offset: about \$891 a year, with the same liquidity and no extra risk.`,
      ],
      answer: R`For a borrower with a variable home loan, an offset account is usually the best home for cash savings. The after-tax equivalent return of the offset is \(6.20\% / (1 - 0.32) = 9.1\%\) for a 32% taxpayer.`,
    }],
    ['h3', 'Refinancing'],
    ['p', R`Lenders often offer better rates to new customers than to existing ones. Refinancing to a lower rate can be very valuable, but you must compare the savings with the costs: discharge fees, establishment fees, possibly new LMI if your LVR is above 80%, and break costs on a fixed loan.`],
    ['example', {
      title: 'Is a 0.40-point cut worth switching for?',
      setup: R`You owe $500,000 with 25 years remaining at 6.50%. Another lender offers 6.10%. Switching costs about $1,500 in total.`,
      steps: [
        R`Current repayment: \(PMT(0.065/12, 300, 500{,}000) = \$3{,}376.04\). New repayment: \$3,252.14. Saving: \$123.90 a month.`,
        R`Over 25 years that is \$37,169 of nominal savings. Its present value at 6.10% is about \$19,048.`,
        R`Net benefit \(\approx 19{,}048 - 1{,}500 = \$17{,}548\) in today’s dollars.`,
      ],
      answer: R`Switching is clearly worthwhile. Often simply asking your current lender to match the rate captures most of the gain without any switching costs.`,
    }],

    ['h', 'Rent or buy?'],
    ['p', R`"Rent money is dead money" is a slogan, not an analysis. Owning a home also has large costs that disappear from view because they are not written on a rental invoice: interest, the opportunity cost of the deposit, maintenance, council rates, insurance, strata levies and transaction costs. Economists compare renting and owning using the **user cost of housing**:`],
    ['math', R`\text{User cost} = \text{mortgage interest} + \text{opportunity cost of equity} + \text{maintenance} + \text{rates, insurance, strata} - \text{expected capital growth}`, 'User cost equals mortgage interest, plus the opportunity cost of your equity, plus maintenance, plus rates, insurance and strata, minus expected capital growth.'],
    ['example', {
      title: 'A $750,000 apartment',
      setup: R`You could buy a $750,000 apartment with a $150,000 deposit and a $600,000 loan at 6.20%, or rent a comparable apartment for $650 a week ($33,800 a year). Your deposit could otherwise earn 4.5%. Assume maintenance of 1% of value, rates and insurance of 0.4% of value, and strata of $3,000 a year. Ignore tax and transaction costs.`,
      steps: [
        R`Interest \(= 600{,}000 \times 6.2\% = \$37{,}200\). Opportunity cost of the deposit \(= 150{,}000 \times 4.5\% = \$6{,}750\).`,
        R`Maintenance \$7,500; rates and insurance \$3,000; strata \$3,000. Total before capital growth: \$57,450 a year.`,
        R`With 0% expected growth, owning costs \$57,450 against \$33,800 renting. With 2% growth (\$15,000 a year) it costs \$42,450; with 4% growth (\$30,000) it costs \$27,450.`,
      ],
      answer: R`In this example, buying beats renting financially only if you expect capital growth above roughly 3.2% a year. The decision therefore turns on expected price growth, which is uncertain, plus non-financial factors such as security of tenure and flexibility. Notice also that paying down principal is not a cost: it is saving.`,
    }],

    ['h', 'Car finance'],
    ['p', R`A car is a depreciating asset: a new car commonly loses a large part of its value in the first few years. At 15% depreciation a year, a $40,000 car is worth about $17,700 after five years. That makes long car loans risky: it is easy to owe more than the car is worth.`],
    ['h3', 'Balloon payments'],
    ['p', R`Many car loans include a **balloon** (or residual): a lump sum due at the end, which lowers the regular repayments. The loan is fair when the amount borrowed equals the present value of the repayments **plus** the present value of the balloon:`],
    ['math', R`PV = PMT \times \frac{1}{r}\left[1 - (1+r)^{-n}\right] + \frac{\text{Balloon}}{(1+r)^{n}} \quad\Rightarrow\quad PMT = \frac{\left(PV - \frac{\text{Balloon}}{(1+r)^{n}}\right) r}{1 - (1+r)^{-n}}`, 'The amount borrowed equals the present value of the repayments plus the present value of the balloon. So the payment equals the amount borrowed minus the discounted balloon, times r, divided by one minus one plus r to the power minus n.'],
    ['example', {
      title: 'A $40,000 car over 5 years at 8.9%',
      steps: [
        R`No balloon: \(PMT(0.089/12, 60, 40{,}000) = \$828.39\) a month; total interest \$9,704.`,
        R`30% balloon (\$12,000): \(PMT(0.089/12, 60, 40{,}000, -12{,}000) = \$668.88\) a month.`,
        R`Total paid with the balloon: \(668.88 \times 60 + 12{,}000 = \$52{,}133\), so total interest is \$12,133, about \$2,400 more.`,
      ],
      answer: R`The balloon cuts the monthly payment by about $160 but raises total interest, because you keep owing more for longer, and it leaves a $12,000 bill in five years for a car that may then be worth about $17,700. Balloons suit people who plan and save for the final payment, not those who simply want a lower monthly figure.`,
    }],
    ['p', R`Other options include a secured personal loan from a bank (often cheaper than dealer finance, because the car is security), paying cash if you have it, and a **novated lease**, a salary-packaging arrangement in which your employer pays the lease from your pre-tax salary. Novated leases can be tax-effective, particularly for eligible electric vehicles, but they involve fringe-benefits-tax rules, fees and a residual payment, so compare the whole cost carefully.`],

    ['h', 'Leases and rent-to-own'],
    ['p', R`A lease gives you the use of an asset for a period in exchange for regular payments, without (necessarily) owning it. For businesses, leasing equipment can be a sensible alternative to borrowing and buying; you will analyse the lease-or-buy decision properly in Applied Corporate Finance. For households, **consumer leases** of appliances and electronics can be extremely expensive.`],
    ['example', {
      title: 'Renting a television',
      setup: R`A $2,000 television is offered for $25 a week for two years (104 payments), after which you may keep it.`,
      steps: [
        R`Total paid: \(25 \times 104 = \$2{,}600\), 30% more than the price.`,
        R`Solving \(2{,}000 = 25 \times\) annuity factor over 104 weeks gives a weekly rate of 0.525%, an effective annual rate of about **31%**.`,
      ],
      answer: R`The lease is equivalent to borrowing at about 31% a year. Even a credit card would be cheaper, and saving for eight weeks first would be cheaper still.`,
    }],

    ['h', 'How small businesses are financed'],
    ['p', R`Firms face the same questions as households, with more options. You will study corporate financing deeply in Fundamentals of Business Finance and Applied Corporate Finance, and startup financing in the Startup Finance option. Here is the landscape a small business owner sees.`],
    ['table', {
      caption: 'Main funding sources for a small business',
      head: ['Source', 'How it works', 'Advantages', 'Drawbacks'],
      rows: [
        ['Owner’s savings (bootstrapping)', 'The founder invests personal money and reinvests profits', 'Full control; no repayments', 'Limited amount; concentrates the founder’s risk'],
        ['Trade credit', 'Suppliers let you pay in 30–60 days', 'Often free if paid on time', 'Expensive if early-payment discounts are forgone'],
        ['Overdraft or line of credit', 'Borrow up to a limit as needed', 'Flexible for working capital', 'Variable rates; can be withdrawn by the bank'],
        ['Term loan or equipment finance', 'Fixed borrowing for a specific purpose, often secured', 'Predictable repayments; the asset can secure the loan', 'Often needs security or a personal guarantee'],
        ['Invoice finance', 'Borrow against unpaid customer invoices', 'Turns receivables into cash quickly', 'Relatively high cost'],
        ['Equity from angels or venture capital', 'Investors buy a share of the business', 'No repayments; investors bring expertise', 'Dilutes ownership and control; only for high-growth firms'],
        ['Grants and government programs', 'Non-repayable funding for specific purposes', 'No repayment or dilution', 'Competitive; conditions and reporting'],
      ],
    }],
    ['warn', R`Small-business owners are frequently asked for a **personal guarantee**, often secured over their home. That erases the protection of limited liability: if the business fails, the family home can be lost. Understand exactly what you are signing, and get independent advice.`],
    ['p', R`A useful preview of corporate finance theory: firms tend to follow a **pecking order**, using internal funds first, then debt, and issuing new equity last. One reason is information asymmetry, which you met in lecture 1: outsiders suspect that owners sell shares when they believe the shares are overvalued, so equity is the most "expensive" source to raise.`],

    ['case', {
      title: 'Tuan and Lily’s first home',
      text: R`Tuan (a nurse) and Lily (a software developer) earn $95,000 and $125,000 respectively. They have $90,000 saved, no debts except Lily’s HELP balance of $18,000, and currently pay $720 a week in rent in Sydney. They are looking at a two-bedroom apartment for $880,000. A broker suggests using the 5% Deposit Scheme so they can keep most of their savings, fixing half the loan for three years, and using an offset account for the rest of their cash. Lily’s parents in Hanoi have offered to lend them 500,000,000 dong interest-free.`,
      questions: [
        'Calculate the loan size, LVR, monthly repayment (use 6.2% over 30 years) and DTI under two options: a 5% deposit and a 10% deposit. How much stamp duty might they pay, and where would they check?',
        'Would the loan pass APRA’s 3-point serviceability buffer comfortably? Estimate their debt-service ratio.',
        'Evaluate the broker’s advice on the split loan and the offset account.',
        'What are the financial and non-financial risks of the family loan from Vietnam, including currency risk and the effect on the bank’s assessment?',
        'Using the user-cost framework, what capital growth would be needed for buying to beat renting?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Judge debt by affordability (DSR, LVR, DTI), price (effective rate including fees) and the asset it buys.`,
      R`APRA requires lenders to test repayments at 3 points above the loan rate and, since February 2026, limits loans with DTI of six or more to 20% of new lending.`,
      R`The 5% Deposit Scheme lets first home buyers avoid LMI with a 5% deposit, but a smaller deposit means a larger loan.`,
      R`Offset accounts earn the mortgage rate tax-free; refinancing is often worth thousands of dollars in present value.`,
      R`Rent versus buy depends on user cost and expected capital growth, not slogans.`,
      R`Balloons lower car repayments but raise total interest; consumer leases can cost over 30% a year.`,
      R`Small businesses use a pecking order of internal funds, debt and then equity; beware personal guarantees.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A borrower takes a $540,000 home loan at 6.00% p.a. over 30 years with monthly repayments. What is the monthly repayment?`, answer: 3237.57, tol: 0.5, solution: R`\(PMT = 540{,}000 \times 0.005/(1 - 1.005^{-360}) = \$3{,}237.57\). Excel: =PMT(6%/12,360,540000).` },
    { type: 'num', level: 'Core', q: R`Using APRA’s 3-percentage-point serviceability buffer, what monthly repayment would the bank test for the loan in the previous question?`, answer: 4344.96, tol: 0.5, solution: R`Assessment rate \(= 6\% + 3\% = 9\%\). \(PMT = 540{,}000 \times 0.0075/(1 - 1.0075^{-360}) = \$4{,}344.96\).` },
    { type: 'num', level: 'Core', q: R`A buyer purchases an $820,000 property with a 10% deposit. What is the LVR, in percent?`, answer: 90, tol: 0.01, solution: R`Loan \(= 0.9 \times 820{,}000 = \$738{,}000\). LVR \(= 738{,}000/820{,}000 = 90\%\). Without the 5% Deposit Scheme, the buyer would normally pay LMI.` },
    { type: 'num', level: 'Core', q: R`You keep $45,000 in an offset account linked to a home loan at 5.90%. How much interest do you save in a year?`, answer: 2655, tol: 0.5, solution: R`\(45{,}000 \times 5.90\% = \$2{,}655\), tax-free.` },
    { type: 'num', level: 'Core', q: R`A $35,000 car loan at 7.5% p.a. over 4 years (monthly) has a 25% balloon. What is the monthly repayment?`, answer: 689.38, tol: 0.5, solution: R`Balloon \(= 8{,}750\). \(PMT = [35{,}000 - 8{,}750/1.00625^{48}] \times 0.00625/(1 - 1.00625^{-48}) = \$689.38\). Excel: =PMT(7.5%/12,48,35000,-8750).` },
    { type: 'num', level: 'Stretch', q: R`A $10,000 loan over 2 years at an advertised 11% p.a. (monthly) has a $300 upfront fee deducted from the amount you receive and no other fees. What is the effective APR (monthly compounding), in percent?`, answer: 14.08, tol: 0.05, hint: 'Find the repayment on $10,000, then solve for the rate that equates it with the $9,700 you receive.', solution: R`Repayment: \(PMT(0.11/12, 24, 10{,}000) = \$466.08\). Solve \(9{,}700 = 466.08 \times\) annuity factor over 24 months: monthly rate ≈ 1.1733%, so APR ≈ **14.08%** (effective annual about 15.0%). Excel: =RATE(24,-466.08,9700)*12.` },
    { type: 'num', level: 'Stretch', q: R`Your $400,000 loan has 20 years left at 6.4%. A lender offers 5.9%. Switching costs $2,000. What is the monthly repayment saving? (Two decimals.)`, answer: 116.09, tol: 0.5, solution: R`Current: \(PMT(0.064/12, 240, 400{,}000) = \$2{,}958.79\). New: \(PMT(0.059/12, 240, 400{,}000) = \$2{,}842.70\). Saving ≈ **$116.09** a month, recovering the $2,000 cost in under 18 months.` },
    { type: 'mcq', level: 'Core', q: 'Lenders mortgage insurance (LMI) protects whom?', options: ['The borrower, if they lose their job', 'The lender, if the borrower defaults and the sale does not cover the debt', 'The government, under the 5% Deposit Scheme', 'The property, against fire and flood'], answer: 1, solution: R`LMI protects the **lender**. The borrower pays the premium but receives no cover. Home and contents insurance protects the property.` },
    { type: 'mcq', level: 'Core', q: 'Which statement about fixing a home-loan rate is most accurate?', options: ['Fixed rates are always cheaper over the term', 'Fixing transfers interest-rate risk to the lender for the fixed period, usually in exchange for less flexibility', 'Fixed loans always allow unlimited extra repayments', 'Fixing eliminates the need for a serviceability test'], answer: 1, solution: R`Fixing buys **certainty**: the lender bears rate risk during the term. In return, fixed loans usually restrict extra repayments and offsets, and charge break costs if you leave early.` },
    { type: 'mcq', level: 'Stretch', q: 'Under APRA’s debt-to-income limit from February 2026, which loans are constrained?', options: ['All loans above $1 million', 'New loans with DTI of six or more, capped at 20% of each bank’s new owner-occupier and investor lending', 'Loans with LVR above 80%', 'Interest-only loans only'], answer: 1, solution: R`The limit caps new lending with **DTI ≥ 6** at 20% of new lending, measured separately for owner-occupier and investor portfolios, with some exemptions such as loans for new dwellings.` },
    { type: 'long', level: 'Stretch', q: 'Explain why an offset account is often a better place for savings than a high-interest savings account for someone with a variable home loan, and identify one situation in which it is not.', answer: R`Money in an offset account reduces the balance on which home-loan interest is charged, so each dollar effectively earns the mortgage rate. Because this is interest saved rather than income received, it is not taxed. Savings-account interest, by contrast, is usually lower than the mortgage rate and is taxed at the marginal rate. For a 32% taxpayer with a 6.2% loan, the offset is equivalent to a pre-tax return of about 9.1%, while a 4.75% savings account returns about 3.2% after tax. The offset keeps the money fully accessible, so it can still serve as an emergency fund.

It is not better when the home loan is fixed with no offset available, when the borrower has no mortgage, or when the loan is for an investment property whose interest is tax-deductible and the borrower intends to buy a new home later: mixing personal savings with the investment loan can damage the tax deductibility of the interest, so professional advice matters. It may also be worse if the offset package carries high annual fees that exceed the benefit on a small balance.`, solution: 'Look for tax-free interest saved at the mortgage rate, liquidity, a quantified comparison, and at least one valid exception.' },
  ],
  glossary: [
    ['Loan-to-value ratio (LVR)', 'Loan amount divided by the property’s value.'],
    ['Lenders mortgage insurance (LMI)', 'Insurance paid by the borrower that protects the lender against loss on a high-LVR loan.'],
    ['Serviceability buffer', 'The extra 3 percentage points APRA requires banks to add to the loan rate when testing affordability.'],
    ['Offset account', 'An account whose balance reduces the home-loan balance on which interest is charged.'],
    ['Balloon (residual)', 'A lump sum due at the end of a loan that lowers the regular repayments.'],
    ['User cost of housing', 'The annual economic cost of owning: interest, opportunity cost, running costs, less expected capital growth.'],
    ['Pecking order', 'The tendency of firms to fund themselves with internal cash first, then debt, then new equity.'],
    ['Personal guarantee', 'A promise by an individual to repay a business’s debt if the business cannot.'],
  ],
  resources: ['MS_HOME', 'MS_PERSONAL', 'TREASURY_HOME', 'APRA_DTI', 'APRA_BANK', 'RBA_TRANS', 'XL_PMT', 'XL_RATE', 'BUSGOV_GRANTS', 'book:BMA'],
};
