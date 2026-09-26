const R = String.raw;
const pdf = (x, m, s) => Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI));
const curve = Array.from({ length: 121 }, (_, i) => { const x = -18 + i * 0.3; return [x, +(100 * pdf(x, 0.8, 4.5)).toFixed(4)]; });
const tail = curve.filter(([x]) => x <= -5);
const binom = [[0, 0.3585], [1, 0.3774], [2, 0.1887], [3, 0.0596], [4, 0.0133], [5, 0.0022], [6, 0.0003]];
export default {
  id: '26134-04', subject: '26134', title: 'Random variables and the key distributions', mins: 75, level: 'Foundation',
  summary: 'Turning uncertainty into models: discrete and continuous random variables, expected value and variance and their rules, the Bernoulli, binomial and Poisson distributions for counts, the normal distribution and z-scores, the normal approximation, and a first look at how finance uses these models for credit risk, operational events and Value at Risk.',
  objectives: [
    'Define discrete and continuous random variables and compute the expected value and variance of a discrete distribution',
    'Apply the rules for the mean and variance of linear transformations and sums, and connect them to portfolio risk',
    'Recognise binomial situations and compute binomial probabilities, mean and variance',
    'Use the Poisson distribution for counts of rare events',
    'Compute normal probabilities and quantiles with z-scores and Excel',
    'Explain when the normal approximation to the binomial works and why financial returns are only approximately normal',
  ],
  body: [
    ['h', 'Random variables'],
    ['p', R`A **random variable** assigns a number to each outcome of a random experiment: the number of loans that default, tomorrow’s return on the ASX 200, the time until the next customer arrives. A **discrete** random variable takes countable values (0, 1, 2, …). A **continuous** random variable can take any value in an interval. Its **probability distribution** tells us how probability is spread over the possible values: a probability mass function \(P(X = x)\) for discrete variables, a probability density function \(f(x)\) for continuous ones, where probabilities are areas under the curve.`],
    ['h', 'Expected value and variance'],
    ['math', R`E[X] = \mu = \sum_x x\,P(X = x) \qquad \operatorname{Var}(X) = \sigma^2 = \sum_x (x - \mu)^2\,P(X = x)`, 'The expected value of X is the sum of each value times its probability. The variance is the sum of squared deviations from the mean times their probabilities.'],
    ['example', {
      title: 'Daily sales of a premium product',
      setup: R`A store’s daily sales of a premium coffee machine follow this distribution: 0 units with probability 0.10, 1 with 0.25, 2 with 0.35, 3 with 0.20 and 4 with 0.10.`,
      steps: [
        R`\(E[X] = 0(0.10) + 1(0.25) + 2(0.35) + 3(0.20) + 4(0.10) = 1.95\) units a day.`,
        R`\(\operatorname{Var}(X) = (0 - 1.95)^2(0.10) + (1 - 1.95)^2(0.25) + (2 - 1.95)^2(0.35) + (3 - 1.95)^2(0.20) + (4 - 1.95)^2(0.10) = 1.2475\).`,
        R`\(\sigma = \sqrt{1.2475} = 1.117\) units.`,
      ],
      answer: R`The store sells about 1.95 machines a day on average, give or take about 1.1. Over a 30-day month, expected sales are 58.5 units, which is what the inventory plan should start from.`,
    }],
    ['h3', 'Rules that make modelling easy'],
    ['math', R`E[aX + b] = aE[X] + b \qquad \operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)`, 'The expectation of a X plus b equals a times the expectation of X plus b. The variance of a X plus b equals a squared times the variance of X.'],
    ['math', R`E[X + Y] = E[X] + E[Y] \qquad \operatorname{Var}(X + Y) = \operatorname{Var}(X) + \operatorname{Var}(Y) + 2\operatorname{Cov}(X, Y)`, 'The expectation of a sum is the sum of expectations. The variance of a sum is the sum of the variances plus twice the covariance.'],
    ['p', R`If each machine earns a $300 margin and the store has $50 of fixed daily costs, daily profit \(= 300X - 50\) has mean \(300 \times 1.95 - 50 = \$535\) and standard deviation \(300 \times 1.117 = \$335\): adding a constant shifts the mean but not the spread. The variance-of-a-sum rule is exactly the portfolio variance formula from Financial Literacy: with weights \(w_1, w_2\), \(\operatorname{Var}(w_1R_1 + w_2R_2) = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\operatorname{Cov}(R_1, R_2)\). Diversification is just this rule at work.`],

    ['h', 'The binomial distribution'],
    ['p', R`Many business questions count **successes in a fixed number of independent trials**: how many of 20 loans default, how many of 50 customers accept an offer, how many of 12 months have a negative return. A situation is **binomial** if:`],
    ['olist', [
      R`there is a fixed number of trials \(n\);`,
      R`each trial has two outcomes, "success" or "failure" (a **Bernoulli** trial);`,
      R`the probability of success \(p\) is the same on every trial; and`,
      R`trials are independent.`,
    ]],
    ['math', R`P(X = k) = \binom{n}{k}\,p^{k}(1-p)^{n-k}, \qquad E[X] = np, \qquad \operatorname{Var}(X) = np(1-p)`, 'The probability of exactly k successes equals n choose k times p to the k times one minus p to the n minus k. The mean is n p and the variance is n p times one minus p.'],
    ['example', {
      title: 'Defaults in a small loan portfolio',
      setup: R`A credit union has made 20 similar loans, each with a 5% probability of default, and assumes defaults are independent.`,
      steps: [
        R`\(P(X = 0) = 0.95^{20} = 0.3585\).`,
        R`\(P(X = 1) = 20 \times 0.05 \times 0.95^{19} = 0.3774\).`,
        R`\(P(X \ge 2) = 1 - 0.3585 - 0.3774 = 0.2642\).`,
        R`Mean \(= 20 \times 0.05 = 1\) default; variance \(= 20 \times 0.05 \times 0.95 = 0.95\).`,
      ],
      answer: R`There is about a 26% chance of two or more defaults. If each default costs $15,000, expected losses are $15,000, but the credit union must hold capital for the bad cases, not the average. And remember lecture 3: if defaults are correlated, the true probability of several defaults is higher than the binomial model says.`,
    }],
    ['chart', {
      caption: 'Binomial distribution: number of defaults among 20 loans with p = 0.05',
      x: [-0.5, 6.5], y: [0, 0.4], xl: 'Number of defaults', yl: 'Probability', ydp: 2, xticks: binom.map(([k]) => [k, String(k)]),
      series: [],
      areas: binom.map(([k, pr]) => ({ top: [[k - 0.35, pr], [k + 0.35, pr]], bottom: [[k - 0.35, 0], [k + 0.35, 0]], color: '#5fe3e0', opacity: 0.75 })),
    }],

    ['h', 'The Poisson distribution'],
    ['p', R`When we count events that occur randomly over time or space, with no fixed number of trials (fraud claims per day, customer arrivals per hour, system outages per year, defaults in a very large portfolio), the **Poisson distribution** is the natural model. It has one parameter, the average rate \(\lambda\) per interval.`],
    ['math', R`P(X = k) = \frac{e^{-\lambda}\lambda^{k}}{k!}, \qquad E[X] = \operatorname{Var}(X) = \lambda`, 'The probability of k events equals e to the minus lambda times lambda to the k, over k factorial. The mean and the variance both equal lambda.'],
    ['example', {
      title: 'Fraud claims at an insurer',
      setup: R`An insurer receives on average 3 suspected fraudulent claims a day.`,
      steps: [
        R`\(P(0) = e^{-3} = 0.0498\).`,
        R`\(P(3) = e^{-3}3^3/3! = 0.2240\).`,
        R`\(P(X \ge 6) = 1 - P(X \le 5) = 0.0839\).`,
      ],
      answer: R`On about 8% of days the fraud team will face six or more cases, roughly one working day in twelve. Staffing for the average of three would leave the team overloaded on those days. The Poisson model helps size teams, reserves and capacity.`,
    }],
    ['p', R`The Poisson distribution is also the limit of the binomial when \(n\) is large and \(p\) small with \(np = \lambda\): the number of defaults among 10,000 loans with \(p = 0.0003\) is approximately Poisson with \(\lambda = 3\). A tell-tale sign of a Poisson process is that the variance equals the mean; when real count data show variance well above the mean ("overdispersion"), events are clustering, often because of a common cause.`],

    ['h', 'The normal distribution'],
    ['p', R`The **normal distribution** is the familiar symmetric bell curve, described by its mean \(\mu\) and standard deviation \(\sigma\). It matters for three reasons: many measurements are approximately normal; sums and averages of many independent effects tend to be normal (the Central Limit Theorem of the next lecture); and it is mathematically convenient, so many models, from portfolio theory to Black–Scholes, use it.`],
    ['math', R`f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{1}{2}\left(\frac{x - \mu}{\sigma}\right)^2} \qquad Z = \frac{X - \mu}{\sigma} \sim N(0, 1)`, 'The normal density equals one over sigma root two pi, times e to the minus one half of x minus mu over sigma, squared. The standardised variable Z equals X minus mu over sigma and follows the standard normal distribution.'],
    ['p', R`Any normal variable can be converted to the **standard normal** \(Z\) with mean 0 and standard deviation 1, and probabilities read from a table or software. Values worth memorising: \(P(Z < 1.645) = 0.95\), \(P(Z < 1.96) = 0.975\), \(P(Z < 2.326) = 0.99\) and \(P(Z < 2.576) = 0.995\).`],
    ['example', {
      title: 'How often does a share fund lose more than 5% in a month?',
      setup: R`Suppose a share fund’s monthly return is approximately normal with mean 0.8% and standard deviation 4.5%.`,
      steps: [
        R`\(z = (-5 - 0.8)/4.5 = -1.29\). \(P(Z < -1.29) = 0.099\).`,
        R`So there is roughly a 9.9% chance of losing more than 5% in any month: about once a year on average.`,
        R`\(P(\text{return} > 0) = P(Z > -0.178) = 0.571\): only 57% of months are positive, even with a positive mean.`,
        R`The 5th percentile: \(0.8 - 1.645 \times 4.5 = -6.60\%\). In one month in twenty, the fund should expect to lose at least 6.6%.`,
      ],
      answer: R`The 5th percentile of returns is the idea behind **Value at Risk (VaR)**: "with 95% confidence, the monthly loss will not exceed 6.6%". Because real returns have fatter tails than the normal, normal-based VaR tends to understate extreme losses, as lecture 2 warned.`,
    }],
    ['chart', {
      caption: 'Monthly return ~ N(0.8%, 4.5%): the shaded tail (below −5%) has probability 9.9%',
      x: [-18, 18], y: [0, 9.5], xl: 'Monthly return (%)', yl: 'Density (× 100)',
      series: [{ label: 'Normal density', color: '#e9b85c', pts: curve }, { label: '−5% threshold', color: '#ff5d73', dash: '5 4', pts: [[-5, 0], [-5, 9]] }],
      areas: [{ top: tail, color: '#ff5d73', opacity: 0.5 }],
    }],
    ['h3', 'The normal approximation to the binomial'],
    ['p', R`For large \(n\), a binomial variable is approximately normal with mean \(np\) and standard deviation \(\sqrt{np(1-p)}\), provided \(np\) and \(n(1-p)\) are both at least about 10. Add a **continuity correction** of 0.5 because a continuous curve is approximating whole numbers. For 400 loans with \(p = 0.05\): mean 20, standard deviation \(\sqrt{19} = 4.36\). \(P(X \ge 28) \approx P(Z \ge (27.5 - 20)/4.36) = 0.043\); the exact binomial answer is 0.048. Close, but not identical in the tail, which is where risk managers care most.`],
    ['h3', 'Other distributions you will meet'],
    ['list', [
      R`**Uniform**: every value in an interval equally likely; used for random number generation in simulation.`,
      R`**Exponential**: the time between Poisson events (for example, the time until the next fraud claim).`,
      R`**Lognormal**: if returns are normal, prices are lognormal. Prices cannot fall below zero, and the lognormal is skewed right. It underlies the Black–Scholes model.`,
      R`**Student’s t**: like the normal with fatter tails; used for inference with small samples (lecture 6) and to model returns more realistically.`,
      R`**Chi-square and F**: used for testing variances and regression models (lectures 7–9).`,
    ]],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel has functions for each distribution: BINOM.DIST, POISSON.DIST, NORM.DIST, NORM.S.DIST and NORM.INV.', src: R`=BINOM.DIST(0,20,0.05,FALSE)       → 0.3585   exactly 0 defaults
=1-BINOM.DIST(1,20,0.05,TRUE)      → 0.2642   2 or more defaults
=POISSON.DIST(3,3,FALSE)           → 0.2240
=1-POISSON.DIST(5,3,TRUE)          → 0.0839
=NORM.DIST(-5,0.8,4.5,TRUE)        → 0.0987   P(return < -5%)
=NORM.INV(0.05,0.8,4.5)            → -6.60    5th percentile
=NORM.S.INV(0.975)                 → 1.96` }],
    ['code', { lang: 'python', say: 'The Python code uses scipy stats for the same probabilities.', src: R`from scipy import stats

b = stats.binom(n=20, p=0.05)
print(b.pmf(0), 1 - b.cdf(1))              # 0.3585, 0.2642
pois = stats.poisson(mu=3)
print(pois.pmf(3), 1 - pois.cdf(5))        # 0.2240, 0.0839
r = stats.norm(loc=0.8, scale=4.5)
print(r.cdf(-5), r.ppf(0.05))              # 0.0987, -6.60` }],

    ['case', {
      title: 'Staffing a call centre and sizing a reserve',
      text: R`A bank’s card-fraud hotline receives on average 12 calls per hour between 9 am and 5 pm. Each agent can handle 4 calls an hour. Separately, the bank holds a reserve against losses on a portfolio of 500 small-business loans, each with a 2% annual default probability and an average loss of $40,000 per default.`,
      questions: [
        'Using a Poisson model, how many agents are needed so that the probability of more calls than capacity in an hour is below 5%?',
        'Compute the expected number of defaults and the standard deviation under a binomial model. How large a reserve covers losses in 99% of years under the normal approximation?',
        'Why might both models understate the bank’s real risks?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`A random variable maps outcomes to numbers; discrete variables have probability masses, continuous ones densities.`,
      R`\(E[X] = \sum xP(x)\), \(\operatorname{Var}(X) = \sum (x - \mu)^2P(x)\); \(E[aX + b] = aE[X] + b\), \(\operatorname{Var}(aX + b) = a^2\operatorname{Var}(X)\).`,
      R`Binomial: fixed \(n\), constant \(p\), independent trials; mean \(np\), variance \(np(1-p)\).`,
      R`Poisson: counts of events at rate \(\lambda\); mean = variance = \(\lambda\).`,
      R`Normal: standardise with \(z = (x - \mu)/\sigma\); 1.645, 1.96 and 2.576 are the key critical values.`,
      R`Normal models are convenient but understate fat-tailed and correlated risks.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A random variable takes the values 10, 20 and 40 with probabilities 0.5, 0.3 and 0.2. What is its expected value?`, answer: 19, tol: 0.01, solution: R`\(10(0.5) + 20(0.3) + 40(0.2) = 5 + 6 + 8 = 19\).` },
    { type: 'num', level: 'Core', q: R`A binomial variable has \(n = 10\) and \(p = 0.3\). What is \(P(X = 3)\)? (Four decimals.)`, answer: 0.2668, tol: 0.0005, solution: R`\(\binom{10}{3}0.3^3 0.7^7 = 120 \times 0.027 \times 0.08235 = 0.2668\).` },
    { type: 'num', level: 'Core', q: R`For the same binomial variable, what is its standard deviation? (Three decimals.)`, answer: 1.449, tol: 0.002, solution: R`\(\sqrt{10 \times 0.3 \times 0.7} = \sqrt{2.1} = 1.449\).` },
    { type: 'num', level: 'Core', q: R`System outages occur at an average rate of 2 per month (Poisson). What is the probability of at least 3 outages in a month? (Four decimals.)`, answer: 0.3233, tol: 0.0005, solution: R`\(P(X \le 2) = e^{-2}(1 + 2 + 2) = 5e^{-2} = 0.6767\). So \(P(X \ge 3) = 0.3233\).` },
    { type: 'num', level: 'Core', q: R`Monthly returns are normal with mean 1.2% and standard deviation 5%. What is the probability of a return below −8%? (Four decimals.)`, answer: 0.0329, tol: 0.0005, solution: R`\(z = (-8 - 1.2)/5 = -1.84\); \(P(Z < -1.84) = 0.0329\).` },
    { type: 'num', level: 'Core', q: R`Monthly returns are normal with mean 0.6% and standard deviation 3.8%. What is the 5th percentile (the 95% one-month VaR expressed as a return), in percent? (Two decimals, include the sign.)`, answer: -5.65, tol: 0.01, solution: R`\(0.6 - 1.645 \times 3.8 = -5.65\%\).` },
    { type: 'num', level: 'Stretch', q: R`Profit is \(Y = 250X - 400\), where \(X\) has mean 6 and standard deviation 2. What is the standard deviation of profit?`, answer: 500, tol: 0.01, solution: R`\(\sigma_Y = |250| \times 2 = 500\). The constant −400 shifts the mean (to 1,100) but not the spread.` },
    { type: 'mcq', level: 'Core', q: 'Which situation is best modelled by a binomial distribution?', options: ['The number of customers arriving at a bank branch in an hour', 'The number of the 30 applicants approved, if each is approved independently with probability 0.6', 'The daily return on the ASX 200', 'The time until a server fails'], answer: 1, solution: R`Fixed \(n = 30\), two outcomes, constant \(p\), independence: **binomial**. Arrivals per hour are Poisson; returns are continuous; failure times are exponential.` },
    { type: 'mcq', level: 'Core', q: 'For a Poisson distribution with mean 4, what is its variance?', options: ['2', '4', '16', 'It depends on n'], answer: 1, solution: R`For a Poisson distribution the **variance equals the mean**, here 4.` },
    { type: 'long', level: 'Stretch', q: 'A risk manager assumes daily returns are normal and reports a 99% one-day VaR. Explain what the number means and give two reasons why actual losses beyond VaR may occur more often than 1% of days.', answer: R`A 99% one-day VaR of, say, $2 million means that under the model, on 99% of days the portfolio’s loss should not exceed $2 million; equivalently, losses larger than $2 million are expected on about 1% of trading days, roughly two or three days a year. It is the 1st percentile of the modelled profit-and-loss distribution. It says nothing about how large the loss will be on those bad days.

Losses may exceed VaR more often than 1% of days for several reasons. First, fat tails: real return distributions have excess kurtosis, so extreme moves are more frequent than the normal distribution implies; a normal-based 2.33σ threshold is breached more often than 1% of the time. Second, volatility clustering: volatility is not constant; after a shock, volatility rises for a while, so a model calibrated on a calm period understates current risk. Third, correlations rise in crises, weakening the diversification the model assumed. Fourth, liquidity: in stressed markets positions cannot be sold at quoted prices, so realised losses exceed model losses. For these reasons, regulators and risk managers supplement VaR with Expected Shortfall (the average loss beyond VaR), stress tests and backtesting of how often VaR is breached.`, solution: 'Look for the percentile interpretation and at least two valid reasons (fat tails, volatility clustering, correlation breakdown, liquidity, model error).' },
  ],
  glossary: [
    ['Random variable', 'A numerical outcome of a random experiment.'],
    ['Expected value', 'The probability-weighted average of a random variable’s values.'],
    ['Bernoulli trial', 'A single trial with two outcomes, success or failure.'],
    ['Binomial distribution', 'The number of successes in n independent trials with constant probability p.'],
    ['Poisson distribution', 'The number of events in an interval when they occur randomly at a constant average rate.'],
    ['Normal distribution', 'The symmetric bell-shaped distribution described by its mean and standard deviation.'],
    ['Standard normal', 'The normal distribution with mean 0 and standard deviation 1.'],
    ['Value at Risk', 'A loss threshold that is exceeded with a given small probability over a given horizon.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'SEEING', 'MIT18650', 'MIT18S096', 'book:WOOL'],
};
