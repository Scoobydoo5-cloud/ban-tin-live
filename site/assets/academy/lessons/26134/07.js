const R = String.raw;
const pdf = (x) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
const z = Array.from({ length: 81 }, (_, i) => { const x = -4 + i * 0.1; return [+x.toFixed(2), +pdf(x).toFixed(5)]; });
export default {
  id: '26134-07', subject: '26134', title: 'Hypothesis testing', mins: 80, level: 'Intermediate',
  summary: 'The logic and practice of testing claims with data: null and alternative hypotheses, test statistics, p-values and significance, Type I and II errors and power, the main tests (one-sample t, proportion z, two-sample and paired t, chi-square independence), the link with confidence intervals, and the traps (p-hacking, multiple testing, practical versus statistical significance) that plague business and finance research.',
  objectives: [
    'Set up null and alternative hypotheses and choose one- or two-tailed tests',
    'Compute test statistics and p-values and make a decision at a significance level',
    'Explain Type I and Type II errors, power, and how sample size affects them',
    'Carry out one-sample, two-sample (Welch) and paired t tests, a z test for a proportion, and a chi-square test of independence',
    'Relate hypothesis tests to confidence intervals',
    'Recognise p-hacking, multiple testing and the gap between statistical and practical significance, including in backtests',
  ],
  body: [
    ['h', 'The logic: innocent until proven guilty'],
    ['p', R`A hypothesis test is a structured way of asking whether data provide convincing evidence against a default claim. The analogy with a criminal trial is exact. The **null hypothesis** \(H_0\) is the presumption of innocence: no effect, no difference, the claim is true. The **alternative hypothesis** \(H_1\) is what we would conclude if the evidence is strong enough. We then ask: **if \(H_0\) were true, how surprising would data like ours be?** If very surprising, we reject \(H_0\). If not, we **fail to reject** it, which, like a "not guilty" verdict, does not prove innocence; it means the evidence was insufficient.`],
    ['steps', [
      R`State \(H_0\) and \(H_1\) in terms of a parameter, before looking at the data.`,
      R`Choose a significance level \(\alpha\), the risk of wrongly rejecting a true \(H_0\) you are willing to accept (often 5%).`,
      R`Compute a **test statistic**: how many standard errors the estimate is from the value claimed under \(H_0\).`,
      R`Find the **p-value**: the probability, assuming \(H_0\) is true, of a test statistic at least as extreme as the one observed.`,
      R`Decide: reject \(H_0\) if \(p \le \alpha\). Then interpret the result in context, including the size of the effect.`,
    ]],
    ['math', R`\text{Test statistic} = \frac{\text{estimate} - \text{value under } H_0}{\text{standard error}}`, 'The test statistic equals the estimate minus the value under the null hypothesis, divided by the standard error.'],
    ['chart', {
      caption: 'Two-tailed test at α = 5%: reject H₀ if the statistic falls in either red tail (beyond ±1.96)',
      x: [-4, 4], y: [0, 0.42], xl: 'Test statistic (standard errors from H₀)', yl: 'Density under H₀', ydp: 1,
      series: [{ label: 'Distribution of the statistic if H₀ is true', color: '#e9b85c', pts: z }],
      areas: [{ top: z.filter(([x]) => x <= -1.96), color: '#ff5d73', opacity: 0.55 }, { top: z.filter(([x]) => x >= 1.96), color: '#ff5d73', opacity: 0.55 }],
      vlines: [{ v: -1.96, color: '#ff5d73', label: '−1.96' }, { v: 1.96, color: '#ff5d73', label: '+1.96' }],
    }],
    ['p', R`A **two-tailed** test (\(H_1: \mu \ne \mu_0\)) looks for a difference in either direction. A **one-tailed** test (\(H_1: \mu > \mu_0\) or \(\mu < \mu_0\)) looks in one direction only, and must be chosen **before** seeing the data for a genuine reason. Choosing the tail after seeing which way the data point halves the p-value dishonestly.`],

    ['h', 'The one-sample t test'],
    ['example', {
      title: 'Is average student spending really $220?',
      setup: R`A student-services report claims that average weekly spending is $220. Our random sample of 40 has mean $248 and standard deviation $106.78. Test at α = 0.05.`,
      steps: [
        R`\(H_0: \mu = 220\) versus \(H_1: \mu \ne 220\) (two-tailed).`,
        R`\(SE = 106.78/\sqrt{40} = 16.88\). \(t = (248 - 220)/16.88 = 1.66\), with 39 degrees of freedom.`,
        R`p-value \(= 2 \times P(t_{39} > 1.66) = 0.105\).`,
        R`Since \(0.105 > 0.05\), we fail to reject \(H_0\).`,
      ],
      answer: R`The sample does not provide convincing evidence that the report is wrong. Note the consistency with lecture 6: the 95% interval ($213.85 to $282.15) contains $220. A two-tailed test at 5% rejects \(H_0\) exactly when the 95% interval excludes the null value.`,
    }],

    ['h', 'Errors, power and sample size'],
    ['table', {
      caption: 'The four possible outcomes of a test',
      head: ['', 'H₀ is actually true', 'H₀ is actually false'],
      rows: [['Reject H₀', 'Type I error (false positive), probability α', 'Correct decision; probability = power = 1 − β'], ['Fail to reject H₀', 'Correct decision; probability 1 − α', 'Type II error (false negative), probability β']],
    }],
    ['p', R`Lowering \(\alpha\) reduces false positives but, for a given sample size, raises false negatives. The **power** of a test is the probability of detecting an effect that really exists. It increases with the size of the true effect, with the sample size and with \(\alpha\), and decreases with the variability of the data. In the spending example, if the true mean really were $248, a two-tailed 5% test with \(n = 40\) would detect that it differs from $220 only about **38%** of the time. About 114 students would be needed for 80% power. Under-powered studies are common in business, and their "no significant effect" findings are often just too little data.`],
    ['note', R`Which error is worse depends on the decision. For a fraud screen, a false negative (missing fraud) may be costlier than a false positive (a customer call). For approving a new drug or declaring a trading strategy profitable, a false positive is dangerous. Set \(\alpha\) and the sample size with those costs in mind rather than defaulting to 5%.`],

    ['h', 'Testing a proportion'],
    ['example', {
      title: 'Are disputes above the bank’s 3% target?',
      setup: R`A bank’s service charter says at most 3% of card transactions are disputed. In a random sample of 1,200 transactions, 48 (4%) were disputed. Test at α = 0.05.`,
      steps: [
        R`\(H_0: p = 0.03\) versus \(H_1: p > 0.03\) (one-tailed, chosen because the charter is a maximum).`,
        R`Under \(H_0\), \(SE = \sqrt{0.03 \times 0.97/1{,}200} = 0.00492\).`,
        R`\(z = (0.04 - 0.03)/0.00492 = 2.03\); p-value \(= P(Z > 2.03) = 0.021\).`,
      ],
      answer: R`Reject \(H_0\): there is significant evidence that the dispute rate exceeds 3%. Note that the standard error uses the **hypothesised** proportion, because we compute the p-value assuming \(H_0\) is true.`,
    }],

    ['h', 'Comparing two groups'],
    ['p', R`**Paired data:** test whether the mean difference is zero with a one-sample t test on the differences. For the training data (mean difference 3.0 calls, standard error 0.558), \(t = 3.0/0.558 = 5.38\) with 9 degrees of freedom, p-value 0.0004: strong evidence that productivity rose.`],
    ['p', R`**Independent groups:** the Welch t statistic is the difference in means over its standard error. For domestic versus international student spending, \(t = 53/27.16 = 1.95\) with about 55 degrees of freedom, p-value 0.056. At the 5% level we do not reject equal means, matching the confidence interval from lecture 6 that just included zero.`],
    ['warn', R`A p-value of 0.056 is not "no effect" and 0.044 is not "a real effect". They are nearly identical strengths of evidence. Treating 0.05 as a cliff encourages people to massage analyses until they cross it. Report the effect size, the confidence interval and the p-value, and interpret them together.`],

    ['h', 'The chi-square test of independence'],
    ['p', R`For two categorical variables, we test whether they are independent by comparing the observed counts in a contingency table with the counts **expected** if they were independent: \(E = (\text{row total} \times \text{column total})/n\).`],
    ['math', R`\chi^2 = \sum \frac{(O - E)^2}{E}, \qquad df = (\text{rows} - 1)(\text{columns} - 1)`, 'The chi-square statistic is the sum of observed minus expected, squared, over expected. Degrees of freedom equal rows minus one times columns minus one.'],
    ['example', {
      title: 'Is default independent of credit score?',
      setup: R`Using the loan table from lecture 3: high score 14 defaults and 686 non-defaults; low score 36 and 264.`,
      steps: [
        R`Expected counts under independence: high & default \(700 \times 50/1{,}000 = 35\); high & no default 665; low & default 15; low & no default 285.`,
        R`\(\chi^2 = (14 - 35)^2/35 + (686 - 665)^2/665 + (36 - 15)^2/15 + (264 - 285)^2/285 = 12.6 + 0.663 + 29.4 + 1.547 = 44.2\).`,
        R`With 1 degree of freedom, the p-value is about \(3 \times 10^{-11}\).`,
      ],
      answer: R`Overwhelming evidence that default and credit score are related, confirming what the conditional probabilities suggested. The chi-square test needs expected counts of at least about 5 in each cell.`,
    }],

    ['h', 'Statistical versus practical significance'],
    ['p', R`With a huge sample, trivially small effects become statistically significant: a bank analysing 10 million transactions might find that a new app layout raises average transaction size by 3 cents, with \(p < 0.001\). That is statistically significant and commercially irrelevant. Conversely, a small pilot might find a large, valuable effect with \(p = 0.12\). Always ask **how big** the effect is and whether it matters for the decision, and read the confidence interval, which answers that question directly.`],

    ['h', 'Multiple testing, p-hacking and backtests'],
    ['p', R`If you test 20 strategies that are all worthless, each at the 5% level, the probability that at least one looks "significant" by chance is \(1 - 0.95^{20} = 64\%\). Researchers and analysts who try many variables, time periods, subgroups and model specifications, and then report only the one that works, are **p-hacking**, often without realising it. In finance this is called **data snooping** or **backtest overfitting**, and it is endemic: thousands of return "factors" have been published, and many fail to hold up out of sample. Campbell Harvey and co-authors argued that, given how many strategies have been tried, a new factor should clear a t-statistic of about 3, not 2.`],
    ['list', [
      R`**Pre-register** the hypothesis and the test before seeing the data, where possible.`,
      R`**Adjust for multiple tests**, for example with the Bonferroni correction (test each of \(m\) hypotheses at \(\alpha/m\)).`,
      R`**Hold out** data: develop a strategy on one period and test it once on untouched later data.`,
      R`**Replicate** in other markets and periods.`,
      R`**Report everything you tried**, not only what worked.`,
    ]],
    ['example', {
      title: 'Does the fund manager have skill?',
      setup: R`Over 60 months, a manager’s average monthly return in excess of the benchmark (alpha) is 0.40%, with a standard deviation of 2.0%.`,
      steps: [
        R`\(H_0\): true alpha = 0. \(SE = 2.0/\sqrt{60} = 0.258\).`,
        R`\(t = 0.40/0.258 = 1.55\); two-tailed p-value \(= 0.127\).`,
      ],
      answer: R`Five years of a sizeable 4.8% a year outperformance is still not statistically distinguishable from luck, and, given the thousands of managers competing, some will produce records like this by chance alone. This is why investors look for long records, a plausible explanation of the edge and consistency across periods, and why low-cost index funds are a sensible default.`,
    }],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel computes p-values with T.DIST, NORM.S.DIST and CHISQ.TEST, and runs t tests with T.TEST or the Data Analysis tool pack.', src: R`Two-tailed p for t = 1.66, df 39    =T.DIST.2T(1.66,39)             → 0.105
One-tailed p for z = 2.03           =1-NORM.S.DIST(2.03,TRUE)       → 0.021
Paired t test on two ranges         =T.TEST(before,after,2,1)       → 0.0004
Welch t test                        =T.TEST(group1,group2,2,3)      → 0.056
Chi-square test of independence     =CHISQ.TEST(observed,expected)  → 3E-11
Data > Data Analysis > t-Test: Paired Two Sample for Means` }],
    ['code', { lang: 'python', say: 'The Python code runs the same tests with scipy stats.', src: R`import numpy as np
from scipy import stats

before = np.array([42,38,51,45,40,47,36,44,49,41])
after  = np.array([46,41,52,50,43,47,40,49,50,45])
print(stats.ttest_rel(after, before))                  # t = 5.38, p = 0.0004

table = np.array([[14, 686], [36, 264]])
chi2, p, dof, expected = stats.chi2_contingency(table, correction=False)
print(chi2, p)                                         # 44.2, 3e-11

# one-sample t from summary statistics
t = (248 - 220) / (106.78 / np.sqrt(40))
print(t, 2 * stats.t.sf(abs(t), df=39))               # 1.66, 0.105` }],

    ['case', {
      title: 'The "proven" trading strategy',
      text: R`A startup pitches a trading app. Its founders tested 150 combinations of technical indicators on ASX 200 data from 2015 to 2024 and found one rule with an average monthly excess return of 1.1% (t = 2.6, p = 0.01). They plan to market it as "statistically proven, 99% confidence". They did not test it on any other market or period.`,
      questions: [
        'Explain why p = 0.01 is misleading here. How many of 150 worthless rules would you expect to reach p ≤ 0.01 by chance?',
        'Apply a Bonferroni correction. What p-value would the rule need to be convincing?',
        'Design a fair out-of-sample test of the rule.',
        'What would ASIC’s rules on misleading claims imply for the marketing?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`State \(H_0\) and \(H_1\) first; the p-value is the probability of data this extreme if \(H_0\) were true.`,
      R`Reject \(H_0\) when \(p \le \alpha\); failing to reject is not proof of \(H_0\).`,
      R`Type I error = false positive (α); Type II = false negative (β); power = 1 − β, raised by larger samples and effects.`,
      R`Tests: one-sample t, z for proportions, Welch and paired t, chi-square for independence; a two-sided test at α matches a (1 − α) interval.`,
      R`Distinguish statistical from practical significance; beware multiple testing, p-hacking and backtest overfitting.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A sample of 36 has mean 5.4 and standard deviation 1.2. Test \(H_0: \mu = 5\). What is the t statistic?`, answer: 2, tol: 0.01, solution: R`\(SE = 1.2/6 = 0.2\); \(t = (5.4 - 5)/0.2 = 2.00\). With 35 df, the two-tailed p-value is 0.053: just above 5%.` },
    { type: 'num', level: 'Core', q: R`In a sample of 400 customers, 55% prefer a new design. Test \(H_0: p = 0.5\) (two-tailed). What is the p-value? (Four decimals.)`, answer: 0.0455, tol: 0.0005, solution: R`\(SE = \sqrt{0.25/400} = 0.025\); \(z = 0.05/0.025 = 2.00\); two-tailed \(p = 2 \times 0.02275 = 0.0455\).` },
    { type: 'num', level: 'Core', q: R`What is the two-tailed 5% critical value of t with 24 degrees of freedom? (Three decimals.)`, answer: 2.064, tol: 0.002, solution: R`\(t_{0.025,24} = 2.064\) (Excel: =T.INV.2T(0.05,24)).` },
    { type: 'num', level: 'Stretch', q: R`You run 10 independent tests at α = 0.01, and all nulls are true. What is the probability of at least one false positive? (Four decimals.)`, answer: 0.0956, tol: 0.0005, solution: R`\(1 - 0.99^{10} = 0.0956\).` },
    { type: 'num', level: 'Core', q: R`A strategy’s average monthly excess return over 48 months is 0.3% with a standard deviation of 1.5%. What is the t statistic for zero mean? (Two decimals.)`, answer: 1.39, tol: 0.01, solution: R`\(SE = 1.5/\sqrt{48} = 0.2165\); \(t = 0.3/0.2165 = 1.39\); p ≈ 0.17. Not significant.` },
    { type: 'num', level: 'Core', q: R`A contingency table cell has row total 120, column total 250 and grand total 600. What is the expected count under independence?`, answer: 50, tol: 0.01, solution: R`\(E = 120 \times 250/600 = 50\).` },
    { type: 'mcq', level: 'Core', q: 'What does a p-value of 0.03 mean?', options: ['There is a 3% chance that H₀ is true', 'If H₀ were true, results at least this extreme would occur about 3% of the time', 'The effect is large', 'There is a 97% chance the alternative is true'], answer: 1, solution: R`The p-value is computed **assuming H₀ is true**; it is not the probability that H₀ is true, and it says nothing directly about effect size.` },
    { type: 'mcq', level: 'Core', q: 'Increasing the sample size, holding α fixed, will…', options: ['Increase the Type I error rate', 'Increase power and reduce the Type II error rate', 'Always make results practically significant', 'Have no effect on power'], answer: 1, solution: R`Larger samples shrink the standard error, making real effects easier to detect: **higher power, lower β**. α stays at the chosen level.` },
    { type: 'mcq', level: 'Stretch', q: 'A 95% confidence interval for a mean difference is 0.4 to 2.8. What is the result of a two-tailed test of zero difference at α = 0.05?', options: ['Fail to reject, because 0.4 is small', 'Reject H₀, because the interval excludes zero', 'Cannot be determined', 'Reject only at α = 0.01'], answer: 1, solution: R`A two-sided test at 5% rejects exactly when the 95% interval excludes the null value. Zero is outside, so **reject**.` },
    { type: 'long', level: 'Stretch', q: 'A company tests whether a price cut increases sales. With 10 million customer records it finds sales per customer rose by 0.2% (p < 0.0001). A manager says the price cut was "a great success". Evaluate this claim.', answer: R`The tiny p-value only says that, if the price cut had no effect at all, an increase this large would be extremely unlikely with so much data. With 10 million observations, the standard error is minute, so even a negligible effect becomes statistically significant. Statistical significance is not the same as practical or economic significance.

The key question is whether a 0.2% rise in sales per customer justifies the price cut. If the price fell by, say, 5%, revenue per customer fell by roughly 4.8% (0.95 × 1.002 ≈ 0.952), and unless costs fell or the extra customers were very profitable, profit almost certainly declined. The manager should look at the effect size and its confidence interval, translate it into revenue and profit, and compare it with the cost of the price cut.

There are also design questions: was the price cut randomised or compared with a control group, or could seasonality, competitor actions or promotions explain the change? Was the effect measured over a long enough period to capture customers stocking up and then buying less later? A proper evaluation would report the estimated effect on profit with a confidence interval from a well-designed experiment.`, solution: 'Look for statistical versus practical significance, a numerical effect-on-revenue argument, and design/causality concerns.' },
  ],
  glossary: [
    ['Null hypothesis', 'The default claim of no effect or no difference, tested against the data.'],
    ['p-value', 'The probability, assuming H₀ is true, of a result at least as extreme as the one observed.'],
    ['Significance level (α)', 'The Type I error rate the analyst accepts; the threshold for rejecting H₀.'],
    ['Type I error', 'Rejecting a true null hypothesis: a false positive.'],
    ['Type II error', 'Failing to reject a false null hypothesis: a false negative.'],
    ['Power', 'The probability of rejecting H₀ when a specified alternative is true.'],
    ['Chi-square test', 'A test of independence for categorical variables comparing observed and expected counts.'],
    ['p-hacking', 'Trying many analyses and reporting only those that reach significance.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'SEEING', 'MIT18650', 'STATSMODELS', 'NBER', 'book:WOOL'],
};
