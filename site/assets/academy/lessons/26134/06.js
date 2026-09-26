const R = String.raw;
export default {
  id: '26134-06', subject: '26134', title: 'Confidence intervals', mins: 70, level: 'Intermediate',
  summary: 'Estimating with honest uncertainty: point versus interval estimates, what "95% confidence" really means, intervals for a mean (z and t), a proportion, a difference between two means and paired data, choosing a sample size, a bootstrap interval for a median, and what intervals reveal about expected returns.',
  objectives: [
    'Explain the correct interpretation of a confidence interval and common misinterpretations',
    'Construct confidence intervals for a mean with σ known and unknown',
    'Construct a confidence interval for a proportion',
    'Construct intervals for the difference between two independent means and for paired differences',
    'Determine the sample size needed for a target margin of error',
    'Describe the bootstrap and interpret intervals in a business or finance context',
  ],
  body: [
    ['h', 'From a single number to a range'],
    ['p', R`A **point estimate** is a single best guess: the sample mean spending is $248. But lecture 5 showed that a different sample would give a different number. Reporting $248 alone hides how uncertain it is. A **confidence interval** reports a range of plausible values for the parameter, together with a confidence level that describes how reliable the method is. It is the most useful single tool for communicating evidence responsibly.`],
    ['math', R`\text{Estimate} \pm \text{(critical value)} \times \text{(standard error)}`, 'A confidence interval equals the estimate plus or minus a critical value times the standard error.'],
    ['p', R`The product of the critical value and the standard error is the **margin of error**. Every interval in this lecture has this structure; only the estimate, the standard error and the critical value change.`],

    ['h', 'What "95% confidence" means'],
    ['p', R`If we repeated the sampling many times and built an interval each time with the same method, about 95% of those intervals would contain the true parameter. Our particular interval either contains it or does not; we just do not know which. The 95% describes the **procedure**, not the probability that the parameter lies in this specific interval (in the classical framework the parameter is fixed, not random).`],
    ['warn', R`Common misinterpretations: "95% of the data lie in the interval" (no: the interval is for the mean, not individual values); "there is a 95% chance the true mean is in this interval" (not in classical statistics, though a Bayesian credible interval has that meaning); "a 99% interval is better" (it is wider: more confidence costs precision).`],

    ['h', 'Interval for a mean'],
    ['h3', 'σ known (rare in practice)'],
    ['math', R`\bar x \pm z_{\alpha/2}\,\frac{\sigma}{\sqrt{n}}`, 'The sample mean plus or minus z alpha over two times sigma over root n.'],
    ['p', R`For 90%, 95% and 99% confidence, \(z_{\alpha/2}\) is 1.645, 1.960 and 2.576. Example: a machine fills bags with a known standard deviation of 8 g; a sample of 64 bags has mean 52 g. The 95% interval is \(52 \pm 1.96 \times 8/8 = 52 \pm 1.96\), that is 50.04 to 53.96 g.`],
    ['h3', 'σ unknown: the t interval'],
    ['math', R`\bar x \pm t_{\alpha/2,\,n-1}\,\frac{s}{\sqrt{n}}`, 'The sample mean plus or minus the t critical value with n minus one degrees of freedom, times s over root n.'],
    ['example', {
      title: 'Average weekly student spending',
      setup: R`A random sample of 40 students has mean $248 and standard deviation $106.78.`,
      steps: [
        R`Standard error: \(106.78/\sqrt{40} = 16.88\).`,
        R`Critical value: \(t_{0.025,\,39} = 2.023\) (Excel: =T.INV.2T(0.05,39)).`,
        R`Margin of error: \(2.023 \times 16.88 = 34.15\).`,
        R`95% interval: \(248 \pm 34.15\), that is **$213.85 to $282.15**.`,
        R`99% interval (critical value 2.708): $202.28 to $293.72, wider.`,
      ],
      answer: R`We are 95% confident that the average weekly spending of all students is between about $214 and $282. For a campus business planning revenue, that range, not the point estimate, is what should drive a scenario analysis.`,
    }],
    ['p', R`The t interval assumes a random sample and either a roughly normal population or a large enough sample for the CLT (\(n \ge 30\) is usually adequate unless the data are very skewed). With small samples from skewed populations, or with outliers, check the data carefully or use a bootstrap interval (below).`],

    ['h', 'Interval for a proportion'],
    ['math', R`\hat p \pm z_{\alpha/2}\sqrt{\frac{\hat p(1 - \hat p)}{n}}`, 'The sample proportion plus or minus z alpha over two times the square root of p hat times one minus p hat over n.'],
    ['example', {
      title: 'How many customers use buy now, pay later?',
      setup: R`In a random sample of 500 customers, 205 used BNPL in the past month.`,
      steps: [
        R`\(\hat p = 205/500 = 0.41\).`,
        R`\(SE = \sqrt{0.41 \times 0.59/500} = 0.0220\).`,
        R`95% interval: \(0.41 \pm 1.96 \times 0.0220 = 0.41 \pm 0.043\), that is **36.7% to 45.3%**.`,
      ],
      answer: R`Between roughly 37% and 45% of all customers use BNPL. The normal approximation is fine here because \(n\hat p = 205\) and \(n(1-\hat p) = 295\) are both well above 10. For small samples or proportions near 0 or 1, better methods (such as the Wilson interval) are preferred.`,
    }],

    ['h', 'Comparing two groups'],
    ['h3', 'Two independent means'],
    ['p', R`To compare two groups, estimate the difference in means. With independent random samples and unequal variances (the safe default), the standard error of the difference and the **Welch** interval are:`],
    ['math', R`(\bar x_1 - \bar x_2) \pm t_{\alpha/2,\,df}\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}`, 'The difference in sample means plus or minus a t critical value times the square root of s one squared over n one plus s two squared over n two.'],
    ['example', {
      title: 'Do international students spend more?',
      setup: R`Domestic students: \(n_1 = 35\), mean $232, s = $95. International students: \(n_2 = 30\), mean $285, s = $120.`,
      steps: [
        R`Difference: \(285 - 232 = \$53\).`,
        R`\(SE = \sqrt{95^2/35 + 120^2/30} = \sqrt{257.86 + 480.00} = 27.16\).`,
        R`Welch degrees of freedom \(\approx 55\); \(t_{0.025,55} = 2.004\).`,
        R`95% interval: \(53 \pm 2.004 \times 27.16 = 53 \pm 54.4\), that is **−$1.44 to $107.44**.`,
      ],
      answer: R`The interval includes zero, so these samples do not provide convincing evidence of a difference in average spending, even though the point estimate ($53) looks large. The right conclusion is "the difference could plausibly be anything from about zero to about $107", and a larger study would be needed to pin it down. This is precisely the kind of nuance a point estimate hides.`,
    }],
    ['h3', 'Paired data'],
    ['p', R`When the same units are measured twice (before and after a training program, the same shares under two conditions), work with the **differences** and apply the one-sample t interval to them. Pairing removes the variation between units, often making the estimate far more precise.`],
    ['example', {
      title: 'Did training raise productivity?',
      setup: R`Ten call-centre staff handled these numbers of calls per shift before and after training. Before: 42, 38, 51, 45, 40, 47, 36, 44, 49, 41. After: 46, 41, 52, 50, 43, 47, 40, 49, 50, 45.`,
      steps: [
        R`Differences (after − before): 4, 3, 1, 5, 3, 0, 4, 5, 1, 4. Mean \(\bar d = 3.0\); \(s_d = 1.764\).`,
        R`\(SE = 1.764/\sqrt{10} = 0.558\); \(t_{0.025,9} = 2.262\).`,
        R`95% interval: \(3.0 \pm 2.262 \times 0.558 = 3.0 \pm 1.26\), that is **1.74 to 4.26 extra calls per shift**.`,
      ],
      answer: R`The interval lies entirely above zero, suggesting a real improvement of roughly 2 to 4 calls a shift. But without a control group, the improvement could partly reflect other changes over the same period (a new system, seasonal demand). Lecture 9 returns to this problem of causal inference.`,
    }],

    ['h', 'How big a sample do I need?'],
    ['p', R`Solve the margin-of-error formula for \(n\), using a planning estimate of the variability, and **round up**:`],
    ['math', R`n = \left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2 \qquad n = \frac{z_{\alpha/2}^2\,p(1-p)}{E^2}`, 'For a mean, n equals z times sigma over the margin of error E, squared. For a proportion, n equals z squared times p times one minus p, over E squared.'],
    ['list', [
      R`To estimate mean spending within ±$10 at 95% confidence with \(\sigma \approx 107\): \(n = (1.96 \times 107/10)^2 = 439.8\), so **440** students.`,
      R`To estimate a proportion within ±2 percentage points at 95%, using the conservative \(p = 0.5\): \(n = 1.96^2 \times 0.25/0.02^2 = 2{,}401\).`,
    ]],
    ['note', R`Halving the margin of error requires four times the sample. That is why precise surveys are expensive, and why a vendor promising "±1% accuracy from 500 responses" is either wrong or not using a random sample.`],

    ['h', 'The bootstrap: intervals without formulas'],
    ['p', R`What if we want an interval for a median, a ratio or a Sharpe ratio, where no simple formula exists? The **bootstrap**, introduced by Bradley Efron in 1979, treats the sample as a stand-in for the population: resample \(n\) values **with replacement** thousands of times, compute the statistic each time, and take the 2.5th and 97.5th percentiles of the results. For the median student spending, 20,000 bootstrap resamples give a 95% interval of about **$190 to $248.50**. The bootstrap relies on the sample being representative and on having a reasonable sample size, but it is a powerful, general tool that you will use in quantitative finance.`],

    ['h', 'Finance application: an interval for the expected return'],
    ['p', R`A fund’s 120 monthly returns average 0.75% with a standard deviation of 4.5%. The 95% interval for the true expected monthly return is \(0.75 \pm 1.980 \times 4.5/\sqrt{120} = 0.75 \pm 0.81\), from −0.06% to 1.56% a month, or roughly **−0.8% to +18.8% a year**. Ten years of data cannot even establish that the expected return is positive. When a fund manager’s track record is presented as proof of skill, this interval is the question to ask about.`],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel gives the margin of error directly with CONFIDENCE.T and CONFIDENCE.NORM, and critical values with T.INV.2T and NORM.S.INV.', src: R`t critical value            =T.INV.2T(0.05,39)                 → 2.023
Margin of error (t)          =CONFIDENCE.T(0.05,106.78,40)      → 34.15
Margin of error (z)          =CONFIDENCE.NORM(0.05,8,64)        → 1.96
Proportion interval          =0.41 - 1.96*SQRT(0.41*0.59/500)   → 0.367
Sample size (mean)           =ROUNDUP((1.96*107/10)^2,0)        → 440
Data > Data Analysis > Descriptive Statistics  (tick "Confidence Level for Mean")` }],
    ['code', { lang: 'python', say: 'The Python code computes t intervals, a Welch interval and a bootstrap interval for the median.', src: R`import numpy as np
from scipy import stats

x = np.array([...])                                   # 40 spending values
print(stats.t.interval(0.95, df=len(x)-1, loc=x.mean(), scale=stats.sem(x)))

d = np.array([4, 3, 1, 5, 3, 0, 4, 5, 1, 4])          # paired differences
print(stats.t.interval(0.95, df=9, loc=d.mean(), scale=stats.sem(d)))   # (1.74, 4.26)

rng = np.random.default_rng(7)
medians = np.median(rng.choice(x, size=(20_000, len(x)), replace=True), axis=1)
print(np.percentile(medians, [2.5, 97.5]))            # bootstrap interval for the median` }],

    ['case', {
      title: 'The pricing survey',
      text: R`A subscription app plans to raise its monthly price. It surveys a random sample of 350 current subscribers: 238 say they would stay at the new price. Management also wants to estimate average monthly usage, which in a pilot of 25 users had a standard deviation of 11 hours.`,
      questions: [
        'Construct a 95% confidence interval for the proportion of subscribers who would stay.',
        'If the app has 120,000 subscribers, translate the interval into a range for the number who would stay, and into a revenue range at a price of $14.99.',
        'How many users should be sampled to estimate average monthly usage within ±1 hour at 95% confidence?',
        'Why might stated intentions in a survey differ from actual behaviour, and how could the company test the price more reliably?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Interval = estimate ± critical value × standard error. 95% describes the long-run success rate of the method.`,
      R`Mean: \(\bar x \pm t_{n-1}\,s/\sqrt{n}\) (use z only when σ is known). Proportion: \(\hat p \pm z\sqrt{\hat p(1-\hat p)/n}\).`,
      R`Two independent groups: Welch interval; paired data: interval on the differences.`,
      R`Sample size: \(n = (z\sigma/E)^2\) or \(z^2p(1-p)/E^2\), rounded up; halving the margin needs four times the data.`,
      R`The bootstrap builds intervals for any statistic by resampling.`,
      R`An interval that includes zero means the data cannot rule out no effect; expected-return intervals are strikingly wide.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A sample of 64 has mean 52 and the population standard deviation is known to be 8. What is the upper limit of the 95% confidence interval? (Two decimals.)`, answer: 53.96, tol: 0.01, solution: R`\(52 + 1.96 \times 8/\sqrt{64} = 52 + 1.96 = 53.96\).` },
    { type: 'num', level: 'Core', q: R`A sample of 16 has mean 18.4 and standard deviation 3.2. What is the lower limit of the 95% t interval? (Two decimals.)`, answer: 16.69, tol: 0.01, solution: R`\(SE = 3.2/4 = 0.8\); \(t_{0.025,15} = 2.131\). Lower limit \(= 18.4 - 2.131 \times 0.8 = 16.69\).` },
    { type: 'num', level: 'Core', q: R`In a sample of 800 people, 62% support a policy. What is the upper limit of the 90% confidence interval, in percent? (Two decimals.)`, answer: 64.82, tol: 0.02, solution: R`\(SE = \sqrt{0.62 \times 0.38/800} = 0.01716\). Upper \(= 0.62 + 1.645 \times 0.01716 = 0.6482\), or 64.82%.` },
    { type: 'num', level: 'Core', q: R`What sample size is needed to estimate a proportion within ±3 percentage points with 99% confidence, using p = 0.5?`, answer: 1844, tol: 0.5, solution: R`\(n = 2.576^2 \times 0.25/0.03^2 = 1{,}843.3\), rounded up to **1,844**.` },
    { type: 'num', level: 'Core', q: R`To estimate a mean within ±4 at 95% confidence when σ ≈ 25, what sample size is needed?`, answer: 151, tol: 0.5, solution: R`\(n = (1.96 \times 25/4)^2 = 150.06\), rounded up to **151**.` },
    { type: 'num', level: 'Stretch', q: R`For the paired training data (mean difference 3.0, \(s_d = 1.764\), n = 10), what is the upper limit of the 95% interval? (Two decimals.)`, answer: 4.26, tol: 0.01, solution: R`\(3.0 + 2.262 \times 1.764/\sqrt{10} = 3.0 + 1.26 = 4.26\).` },
    { type: 'mcq', level: 'Core', q: 'Which statement correctly interprets a 95% confidence interval of $214 to $282 for mean spending?', options: ['95% of students spend between $214 and $282', 'If we repeated the study many times, about 95% of such intervals would contain the true mean', 'There is a 95% chance the sample mean is in the interval', 'The true mean is certainly $248'], answer: 1, solution: R`The confidence level describes the **long-run success rate of the procedure**. The interval concerns the mean, not individual students, and the sample mean is always at the centre.` },
    { type: 'mcq', level: 'Core', q: 'Other things equal, which change makes a confidence interval narrower?', options: ['Raising the confidence level from 95% to 99%', 'Increasing the sample size', 'A more variable population', 'Using the t distribution instead of z with a small sample'], answer: 1, solution: R`A larger sample reduces the standard error. Higher confidence, more variability or t with few degrees of freedom all widen the interval.` },
    { type: 'mcq', level: 'Stretch', q: 'A 95% interval for the difference in average sales between two store layouts is −$1,200 to $4,800 per week. What is the best conclusion?', options: ['Layout B is clearly better', 'The data are consistent with no difference; the effect could be negative or positive', 'The layouts are identical', 'The study proves layout A is better'], answer: 1, solution: R`The interval contains zero, so the data cannot rule out **no difference**. The evidence is inconclusive, not proof of equality.` },
    { type: 'long', level: 'Core', q: 'Explain why a paired design can give a much more precise estimate of a treatment effect than comparing two independent groups, using the training example.', answer: R`In the training example, individual staff differ a lot in their baseline productivity (from 36 to 51 calls per shift before training). If we compared a trained group with a different untrained group, those large differences between people would add noise to the comparison, inflating the standard error of the difference in means: the standard deviation of calls per shift is about 4.8 before training and 4.1 after.

Pairing measures the same people before and after, so each person acts as their own control. The analysis uses the differences, which remove the stable person-to-person variation. The differences have a standard deviation of only 1.76, much smaller than the variation between people, so the standard error of the mean difference is only 0.56 and the 95% interval (1.74 to 4.26) is tight and excludes zero. An independent-groups comparison with the same numbers of observations would have a far wider interval and might not detect the effect at all.

The trade-off is that a before–after design without a control group cannot separate the training effect from anything else that changed over time, such as new software or seasonal demand. The strongest design pairs within randomised treatment and control groups.`, solution: 'Look for between-subject variation removed by differencing, a numeric comparison of spreads, and the time-confounding caveat.' },
  ],
  glossary: [
    ['Point estimate', 'A single value used to estimate a parameter.'],
    ['Confidence interval', 'A range built by a method that captures the parameter in a stated proportion of repeated samples.'],
    ['Margin of error', 'The critical value times the standard error; half the width of the interval.'],
    ['Welch interval', 'An interval for the difference of two means that does not assume equal variances.'],
    ['Paired design', 'Measuring the same units under two conditions and analysing the differences.'],
    ['Bootstrap', 'Resampling the data with replacement to approximate a sampling distribution.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'SEEING', 'MIT18650', 'STATSMODELS', 'book:WOOL'],
};
