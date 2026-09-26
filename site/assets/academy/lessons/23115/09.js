const R = String.raw;
const D = '#5fe3e0', S = '#ff7ab6', N = '#e9b85c';
export default {
  id: '23115-09', subject: '23115', title: 'The open economy: trade, exchange rates and the balance of payments', mins: 80, level: 'Intermediate',
  summary: 'Australia and Vietnam are both deeply open economies. The terms of trade, the welfare effects of tariffs and trade agreements, the balance of payments and what a current account deficit really means, how exchange rates are quoted and determined, purchasing power and interest rate parity, exchange-rate regimes and the impossible trinity, and how currency moves hit firms and investors.',
  objectives: [
    'Explain the terms of trade and why they matter so much for Australia',
    'Analyse the welfare effects of a tariff and evaluate free-trade agreements',
    'Explain the structure of the balance of payments and the identity linking saving, investment and the current account',
    'Quote and convert exchange rates, and distinguish nominal, real and trade-weighted exchange rates',
    'Apply purchasing power parity and covered interest rate parity',
    'Compare exchange-rate regimes, explain the impossible trinity and assess currency exposure for firms',
  ],
  body: [
    ['h', 'Open economies'],
    ['p', R`Exports and imports each amount to roughly a quarter of Australia’s GDP, and Australia relies on foreign investors to fund part of its investment. Vietnam is even more open: its total trade (exports plus imports of electronics, textiles, footwear, furniture, components and agricultural products) is well above the size of its GDP, making it one of the most trade-dependent economies in the world. For both countries, what happens in China, the United States, Japan and South Korea, and in the currency markets, shapes incomes, jobs and asset prices at home. This lecture completes Economics for Business by opening the economy to the world.`],

    ['h', 'What Australia and Vietnam trade'],
    ['p', R`Comparative advantage, from lecture 1, explains the pattern. Australia is rich in land, minerals and energy and has an internationally competitive services sector, so it exports **iron ore, coal, natural gas, gold, beef, wheat, education and tourism**, and imports manufactured goods such as vehicles, machinery, electronics and refined fuel. Vietnam has abundant labour, has attracted large foreign direct investment into manufacturing, and is integrated into Asian supply chains, so it exports **phones and electronic components, computers, textiles and garments, footwear, furniture, seafood, coffee and rice**, while importing components, machinery and materials. Australia exports coal, iron ore and cotton to Vietnam; Vietnam exports phones, clothing and seafood to Australia. Each specialises where its opportunity cost is lowest.`],
    ['h3', 'The terms of trade'],
    ['p', R`The **terms of trade** is the ratio of export prices to import prices:`],
    ['math', R`\text{Terms of trade} = \frac{\text{Index of export prices}}{\text{Index of import prices}} \times 100`, 'The terms of trade equals the export price index divided by the import price index, times one hundred.'],
    ['p', R`A rise means a given volume of exports buys more imports: the country becomes richer without producing more. Because Australia’s exports are concentrated in commodities whose prices swing widely, its terms of trade are among the most volatile in the developed world. The mining boom of the 2000s, driven by Chinese demand for iron ore and coal, raised Australia’s terms of trade to record highs, boosting national income, the Australian dollar, company profits and tax revenue. The terms of trade fell **1.6%** in the June quarter 2026 (source: ABS National Accounts, high confidence). For investors, the terms of trade are a key driver of the Australian dollar and of resources-sector earnings.`],

    ['h', 'Trade policy: tariffs and trade agreements'],
    ['p', R`A **tariff** is a tax on imports. It raises the domestic price above the world price, which helps domestic producers but hurts consumers. Consider a small country that cannot affect the world price.`],
    ['example', {
      title: 'The welfare effects of a tariff',
      setup: R`Domestic demand for a good is \(Q_d = 200 - 2P\) and domestic supply is \(Q_s = 2P - 40\). The world price is \(P_w = 50\), and the country can import any amount at that price. The government imposes a tariff of 5 per unit.`,
      steps: [
        R`Free trade: domestic consumption \(= 200 - 100 = 100\); domestic production \(= 100 - 40 = 60\); imports \(= 40\).`,
        R`With the tariff the domestic price rises to 55: consumption \(= 90\), production \(= 70\), imports \(= 20\).`,
        R`Consumers lose surplus of \(5 \times 90 + \tfrac12 \times 5 \times 10 = 475\). Producers gain \(5 \times 60 + \tfrac12 \times 5 \times 10 = 325\). Government revenue \(= 5 \times 20 = 100\).`,
        R`Net loss \(= 475 - 325 - 100 = 50\): a **production distortion** of \(\tfrac12 \times 5 \times 10 = 25\) (high-cost domestic production replaces cheaper imports) plus a **consumption distortion** of 25 (buyers who valued the good above the world price no longer buy it).`,
      ],
      answer: R`The tariff transfers income from consumers to producers and the government, and destroys 50 of surplus in deadweight loss. This is why most economists favour low tariffs, while acknowledging that the gains are spread thinly across consumers and the losses concentrated on specific industries and workers, which makes protection politically attractive.`,
    }],
    ['chart', {
      caption: 'A tariff raises the domestic price from 50 to 55 and halves imports',
      x: [0, 140], y: [20, 100], xl: 'Quantity', yl: 'Price',
      series: [{ label: 'Domestic demand', color: D, pts: [[40, 80], [140, 30]] }, { label: 'Domestic supply', color: S, pts: [[0, 20], [120, 80]] }, { label: 'World price (50)', color: '#aaaaaa', dash: '4 4', pts: [[0, 50], [140, 50]] }, { label: 'World price + tariff (55)', color: N, dash: '6 4', pts: [[0, 55], [140, 55]] }],
      areas: [{ top: [[70, 55], [90, 55]], bottom: [[70, 50], [90, 50]], color: N, opacity: 0.3 }, { top: [[60, 50], [70, 55]], bottom: [[60, 50], [70, 50]], color: '#ff5d73', opacity: 0.6 }, { top: [[90, 55], [100, 50]], bottom: [[90, 50], [100, 50]], color: '#ff5d73', opacity: 0.6 }],
      marks: [{ x: 60, y: 50, label: 'Qs 60', color: S }, { x: 100, y: 50, label: 'Qd 100', color: D }, { x: 70, y: 55, label: 'Qs 70', color: S }, { x: 90, y: 55, label: 'Qd 90', color: D }],
      note: 'Gold rectangle: tariff revenue. Red triangles: deadweight loss from over-production (left) and under-consumption (right).',
    }],
    ['p', R`**Free-trade agreements** reduce tariffs and other barriers among members. Australia and Vietnam are both members of the Comprehensive and Progressive Agreement for Trans-Pacific Partnership (**CPTPP**) and the Regional Comprehensive Economic Partnership (**RCEP**), as well as the ASEAN–Australia–New Zealand FTA. Agreements also cover services, investment, intellectual property and rules of origin. Economists distinguish **trade creation** (members switching to lower-cost suppliers within the bloc) from **trade diversion** (switching from a cheaper non-member to a dearer member because of the preferential tariff), which can reduce welfare.`],
    ['note', R`Trade policy became more volatile after 2018 and especially from 2025, when the United States sharply raised tariffs on many trading partners. Vietnam, with a large trade surplus with the US, was especially exposed. Higher tariffs, supply-chain relocation from China to Vietnam and elsewhere, and rules against transshipment are now central issues for manufacturers and investors in Asia. The economics of this lecture tells you who gains and loses; the politics decides what happens next.`],

    ['h', 'The balance of payments'],
    ['p', R`The **balance of payments** records all transactions between a country’s residents and the rest of the world. It has two main parts, which must sum to zero apart from statistical errors, because every international transaction is recorded twice (a payment and what it paid for).`],
    ['table', {
      caption: 'Structure of the balance of payments',
      head: ['Account', 'Contents', 'Australia, June quarter 2026 (seasonally adjusted)'],
      rows: [
        ['Current account', 'Goods and services trade, primary income (interest, dividends, wages paid across borders), secondary income (transfers)', 'Deficit of $27.2 billion'],
        ['— Goods and services', 'Exports minus imports', 'Deficit of $5.1 billion'],
        ['— Net primary income', 'Income earned on foreign investments minus income paid to foreign investors', 'Deficit of $21.9 billion'],
        ['Capital and financial account', 'Direct investment, portfolio investment (shares and bonds), other investment and reserve assets', 'Surplus of $5.3 billion'],
        ['Net international investment position', 'Stock of foreign assets minus foreign liabilities', 'Net liability of $638.9 billion at 30 June 2026'],
      ],
    }],
    ['p', R`(Source: ABS Balance of Payments, released 1 September 2026, high confidence.) Australia usually runs a current account deficit, dominated by **net primary income payments**: dividends and interest paid to the foreign investors who own a large share of Australian mines, banks’ wholesale funding and government bonds. The counterpart is a financial account surplus: foreigners invest in Australia.`],
    ['h3', 'Saving, investment and the current account'],
    ['p', R`From the national accounts identity, national saving minus domestic investment equals the current account balance:`],
    ['math', R`S - I = CA \qquad \text{where} \quad S = S_{\text{private}} + S_{\text{government}}`, 'National saving minus investment equals the current account balance, where national saving is private plus government saving.'],
    ['p', R`A current account deficit means the country invests more than it saves and borrows the difference from abroad. Whether that is a problem depends on **why**. Borrowing to finance productive investment, such as new mines and infrastructure that will generate export income, can be perfectly sustainable; Australia has run current account deficits for most of its modern history while becoming very rich. Borrowing to finance consumption, or relying on short-term foreign-currency debt, is riskier, as several Asian economies discovered in 1997. Because most of Australia’s foreign debt is in Australian dollars or hedged, a fall in the dollar does not raise its burden the way it did for those economies.`],
    ['warn', R`A current account deficit is not a "loss" and a surplus is not a "profit". They describe the balance between national saving and investment. Judging them requires asking what the borrowing finances and how it is structured.`],

    ['h', 'Exchange rates'],
    ['h3', 'Quotes and conventions'],
    ['p', R`An exchange rate is the price of one currency in terms of another. Conventions matter: the Australian dollar is usually quoted as **US dollars per Australian dollar** (AUD/USD = 0.70 means A$1 buys US$0.70), while the Vietnamese dong is usually quoted as **dong per US dollar** (USD/VND ≈ 26,000). In late September 2026, AUD/USD was about 0.70 and USD/VND about 26,000, so one Australian dollar bought roughly 18,200 dong (source: JayV live price board, medium confidence; rates change every second). When A$1 buys more foreign currency, the Australian dollar has **appreciated**; when it buys less, it has **depreciated**.`],
    ['defs', [
      ['Nominal exchange rate', 'The rate you see quoted: units of one currency per unit of another.'],
      ['Real exchange rate', 'The nominal rate adjusted for relative price levels: how many foreign goods one domestic good buys.'],
      ['Trade-weighted index (TWI)', 'The value of a currency against a basket of trading partners’ currencies, weighted by trade shares. The RBA publishes a TWI for the Australian dollar.'],
    ]],
    ['math', R`\text{Real exchange rate} = e \times \frac{P_{\text{domestic}}}{P_{\text{foreign}}}`, 'The real exchange rate equals the nominal rate, in foreign currency per domestic unit, times the domestic price level divided by the foreign price level.'],
    ['p', R`If AUD/USD is 0.70 and Australian prices have risen 10% more than US prices since a base period (\(P_{AU} = 110\), \(P_{US} = 100\)), the real exchange rate is \(0.70 \times 110/100 = 0.77\): Australian goods have become relatively dearer even though the nominal rate has not changed. Competitiveness depends on the real rate.`],
    ['h3', 'What moves the Australian dollar?'],
    ['list', [
      R`**Commodity prices and the terms of trade**: higher iron ore and gas prices raise demand for Australian dollars. The AUD is often called a "commodity currency".`,
      R`**Interest-rate differentials**: higher Australian rates relative to US rates attract capital inflows and tend to lift the dollar.`,
      R`**Global risk sentiment**: in global sell-offs investors flee to the US dollar and other safe havens, and the AUD typically falls, one reason unhedged foreign assets diversify Australian portfolios.`,
      R`**Relative inflation** over the long run (purchasing power parity, below).`,
      R`**Capital flows** into Australian assets such as mines, property and bonds.`,
    ]],
    ['h3', 'Purchasing power parity'],
    ['p', R`**Absolute purchasing power parity (PPP)** says the same basket of goods should cost the same everywhere once converted into a common currency. It fails over short horizons because of transport costs, non-traded services and market frictions, but it has some pull over long periods. *The Economist*’s **Big Mac index** is a light-hearted test: if a Big Mac costs A$7.70 in Sydney and US$5.80 in New York (illustrative prices), the PPP exchange rate is \(5.80/7.70 = 0.753\). At an actual rate of 0.70, the Australian dollar would be about 7% **undervalued** on this measure.`],
    ['p', R`**Relative PPP** says exchange rates adjust to offset inflation differences: if Australian inflation is 3.5% and US inflation 2.5%, the AUD should depreciate by roughly 1% a year against the USD, from 0.70 to about \(0.70 \times 1.025/1.035 = 0.693\). The evidence supports relative PPP better over decades than over months.`],
    ['h3', 'Covered interest rate parity'],
    ['p', R`In deep currency markets, **forward exchange rates** are tied to interest rates by arbitrage. An investor can either invest in Australian dollars at \(i_{AUD}\), or convert to US dollars, invest at \(i_{USD}\), and lock in the conversion back with a forward contract. Both must give the same return, otherwise there is a riskless profit. With \(S\) and \(F\) quoted as US dollars per Australian dollar:`],
    ['math', R`F = S \times \frac{1 + i_{\text{USD}}}{1 + i_{\text{AUD}}}`, 'The forward rate equals the spot rate times one plus the US interest rate, over one plus the Australian interest rate.'],
    ['example', {
      title: 'The one-year AUD/USD forward',
      setup: R`Spot AUD/USD = 0.7000. One-year interest rates: 4.35% in Australia, 3.50% in the US (illustrative).`,
      steps: [
        R`\(F = 0.7000 \times 1.035/1.0435 = 0.6943\).`,
        R`The forward is about 0.0057 (57 "points") below spot: the higher-yielding currency trades at a **forward discount**.`,
      ],
      answer: R`The forward discount exactly offsets the interest-rate advantage, so there is no free lunch from converting at spot, earning higher Australian interest and hedging back. Covered interest parity holds closely in practice and is the basis for pricing currency forwards and hedges, which you will study in The Financial System and Derivative Securities. Note that the forward is not a forecast of the future spot rate.`,
    }],

    ['h', 'Exchange-rate regimes'],
    ['table', {
      caption: 'Regimes in practice',
      head: ['Regime', 'How it works', 'Example'],
      rows: [
        ['Free float', 'The market sets the rate; the central bank rarely intervenes', 'Australian dollar since December 1983; US dollar'],
        ['Managed float or crawling band', 'The central bank sets a reference rate and allows movement within a band, intervening as needed', 'Vietnamese dong: a daily central rate with a ±5% trading band since October 2022'],
        ['Fixed peg or currency board', 'The rate is fixed to another currency and backed by reserves', 'Hong Kong dollar to the US dollar'],
        ['Currency union', 'Countries share one currency', 'The euro area'],
      ],
    }],
    ['h3', 'The impossible trinity'],
    ['p', R`A country cannot simultaneously have (1) a fixed exchange rate, (2) free capital mobility and (3) an independent monetary policy. It can choose at most two. Australia chooses free capital flows and independent monetary policy, so the exchange rate floats and acts as a **shock absorber**: when commodity prices collapse, the dollar falls, cushioning exporters and the economy. Hong Kong chooses a fixed rate and open capital flows, so its interest rates must follow US rates. China and Vietnam have historically managed their exchange rates and retained some capital controls to keep monetary flexibility.`],

    ['h', 'Currency risk for firms and investors'],
    ['example', {
      title: 'An Australian exporter’s currency exposure',
      setup: R`A Queensland beef exporter earns US$10 million a year. Its costs are in Australian dollars.`,
      steps: [
        R`At AUD/USD 0.70, revenue \(= 10{,}000{,}000/0.70 = \$14.29\) million.`,
        R`If the AUD rises to 0.75, revenue \(= \$13.33\) million, a fall of about \$0.95 million with no change in the business.`,
      ],
      answer: R`A stronger Australian dollar hurts exporters and helps importers; a weaker one does the reverse. Firms manage this with **natural hedges** (matching foreign-currency costs or debt to foreign revenues) and **financial hedges** (forwards and options). Investors holding foreign shares face the same exposure and must decide whether to hedge it.`,
    }],
    ['p', R`For a Vietnamese family sending money to a student in Australia, or a Vietnamese company borrowing in US dollars, the same logic applies. Borrowing in a foreign currency when your income is in dong creates **currency mismatch**: if the dong depreciates, the debt burden rises in dong terms. Currency mismatches in company balance sheets were at the heart of the 1997 Asian financial crisis.`],

    ['case', {
      title: 'A falling Australian dollar',
      text: R`Suppose that over six months iron ore prices fall 30% as Chinese steel production slows, the US Federal Reserve holds rates steady while the RBA cuts, and global markets become nervous. The Australian dollar falls from 0.70 to 0.62 against the US dollar.`,
      questions: [
        'Explain each force behind the depreciation using the determinants in this lecture.',
        'How does the depreciation act as a shock absorber for the Australian economy? Who gains and who loses?',
        'What happens to the Australian-dollar value of an unhedged portfolio of US shares if US share prices are unchanged?',
        'How would the effects differ for Vietnam, whose currency is managed within a band against the US dollar?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Trade follows comparative advantage; the terms of trade drive Australian national income and the dollar.`,
      R`Tariffs transfer surplus to producers and government and create deadweight loss; FTAs such as CPTPP and RCEP cut barriers but can divert trade.`,
      R`The current account deficit equals investment minus national saving; Australia’s is dominated by income paid to foreign investors.`,
      R`Know your quotes: AUD/USD in US dollars per A$, USD/VND in dong per US$. Competitiveness depends on the real exchange rate.`,
      R`PPP works over the long run; covered interest parity links forwards to interest rates: \(F = S(1 + i_f)/(1 + i_d)\).`,
      R`The impossible trinity forces a choice among fixed rates, open capital and monetary independence; Australia floats, Vietnam manages a band.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`Export prices rise 12% and import prices rise 4%. By what percentage do the terms of trade change? (Two decimals.)`, answer: 7.69, tol: 0.01, solution: R`\(1.12/1.04 - 1 = 7.69\%\).` },
    { type: 'num', level: 'Core', q: R`In the lecture’s tariff example (\(Q_d = 200 - 2P\), \(Q_s = 2P - 40\), world price 50), what is the deadweight loss of a tariff of 10?`, answer: 200, tol: 0.5, solution: R`With a tariff of 10 the price is 60: \(Q_d = 80\), \(Q_s = 80\): imports fall to zero. Production distortion \(= \tfrac12 \times 10 \times (80 - 60) = 100\); consumption distortion \(= \tfrac12 \times 10 \times (100 - 80) = 100\). DWL \(= 200\), and tariff revenue is zero: the tariff is prohibitive.` },
    { type: 'num', level: 'Core', q: R`A Vietnamese student’s family sends 250,000,000 dong when one Australian dollar costs 18,250 dong. How many Australian dollars arrive before fees? (Two decimals.)`, answer: 13698.63, tol: 0.5, solution: R`\(250{,}000{,}000/18{,}250 = \$13{,}698.63\).` },
    { type: 'num', level: 'Core', q: R`Spot AUD/USD is 0.7000. One-year rates are 4.35% in Australia and 4.00% in the US. What is the one-year forward rate (US$ per A$)? (Four decimals.)`, answer: 0.6977, tol: 0.0001, solution: R`\(F = 0.70 \times 1.04/1.0435 = 0.6977\): a forward discount on the higher-yielding Australian dollar.` },
    { type: 'num', level: 'Stretch', q: R`USD/VND spot is 26,000. One-year interest rates are 4.5% on dong deposits and 3.5% on US dollar deposits. What is the covered-interest-parity one-year forward USD/VND rate? (Nearest dong.)`, answer: 26251, tol: 2, hint: 'Here the quote is dong per US dollar, so the dong rate goes in the numerator.', solution: R`\(F = 26{,}000 \times 1.045/1.035 = 26{,}251\) dong per US dollar. The dong, with the higher interest rate, trades at a forward discount (more dong per dollar in the forward).` },
    { type: 'num', level: 'Core', q: R`A country’s national saving is 22% of GDP and domestic investment is 25% of GDP. What is its current account balance, as a percentage of GDP? (Include the sign.)`, answer: -3, tol: 0.01, solution: R`\(CA = S - I = 22\% - 25\% = -3\%\) of GDP: a deficit financed by foreign borrowing or investment.` },
    { type: 'mcq', level: 'Core', q: 'The largest component of Australia’s current account deficit in the June quarter 2026 was…', options: ['The goods trade balance', 'Net primary income paid to foreign investors', 'Foreign aid', 'Tourism'], answer: 1, solution: R`Net primary income was a deficit of about $21.9 billion, against a $5.1 billion goods and services deficit: most of the gap reflects **income paid to foreign owners** of Australian assets.` },
    { type: 'mcq', level: 'Core', q: 'Which combination does Australia choose under the impossible trinity?', options: ['Fixed exchange rate and independent monetary policy', 'Free capital mobility and independent monetary policy, with a floating currency', 'Fixed exchange rate and free capital mobility', 'All three'], answer: 1, solution: R`Australia has **open capital markets and an independent RBA**, so the dollar floats.` },
    { type: 'mcq', level: 'Stretch', q: 'The AUD rises sharply against the USD. Which firm is most likely to benefit, other things equal?', options: ['An Australian iron ore exporter paid in US dollars', 'An Australian retailer importing goods priced in US dollars', 'A Queensland tourism operator relying on US visitors', 'An Australian university enrolling fee-paying international students'], answer: 1, solution: R`A stronger AUD makes US-dollar imports **cheaper** for the retailer. The others earn foreign-currency revenue or sell to foreigners, which becomes less competitive or worth fewer Australian dollars.` },
    { type: 'long', level: 'Stretch', q: 'A commentator says: "Australia’s persistent current account deficit proves the country is living beyond its means and heading for a crisis." Evaluate this claim.', answer: R`The claim confuses an accounting identity with a verdict. The current account balance equals national saving minus investment. A deficit means Australia invests more than it saves and uses foreign capital to finance the difference. Whether that is "living beyond its means" depends on what the capital finances and how it is structured.

Much of Australia’s foreign capital has financed investment in mines, energy projects, infrastructure and housing, which generate future output and export income. Indeed, the deficit today is dominated by net primary income: dividends and interest paid to the foreign investors who own that capital, which is the return on past investment rather than new consumption borrowing. Australia has run current account deficits for most of its history while achieving high living standards.

Crisis risk depends on structure. Countries that suffered crises, such as several in Asia in 1997, borrowed short-term in foreign currencies with fixed exchange rates, so a depreciation multiplied their debt burden and triggered sudden stops. Australia has a floating exchange rate that absorbs shocks, a large share of its foreign liabilities in Australian dollars or hedged back into them, a well-regulated banking system and credible institutions. The main vulnerabilities are banks’ reliance on offshore wholesale funding and the size of the net foreign liability, which require monitoring rather than alarm. So the claim is overstated, though a deficit financing consumption with foreign-currency debt would deserve concern.`, solution: 'Look for the S − I identity, the investment versus consumption distinction, the role of primary income, and the structural safeguards (floating rate, AUD-denominated or hedged liabilities).' },
  ],
  glossary: [
    ['Terms of trade', 'The ratio of export prices to import prices.'],
    ['Tariff', 'A tax on imports.'],
    ['Current account', 'The record of trade in goods and services, primary income and transfers with the rest of the world.'],
    ['Net international investment position', 'A country’s foreign assets minus its foreign liabilities.'],
    ['Real exchange rate', 'The nominal exchange rate adjusted for relative price levels.'],
    ['Purchasing power parity', 'The theory that exchange rates adjust so that goods cost the same across countries.'],
    ['Covered interest parity', 'The arbitrage condition linking forward and spot exchange rates to interest rates.'],
    ['Impossible trinity', 'A country cannot have a fixed exchange rate, free capital flows and independent monetary policy at once.'],
  ],
  resources: ['ABS_BOP', 'RBA_STATS', 'RBA_EXPL', 'SBV_EN', 'MIT1454', 'KHAN_MACRO', 'MIT1402', 'CORE', 'WB'],
};
