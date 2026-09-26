const R = String.raw;
const n5 = [[150, 38], [160, 125], [170, 268], [180, 447], [190, 649], [200, 707], [210, 847], [220, 829], [230, 858], [240, 799], [250, 753], [260, 727], [270, 605], [280, 519], [290, 435], [300, 343], [310, 267], [320, 208], [330, 166], [340, 120], [350, 94]];
const n30 = [[180, 2], [190, 27], [200, 125], [210, 498], [220, 1144], [230, 1764], [240, 1999], [250, 1809], [260, 1339], [270, 735], [280, 353], [290, 128], [300, 56], [310, 16], [320, 5]];
const bars = (arr, color, op) => arr.map(([a, c]) => ({ top: [[a + 1, c / 10000], [a + 9, c / 10000]], bottom: [[a + 1, 0], [a + 9, 0]], color, opacity: op }));
export default {
  id: '26134-05', subject: '26134', title: 'Sampling distributions and the Central Limit Theorem', mins: 70, level: 'Intermediate',
  summary: 'The bridge from data to inference: why sample statistics vary, the sampling distribution and standard error of the mean and of a proportion, the Central Limit Theorem demonstrated by simulation, the law of large numbers, the t distribution, and a sobering finance application: how hard it is to estimate expected returns.',
  objectives: [
    'Explain what a sampling distribution is and why sample statistics vary from sample to sample',
    'Calculate the standard error of a sample mean and of a sample proportion',
    'State the Central Limit Theorem and its conditions, and use it to compute probabilities about sample means and proportions',
    'Distinguish the law of large numbers from the Central Limit Theorem',
    'Explain why the t distribution is used when the population standard deviation is unknown',
    'Explain why expected returns are so hard to estimate from historical data',
  ],
  body: [
    ['h', 'The same question, a different sample, a different answer'],
    ['p', R`If you survey 40 randomly chosen students about their weekly spending, you might get an average of $248. A classmate who surveys another random 40 might get $231, and a third $262. None of them is "wrong": sample statistics vary from sample to sample simply because different people are drawn. This **sampling variability** is not a flaw to be embarrassed about; it is a predictable feature that we can measure. Measuring it is the key that unlocks confidence intervals, hypothesis tests and regression inference in the rest of this subject.`],
    ['defs', [
      ['Sampling distribution', 'The probability distribution of a statistic (such as the sample mean) over all possible samples of a given size.'],
      ['Standard error (SE)', 'The standard deviation of a sampling distribution: how much the statistic typically varies from sample to sample.'],
      ['Sampling error', 'The difference between a statistic and the parameter it estimates, caused by chance selection. It is not a mistake.'],
    ]],

    ['h', 'The sampling distribution of the mean'],
    ['p', R`Suppose a population has mean \(\mu\) and standard deviation \(\sigma\). Draw a random sample of size \(n\) and compute \(\bar X\). Using the rules for expectations and variances from lecture 4, with independent observations:`],
    ['math', R`E[\bar X] = \mu \qquad \operatorname{SD}(\bar X) = SE(\bar X) = \frac{\sigma}{\sqrt{n}}`, 'The expected value of the sample mean equals the population mean. The standard error of the sample mean equals sigma over the square root of n.'],
    ['p', R`Two facts follow. First, the sample mean is **unbiased**: on average it hits the target. Second, its precision improves with the **square root** of the sample size. Quadrupling the sample only halves the standard error; to cut it tenfold you need a hundred times as many observations. This square-root law governs the cost of evidence everywhere: surveys, clinical trials, A/B tests, and backtests.`],
    ['warn', R`The formula assumes independent observations. If observations are correlated, for example customers surveyed in clusters, or daily returns during a volatile period, the effective sample size is smaller and the true standard error larger. And if the population is small relative to the sample (sampling more than about 5% of it without replacement), a finite-population correction reduces the standard error slightly.`],

    ['h', 'The Central Limit Theorem'],
    ['key', R`**Central Limit Theorem (CLT):** if you take random samples of size n from any population with finite mean μ and standard deviation σ, then as n grows, the sampling distribution of the sample mean approaches a normal distribution with mean μ and standard deviation σ/√n, whatever the shape of the population.`],
    ['p', R`This is remarkable. Our student spending data are strongly right-skewed (skewness 1.48). Yet averages of samples from that population become close to normal quite quickly. To show it, we treat the 40 spending values as a population (mean $248, population standard deviation $105.43), and let a computer draw 10,000 random samples of size 5 and 10,000 of size 30, computing each sample’s mean.`],
    ['chart', {
      caption: 'Simulated sampling distributions of the mean spending: n = 5 (pink, wide and skewed) and n = 30 (teal, narrow and bell-shaped)',
      x: [150, 360], y: [0, 0.21], xl: 'Sample mean of weekly spending ($)', yl: 'Share of 10,000 samples', ydp: 2,
      series: [{ label: 'n = 5', color: '#ff7ab6', pts: [[150, 0], [150, 0]] }, { label: 'n = 30', color: '#5fe3e0', pts: [[150, 0], [150, 0]] }, { label: 'Population mean $248', color: '#e9b85c', dash: '5 4', pts: [[248, 0], [248, 0.21]] }],
      areas: [...bars(n5, '#ff7ab6', 0.45), ...bars(n30, '#5fe3e0', 0.55)],
    }],
    ['table', {
      caption: 'Simulation results versus theory',
      head: ['Sample size', 'Mean of the 10,000 sample means', 'SD of the sample means', 'Theory σ/√n', 'Skewness of sample means'],
      rows: [['5', '$247.98', '$46.90', '$47.15', '0.63'], ['30', '$248.07', '$19.35', '$19.25', '0.27']],
    }],
    ['p', R`The simulation confirms all three predictions: the sample means centre on $248, their spread matches \(\sigma/\sqrt{n}\), and their skewness falls sharply as \(n\) rises (it shrinks roughly with \(1/\sqrt{n}\)). A common rule of thumb is that \(n \ge 30\) is enough for the CLT to work for moderately skewed populations; for very skewed or fat-tailed populations (insurance losses, returns in crises), much larger samples are needed. If the population itself is normal, the sample mean is exactly normal for every \(n\).`],
    ['example', {
      title: 'How likely is a high sample average?',
      setup: R`Suppose weekly spending in the whole student population has mean $248 and standard deviation $106.78. A researcher takes a random sample of 40 students. What is the probability that the sample mean exceeds $270?`,
      steps: [
        R`Standard error: \(106.78/\sqrt{40} = \$16.88\).`,
        R`By the CLT, \(\bar X \approx N(248, 16.88^2)\). \(z = (270 - 248)/16.88 = 1.30\).`,
        R`\(P(\bar X > 270) = P(Z > 1.30) = 0.096\).`,
      ],
      answer: R`About a 10% chance. Notice the contrast with an **individual** student: \(P(X > 270)\) is far larger (11 of the 40 students in the data, 27.5%, spend more than $270). Averages vary much less than individuals.`,
    }],

    ['h', 'The sampling distribution of a proportion'],
    ['p', R`Many business questions concern proportions: the share of customers who churn, of loans that default, of voters who support a policy. If each of \(n\) units independently has the attribute with probability \(p\), the sample proportion \(\hat p = X/n\) has:`],
    ['math', R`E[\hat p] = p \qquad SE(\hat p) = \sqrt{\frac{p(1-p)}{n}}`, 'The expected sample proportion equals p. Its standard error equals the square root of p times one minus p, over n.'],
    ['p', R`By the CLT, \(\hat p\) is approximately normal when \(np \ge 10\) and \(n(1-p) \ge 10\). **Example:** suppose 40% of a retailer’s customers use buy now, pay later. In a random sample of 500, what is the probability that more than 43% do? \(SE = \sqrt{0.4 \times 0.6/500} = 0.0219\); \(z = 0.03/0.0219 = 1.37\); probability \(= 0.085\).`],
    ['note', R`This is where the familiar "margin of error" in opinion polls comes from. With \(n = 1{,}000\) and \(p\) near 0.5, \(1.96 \times \sqrt{0.25/1{,}000} = 0.031\): a poll of 1,000 people has a margin of error of about ±3 percentage points, whatever the size of the country. What matters is the sample size, not the population size (as long as the sample is random and the population is much larger).`],

    ['h', 'The law of large numbers'],
    ['p', R`The **law of large numbers (LLN)** says that as the sample size grows, the sample mean converges to the population mean. The CLT adds how fast and in what shape: the error shrinks like \(1/\sqrt{n}\) and is approximately normal. The LLN is the business model of insurance and casinos: an insurer cannot predict whether one house will burn down, but with a million policies its average claim per policy is highly predictable. It is also why the LLN does **not** help an individual gambler: the house edge is applied again on every bet, and in the long run the average result converges to a loss.`],

    ['h', 'When σ is unknown: the t distribution'],
    ['p', R`In practice we rarely know \(\sigma\). We estimate it with the sample standard deviation \(s\), which adds extra uncertainty, especially in small samples. William Gosset, a statistician at the Guinness brewery in Dublin who published in 1908 under the pen name "Student", showed that the standardised sample mean then follows a **t distribution** with \(n - 1\) degrees of freedom:`],
    ['math', R`t = \frac{\bar X - \mu}{s/\sqrt{n}} \sim t_{n-1}`, 'The t statistic equals the sample mean minus mu, divided by s over root n, and follows a t distribution with n minus one degrees of freedom.'],
    ['p', R`The t distribution looks like the standard normal but has fatter tails, reflecting the extra uncertainty. As \(n\) grows it approaches the normal: the 97.5th percentile is 2.262 with 9 degrees of freedom, 2.045 with 29, 1.984 with 100 and 1.960 in the limit. You will use it constantly in the next four lectures.`],

    ['h', 'Finance application: why expected returns are so hard to estimate'],
    ['p', R`Investors constantly estimate expected returns from history: "Australian shares have returned about X% a year". How precise are such estimates? Suppose monthly returns have a standard deviation of 4.5%, typical of a share market, and we have 10 years (120 months) of data.`],
    ['steps', [
      R`Standard error of the average **monthly** return: \(4.5/\sqrt{120} = 0.41\%\).`,
      R`Annualised (multiply the mean by 12): standard error of the average **annual** return \(\approx 12 \times 0.41 = 4.9\%\).`,
      R`A 95% range is roughly \(\pm 1.96 \times 4.9 = \pm 9.7\) percentage points. If the sample average was 9% a year, the true expected return could plausibly be anywhere from about −0.7% to 18.7%.`,
      R`To shrink the annual standard error to 1% you would need \((12 \times 4.5/1)^2/12 = 243\) years of data, during which the economy, the market and the companies would all have changed.`,
    ]],
    ['key', R`Volatility can be estimated fairly precisely from a few years of data, but expected returns cannot. This insight, emphasised by Robert Merton in 1980, is why sensible investors rely on theory, valuation and long histories across many markets rather than a fund’s last five years, and why "backtested" strategies with impressive average returns deserve deep scepticism.`],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'In Excel, compute standard errors from the formulas and probabilities with NORM.DIST and T.DIST.', src: R`Standard error of mean     =STDEV.S(B2:B41)/SQRT(COUNT(B2:B41))   → 16.88
P(sample mean > 270)       =1-NORM.DIST(270,248,16.88,TRUE)       → 0.096
SE of a proportion         =SQRT(0.4*0.6/500)                     → 0.0219
t critical value (97.5%)   =T.INV(0.975,29)                       → 2.045
Simulate a sample mean     =AVERAGE(INDEX($B$2:$B$41,RANDARRAY(30,1,1,40,TRUE)))` }],
    ['code', { lang: 'python', say: 'The Python code reproduces the simulation of sample means with numpy.', src: R`import numpy as np

pop = np.array([118,132,141,145,152,158,163,167,171,174,178,182,185,188,192,195,199,203,207,212,
                216,221,226,232,238,245,252,261,270,284,296,310,327,345,368,392,420,455,510,590])
rng = np.random.default_rng(42)
for n in (5, 30):
    means = rng.choice(pop, size=(10_000, n), replace=True).mean(axis=1)
    print(n, means.mean().round(2), means.std().round(2), (pop.std() / np.sqrt(n)).round(2))` }],

    ['case', {
      title: 'Is the new website better?',
      text: R`An online broker tests a redesigned sign-up page. Over one week, 2,400 visitors see the old page and 2,400 see the new one, assigned at random. 7.5% of visitors to the old page open an account, and 8.4% of visitors to the new page do. The product manager wants to declare victory and roll out the new page.`,
      questions: [
        'Compute the standard error of each sample proportion.',
        'Roughly how large is the standard error of the difference between the two proportions (assuming independence)? Is a 0.9-point difference large relative to it?',
        'What sample size per page would be needed to halve the standard error?',
        'Besides sampling error, what else could explain the difference?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Statistics vary from sample to sample; their sampling distribution describes that variation.`,
      R`\(E[\bar X] = \mu\), \(SE(\bar X) = \sigma/\sqrt{n}\); \(E[\hat p] = p\), \(SE(\hat p) = \sqrt{p(1-p)/n}\).`,
      R`CLT: sample means (and proportions) are approximately normal for large n, whatever the population’s shape.`,
      R`LLN: sample averages converge to the population mean; it underpins insurance.`,
      R`With unknown σ, use \(s\) and the t distribution with \(n - 1\) degrees of freedom.`,
      R`Expected returns are estimated imprecisely even with decades of data; volatility is estimated far better.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A population has standard deviation 15. What is the standard error of the mean for samples of 36?`, answer: 2.5, tol: 0.001, solution: R`\(15/\sqrt{36} = 2.5\).` },
    { type: 'num', level: 'Core', q: R`The population mean is 100 and the standard error is 2.5 (as above). What is the probability that a sample mean exceeds 104? (Four decimals.)`, answer: 0.0548, tol: 0.0005, solution: R`\(z = (104 - 100)/2.5 = 1.6\); \(P(Z > 1.6) = 0.0548\).` },
    { type: 'num', level: 'Core', q: R`With a population standard deviation of 20, what sample size gives a standard error of 2?`, answer: 100, tol: 0.01, solution: R`\(20/\sqrt{n} = 2 \Rightarrow \sqrt{n} = 10 \Rightarrow n = 100\).` },
    { type: 'num', level: 'Core', q: R`The true proportion is 0.20 and the sample size is 400. What is the standard error of the sample proportion?`, answer: 0.02, tol: 0.0001, solution: R`\(\sqrt{0.2 \times 0.8/400} = \sqrt{0.0004} = 0.02\).` },
    { type: 'num', level: 'Core', q: R`What is the approximate 95% margin of error (in percentage points) of a poll of 2,500 people when the true proportion is near 50%? (One decimal.)`, answer: 2, tol: 0.05, solution: R`\(1.96 \times \sqrt{0.25/2{,}500} = 1.96 \times 0.01 = 0.0196\), about **±2.0 points**.` },
    { type: 'num', level: 'Stretch', q: R`Monthly returns have a standard deviation of 6%. With 20 years of monthly data, what is the approximate standard error of the average annual return, in percentage points? (Two decimals.)`, answer: 4.65, tol: 0.02, solution: R`Monthly SE \(= 6/\sqrt{240} = 0.387\%\). Annualised: \(12 \times 0.387 = 4.65\) points. Even 20 years leave the expected return very uncertain.` },
    { type: 'mcq', level: 'Core', q: 'What happens to the standard error of the mean when the sample size is multiplied by four?', options: ['It falls to one quarter', 'It halves', 'It is unchanged', 'It doubles'], answer: 1, solution: R`\(SE = \sigma/\sqrt{n}\), so multiplying \(n\) by 4 multiplies \(\sqrt{n}\) by 2: the SE **halves**.` },
    { type: 'mcq', level: 'Core', q: 'The Central Limit Theorem says that for large samples…', options: ['The population becomes normal', 'Individual observations become normal', 'The sampling distribution of the mean is approximately normal', 'The sample standard deviation equals the population standard deviation'], answer: 2, solution: R`The CLT concerns the **sampling distribution of the mean** (and sums). The population and individual observations keep their original shape.` },
    { type: 'mcq', level: 'Stretch', q: 'Why does the t distribution have fatter tails than the standard normal?', options: ['Because financial returns are fat-tailed', 'Because estimating σ with s adds uncertainty, especially in small samples', 'Because it uses the median', 'Because it assumes a skewed population'], answer: 1, solution: R`Replacing σ with its estimate \(s\) adds extra variability to the standardised mean, so extreme values are more likely. The effect disappears as \(n\) grows.` },
    { type: 'long', level: 'Core', q: 'Explain the difference between the law of large numbers and the Central Limit Theorem, and use an insurance company to illustrate why both matter.', answer: R`The law of large numbers says that the sample mean converges to the population mean as the sample size grows: averages over many independent observations become close to the expected value. The Central Limit Theorem goes further: it describes the distribution of the error along the way, saying that for large samples the sample mean is approximately normally distributed around the population mean with standard error σ/√n.

For an insurer, the LLN is why the business works at all. Each policyholder’s claim is highly uncertain, but with hundreds of thousands of independent policies the average claim per policy is very close to its expected value, so premiums can be set at expected claims plus costs and a margin. The CLT tells the insurer how much the average could deviate in a bad year and with what probability, which determines how much capital to hold. For example, if the standard deviation of a single policy’s annual claim is $5,000 and the insurer has 100,000 independent policies, the standard error of the average claim is $5,000/√100,000 ≈ $15.81, so total claims are unlikely to exceed expectations by more than about 2.33 × $15.81 × 100,000 ≈ $3.7 million in 99% of years.

Both results rely on independence. Catastrophes such as floods or pandemics make claims move together, which destroys the diversification and is why insurers buy reinsurance and hold extra capital for correlated events.`, solution: 'Look for correct statements of both results, the insurance illustration, a numerical SE calculation, and the independence caveat.' },
  ],
  glossary: [
    ['Sampling distribution', 'The distribution of a statistic across all possible samples of a given size.'],
    ['Standard error', 'The standard deviation of a statistic’s sampling distribution.'],
    ['Central Limit Theorem', 'Sample means are approximately normal for large samples, whatever the population shape.'],
    ['Law of large numbers', 'Sample averages converge to the population mean as the sample grows.'],
    ['t distribution', 'The distribution of a standardised mean when σ is estimated by s; fatter tails than the normal.'],
    ['Degrees of freedom', 'The number of independent pieces of information available to estimate a quantity.'],
    ['Margin of error', 'The half-width of a confidence interval, often 1.96 standard errors.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'SEEING', 'MIT18650', 'book:WOOL'],
};
