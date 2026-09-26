const R = String.raw;
const D = '#5fe3e0', S = '#ff7ab6', N = '#e9b85c';
export default {
  id: '23115-02', subject: '23115', title: 'Demand, supply and market equilibrium', mins: 70, level: 'Foundation',
  summary: 'The workhorse model of economics: what drives demand and supply, how the market finds an equilibrium price and quantity, how shifts change the outcome, what price ceilings, floors and taxes do, and who really pays a tax, worked graphically and with algebra.',
  objectives: [
    'Explain the law of demand and the law of supply and list the factors that shift each curve',
    'Distinguish a movement along a curve from a shift of the curve',
    'Solve for equilibrium price and quantity algebraically from linear demand and supply equations',
    'Predict the effects of shifts in demand and supply, including simultaneous shifts',
    'Analyse price ceilings and floors and calculate the resulting shortage or surplus',
    'Calculate the incidence of a per-unit tax on buyers and sellers',
  ],
  body: [
    ['h', 'A model that explains most prices'],
    ['p', R`Why did Sydney rents jump after borders reopened in 2022? Why do iron ore prices swing with Chinese construction? Why did robusta coffee prices, much of which comes from Vietnam’s Central Highlands, surge in 2024 after drought? Why does a concert ticket resell for three times its face value? A single model answers all of these: **supply and demand**. It describes a **competitive market**, one with many buyers and sellers, none large enough to set the price alone. Few markets are perfectly competitive, but the model is the starting point for understanding them all, including markets for shares, bonds and currencies.`],

    ['h', 'Demand'],
    ['p', R`The **quantity demanded** of a good is the amount buyers are willing and able to purchase at a given price, during a given period, holding everything else constant. The **law of demand** says that, other things equal, when the price rises the quantity demanded falls. Two forces lie behind it: the **substitution effect** (at a higher price, other goods become relatively cheaper, so buyers switch) and the **income effect** (a higher price reduces what a given income can buy).`],
    ['p', R`A **demand schedule** lists quantities demanded at each price; plotting it gives the downward-sloping **demand curve**. We will use a running example: the market for takeaway coffee in a city centre, where \(Q\) is thousands of cups a day and \(P\) is dollars per cup.`],
    ['math', R`Q_d = 1{,}000 - 100P`, 'Quantity demanded equals one thousand minus one hundred times the price.'],
    ['p', R`At $4 a cup, buyers want \(1{,}000 - 400 = 600\) thousand cups a day; at $5, only 500 thousand. A change in the coffee’s own price moves us **along** the demand curve: a change in **quantity demanded**. Anything else that changes buyers’ willingness to pay **shifts** the whole curve: a change in **demand**.`],
    ['table', {
      caption: 'What shifts the demand curve',
      head: ['Factor', 'Effect on demand', 'Example'],
      rows: [
        ['Income', 'Rises for a **normal good**; falls for an **inferior good**', 'Higher incomes raise demand for restaurant meals but may lower demand for instant noodles'],
        ['Price of a substitute', 'A higher substitute price raises demand', 'Dearer tea raises demand for coffee'],
        ['Price of a complement', 'A higher complement price lowers demand', 'Dearer milk lowers demand for flat whites'],
        ['Tastes and information', 'Shift either way', 'A health study praising coffee raises demand'],
        ['Expectations', 'Expected future price rises increase demand today', 'Buyers rush to buy property before an expected price rise'],
        ['Number of buyers', 'More buyers raise market demand', 'Returning office workers and international students'],
      ],
    }],
    ['warn', R`"Demand increased" and "quantity demanded increased" mean different things. A fall in the price of coffee increases the **quantity demanded** (movement along the curve). A rise in office attendance increases **demand** (the curve shifts right). Mixing these up is the most common error in economics exams, and in financial commentary.`],

    ['h', 'Supply'],
    ['p', R`The **quantity supplied** is the amount sellers are willing and able to sell at a given price. The **law of supply** says that, other things equal, a higher price raises the quantity supplied: a higher price makes production more profitable, draws in more producers and justifies using more expensive inputs such as overtime. In our coffee market:`],
    ['math', R`Q_s = -200 + 200P`, 'Quantity supplied equals minus two hundred plus two hundred times the price.'],
    ['p', R`Below $1 a cup no coffee is supplied at all (it would not cover the cost of beans, milk and cups); at $4, cafés supply 600 thousand cups. Again, a change in the good’s own price moves us **along** the supply curve, while other factors **shift** it.`],
    ['list', [
      R`**Input prices**: dearer coffee beans, rent or wages shift supply left (less is supplied at each price).`,
      R`**Technology and productivity**: a faster espresso machine shifts supply right.`,
      R`**Number of sellers**: new cafés opening shift supply right.`,
      R`**Expectations**: producers expecting higher future prices may hold back supply today (important for commodities that can be stored).`,
      R`**Taxes and subsidies**: a per-unit tax on sellers shifts supply up by the amount of the tax; a subsidy shifts it down.`,
      R`**Natural conditions**: drought, floods and disease shift agricultural supply, as Vietnam’s coffee growers and Australia’s grain farmers know well.`,
    ]],

    ['h', 'Equilibrium'],
    ['p', R`The market is in **equilibrium** where the quantity demanded equals the quantity supplied. At that price, every buyer who wants to buy at that price can, and every seller who wants to sell can. Set \(Q_d = Q_s\):`],
    ['math', R`1{,}000 - 100P = -200 + 200P \;\Rightarrow\; 1{,}200 = 300P \;\Rightarrow\; P^{*} = \$4.00,\quad Q^{*} = 1{,}000 - 100(4) = 600`, 'One thousand minus one hundred P equals minus two hundred plus two hundred P, so twelve hundred equals three hundred P, so the equilibrium price is four dollars and the equilibrium quantity is six hundred.'],
    ['chart', {
      caption: 'The coffee market: equilibrium at $4.00 and 600,000 cups a day',
      x: [0, 1000], y: [0, 10], xl: 'Quantity (thousand cups per day)', yl: 'Price ($ per cup)',
      series: [{ label: 'Demand: Qd = 1,000 − 100P', color: D, pts: [[0, 10], [1000, 0]] }, { label: 'Supply: Qs = −200 + 200P', color: S, pts: [[0, 1], [1000, 6]] }],
      marks: [{ x: 600, y: 4, label: 'E (600, $4)', color: '#ffffff' }],
      hlines: [{ v: 4, color: '#888' }],
    }],
    ['p', R`Why does the market get there? If the price were $5, sellers would offer 800 thousand cups but buyers would want only 500 thousand: a **surplus** of 300 thousand. Unsold coffee and idle baristas push cafés to cut prices. If the price were $3, buyers would want 700 thousand but sellers would offer only 400 thousand: a **shortage** of 300 thousand, with queues and sold-out signs that let cafés raise prices. Only at $4 is there no pressure to change. Real markets rarely sit exactly at equilibrium, but they are constantly pulled towards it.`],

    ['h', 'When the curves shift'],
    ['p', R`The power of the model lies in **comparative statics**: comparing the equilibrium before and after a change. Always follow three steps: decide which curve shifts, decide which direction, then read off the new equilibrium.`],
    ['example', {
      title: 'Office workers return',
      setup: R`More people return to city offices, raising demand at every price by 150 thousand cups: \(Q_d = 1{,}150 - 100P\).`,
      steps: [
        R`Which curve? Demand (the number of buyers changed). Direction: right.`,
        R`New equilibrium: \(1{,}150 - 100P = -200 + 200P \Rightarrow P = \$4.50\), \(Q = 700\).`,
      ],
      answer: R`An increase in demand raises **both** the price (from $4.00 to $4.50) and the quantity (from 600 to 700 thousand cups). The quantity supplied rises because the higher price moves cafés **along** their supply curve; supply itself has not changed.`,
    }],
    ['chart', {
      caption: 'An increase in demand raises price and quantity',
      x: [0, 1000], y: [0, 10], xl: 'Quantity (thousand cups per day)', yl: 'Price ($ per cup)',
      series: [{ label: 'Original demand', color: D, pts: [[0, 10], [1000, 0]] }, { label: 'New demand: Qd = 1,150 − 100P', color: N, dash: '6 4', pts: [[150, 10], [1000, 1.5]] }, { label: 'Supply', color: S, pts: [[0, 1], [1000, 6]] }],
      marks: [{ x: 600, y: 4, label: 'E₁', color: '#ffffff' }, { x: 700, y: 4.5, label: 'E₂ (700, $4.50)', color: N }],
    }],
    ['example', {
      title: 'A drought raises bean prices',
      setup: R`Higher bean costs reduce supply by 150 thousand cups at every price: \(Q_s = -350 + 200P\). Demand is back at its original level.`,
      steps: [
        R`Which curve? Supply (an input price changed). Direction: left.`,
        R`New equilibrium: \(1{,}000 - 100P = -350 + 200P \Rightarrow P = \$4.50\), \(Q = 550\).`,
      ],
      answer: R`A decrease in supply raises the price but **lowers** the quantity. Notice how the direction of the quantity change tells you which curve moved: rising price with rising quantity signals a demand shift; rising price with falling quantity signals a supply shift. Analysts use exactly this reasoning to interpret commodity markets.`,
    }],
    ['h3', 'Two shifts at once'],
    ['p', R`If demand rises and supply falls together (office workers return **and** beans get dearer), both shifts push the price up, so the price certainly rises: here to \(1{,}150 - 100P = -350 + 200P \Rightarrow P = \$5.00\). But the quantity effect is ambiguous: demand pushes it up, supply pushes it down. With these numbers \(Q = 650\), up from 600, but a larger supply shock would have reduced it.`],
    ['table', {
      caption: 'Summary of shifts',
      head: ['Change', 'Equilibrium price', 'Equilibrium quantity'],
      rows: [
        ['Demand increases', 'Rises', 'Rises'],
        ['Demand decreases', 'Falls', 'Falls'],
        ['Supply increases', 'Falls', 'Rises'],
        ['Supply decreases', 'Rises', 'Falls'],
        ['Demand up, supply up', 'Ambiguous', 'Rises'],
        ['Demand up, supply down', 'Rises', 'Ambiguous'],
      ],
    }],
    ['note', R`The same logic prices financial assets. When investors expect higher earnings from a company, demand for its shares rises and the price rises. When the government issues more bonds to fund a deficit, bond supply rises, bond prices tend to fall and yields rise. The Financial System and Investment Analysis subjects build on this intuition.`],

    ['h', 'When governments set prices'],
    ['h3', 'Price ceilings'],
    ['p', R`A **price ceiling** is a legal maximum price. It only matters (is "binding") if it is set **below** the equilibrium price. Suppose a council caps coffee at $3.50 a cup. Buyers want \(1{,}000 - 350 = 650\) thousand cups; cafés supply only \(-200 + 700 = 500\) thousand. The result is a **shortage** of 150 thousand cups a day.`],
    ['p', R`Shortages do not disappear; they are rationed in other ways: queues, "sold out" signs, favouritism, lower quality (smaller cups, cheaper beans) and black markets. Rent control is the classic real-world ceiling. Economists overwhelmingly agree that strict rent caps reduce the quantity and quality of rental housing over time, even though they help sitting tenants in the short run. That is a positive conclusion; whether the trade-off is worth it is a normative question.`],
    ['h3', 'Price floors'],
    ['p', R`A **price floor** is a legal minimum price, binding when set **above** equilibrium. A $5 minimum price for coffee would mean buyers want 500 thousand cups while cafés offer 800 thousand: a **surplus** of 300 thousand. The most important price floor in practice is the **minimum wage**. In a simple competitive labour market, a minimum wage above equilibrium creates unemployment among low-skilled workers. The real-world evidence is more nuanced, because many labour markets are not perfectly competitive (employers may have wage-setting power, which we study in lecture 5), and moderate minimum-wage increases often have small measured employment effects. Australia’s Fair Work Commission weighs these trade-offs in its annual wage review.`],

    ['h', 'Taxes: who really pays?'],
    ['p', R`Suppose the government imposes a tax of $0.60 on every cup, collected from cafés. Cafés now need $0.60 more per cup to supply any given quantity, so the supply curve shifts **up** by $0.60. If \(P\) is the price buyers pay, sellers keep \(P - 0.60\):`],
    ['math', R`Q_s = -200 + 200(P - 0.60) = -320 + 200P`, 'Quantity supplied equals minus two hundred plus two hundred times P minus sixty cents, which is minus three hundred and twenty plus two hundred P.'],
    ['steps', [
      R`New equilibrium: \(1{,}000 - 100P = -320 + 200P \Rightarrow P_B = \$4.40\) (price buyers pay), \(Q = 560\).`,
      R`Price sellers keep: \(P_S = 4.40 - 0.60 = \$3.80\).`,
      R`Buyers pay \(\$0.40\) more than before; sellers receive \(\$0.20\) less. Buyers bear two-thirds of the tax, sellers one-third.`,
      R`Tax revenue: \(0.60 \times 560 = \$336\) thousand a day. Quantity falls from 600 to 560: some mutually beneficial trades no longer happen.`,
    ]],
    ['chart', {
      caption: 'A $0.60 per-cup tax: buyers pay $4.40, sellers keep $3.80',
      x: [0, 1000], y: [0, 10], xl: 'Quantity (thousand cups per day)', yl: 'Price ($ per cup)',
      series: [{ label: 'Demand', color: D, pts: [[0, 10], [1000, 0]] }, { label: 'Supply', color: S, pts: [[0, 1], [1000, 6]] }, { label: 'Supply + tax', color: N, dash: '6 4', pts: [[0, 1.6], [1000, 6.6]] }],
      areas: [{ top: [[0, 4.4], [560, 4.4]], bottom: [[0, 3.8], [560, 3.8]], color: N, opacity: 0.22 }, { top: [[560, 4.4], [600, 4]], bottom: [[560, 3.8], [600, 4]], color: '#ff5d73', opacity: 0.55 }],
      marks: [{ x: 560, y: 4.4, label: 'Buyers pay $4.40', color: N }, { x: 560, y: 3.8, label: 'Sellers keep $3.80', color: S }, { x: 600, y: 4, color: '#ffffff' }],
      note: 'The shaded rectangle is tax revenue ($336k a day). The small red triangle is the deadweight loss from trades that no longer happen, studied in lecture 4.',
    }],
    ['key', R`Who pays a tax does not depend on who legally hands the money to the government. It depends on how responsive buyers and sellers are to price. The less responsive side bears more of the burden. With linear curves, the buyers’ share equals the supply slope divided by the sum of the slopes: here \(200/(200 + 100) = 2/3\).`],
    ['p', R`If the same $0.60 tax were collected from buyers instead, the demand curve would shift down by $0.60, and the outcome would be identical: buyers pay $4.40 in total, sellers keep $3.80. This surprising result is why economists care about **economic incidence** rather than **statutory incidence**. It explains, for example, why employer payroll taxes and superannuation contributions are ultimately borne partly by workers through lower wage growth. Lecture 3 makes this precise with elasticity.`],

    ['case', {
      title: 'Rents in Sydney after the borders reopened',
      text: R`When Australia’s international borders reopened in 2022, net overseas migration rebounded strongly, with many international students arriving within a short period. At the same time, higher interest rates and construction costs slowed the completion of new dwellings. Advertised rents in Sydney and Melbourne rose sharply, and rental vacancy rates fell to very low levels. Several state governments considered rent caps, while others focused on planning reform to allow more housing.`,
      questions: [
        'Use a supply and demand diagram to explain the rise in rents. Which curves shifted, and in which direction?',
        'Why might the short-run supply of rental housing be very unresponsive to price, and what does that imply for the size of the rent increase?',
        'Predict the effects of a binding rent cap on the quantity and quality of rental housing in the short and long run.',
        'Which policies would shift supply to the right? What are their costs?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Demand slopes down and supply slopes up; a change in own price moves along a curve, other factors shift it.`,
      R`Equilibrium is where \(Q_d = Q_s\); surpluses push prices down, shortages push them up.`,
      R`Demand shifts move price and quantity in the same direction; supply shifts move them in opposite directions.`,
      R`Binding ceilings create shortages; binding floors create surpluses; both ration by means other than price.`,
      R`A per-unit tax drives a wedge between the price buyers pay and the price sellers keep; the less price-responsive side bears more of it, whoever legally pays.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`Demand for a product is \(Q_d = 240 - 4P\) and supply is \(Q_s = -60 + 6P\). What is the equilibrium price?`, answer: 30, tol: 0.01, solution: R`\(240 - 4P = -60 + 6P \Rightarrow 300 = 10P \Rightarrow P^* = 30\). Then \(Q^* = 240 - 120 = 120\).` },
    { type: 'num', level: 'Core', q: R`In the previous market, what is the equilibrium quantity?`, answer: 120, tol: 0.01, solution: R`\(Q^* = 240 - 4(30) = 120\), and supply gives \(-60 + 6(30) = 120\). ✓` },
    { type: 'num', level: 'Core', q: R`The government imposes a price ceiling of 25 in the same market. How large is the shortage?`, answer: 50, tol: 0.01, solution: R`At \(P = 25\): \(Q_d = 240 - 100 = 140\); \(Q_s = -60 + 150 = 90\). Shortage \(= 140 - 90 = 50\).` },
    { type: 'num', level: 'Stretch', q: R`A per-unit tax of 5 is imposed on sellers in the same market. What price do buyers now pay?`, answer: 33, tol: 0.01, hint: R`Supply becomes \(Q_s = -60 + 6(P - 5)\).`, solution: R`\(240 - 4P = -60 + 6(P - 5) = -90 + 6P \Rightarrow 330 = 10P \Rightarrow P_B = 33\). Sellers keep 28. Buyers bear \(3/5\) of the tax, because \(6/(6+4) = 0.6\). Quantity falls to 108.` },
    { type: 'num', level: 'Core', q: R`In the lecture’s coffee market (\(Q_d = 1{,}000 - 100P\), \(Q_s = -200 + 200P\)), what would the surplus be, in thousands of cups, at a price floor of $5.50?`, answer: 450, tol: 0.5, solution: R`\(Q_d = 1{,}000 - 550 = 450\); \(Q_s = -200 + 1{,}100 = 900\). Surplus \(= 900 - 450 = 450\) thousand cups a day.` },
    { type: 'mcq', level: 'Core', q: 'The price of airline tickets rises and the number of tickets sold also rises. What is the most likely explanation?', options: ['Supply increased', 'Demand increased', 'Supply decreased', 'Demand decreased'], answer: 1, solution: R`Price and quantity moving in the **same** direction signals a demand shift; both rising means **demand increased** (for example, a holiday season or reopened borders).` },
    { type: 'mcq', level: 'Core', q: 'Butter and margarine are substitutes. If the price of butter rises, what happens in the margarine market?', options: ['Demand for margarine falls', 'Demand for margarine rises', 'Supply of margarine rises', 'Quantity demanded of margarine falls along the curve'], answer: 1, solution: R`A higher price of a substitute raises **demand** for margarine: the demand curve shifts right, raising margarine’s price and quantity.` },
    { type: 'mcq', level: 'Core', q: 'Which of the following causes a movement along the demand curve for Vietnamese coffee, rather than a shift?', options: ['A rise in Australian incomes', 'A health report praising coffee', 'A fall in the price of Vietnamese coffee', 'A rise in the price of tea'], answer: 2, solution: R`Only a change in the good’s **own price** moves along the curve. The other options change demand and shift the curve.` },
    { type: 'mcq', level: 'Stretch', q: 'Demand rises and supply rises at the same time. What can we say for certain?', options: ['Price rises', 'Price falls', 'Quantity rises', 'Nothing can be said'], answer: 2, solution: R`Both shifts increase quantity, so **quantity rises** for certain. They push price in opposite directions, so the price effect depends on the relative sizes of the shifts.` },
    { type: 'long', level: 'Stretch', q: 'A state government proposes to "make landlords pay" a new annual levy of $500 per rental property, arguing that tenants will not be affected. Using supply, demand and tax incidence, evaluate this claim.', answer: R`A levy on landlords is a tax on the supply of rental housing. It raises landlords’ cost of providing each dwelling, which shifts the supply curve up by about $500 a year (roughly $9.60 a week). The new equilibrium involves a higher rent paid by tenants and a lower net rent kept by landlords; the split depends on relative price responsiveness, not on who legally pays.

In the short run, the stock of rental housing is almost fixed: dwellings cannot quickly disappear, so supply is very unresponsive. Then landlords bear most of the levy in the short run, and rents rise only a little. In the long run, supply is more responsive: some investors sell to owner-occupiers or build less, and the rental stock grows more slowly. As supply becomes more responsive relative to demand, a larger share of the levy is passed on to tenants through higher rents. Demand for rental housing is itself fairly unresponsive (people need somewhere to live), which also pushes more of the burden onto tenants over time.

So the claim that tenants "will not be affected" is not supported by economic reasoning: tenants are likely to bear a growing share over time. Statutory incidence (who pays the government) differs from economic incidence (who bears the cost).`, solution: 'Look for the supply shift, the distinction between statutory and economic incidence, the role of price responsiveness, and the short-run versus long-run difference.' },
  ],
  glossary: [
    ['Law of demand', 'Other things equal, a higher price lowers the quantity demanded.'],
    ['Law of supply', 'Other things equal, a higher price raises the quantity supplied.'],
    ['Equilibrium', 'The price at which quantity demanded equals quantity supplied.'],
    ['Normal good', 'A good whose demand rises when income rises.'],
    ['Inferior good', 'A good whose demand falls when income rises.'],
    ['Price ceiling', 'A legal maximum price; binding below equilibrium, causing shortages.'],
    ['Price floor', 'A legal minimum price; binding above equilibrium, causing surpluses.'],
    ['Tax incidence', 'How the burden of a tax is shared between buyers and sellers.'],
  ],
  resources: ['CORE', 'OS_ECO', 'KHAN_MICRO', 'MIT1401', 'BOE_KB', 'book:MANKIW'],
};
