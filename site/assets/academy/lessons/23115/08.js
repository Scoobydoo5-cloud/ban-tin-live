const R = String.raw;
const D = '#5fe3e0', S = '#ff7ab6', N = '#e9b85c', V = '#9b8cff';
export default {
  id: '23115-08', subject: '23115', title: 'Aggregate demand and supply, fiscal and monetary policy', mins: 80, level: 'Intermediate',
  summary: 'How the whole economy fits together: aggregate demand and supply, demand and supply shocks, the output gap and the Phillips curve; how the Reserve Bank sets the cash rate and how it reaches households and firms; unconventional tools; fiscal policy, multipliers and public debt dynamics; and how investors read policy, with Australia’s 2026 rate rises and Budget as the running example.',
  objectives: [
    'Use the aggregate demand–aggregate supply model to analyse demand shocks, supply shocks and stagflation',
    'Explain the output gap, the Phillips curve and the role of inflation expectations',
    'Describe the RBA’s mandate, decision process and the channels through which the cash rate affects the economy',
    'Apply a simple Taylor rule and calculate the real cash rate',
    'Explain automatic stabilisers, discretionary fiscal policy, the spending multiplier and crowding out',
    'Analyse public debt dynamics and interpret Australia’s 2026–27 Budget aggregates',
  ],
  body: [
    ['h', 'From markets to the whole economy'],
    ['p', R`Microeconomics explained the price of coffee. Macroeconomics asks what determines the **overall** level of prices and output, and why both fluctuate. The workhorse framework is the **aggregate demand–aggregate supply (AD–AS)** model. It is a simplification, and modern central banks use richer models, but it organises the key ideas: demand shocks, supply shocks, the trade-off between inflation and unemployment in the short run, and the absence of that trade-off in the long run.`],

    ['h', 'Aggregate demand'],
    ['p', R`**Aggregate demand (AD)** is the total quantity of final goods and services that households, firms, governments and foreigners want to buy at each price level: \(C + I + G + NX\). It slopes downward for three reasons. A higher price level reduces the real value of wealth (the **wealth effect**); it raises the demand for money and therefore interest rates, discouraging borrowing and investment (the **interest-rate effect**); and it makes domestic goods dearer relative to foreign goods (the **exchange-rate effect**).`],
    ['p', R`AD **shifts** when spending changes for reasons other than the price level: a change in consumer or business confidence, the RBA’s interest rate, government spending or taxes, foreign growth (demand for Australian exports), the exchange rate, or asset prices such as housing.`],

    ['h', 'Aggregate supply: short run and long run'],
    ['p', R`The **long-run aggregate supply (LRAS)** curve is vertical at **potential output**: the output the economy can produce when labour and capital are fully employed at sustainable rates. In the long run, output depends on real factors (population, capital, technology, institutions), not on the price level. LRAS shifts right with population growth, investment and productivity improvements.`],
    ['p', R`The **short-run aggregate supply (SRAS)** curve slopes upward, because some prices and wages are sticky: they are set in contracts and adjust slowly. When demand rises, firms can raise output profitably before wages catch up. SRAS shifts with production costs: wages, energy and commodity prices, supply-chain disruptions, and **expected inflation**, which feeds into wage and price setting.`],
    ['chart', {
      caption: 'AD–AS: a demand boom (AD₂) and an adverse supply shock (SRAS₂)',
      x: [60, 160], y: [70, 140], xl: 'Real output (index, potential = 100)', yl: 'Price level (index)',
      series: [
        { label: 'AD', color: D, pts: [[60, 140], [130, 70]] },
        { label: 'AD₂ (demand boom)', color: D, dash: '6 4', pts: [[80, 140], [150, 70]] },
        { label: 'SRAS', color: S, pts: [[60, 80], [160, 130]] },
        { label: 'SRAS₂ (energy price shock)', color: N, dash: '6 4', pts: [[60, 95], [150, 140]] },
        { label: 'LRAS (potential output)', color: V, pts: [[100, 70], [100, 140]] },
      ],
      marks: [{ x: 100, y: 100, label: 'Start', color: '#ffffff' }, { x: 113.3, y: 106.7, label: 'Boom', color: D }, { x: 90, y: 110, label: 'Stagflation', color: N }],
      note: 'A demand boom raises output and prices together. A supply shock raises prices while output falls: the hardest case for policy.',
    }],
    ['h3', 'Demand shocks and supply shocks'],
    ['example', {
      title: 'Two kinds of shock',
      setup: R`Take AD: \(P = 200 - Y\), SRAS: \(P = 50 + 0.5Y\), with potential output \(Y^* = 100\), so the economy starts at \(Y = 100\), \(P = 100\).`,
      steps: [
        R`**Demand boom**: AD shifts to \(P = 220 - Y\). New short-run equilibrium: \(220 - Y = 50 + 0.5Y \Rightarrow Y = 113.3\), \(P = 106.7\). Output is above potential (a **positive output gap**) and prices rise.`,
        R`**Adverse supply shock** (energy prices jump): SRAS shifts to \(P = 65 + 0.5Y\). With the original AD: \(200 - Y = 65 + 0.5Y \Rightarrow Y = 90\), \(P = 110\). Output falls **and** prices rise: **stagflation**.`,
      ],
      answer: R`Demand shocks move output and inflation in the same direction, so one policy response (tightening in a boom, easing in a slump) addresses both. Supply shocks move them in opposite directions, forcing policymakers to choose between fighting inflation and supporting output. The 1970s oil shocks and the 2021–23 energy and supply-chain shocks after the pandemic and Russia’s invasion of Ukraine were largely of this kind.`,
    }],
    ['p', R`In the long run, if output is above potential, tight labour markets push up wages, SRAS shifts left and output returns to potential at a higher price level. If output is below potential, wage growth slows and SRAS gradually shifts right. This self-correction can be slow and painful, which is the case for stabilisation policy.`],

    ['h', 'The output gap and the Phillips curve'],
    ['p', R`The **output gap** is actual output minus potential, as a share of potential. A positive gap means the economy is running "hot": unemployment is below its natural rate and inflation pressure builds. A negative gap means spare capacity. The **Phillips curve** describes this short-run relationship between unemployment and inflation.`],
    ['math', R`\pi_t = \pi^{e}_t - \beta\,(u_t - u^{*}) + \varepsilon_t`, 'Inflation equals expected inflation minus beta times unemployment minus the natural rate, plus a supply shock term.'],
    ['p', R`Inflation equals **expected inflation**, minus a term that depends on how far unemployment \(u\) is from the natural rate \(u^*\) (the NAIRU), plus supply shocks \(\varepsilon\). The critical insight, from Milton Friedman and Edmund Phelps in the late 1960s, is the role of expectations: if policymakers try to hold unemployment below \(u^*\) permanently, workers and firms come to expect higher inflation, and inflation keeps rising. There is no permanent trade-off. That is why central banks work so hard to keep inflation expectations **anchored** at the target: anchored expectations make it much cheaper to bring inflation back down after a shock.`],

    ['h', 'Monetary policy in Australia'],
    ['h3', 'Mandate and decision-making'],
    ['p', R`The Reserve Bank of Australia’s monetary policy objectives, as set out in the amended Reserve Bank Act, are **price stability** and **full employment**, for the welfare of the Australian people. Under the Statement on the Conduct of Monetary Policy agreed with the Treasurer, price stability means CPI inflation of **2–3%**, with a focus on the **midpoint of 2.5%**. Since 1 March 2025, decisions have been made by a dedicated **Monetary Policy Board**, which meets eight times a year and releases a statement after each meeting, with the Governor holding a press conference.`],
    ['h3', 'The instrument: the cash rate'],
    ['p', R`The RBA’s main instrument is the target for the **cash rate**, the interest rate on overnight unsecured loans between banks. The RBA keeps the actual rate close to the target by setting the interest rate it pays on banks’ deposits (exchange settlement balances) and the rate at which it lends to them, and by managing the supply of reserves. In 2026 the Board raised the target three times, in February, March and May, taking it from 3.60% to **4.35%**, as inflation rose back above the target band; it left the rate unchanged in June and August (source: RBA, high confidence).`],
    ['h3', 'How the cash rate reaches the economy'],
    ['table', {
      caption: 'Transmission channels of monetary policy',
      head: ['Channel', 'How a rate rise works', 'Strength in Australia'],
      rows: [
        ['Cash-flow (interest-rate) channel', 'Higher repayments on variable-rate mortgages cut households’ disposable income; savers earn more', 'Strong, because most mortgages are variable-rate or short fixed terms'],
        ['Savings and investment channel', 'Higher rates reward saving and raise the hurdle for investment projects', 'Moderate'],
        ['Asset-price and wealth channel', 'Higher rates lower the present value of houses and shares, reducing wealth and spending', 'Strong for housing'],
        ['Exchange-rate channel', 'Higher Australian rates attract capital, lifting the dollar, making imports cheaper and exports less competitive', 'Meaningful for tradable-goods inflation'],
        ['Credit-supply channel', 'Lenders tighten standards; borrowers can borrow less', 'Varies with bank conditions'],
        ['Expectations channel', 'A credible commitment to the target restrains wage and price setting', 'Central to modern policy'],
      ],
    }],
    ['example', {
      title: 'The 2026 rate rises and a typical mortgage',
      setup: R`A household has a $600,000, 30-year variable mortgage. Suppose the three 2026 increases (0.75 percentage points in total) are passed through in full, lifting its rate from 6.20% to 6.95% (illustrative).`,
      steps: [
        R`Repayment at 6.20%: \$3,674.81 a month. At 6.95%: \$3,971.69 a month.`,
        R`Increase: about **\$297 a month**, or \$3,562 a year, money that is no longer available for other spending.`,
      ],
      answer: R`Multiply that by hundreds of thousands of indebted households and the cash-flow channel becomes a powerful brake on consumption, which is exactly the intent. Policy works with **long and variable lags**: the RBA’s rule of thumb is that the full effect of a change takes one to two years.`,
    }],
    ['h3', 'Real rates and a policy rule'],
    ['p', R`What matters for spending and saving is the **real** interest rate. With the cash rate at 4.35% and CPI inflation at 3.5%, the real cash rate is about \(1.0435/1.035 - 1 = 0.8\%\). Economists compare this with the **neutral** real rate, the rate that neither stimulates nor restrains the economy, which cannot be observed and is estimated with wide uncertainty. A useful benchmark for how policy "should" respond is the **Taylor rule** (John Taylor, 1993):`],
    ['math', R`i = r^{*} + \pi + 0.5(\pi - \pi^{*}) + 0.5\,(\text{output gap})`, 'The policy rate equals the neutral real rate, plus inflation, plus one half of the gap between inflation and target, plus one half of the output gap.'],
    ['p', R`With a neutral real rate \(r^* = 1\%\), inflation \(\pi = 3.5\%\), target \(\pi^* = 2.5\%\) and an output gap of −0.5%, the rule suggests \(i = 1 + 3.5 + 0.5 + (-0.25) = 4.75\%\). This is an illustration, not a forecast: the inputs are uncertain and central banks use judgement. But the rule captures a key principle: when inflation rises, the nominal rate should rise **by more** than inflation, so that the real rate rises (the **Taylor principle**).`],
    ['h3', 'When rates hit zero: unconventional policy'],
    ['p', R`In 2020, with the cash rate near zero, the RBA used unconventional tools: a target for the yield on 3-year Australian Government bonds, large-scale bond purchases (quantitative easing), a Term Funding Facility giving banks cheap three-year funding, and forward guidance about keeping rates low. These tools lowered longer-term interest rates and supported lending, but some of them also carried costs and risks, which the RBA later reviewed publicly. For investors the lesson is that central banks influence the whole yield curve, not just overnight rates.`],

    ['h', 'Fiscal policy'],
    ['p', R`Fiscal policy is the government’s use of spending and taxation. It affects the economy in two ways. **Automatic stabilisers** work without any decision: in a downturn, tax revenue falls and unemployment benefits rise, cushioning household incomes; in a boom, the reverse. **Discretionary** policy involves deliberate decisions, such as stimulus payments, infrastructure programs, tax cuts, or spending restraint to reduce inflationary pressure.`],
    ['h3', 'The multiplier'],
    ['p', R`An extra dollar of government spending becomes someone’s income; part is spent, becoming another person’s income, and so on. In a simple model with a marginal propensity to consume \(MPC\), a tax rate \(t\) and a marginal propensity to import \(MPM\), the spending multiplier is:`],
    ['math', R`k = \frac{1}{1 - MPC\,(1 - t) + MPM}`, 'The multiplier equals one over one minus the marginal propensity to consume times one minus the tax rate, plus the marginal propensity to import.'],
    ['p', R`With \(MPC = 0.8\) and no taxes or imports, \(k = 5\). With a 25% tax rate and an import propensity of 0.2, \(k = 1/(1 - 0.6 + 0.2) = 1.67\). Real-world estimates are usually lower still, often around or below 1 to 1.5, because of **crowding out**: government borrowing can push up interest rates and the exchange rate, reducing private investment and net exports; when the central bank is fighting inflation, it may raise rates to offset fiscal stimulus. Multipliers tend to be larger in deep recessions, when interest rates are at zero and there is lots of spare capacity.`],
    ['warn', R`Fiscal and monetary policy can pull in opposite directions. If the government adds to demand while the RBA is trying to slow it, the RBA must keep rates higher than otherwise. This interaction was a live debate in Australia during 2023–26.`],
    ['h3', 'Budget balance and public debt'],
    ['p', R`The **underlying cash balance** is the government’s main measure of its budget position. In the 2026–27 Budget, the Australian Government forecast deficits of **$28.3 billion (1.0% of GDP) in 2025–26** and **$31.5 billion (1.0% of GDP) in 2026–27**, with gross debt reaching about **$1,051 billion (34.0% of GDP)** at 30 June 2027 and net debt about $617 billion (19.9% of GDP); the budget is projected to return to balance in 2034–35 (source: Budget Paper No. 1, 2026–27, high confidence).`],
    ['p', R`Whether a debt level is sustainable depends less on its size than on its **dynamics**. As a share of GDP, debt \(d\) evolves as:`],
    ['math', R`\Delta d \approx \frac{r - g}{1 + g}\,d \;-\; pb`, 'The change in the debt ratio is approximately r minus g over one plus g, times the debt ratio, minus the primary balance.'],
    ['p', R`Here \(r\) is the average nominal interest rate on the debt, \(g\) is nominal GDP growth and \(pb\) is the **primary balance** (the budget balance excluding interest) as a share of GDP. When \(g > r\), a government can run small primary deficits and still see its debt ratio stabilise; when \(r > g\), it needs primary surpluses. With \(d = 34\%\), \(r = 4\%\), \(g = 4.25\%\) and a primary deficit of 0.5% of GDP, the debt ratio changes by \((0.04 - 0.0425)/1.0425 \times 34 + 0.5 \approx +0.42\) percentage points a year: gently rising. Rising interest rates since 2022 have made this arithmetic less comfortable for governments everywhere.`],

    ['h', 'Monetary and exchange-rate policy in Vietnam'],
    ['p', R`The State Bank of Vietnam (SBV) combines several tools that the RBA does not use: it sets policy interest rates (such as the refinancing and rediscount rates), but it also sets **annual credit-growth targets** for the banking system and allocates credit quotas to individual banks, and it manages the exchange rate by publishing a daily **central rate** for the US dollar, with commercial banks allowed to trade within a band around it (±5% since October 2022). This reflects a different stage of financial development and a greater emphasis on exchange-rate stability. For investors in Vietnamese assets, credit-quota decisions and the dong’s exchange rate can matter as much as interest rates.`],

    ['case', {
      title: 'The Monetary Policy Board’s dilemma',
      text: R`It is the Board’s next meeting. Trimmed mean inflation is 3.6% and headline CPI 3.5%, both above the 2–3% band. Unemployment has risen to 4.6%, real GDP per capita was flat last quarter, real wages are falling, and the cash rate is 4.35% after three increases this year. Markets are split between one more increase and a long pause. The Treasurer has announced new cost-of-living measures that will temporarily lower measured electricity prices.`,
      questions: [
        'Using the Phillips curve, explain the arguments for another increase and for a pause.',
        'How should the Board treat the temporary effect of the electricity measures on headline inflation?',
        'Estimate a Taylor-rule rate using your own assumptions and compare it with 4.35%.',
        'Which asset prices (bond yields, the Australian dollar, bank and retail shares) would you expect to move on the announcement under each decision, and why?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`AD slopes down (wealth, interest-rate and exchange-rate effects); SRAS slopes up (sticky wages and prices); LRAS is vertical at potential output.`,
      R`Demand shocks move output and prices together; supply shocks cause stagflation and hard trade-offs.`,
      R`The expectations-augmented Phillips curve implies no long-run trade-off; anchored expectations are central banks’ most valuable asset.`,
      R`The RBA targets 2–3% inflation (midpoint 2.5%) and full employment; the cash rate works through cash flow, wealth, exchange-rate, credit and expectations channels with long lags.`,
      R`The multiplier is \(1/(1 - MPC(1-t) + MPM)\) in theory and smaller in practice because of crowding out.`,
      R`Debt dynamics depend on \(r - g\) and the primary balance; Australia’s 2026–27 Budget forecasts a deficit of 1.0% of GDP and gross debt near 34% of GDP.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`With a marginal propensity to consume of 0.75, a tax rate of 30% and a marginal propensity to import of 0.15, what is the spending multiplier? (Two decimals.)`, answer: 1.6, tol: 0.01, solution: R`\(k = 1/(1 - 0.75 \times 0.7 + 0.15) = 1/(1 - 0.525 + 0.15) = 1/0.625 = 1.60\).` },
    { type: 'num', level: 'Core', q: R`Using a Taylor rule with \(r^* = 0.5\%\), inflation 4%, target 2.5% and an output gap of +1%, what policy rate is suggested, in percent?`, answer: 5.75, tol: 0.01, solution: R`\(i = 0.5 + 4 + 0.5(4 - 2.5) + 0.5(1) = 0.5 + 4 + 0.75 + 0.5 = 5.75\%\).` },
    { type: 'num', level: 'Core', q: R`The cash rate is 4.35% and inflation expectations are 3.0%. What is the expected real cash rate, in percent? (Two decimals.)`, answer: 1.31, tol: 0.01, solution: R`\(1.0435/1.030 - 1 = 1.31\%\).` },
    { type: 'num', level: 'Stretch', q: R`Public debt is 60% of GDP, the average interest rate on debt is 5% and nominal GDP growth is 3%. The government runs a primary **surplus** of 1% of GDP. By how many percentage points does the debt ratio change in a year? (Two decimals; include the sign.)`, answer: 0.17, tol: 0.01, solution: R`\(\Delta d = (0.05 - 0.03)/1.03 \times 60 - 1 = 1.165 - 1 = +0.17\) percentage points. With \(r > g\), even a primary surplus of 1% is not quite enough to stop the ratio rising.` },
    { type: 'num', level: 'Core', q: R`AD is \(P = 200 - Y\) and SRAS is \(P = 50 + 0.5Y\). An energy shock shifts SRAS to \(P = 80 + 0.5Y\). What is the new equilibrium output?`, answer: 80, tol: 0.01, solution: R`\(200 - Y = 80 + 0.5Y \Rightarrow 120 = 1.5Y \Rightarrow Y = 80\), and \(P = 120\). Output falls 20% below potential while the price level rises: stagflation.` },
    { type: 'mcq', level: 'Core', q: 'Which statement about the RBA’s framework is correct?', options: ['It targets 0–2% inflation', 'It targets 2–3% CPI inflation with a focus on the 2.5% midpoint, alongside full employment', 'It sets mortgage rates directly', 'It sets the Australian dollar exchange rate'], answer: 1, solution: R`The RBA targets **2–3% inflation with a focus on the midpoint**, and has a dual objective including full employment. Banks set their own lending rates, and the dollar floats.` },
    { type: 'mcq', level: 'Core', q: 'A sharp rise in global oil prices is best described in the AD–AS model as…', options: ['A rightward shift of AD', 'A leftward shift of SRAS', 'A rightward shift of LRAS', 'A movement along AD only'], answer: 1, solution: R`Higher input costs shift **SRAS left**, raising prices and lowering output (stagflation).` },
    { type: 'mcq', level: 'Core', q: 'Why is the cash-flow channel of monetary policy particularly strong in Australia?', options: ['Because most mortgages are variable-rate or fixed for short terms', 'Because Australians have no debt', 'Because the RBA sets house prices', 'Because the exchange rate is fixed'], answer: 0, solution: R`Most Australian home loans are **variable or short-term fixed**, so changes in the cash rate flow through to household repayments quickly.` },
    { type: 'mcq', level: 'Stretch', q: 'According to the expectations-augmented Phillips curve, what happens if policy holds unemployment below the natural rate for a long time?', options: ['Inflation settles permanently at a slightly higher level', 'Inflation keeps rising as expectations adjust upward', 'Inflation falls', 'Nothing, because there is a permanent trade-off'], answer: 1, solution: R`Expected inflation catches up with actual inflation, so to keep unemployment below the natural rate, inflation must keep **accelerating**. There is no permanent trade-off.` },
    { type: 'long', level: 'Stretch', q: 'Explain why a supply shock creates a harder dilemma for a central bank than a demand shock, and describe how anchored inflation expectations change the best response.', answer: R`A demand shock moves output and inflation in the same direction. If demand falls, output drops below potential and inflation falls, so lowering interest rates supports both objectives; if demand surges, raising rates cools both overheating and inflation. There is no conflict.

An adverse supply shock, such as an energy price spike, shifts SRAS left: inflation rises while output and employment fall. Tightening policy would fight inflation but deepen the downturn; easing would support output but add to inflation. The central bank must trade its objectives off against each other.

Anchored expectations change the calculation. If households and firms believe inflation will return to target, a supply shock raises prices once without triggering a wage–price spiral: expected inflation in the Phillips curve stays near 2.5%, so the inflation effect fades by itself. The central bank can then "look through" the first-round effect and respond less aggressively, protecting employment. If expectations are poorly anchored, workers demand higher wages and firms raise prices in anticipation, so the shock becomes persistent inflation, and the central bank must tighten hard, accepting a larger rise in unemployment, to re-establish credibility. This is why central banks value credibility so highly and communicate their commitment to the target so persistently.`, solution: 'Look for the same-direction versus opposite-direction logic, the policy trade-off, and the role of expectations in whether to look through a shock.' },
  ],
  glossary: [
    ['Aggregate demand', 'Total planned spending on final output at each price level.'],
    ['Potential output', 'The output an economy can sustain with full, non-inflationary use of its resources.'],
    ['Output gap', 'The difference between actual and potential output, as a share of potential.'],
    ['Stagflation', 'Rising inflation combined with falling output, typically after a supply shock.'],
    ['Cash rate', 'The overnight interbank interest rate targeted by the RBA.'],
    ['Taylor rule', 'A benchmark relating the policy rate to inflation and the output gap.'],
    ['Automatic stabilisers', 'Tax and spending features that cushion the cycle without new decisions.'],
    ['Primary balance', 'The budget balance excluding interest payments.'],
  ],
  resources: ['RBA_CASH', 'RBA_TRANS', 'RBA_TARGET', 'RBA_SMP', 'BUDGET_BP1', 'TREASURY_AU', 'SBV_EN', 'KHAN_MACRO', 'MIT1402', 'CORE', 'FED_MP'],
};
