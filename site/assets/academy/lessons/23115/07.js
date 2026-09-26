const R = String.raw;
export default {
  id: '23115-07', subject: '23115', title: 'Measuring the macroeconomy: GDP, inflation, unemployment', mins: 70, level: 'Foundation',
  summary: 'The three numbers that move markets: how GDP is measured and what it misses, nominal versus real and the GDP deflator, how the CPI is built and why underlying inflation matters, how the ABS measures unemployment, participation and underemployment, and how to read the business cycle, using Australia’s latest official data.',
  objectives: [
    'Define GDP and explain the expenditure, income and production approaches',
    'Convert nominal GDP to real GDP, compute the GDP deflator and annualise quarterly growth',
    'Explain how the CPI is constructed, compute a weighted inflation rate, and distinguish headline from underlying inflation',
    'Explain the costs of inflation and why central banks target low, stable inflation',
    'Calculate the unemployment rate, participation rate and employment-to-population ratio, and classify types of unemployment',
    'Read the business cycle and interpret the latest Australian macroeconomic data like an analyst',
  ],
  body: [
    ['h', 'Why these numbers matter to finance'],
    ['p', R`On the day the ABS releases the monthly Consumer Price Index, the Australian dollar, bond yields and bank shares can move within seconds. GDP releases change forecasts of company earnings; the monthly labour force survey changes expectations of RBA interest-rate decisions. Macroeconomics begins with measurement: before we can explain booms, recessions and inflation, we must know exactly what the headline numbers mean, how they are built and where they can mislead.`],

    ['h', 'Gross domestic product'],
    ['p', R`**Gross domestic product (GDP)** is the market value of all **final** goods and services produced **within a country** in a given period. Each word matters. "Market value" lets us add apples and haircuts using prices. "Final" excludes intermediate goods (the flour in bread is counted once, as part of the bread). "Within a country" means GDP counts production on Australian soil, whoever owns the factory. "In a given period" means GDP is a flow, measured per quarter or per year.`],
    ['h3', 'Three ways to measure the same thing'],
    ['p', R`Every dollar spent on final output is received as income by someone and represents value added somewhere in production. So GDP can be measured three ways, which in principle give the same answer (in practice the ABS reconciles small statistical discrepancies).`],
    ['list', [
      R`**Expenditure approach**: \(GDP = C + I + G + (X - M)\): household consumption, private investment (business equipment, buildings and new housing), government consumption and investment, plus exports minus imports.`,
      R`**Income approach**: compensation of employees + gross operating surplus of businesses + gross mixed income of unincorporated businesses + taxes less subsidies on production and imports.`,
      R`**Production approach**: the sum of **value added** by every industry, where value added is the value of output minus the value of intermediate inputs.`,
    ]],
    ['math', R`GDP = C + I + G + (X - M)`, 'GDP equals consumption plus investment plus government spending plus exports minus imports.'],
    ['p', R`In Australia, household consumption is the largest component, at around half of GDP. Imports are subtracted not because imports are bad, but because the imported part of spending was already counted in C, I or G and was not produced in Australia.`],
    ['warn', R`Buying existing shares, a second-hand car or an existing house is **not** investment in the GDP sense and adds nothing to GDP (apart from any fees and commissions, which are services). Economic "investment" means creating new capital. Transfers such as pensions are also excluded from G, because they do not pay for production.`],

    ['h', 'Nominal and real GDP'],
    ['p', R`Nominal GDP values output at **current** prices, so it rises with both more production and higher prices. **Real GDP** values output at the prices of a base period, isolating the change in quantities. The ABS publishes real GDP as **chain volume measures**, which update the base prices every year to avoid distortions when relative prices change, but the idea is the same.`],
    ['example', {
      title: 'A two-good economy',
      setup: R`In year 1 (the base year) an economy produces 100 coffees at $4 and 10 laptops at $1,000. In year 2 it produces 110 coffees at $4.40 and 11 laptops at $1,050.`,
      steps: [
        R`Nominal GDP year 1: \(100 \times 4 + 10 \times 1{,}000 = \$10{,}400\).`,
        R`Nominal GDP year 2: \(110 \times 4.40 + 11 \times 1{,}050 = \$12{,}034\), a nominal growth rate of 15.7%.`,
        R`Real GDP year 2 at year-1 prices: \(110 \times 4 + 11 \times 1{,}000 = \$11{,}440\), a real growth rate of 10.0%.`,
        R`GDP deflator year 2: \(12{,}034/11{,}440 \times 100 = 105.2\): the average price of domestic output rose 5.2%.`,
      ],
      answer: R`Nominal growth (15.7%) ≈ real growth (10.0%) + inflation measured by the deflator (5.2%), exactly: \(1.157 = 1.100 \times 1.052\).`,
    }],
    ['math', R`\text{GDP deflator} = \frac{\text{Nominal GDP}}{\text{Real GDP}} \times 100 \qquad (1 + g_{\text{nominal}}) = (1 + g_{\text{real}})(1 + \pi_{\text{deflator}})`, 'The GDP deflator equals nominal GDP over real GDP times one hundred. One plus nominal growth equals one plus real growth times one plus deflator inflation.'],
    ['h3', 'Reading the latest Australian GDP release'],
    ['p', R`In the **June quarter 2026**, Australia’s real GDP rose **0.4%** (seasonally adjusted chain volume) and **2.1%** over the year. Nominal GDP rose 0.8% in the quarter. Real GDP **per capita** was flat in the quarter and up only 0.7% over the year, because population growth accounted for much of the aggregate growth. The terms of trade fell 1.6%, and the household saving ratio edged up to 6.5% (source: ABS National Accounts, released 2 September 2026, high confidence).`],
    ['p', R`Quarterly growth rates are often annualised to compare with annual figures: \((1.004)^4 - 1 = 1.6\%\) a year. Notice that annualising the latest quarter (1.6%) and the through-the-year figure (2.1%) tell slightly different stories: growth slowed in recent quarters. Analysts watch both.`],
    ['key', R`Always ask whether a growth number is nominal or real, aggregate or per capita, quarterly or annual, and seasonally adjusted or original. Most misleading economic commentary confuses one of these.`],
    ['h3', 'What GDP misses'],
    ['list', [
      R`**Non-market production**: unpaid care, housework and volunteering, which are large.`,
      R`**The informal economy**: cash work and illegal activity, which are significant in many countries including Vietnam.`,
      R`**Distribution**: GDP per capita says nothing about how income is shared.`,
      R`**Environmental costs and depletion**: mining a non-renewable deposit adds to GDP while running down natural capital.`,
      R`**Leisure and wellbeing**: working longer hours raises GDP but not necessarily welfare. The Australian Government’s "Measuring What Matters" framework adds wellbeing indicators to complement GDP.`,
      R`**Income sent abroad**: GDP counts production in Australia even when profits go to foreign owners. **Gross national income (GNI)** adjusts for this; Australia’s GNI is below its GDP because of net income payments to foreign investors. For countries with large foreign-owned sectors, such as Vietnam’s export manufacturing, the gap can be important.`,
    ]],

    ['h', 'Inflation and the Consumer Price Index'],
    ['p', R`**Inflation** is a sustained increase in the general level of prices. Australia’s main measure is the **Consumer Price Index (CPI)**, which the ABS now publishes as a complete monthly measure. The CPI tracks the cost of a fixed basket of goods and services bought by households, weighted by their share in household spending, and expresses it as an index relative to a base period.`],
    ['math', R`\pi_t = \frac{CPI_t - CPI_{t-1}}{CPI_{t-1}} \qquad \text{and, for a basket,}\quad \pi \approx \sum_i w_i\,\pi_i`, 'Inflation equals the change in the CPI over its previous value. For a basket, inflation is approximately the sum of each weight times that item’s inflation.'],
    ['example', {
      title: 'A simplified CPI',
      setup: R`Suppose the basket has four groups: housing (weight 30%), food (20%), transport (15%) and everything else (35%). Over a year, housing prices rise 5.0%, food 3.2%, transport fall 1.0% and everything else rises 2.5%.`,
      steps: [
        R`Weighted contributions: housing \(0.30 \times 5.0 = 1.50\); food \(0.20 \times 3.2 = 0.64\); transport \(0.15 \times (-1.0) = -0.15\); other \(0.35 \times 2.5 = 0.875\).`,
        R`CPI inflation \(= 1.50 + 0.64 - 0.15 + 0.875 = 2.87\%\).`,
      ],
      answer: R`Inflation of about 2.9%, with housing contributing more than half. The ABS publishes exactly this kind of contribution breakdown, and analysts read it closely.`,
    }],
    ['p', R`In the **12 months to July 2026**, the CPI rose **3.5%**, down from 3.8% in the 12 months to June. The largest contributors were housing (+5.0%), food and non-alcoholic beverages (+3.2%) and recreation and culture (+2.6%). **Trimmed mean** inflation was 3.6% (source: ABS, released 26 August 2026, high confidence). Both are above the RBA’s target band of **2–3%**.`],
    ['h3', 'Headline and underlying inflation'],
    ['p', R`Headline CPI can be pushed around by volatile items (fuel, fruit, holiday travel) and by one-off government measures such as electricity rebates. Central banks therefore watch **underlying** measures. The **trimmed mean** removes the items with the most extreme price changes each period (the top and bottom tails) and averages the rest; the **weighted median** takes the middle price change. When headline and underlying diverge, underlying inflation is usually the better guide to the trend and to monetary policy.`],
    ['h3', 'Measurement problems'],
    ['list', [
      R`**Substitution bias**: when beef becomes dearer people buy chicken, but a fixed basket assumes they keep buying beef, overstating the cost-of-living increase. Regular reweighting reduces this.`,
      R`**Quality change**: a new phone at the same price as last year’s but with a better camera is effectively cheaper. The ABS makes quality adjustments, but they are difficult.`,
      R`**New goods**: products that did not exist in the base basket are introduced with a lag.`,
      R`**Whose basket?** The CPI represents an average household in the capital cities. Renters, mortgage holders, retirees and students experience different inflation. The ABS also publishes selected living cost indexes for different household types.`,
    ]],
    ['h3', 'Why inflation is costly'],
    ['list', [
      R`**Uncertainty**: high and variable inflation makes long-term contracts, saving and investment decisions harder.`,
      R`**Arbitrary redistribution**: unexpected inflation transfers wealth from lenders to borrowers and from people on fixed incomes to others.`,
      R`**Tax distortions**: taxes on nominal interest and nominal capital gains raise the real tax rate when inflation rises, one argument behind the move to CPI indexation of capital gains from 2027.`,
      R`**Menu and shoe-leather costs**: resources spent changing prices and managing cash.`,
      R`**Relative-price confusion**: firms cannot tell whether their own price is rising because of demand for their product or general inflation, so resources are misallocated.`,
    ]],
    ['p', R`Deflation (falling prices) is also dangerous: it raises the real burden of debt and can cause households to delay spending, deepening a downturn, as Japan experienced for years. Hyperinflation, such as Zimbabwe in 2008 or Vietnam’s very high inflation in the late 1980s, destroys the usefulness of money altogether. That is why most central banks target **low, stable, positive** inflation.`],
    ['example', {
      title: 'Are real wages rising?',
      setup: R`The Wage Price Index rose 3.2% over the year to the June quarter 2026. CPI inflation over the same 12 months was 3.8% (source: ABS, high confidence).`,
      steps: [R`Real wage growth \(= 1.032/1.038 - 1 = -0.58\%\).`],
      answer: R`On these measures real wages fell by about 0.6% over the year: prices rose faster than wages. Real wage growth is one of the key numbers for household spending, and therefore for retailers’ earnings.`,
    }],

    ['h', 'Unemployment and the labour market'],
    ['p', R`The ABS measures the labour market with a monthly household survey. Its definitions are international standards:`],
    ['defs', [
      ['Employed', 'Worked at least one hour for pay or profit in the reference week (or was temporarily absent from a job).'],
      ['Unemployed', 'Not employed, actively looked for work in the past four weeks and available to start work.'],
      ['Labour force', 'Employed plus unemployed.'],
      ['Not in the labour force', 'Everyone else aged 15 and over: students not seeking work, retirees, carers, discouraged workers.'],
      ['Underemployed', 'Employed but wanting and available for more hours.'],
    ]],
    ['math', R`u = \frac{U}{L} = \frac{U}{E + U} \qquad \text{Participation rate} = \frac{L}{\text{Population}_{15+}} \qquad \text{Employment-to-population} = \frac{E}{\text{Population}_{15+}}`, 'The unemployment rate equals the unemployed divided by the labour force. The participation rate equals the labour force divided by the population aged fifteen and over. The employment to population ratio equals employment divided by that population.'],
    ['example', {
      title: 'Building the headline numbers',
      setup: R`Suppose the civilian population aged 15+ is 22.0 million, 14.06 million are employed and 0.68 million are unemployed (figures chosen to match August 2026’s ratios).`,
      steps: [
        R`Labour force \(= 14.06 + 0.68 = 14.74\) million.`,
        R`Unemployment rate \(= 0.68/14.74 = 4.6\%\).`,
        R`Participation rate \(= 14.74/22.0 = 67.0\%\). Employment-to-population \(= 14.06/22.0 = 63.9\%\).`,
      ],
      answer: R`In August 2026 the ABS reported an unemployment rate of **4.6%** (seasonally adjusted, up 0.2 points) and an employment-to-population ratio of **63.9%** (source: ABS Labour Force, released 24 September 2026, high confidence). Because the monthly survey has sampling error, the ABS recommends the trend series, which was also 4.6%.`,
    }],
    ['warn', R`The unemployment rate can fall for bad reasons. If discouraged job seekers stop looking, they leave the labour force, and measured unemployment falls even though nobody found a job. Always read the participation rate and the employment-to-population ratio alongside it.`],
    ['h3', 'Types of unemployment'],
    ['list', [
      R`**Frictional**: people between jobs or new to the labour market, searching for a good match. Some is healthy.`,
      R`**Structural**: a mismatch between workers’ skills or locations and available jobs, for example after automation or the decline of an industry. It can last years.`,
      R`**Cyclical**: unemployment caused by weak demand in a downturn. This is the part monetary and fiscal policy try to reduce.`,
    ]],
    ['p', R`The unemployment rate consistent with stable inflation, when there is no cyclical unemployment, is called the **natural rate** or **NAIRU** (non-accelerating inflation rate of unemployment). It cannot be observed and estimates are uncertain; for Australia they have generally been placed somewhere between 4 and 5 per cent in recent years. When unemployment is below the NAIRU, wage and price pressures tend to build; above it, they tend to ease. This is why the RBA watches the labour market so closely.`],
    ['p', R`**Okun’s law** is a rule of thumb linking output and unemployment: output about 2% below potential tends to go with unemployment about 1 percentage point above its natural rate. It is an empirical regularity, not a law of nature, but it helps translate growth forecasts into labour-market forecasts.`],

    ['h', 'The business cycle'],
    ['p', R`Economies grow along a long-run trend, driven by population, capital and productivity, with fluctuations around it: expansions, peaks, contractions and troughs. A popular definition of **recession** is two consecutive quarters of falling real GDP; many economists prefer broader definitions based on falling output, employment and incomes across the economy (the approach of the US National Bureau of Economic Research). With strong population growth, Australia can see falling GDP **per capita** while aggregate GDP still grows, sometimes called a "per capita recession".`],
    ['table', {
      caption: 'Indicators by timing',
      head: ['Type', 'Examples', 'Use'],
      rows: [
        ['Leading', 'Share prices, building approvals, business and consumer confidence surveys, the yield curve, job advertisements', 'Signal turning points ahead of time'],
        ['Coincident', 'GDP, employment, retail sales, industrial production', 'Show where the economy is now'],
        ['Lagging', 'Unemployment rate, underlying inflation, wage growth', 'Confirm a turn after it happens'],
      ],
    }],
    ['p', R`For Australia’s Budget, Treasury forecast real GDP growth of 2¼% in 2025–26 slowing to 1¾% in 2026–27, with the unemployment rate drifting up to about 4½% (source: Budget 2026–27, Budget Paper No. 1, high confidence). Official forecasts are uncertain, and part of an analyst’s job is to judge where the risks lie.`],

    ['case', {
      title: 'Writing a macro briefing',
      text: R`Your manager asks for a one-page briefing on the Australian economy for an investment committee. The latest data: real GDP +0.4% in the June quarter 2026 (+2.1% over the year) with flat GDP per capita; CPI inflation 3.5% over the year to July (trimmed mean 3.6%); unemployment 4.6% in August, up 0.2 points; Wage Price Index +3.2% over the year; the RBA cash rate at 4.35% after three increases this year.`,
      questions: [
        'Summarise the state of the economy in three sentences, distinguishing aggregate and per-capita growth.',
        'Calculate real wage growth and the real cash rate. What do they imply for household spending?',
        'Which two upcoming data releases would you watch most closely, and why?',
        'Which sectors of the share market are most exposed to the risks you identify?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`GDP is the market value of final output produced domestically; \(GDP = C + I + G + X - M\), and it equals total income and total value added.`,
      R`Real GDP removes price changes; nominal growth ≈ real growth + deflator inflation. Watch per-capita and annualised figures.`,
      R`The CPI measures household inflation using a weighted basket; underlying measures such as the trimmed mean guide policy.`,
      R`Unemployment rate = U/(E+U); read it with participation and employment-to-population; the NAIRU is uncertain but central to policy.`,
      R`Latest Australia: GDP +2.1% y/y, CPI 3.5% y/y (July), unemployment 4.6% (August), WPI +3.2% y/y.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`In an economy, C = 820, I = 260, G = 310, X = 290 and M = 300 (all $ billion). What is GDP?`, answer: 1380, tol: 0.5, solution: R`\(GDP = 820 + 260 + 310 + (290 - 300) = 1{,}380\) billion.` },
    { type: 'num', level: 'Core', q: R`Nominal GDP is $2,900 billion and real GDP is $2,640 billion. What is the GDP deflator? (One decimal.)`, answer: 109.8, tol: 0.05, solution: R`\(2{,}900/2{,}640 \times 100 = 109.8\).` },
    { type: 'num', level: 'Core', q: R`Real GDP grows 0.6% in a quarter. What is the annualised growth rate, in percent? (Two decimals.)`, answer: 2.42, tol: 0.01, solution: R`\(1.006^4 - 1 = 2.42\%\).` },
    { type: 'num', level: 'Core', q: R`The CPI rises from 135.5 to 140.2 over a year. What is the inflation rate, in percent? (Two decimals.)`, answer: 3.47, tol: 0.01, solution: R`\((140.2 - 135.5)/135.5 = 3.47\%\).` },
    { type: 'num', level: 'Core', q: R`A country has 18.0 million people aged 15+, 11.2 million employed and 0.6 million unemployed. What is the unemployment rate, in percent? (Two decimals.)`, answer: 5.08, tol: 0.01, solution: R`Labour force \(= 11.8\) million. \(u = 0.6/11.8 = 5.08\%\). Participation \(= 11.8/18.0 = 65.6\%\).` },
    { type: 'num', level: 'Core', q: R`Nominal wages rise 4.1% while CPI inflation is 2.6%. What is real wage growth, in percent? (Two decimals.)`, answer: 1.46, tol: 0.01, solution: R`\(1.041/1.026 - 1 = 1.46\%\).` },
    { type: 'num', level: 'Stretch', q: R`Nominal GDP grows 5.5% and the GDP deflator rises 3.0%. What is real GDP growth, in percent? (Two decimals.)`, answer: 2.43, tol: 0.01, solution: R`\(1.055/1.030 - 1 = 2.43\%\). The approximation 5.5 − 3.0 = 2.5% is close.` },
    { type: 'mcq', level: 'Core', q: 'Which of the following is counted in Australia’s GDP?', options: ['A retiree’s Age Pension payment', 'The purchase of existing BHP shares on the ASX', 'A new house built in Perth this year', 'A second-hand car bought privately'], answer: 2, solution: R`A **newly built house** is residential investment, part of GDP. Pensions are transfers; share purchases and used goods are transfers of existing assets (only fees and margins count).` },
    { type: 'mcq', level: 'Core', q: 'Many discouraged job seekers stop looking for work. What happens to the measured unemployment rate?', options: ['It rises', 'It falls, even though no one found a job', 'It is unchanged', 'It becomes negative'], answer: 1, solution: R`They leave the labour force, so both unemployed and labour force fall, and the **unemployment rate falls**. The participation rate falls too, which is why analysts read them together.` },
    { type: 'mcq', level: 'Core', q: 'Why do central banks pay close attention to trimmed mean inflation?', options: ['Because it is always lower than headline inflation', 'Because it removes the most extreme price changes and gives a better guide to underlying trends', 'Because it excludes housing', 'Because it measures only wages'], answer: 1, solution: R`The trimmed mean drops the largest and smallest price changes each period, reducing the effect of volatile items and one-offs, so it better reflects **underlying** inflation.` },
    { type: 'long', level: 'Stretch', q: 'Australia’s real GDP grew 2.1% over the year to June 2026, but real GDP per capita grew only 0.7% and was flat in the latest quarter. Explain how both can be true, and discuss which measure matters for (a) living standards, (b) total company revenues, and (c) the RBA’s inflation assessment.', answer: R`Aggregate real GDP measures total production; GDP per capita divides it by population. With population growing by roughly 1.4% a year, total output can rise 2.1% while output per person rises only about 0.7%. In the latest quarter, output growth of 0.4% roughly matched population growth, leaving per-capita output flat.

(a) For **living standards**, per-capita measures (ideally real net national disposable income per capita) matter most: they show whether the average person is producing and earning more. Flat per-capita GDP suggests average living standards are stagnating, especially when combined with falling real wages.

(b) For **total company revenues**, aggregate demand matters: more people mean more customers, so supermarkets, telcos and banks can grow revenue with population even if per-person spending is flat. Investors should nonetheless watch per-capita spending for signs of stress in discretionary sectors.

(c) For **inflation**, the RBA compares aggregate demand with the economy’s aggregate supply capacity. Population growth adds to both demand (consumption, housing) and supply (labour). If demand from new residents, especially for housing, outpaces supply, it can add to inflation even when per-capita growth is weak. So the RBA looks at aggregate demand relative to capacity, including the unemployment rate and capacity utilisation, rather than per-capita GDP alone.`, solution: 'Look for the population-growth arithmetic and a correct link of each measure to its use.' },
  ],
  glossary: [
    ['GDP', 'The market value of all final goods and services produced within a country in a period.'],
    ['Real GDP', 'GDP measured at constant prices, isolating changes in quantities.'],
    ['GDP deflator', 'Nominal GDP divided by real GDP, times 100: a broad price index.'],
    ['CPI', 'An index of the cost of a fixed basket of household purchases.'],
    ['Trimmed mean', 'An underlying inflation measure that removes the most extreme price changes.'],
    ['Participation rate', 'The labour force as a share of the population aged 15 and over.'],
    ['NAIRU', 'The unemployment rate consistent with stable inflation.'],
    ['Okun’s law', 'The rule of thumb linking the output gap to cyclical unemployment.'],
  ],
  resources: ['ABS_GDP', 'ABS_CPI', 'ABS_LF', 'ABS_WPI', 'RBA_INFL', 'RBA_CHARTS', 'BUDGET_BP1', 'KHAN_MACRO', 'MIT1402', 'CORE', 'FRED'],
};
