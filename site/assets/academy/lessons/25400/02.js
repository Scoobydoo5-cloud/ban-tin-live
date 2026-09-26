const R = String.raw;
export default {
  id: '25400-02', subject: '25400', title: 'Time value of money I: single sums and interest rates', mins: 60, level: 'Foundation',
  summary: 'The most important idea in finance, built from first principles: timelines, simple and compound interest, future and present value, solving for the rate and the time, compounding frequency, effective annual rates and real versus nominal cash flows, in algebra and in Excel.',
  objectives: [
    'Draw a cash-flow timeline with a consistent sign convention',
    'Explain the difference between simple and compound interest and quantify interest on interest',
    'Calculate the future value and present value of a single cash flow',
    'Solve for the interest rate (growth rate) and for the number of periods',
    'Convert between nominal annual rates, periodic rates and effective annual rates, including continuous compounding',
    'Discount nominal cash flows at nominal rates and real cash flows at real rates',
    'Use FV, PV, RATE, NPER and EFFECT in Excel correctly',
  ],
  body: [
    ['h', 'Why a dollar today beats a dollar tomorrow'],
    ['p', R`If I offer you $1,000 today or $1,000 in three years, you will take it today without hesitation. That instinct is correct, and the reasons behind it are the foundation of all valuation. First, money you hold today can be **invested**: put it in a savings account and in three years you will have more than $1,000. Second, **inflation** erodes what future dollars can buy. Third, a promise of future money carries **risk**: the payer might not pay. Fourth, most people are simply **impatient**: they prefer consumption sooner rather than later.`],
    ['p', R`For this lecture we will isolate the first reason. Assume the future cash flows are certain, and that you can invest or borrow at a known interest rate. Then the question "what is money at different dates worth?" has an exact answer, and the machinery we build will carry through the entire degree: bond prices, share values, loan repayments, project appraisal, option pricing. Risk and inflation will be added back in layers.`],
    ['key', R`Cash flows at different dates are different goods. You may only add, subtract or compare them after moving them to the same date using an interest rate.`],

    ['h', 'Timelines and signs'],
    ['p', R`Every time-value problem should start with a **timeline**. Draw a horizontal line, mark today as time 0, and mark the end of each period as 1, 2, 3 and so on. A "period" can be a year, a month or a day; what matters is that the interest rate is quoted for the same period. Write each cash flow above its date. Use a **sign convention**: money you receive is positive, money you pay out is negative. Excel and financial calculators rely on this convention, and forgetting it is the most common source of wrong answers.`],
    ['table', {
      caption: 'A timeline for depositing $10,000 today and withdrawing everything in 3 years at 5% a year',
      head: ['Time', '0 (today)', '1', '2', '3'],
      rows: [
        ['Cash flow to you', '−$10,000 (deposit)', '0', '0', '+$11,576.25 (withdrawal)'],
        ['Balance in the account', '$10,000.00', '$10,500.00', '$11,025.00', '$11,576.25'],
      ],
    }],
    ['warn', R`Time 1 means the **end** of period 1, which is the same instant as the start of period 2. Students who place a cash flow "at the start of year 3" at time 3 instead of time 2 produce answers that are off by a whole year of interest.`],

    ['h', 'Simple interest versus compound interest'],
    ['p', R`Under **simple interest**, interest is earned only on the original principal. Under **compound interest**, interest earned in one period is added to the balance and itself earns interest in later periods. Almost everything in real financial markets compounds; simple interest survives mainly in some short-term money-market conventions and in poorly designed textbook examples.`],
    ['math', R`\text{Simple: } FV = PV\,(1 + r\,n) \qquad \text{Compound: } FV = PV\,(1 + r)^{n}`, 'With simple interest, future value equals present value times one plus r times n. With compound interest, future value equals present value times one plus r, raised to the power n.'],
    ['p', R`Here \(PV\) is the present value (the amount at time 0), \(FV\) is the future value at time \(n\), \(r\) is the interest rate per period and \(n\) is the number of periods. The compound formula is not something to memorise; it falls straight out of applying one period of interest at a time.`],
    ['steps', [
      R`After one period: \(PV + PV \cdot r = PV(1 + r)\).`,
      R`After two periods, the whole of \(PV(1+r)\) earns interest: \(PV(1+r)(1+r) = PV(1+r)^2\).`,
      R`Repeating the argument, after \(n\) periods the balance is \(PV(1+r)^n\). The factor \((1+r)^n\) is called the **future value factor** or **compound factor**.`,
    ]],
    ['example', {
      title: '$10,000 for 10 years at 5%',
      setup: R`Compare simple and compound interest on a $10,000 deposit at 5% a year for 10 years.`,
      steps: [
        R`Simple interest: \(FV = 10{,}000 \times (1 + 0.05 \times 10) = \$15{,}000\). Interest of $500 every year, $5,000 in total.`,
        R`Compound interest: \(FV = 10{,}000 \times 1.05^{10} = 10{,}000 \times 1.628895 = \$16{,}288.95\).`,
        R`The extra \(\$1{,}288.95\) is **interest on interest**: interest earned on interest that was credited in earlier years.`,
      ],
      answer: R`Compounding adds $1,288.95, about 26% more interest than simple interest over 10 years. The gap grows explosively with time: over 40 years the compound balance would be $70,399.89 against $30,000 under simple interest.`,
    }],
    ['table', {
      caption: 'Year-by-year balances on $10,000 at 5%',
      head: ['Year', 'Simple interest balance', 'Compound interest balance', 'Interest on interest (cumulative)'],
      rows: [
        ['0', '$10,000.00', '$10,000.00', '$0.00'],
        ['1', '$10,500.00', '$10,500.00', '$0.00'],
        ['2', '$11,000.00', '$11,025.00', '$25.00'],
        ['3', '$11,500.00', '$11,576.25', '$76.25'],
        ['4', '$12,000.00', '$12,155.06', '$155.06'],
        ['5', '$12,500.00', '$12,762.82', '$262.82'],
        ['6', '$13,000.00', '$13,400.96', '$400.96'],
        ['7', '$13,500.00', '$14,071.00', '$571.00'],
        ['8', '$14,000.00', '$14,774.55', '$774.55'],
        ['9', '$14,500.00', '$15,513.28', '$1,013.28'],
        ['10', '$15,000.00', '$16,288.95', '$1,288.95'],
      ],
    }],
    ['lab', 'compound'],
    ['note', R`Compound growth is why starting early matters so much for retirement saving, and why debt left unpaid on a credit card snowballs. The mathematics is identical; only the sign changes. When the compounding works for you, time is your friend. When it works against you, time is the enemy.`],

    ['h', 'Present value: running the film backwards'],
    ['p', R`If \(FV = PV(1+r)^n\), then dividing both sides by \((1+r)^n\) gives the value today of a future amount. This operation is called **discounting**, the rate \(r\) is called the **discount rate**, and \(1/(1+r)^n\) is the **discount factor**.`],
    ['math', R`PV = \frac{FV}{(1 + r)^{n}} = FV \times \underbrace{\frac{1}{(1+r)^{n}}}_{\text{discount factor}}`, 'Present value equals future value divided by one plus r to the power n. The fraction one over one plus r to the power n is the discount factor.'],
    ['p', R`The present value answers a practical question: **how much would I need to invest today, at rate \(r\), to have exactly \(FV\) at time \(n\)?** It also answers its mirror image: what is the most I should pay today for a certain promise of \(FV\) at time \(n\), if I could otherwise earn \(r\)? Those two questions have the same answer, which is why the present value is a price.`],
    ['example', {
      title: 'Saving for a car',
      setup: R`You want $20,000 in four years to buy a car. A term deposit pays 4.5% a year, compounded annually. How much must you deposit today?`,
      steps: [
        R`Discount factor: \(1 / 1.045^4 = 1 / 1.192519 = 0.838561\).`,
        R`Present value: \(20{,}000 \times 0.838561 = \$16{,}771.23\).`,
        R`Check by compounding forward: \(16{,}771.23 \times 1.045^4 = \$20{,}000.00\).`,
      ],
      answer: R`Deposit $16,771.23 today. Notice that each dollar received in four years is worth only about 84 cents today at a 4.5% rate.`,
    }],
    ['p', R`Two properties of present values are worth fixing in your mind now, because they drive everything from bond prices to share-market reactions to interest-rate news.`],
    ['list', [
      R`**The further away a cash flow, the lower its present value.** Distant cash flows are discounted more heavily.`,
      R`**The higher the discount rate, the lower the present value**, and the effect is strongest for distant cash flows. At 4.5%, $20,000 in four years is worth $16,771; at 9% it is worth only $14,168. This is why long-dated assets, such as growth shares and long bonds, fall hardest when interest rates rise.`,
    ]],

    ['h', 'Solving for the rate and for time'],
    ['p', R`The equation \(FV = PV(1+r)^n\) has four variables. Know any three and you can find the fourth. We have found \(FV\) and \(PV\). Solving for \(r\) and \(n\) needs only a little algebra.`],
    ['math', R`r = \left(\frac{FV}{PV}\right)^{1/n} - 1 \qquad\qquad n = \frac{\ln(FV/PV)}{\ln(1+r)}`, 'The rate r equals F V over P V, raised to the power one over n, minus one. The number of periods n equals the natural log of F V over P V, divided by the natural log of one plus r.'],
    ['p', R`The rate found this way is the **compound annual growth rate (CAGR)** when periods are years. It is the constant yearly rate that would carry the starting value to the ending value, and it is how you should describe the growth of an investment, a company’s revenue or a country’s GDP over several years. Never divide total growth by the number of years: that ignores compounding and overstates the annual rate.`],
    ['example', {
      title: 'What return did I earn?',
      setup: R`You invested $5,000 in an index fund seven years ago, reinvesting all distributions. It is worth $8,000 today.`,
      steps: [
        R`Total growth: \(8{,}000 / 5{,}000 = 1.6\), a 60% gain.`,
        R`CAGR: \(r = 1.6^{1/7} - 1 = 1.06945 - 1 = 6.94\%\) a year.`,
        R`The naive answer, \(60\% / 7 = 8.57\%\), is wrong: it ignores the fact that later gains were earned on a larger balance.`,
      ],
      answer: R`The investment earned a compound return of about 6.94% a year.`,
    }],
    ['example', {
      title: 'How long until I reach my goal?',
      setup: R`You have $15,000 and want $25,000 for a house deposit. Your investment earns 6% a year.`,
      steps: [
        R`\(FV / PV = 25{,}000 / 15{,}000 = 1.6667\).`,
        R`\(n = \ln(1.6667) / \ln(1.06) = 0.51083 / 0.05827 = 8.77\) years.`,
      ],
      answer: R`About 8.8 years, without adding any new savings. In lecture 3 you will see how regular contributions shorten this dramatically.`,
    }],
    ['h3', 'The rule of 72, and how good it is'],
    ['p', R`The doubling time at rate \(r\) is \(\ln 2 / \ln(1 + r)\). Because \(\ln 2 \approx 0.693\) and \(\ln(1+r) \approx r\) for small \(r\), doubling time is roughly \(69.3 / (100r)\). Bankers use 72 instead of 69.3 because it divides evenly by many numbers and because it partly corrects the approximation for typical rates.`],
    ['table', {
      caption: 'Doubling times: rule of 72 versus the exact answer',
      head: ['Rate per year', 'Rule of 72 (years)', 'Exact (years)'],
      rows: [
        ['2%', '36.0', '35.0'], ['4%', '18.0', '17.7'], ['6%', '12.0', '11.9'], ['8%', '9.0', '9.0'],
        ['10%', '7.2', '7.3'], ['12%', '6.0', '6.1'], ['18%', '4.0', '4.2'], ['24%', '3.0', '3.2'],
      ],
    }],

    ['h', 'Compounding more than once a year'],
    ['p', R`Banks rarely compound once a year. Savings accounts usually calculate interest daily and credit it monthly; credit cards charge interest daily; mortgages compound monthly. Rates are nevertheless quoted **per annum**, which creates a trap. A rate quoted as "6% p.a., compounded monthly" does not mean you earn 6% over a year. It is a **nominal annual rate**, sometimes called the annual percentage rate or APR, and it is converted into a **periodic rate** by dividing by the number of compounding periods per year, \(m\).`],
    ['math', R`r_{\text{periodic}} = \frac{\text{APR}}{m} \qquad FV = PV\left(1 + \frac{\text{APR}}{m}\right)^{m \times \text{years}}`, 'The periodic rate is the annual percentage rate divided by m, the number of compounding periods per year. Future value equals present value times one plus APR over m, raised to the power m times the number of years.'],
    ['p', R`To compare rates with different compounding frequencies, convert each to the **effective annual rate (EAR)**: the rate that, compounded once a year, gives the same growth.`],
    ['math', R`\text{EAR} = \left(1 + \frac{\text{APR}}{m}\right)^{m} - 1 \qquad \text{and, in the limit } m \to \infty,\quad \text{EAR} = e^{\text{APR}} - 1`, 'The effective annual rate equals one plus APR over m, to the power m, minus one. As m goes to infinity, the effective annual rate equals e to the APR, minus one.'],
    ['table', {
      caption: 'The same 6% nominal rate under different compounding frequencies',
      head: ['Compounding', 'm', 'Periodic rate', 'Effective annual rate'],
      rows: [
        ['Annual', '1', '6.0000%', '6.0000%'],
        ['Quarterly', '4', '1.5000%', '6.1364%'],
        ['Monthly', '12', '0.5000%', '6.1678%'],
        ['Daily', '365', '0.0164%', '6.1831%'],
        ['Continuous', '∞', 'n/a', '6.1837%'],
      ],
    }],
    ['p', R`The continuous-compounding limit comes from one of the most famous limits in mathematics: \(\lim_{m\to\infty}(1 + x/m)^m = e^x\), where \(e \approx 2.71828\). Continuous compounding is not a curiosity. It is the natural language of the Black–Scholes model and of most of quantitative finance, and you will use it heavily in the Derivative Securities and Quantitative Finance subjects. With continuous compounding, \(FV = PV e^{rT}\) and \(PV = FV e^{-rT}\).`],
    ['p', R`Going the other way, if you know the effective annual rate and need a monthly rate (for example to value monthly cash flows), take the twelfth root: \(r_{monthly} = (1 + \text{EAR})^{1/12} - 1\). An EAR of 7% corresponds to a monthly rate of 0.5654%, not 7/12 = 0.5833%.`],
    ['example', {
      title: 'What a credit card really costs',
      setup: R`A credit card charges 19.99% p.a., calculated daily on the outstanding balance. Suppose the balance is never paid down and interest is added monthly to the balance, so it compounds.`,
      steps: [
        R`Daily periodic rate: \(0.1999 / 365 = 0.05477\%\).`,
        R`Compounded daily over a year: \(\text{EAR} = (1 + 0.1999/365)^{365} - 1 = 22.12\%\).`,
        R`So a $2,000 balance left unpaid for a year grows to about \(2{,}000 \times 1.2212 = \$2{,}442\), ignoring fees.`,
      ],
      answer: R`The effective cost is about 22.1% a year, more than the 19.99% headline. In practice card issuers’ exact compounding conventions differ, which is exactly why you should convert every rate to an effective basis before comparing.`,
    }],
    ['h3', 'Australian conventions you will meet'],
    ['list', [
      R`**Savings accounts**: interest is usually calculated daily and paid monthly, so the effective rate is slightly above the quoted rate, as long as you leave the interest in the account.`,
      R`**Term deposits**: the rate is fixed for the term. You can often choose to receive interest monthly, annually or at maturity; the bank usually offers a slightly lower rate for more frequent payment, because it hands you money earlier.`,
      R`**Loans**: lenders advertise an interest rate and a **comparison rate**. The comparison rate folds most fees into a single yearly figure for a standard example loan (for home loans the standard example is $150,000 over 25 years), so it is a better guide to total cost, though it is only accurate for that example. Loan Key Fact Sheets now show a comparison rate personalised to your loan.`,
    ]],
    ['example', {
      title: 'Monthly interest or interest at maturity?',
      setup: R`You have $10,000 for 12 months. Bank A offers a term deposit at 4.45% p.a. paid at maturity. Bank B offers 4.40% p.a. paid monthly into your everyday account.`,
      steps: [
        R`Bank A: you receive \(10{,}000 \times 1.0445 = \$10{,}445.00\) at the end of the year.`,
        R`Bank B, if the monthly interest sits in an account paying nothing: total \(= 10{,}000 \times (1 + 0.044) = \$10{,}440.00\).`,
        R`Bank B, if you could reinvest each monthly payment at the same 4.40% rate: \(10{,}000 \times (1 + 0.044/12)^{12} = \$10{,}448.98\), an effective rate of 4.49%.`,
      ],
      answer: R`Bank B wins only if you actually reinvest the monthly interest at a rate close to 4.4%. If the interest lands in a transaction account paying nothing, Bank A is better. The effective rate depends on what happens to the cash between payments, a point we will meet again as the reinvestment assumption behind the IRR.`,
    }],

    ['h', 'Real and nominal cash flows'],
    ['p', R`In lecture 1 you met the Fisher relation linking nominal rates, real rates and inflation. In time-value problems there is one rule you must never break: **discount nominal cash flows at nominal rates, and real cash flows at real rates.** Nominal cash flows are measured in the dollars that will actually change hands at each date. Real cash flows are measured in today’s purchasing power.`],
    ['example', {
      title: 'How much will my savings really buy?',
      setup: R`You invest $12,000 for 25 years at a nominal 7% a year. Inflation is expected to average 3% a year.`,
      steps: [
        R`Nominal future value: \(12{,}000 \times 1.07^{25} = \$65{,}129.19\).`,
        R`In today’s dollars, deflate by 25 years of inflation: \(65{,}129.19 / 1.03^{25} = \$31{,}106.06\).`,
        R`Alternatively, use the real rate directly: \(r_{real} = 1.07/1.03 - 1 = 3.8835\%\), and \(12{,}000 \times 1.038835^{25} = \$31{,}106.06\). Same answer.`,
      ],
      answer: R`The account will show about $65,129, but that money will buy roughly what $31,106 buys today. Both views are correct; mixing them is not. A retirement plan stated in nominal dollars can look much more comfortable than it really is.`,
    }],
    ['warn', R`Using a nominal discount rate on real cash flows, or a real rate on nominal cash flows, is a classic error in project appraisal and superannuation planning. It can change a recommendation from "accept" to "reject". Always label your cash flows and your rate.`],

    ['h', 'Doing it in Excel'],
    ['p', R`Excel has a family of time-value functions that share the same five arguments: **rate** per period, **nper** (number of periods), **pmt** (a regular payment, zero for single sums), **pv** and **fv**. They follow the sign convention strictly: if the present value is an outflow (negative), the future value comes back positive. The optional last argument, **type**, is 0 for payments at the end of each period and 1 for the start; it matters only when \(pmt\) is not zero.`],
    ['code', { lang: 'excel', say: 'Each formula uses the rate per period, the number of periods, a payment of zero, and the present or future value with the correct sign.', src: R`=FV(5%, 10, 0, -10000)            → 16,288.95   future value of $10,000 at 5% for 10 years
=PV(4.5%, 4, 0, 20000)            → -16,771.23  deposit needed today for $20,000 in 4 years
=RATE(7, 0, -5000, 8000)          → 6.94%       compound annual growth rate
=NPER(6%, 0, -15000, 25000)       → 8.77        years to grow $15,000 into $25,000
=FV(4.8%/12, 3*12, 0, -2500)      → 2,886.38    $2,500 for 3 years at 4.8% compounded monthly
=EFFECT(6%, 12)                   → 6.1678%     effective annual rate of 6% compounded monthly
=NOMINAL(5%, 12)                  → 4.8889%     APR (monthly compounding) that gives a 5% EAR
=(1+7%)^(1/12)-1                  → 0.5654%     monthly rate equivalent to a 7% EAR` }],
    ['p', R`And the same calculations in Python, which you will use in the later quantitative subjects:`],
    ['code', { lang: 'python', say: 'The Python code defines future value, present value, the growth rate, the number of periods and the effective annual rate, and prints the examples from this lecture.', src: R`import math

def fv(pv, r, n):   return pv * (1 + r) ** n
def pv(fv_, r, n):  return fv_ / (1 + r) ** n
def rate(pv_, fv_, n): return (fv_ / pv_) ** (1 / n) - 1
def nper(pv_, fv_, r): return math.log(fv_ / pv_) / math.log(1 + r)
def ear(apr, m):    return (1 + apr / m) ** m - 1

print(round(fv(10_000, 0.05, 10), 2))      # 16288.95
print(round(pv(20_000, 0.045, 4), 2))      # 16771.23
print(round(rate(5_000, 8_000, 7), 4))     # 0.0694
print(round(nper(15_000, 25_000, 0.06), 2))# 8.77
print(round(ear(0.06, 12), 6))             # 0.061678
print(round(math.exp(0.06) - 1, 6))        # 0.061837 (continuous)` }],

    ['h', 'Mistakes that cost marks and money'],
    ['list', [
      R`**Mismatched periods.** A monthly rate must be paired with a number of months. If the rate is 6% a year compounded monthly and the horizon is 3 years, use 0.5% and 36, not 6% and 3 and not 0.5% and 3.`,
      R`**Treating an APR as an effective rate.** 6% compounded monthly is 6.17% effective. Compare like with like.`,
      R`**Dividing total growth by years.** Use the CAGR formula, which respects compounding.`,
      R`**Forgetting signs in Excel.** If =PV or =RATE returns an error or a strange negative number, check that one of pv and fv is negative.`,
      R`**Rounding too early.** Keep full precision in intermediate steps and round only the final answer. A discount factor rounded to two decimals can shift a large valuation by thousands of dollars.`,
    ]],

    ['case', {
      title: 'The two savings offers',
      text: R`Minh has A$18,000 saved for a home deposit and expects to buy in three years. Offer 1 is an online savings account at 4.85% p.a., interest calculated daily and paid monthly, with the bonus rate only paid in months where the balance increases. Offer 2 is a three-year term deposit at 4.60% p.a. compounded annually and paid at maturity, with a penalty if he breaks it early.

Minh’s parents in Vietnam suggest instead a 12-month dong deposit at a bank in Ho Chi Minh City paying 5.2% a year, rolled over each year, then converting the money to Australian dollars when he buys.`,
      questions: [
        'Compute the effective annual rate and the three-year future value of each Australian offer. What must Minh do each month to keep earning the bonus rate on Offer 1?',
        'Which risks does Offer 1 carry that Offer 2 does not, and vice versa? Consider rate changes, liquidity and behaviour.',
        'Why can the Vietnamese deposit not be compared with the Australian offers using interest rates alone? What additional risk does it add, and roughly how much would the Australian dollar need to rise against the dong over three years to wipe out the rate advantage?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Always start with a timeline and a sign convention; compare cash flows only after moving them to the same date.`,
      R`Compound interest earns interest on interest: \(FV = PV(1+r)^n\) and \(PV = FV/(1+r)^n\).`,
      R`Solve for growth with \(r = (FV/PV)^{1/n} - 1\) and for time with \(n = \ln(FV/PV)/\ln(1+r)\).`,
      R`Quoted annual rates must be converted: periodic rate = APR/m, and EAR = \((1 + APR/m)^m - 1\), or \(e^{APR} - 1\) with continuous compounding.`,
      R`Discount nominal cash flows at nominal rates and real cash flows at real rates.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`You deposit $12,000 at 7% a year compounded annually. What is the balance after 25 years?`, answer: 65129.19, tol: 1, solution: R`\(FV = 12{,}000 \times 1.07^{25} = 12{,}000 \times 5.427433 = \$65{,}129.19\). In Excel: =FV(7%,25,0,-12000).` },
    { type: 'num', level: 'Core', q: R`How much must you invest today at 5.5% a year, compounded annually, to have $50,000 in 6 years?`, answer: 36262.29, tol: 1, solution: R`\(PV = 50{,}000 / 1.055^{6} = 50{,}000 / 1.378843 = \$36{,}262.29\).` },
    { type: 'num', level: 'Core', q: R`A collectible bought for $400 is sold 12 years later for $1,000. What compound annual return did it earn, in percent?`, answer: 7.93, tol: 0.02, hint: R`\(r = (FV/PV)^{1/n} - 1\).`, solution: R`\(r = (1{,}000/400)^{1/12} - 1 = 2.5^{0.08333} - 1 = 7.93\%\) a year. Dividing the 150% gain by 12 years (12.5%) would badly overstate it.` },
    { type: 'num', level: 'Core', q: R`At 5% a year compounded monthly, how many years does it take for money to double? Give your answer in years to two decimals.`, answer: 13.89, tol: 0.02, solution: R`Monthly rate = 0.05/12. Number of months = \(\ln 2 / \ln(1 + 0.05/12) = 166.70\). In years: 166.70 / 12 = **13.89 years**. The rule of 72 gives 14.4 years, a reasonable approximation.` },
    { type: 'num', level: 'Core', q: R`A personal loan charges 21.99% p.a. compounded monthly. What is the effective annual rate, in percent?`, answer: 24.35, tol: 0.02, solution: R`\(\text{EAR} = (1 + 0.2199/12)^{12} - 1 = 1.24347 - 1 = 24.35\%\). In Excel: =EFFECT(21.99%,12).` },
    { type: 'num', level: 'Stretch', q: R`A bank wants to advertise a savings account whose effective annual rate is exactly 5%, with interest compounded monthly. What nominal annual rate (APR) should it quote, in percent?`, answer: 4.889, tol: 0.005, solution: R`Monthly rate = \(1.05^{1/12} - 1 = 0.40741\%\). APR = 12 × 0.40741% = **4.889%**. In Excel: =NOMINAL(5%,12).` },
    { type: 'num', level: 'Core', q: R`You deposit $2,500 for 3 years at 4.8% p.a. compounded monthly. What is the balance at the end?`, answer: 2886.38, tol: 0.5, solution: R`\(FV = 2{,}500 \times (1 + 0.048/12)^{36} = 2{,}500 \times 1.004^{36} = \$2{,}886.38\).` },
    { type: 'num', level: 'Stretch', q: R`An investment earns 7% a year nominal and inflation averages 3% a year. Using the exact real rate, what is the value in today’s dollars of $12,000 invested for 25 years? (Round to the nearest dollar.)`, answer: 31106, tol: 2, solution: R`Real rate = 1.07/1.03 − 1 = 3.8835%. Real FV = \(12{,}000 \times 1.038835^{25} = \$31{,}106\). Equivalently, 65,129.19 / 1.03^25.` },
    { type: 'mcq', level: 'Core', q: 'Holding everything else fixed, which cash flow’s present value falls by the largest percentage when the discount rate rises from 4% to 6%?', options: ['$1,000 in 1 year', '$1,000 in 5 years', '$1,000 in 20 years', 'All fall by the same percentage'], answer: 2, solution: R`The distant cash flow is most sensitive. PV at 4% and 6%: 1 year 961.54 → 943.40 (−1.9%); 5 years 821.93 → 747.26 (−9.1%); 20 years 456.39 → 311.80 (−31.7%). This is why long-duration assets are most exposed to interest-rate changes.` },
    { type: 'mcq', level: 'Core', q: 'Which rate should you use to compare a savings account compounded daily with a term deposit compounded annually?', options: ['The nominal annual rate of each', 'The effective annual rate of each', 'The comparison rate', 'The cash rate'], answer: 1, solution: R`Convert both to **effective annual rates**, which measure actual growth over a year. Nominal rates with different compounding frequencies are not comparable. The comparison rate is a loan disclosure tool that includes fees.` },
    { type: 'mcq', level: 'Stretch', q: R`With continuous compounding at 5% a year, what is the present value of $1,000 received in 10 years?`, options: ['$606.53', '$613.91', '$620.92', '$500.00'], answer: 0, solution: R`\(PV = 1{,}000 \times e^{-0.05 \times 10} = 1{,}000 \times e^{-0.5} = \$606.53\). Annual compounding would give $613.91, slightly more, because continuous compounding grows money faster and so discounts it more.` },
    { type: 'long', level: 'Core', q: 'Explain in your own words why the present value of a distant cash flow is more sensitive to the discount rate than the present value of a near cash flow. Use a numerical illustration.', answer: R`The present value is \(FV/(1+r)^n\). The discount rate enters raised to the power \(n\), so a change in \(r\) is applied once for a one-year cash flow but compounded twenty times for a twenty-year cash flow. Raising the rate from 4% to 6% multiplies the one-year discount factor by 1.04/1.06, a fall of about 1.9%, but multiplies the twenty-year discount factor by \((1.04/1.06)^{20}\), a fall of about 31.7%. For $1,000 due in 20 years the present value drops from $456.39 to $311.80. Intuitively, a higher rate means every year of waiting costs more, and a distant cash flow involves many years of waiting. This is the same mechanism that makes long-term bonds and growth shares fall most when interest rates rise.`, solution: 'Look for the exponent argument, a numerical example, and a link to asset prices.' },
  ],
  glossary: [
    ['Present value (PV)', 'The value today of a future cash flow, found by discounting at an appropriate rate.'],
    ['Future value (FV)', 'The value at a future date of money invested today, found by compounding.'],
    ['Discount factor', 'The multiplier \(1/(1+r)^n\) that converts a cash flow at time n into today’s value.'],
    ['Compound annual growth rate (CAGR)', 'The constant annual rate that carries a starting value to an ending value over several years.'],
    ['Nominal annual rate (APR)', 'A quoted yearly rate that must be divided by the compounding frequency to get the periodic rate.'],
    ['Effective annual rate (EAR)', 'The rate that, compounded once a year, gives the same growth as the quoted rate with its actual compounding.'],
    ['Continuous compounding', 'The limit of compounding infinitely often; growth factor \(e^{rT}\).'],
    ['Comparison rate', 'An Australian disclosure figure that combines a loan’s interest rate and most fees for a standard example loan.'],
  ],
  resources: ['MS_COMPOUND', 'XL_FV', 'XL_PV', 'XL_RATE', 'XL_NPER', 'XL_EFFECT', 'INV_TVM', 'KHAN', 'OS_FIN', 'MIT401', 'MS_TD', 'MS_SAVINGS'],
};
