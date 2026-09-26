const R = String.raw;
const mkt = [2.1, -3.4, 1.5, 4.2, -1.8, 0.6, -2.5, 3.1];
const stk = [3.4, -2.6, -0.9, 5.0, 0.8, 2.6, -4.1, 1.4];
export default {
  id: '26134-02', subject: '26134', title: 'Descriptive statistics: centre, spread, shape and relationships', mins: 70, level: 'Foundation',
  summary: 'Summarising data with numbers: mean, median, mode and weighted means; range, IQR, variance, standard deviation and the coefficient of variation; percentiles, the five-number summary and box plots; skewness, kurtosis and fat tails; z-scores, the empirical rule and Chebyshev; and covariance and correlation, with finance data throughout.',
  objectives: [
    'Calculate and choose between the mean, median, mode, trimmed mean and weighted mean',
    'Calculate range, interquartile range, variance, standard deviation and the coefficient of variation',
    'Build a five-number summary and box plot and identify outliers with the 1.5 × IQR rule',
    'Describe skewness and kurtosis and explain why financial returns have fat tails',
    'Use z-scores, the empirical rule and Chebyshev’s theorem',
    'Calculate and interpret covariance and correlation, and explain why correlation is not causation',
  ],
  body: [
    ['h', 'From pictures to numbers'],
    ['p', R`Charts show a distribution; numerical summaries let us compare distributions precisely, feed them into models, and communicate them in one line of a report. We need numbers for three features: **where** the data are centred, **how spread out** they are, and their **shape**, plus measures of how two variables move **together**. We will use the student spending data from lecture 1 (40 values, mean $248, median $214) and, for relationships, eight months of returns on a bank share and the market.`],

    ['h', 'Measures of centre'],
    ['defs', [
      ['Mean', R`The sum divided by the count: \(\bar x = \frac{1}{n}\sum x_i\) for a sample, \(\mu\) for a population.`],
      ['Median', 'The middle value when data are sorted (the average of the two middle values when n is even).'],
      ['Mode', 'The most frequent value; the only measure of centre for nominal data.'],
      ['Trimmed mean', 'The mean after removing a fixed percentage of the smallest and largest values.'],
    ]],
    ['p', R`For the spending data, the mean is \(9{,}920/40 = \$248\) and the median is the average of the 20th and 21st values, \((212 + 216)/2 = \$214\). The 10% trimmed mean (dropping the four smallest and four largest values) is \$231.53. Which is "right"? It depends on the question. The **mean** uses every value and is what matters for totals: 40 students spend \(40 \times 248 = \$9{,}920\) a week in total, which is what a campus retailer cares about. The **median** describes the typical student and is **resistant** to extreme values: if the top spender had spent $5,900 instead of $590, the mean would jump to about $381 but the median would not move. That is why the ABS and RBA report median house prices and median incomes.`],
    ['key', R`The mean is sensitive to outliers and skewness; the median is robust. For right-skewed data (incomes, house prices, losses, company sizes), mean > median, and reporting only the mean can mislead.`],
    ['h3', 'Weighted means'],
    ['p', R`When observations matter unequally, weight them: \(\bar x_w = \sum w_i x_i / \sum w_i\). A portfolio with 50% in an asset returning 8%, 30% returning 4% and 20% returning 12% returned \(0.5(8) + 0.3(4) + 0.2(12) = 7.6\%\). Your weighted average mark (WAM) weights each subject by its credit points. The mean of grouped data is a weighted mean of class midpoints: using the frequency table from lecture 1 gives \$247.50, very close to the true \$248.`],
    ['warn', R`Averaging percentages or ratios without weights is a classic error. If one branch converts 50% of 10 visitors and another 10% of 1,000 visitors, the overall conversion rate is \(105/1{,}010 \approx 10.4\%\), not the simple average of 30%.`],

    ['h', 'Measures of spread'],
    ['p', R`Two investments can have the same average return and very different risk. Spread measures capture that difference.`],
    ['list', [
      R`**Range** = maximum − minimum = \(590 - 118 = \$472\). Simple, but it depends only on two, possibly extreme, values.`,
      R`**Interquartile range (IQR)** = \(Q_3 - Q_1\), the spread of the middle 50%. Robust to outliers.`,
      R`**Variance** and **standard deviation**: the typical squared, and then typical, distance from the mean.`,
    ]],
    ['math', R`s^2 = \frac{\sum_{i=1}^{n}(x_i - \bar x)^2}{n-1} \qquad s = \sqrt{s^2} \qquad \sigma^2 = \frac{\sum_{i=1}^{N}(x_i - \mu)^2}{N}`, 'The sample variance is the sum of squared deviations from the sample mean divided by n minus one; the sample standard deviation is its square root. The population variance divides by N.'],
    ['p', R`Why divide by \(n-1\)? The deviations from the **sample** mean are, on average, slightly smaller than deviations from the true population mean, because the sample mean is fitted to the data. Dividing by \(n-1\) rather than \(n\) corrects this downward bias. The quantity \(n-1\) is the **degrees of freedom**: once you know the mean and \(n-1\) of the deviations, the last one is determined because deviations sum to zero.`],
    ['p', R`For the spending data, \(s^2 = 11{,}400.9\) (dollars squared) and \(s = \$106.78\). Variance is in squared units, which is hard to interpret; the standard deviation is in the original units (dollars), which is why we usually report it.`],
    ['p', R`To compare variability across variables with different means or units, use the **coefficient of variation**, \(CV = s/\bar x\). For spending, \(CV = 106.78/248 = 0.43\): the standard deviation is 43% of the mean. In finance, the inverse idea appears as return per unit of risk (the Sharpe ratio).`],

    ['h', 'Percentiles, quartiles and box plots'],
    ['p', R`The \(p\)-th **percentile** is a value below which about \(p\%\) of the data fall. The quartiles are the 25th (\(Q_1\)), 50th (median) and 75th (\(Q_3\)) percentiles. There are several slightly different conventions for computing them; Excel’s QUARTILE.INC (and the default in Python’s numpy) gives \(Q_1 = 177\) and \(Q_3 = 287\) for our data, while QUARTILE.EXC gives 175 and 293. With large datasets the differences are negligible; with small ones, state which method you used.`],
    ['p', R`The **five-number summary** is: minimum 118, \(Q_1 = 177\), median 214, \(Q_3 = 287\), maximum 590. The IQR is \(287 - 177 = 110\). A common rule flags as **outliers** values more than \(1.5 \times IQR\) beyond the quartiles: the upper fence is \(287 + 165 = 452\), so 455, 510 and 590 are flagged; the lower fence (12) flags nothing.`],
    ['chart', {
      caption: 'Box plot of weekly spending: box = middle 50%, line = median, whiskers to the most extreme non-outliers, dots = outliers',
      x: [100, 600], y: [0, 2], xl: 'Weekly spending ($)', yl: '', h: 200, yticks: [],
      series: [{ label: 'Median $214', color: '#e9b85c', width: 3, pts: [[214, 0.55], [214, 1.45]] }, { label: 'Whiskers (118 to 420)', color: '#9fb3b2', pts: [[118, 1], [177, 1]] }, { color: '#9fb3b2', pts: [[287, 1], [420, 1]] }, { color: '#9fb3b2', pts: [[118, 0.8], [118, 1.2]] }, { color: '#9fb3b2', pts: [[420, 0.8], [420, 1.2]] }],
      areas: [{ top: [[177, 1.45], [287, 1.45]], bottom: [[177, 0.55], [287, 0.55]], color: '#5fe3e0', opacity: 0.35 }],
      marks: [{ x: 455, y: 1, color: '#ff7ab6', r: 5 }, { x: 510, y: 1, color: '#ff7ab6', r: 5 }, { x: 590, y: 1, color: '#ff7ab6', r: 5, label: 'outliers' }],
    }],
    ['p', R`Box plots are excellent for comparing groups side by side, for example spending by year level or returns by sector. Before deleting any outlier, investigate it: it may be a data-entry error, or it may be the most important observation in the dataset (a fraud, a crash, a whale customer).`],

    ['h', 'Shape: skewness and kurtosis'],
    ['p', R`**Skewness** measures asymmetry. It is positive for a long right tail (our spending data have a sample skewness of about 1.48) and negative for a long left tail. **Kurtosis** measures how heavy the tails are compared with a normal distribution; software usually reports **excess kurtosis**, which is 0 for a normal distribution. Our spending data have excess kurtosis of about 2.05: more extreme values than a normal distribution would produce.`],
    ['p', R`This matters enormously in finance. Daily share-market returns are roughly symmetric but strongly **leptokurtic** (fat-tailed): days like 19 October 1987, when the US market fell more than 20%, or the March 2020 crash, would be essentially impossible under a normal distribution but happen every few decades in reality. Risk models that assume normality underestimate the probability of disasters, a theme you will meet in Value at Risk and in Time Series Econometrics. Many equity return series are also **negatively skewed**: crashes are sharper than rallies.`],

    ['h', 'Standardising: z-scores, the empirical rule and Chebyshev'],
    ['math', R`z = \frac{x - \bar x}{s}`, 'The z-score equals the value minus the mean, divided by the standard deviation.'],
    ['p', R`A **z-score** says how many standard deviations a value lies from the mean, making values from different distributions comparable. The top spender’s z-score is \((590 - 248)/106.78 = 3.20\); the lowest is \((118 - 248)/106.78 = -1.22\). The asymmetry is another sign of right skew.`],
    ['list', [
      R`**Empirical rule** (for roughly bell-shaped data): about 68% of values lie within 1 standard deviation of the mean, 95% within 2 and 99.7% within 3.`,
      R`**Chebyshev’s theorem** (for **any** distribution): at least \(1 - 1/k^2\) of values lie within \(k\) standard deviations of the mean, so at least 75% within 2 and at least 88.9% within 3. It is weaker, but it never fails.`,
    ]],
    ['note', R`In quality control, "six sigma" refers to processes so consistent that defects lie six standard deviations away from the mean. In finance, analysts sometimes call a big market move a "five-sigma event", which under normality should happen once in several thousand years. When such events happen every decade, the lesson is that the normal model is wrong, not that we were unlucky.`],

    ['h', 'Relationships: covariance and correlation'],
    ['p', R`Now two variables. Here are eight months of returns (in %) for the market (the S&P/ASX 200) and a large bank share (illustrative data):`],
    ['table', {
      caption: 'Monthly returns (%) and deviations from the means (market mean 0.475, bank mean 0.700)',
      head: ['Month', 'Market x', 'Bank y', 'x − x̄', 'y − ȳ', '(x − x̄)(y − ȳ)'],
      rows: [
        ['1', '2.1', '3.4', '1.625', '2.700', '4.388'], ['2', '−3.4', '−2.6', '−3.875', '−3.300', '12.788'], ['3', '1.5', '−0.9', '1.025', '−1.600', '−1.640'], ['4', '4.2', '5.0', '3.725', '4.300', '16.018'],
        ['5', '−1.8', '0.8', '−2.275', '0.100', '−0.228'], ['6', '0.6', '2.6', '0.125', '1.900', '0.238'], ['7', '−2.5', '−4.1', '−2.975', '−4.800', '14.280'], ['8', '3.1', '1.4', '2.625', '0.700', '1.838'],
        ['Sum', '3.8', '5.6', '0', '0', '47.680'],
      ],
    }],
    ['math', R`s_{xy} = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{n-1} \qquad r = \frac{s_{xy}}{s_x s_y}`, 'The sample covariance is the sum of cross-products of deviations divided by n minus one. The correlation coefficient is the covariance divided by the product of the standard deviations.'],
    ['steps', [
      R`Covariance: \(s_{xy} = 47.68/7 = 6.811\) (in %²). Positive: the bank tends to be above its mean when the market is above its mean.`,
      R`Standard deviations: \(s_x = \sqrt{53.515/7} = 2.765\%\) and \(s_y = \sqrt{66.38/7} = 3.079\%\).`,
      R`Correlation: \(r = 6.811/(2.765 \times 3.079) = 0.80\).`,
    ]],
    ['chart', {
      caption: 'Bank share returns against market returns: a strong positive relationship (r = 0.80)',
      x: [-5, 5], y: [-5, 6], xl: 'Market return (%)', yl: 'Bank return (%)',
      series: [{ color: '#555a70', pts: [[-5, 0], [5, 0]] }, { color: '#555a70', pts: [[0, -5], [0, 6]] }],
      marks: mkt.map((m, i) => ({ x: m, y: stk[i], color: '#5fe3e0', r: 6 })),
    }],
    ['p', R`The correlation coefficient is unit-free and lies between −1 and +1. Values near ±1 indicate a strong **linear** relationship; values near 0 indicate little linear relationship (though there may be a curved one). As rough language: |r| above 0.7 is strong, 0.3 to 0.7 moderate, below 0.3 weak, but context matters. For finance, correlation is the key input to diversification (lecture 7 of Financial Literacy), and the ratio \(s_{xy}/s_x^2 = 6.811/7.645 = 0.89\) is exactly the bank’s **beta**, which we will estimate by regression in lecture 8.`],
    ['warn', R`**Correlation is not causation.** Ice-cream sales and drownings are correlated because both rise in summer (a confounding variable). Two trending time series, such as a country’s GDP and the number of mobile phones, are almost always correlated whether or not one affects the other. Correlations between financial variables also change over time, and often jump towards 1 in crises, exactly when diversification is needed most.`],
    ['p', R`When data are skewed or have outliers, the **Spearman rank correlation**, which correlates the ranks rather than the values, is more robust. For our return data it is 0.81, close to the Pearson value.`],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel has a function for every measure in this lecture, from AVERAGE and MEDIAN to STDEV.S, QUARTILE.INC, SKEW, KURT, STANDARDIZE, COVARIANCE.S and CORREL.', src: R`=AVERAGE(B2:B41)           → 248.00      =MEDIAN(B2:B41)        → 214.00
=TRIMMEAN(B2:B41,0.2)      → 231.53  (removes 10% from each end)
=STDEV.S(B2:B41)           → 106.78      =VAR.S(B2:B41)         → 11,400.92
=QUARTILE.INC(B2:B41,1)    → 177         =QUARTILE.INC(B2:B41,3) → 287
=SKEW(B2:B41)              → 1.48        =KURT(B2:B41)          → 2.05  (excess kurtosis)
=STANDARDIZE(590,248,106.78)                                    → 3.20
=COVARIANCE.S(X2:X9,Y2:Y9) → 6.811       =CORREL(X2:X9,Y2:Y9)   → 0.80
=SUMPRODUCT(weights,returns)/SUM(weights)   weighted mean` }],
    ['code', { lang: 'python', say: 'The Python code computes the same statistics with pandas and scipy.', src: R`import numpy as np, pandas as pd
from scipy import stats

mkt = np.array([2.1, -3.4, 1.5, 4.2, -1.8, 0.6, -2.5, 3.1])
bank = np.array([3.4, -2.6, -0.9, 5.0, 0.8, 2.6, -4.1, 1.4])
print(np.cov(mkt, bank, ddof=1)[0, 1])        # 6.811
print(np.corrcoef(mkt, bank)[0, 1])           # 0.800
print(stats.spearmanr(mkt, bank).statistic)   # rank correlation
print(np.cov(mkt, bank, ddof=1)[0, 1] / mkt.var(ddof=1))   # beta 0.891

spend = pd.Series([118,132,141,145,152,158,163,167,171,174,178,182,185,188,192,195,199,203,207,212,
                   216,221,226,232,238,245,252,261,270,284,296,310,327,345,368,392,420,455,510,590])
print(spend.describe())                        # count, mean, std, min, quartiles, max
print(spend.skew(), spend.kurt())             # 1.48, 2.05` }],

    ['case', {
      title: 'Which fund is riskier?',
      text: R`Two funds report five years of annual returns. Fund A: 9%, 11%, 8%, 12%, 10%. Fund B: 25%, −12%, 18%, 30%, −11%. Both funds’ marketing says "average return 10%".`,
      questions: [
        'Verify the arithmetic means. Calculate each fund’s sample standard deviation, range and coefficient of variation.',
        'Calculate the geometric mean for each fund. Why do they differ from the arithmetic means by different amounts?',
        'Which summary statistics would you put in a one-line description of each fund for an investor?',
        'Why is five years of data a weak basis for judging either fund?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Centre: mean (uses all values, sensitive to outliers), median (robust), mode (categorical), trimmed and weighted means.`,
      R`Spread: range, IQR (robust), variance and standard deviation (divide by n − 1 for samples), coefficient of variation.`,
      R`Five-number summary and box plots; flag outliers beyond 1.5 × IQR, then investigate them.`,
      R`Skewness measures asymmetry; excess kurtosis measures fat tails, which financial returns have.`,
      R`z-scores standardise; the empirical rule applies to bell shapes, Chebyshev to any distribution.`,
      R`Covariance and correlation measure linear co-movement; correlation is not causation; beta = covariance / market variance.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`For the data 12, 15, 9, 22, 18, 15, 30, 11, what is the mean?`, answer: 16.5, tol: 0.01, solution: R`Sum \(= 132\); \(132/8 = 16.5\). The median is \((15 + 15)/2 = 15\) and the mode is 15.` },
    { type: 'num', level: 'Core', q: R`For the same data, what is the sample standard deviation? (Two decimals.)`, answer: 6.82, tol: 0.01, solution: R`Deviations from 16.5: −4.5, −1.5, −7.5, 5.5, 1.5, −1.5, 13.5, −5.5. Squares sum to 326.0. \(s^2 = 326/7 = 46.57\); \(s = 6.82\).` },
    { type: 'num', level: 'Core', q: R`A portfolio has 60% in shares returning 9%, 30% in bonds returning 4% and 10% in cash returning 3%. What is its return, in percent?`, answer: 6.9, tol: 0.01, solution: R`\(0.6(9) + 0.3(4) + 0.1(3) = 5.4 + 1.2 + 0.3 = 6.9\%\).` },
    { type: 'num', level: 'Core', q: R`Exam marks have mean 64 and standard deviation 12. What is the z-score of a mark of 85?`, answer: 1.75, tol: 0.01, solution: R`\(z = (85 - 64)/12 = 1.75\).` },
    { type: 'num', level: 'Core', q: R`\(Q_1 = 40\) and \(Q_3 = 70\). Above what value would an observation be flagged as an outlier by the 1.5 × IQR rule?`, answer: 115, tol: 0.01, solution: R`\(IQR = 30\); upper fence \(= 70 + 1.5 \times 30 = 115\).` },
    { type: 'num', level: 'Core', q: R`Two variables have a covariance of 18, and standard deviations of 5 and 6. What is their correlation?`, answer: 0.6, tol: 0.001, solution: R`\(r = 18/(5 \times 6) = 0.60\).` },
    { type: 'num', level: 'Stretch', q: R`By Chebyshev’s theorem, at least what percentage of any dataset lies within 2.5 standard deviations of the mean?`, answer: 84, tol: 0.01, solution: R`\(1 - 1/2.5^2 = 1 - 0.16 = 84\%\).` },
    { type: 'mcq', level: 'Core', q: 'House prices in a suburb are strongly right-skewed. Which measure best describes a typical house?', options: ['The mean', 'The median', 'The range', 'The standard deviation'], answer: 1, solution: R`The **median** is robust to the few very expensive houses that pull the mean upwards.` },
    { type: 'mcq', level: 'Core', q: 'A study finds a correlation of 0.85 between the number of cafés in a suburb and median house prices. What can we conclude?', options: ['Opening cafés raises house prices', 'There is a strong positive linear association, but it may be driven by other factors such as income and location', 'Expensive houses cause cafés to open', 'The relationship is weak'], answer: 1, solution: R`Correlation shows association, not causation. Wealthier, well-located suburbs attract both cafés and high prices: **confounding**.` },
    { type: 'mcq', level: 'Stretch', q: 'Why do risk managers worry about excess kurtosis in daily returns?', options: ['It means average returns are negative', 'It means extreme moves occur more often than a normal distribution predicts', 'It means returns are always symmetric', 'It means volatility is zero'], answer: 1, solution: R`Fat tails mean large losses (and gains) happen far more often than a normal model implies, so normal-based risk measures understate crash risk.` },
    { type: 'long', level: 'Core', q: 'Explain why the sample variance divides by n − 1 rather than n, and why analysts usually report the standard deviation rather than the variance.', answer: R`The sample variance measures how far observations lie from the mean. But we do not know the true population mean μ; we use the sample mean x̄, which is calculated from the same data and is therefore, by construction, the value that makes the squared deviations as small as possible. Deviations from x̄ are consequently a little smaller, on average, than deviations from μ, so dividing their sum of squares by n would systematically underestimate the population variance. Dividing by n − 1 corrects this bias exactly: the sample variance with n − 1 has an expected value equal to the population variance. Another way to see it is through degrees of freedom: the n deviations from x̄ must sum to zero, so only n − 1 of them are free to vary.

The variance is in squared units (for example, dollars squared or percent squared), which have no intuitive meaning. The standard deviation, its square root, is in the same units as the data, so it can be compared directly with the mean and with individual observations (for example, "returns typically vary by about 3% a month around their average"). It also plugs directly into z-scores, the empirical rule and risk measures such as the Sharpe ratio. The variance remains important in calculations, for example portfolio variance, because variances of independent sums add.`, solution: 'Look for bias from using the sample mean, degrees of freedom, and the units argument for the standard deviation.' },
  ],
  glossary: [
    ['Median', 'The middle value of sorted data; robust to outliers.'],
    ['Standard deviation', 'The square root of the variance; a typical distance from the mean.'],
    ['Interquartile range', 'Q3 minus Q1: the spread of the middle half of the data.'],
    ['Coefficient of variation', 'Standard deviation divided by the mean.'],
    ['Excess kurtosis', 'Tail heaviness relative to a normal distribution (zero for a normal).'],
    ['z-score', 'The number of standard deviations a value lies from the mean.'],
    ['Correlation coefficient', 'Covariance divided by the product of standard deviations; between −1 and 1.'],
    ['Confounding variable', 'A third variable that drives both variables in an observed association.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'SEEING', 'MIT18650', 'PANDAS', 'book:WOOL'],
};
