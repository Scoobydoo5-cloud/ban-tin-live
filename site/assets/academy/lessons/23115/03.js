const R = String.raw;
export default {
  id: '23115-03', subject: '23115', title: 'Elasticity and its business uses', mins: 65, level: 'Foundation',
  summary: 'How strongly buyers and sellers respond to prices and incomes: price, income and cross-price elasticities, the arc and point formulas, the link between elasticity and total revenue, why farm and commodity prices are so volatile, how elasticity decides who bears a tax, and how firms use all of this to price.',
  objectives: [
    'Calculate price elasticity of demand with the midpoint (arc) formula and the point formula',
    'Classify demand as elastic, inelastic or unit elastic and list the determinants of elasticity',
    'Use the total-revenue test and the marginal-revenue formula to decide whether to raise or cut price',
    'Interpret income and cross-price elasticities and use them to identify normal, inferior, luxury, substitute and complementary goods',
    'Explain the price elasticity of supply and why it rises with time',
    'Apply elasticities to commodity volatility, tax incidence and business pricing',
  ],
  body: [
    ['h', 'From direction to size'],
    ['p', R`The last lecture told us the **direction** of changes: a higher price lowers quantity demanded. Business and policy decisions need the **size**. If a streaming service raises its price by 10%, will it lose 2% of subscribers or 25%? If the government raises tobacco excise, will smoking fall a lot or will revenue simply rise? If a drought cuts coffee output by 10%, will prices rise 5% or 40%? The tool that answers these questions is **elasticity**: the percentage response of one variable to a one per cent change in another. Because it uses percentages, it does not depend on units, so we can compare coffee in cups with housing in dwellings.`],

    ['h', 'Price elasticity of demand'],
    ['math', R`\varepsilon_d = \frac{\%\Delta Q_d}{\%\Delta P}`, 'The price elasticity of demand equals the percentage change in quantity demanded divided by the percentage change in price.'],
    ['p', R`Because demand slopes down, \(\varepsilon_d\) is negative. Economists often quote its absolute value ("demand elasticity of 0.7"), but in calculations keep the sign. We classify demand by the size of \(|\varepsilon_d|\):`],
    ['table', {
      caption: 'Classifying price elasticity of demand',
      head: ['|ε|', 'Name', 'Meaning', 'Examples'],
      rows: [
        ['0', 'Perfectly inelastic', 'Quantity does not respond at all', 'Life-saving insulin (approximately)'],
        ['Between 0 and 1', 'Inelastic', 'Quantity changes by a smaller percentage than price', 'Petrol and electricity in the short run, cigarettes, basic food'],
        ['1', 'Unit elastic', 'Equal percentage changes', 'A boundary case'],
        ['Greater than 1', 'Elastic', 'Quantity changes by a larger percentage than price', 'A particular brand of coffee, restaurant meals, overseas holidays'],
        ['∞', 'Perfectly elastic', 'Any price rise loses all buyers', 'A single wheat farmer selling at the world price'],
      ],
    }],
    ['h3', 'The midpoint (arc) formula'],
    ['p', R`Percentage changes depend on the starting point: a rise from $4 to $5 is 25%, but a fall from $5 to $4 is 20%. To get the same answer in both directions, the **midpoint method** divides each change by the average of the two values:`],
    ['math', R`\varepsilon_d = \frac{(Q_2 - Q_1)/\big[(Q_1 + Q_2)/2\big]}{(P_2 - P_1)/\big[(P_1 + P_2)/2\big]}`, 'Arc elasticity equals the change in quantity divided by the average quantity, all divided by the change in price over the average price.'],
    ['example', {
      title: 'Coffee from $4 to $5',
      setup: R`Using last lecture’s demand \(Q_d = 1{,}000 - 100P\): at $4, 600 thousand cups; at $5, 500 thousand.`,
      steps: [
        R`\(\%\Delta Q = -100/550 = -18.18\%\).`,
        R`\(\%\Delta P = 1/4.5 = 22.22\%\).`,
        R`\(\varepsilon_d = -18.18/22.22 = -0.82\).`,
      ],
      answer: R`Between $4 and $5, demand is inelastic: a 22% price rise reduces quantity by only 18%.`,
    }],
    ['h3', 'The point formula'],
    ['p', R`For a precise value at one point on the curve, use calculus: \(\varepsilon_d = \dfrac{dQ}{dP}\cdot\dfrac{P}{Q}\). For the linear demand \(Q = 1{,}000 - 100P\), \(dQ/dP = -100\) everywhere, so elasticity is \(-100P/Q\). It is **not** constant along a straight line: demand is inelastic at low prices and elastic at high prices.`],
    ['table', {
      caption: 'Elasticity and revenue along the coffee demand curve',
      head: ['Price ($)', 'Quantity (000s)', 'Total revenue ($000 per day)', 'Point elasticity'],
      rows: [
        ['2', '800', '1,600', '−0.25'], ['3', '700', '2,100', '−0.43'], ['4', '600', '2,400', '−0.67'], ['5', '500', '2,500', '−1.00'],
        ['6', '400', '2,400', '−1.50'], ['7', '300', '2,100', '−2.33'], ['8', '200', '1,600', '−4.00'], ['9', '100', '900', '−9.00'],
      ],
    }],
    ['chart', {
      caption: 'Total revenue peaks where demand is unit elastic ($5)',
      x: [0, 10], y: [0, 2600], xl: 'Price ($ per cup)', yl: 'Total revenue ($000 a day)', xdp: 0, ydp: 0,
      series: [{ label: 'Total revenue = P × (1,000 − 100P)', color: '#e9b85c', pts: Array.from({ length: 41 }, (_, i) => { const p = i / 4; return [p, p * (1000 - 100 * p)]; }) }],
      marks: [{ x: 5, y: 2500, label: 'Maximum at $5 (|ε| = 1)', color: '#ffffff' }, { x: 4, y: 2400, label: 'Inelastic zone', color: '#5fe3e0' }, { x: 7, y: 2100, label: 'Elastic zone', color: '#ff7ab6' }],
    }],

    ['h', 'Elasticity and total revenue'],
    ['p', R`Total revenue is \(TR = P \times Q\). A price rise increases revenue on every unit still sold but loses the units no longer sold. Which effect wins depends on elasticity. This gives the **total-revenue test**, one of the most useful results in applied economics:`],
    ['list', [
      R`**Inelastic demand** (\(|\varepsilon| < 1\)): raising the price **raises** revenue; cutting it lowers revenue.`,
      R`**Elastic demand** (\(|\varepsilon| > 1\)): raising the price **lowers** revenue; cutting it raises revenue.`,
      R`**Unit elastic** (\(|\varepsilon| = 1\)): revenue is at its maximum.`,
    ]],
    ['p', R`The same idea can be written with **marginal revenue**, the extra revenue from selling one more unit. A lower price is needed to sell another unit, so marginal revenue is less than price:`],
    ['math', R`MR = P\left(1 + \frac{1}{\varepsilon_d}\right)`, 'Marginal revenue equals price times, one plus one over the elasticity of demand.'],
    ['p', R`At $4, where \(\varepsilon_d = -2/3\), \(MR = 4(1 - 1.5) = -\$2\): selling one more thousand cups would **reduce** revenue by about $2 thousand. No firm with any pricing power would choose to operate where marginal revenue is negative, which is why, as you will see in lecture 5, a firm with market power always prices in the **elastic** part of its demand curve.`],
    ['key', R`If your customers are price-insensitive, you are probably charging too little; if they are very sensitive, a price cut may raise revenue. Elasticity turns pricing from guesswork into analysis.`],

    ['h', 'What makes demand elastic or inelastic?'],
    ['list', [
      R`**Availability of close substitutes.** The more and closer the substitutes, the more elastic. Demand for "coffee" is inelastic; demand for one café’s coffee, with three others on the same street, is highly elastic.`,
      R`**Necessity versus luxury.** Necessities (electricity, basic food, medicines) are inelastic; discretionary purchases (overseas holidays, dining out) are elastic.`,
      R`**Share of the budget.** Goods that take a small share of income (salt, matches) are inelastic; big-ticket items are more elastic.`,
      R`**Time horizon.** Demand becomes more elastic over time as people find substitutes: after a petrol price spike, drivers first cut discretionary trips, then over years buy smaller cars, electric vehicles or move closer to work.`,
      R`**Definition of the market.** Narrowly defined markets (Brand X bottled water) are more elastic than broadly defined ones (drinks).`,
    ]],

    ['h', 'Income and cross-price elasticities'],
    ['math', R`\eta = \frac{\%\Delta Q_d}{\%\Delta \text{Income}} \qquad \varepsilon_{xy} = \frac{\%\Delta Q_x}{\%\Delta P_y}`, 'Income elasticity equals the percentage change in quantity demanded divided by the percentage change in income. Cross-price elasticity equals the percentage change in quantity of good x divided by the percentage change in the price of good y.'],
    ['table', {
      caption: 'Reading the signs',
      head: ['Measure', 'Value', 'Interpretation', 'Example'],
      rows: [
        ['Income elasticity η', 'η > 1', 'Luxury (normal good; spending share rises with income)', 'Restaurant meals: income +5%, demand +8%, η = 1.6'],
        ['Income elasticity η', '0 < η < 1', 'Necessity (normal good)', 'Bread: income +5%, demand +1%, η = 0.2'],
        ['Income elasticity η', 'η < 0', 'Inferior good', 'Instant noodles: income +5%, demand −2%, η = −0.4'],
        ['Cross-price elasticity', 'Positive', 'Substitutes', 'Tea price +10%, coffee demand +3%: +0.3'],
        ['Cross-price elasticity', 'Negative', 'Complements', 'Printer price up, ink demand down'],
        ['Cross-price elasticity', 'Near zero', 'Unrelated goods', 'Coffee and car tyres'],
      ],
    }],
    ['p', R`Income elasticities matter enormously for investors. Companies selling luxuries and discretionary goods (travel, fashion, cars) see their sales swing with the business cycle, so their shares are **cyclical**; companies selling necessities (supermarkets, utilities, basic healthcare) are **defensive**. The Australian and Vietnamese share markets both classify sectors this way, and portfolio managers tilt between them as the economic outlook changes. Cross-price elasticities are used by competition regulators such as the ACCC to define the relevant market when assessing mergers: if two products are close substitutes, a merger between their producers may reduce competition.`],

    ['h', 'Price elasticity of supply'],
    ['math', R`\varepsilon_s = \frac{\%\Delta Q_s}{\%\Delta P}`, 'The price elasticity of supply equals the percentage change in quantity supplied divided by the percentage change in price.'],
    ['p', R`Supply is elastic when producers can easily increase output: spare capacity, readily available inputs, stored inventories and, above all, **time**. In the very short run, the supply of apartments, iron ore mines or trained doctors is almost fixed. Over years, new buildings, mines and graduates arrive. This is why rents and commodity prices can spike when demand jumps suddenly, and then moderate as supply catches up.`],

    ['h', 'Applications'],
    ['h3', 'Why farm and commodity prices are so volatile'],
    ['p', R`When both demand and short-run supply are inelastic, small shifts in either curve cause large price swings. Rearranging the elasticity definition, the price change needed to absorb a quantity shock is \(\%\Delta P \approx \%\Delta Q / \varepsilon_d\).`],
    ['example', {
      title: 'The farmer’s paradox',
      setup: R`Demand for rice is inelastic, with \(\varepsilon_d = -0.3\). An excellent season increases the harvest by 10%.`,
      steps: [
        R`To sell 10% more, the price must fall by about \(10\% / 0.3 = 33\%\).`,
        R`Revenue changes by a factor of \(1.10 \times (1 - 0.333) = 0.733\): farm revenue falls by about **27%**.`,
      ],
      answer: R`A bumper harvest makes farmers collectively poorer. This paradox explains farmers’ interest in price-support schemes, storage, export markets and futures contracts, and it explains why a drought in Vietnam’s coffee regions or a mine flood in the Pilbara can move world prices so much.`,
    }],
    ['h3', 'Taxes and elasticity'],
    ['p', R`Last lecture showed that the side of the market that responds less bears more of a tax. With elasticities, the share of a per-unit tax borne by buyers is approximately:`],
    ['math', R`\text{Buyers’ share} = \frac{\varepsilon_s}{\varepsilon_s - \varepsilon_d} \qquad \text{Sellers’ share} = \frac{-\varepsilon_d}{\varepsilon_s - \varepsilon_d}`, 'The buyers’ share of a tax equals the supply elasticity divided by the supply elasticity minus the demand elasticity. The sellers’ share equals minus the demand elasticity over the same denominator.'],
    ['p', R`With \(\varepsilon_s = 1.5\) and \(\varepsilon_d = -0.5\), buyers bear \(1.5/2.0 = 75\%\). This is why governments tax goods with inelastic demand, such as tobacco, alcohol and fuel: the tax raises a lot of revenue because consumption falls only modestly. The same inelasticity means the burden falls heavily on consumers, and, because low-income households spend a larger share of income on these goods, such taxes can be regressive. Health-motivated taxes face a tension: the more inelastic the demand, the more revenue and the less change in behaviour.`],
    ['h3', 'Business pricing'],
    ['list', [
      R`**Price discrimination.** Airlines charge business travellers (inelastic, booking late) far more than holiday makers (elastic, booking early). Cinemas offer student discounts. Software firms charge less in lower-income countries. Each segments customers by elasticity.`,
      R`**Revenue forecasting.** Analysts valuing a company that plans a price rise estimate the volume loss using elasticity estimates from past price changes or competitor data.`,
      R`**Promotions.** A 20% discount on an elastic product can raise revenue; on an inelastic product it simply gives money away.`,
    ]],
    ['h3', 'Estimating elasticities from data'],
    ['p', R`In practice elasticities are estimated statistically. A common specification regresses the log of quantity on the log of price and other factors: \(\ln Q = a + b\ln P + c\ln \text{Income} + \dots\). The coefficient \(b\) is directly the price elasticity, and \(c\) the income elasticity. You will learn to run and interpret such regressions in Responsible Evidence-Based Decisions and Time Series Econometrics, including the traps: price and quantity are determined together by supply and demand, so a naive regression can confuse the two curves.`],
    ['code', { lang: 'python', say: 'The Python code regresses log quantity on log price using statsmodels; the slope is the price elasticity.', src: R`import numpy as np, pandas as pd
import statsmodels.formula.api as smf

# df has columns: quantity, price, income (weekly sales data)
df = pd.read_csv("sales.csv")
model = smf.ols("np.log(quantity) ~ np.log(price) + np.log(income)", data=df).fit()
print(model.params)   # coefficient on np.log(price) = price elasticity estimate` }],

    ['case', {
      title: 'A streaming service raises prices',
      text: R`A streaming service with 2.4 million Australian subscribers at $16.99 a month plans to raise its price to $18.99, a rise of about 11.8%. Internal surveys suggest subscribers regard the service as one of several substitutes, and a rival cut its price last month. Management estimates the price elasticity of demand at between −0.6 and −1.4.`,
      questions: [
        'Using the two ends of the elasticity range, estimate the number of subscribers and monthly revenue after the price rise. When does the rise increase revenue?',
        'Why might demand be more elastic in the long run than in the first month?',
        'What does the rival’s price cut imply for the cross-price elasticity and for the service’s own elasticity?',
        'Suggest two pricing strategies that use differences in elasticity across customers.',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Price elasticity of demand = %ΔQ/%ΔP; use the midpoint formula for changes between two points and \((dQ/dP)(P/Q)\) at a point.`,
      R`Along a straight demand line, elasticity rises (in absolute value) with price; revenue peaks where \(|\varepsilon| = 1\).`,
      R`Inelastic demand: raise price to raise revenue. Elastic demand: cutting price raises revenue. \(MR = P(1 + 1/\varepsilon)\).`,
      R`Income elasticity separates luxuries, necessities and inferior goods; cross-price elasticity separates substitutes and complements.`,
      R`Supply becomes more elastic over time. Inelastic demand and supply make prices volatile and determine who bears taxes.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`When a bakery raises the price of a loaf from $2.00 to $2.40, daily sales fall from 2,200 to 1,800 loaves. Using the midpoint formula, what is the price elasticity of demand? (Two decimals, include the sign.)`, answer: -1.1, tol: 0.01, solution: R`\(\%\Delta Q = -400/2{,}000 = -20\%\). \(\%\Delta P = 0.40/2.20 = 18.18\%\). \(\varepsilon = -20/18.18 = -1.10\): elastic, so the price rise reduced revenue (from $4,400 to $4,320).` },
    { type: 'num', level: 'Core', q: R`For the demand curve \(Q = 240 - 4P\), what is the point elasticity at \(P = 30\)? (Include the sign.)`, answer: -1, tol: 0.01, solution: R`\(Q = 120\). \(\varepsilon = (dQ/dP)(P/Q) = -4 \times 30/120 = -1.0\): unit elastic, so revenue is at its maximum at this price.` },
    { type: 'num', level: 'Core', q: R`Household income rises 4% and spending on overseas holidays rises 12%. What is the income elasticity of demand?`, answer: 3, tol: 0.01, solution: R`\(\eta = 12\%/4\% = 3.0\): a luxury good. Travel companies are highly cyclical.` },
    { type: 'num', level: 'Core', q: R`The price of printers rises 15% and the quantity of ink cartridges demanded falls 6%. What is the cross-price elasticity? (Include the sign.)`, answer: -0.4, tol: 0.01, solution: R`\(-6\%/15\% = -0.4\). Negative: printers and ink are complements.` },
    { type: 'num', level: 'Stretch', q: R`A firm’s demand has elasticity −1.5. By approximately what percentage does its revenue change if it raises the price by 8%? (Use \((1 + \%\Delta P)(1 + \varepsilon\,\%\Delta P) - 1\); include the sign, one decimal.)`, answer: -5, tol: 0.1, solution: R`Quantity falls about \(1.5 \times 8\% = 12\%\). Revenue factor \(= 1.08 \times 0.88 = 0.9504\), a change of **−5.0%**. Elastic demand: the price rise lowers revenue.` },
    { type: 'num', level: 'Stretch', q: R`Supply elasticity is 0.4 and demand elasticity is −1.2. What percentage of a per-unit tax do buyers bear?`, answer: 25, tol: 0.1, solution: R`Buyers’ share \(= 0.4/(0.4 + 1.2) = 25\%\). Sellers bear 75% because supply is the less responsive side.` },
    { type: 'num', level: 'Core', q: R`Demand for petrol has a short-run elasticity of −0.3. By what percentage must the price rise to cut consumption by 6%?`, answer: 20, tol: 0.1, solution: R`\(\%\Delta P = \%\Delta Q/\varepsilon = -6\%/(-0.3) = 20\%\). Inelastic demand means large price changes are needed to change behaviour in the short run.` },
    { type: 'mcq', level: 'Core', q: 'A café’s coffee demand is inelastic at its current price. What should it expect if it raises the price slightly?', options: ['Revenue falls', 'Revenue rises', 'Revenue is unchanged', 'Quantity rises'], answer: 1, solution: R`With inelastic demand the percentage fall in quantity is smaller than the percentage rise in price, so **revenue rises**. (Profit may rise even more, because fewer cups cost less to make.)` },
    { type: 'mcq', level: 'Core', q: 'Which product is likely to have the most elastic demand?', options: ['Electricity for a household', 'Insulin for a diabetic patient', 'One particular brand of bottled water', 'Salt'], answer: 2, solution: R`A single brand has many close substitutes, so its demand is highly **elastic**. The others are necessities or small budget shares.` },
    { type: 'mcq', level: 'Stretch', q: 'A firm with market power finds that its demand is inelastic at its current price. What does profit maximisation imply?', options: ['It should cut the price', 'It should raise the price', 'It is already maximising profit', 'It should double output'], answer: 1, solution: R`With inelastic demand, marginal revenue is negative, so reducing output (raising price) raises revenue and lowers costs. A profit-maximising firm always operates where demand is **elastic**, so it should **raise the price**.` },
    { type: 'long', level: 'Core', q: 'Explain why the price elasticity of supply of housing is low in the short run and higher in the long run, and use this to explain what happens to rents and building activity after a sudden increase in population.', answer: R`In the short run the housing stock is essentially fixed: new dwellings take years to plan, approve, finance and build, and existing dwellings cannot be converted quickly. So the quantity of rental housing barely responds to rent, and supply is very inelastic. In the long run developers can buy land, obtain approvals and build, and investors can add rental properties, so supply becomes much more elastic.

After a sudden increase in population, demand for rental housing shifts right. Because short-run supply is inelastic, the adjustment happens mainly through price: rents rise sharply and vacancy rates fall, with only a small increase in the number of occupied rentals (for example, more people per dwelling). The higher rents and prices raise the profitability of building, so over the following years construction increases, supply expands and rent growth slows. How much rents eventually fall back depends on how elastic long-run supply is, which in Australia is constrained by planning rules, land availability, construction capacity and interest rates.`, solution: 'Look for the reasons supply is inelastic (time, approvals, construction), the price-dominated short-run adjustment, and the supply response and moderation over time.' },
  ],
  glossary: [
    ['Price elasticity of demand', 'The percentage change in quantity demanded for a one per cent change in price.'],
    ['Elastic demand', 'Demand with |ε| > 1: quantity is very responsive to price.'],
    ['Inelastic demand', 'Demand with |ε| < 1: quantity is not very responsive to price.'],
    ['Total-revenue test', 'Price and revenue move together when demand is inelastic and in opposite directions when it is elastic.'],
    ['Income elasticity', 'The percentage change in demand for a one per cent change in income.'],
    ['Cross-price elasticity', 'The percentage change in demand for one good when another good’s price changes by one per cent.'],
    ['Price elasticity of supply', 'The percentage change in quantity supplied for a one per cent change in price.'],
    ['Price discrimination', 'Charging different prices to different customers for the same product, based on their elasticity.'],
  ],
  resources: ['CORE', 'OS_ECO', 'KHAN_MICRO', 'MIT1401', 'STATSMODELS', 'book:MANKIW'],
};
