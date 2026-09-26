const R = String.raw;
const mkt = [2.1, -3.4, 1.5, 4.2, -1.8, 0.6, -2.5, 3.1];
const bank = [3.4, -2.6, -0.9, 5.0, 0.8, 2.6, -4.1, 1.4];
const b0 = 0.2768, b1 = 0.8910;
export default {
  id: '26134-08', subject: '26134', title: 'Simple linear regression', mins: 80, level: 'Intermediate',
  summary: 'Fitting and interpreting a straight-line relationship: the regression model, ordinary least squares, slope and intercept, residuals and R², the standard error of the regression, t tests and confidence intervals for the slope, confidence versus prediction intervals, the assumptions and how to check them, and the classic finance application: estimating a share’s beta.',
  objectives: [
    'Write down the simple linear regression model and interpret its parameters',
    'Compute the least-squares slope and intercept and the fitted values and residuals',
    'Decompose variation into SST, SSR and SSE and compute and interpret R² and the standard error of the regression',
    'Test the significance of the slope and build a confidence interval for it',
    'Distinguish a confidence interval for the mean response from a prediction interval for a new observation',
    'Check the regression assumptions with residuals, and estimate a share’s beta with the market model',
  ],
  body: [
    ['h', 'From correlation to a model'],
    ['p', R`Correlation told us that bank-share returns and market returns move together (r = 0.80). Regression goes further: it gives an **equation** that predicts one variable from another and quantifies how much \(y\) changes, on average, when \(x\) changes by one unit. It is the most widely used statistical tool in business and finance: estimating betas, cost functions, demand elasticities, the effect of advertising, and the drivers of house prices.`],
    ['math', R`y_i = \beta_0 + \beta_1 x_i + \varepsilon_i`, 'y i equals beta zero plus beta one times x i plus epsilon i.'],
    ['defs', [
      ['y (dependent variable)', 'The outcome we want to explain or predict: here the bank’s monthly return.'],
      ['x (explanatory variable)', 'The variable used to explain y: here the market’s monthly return.'],
      ['β₀ (intercept)', 'The expected value of y when x = 0.'],
      ['β₁ (slope)', 'The expected change in y for a one-unit increase in x.'],
      ['ε (error term)', 'Everything else that affects y: random, with mean zero.'],
    ]],

    ['h', 'Ordinary least squares'],
    ['p', R`Among all possible lines, **ordinary least squares (OLS)** chooses the one that minimises the sum of squared vertical distances between the observations and the line (the squared **residuals**). Calculus gives closed-form answers:`],
    ['math', R`b_1 = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sum (x_i - \bar x)^2} = \frac{S_{xy}}{S_{xx}} = r\,\frac{s_y}{s_x} \qquad b_0 = \bar y - b_1\bar x`, 'The slope estimate equals the sum of cross-products of deviations over the sum of squared x deviations, which also equals r times s y over s x. The intercept equals y bar minus b one times x bar.'],
    ['example', {
      title: 'Estimating the bank’s beta',
      setup: R`Using the eight months of returns from lecture 2: \(\bar x = 0.475\), \(\bar y = 0.700\), \(S_{xy} = 47.68\), \(S_{xx} = 53.515\).`,
      steps: [
        R`Slope: \(b_1 = 47.68/53.515 = 0.891\).`,
        R`Intercept: \(b_0 = 0.700 - 0.891 \times 0.475 = 0.277\).`,
        R`Fitted line: \(\hat y = 0.277 + 0.891x\).`,
      ],
      answer: R`When the market return is 1 percentage point higher, the bank’s return is on average 0.89 points higher: the bank’s **beta** is about 0.89, slightly less sensitive to the market than average. The intercept, 0.28% a month, is the bank’s estimated **alpha**, its average return when the market return is zero. In finance this equation is called the **market model**; its slope is the beta used in the CAPM, which you will study in Fundamentals of Business Finance.`,
    }],
    ['chart', {
      caption: 'The fitted regression line: bank return = 0.277 + 0.891 × market return',
      x: [-5, 5], y: [-6, 7], xl: 'Market return (%)', yl: 'Bank return (%)',
      series: [{ label: 'Fitted line', color: '#e9b85c', pts: [[-5, b0 + b1 * -5], [5, b0 + b1 * 5]] }],
      marks: mkt.map((m, i) => ({ x: m, y: bank[i], color: '#5fe3e0', r: 6 })),
    }],

    ['h', 'How well does the line fit?'],
    ['p', R`Each observation’s deviation from the mean splits into a part explained by the line and a residual part:`],
    ['math', R`\underbrace{\sum (y_i - \bar y)^2}_{SST} = \underbrace{\sum (\hat y_i - \bar y)^2}_{SSR} + \underbrace{\sum (y_i - \hat y_i)^2}_{SSE} \qquad R^2 = \frac{SSR}{SST} = 1 - \frac{SSE}{SST}`, 'The total sum of squares equals the regression sum of squares plus the error sum of squares. R squared equals SSR over SST, or one minus SSE over SST.'],
    ['p', R`For the bank: \(SST = 66.38\), \(SSR = 42.48\), \(SSE = 23.90\), so \(R^2 = 42.48/66.38 = 0.64\). The market explains 64% of the variation in the bank’s monthly returns; the other 36% is bank-specific (idiosyncratic) risk. In simple regression \(R^2 = r^2 = 0.80^2\). In finance this split is meaningful: the \(R^2\) is the share of a stock’s risk that is systematic, and \(1 - R^2\) is the share that diversification can remove (lecture 7 of Financial Literacy).`],
    ['p', R`The **standard error of the regression** is the typical size of a residual: \(s_e = \sqrt{SSE/(n-2)} = \sqrt{23.90/6} = 1.996\%\). We divide by \(n - 2\) because two parameters were estimated. For the bank, predictions from the market return typically miss by about 2 percentage points a month.`],
    ['warn', R`A high \(R^2\) does not mean the model is correct or causal, and a low \(R^2\) does not make a slope useless. Individual stock returns typically have \(R^2\) of 0.2 to 0.6 against the market, yet their betas are essential for pricing. Trending time series often produce very high, meaningless \(R^2\) (spurious regression, studied in Time Series Econometrics).`],

    ['h', 'Inference about the slope'],
    ['p', R`Our \(b_1\) is an estimate from eight months; a different period would give a different value. Under the standard assumptions (below), the slope estimate has standard error:`],
    ['math', R`SE(b_1) = \frac{s_e}{\sqrt{S_{xx}}} \qquad t = \frac{b_1 - \beta_1^{(0)}}{SE(b_1)} \sim t_{n-2} \qquad b_1 \pm t_{\alpha/2,\,n-2}\,SE(b_1)`, 'The standard error of the slope equals s e over the square root of S x x. The t statistic equals the slope minus its hypothesised value over the standard error, with n minus two degrees of freedom. The confidence interval is b one plus or minus the t critical value times the standard error.'],
    ['steps', [
      R`\(SE(b_1) = 1.996/\sqrt{53.515} = 0.273\).`,
      R`Test \(H_0: \beta_1 = 0\) (no relationship): \(t = 0.891/0.273 = 3.27\), with 6 df, p-value 0.017. Reject: the market return helps explain the bank’s return.`,
      R`95% interval for beta: \(0.891 \pm 2.447 \times 0.273\), that is **0.22 to 1.56**.`,
      R`Test \(H_0: \beta_1 = 1\) (the bank is as risky as the market): \(t = (0.891 - 1)/0.273 = -0.40\). No evidence the beta differs from 1.`,
      R`The intercept (alpha) has \(t = 0.277/0.717 = 0.39\), p = 0.71: no evidence of abnormal performance.`,
    ]],
    ['p', R`With only eight observations, the interval for beta is enormous, from a defensive 0.22 to an aggressive 1.56. That is why practitioners estimate betas from at least 60 monthly or 104 weekly returns, and why commercial beta services and Aswath Damodaran’s industry averages "shrink" individual estimates towards 1 or use industry peers. The \(t\) test of the slope is equivalent to an F test of the whole regression here (\(F = t^2 = 10.7\)).`],

    ['h', 'Predicting: two kinds of interval'],
    ['p', R`Suppose the market falls 5% next month. The predicted bank return is \(0.277 + 0.891 \times (-5) = -4.18\%\). How uncertain is that?`],
    ['list', [
      R`A **confidence interval for the mean response** covers the **average** bank return in all months when the market falls 5%: \(\hat y \pm t\,s_e\sqrt{1/n + (x_0 - \bar x)^2/S_{xx}}\) = −8.22% to −0.14%.`,
      R`A **prediction interval** covers a **single** month’s return, adding the month’s own randomness: \(\hat y \pm t\,s_e\sqrt{1 + 1/n + (x_0 - \bar x)^2/S_{xx}}\) = −10.52% to +2.16%.`,
    ]],
    ['p', R`Prediction intervals are always wider, and both widen as \(x_0\) moves away from \(\bar x\): extrapolating beyond the range of the data is risky. For risk management, the prediction interval is usually the relevant one.`],

    ['h', 'Assumptions and diagnostics'],
    ['p', R`OLS inference relies on four assumptions, often remembered as **LINE**:`],
    ['list', [
      R`**Linearity**: the average of \(y\) is a straight-line function of \(x\).`,
      R`**Independence**: errors are independent of each other (often violated in time series: see autocorrelation in Time Series Econometrics).`,
      R`**Normality**: errors are approximately normal (matters most in small samples).`,
      R`**Equal variance** (homoscedasticity): the spread of errors does not change with \(x\). Financial data often show heteroscedasticity: volatility rises in crises.`,
    ]],
    ['p', R`The main diagnostic tool is a **residual plot**: residuals against fitted values or against \(x\). A healthy plot is a shapeless cloud around zero. A curve suggests non-linearity; a funnel suggests unequal variance; a single point far away suggests an outlier; and points with extreme \(x\) values have high **leverage** and can pull the line strongly. Remedies include transforming variables (logs), robust standard errors, or better models.`],
    ['chart', {
      caption: 'Residuals from the beta regression: no obvious pattern, but eight points is very little evidence',
      x: [-5, 5], y: [-3.5, 3.5], xl: 'Market return (%)', yl: 'Residual (%)', h: 240,
      series: [{ color: '#888888', dash: '4 4', pts: [[-5, 0], [5, 0]] }],
      marks: mkt.map((m, i) => ({ x: m, y: +(bank[i] - (b0 + b1 * m)).toFixed(3), color: '#ff7ab6', r: 6 })),
    }],

    ['h', 'Other business applications'],
    ['list', [
      R`**Cost estimation**: regress total cost on output to separate fixed cost (intercept) from variable cost per unit (slope), as management accountants do.`,
      R`**Marketing**: regress sales on advertising spend (with care: advertising is often increased when sales are expected to rise, which biases the slope).`,
      R`**Valuation**: regress price–earnings ratios on expected growth across comparable companies to judge whether a stock looks cheap.`,
      R`**Elasticities**: regress log quantity on log price (lecture 3 of Economics).`,
    ]],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel estimates the regression with SLOPE, INTERCEPT, RSQ, STEYX and LINEST, or with the Regression tool in the Data Analysis pack.', src: R`Slope (beta)          =SLOPE(bank, market)          → 0.891
Intercept (alpha)     =INTERCEPT(bank, market)      → 0.277
R squared             =RSQ(bank, market)            → 0.640
Std error of regr.    =STEYX(bank, market)          → 1.996
Full output           =LINEST(bank, market, TRUE, TRUE)   (array: coefficients, SEs, R², F, df, SS)
Prediction            =FORECAST.LINEAR(-5, bank, market)  → -4.18
Data > Data Analysis > Regression  (tick Residuals and Residual Plots)` }],
    ['code', { lang: 'python', say: 'The Python code fits the regression with statsmodels and prints the full summary, including prediction intervals.', src: R`import numpy as np
import statsmodels.api as sm

market = np.array([2.1, -3.4, 1.5, 4.2, -1.8, 0.6, -2.5, 3.1])
bank   = np.array([3.4, -2.6, -0.9, 5.0, 0.8, 2.6, -4.1, 1.4])
model = sm.OLS(bank, sm.add_constant(market)).fit()
print(model.summary())                     # b0 0.277, b1 0.891, R2 0.640
pred = model.get_prediction(np.array([[1, -5.0]]))
print(pred.summary_frame(alpha=0.05))      # mean CI and prediction interval (obs_ci)` }],

    ['case', {
      title: 'A beta for a Vietnamese bank',
      text: R`An analyst wants the beta of a large listed Vietnamese bank against the VN-Index to estimate its cost of equity. She has two options: 12 monthly returns from the past year, or 60 monthly returns from the past five years. The past year included an unusual property-sector crisis that hit bank shares particularly hard. The stock also has foreign-ownership limits that sometimes cause its price to trade at a premium.`,
      questions: [
        'Which sample would you use, and why? Discuss the trade-off between precision and relevance.',
        'What would you expect the standard error of beta to look like with 12 versus 60 observations?',
        'What diagnostic checks would you perform on the regression residuals?',
        'Why might you compare the estimate with the average beta of Vietnamese banks, and how might you combine them?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Model: \(y = \beta_0 + \beta_1 x + \varepsilon\). OLS: \(b_1 = S_{xy}/S_{xx}\), \(b_0 = \bar y - b_1\bar x\).`,
      R`\(R^2 = SSR/SST\) is the share of variation explained; \(s_e = \sqrt{SSE/(n-2)}\) is the typical residual.`,
      R`Test the slope with \(t = b_1/SE(b_1)\), \(SE(b_1) = s_e/\sqrt{S_{xx}}\); intervals use \(t_{n-2}\).`,
      R`Prediction intervals for individual outcomes are wider than confidence intervals for the mean response.`,
      R`Check LINE assumptions with residual plots; watch outliers, leverage and time-series dependence.`,
      R`The market-model slope is a stock’s beta; with few observations it is estimated very imprecisely.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`For advertising spend (x, $000) and sales (y, $000) over 10 months: \(\bar x = 21.5\), \(\bar y = 161.4\), \(S_{xy} = 2{,}041\), \(S_{xx} = 588.5\). What is the slope? (Three decimals.)`, answer: 3.468, tol: 0.002, solution: R`\(b_1 = 2{,}041/588.5 = 3.468\): each extra $1,000 of advertising is associated with about $3,468 more sales.` },
    { type: 'num', level: 'Core', q: R`For the same data, what is the intercept? (Two decimals.)`, answer: 86.84, tol: 0.02, solution: R`\(b_0 = 161.4 - 3.468 \times 21.5 = 86.84\) (using the unrounded slope gives 86.835).` },
    { type: 'num', level: 'Core', q: R`The advertising regression has SSE = 659.93 and n = 10. What is the standard error of the regression? (Two decimals.)`, answer: 9.08, tol: 0.01, solution: R`\(s_e = \sqrt{659.93/8} = \sqrt{82.49} = 9.08\).` },
    { type: 'num', level: 'Core', q: R`Using \(s_e = 9.08\) and \(S_{xx} = 588.5\), what is the standard error of the slope? (Three decimals.)`, answer: 0.374, tol: 0.002, solution: R`\(SE(b_1) = 9.08/\sqrt{588.5} = 9.08/24.26 = 0.374\). The t statistic is \(3.468/0.374 = 9.26\).` },
    { type: 'num', level: 'Core', q: R`A regression has SST = 250 and SSE = 90. What is R²?`, answer: 0.64, tol: 0.001, solution: R`\(R^2 = 1 - 90/250 = 0.64\).` },
    { type: 'num', level: 'Stretch', q: R`A stock’s beta is estimated at 1.30 with a standard error of 0.12 from 60 monthly returns. What is the t statistic for testing whether beta equals 1? (Two decimals.)`, answer: 2.5, tol: 0.01, solution: R`\(t = (1.30 - 1)/0.12 = 2.50\), significant at 5% with 58 df: evidence that the stock is riskier than the market.` },
    { type: 'mcq', level: 'Core', q: 'In the bank regression, R² = 0.64. What is the best interpretation?', options: ['The bank’s beta is 0.64', 'The market explains 64% of the variation in the bank’s monthly returns', '64% of months the bank beats the market', 'The prediction error is 64%'], answer: 1, solution: R`\(R^2\) is the share of the variation in \(y\) explained by the regression: **64%** is systematic, market-related variation.` },
    { type: 'mcq', level: 'Core', q: 'Why is a prediction interval wider than a confidence interval for the mean response at the same x?', options: ['It uses a larger t value', 'It includes the random variation of an individual observation around the mean', 'It ignores the slope', 'It assumes non-normal errors'], answer: 1, solution: R`A prediction interval must cover an **individual** outcome, which varies around the mean by \(s_e\), in addition to the uncertainty about the mean itself.` },
    { type: 'mcq', level: 'Stretch', q: 'A residual plot shows residuals fanning out as fitted values increase. Which assumption is violated?', options: ['Linearity', 'Independence', 'Equal variance (homoscedasticity)', 'The intercept is zero'], answer: 2, solution: R`A funnel shape indicates **heteroscedasticity**. Coefficients remain unbiased, but the usual standard errors are wrong; use robust standard errors or transform the variables.` },
    { type: 'long', level: 'Stretch', q: 'An analyst regresses a company’s sales on its advertising spending and finds a large, significant slope. Explain two reasons why the slope may overstate the causal effect of advertising, and suggest how to get a better estimate.', answer: R`First, **reverse causality or simultaneity**: firms often set advertising budgets as a share of expected sales, or increase advertising in seasons when demand is naturally high (for example before Christmas). Then high sales cause, or coincide with, high advertising, and the regression attributes to advertising some of the sales that would have happened anyway, biasing the slope upwards.

Second, **omitted variables**: factors that raise both advertising and sales, such as a new product launch, a competitor’s exit, price cuts or a general economic upturn, are absorbed into the advertising coefficient if they are not included in the regression. The slope then captures their effect too.

Better estimates come from designs that break these links: a randomised experiment (for example, randomly varying advertising across regions or online audiences, as in A/B tests), natural experiments (a TV blackout in some areas), or regressions that control for seasonality, prices and product launches and use variation that is plausibly unrelated to demand. Multiple regression (next lecture) addresses omitted variables partially; randomisation addresses them fully.`, solution: 'Look for simultaneity/reverse causality, omitted-variable bias with examples, and credible remedies (randomisation, controls, natural experiments).' },
  ],
  glossary: [
    ['Ordinary least squares', 'The method that chooses coefficients to minimise the sum of squared residuals.'],
    ['Residual', 'The difference between an observed value and its fitted value.'],
    ['R²', 'The share of the variation in y explained by the regression.'],
    ['Standard error of the regression', 'The typical size of a residual, √(SSE/(n − 2)).'],
    ['Prediction interval', 'A range for an individual future observation at a given x.'],
    ['Heteroscedasticity', 'Error variance that changes with the level of x or the fitted values.'],
    ['Leverage', 'The potential of an observation with an extreme x value to influence the fitted line.'],
    ['Market model', 'A regression of a stock’s return on the market return; its slope is beta.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'MIT18650', 'STATSMODELS', 'DAMO_DATA', 'FRENCH', 'book:WOOL'],
};
