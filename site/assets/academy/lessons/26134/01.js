const R = String.raw;
const bins = [[100, 150, 4], [150, 200, 13], [200, 250, 9], [250, 300, 5], [300, 350, 3], [350, 400, 2], [400, 450, 1], [450, 500, 1], [500, 550, 1], [550, 600, 1]];
const rba = [[2024.0, 4.35], [2025.13, 4.35], [2025.13, 4.10], [2025.39, 4.10], [2025.39, 3.85], [2025.62, 3.85], [2025.62, 3.60], [2026.09, 3.60], [2026.09, 3.85], [2026.21, 3.85], [2026.21, 4.10], [2026.34, 4.10], [2026.34, 4.35], [2026.74, 4.35]];
export default {
  id: '26134-01', subject: '26134', title: 'Data, variables and describing data with pictures', mins: 60, level: 'Foundation',
  summary: 'Where evidence comes from and how to look at it honestly: the statistical problem-solving cycle, populations and samples, sampling methods and biases, types of variables and data, data ethics and privacy, frequency tables, histograms, bar charts, time-series charts and scatter plots, and how charts mislead.',
  objectives: [
    'Describe the PPDAC problem-solving cycle and the role of evidence in business decisions',
    'Distinguish populations from samples and parameters from statistics, and identify common sampling methods and biases',
    'Classify variables as categorical (nominal, ordinal) or numerical (discrete, continuous), and data as cross-sectional, time series or panel',
    'Build frequency and relative-frequency tables and draw an appropriate chart for each type of variable',
    'Read the shape of a distribution from a histogram, including skewness and outliers',
    'Recognise misleading charts and apply basic principles of data ethics and privacy',
  ],
  body: [
    ['h', 'Why "responsible evidence"?'],
    ['p', R`Every day, business decisions are justified with numbers: a marketing campaign "increased sales by 12%", a fund "beat the market", an app "users love", a drug "cuts risk in half". Some of these claims are sound; many are not. This subject teaches you to produce evidence and to judge it: to collect data sensibly, summarise it honestly, quantify uncertainty, test claims and build models, and to recognise when the numbers cannot support the conclusion. That is what "responsible" means here: statistics used to inform decisions rather than to decorate them.`],
    ['p', R`A helpful framework is the **PPDAC cycle**, widely used in statistics education:`],
    ['steps', [
      R`**Problem**: what question are we trying to answer, and what decision depends on it?`,
      R`**Plan**: what should we measure, on whom, and how? How large a sample do we need?`,
      R`**Data**: collect, clean and check the data, and document where it came from.`,
      R`**Analysis**: describe, visualise, estimate and test.`,
      R`**Conclusion**: interpret the results in context, state the uncertainty and limitations, and often generate the next question.`,
    ]],
    ['key', R`Most statistical failures happen before any calculation: a vague question, a biased sample or a badly measured variable. No technique can rescue data that answer the wrong question.`],

    ['h', 'Populations, samples and how to choose them'],
    ['defs', [
      ['Population', 'The entire group we want to learn about: all Australian households, all loans a bank has made, all trading days of the ASX 200.'],
      ['Sample', 'The subset we actually observe.'],
      ['Parameter', 'A number describing the population, usually unknown, such as the true average household debt. Written with Greek letters: μ, σ, p.'],
      ['Statistic', 'A number calculated from the sample, used to estimate a parameter: the sample mean x̄, standard deviation s, proportion p̂.'],
      ['Census', 'Observing the whole population, as the ABS does every five years for the Census of Population and Housing.'],
    ]],
    ['p', R`Censuses are expensive and slow, so most evidence comes from samples. A sample is only useful if it **represents** the population. The gold standard is **random sampling**, in which chance, not the researcher or the respondents, decides who is included.`],
    ['table', {
      caption: 'Sampling methods',
      head: ['Method', 'How it works', 'Business example', 'Strength or weakness'],
      rows: [
        ['Simple random', 'Every member has the same chance of selection', 'Randomly select 400 of a bank’s 50,000 credit card accounts to audit', 'Unbiased; needs a complete list (sampling frame)'],
        ['Stratified', 'Divide into groups (strata) and sample randomly within each', 'Sample small, medium and large business customers separately', 'More precise; guarantees small groups are represented'],
        ['Cluster', 'Randomly select whole groups, then observe everyone in them', 'Randomly choose 20 branches and survey all their customers', 'Cheap; less precise if clusters differ'],
        ['Systematic', 'Every k-th member from a list', 'Check every 50th invoice', 'Simple; biased if the list has a pattern'],
        ['Convenience', 'Whoever is easy to reach', 'An online poll on a company’s Instagram', 'Cheap; usually biased'],
      ],
    }],
    ['h3', 'Biases that ruin samples'],
    ['list', [
      R`**Selection bias**: the way units are chosen makes some more likely to be included, for example surveying customers who visit the store, which misses those who have stopped coming.`,
      R`**Non-response bias**: the people who reply differ from those who do not. Very satisfied and very angry customers answer surveys; the indifferent majority does not.`,
      R`**Survivorship bias**: only the "survivors" are observed. Average returns of funds that still exist overstate what investors earned, because closed funds (usually the worst) have disappeared from the data.`,
      R`**Response bias**: question wording, social desirability or the interviewer changes answers. "Do you agree that our excellent service…" is a leading question.`,
      R`**Measurement error**: the instrument itself is inaccurate, such as self-reported income or a faulty sensor.`,
    ]],
    ['note', R`A famous example of survivorship bias comes from the Second World War. Engineers examined bullet holes on returning bombers and proposed reinforcing the most-hit areas. The statistician Abraham Wald pointed out that the planes hit in other places had not returned: the armour belonged where the surviving planes had **no** holes. Always ask what data you are not seeing.`],

    ['h', 'Types of variables and data'],
    ['table', {
      caption: 'Classifying variables',
      head: ['Type', 'Sub-type', 'Meaning', 'Examples'],
      rows: [
        ['Categorical (qualitative)', 'Nominal', 'Categories with no natural order', 'Industry sector, state, payment method, country of birth'],
        ['Categorical (qualitative)', 'Ordinal', 'Categories with a natural order but unequal gaps', 'Credit rating (AAA, AA, A…), satisfaction (1–5), year level'],
        ['Numerical (quantitative)', 'Discrete', 'Countable values', 'Number of transactions, number of employees'],
        ['Numerical (quantitative)', 'Continuous', 'Any value in a range', 'Share price, income, time spent on a website'],
      ],
    }],
    ['p', R`The type determines what you can calculate and how to chart it. An average postcode is meaningless (nominal), an average satisfaction score is common but must be interpreted carefully (ordinal), an average income is fine (continuous).`],
    ['p', R`Data also differ in structure. **Cross-sectional** data observe many units at one point in time (incomes of 5,000 households in 2026). **Time-series** data observe one unit over time (the monthly CPI since 1990). **Panel** (longitudinal) data observe many units over time (the HILDA survey follows the same Australian households every year). Finance uses all three: a share’s daily returns are a time series; a cross-section of all ASX 200 companies’ price–earnings ratios today is cross-sectional; and asset-pricing research uses panels of thousands of shares over decades.`],
    ['p', R`Finally, distinguish **observational** data, where we simply record what happens, from **experimental** data, where we deliberately assign treatments, ideally at random. Only well-designed experiments (such as randomised A/B tests of two website designs) can establish cause and effect easily. With observational data, a relationship may be driven by a third, **confounding** variable. We return to this in lecture 9.`],

    ['h', 'Tables and charts for categorical data'],
    ['p', R`A **frequency table** counts how many observations fall in each category; the **relative frequency** divides by the total. Suppose 40 students report their main way of getting to campus.`],
    ['table', {
      caption: 'Main transport to campus (n = 40)',
      head: ['Mode', 'Frequency', 'Relative frequency', 'Percentage'],
      rows: [['Train', '14', '0.350', '35.0%'], ['Bus', '9', '0.225', '22.5%'], ['Walk', '8', '0.200', '20.0%'], ['Car', '5', '0.125', '12.5%'], ['Bike or scooter', '4', '0.100', '10.0%'], ['Total', '40', '1.000', '100.0%']],
    }],
    ['p', R`Categorical data are best shown with a **bar chart**, with bars in a meaningful order (by size for nominal data, in the natural order for ordinal data). **Pie charts** can show shares of a whole with few categories, but people compare angles poorly, so bar charts are usually clearer. For two categorical variables, use a **contingency table** (a cross-tabulation), which you will use for probability in lecture 3.`],

    ['h', 'Tables and charts for numerical data'],
    ['p', R`For a numerical variable, we group values into **classes** (bins) of equal width and count them. Here are the weekly spending amounts (excluding rent) of 40 students, in Australian dollars, sorted (illustrative data):`],
    ['p', R`118, 132, 141, 145, 152, 158, 163, 167, 171, 174, 178, 182, 185, 188, 192, 195, 199, 203, 207, 212, 216, 221, 226, 232, 238, 245, 252, 261, 270, 284, 296, 310, 327, 345, 368, 392, 420, 455, 510, 590.`],
    ['table', {
      caption: 'Frequency distribution of weekly spending (class width $50)',
      head: ['Class ($)', 'Frequency', 'Relative frequency', 'Cumulative relative frequency'],
      rows: [
        ['100 to under 150', '4', '0.100', '0.100'], ['150 to under 200', '13', '0.325', '0.425'], ['200 to under 250', '9', '0.225', '0.650'], ['250 to under 300', '5', '0.125', '0.775'],
        ['300 to under 350', '3', '0.075', '0.850'], ['350 to under 400', '2', '0.050', '0.900'], ['400 to under 450', '1', '0.025', '0.925'], ['450 to under 500', '1', '0.025', '0.950'],
        ['500 to under 550', '1', '0.025', '0.975'], ['550 to under 600', '1', '0.025', '1.000'],
      ],
    }],
    ['chart', {
      caption: 'Histogram of weekly student spending: right-skewed',
      x: [100, 600], y: [0, 14], xl: 'Weekly spending ($)', yl: 'Number of students',
      series: [{ label: 'Median $214', color: '#e9b85c', dash: '5 4', pts: [[214, 0], [214, 14]] }, { label: 'Mean $248', color: '#ff7ab6', dash: '5 4', pts: [[248, 0], [248, 14]] }],
      areas: bins.map(([a, b, n]) => ({ top: [[a + 2, n], [b - 2, n]], bottom: [[a + 2, 0], [b - 2, 0]], color: '#5fe3e0', opacity: 0.7 })),
      note: 'Most students spend $150–$250, but a long tail of higher spenders pulls the mean ($248) above the median ($214).',
    }],
    ['h3', 'Reading the shape'],
    ['list', [
      R`**Centre**: where most values lie (here around $150–$250).`,
      R`**Spread**: how far values range (from $118 to $590).`,
      R`**Shape**: symmetric, **right-skewed** (a long tail to the right, as here: incomes, house prices, company sizes and losses in insurance are typically right-skewed) or **left-skewed**; and the number of peaks (unimodal, bimodal).`,
      R`**Outliers**: values far from the rest. $590 may be genuine (a student who bought a laptop that week) or an error. Investigate before deleting.`,
    ]],
    ['p', R`The number of classes changes the picture. Too few hide the shape; too many produce a jagged comb. A rough guide is 5 to 15 classes, or about \(\sqrt{n}\) for moderate samples. Always use equal widths, and choose readable boundaries.`],
    ['h3', 'Time series and scatter plots'],
    ['p', R`For data over time, use a **line chart** with time on the horizontal axis. Here is the RBA’s cash rate target from January 2024 to September 2026 (source: RBA, high confidence), a step function because the rate changes only at Board meetings.`],
    ['chart', {
      caption: 'RBA cash rate target, 2024 to September 2026 (%)',
      x: [2024, 2026.75], y: [0, 5], xl: 'Date', yl: 'Cash rate target (%)', ydp: 1, xticks: [[2024, 'Jan 2024'], [2024.5, 'Jul 2024'], [2025, 'Jan 2025'], [2025.5, 'Jul 2025'], [2026, 'Jan 2026'], [2026.5, 'Jul 2026']],
      series: [{ label: 'Cash rate target', color: '#e9b85c', pts: rba }],
    }],
    ['p', R`For the relationship between two numerical variables, use a **scatter plot**, with the explanatory variable on the horizontal axis. Scatter plots reveal direction (positive or negative), form (linear or curved), strength and outliers. They are the starting point for correlation and regression in lectures 2, 8 and 9.`],

    ['h', 'How charts mislead'],
    ['p', R`Here is the same cash-rate data from May 2025 to September 2026, drawn with a truncated vertical axis. The rise from 3.60% to 4.35% suddenly looks like an explosion.`],
    ['chart', {
      caption: 'The same data with the vertical axis starting at 3.5%: a dramatic-looking rise',
      x: [2025.35, 2026.75], y: [3.5, 4.4], xl: 'Date', yl: 'Cash rate target (%)', ydp: 1, xticks: [[2025.5, 'Jul 2025'], [2025.75, 'Oct 2025'], [2026, 'Jan 2026'], [2026.25, 'Apr 2026'], [2026.5, 'Jul 2026']],
      series: [{ label: 'Cash rate target', color: '#ff7ab6', pts: rba.filter(([t]) => t >= 2025.35).length ? [[2025.39, 3.85], ...rba.filter(([t]) => t > 2025.39)] : [] }],
    }],
    ['p', R`A truncated axis is not always wrong. For a variable that never approaches zero, such as a share index or an exchange rate, zooming in shows meaningful variation. The problem arises when the axis choice exaggerates a change and the reader is not warned. Other common tricks:`],
    ['list', [
      R`**Cherry-picked time windows**: starting a chart at a market low to flatter performance.`,
      R`**Two vertical axes** with different scales, which can make any two series appear related.`,
      R`**3D effects and pie charts** that distort area and angle.`,
      R`**Cumulative charts** that always rise, hiding a slowdown.`,
      R`**Unlabelled units or missing sources.**`,
    ]],
    ['warn', R`When you present data, label axes and units, state the source and the date, start bars at zero, and choose the time window for a reason you could defend. When you read someone else’s chart, check all of these before believing the story.`],

    ['h', 'Data ethics and privacy'],
    ['p', R`Business data are often about people. In Australia, the **Privacy Act 1988** and the Australian Privacy Principles govern how organisations collect, use, store and disclose personal information. Responsible practice includes collecting only what is needed, telling people how it will be used, obtaining consent, protecting data from breaches, de-identifying data for analysis, and being careful that de-identified data cannot be re-identified by combining sources. Analysts must also consider **fairness**: models trained on historical data can reproduce past discrimination, for example in lending or hiring. Documenting data sources, cleaning steps and assumptions makes analysis reproducible and accountable.`],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel counts categories with COUNTIF, builds class frequencies with COUNTIFS or FREQUENCY, and draws histograms with the built-in histogram chart or a PivotTable.', src: R`Category counts      =COUNTIF($A$2:$A$41,"Train")
Class frequency      =COUNTIFS($B$2:$B$41,">="&100,$B$2:$B$41,"<"&150)
All classes at once  =FREQUENCY(B2:B41, {149.99,199.99,249.99,299.99,349.99,399.99,449.99,499.99,549.99})
Relative frequency   =C2/SUM($C$2:$C$11)
Charts               Insert > Charts > Histogram, or a PivotTable with grouped values` }],
    ['code', { lang: 'python', say: 'In Python, pandas counts categories with value counts, and matplotlib draws the histogram.', src: R`import pandas as pd
import matplotlib.pyplot as plt

spend = pd.Series([118,132,141,145,152,158,163,167,171,174,178,182,185,188,192,195,199,203,207,212,
                   216,221,226,232,238,245,252,261,270,284,296,310,327,345,368,392,420,455,510,590])
counts = pd.cut(spend, bins=range(100, 650, 50), right=False).value_counts(sort=False)
print(counts)
print(spend.mean(), spend.median())   # 248.0 214.0

spend.plot(kind="hist", bins=range(100, 650, 50), edgecolor="black")
plt.xlabel("Weekly spending ($)"); plt.ylabel("Students"); plt.show()` }],

    ['case', {
      title: 'The customer satisfaction survey',
      text: R`A telco emails a satisfaction survey to all 200,000 of its customers. 9,400 reply. The report to the board says: "92% of customers are satisfied or very satisfied, up from 85% last year." The survey was sent in the week after a service outage, and this year, for the first time, customers who had closed their accounts in the previous month were removed from the mailing list. The question read: "How satisfied are you with our award-winning service?"`,
      questions: [
        'Identify every potential source of bias in this evidence.',
        'Is the comparison with last year valid? Why or why not?',
        'Design a better survey: sampling method, question wording and follow-up of non-respondents.',
        'What single chart would you show the board, and how would you label it?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Use the PPDAC cycle: problem, plan, data, analysis, conclusion.`,
      R`Samples estimate population parameters; random sampling protects against bias. Watch for selection, non-response, survivorship and response bias.`,
      R`Variables are categorical (nominal, ordinal) or numerical (discrete, continuous); data are cross-sectional, time series or panel; experiments support causal claims more easily than observational data.`,
      R`Frequency tables and bar charts for categories; histograms for numerical distributions; line charts for time series; scatter plots for relationships.`,
      R`Describe distributions by centre, spread, shape and outliers; right-skewed data have mean above median.`,
      R`Charts can mislead through axes, windows and design; data about people carry ethical and legal obligations.`,
    ]],
  ],
  exercises: [
    { type: 'mcq', level: 'Core', q: 'A bank reports the average credit score of all loan applicants it approved last year to estimate the average credit score of all Australians. What is the main problem?', options: ['The sample is too large', 'Selection bias: approved applicants are not representative of all Australians', 'Credit scores are categorical', 'There is no problem'], answer: 1, solution: R`Approved applicants were selected **because** of their credit scores, and people who do not apply are missing. The sample is systematically unrepresentative: **selection bias**.` },
    { type: 'mcq', level: 'Core', q: 'A company’s credit rating (AAA, AA, A, BBB, …) is which type of variable?', options: ['Nominal categorical', 'Ordinal categorical', 'Discrete numerical', 'Continuous numerical'], answer: 1, solution: R`Ratings have a natural order but unequal gaps between categories: **ordinal**.` },
    { type: 'mcq', level: 'Core', q: 'Monthly unemployment rates for Australia from 2000 to 2026 are an example of…', options: ['Cross-sectional data', 'Time-series data', 'Panel data', 'Experimental data'], answer: 1, solution: R`One unit (Australia) observed repeatedly over time: **time series**.` },
    { type: 'num', level: 'Core', q: R`In the student spending data, what percentage of students spend less than $250 a week?`, answer: 65, tol: 0.01, solution: R`The cumulative relative frequency at the $250 boundary is 0.650: \(4 + 13 + 9 = 26\) of 40 students, **65%**.` },
    { type: 'num', level: 'Core', q: R`A survey of 1,200 people finds 348 prefer contactless payment. What is the relative frequency, as a percentage?`, answer: 29, tol: 0.01, solution: R`\(348/1{,}200 = 0.29 = 29\%\).` },
    { type: 'num', level: 'Core', q: R`Using the \(\sqrt{n}\) guide, roughly how many histogram classes would you use for 225 observations?`, answer: 15, tol: 0.01, solution: R`\(\sqrt{225} = 15\) classes, at the top of the usual 5–15 range.` },
    { type: 'mcq', level: 'Core', q: 'A histogram has a long tail to the right. Which is most likely?', options: ['Mean below median', 'Mean above median', 'Mean equals median exactly', 'The data are categorical'], answer: 1, solution: R`In a **right-skewed** distribution a few large values pull the mean above the median, as with student spending (mean $248, median $214).` },
    { type: 'mcq', level: 'Stretch', q: 'An investment newsletter shows its model portfolio’s value on a chart that starts in March 2009 (the bottom of the global financial crisis). What is the main concern?', options: ['Survivorship bias', 'A cherry-picked starting point that flatters performance', 'Non-response bias', 'Nominal data'], answer: 1, solution: R`Starting at a market low makes almost any strategy look strong. Ask to see performance over several periods and relative to a benchmark.` },
    { type: 'long', level: 'Core', q: 'A retailer wants to know the average amount spent per customer visit across its 60 stores. Propose a sampling plan and explain how you would guard against bias.', answer: R`First define the population: all customer transactions (visits) across the 60 stores over a representative period, say three months, because spending varies by day of week and season. The retailer’s point-of-sale system likely records every transaction, so it may be possible to analyse the entire population of transactions (a census) rather than sample; if the data are too large or need manual review, sampling is appropriate.

A good plan is **stratified random sampling**: stratify by store type (for example, city, suburban and regional) and by day of week, then randomly sample transactions within each stratum, in proportion to each stratum’s share of transactions (or over-sample small strata and weight them). This guarantees every type of store and day is represented and improves precision.

To guard against bias: use the transaction database as the sampling frame rather than surveying customers in store (which would miss online or busy-time customers); include all hours and days; check for data errors such as refunds, voids and staff purchases and decide on consistent rules for them; avoid convenience samples such as a single flagship store; and document every decision so the analysis can be reproduced.`, solution: 'Look for a clearly defined population and period, a random (preferably stratified) method, a sampling frame, and specific bias controls.' },
  ],
  glossary: [
    ['Population', 'The whole group about which we want to draw conclusions.'],
    ['Sample', 'The subset of the population actually observed.'],
    ['Parameter', 'A number describing a population.'],
    ['Statistic', 'A number calculated from a sample to estimate a parameter.'],
    ['Stratified sampling', 'Random sampling within predefined subgroups.'],
    ['Survivorship bias', 'Distortion from observing only the units that survived a selection process.'],
    ['Histogram', 'A chart of class frequencies for a numerical variable, with adjacent bars.'],
    ['Right-skewed', 'A distribution with a long tail of large values; the mean exceeds the median.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'SEEING', 'MIT18650', 'ABS', 'PANDAS'],
};
