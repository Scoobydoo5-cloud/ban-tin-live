const R = String.raw;
export default {
  id: '26134-09', subject: '26134', title: 'Multiple regression and responsible use of evidence', mins: 85, level: 'Intermediate',
  summary: 'Regression with many explanatory variables: interpreting coefficients "holding other things constant", adjusted R², t and F tests, dummy variables, logs and interactions, multicollinearity, omitted-variable bias, Simpson’s paradox, correlation versus causation and how experiments and natural experiments identify causes, overfitting and out-of-sample validation, and a checklist for reporting evidence responsibly.',
  objectives: [
    'Interpret the coefficients of a multiple regression as partial effects',
    'Use t tests, the F test, R² and adjusted R² to evaluate a model',
    'Include categorical variables with dummies and interpret log and interaction terms',
    'Diagnose multicollinearity and explain omitted-variable bias and Simpson’s paradox',
    'Explain why correlation is not causation and how randomised and natural experiments identify causal effects',
    'Guard against overfitting with out-of-sample testing and report evidence responsibly',
  ],
  body: [
    ['h', 'Why more than one variable?'],
    ['p', R`House prices depend on size, bedrooms, location, parking and much more. Share returns depend on the market, company size, value and momentum. Sales depend on price, advertising, competitors and the season. Simple regression can capture only one driver at a time, and, as the case at the end of lecture 8 showed, leaving out important drivers can badly distort the one you include. **Multiple regression** estimates the effect of each variable **while holding the others constant**, the closest thing to a controlled experiment that observational data allow.`],
    ['math', R`y_i = \beta_0 + \beta_1 x_{1i} + \beta_2 x_{2i} + \dots + \beta_k x_{ki} + \varepsilon_i`, 'y equals beta zero plus beta one x one plus beta two x two, and so on up to beta k x k, plus an error.'],
    ['p', R`OLS again minimises the sum of squared residuals; with several variables the solution is written compactly in matrix form, \(\mathbf{b} = (\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{y}\), and software does the arithmetic. Your job is to specify a sensible model, interpret it and check it.`],

    ['h', 'A worked example: what drives house prices?'],
    ['p', R`We have data on 40 recent house sales in a city (illustrative data): price in thousands of dollars, floor area in square metres, number of bedrooms, distance to the CBD in kilometres, and a **dummy variable** equal to 1 if the house has off-street parking and 0 otherwise. The average house sold for $990,000, with 143 m² of floor area, 3.2 bedrooms and a 19 km distance to the CBD.`],
    ['table', {
      caption: 'Regression of price ($000) on house characteristics (n = 40)',
      head: ['Variable', 'Coefficient', 'Std error', 't', 'p-value'],
      rows: [
        ['Intercept', '398.2', '72.8', '5.47', '< 0.001'],
        ['Floor area (m²)', '4.47', '0.68', '6.54', '< 0.001'],
        ['Bedrooms', '49.5', '22.6', '2.19', '0.035'],
        ['Distance to CBD (km)', '−12.63', '1.77', '−7.14', '< 0.001'],
        ['Parking (1 = yes)', '72.4', '32.2', '2.25', '0.031'],
        ['R² = 0.911; adjusted R² = 0.901; standard error = 88.9; F = 90.0 (p < 0.001); 35 df', '', '', '', ''],
      ],
    }],
    ['h3', 'Reading the coefficients'],
    ['list', [
      R`**Floor area**: each extra square metre adds about **$4,470** to the price, holding bedrooms, distance and parking constant.`,
      R`**Bedrooms**: an extra bedroom **with the same floor area** (so smaller rooms) adds about $49,500.`,
      R`**Distance**: each kilometre further from the CBD reduces the price by about $12,600, other things equal.`,
      R`**Parking**: a house with parking sells for about $72,400 more than an otherwise similar house without it. A dummy coefficient is the average difference between the two groups, holding the other variables constant.`,
      R`**Intercept**: the predicted price when every variable is zero, which is meaningless here (no house has zero floor area). It anchors the line; do not interpret it literally.`,
    ]],
    ['p', R`A 120 m², 3-bedroom house 12 km from the CBD with parking is predicted to sell for \(398.2 + 4.473(120) + 49.46(3) - 12.63(12) + 72.43 \approx \$1{,}004\) thousand. Economists call this kind of model a **hedonic** regression: it prices a good as a bundle of characteristics. The ABS and many banks use hedonic methods to build house-price indexes that adjust for the changing mix of homes sold.`],
    ['h3', 'Overall fit and tests'],
    ['p', R`\(R^2\) always rises when a variable is added, even a useless one, so we use **adjusted R²**, which penalises extra variables: \(\bar R^2 = 1 - (1 - R^2)\frac{n-1}{n-k-1}\), here 0.901. The **F test** asks whether all slope coefficients are zero together; \(F = 90.0\) with p < 0.001 says the model as a whole explains price. Each **t test** asks whether one variable adds explanatory power given the others. All four are significant at 5% here.`],

    ['h', 'Omitted-variable bias'],
    ['p', R`Suppose we had regressed price on bedrooms alone. The result: each bedroom adds about **$163,300** (t = 6.36, R² = 0.52). In the full model, the bedroom coefficient is only $49,500. Why the difference? Bedrooms are strongly correlated with floor area (r = 0.85). In the short regression, the bedroom coefficient absorbs the effect of the bigger floor area that comes with more bedrooms. This is **omitted-variable bias**.`],
    ['math', R`\text{Bias in } b_1 \approx \beta_2 \times \frac{\operatorname{Cov}(x_1, x_2)}{\operatorname{Var}(x_1)}`, 'The bias in the coefficient on x one is approximately beta two times the covariance of x one and x two, over the variance of x one.'],
    ['p', R`The bias is large when the omitted variable matters (\(\beta_2\) large) **and** is correlated with the included one. Its sign is predictable: area raises price and is positively correlated with bedrooms, so omitting it biases the bedroom coefficient **upwards**. Much of the art of applied econometrics is thinking hard about what has been left out.`],
    ['key', R`A regression coefficient answers the question "how does y differ with x, holding constant the other variables **in the model**?" It says nothing about variables not in the model. Always ask what is missing, and in which direction it would bias the result.`],

    ['h', 'Dummies, logs and interactions'],
    ['list', [
      R`**Categorical variables with several categories** (for example, four states) need a dummy for every category **except one**, the reference group; each coefficient is the difference from the reference group. Including all four plus an intercept creates perfect collinearity (the "dummy variable trap").`,
      R`**Log transformations** change interpretation. In \(\ln(\text{price}) = \dots + 0.035 \times \text{bedrooms}\), an extra bedroom raises price by about \(e^{0.035} - 1 = 3.6\%\). In a log–log model, the coefficient is an elasticity. Logs also tame right-skewed variables such as prices and incomes.`,
      R`**Interactions** let one variable’s effect depend on another: adding \(\text{area} \times \text{distance}\) allows an extra square metre to be worth less far from the CBD.`,
    ]],

    ['h', 'Multicollinearity'],
    ['p', R`When explanatory variables are highly correlated with each other, the model struggles to separate their individual effects: standard errors inflate, coefficients become unstable and can even take implausible signs, although predictions may remain fine. The **variance inflation factor** \(VIF_j = 1/(1 - R_j^2)\), where \(R_j^2\) comes from regressing \(x_j\) on the other explanatory variables, measures the problem. Here area and bedrooms have VIFs of about 3.8 and 3.9: noticeable but acceptable (values above 5 to 10 are usually a concern). Remedies include collecting more data, combining variables, or dropping one of a pair that measure the same thing.`],

    ['h', 'Simpson’s paradox'],
    ['p', R`Aggregated data can point in the opposite direction from every subgroup. Two financial advisers are compared on the share of clients who met their savings goals.`],
    ['table', {
      caption: 'Share of clients meeting their goals',
      head: ['Client type', 'Adviser A', 'Adviser B'],
      rows: [['Conservative', '70 of 80 (87.5%)', '18 of 20 (90.0%)'], ['Aggressive', '10 of 20 (50.0%)', '44 of 80 (55.0%)'], ['All clients', '80 of 100 (80%)', '62 of 100 (62%)']],
    }],
    ['p', R`Adviser B does better with **both** types of client, yet worse overall, because B has mostly aggressive clients, whose goals are harder to meet. The client mix is a confounding variable. Whenever groups differ in composition, compare like with like, or control for the composition in a regression. Simpson’s paradox appears in fund performance comparisons, hospital league tables, loan default rates by branch and university admissions.`],

    ['h', 'Correlation, causation and how to get closer to causes'],
    ['p', R`Regression on observational data reveals associations. A coefficient is a **causal** effect only if, after controlling for the included variables, the explanatory variable is unrelated to everything else that affects \(y\), which is a strong assumption. The approaches that make causal claims credible are:`],
    ['list', [
      R`**Randomised controlled trials** (A/B tests): random assignment makes treatment and control groups alike on average in every respect, observed or not. Online businesses run thousands of these; banks test letters, offers and app designs this way.`,
      R`**Natural experiments**: a policy or event creates as-good-as-random variation, such as a rule that applies only above an income threshold, or a policy introduced in one state but not another.`,
      R`**Difference-in-differences**: compare the change over time in a treated group with the change in a similar untreated group, removing common trends.`,
      R`**Instrumental variables** and **regression discontinuity**: more advanced tools you will meet in econometrics.`,
    ]],
    ['note', R`The 2021 Nobel Prize in economics went to David Card, Joshua Angrist and Guido Imbens for showing how natural experiments can answer causal questions, such as the employment effect of minimum wages, that observational correlations cannot.`],

    ['h', 'Overfitting and out-of-sample testing'],
    ['p', R`With enough variables, a regression can fit any sample almost perfectly, including its noise. Such a model predicts new data badly: it is **overfitted**. The remedy is to judge models by **out-of-sample** performance: estimate the model on a training set and evaluate its prediction errors on a test set it has never seen, or use cross-validation. In finance, where signals are weak and noise is strong, an in-sample \(R^2\) or backtest is almost worthless without an honest out-of-sample test. This is also why simple, theory-motivated models often beat complicated ones.`],

    ['h', 'Responsible evidence: a checklist'],
    ['steps', [
      R`**Question and decision**: state what decision the analysis informs.`,
      R`**Data provenance**: where did the data come from, what is missing, and how were they cleaned?`,
      R`**Design**: is the sample random? Is there a control group? What could confound the result?`,
      R`**Effect sizes with uncertainty**: report coefficients with confidence intervals, not just stars or p-values.`,
      R`**Robustness**: do results survive other specifications, periods and samples, and out-of-sample tests?`,
      R`**Limitations and alternatives**: what else could explain the result?`,
      R`**Ethics and fairness**: could the model disadvantage groups (for example through variables that proxy for gender, race or disability)? Is personal information handled lawfully?`,
      R`**Reproducibility**: could someone else rerun the analysis from your files and get the same numbers?`,
    ]],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel’s Regression tool and LINEST handle several explanatory variables placed in adjacent columns.', src: R`Data > Data Analysis > Regression
  Input Y Range: price column
  Input X Range: area, beds, dist, park (adjacent columns)
  Tick Labels, Residuals
=LINEST(price, area:park, TRUE, TRUE)   array output: coefficients (in reverse order), SEs, R², F, df, SS
Dummy variable:  =IF(C2="Yes",1,0)
VIF for area:    =1/(1-RSQ-of-area-on-others)  (run a regression of area on the other X variables)` }],
    ['code', { lang: 'python', say: 'The Python code fits the hedonic model with the statsmodels formula interface, including a categorical variable, and checks out-of-sample error.', src: R`import pandas as pd
import statsmodels.formula.api as smf

df = pd.read_csv("houses.csv")          # price, area, beds, dist, parking ('Yes'/'No'), state
model = smf.ols("price ~ area + beds + dist + C(parking) + C(state)", data=df).fit(cov_type="HC1")
print(model.summary())                  # robust (heteroscedasticity-consistent) standard errors

# out-of-sample check
train = df.sample(frac=0.7, random_state=1); test = df.drop(train.index)
m = smf.ols("price ~ area + beds + dist + C(parking)", data=train).fit()
rmse = ((test.price - m.predict(test)) ** 2).mean() ** 0.5
print(rmse)` }],

    ['case', {
      title: 'Does the loyalty program work?',
      text: R`A supermarket chain finds that members of its loyalty program spend 38% more per year than non-members, and a regression controlling for household size and postcode still shows a 25% difference (p < 0.001). The marketing team concludes that the program raises spending by 25% and proposes to double its budget.`,
      questions: [
        'Why might the 25% overstate the causal effect of the program? Name at least two confounders or selection effects.',
        'Design a randomised experiment to measure the true effect of the program’s offers.',
        'If an experiment is impossible, suggest a natural experiment or difference-in-differences design.',
        'Which privacy and fairness issues arise from using loyalty-card data?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Multiple regression coefficients are partial effects, holding the other included variables constant.`,
      R`Use adjusted R² and the F test for overall fit; t tests for individual variables; dummies for categories; logs for percentage effects.`,
      R`Omitted variables correlated with included ones bias coefficients; multicollinearity inflates standard errors (check VIFs).`,
      R`Simpson’s paradox shows aggregated comparisons can mislead; compare like with like.`,
      R`Causal claims need randomisation or credible natural experiments; regression alone rarely suffices.`,
      R`Judge models out of sample, report effect sizes with uncertainty, and check ethics and reproducibility.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`Using the house-price model, what is the predicted price ($000) of a 150 m², 4-bedroom house 20 km from the CBD without parking? Use coefficients 398.2, 4.473, 49.46, −12.63, 72.43. (Nearest thousand.)`, answer: 1014, tol: 1.5, solution: R`\(398.2 + 4.473(150) + 49.46(4) - 12.63(20) + 72.43(0) = 398.2 + 670.95 + 197.84 - 252.6 = 1{,}014.4\), so about **$1,014 thousand**.` },
    { type: 'num', level: 'Core', q: R`A regression with 3 explanatory variables and 50 observations has R² = 0.60. What is the adjusted R²? (Three decimals.)`, answer: 0.574, tol: 0.001, solution: R`\(\bar R^2 = 1 - 0.40 \times 49/46 = 1 - 0.4261 = 0.574\).` },
    { type: 'num', level: 'Core', q: R`Regressing one explanatory variable on the others gives R² = 0.90. What is its VIF?`, answer: 10, tol: 0.01, solution: R`\(VIF = 1/(1 - 0.90) = 10\): serious multicollinearity.` },
    { type: 'num', level: 'Core', q: R`In a log–linear model, the coefficient on a "has pool" dummy is 0.08. By approximately what percentage does a pool raise price? (Two decimals.)`, answer: 8.33, tol: 0.02, solution: R`\(e^{0.08} - 1 = 8.33\%\). For small coefficients, the coefficient itself (8%) is a close approximation.` },
    { type: 'mcq', level: 'Core', q: 'In the house model, what does the parking coefficient of 72.4 mean?', options: ['Parking spaces cost $72,400 to build', 'Houses with parking sell for about $72,400 more than otherwise similar houses without it', '72.4% of houses have parking', 'Parking explains 72.4% of price variation'], answer: 1, solution: R`A dummy coefficient is the average price difference between the two groups, **holding the other variables constant**.` },
    { type: 'mcq', level: 'Core', q: 'Regressing price on bedrooms alone gives a coefficient of $163,300; adding floor area reduces it to $49,500. This illustrates…', options: ['Heteroscedasticity', 'Omitted-variable bias', 'Simpson’s paradox in categories', 'A Type I error'], answer: 1, solution: R`Floor area affects price and is correlated with bedrooms; omitting it loads its effect onto bedrooms: **omitted-variable bias**.` },
    { type: 'mcq', level: 'Core', q: 'A region variable has four categories. How many dummy variables should a regression with an intercept include?', options: ['1', '3', '4', '5'], answer: 1, solution: R`Include **three** dummies; the omitted category is the reference group. Including all four with an intercept causes perfect collinearity.` },
    { type: 'mcq', level: 'Stretch', q: 'Which design gives the most credible estimate of the causal effect of a new app feature on customer retention?', options: ['Compare retention of users who chose to use the feature with those who did not', 'Randomly offer the feature to half of users and compare retention', 'Regress retention on feature use with many controls', 'Survey users about whether the feature matters'], answer: 1, solution: R`**Random assignment** makes the groups comparable in all respects, so differences can be attributed to the feature. Self-selection and observational regressions leave room for confounding.` },
    { type: 'long', level: 'Stretch', q: 'Explain Simpson’s paradox using the adviser example, and describe how a regression with a dummy for client type would change the comparison.', answer: R`Simpson’s paradox occurs when a relationship that holds within every subgroup reverses when the groups are combined. Adviser B has a higher success rate with conservative clients (90.0% versus 87.5%) and with aggressive clients (55% versus 50%), yet a lower overall rate (62% versus 80%). The reason is composition: 80% of B’s clients are aggressive, whose goals are harder to meet, while 80% of A’s are conservative. The overall rate mostly reflects client mix, not adviser skill. Client type is a confounder: it is related both to which adviser a client has and to the chance of success.

A regression of success (1 or 0) on an adviser dummy alone would reproduce the misleading 18-point gap in A’s favour. Adding a dummy for client type compares the advisers within client type, effectively weighting each adviser’s performance by the same mix. The adviser coefficient would then reflect B’s advantage of about 2.5 to 5 percentage points (in a linear probability model, a weighted average of the within-group differences). The general lesson is to identify variables that affect the outcome and differ across the groups being compared, and to control for them, while remembering that unobserved confounders may remain.`, solution: 'Look for the reversal explanation, identification of client mix as the confounder, and the effect of adding a control dummy.' },
  ],
  glossary: [
    ['Partial effect', 'The change in y associated with one variable, holding the other included variables constant.'],
    ['Adjusted R²', 'R² penalised for the number of explanatory variables.'],
    ['Dummy variable', 'A 0/1 variable representing a category.'],
    ['Multicollinearity', 'High correlation among explanatory variables, inflating standard errors.'],
    ['Omitted-variable bias', 'Bias from leaving out a variable that affects y and is correlated with an included variable.'],
    ['Simpson’s paradox', 'A trend within groups that reverses when groups are combined.'],
    ['Randomised controlled trial', 'An experiment that assigns treatment at random to identify causal effects.'],
    ['Overfitting', 'Fitting noise in a sample so the model predicts new data poorly.'],
  ],
  resources: ['OS_STATS', 'MIT18650', 'STATSMODELS', 'SKLEARN', 'NBER', 'CORE', 'book:WOOL'],
};
