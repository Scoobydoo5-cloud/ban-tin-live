const R = String.raw;
export default {
  id: '25400-03', subject: '25400', title: 'Time value of money II: annuities, perpetuities and loans', mins: 65, level: 'Foundation',
  summary: 'Streams of cash flows: perpetuities, annuities, annuities due, growing streams and deferred streams, derived rather than memorised, then applied to loan repayments, amortisation schedules, extra repayments, saving goals and retirement income.',
  objectives: [
    'Derive the present value of a perpetuity and of an ordinary annuity from first principles',
    'Value annuities due, growing perpetuities, growing annuities and deferred annuities',
    'Calculate loan repayments and build an amortisation schedule that splits each payment into interest and principal',
    'Find the outstanding balance of a loan at any date as the present value of the remaining payments',
    'Quantify the effect of extra repayments, repayment frequency and rate changes on a mortgage',
    'Solve saving and retirement problems, and recover the implied interest rate in a finance offer',
    'Use PMT, PV, FV, NPER, RATE, IPMT, PPMT and CUMIPMT in Excel',
  ],
  body: [
    ['h', 'From one cash flow to many'],
    ['p', R`In the last lecture we moved single amounts through time. Real contracts almost never involve a single amount. A car loan is 60 equal monthly repayments; a pension pays you every fortnight for as long as you live; a share pays dividends that are expected to grow for decades. In principle you could discount every cash flow separately and add them up, and a spreadsheet will happily do that. But for streams with a regular pattern there are exact shortcuts, and understanding where they come from will make you far more fluent than any calculator.`],
    ['p', R`The key principle is **value additivity**: the present value of a stream is the sum of the present values of its parts. Everything in this lecture follows from that principle plus the single-sum formula \(PV = C/(1+r)^t\).`],
    ['math', R`PV = \sum_{t=1}^{n} \frac{C_t}{(1+r)^t}`, 'The present value of a stream equals the sum, over t from one to n, of the cash flow at time t divided by one plus r to the power t.'],
    ['defs', [
      ['Perpetuity', 'A constant payment C every period, forever, starting one period from now.'],
      ['Ordinary annuity', 'A constant payment C at the end of each period for n periods.'],
      ['Annuity due', 'A constant payment C at the start of each period for n periods (the first payment is today).'],
      ['Growing perpetuity', 'A payment that starts at C₁ next period and grows at rate g forever.'],
      ['Growing annuity', 'A payment that starts at C₁ next period and grows at rate g for n periods.'],
      ['Deferred annuity', 'An annuity whose first payment occurs later than one period from now.'],
    ]],

    ['h', 'The perpetuity'],
    ['p', R`Start with the simplest infinite stream: \(C\) every year forever, first payment in one year. How much is it worth? Here is an argument that needs no algebra. Suppose you deposit an amount \(P\) in a bank at rate \(r\) and withdraw only the interest each year. You receive \(rP\) every year forever and the principal never falls. To receive \(C\) a year forever you therefore need \(P = C/r\). Since the deposit and the perpetuity deliver identical cash flows, they must have the same value.`],
    ['math', R`PV_{\text{perpetuity}} = \frac{C}{r}`, 'The present value of a perpetuity equals C divided by r.'],
    ['p', R`The algebraic proof uses the formula for a geometric series. With \(x = 1/(1+r)\), \(PV = C(x + x^2 + x^3 + \dots) = C\,x/(1-x) = C/r\). The series converges because \(x < 1\): distant payments shrink towards zero in present-value terms.`],
    ['example', {
      title: 'Endowing a scholarship',
      setup: R`An alumna wants to fund a $10,000 scholarship every year forever, first award next year. The endowment will be invested to earn 4.5% a year.`,
      steps: [
        R`Level scholarship: \(PV = 10{,}000 / 0.045 = \$222{,}222\).`,
        R`If the award must keep pace with inflation of 2.5% a year (a growing perpetuity, below): \(PV = 10{,}000 / (0.045 - 0.025) = \$500{,}000\).`,
      ],
      answer: R`A level scholarship needs about $222,000; an inflation-protected one needs $500,000. Protecting future payments against inflation more than doubles the cost, because the payments in the distant future become much larger.`,
    }],

    ['h', 'The ordinary annuity'],
    ['p', R`Now the elegant trick. An annuity paying \(C\) for \(n\) years is the difference between two perpetuities: one that starts paying at year 1, and one that starts paying at year \(n+1\). Subtract the second from the first and the payments from year \(n+1\) onwards cancel, leaving exactly \(n\) payments.`],
    ['steps', [
      R`Perpetuity starting at year 1 is worth \(C/r\) today.`,
      R`A perpetuity starting at year \(n+1\) is worth \(C/r\) at year \(n\), so its value today is \(\dfrac{C/r}{(1+r)^n}\).`,
      R`Subtract: \(PV = \dfrac{C}{r} - \dfrac{C}{r(1+r)^n} = \dfrac{C}{r}\left[1 - \dfrac{1}{(1+r)^n}\right]\).`,
    ]],
    ['math', R`PV_{\text{annuity}} = C \times \underbrace{\frac{1}{r}\left[1 - \frac{1}{(1+r)^{n}}\right]}_{\text{annuity factor}} \qquad FV_{\text{annuity}} = C \times \frac{(1+r)^{n} - 1}{r}`, 'The present value of an annuity equals C times the annuity factor, which is one over r times, one minus one over one plus r to the power n. The future value of an annuity equals C times, one plus r to the power n minus one, over r.'],
    ['p', R`The future-value formula follows immediately by compounding the present value forward: \(FV = PV(1+r)^n\). Memorise the structure, not the symbols: an annuity is a perpetuity minus a later perpetuity.`],
    ['example', {
      title: 'Five payments of $1,000 at 6%',
      steps: [
        R`Annuity factor: \((1/0.06)(1 - 1/1.06^5) = 16.6667 \times (1 - 0.747258) = 4.212364\).`,
        R`\(PV = 1{,}000 \times 4.212364 = \$4{,}212.36\). Checking by discounting each payment separately: \(943.40 + 890.00 + 839.62 + 792.09 + 747.26 = \$4{,}212.36\).`,
        R`\(FV = 1{,}000 \times (1.06^5 - 1)/0.06 = \$5{,}637.09\), which equals \(4{,}212.36 \times 1.06^5\).`,
      ],
      answer: R`The stream is worth $4,212.36 today or $5,637.09 at year 5. Five payments of $1,000 are worth much less than $5,000 today, because the later ones are heavily discounted.`,
    }],
    ['h3', 'Annuities due'],
    ['p', R`If each payment arrives one period earlier (rent paid in advance, lease payments, insurance premiums, a lottery that pays its first instalment immediately), every cash flow is discounted one period less. So the value is simply the ordinary annuity multiplied by \((1+r)\).`],
    ['math', R`PV_{\text{due}} = PV_{\text{ordinary}} \times (1 + r)`, 'The present value of an annuity due equals the present value of the ordinary annuity times one plus r.'],
    ['p', R`For five payments of $1,000 at 6% starting today: \(4{,}212.36 \times 1.06 = \$4{,}465.11\). In Excel, set the last argument, type, to 1.`],

    ['h', 'Growing streams'],
    ['p', R`Many cash flows grow: salaries, rents, dividends, the income a retiree needs to keep up with inflation. If the first payment \(C_1\) arrives in one period and each payment is \((1+g)\) times the previous one, the present value is again a geometric series, now with ratio \((1+g)/(1+r)\).`],
    ['math', R`PV_{\text{growing perpetuity}} = \frac{C_1}{r - g} \quad (r > g) \qquad PV_{\text{growing annuity}} = \frac{C_1}{r-g}\left[1 - \left(\frac{1+g}{1+r}\right)^{n}\right]`, 'A growing perpetuity is worth C one over r minus g, provided r is greater than g. A growing annuity is worth C one over r minus g, times one minus, one plus g over one plus r, to the power n.'],
    ['p', R`The growing-perpetuity formula is the famous **Gordon growth model**, which you will use to value shares in the Fundamentals and Investment Analysis subjects: a share whose dividend next year is $2.10, growing 4% a year forever, with investors requiring 9%, is worth \(2.10/(0.09 - 0.04) = \$42.00\).`],
    ['warn', R`The formula \(C_1/(r-g)\) only works if \(r > g\). If growth were at least as fast as the discount rate, each distant payment would be worth as much as or more than the last and the sum would be infinite. In practice no firm can grow faster than the economy forever, so long-run \(g\) must be modest. Also note that the numerator is **next** period’s cash flow, \(C_1\), not today’s.`],
    ['example', {
      title: 'The value of a career',
      setup: R`A graduate expects to earn $50,000 after tax next year, rising 3% a year for 30 years. What is the present value of that income at a 6% discount rate?`,
      steps: [
        R`Ratio: \((1.03/1.06)^{30} = 0.4230\).`,
        R`\(PV = \dfrac{50{,}000}{0.06 - 0.03} \times (1 - 0.4230) = 1{,}666{,}667 \times 0.5770 = \$962{,}315\).`,
      ],
      answer: R`The human capital from this career is worth close to a million dollars today, which is why lecture 1 called human capital a young person’s largest asset, and why income-protection insurance can make sense.`,
    }],

    ['h', 'Deferred annuities'],
    ['p', R`If the first payment arrives at time \(k+1\) rather than time 1, value the annuity as usual, which gives its value one period before the first payment (time \(k\)), then discount that value back \(k\) periods.`],
    ['example', {
      title: 'Paying for a child’s university',
      setup: R`Parents want to fund $20,000 a year for four years, with the first payment in 10 years (times 10, 11, 12 and 13). The fund earns 5%.`,
      steps: [
        R`Value at time 9 of four payments starting at time 10: \(20{,}000 \times (1/0.05)(1 - 1/1.05^4) = \$70{,}919.01\).`,
        R`Discount 9 years to today: \(70{,}919.01 / 1.05^9 = \$45{,}715.03\).`,
      ],
      answer: R`A lump sum of about $45,715 today would cover the whole plan. The most common error is discounting 10 years instead of 9: the annuity formula already places the value one period before the first payment.`,
    }],

    ['h', 'Loans: the annuity in reverse'],
    ['p', R`A standard amortising loan, such as a car loan or a principal-and-interest mortgage, is an annuity from the lender’s point of view. The bank gives you the principal today and receives equal payments. The loan is fair when the present value of the payments at the loan rate equals the amount borrowed. Rearranging the annuity formula gives the repayment:`],
    ['math', R`PMT = \frac{PV \times r}{1 - (1+r)^{-n}}`, 'The payment equals the present value times r, divided by one minus one plus r to the power minus n.'],
    ['example', {
      title: 'A five-year car loan',
      setup: R`You borrow $25,000 at 8.5% p.a., repaid monthly over 5 years.`,
      steps: [
        R`Monthly rate \(r = 0.085/12 = 0.70833\%\); number of payments \(n = 60\).`,
        R`\(PMT = 25{,}000 \times 0.0070833 / (1 - 1.0070833^{-60}) = \$512.91\) a month.`,
        R`Total paid: \(512.91 \times 60 = \$30{,}774.80\), so total interest is \(\$5{,}774.80\).`,
      ],
      answer: R`Repayments are $512.91 a month and the loan costs $5,774.80 in interest, before any fees.`,
    }],
    ['h3', 'The amortisation schedule'],
    ['p', R`Each payment has two parts. The **interest** part is this month’s rate times the balance outstanding at the start of the month. The rest of the payment is **principal**, which reduces the balance. Because the balance falls, the interest part falls and the principal part rises over time, even though the total payment is constant.`],
    ['table', {
      caption: 'First months of the car loan, and the balance at each anniversary',
      head: ['Month', 'Payment', 'Interest', 'Principal', 'Balance after payment'],
      rows: [
        ['0', '', '', '', '$25,000.00'],
        ['1', '$512.91', '$177.08', '$335.83', '$24,664.17'],
        ['2', '$512.91', '$174.70', '$338.21', '$24,325.96'],
        ['3', '$512.91', '$172.31', '$340.60', '$23,985.36'],
        ['12', '', '', '', '$20,809.27'],
        ['24', '', '', '', '$16,248.12'],
        ['36', '', '', '', '$11,283.81'],
        ['48', '', '', '', '$5,880.70'],
        ['60', '', '', '', '$0.00'],
      ],
    }],
    ['p', R`Notice that after half the term (30 months) you have repaid well under half the principal: early payments are mostly interest. You can find the balance at any date without building the schedule, using a beautiful shortcut: **the outstanding balance equals the present value of the remaining payments at the loan rate.** After 24 months, 36 payments remain: \(512.91 \times (1/0.0070833)(1 - 1.0070833^{-36}) = \$16{,}248.12\), exactly the schedule’s figure.`],
    ['lab', 'loan'],
    ['key', R`Balance outstanding = present value of the remaining payments. This single idea lets you price early repayment, refinancing, and the value of a loan book to a bank.`],

    ['h', 'The mortgage: where the numbers get big'],
    ['example', {
      title: 'A $600,000 home loan',
      setup: R`A couple borrows $600,000 at 6.20% p.a. over 30 years with monthly repayments (illustrative rate).`,
      steps: [
        R`\(r = 0.062/12 = 0.51667\%\), \(n = 360\): \(PMT = \$3{,}674.81\) a month.`,
        R`Total repaid over 30 years: \(\$1{,}322{,}933\); total interest \(\$722{,}933\), more than the amount borrowed.`,
        R`Balance after 5 years (300 payments remaining): \(\$559{,}688\). After five years of repayments totalling \(\$220{,}489\), the debt has fallen by only about $40,300.`,
      ],
      answer: R`At this rate, most of each early repayment is interest. That is why extra repayments in the early years are so powerful.`,
    }],
    ['h3', 'Extra repayments'],
    ['p', R`Suppose the couple pays an extra $500 a month from the start, a total of $4,174.81. Solve for the number of months with NPER, or with the formula \(n = -\ln(1 - PV\,r/PMT)/\ln(1+r)\).`],
    ['steps', [
      R`\(n = -\ln(1 - 600{,}000 \times 0.0051667 / 4{,}174.81)/\ln(1.0051667) = 263.3\) months, or about **21.9 years** instead of 30.`,
      R`Total interest falls to about \(4{,}174.81 \times 263.3 - 600{,}000 \approx \$499{,}262\).`,
      R`Interest saved: about **$223,700**, from extra payments of roughly $131,700 in total. Each extra dollar paid early earns the mortgage rate, tax-free.`,
    ]],
    ['h3', 'Fortnightly repayments'],
    ['p', R`A popular tip is to pay half the monthly repayment every fortnight. There are 26 fortnights in a year, so you pay the equivalent of 13 monthly repayments a year instead of 12. Using a fortnightly rate of \(0.062/26\), the loan is repaid in about **24.4 years**, with total interest of about $563,000, saving around $160,000. The saving comes almost entirely from paying more each year, not from any magic in the frequency itself.`],
    ['h3', 'When rates rise'],
    ['p', R`Variable-rate borrowers carry interest-rate risk. If after five years the rate rose from 6.20% to 7.20% and the remaining term stayed at 25 years, the new repayment would be the payment that amortises the $559,688 balance over 300 months at 0.6% a month: **$4,027.45**, an increase of about $353 a month or 9.6%. A one-percentage-point move in the cash rate is therefore a large shock to a household budget, which is exactly the channel through which the RBA’s monetary policy works.`],

    ['h', 'Saving goals and retirement income'],
    ['example', {
      title: 'Saving a house deposit',
      setup: R`You want $80,000 in 5 years. Your savings account pays 4.5% p.a. compounded monthly. How much must you save at the end of each month?`,
      steps: [
        R`This is a future-value annuity problem: \(80{,}000 = PMT \times [(1 + 0.00375)^{60} - 1]/0.00375\).`,
        R`\(PMT = 80{,}000 \times 0.00375 / (1.00375^{60} - 1) = \$1{,}191.44\) a month.`,
      ],
      answer: R`About $1,191 a month. Without any interest you would need $1,333; compounding contributes the rest.`,
    }],
    ['example', {
      title: 'Drawing down a retirement balance',
      setup: R`A retiree has $800,000 and wants level monthly withdrawals for 25 years, with the balance earning 5% p.a. compounded monthly.`,
      steps: [
        R`Treat the balance as the present value of the withdrawals: \(PMT = 800{,}000 \times (0.05/12)/(1 - (1 + 0.05/12)^{-300})\).`,
        R`\(PMT = \$4{,}676.72\) a month.`,
      ],
      answer: R`About $4,677 a month, in nominal dollars. With inflation the purchasing power of a level payment falls every year, so real-world retirement planning usually uses a growing annuity or real rates.`,
    }],
    ['example', {
      title: 'Lump sum or instalments?',
      setup: R`A prize offers either $1.1 million today or 20 annual payments of $100,000. At a 6% discount rate, which is worth more? Consider both an ordinary annuity and one whose first payment is today.`,
      steps: [
        R`Ordinary annuity: \(100{,}000 \times (1/0.06)(1 - 1.06^{-20}) = \$1{,}146{,}992\).`,
        R`Annuity due (first payment today): \(1{,}146{,}992 \times 1.06 = \$1{,}215{,}812\).`,
      ],
      answer: R`At 6%, the instalments are worth more than $1.1 million under either timing. The answer depends on the discount rate: at 8% the ordinary annuity is worth only $981,815, and the lump sum wins. Always state your rate.`,
    }],
    ['h3', 'Uncovering a hidden interest rate'],
    ['p', R`Finance offers often advertise a repayment rather than a rate. A dealer offers a $25,000 car for "just $520 a month for 60 months". The implied rate solves \(25{,}000 = 520 \times\) annuity factor. There is no algebraic solution, so we use RATE in Excel (which iterates): the monthly rate is 0.7571%, an APR of **9.09%** and an effective rate of 9.47%. Now you can compare it honestly with a bank loan at 8.5%.`],

    ['h', 'Excel toolkit for streams'],
    ['code', { lang: 'excel', say: 'The formulas compute loan payments, present and future values of annuities, the number of payments, implied rates, and the interest and principal split of a given payment.', src: R`=PMT(8.5%/12, 60, 25000)                 → -512.91   car loan repayment
=PV(6%, 5, -1000)                         → 4,212.36  ordinary annuity
=PV(6%, 5, -1000, 0, 1)                   → 4,465.11  annuity due (type = 1)
=FV(4.5%/12, 60, -1191.44)                → 80,000    saving plan
=NPER(6.2%/12, -4174.81, 600000)          → 263.3     months with $500 extra
=RATE(60, -520, 25000)*12                 → 9.09%     dealer's implied APR
=IPMT(8.5%/12, 1, 60, 25000)              → -177.08   interest in month 1
=PPMT(8.5%/12, 1, 60, 25000)              → -335.83   principal in month 1
=CUMIPMT(8.5%/12, 60, 25000, 1, 12, 0)    → total interest paid in year 1
=PV(8.5%/12, 36, -512.91)                 → 16,248.12 balance after 24 payments` }],
    ['p', R`To build a full amortisation schedule, create columns for month, opening balance, payment, interest (= opening balance × monthly rate), principal (= payment − interest) and closing balance (= opening − principal). Fill down 60 or 360 rows. The final closing balance should be zero to the cent; if it is not, your rate or payment is wrong. This single worksheet is one of the most useful models you will ever build.`],

    ['h', 'Mistakes to avoid'],
    ['list', [
      R`**Timing.** Ordinary annuities pay at the end of each period. If the first payment is today, use an annuity due. For deferred annuities, discount from one period before the first payment.`,
      R`**Rate and period mismatch.** Monthly payments need a monthly rate and a number of months.`,
      R`**Growing formulas with \(g \ge r\).** The result is meaningless. Check that \(r > g\).`,
      R`**Using today’s cash flow in \(C_1/(r-g)\).** The numerator is next period’s cash flow. If today’s dividend is \(D_0\), use \(D_0(1+g)\).`,
      R`**Assuming half the term means half repaid.** Early payments are mostly interest.`,
    ]],

    ['h', 'Summary'],
    ['list', [
      R`Perpetuity: \(C/r\). Annuity: \(C/r\,[1 - (1+r)^{-n}]\), a perpetuity minus a later perpetuity. Annuity due: multiply by \(1+r\).`,
      R`Growing perpetuity: \(C_1/(r-g)\); growing annuity: \(C_1/(r-g)\,[1 - ((1+g)/(1+r))^n]\).`,
      R`Loan repayment: \(PMT = PV\,r/[1 - (1+r)^{-n}]\). Each payment splits into interest on the opening balance and principal.`,
      R`The outstanding balance is the present value of the remaining payments.`,
      R`Extra early repayments earn the loan rate tax-free and can save hundreds of thousands of dollars on a mortgage.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`You borrow $35,000 for a car at 7.9% p.a. with monthly repayments over 4 years. What is the monthly repayment?`, answer: 852.81, tol: 0.5, solution: R`\(r = 0.079/12 = 0.0065833\), \(n = 48\). \(PMT = 35{,}000 \times 0.0065833/(1 - 1.0065833^{-48}) = \$852.81\). Excel: =PMT(7.9%/12,48,35000).` },
    { type: 'num', level: 'Core', q: R`What is the present value of $1,500 received at the end of every month for 20 years, at 6% p.a. compounded monthly?`, answer: 209371.16, tol: 5, solution: R`Monthly rate 0.5%, 240 payments. \(PV = 1{,}500 \times (1/0.005)(1 - 1.005^{-240}) = 1{,}500 \times 139.5808 = \$209{,}371\).` },
    { type: 'num', level: 'Core', q: R`You save $300 at the end of every month for 10 years in an account paying 7% p.a. compounded monthly. How much will you have?`, answer: 51925.44, tol: 5, solution: R`\(FV = 300 \times [(1 + 0.07/12)^{120} - 1]/(0.07/12) = 300 \times 173.0848 = \$51{,}925.44\). You contributed $36,000; compounding added almost $16,000.` },
    { type: 'num', level: 'Core', q: R`A share is expected to pay a dividend of $2.10 next year, growing at 4% a year forever. Investors require 9% a year. What is the share worth today?`, answer: 42, tol: 0.05, solution: R`Gordon growth model: \(P_0 = D_1/(r - g) = 2.10/(0.09 - 0.04) = \$42.00\).` },
    { type: 'num', level: 'Core', q: R`You owe $10,000 on a credit card charging 18% p.a. (1.5% a month) and pay $300 at the end of each month with no new spending. How many months until it is repaid? (Two decimals.)`, answer: 46.56, tol: 0.05, solution: R`\(n = -\ln(1 - 10{,}000 \times 0.015/300)/\ln(1.015) = -\ln(0.5)/\ln(1.015) = 46.56\) months, almost four years. Excel: =NPER(1.5%,-300,10000).` },
    { type: 'num', level: 'Core', q: R`A lease requires four annual payments of $5,000, the first due today. At 5% a year, what is the present value of the payments?`, answer: 18616.24, tol: 1, solution: R`Annuity due: \(5{,}000 \times (1/0.05)(1 - 1.05^{-4}) \times 1.05 = 17{,}729.75 \times 1.05 = \$18{,}616.24\).` },
    { type: 'num', level: 'Stretch', q: R`For the $25,000, 8.5%, 60-month car loan in the lecture (repayment $512.91), what is the balance outstanding after 36 payments?`, answer: 11283.81, tol: 1, solution: R`Balance = PV of the 24 remaining payments: \(512.91 \times (1/0.0070833)(1 - 1.0070833^{-24}) = \$11{,}283.81\).` },
    { type: 'num', level: 'Stretch', q: R`Parents want $20,000 a year for four years, with payments at the end of years 10, 11, 12 and 13. At 5%, how much must they set aside today?`, answer: 45715.03, tol: 2, solution: R`Value at year 9: \(20{,}000 \times 3.54595 = 70{,}919.01\). Discount 9 years: \(70{,}919.01/1.05^9 = \$45{,}715.03\).` },
    { type: 'mcq', level: 'Core', q: 'For a standard amortising loan with constant repayments, which statement is true?', options: ['The interest part of each payment rises over time', 'The principal part of each payment rises over time', 'Half the principal is repaid at half the term', 'The balance falls by the same amount every month'], answer: 1, solution: R`As the balance falls, interest on it falls, so with a constant payment the **principal part rises** over time. Early in the loan, payments are mostly interest, so less than half the principal is repaid at half the term.` },
    { type: 'mcq', level: 'Stretch', q: 'Why does the growing perpetuity formula C₁/(r − g) require r > g?', options: ['Because regulators prohibit growth above the discount rate', 'Because otherwise each discounted payment would be at least as large as the previous one and the sum would not be finite', 'Because g must be negative', 'Because the formula uses today’s cash flow'], answer: 1, solution: R`The discounted payments form a geometric series with ratio \((1+g)/(1+r)\). It converges only if the ratio is below 1, that is \(r > g\). Otherwise the present value would be infinite, which is economically meaningless.` },
    { type: 'long', level: 'Stretch', q: 'A friend says: "Paying fortnightly instead of monthly saves a fortune on a mortgage, because interest is calculated more often." Evaluate this claim using the lecture’s $600,000 example.', answer: R`The claim is mostly wrong about the reason. Interest being calculated more often does not by itself help the borrower; if anything, more frequent compounding slightly increases the effective rate. The saving comes from the fact that paying half the monthly amount every fortnight means 26 half-payments a year, the equivalent of 13 monthly repayments instead of 12. That extra repayment each year goes entirely to principal. In the example, the loan is repaid in about 24.4 years instead of 30, saving roughly $160,000 in interest. A borrower who paid one-twelfth more each month (about $306 extra) would get almost the same benefit. The small genuine timing benefit is that each half-payment arrives slightly earlier than a monthly payment would. So the advice is useful as a behavioural device for paying more, but the "interest calculated more often" explanation is incorrect.`, solution: 'A good answer separates the effect of paying more each year from the effect of payment frequency, and quantifies both.' },
  ],
  glossary: [
    ['Annuity factor', R`\((1/r)[1 - (1+r)^{-n}]\): the present value of $1 a period for n periods.`],
    ['Amortisation', 'Repaying a loan through regular payments that cover interest and gradually reduce principal.'],
    ['Gordon growth model', 'Share value equals next dividend divided by the required return minus the growth rate.'],
    ['Annuity due', 'An annuity whose payments occur at the start of each period.'],
    ['Deferred annuity', 'An annuity whose first payment is more than one period away.'],
    ['Outstanding balance', 'The amount still owed on a loan, equal to the present value of the remaining payments.'],
  ],
  resources: ['XL_PMT', 'XL_PV', 'XL_NPER', 'XL_RATE', 'MS_HOME', 'MS_CARDS', 'KHAN', 'OS_FIN', 'MIT401', 'book:BMA'],
};
