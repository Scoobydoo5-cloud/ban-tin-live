const R = String.raw;
export default {
  id: '25400-06', subject: '25400', title: 'Measuring investment performance', mins: 65, level: 'Foundation',
  summary: 'How to measure what an investment really earned and how risky it was: holding-period returns, income and capital components, arithmetic versus geometric averages and volatility drag, annualising, time-weighted versus money-weighted returns, standard deviation, drawdowns, expected returns from scenarios, the Sharpe ratio and honest benchmarking.',
  objectives: [
    'Calculate a holding-period return and split it into income and capital-gain components',
    'Explain why the geometric mean is below the arithmetic mean and when to use each',
    'Annualise returns and volatility correctly',
    'Distinguish time-weighted from money-weighted returns and compute both',
    'Measure risk with standard deviation and maximum drawdown, and compute expected return and risk from scenarios',
    'Compute and interpret the Sharpe ratio and choose an appropriate benchmark',
    'Adjust returns for inflation, fees and tax',
  ],
  body: [
    ['h', 'Why measurement matters'],
    ['p', R`Every investment product in the world advertises its returns, and a surprising number of those numbers are technically true and practically misleading. A fund that "returned 60%" may have done so over eight years. A strategy with a "10% average return" may have lost money for its investors. A manager who beat the market may simply have taken more risk. To judge any investment, including your own portfolio, you need a small set of tools that answer three questions precisely: **How much did it earn? How risky was the ride? Was the return good enough for the risk taken?**`],

    ['h', 'The holding-period return'],
    ['p', R`The basic building block is the return over a single holding period, from buying at price \(P_0\) to selling (or valuing) at \(P_1\), with any income \(D\) (dividends, distributions, interest, rent) received along the way.`],
    ['math', R`r = \frac{P_1 - P_0 + D}{P_0} = \underbrace{\frac{D}{P_0}}_{\text{income yield}} + \underbrace{\frac{P_1 - P_0}{P_0}}_{\text{capital gain yield}}`, 'The holding-period return equals P one minus P zero plus D, all over P zero. It is the income yield, D over P zero, plus the capital gain yield, P one minus P zero over P zero.'],
    ['example', {
      title: 'A year in an Australian bank share',
      setup: R`You buy a share at $40.00, receive dividends of $1.60 during the year, and the price is $43.20 at year end.`,
      steps: [
        R`Income yield: \(1.60/40.00 = 4.0\%\).`,
        R`Capital gain yield: \((43.20 - 40.00)/40.00 = 8.0\%\).`,
        R`Total return: \(4.0\% + 8.0\% = 12.0\%\).`,
        R`If the dividend is fully franked, it carries a franking credit of \(1.60 \times 0.3/0.7 = \$0.69\). Including it, the "grossed-up" return is about 13.7%, which is how many Australian funds report returns to investors who can use the credits.`,
      ],
      answer: R`The share returned 12.0% before tax (13.7% including franking credits). Ignoring the dividend, as price charts do, would understate the return by a third.`,
    }],
    ['warn', R`Share-market indices come in two versions. A **price index** (such as the headline S&P/ASX 200) tracks prices only. An **accumulation** or total-return index assumes dividends are reinvested. Over long periods the gap is enormous, especially in Australia where dividend yields are relatively high. Always compare a fund with a total-return benchmark.`],

    ['h', 'Averaging returns over many periods'],
    ['p', R`Suppose an investment gains 50% one year and loses 50% the next. The **arithmetic mean** return is \((50\% - 50\%)/2 = 0\%\). But $100 becomes $150 and then $75: you have lost a quarter of your money. The **geometric mean**, the constant rate that would produce the same final wealth, is \(\sqrt{1.5 \times 0.5} - 1 = -13.4\%\) a year.`],
    ['math', R`\bar r_A = \frac{1}{T}\sum_{t=1}^{T} r_t \qquad \bar r_G = \left[\prod_{t=1}^{T}(1 + r_t)\right]^{1/T} - 1`, 'The arithmetic mean is one over T times the sum of the returns. The geometric mean is the product of one plus each return, raised to the power one over T, minus one.'],
    ['p', R`The geometric mean is always less than or equal to the arithmetic mean, and the gap grows with volatility. A useful approximation is \(\bar r_G \approx \bar r_A - \sigma^2/2\), where \(\sigma\) is the standard deviation of returns. This gap is called **volatility drag**: losses hurt compounding more than equal gains help it.`],
    ['table', {
      caption: 'Five years of an illustrative fund’s returns',
      head: ['Year', 'Return', 'Growth factor', 'Wealth from $10,000'],
      rows: [
        ['1', '+12%', '1.12', '$11,200.00'],
        ['2', '−8%', '0.92', '$10,304.00'],
        ['3', '+20%', '1.20', '$12,364.80'],
        ['4', '+5%', '1.05', '$12,983.04'],
        ['5', '−3%', '0.97', '$12,593.55'],
      ],
    }],
    ['example', {
      title: 'Which average should the fund report?',
      steps: [
        R`Arithmetic mean: \((12 - 8 + 20 + 5 - 3)/5 = 5.20\%\).`,
        R`Geometric mean: \((1.12 \times 0.92 \times 1.20 \times 1.05 \times 0.97)^{1/5} - 1 = 1.25935^{0.2} - 1 = 4.72\%\).`,
        R`Check: \(10{,}000 \times 1.0472^5 = \$12{,}594\), matching the final wealth. At 5.20% you would have \$12,885, which never happened.`,
        R`Volatility drag approximation: with \(\sigma = 11.26\%\), \(5.20\% - 0.1126^2/2 = 4.57\%\), close to the true 4.72%.`,
      ],
      answer: R`To describe **what happened** to an investor’s wealth over several periods, use the geometric mean (the compound annual growth rate). The arithmetic mean is the right input when you need an unbiased estimate of **next year’s expected return**, a distinction you will revisit in Investment Analysis.`,
    }],

    ['h', 'Annualising'],
    ['p', R`Returns measured over different lengths of time must be put on a common annual basis before they are compared. For a return \(r\) earned over \(m\) months, the annualised return is \((1+r)^{12/m} - 1\). A 2.5% return over three months annualises to \(1.025^4 - 1 = 10.4\%\); a 14% return over 18 months annualises to \(1.14^{12/18} - 1 = 9.1\%\).`],
    ['warn', R`Be very careful annualising short periods. A 5% gain in one month does not mean the investment "earns 80% a year". Short-period returns are dominated by noise, and fund-disclosure rules generally discourage annualising returns for periods of less than a year for that reason.`],
    ['p', R`Volatility annualises differently. If returns in different periods are independent, variances add, so standard deviation grows with the **square root** of time: \(\sigma_{annual} = \sigma_{monthly} \times \sqrt{12}\). A monthly standard deviation of 4.2% corresponds to about \(4.2\% \times 3.464 = 14.5\%\) a year, roughly the volatility of a broad share-market index.`],

    ['h', 'Time-weighted versus money-weighted returns'],
    ['p', R`When money flows into and out of an investment, "the return" becomes ambiguous. The **time-weighted return (TWR)** measures the performance of the investment itself, removing the effect of when investors added or withdrew money. It is calculated by compounding the returns of each sub-period between cash flows, and it is the standard for comparing fund managers, because managers do not control when clients invest. The **money-weighted return (MWR)** is the internal rate of return of the investor’s actual cash flows. It measures the investor’s own experience, including the effect of their timing.`],
    ['example', {
      title: 'Good fund, bad timing',
      setup: R`You invest $10,000 in a fund at the start of year 1. The fund returns +20% in year 1, so you have $12,000. Encouraged, you add $20,000 at the start of year 2. The fund then returns −10% in year 2, leaving you with \((12{,}000 + 20{,}000) \times 0.9 = \$28{,}800\).`,
      steps: [
        R`Time-weighted return: \(\sqrt{1.20 \times 0.90} - 1 = +3.92\%\) a year. The fund did modestly well.`,
        R`Money-weighted return: solve \(-10{,}000 - \dfrac{20{,}000}{1+r} + \dfrac{28{,}800}{(1+r)^2} = 0\), giving \(r = -3.02\%\) a year.`,
        R`You invested \$30,000 in total and ended with \$28,800: you lost money even though the fund made money.`,
      ],
      answer: R`The fund’s TWR is +3.92% a year, but your MWR is −3.02%, because most of your money arrived just before the bad year. Studies of fund flows repeatedly find that investors’ money-weighted returns fall short of the funds’ time-weighted returns, because investors tend to buy after good performance and sell after bad.`,
    }],
    ['p', R`In Excel, the time-weighted return is =PRODUCT(1+range)^(1/n)−1 entered over the sub-period returns, and the money-weighted return is =IRR(cash flows) for regular periods or =XIRR(cash flows, dates) for irregular dates. For example, investing \$5,000 on day 0 and \$3,000 on day 200, with a value of \$8,900 on day 400, gives an XIRR of about 12.7% a year.`],

    ['h', 'Measuring risk'],
    ['p', R`Return is only half the story. Two funds with the same average return can offer very different experiences. The most common risk measure is the **standard deviation** of returns, \(\sigma\), which measures how widely returns scatter around their mean. With a sample of \(T\) returns:`],
    ['math', R`s^2 = \frac{1}{T-1}\sum_{t=1}^{T}(r_t - \bar r)^2 \qquad s = \sqrt{s^2}`, 'The sample variance equals one over T minus one, times the sum of squared deviations of each return from the mean. The standard deviation is the square root of the variance.'],
    ['p', R`We divide by \(T-1\) rather than \(T\) because the mean itself was estimated from the same data, which uses up one "degree of freedom"; you will prove why in Responsible Evidence-Based Decisions. For the five-year fund above, the deviations from 5.2% are 6.8, −13.2, 14.8, −0.2 and −8.2 percentage points. Their squares sum to 0.05068, so \(s^2 = 0.05068/4 = 0.01267\) and \(s = 11.26\%\).`],
    ['p', R`If returns were roughly normally distributed, about two-thirds of years would fall within one standard deviation of the mean (here, between about −6% and +16%) and about 95% within two (between about −17% and +28%). Real returns have **fatter tails** than the normal distribution: extreme losses such as those in 1987, 2008 and 2020 happen far more often than a normal model predicts. So treat these ranges as a rough guide, not a guarantee.`],
    ['h3', 'Maximum drawdown'],
    ['p', R`Investors feel risk as losses from a previous high, not as standard deviations. The **maximum drawdown** is the largest peak-to-trough fall in value over a period. For a portfolio whose value moves 100, 112, 125, 118, 96, 88, 101, 115, 131, the peak before the fall is 125 and the trough is 88, a maximum drawdown of \(88/125 - 1 = -29.6\%\). Recovering required a 42% gain from the trough.`],
    ['table', {
      caption: 'Losses need larger gains to recover',
      head: ['Loss', 'Gain needed to get back to even'],
      rows: [['−10%', '+11.1%'], ['−20%', '+25.0%'], ['−30%', '+42.9%'], ['−40%', '+66.7%'], ['−50%', '+100.0%']],
    }],
    ['key', R`Asymmetry is the heart of volatility drag: a 50% loss requires a 100% gain to recover. Avoiding large losses matters more for long-run wealth than capturing every gain.`],

    ['h', 'Expected return and risk from scenarios'],
    ['p', R`Historical returns describe the past. For decisions we need a view of the future, and a simple way to form one is **scenario analysis**: list possible states of the world, assign probabilities, and estimate the return in each.`],
    ['math', R`E[r] = \sum_{s} p_s\, r_s \qquad \sigma^2 = \sum_{s} p_s\,(r_s - E[r])^2`, 'The expected return is the sum over scenarios of the probability times the return. The variance is the sum over scenarios of the probability times the squared deviation from the expected return.'],
    ['example', {
      title: 'Three scenarios for next year',
      setup: R`An analyst assigns a 25% chance to a boom (return +25%), 50% to a normal year (+8%) and 25% to a recession (−12%).`,
      steps: [
        R`Expected return: \(0.25 \times 25\% + 0.5 \times 8\% + 0.25 \times (-12\%) = 7.25\%\).`,
        R`Variance: \(0.25(0.25 - 0.0725)^2 + 0.5(0.08 - 0.0725)^2 + 0.25(-0.12 - 0.0725)^2 = 0.01717\).`,
        R`Standard deviation: \(\sqrt{0.01717} = 13.1\%\).`,
      ],
      answer: R`Expected return 7.25%, standard deviation 13.1%. The expected return is a probability-weighted average; no single scenario actually produces 7.25%. This is the same logic you will use for expected utility in Financial Metrics for Decision Making and for portfolio theory in lecture 7.`,
    }],

    ['h', 'Risk-adjusted performance: the Sharpe ratio'],
    ['p', R`A fund that returned 9% with wild swings is not necessarily better than one that returned 7% smoothly. William Sharpe, a Nobel laureate, proposed dividing the **excess return** (the return above the risk-free rate) by the standard deviation. The result is the reward earned per unit of total risk.`],
    ['math', R`\text{Sharpe ratio} = \frac{\bar r_p - r_f}{\sigma_p}`, 'The Sharpe ratio equals the portfolio’s average return minus the risk-free rate, divided by the portfolio’s standard deviation.'],
    ['example', {
      title: 'Comparing two funds',
      setup: R`Fund A: average return 9%, standard deviation 15%. Fund B: average return 7%, standard deviation 9%. The risk-free rate is 4.35%, the current cash rate.`,
      steps: [
        R`Sharpe A: \((9\% - 4.35\%)/15\% = 0.310\).`,
        R`Sharpe B: \((7\% - 4.35\%)/9\% = 0.294\).`,
      ],
      answer: R`Fund A delivered slightly more excess return per unit of risk, despite being far more volatile. Because investors can combine a fund with cash to raise or lower risk, the fund with the higher Sharpe ratio offers the better risk–return trade-off, a result you will derive properly in Investment Analysis.`,
    }],
    ['p', R`Other measures you will meet later include the **Treynor ratio** (excess return per unit of beta), **Jensen’s alpha** (return above what the CAPM predicts), and the **information ratio** (excess return over a benchmark divided by **tracking error**, the volatility of that excess return). They all ask the same question in different ways: was the extra return worth the extra risk?`],

    ['h', 'Honest comparison: benchmarks, fees, tax and inflation'],
    ['list', [
      R`**Choose the right benchmark.** An Australian share fund should be compared with the S&P/ASX 200 or 300 accumulation index; a global fund with a global index in the same currency; a Vietnamese fund with the VN-Index. A fund that holds small companies should not be compared with a large-company index.`,
      R`**Use net returns.** Compare returns after all fees. A 1% annual fee turns 7% into 6%, and over 30 years turns \$10,000 into \$57,435 instead of \$76,123.`,
      R`**Think real and after tax.** An 8% nominal return with 3.5% inflation is a 4.35% real return; after a 1% fee it is 3.38% real.`,
      R`**Beware survivorship bias.** Funds that performed badly are often closed or merged, so published averages over surviving funds overstate what investors actually earned.`,
      R`**Beware cherry-picked periods.** "Returned 18% a year since 2020" may reflect a start date chosen at the bottom of a crash. Look at several periods and the full history.`,
      R`**Past performance is not a reliable indicator of future performance.** This warning appears on every Australian product disclosure for good reason: performance rankings of funds are notoriously unstable from one period to the next.`,
    ]],

    ['h', 'Doing it in Excel and Python'],
    ['code', { lang: 'excel', say: 'The sheet computes arithmetic and geometric means, the sample standard deviation, annualised volatility, the Sharpe ratio and money-weighted returns.', src: R`Returns in B2:B6: 12%, -8%, 20%, 5%, -3%
Arithmetic mean        =AVERAGE(B2:B6)                        → 5.20%
Geometric mean         =PRODUCT(1+B2:B6)^(1/COUNT(B2:B6))-1   → 4.72%   (Enter normally in Excel 365)
Sample std deviation   =STDEV.S(B2:B6)                        → 11.26%
Annualise monthly sd   =STDEV.S(monthly_returns)*SQRT(12)
Sharpe ratio           =(AVERAGE(B2:B6)-4.35%)/STDEV.S(B2:B6)
Money-weighted return  =IRR({-10000,-20000,28800})            → -3.02%
Irregular dates        =XIRR(values, dates)` }],
    ['code', { lang: 'python', say: 'The Python code computes the same statistics and the maximum drawdown from a list of values.', src: R`import numpy as np

r = np.array([0.12, -0.08, 0.20, 0.05, -0.03])
arith = r.mean()                                  # 0.052
geo = np.prod(1 + r) ** (1 / len(r)) - 1          # 0.0472
sd = r.std(ddof=1)                                # 0.1126  (ddof=1 -> divide by T-1)
sharpe = (arith - 0.0435) / sd

values = np.array([100, 112, 125, 118, 96, 88, 101, 115, 131])
running_peak = np.maximum.accumulate(values)
max_drawdown = (values / running_peak - 1).min()  # -0.296
print(round(arith, 4), round(geo, 4), round(sd, 4), round(sharpe, 3), round(max_drawdown, 3))` }],

    ['case', {
      title: 'The fund brochure',
      text: R`A glossy brochure for the "Mekong Growth Fund" says: "Average annual return of 14.2% over five years! Beat the VN-Index in four of the last five years. Top-quartile manager." In the fine print, the annual returns were +48%, −31%, +22%, +19% and +13%, after fees of 2.1% a year; the comparison is with the VN-Index price index, and the fund’s assets grew from US$20 million to US$400 million over the period, most of it arriving after the +48% year.`,
      questions: [
        'Compute the arithmetic and geometric mean returns and the standard deviation. Which figure is the brochure quoting?',
        'Why is comparing the fund with a price index unfair to the index?',
        'What does the pattern of fund inflows suggest about the typical investor’s money-weighted return?',
        'What additional information would you ask for before investing?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Holding-period return = income yield + capital gain yield. Use total-return benchmarks.`,
      R`The geometric mean describes realised compound growth; it is below the arithmetic mean by roughly \(\sigma^2/2\) (volatility drag).`,
      R`Annualise returns by compounding, and volatility by the square root of time.`,
      R`Time-weighted returns judge the manager; money-weighted returns (IRR) judge the investor’s experience.`,
      R`Standard deviation and maximum drawdown measure risk; a loss of \(x\%\) requires a gain of \(x/(1-x)\) to recover.`,
      R`The Sharpe ratio measures excess return per unit of total risk. Compare net of fees, after tax and in real terms.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`You buy a share at $25.00, receive $0.90 of dividends and sell it a year later for $27.50. What is the holding-period return, in percent?`, answer: 13.6, tol: 0.02, solution: R`\((27.50 - 25.00 + 0.90)/25.00 = 3.40/25.00 = 13.6\%\): a 3.6% income yield plus a 10.0% capital gain yield.` },
    { type: 'num', level: 'Core', q: R`Annual returns over four years were +18%, −10%, +7% and +15%. What is the geometric mean return, in percent?`, answer: 6.92, tol: 0.02, solution: R`\((1.18 \times 0.90 \times 1.07 \times 1.15)^{1/4} - 1 = 1.30687^{0.25} - 1 = 6.92\%\). The arithmetic mean is 7.50%.` },
    { type: 'num', level: 'Core', q: R`For the same four returns, what is the sample standard deviation, in percent?`, answer: 12.56, tol: 0.03, solution: R`Mean 7.5%. Deviations: 10.5, −17.5, −0.5, 7.5. Squares: 110.25, 306.25, 0.25, 56.25; sum 473.0 (in %²). Divide by 3: 157.67. Square root: **12.56%**.` },
    { type: 'num', level: 'Core', q: R`A fund returned +10%, −5% and +12% in three consecutive years. What is its annual time-weighted return, in percent?`, answer: 5.38, tol: 0.02, solution: R`\((1.10 \times 0.95 \times 1.12)^{1/3} - 1 = 1.17040^{1/3} - 1 = 5.38\%\).` },
    { type: 'num', level: 'Core', q: R`A portfolio has an average return of 11% and a standard deviation of 18%. The risk-free rate is 4%. What is its Sharpe ratio? (Three decimals.)`, answer: 0.389, tol: 0.002, solution: R`\((11\% - 4\%)/18\% = 0.389\).` },
    { type: 'num', level: 'Core', q: R`An investment returns 0.9% every month for a year. What is its annual return, in percent?`, answer: 11.35, tol: 0.02, solution: R`\(1.009^{12} - 1 = 11.35\%\), not \(12 \times 0.9\% = 10.8\%\).` },
    { type: 'num', level: 'Core', q: R`A bond fund returned 6.5% while inflation was 2.8%. What was its exact real return, in percent?`, answer: 3.6, tol: 0.02, solution: R`\(1.065/1.028 - 1 = 3.60\%\).` },
    { type: 'num', level: 'Stretch', q: R`Scenarios for next year: 30% chance of +20%, 40% chance of +6%, 30% chance of −10%. What is the standard deviation of return, in percent?`, answer: 11.63, tol: 0.03, solution: R`\(E[r] = 0.3(20) + 0.4(6) + 0.3(-10) = 5.4\%\). Variance \(= 0.3(14.6)^2 + 0.4(0.6)^2 + 0.3(-15.4)^2 = 63.95 + 0.14 + 71.15 = 135.24\) (in %²). \(\sigma = 11.63\%\).` },
    { type: 'num', level: 'Core', q: R`After a 40% loss, what percentage gain is needed to return to the original value?`, answer: 66.67, tol: 0.05, solution: R`\(1/0.6 - 1 = 66.67\%\).` },
    { type: 'mcq', level: 'Core', q: 'Which return measure should you use to compare two fund managers whose clients added and withdrew money at different times?', options: ['Money-weighted return', 'Time-weighted return', 'Arithmetic mean of monthly returns without compounding', 'The largest single-year return'], answer: 1, solution: R`The **time-weighted return** removes the effect of client cash flows, which managers do not control. The money-weighted return reflects the investor’s own timing.` },
    { type: 'mcq', level: 'Core', q: 'Why is the geometric mean return lower than the arithmetic mean whenever returns vary?', options: ['Because of fees', 'Because losses reduce the base on which later gains compound (volatility drag)', 'Because the geometric mean ignores dividends', 'Because the arithmetic mean includes inflation'], answer: 1, solution: R`Compounding is asymmetric: a loss shrinks the base, so an equal percentage gain does not restore it. The larger the volatility, the larger the gap, roughly \(\sigma^2/2\).` },
    { type: 'long', level: 'Stretch', q: 'An investor says: "My super fund returned 9% last year and my friend’s returned 11%, so I should switch." Give at least four reasons why this comparison may be misleading and explain how you would compare the funds properly.', answer: R`First, one year is far too short: rankings over single years are largely noise, so compare returns over five to ten years or more. Second, the funds may have different **risk levels**: an 11% return from a high-growth option with 90% shares is not comparable with 9% from a balanced option; compare like-for-like investment options and use risk-adjusted measures such as the Sharpe ratio. Third, check whether returns are reported **net of all fees and taxes**; fee differences compound over decades. Fourth, the investor’s own experience depends on **timing of contributions** (money-weighted versus time-weighted). Fifth, switching has costs: insurance cover inside super may be lost, and there may be buy–sell spreads.

A proper comparison uses the same investment option type (for example, both "balanced" or both "high growth" with similar asset allocations), long-run net returns after fees and taxes, volatility and worst drawdowns, fees in dollars on a typical balance, insurance and services. The ATO’s YourSuper comparison tool and APRA’s performance test results are good starting points.`, solution: 'Credit any four valid reasons (period length, risk, fees and tax, timing, costs of switching, benchmark mismatch, survivorship) plus a sensible method.' },
  ],
  glossary: [
    ['Holding-period return', 'The total return over one period: income plus price change, divided by the starting price.'],
    ['Geometric mean', 'The constant compound rate that produces the same final wealth as the actual sequence of returns.'],
    ['Volatility drag', 'The gap between arithmetic and geometric mean returns caused by volatility, roughly σ²/2.'],
    ['Time-weighted return', 'A return that compounds sub-period returns and ignores the size and timing of cash flows.'],
    ['Money-weighted return', 'The internal rate of return on an investor’s actual cash flows.'],
    ['Maximum drawdown', 'The largest peak-to-trough fall in value over a period.'],
    ['Sharpe ratio', 'Excess return over the risk-free rate divided by standard deviation.'],
    ['Accumulation index', 'An index that assumes dividends are reinvested; a total-return benchmark.'],
  ],
  resources: ['INV_SHARPE', 'XL_IRR', 'MS_FUNDS', 'ATO_YOURSUPER', 'PV', 'MIT433', 'OS_FIN', 'KHAN', 'book:BKM'],
};
