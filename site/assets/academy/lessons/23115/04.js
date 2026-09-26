const R = String.raw;
const D = '#5fe3e0', S = '#ff7ab6', N = '#e9b85c';
export default {
  id: '23115-04', subject: '23115', title: 'Efficiency, surplus and market failure', mins: 70, level: 'Foundation',
  summary: 'When do markets serve society well, and when do they fail? Consumer and producer surplus, why competitive markets maximise total surplus, the deadweight loss of taxes and price controls, and the four classic market failures (externalities, public goods, common resources and information problems) with the policy tools used to fix them, including carbon pricing in Australia.',
  objectives: [
    'Measure consumer surplus, producer surplus and total surplus on a supply and demand diagram',
    'Explain why a competitive equilibrium maximises total surplus and calculate the deadweight loss of taxes and price controls',
    'Show how negative and positive externalities cause over- and under-production, and design a Pigouvian tax or subsidy',
    'Compare taxes, cap-and-trade, regulation and bargaining (the Coase theorem) as responses to externalities',
    'Explain public goods, common resources and the free-rider problem',
    'Explain how asymmetric information causes market failure and why financial markets are regulated',
  ],
  body: [
    ['h', 'Judging a market: welfare economics'],
    ['p', R`So far we have asked what markets **do**. Now we ask whether what they do is **good**. Welfare economics measures the benefits that buyers and sellers get from trading and asks whether the market outcome makes those benefits as large as possible. The answer is one of the most important results in economics, and so are its exceptions, because nearly every argument for regulation, taxation and public spending is an argument about one of the exceptions.`],

    ['h', 'Consumer surplus and producer surplus'],
    ['p', R`The height of the demand curve at each quantity is the **willingness to pay** of the marginal buyer: the most that person would pay for that unit. If you would pay up to $7 for a coffee and the price is $4, you gain $3 of value you did not pay for. Adding up these gains across all buyers gives **consumer surplus**: the area below the demand curve and above the price.`],
    ['p', R`Similarly, the height of the supply curve is the **marginal cost** of the marginal seller: the least that seller would accept. A café that can make a coffee for $1.50 and sells it for $4 gains $2.50. Summing gives **producer surplus**: the area above the supply curve and below the price.`],
    ['math', R`\text{Total surplus} = \text{Consumer surplus} + \text{Producer surplus} = \text{Value to buyers} - \text{Cost to sellers}`, 'Total surplus equals consumer surplus plus producer surplus, which equals the value to buyers minus the cost to sellers.'],
    ['example', {
      title: 'Surplus in the coffee market',
      setup: R`Demand \(Q_d = 1{,}000 - 100P\) (so buyers’ highest willingness to pay is $10) and supply \(Q_s = -200 + 200P\) (the lowest-cost seller needs $1). Equilibrium: $4 and 600 thousand cups a day.`,
      steps: [
        R`Consumer surplus: triangle with height \(10 - 4 = 6\) and base 600: \(\tfrac{1}{2} \times 6 \times 600 = \$1{,}800\) thousand a day.`,
        R`Producer surplus: triangle with height \(4 - 1 = 3\) and base 600: \(\tfrac{1}{2} \times 3 \times 600 = \$900\) thousand a day.`,
        R`Total surplus: \$2,700 thousand a day, or about \$2.7 million of value created every day by this market.`,
      ],
      answer: R`Every day this market creates $2.7 million more value for buyers than it costs sellers to produce. Two-thirds goes to buyers here because demand is steeper than supply at the margin.`,
    }],
    ['chart', {
      caption: 'Consumer surplus (teal) and producer surplus (pink) at the $4 equilibrium',
      x: [0, 1000], y: [0, 10], xl: 'Quantity (thousand cups per day)', yl: 'Price ($ per cup)',
      series: [{ label: 'Demand (willingness to pay)', color: D, pts: [[0, 10], [1000, 0]] }, { label: 'Supply (marginal cost)', color: S, pts: [[0, 1], [1000, 6]] }],
      areas: [{ top: [[0, 10], [600, 4]], bottom: [[0, 4], [600, 4]], color: D, opacity: 0.25 }, { top: [[0, 4], [600, 4]], bottom: [[0, 1], [600, 4]], color: S, opacity: 0.25 }],
      marks: [{ x: 600, y: 4, label: 'E', color: '#ffffff' }],
    }],

    ['h', 'Why competitive markets are efficient'],
    ['p', R`An allocation is **efficient** if it maximises total surplus. The competitive equilibrium does exactly that, for three reasons that follow from the diagram.`],
    ['olist', [
      R`**Goods go to the buyers who value them most.** Everyone who buys values the good at least at the price; everyone who does not buy values it less.`,
      R`**Goods are produced by the sellers with the lowest costs.** Every seller who sells has a cost at or below the price; those who do not sell have higher costs.`,
      R`**The quantity is exactly right.** For every unit up to 600, value to the buyer exceeds cost to the seller, so producing it adds surplus. For every unit beyond 600, cost exceeds value, so producing it would destroy surplus. At 600, marginal value equals marginal cost.`,
    ]],
    ['p', R`This is the modern statement of Adam Smith’s "invisible hand": self-interested buyers and sellers, guided only by prices, reach the outcome a benevolent planner would choose, **if** the market is competitive, everyone is well informed, and all costs and benefits fall on the buyers and sellers themselves. Each "if" is a potential market failure.`],
    ['warn', R`Efficiency is not fairness. A market can be efficient while leaving some people very poor, because surplus depends on willingness to pay, which depends on income. Economists usually separate the question of the size of the pie (efficiency) from how it is shared (equity), and recommend tax-and-transfer policies for the second rather than distorting prices.`],

    ['h', 'Deadweight loss'],
    ['p', R`Any policy that pushes quantity away from the efficient level destroys surplus that no one gets. This lost surplus is called **deadweight loss (DWL)**.`],
    ['h3', 'The deadweight loss of a tax'],
    ['p', R`In lecture 2, a $0.60 tax per cup raised the buyers’ price to $4.40, cut the sellers’ price to $3.80 and reduced quantity to 560. Surplus now splits into four parts: consumer surplus \(\tfrac12(10 - 4.40)(560) = 1{,}568\); producer surplus \(\tfrac12(3.80 - 1)(560) = 784\); tax revenue \(0.60 \times 560 = 336\); total \(2{,}688\). Before the tax total surplus was 2,700. The missing \$12 thousand a day is the deadweight loss:`],
    ['math', R`\text{DWL} = \tfrac{1}{2} \times \text{tax} \times \Delta Q = \tfrac{1}{2} \times 0.60 \times (600 - 560) = 12`, 'The deadweight loss equals one half times the tax times the fall in quantity, which is one half times sixty cents times forty, equals twelve.'],
    ['p', R`Two lessons follow. First, deadweight loss is larger when demand and supply are **more elastic**, because quantity falls more. Second, it grows with the **square** of the tax: doubling the tax to $1.20 reduces quantity to 520, and the DWL becomes \(\tfrac12 \times 1.20 \times 80 = 48\), four times as large. This is why economists prefer broad taxes at low rates to narrow taxes at high rates, and why the design of the GST, income tax and company tax matters so much.`],
    ['h3', 'The deadweight loss of a price ceiling'],
    ['p', R`With a ceiling of $3.50, sellers supply only 500 thousand cups. At that quantity, the marginal buyer would pay $5.00 and the marginal seller’s cost is $3.50. The trades between 500 and 600 that no longer happen cost \(\tfrac12 \times (5.00 - 3.50) \times 100 = \$75\) thousand a day of surplus. Buyers who do get coffee gain, but sellers lose more, and the queueing and search costs of rationing often add further losses not shown in the diagram.`],

    ['h', 'Market failure 1: externalities'],
    ['p', R`An **externality** is a cost or benefit that falls on people outside the transaction. The buyer and seller ignore it, so the market quantity is wrong from society’s point of view.`],
    ['list', [
      R`**Negative externalities**: pollution from coal-fired power, traffic congestion, noise, antibiotic resistance from overuse, second-hand smoke. The market **over-produces**.`,
      R`**Positive externalities**: vaccination (protects others), education (a more productive, informed society), research and development (knowledge spills over to other firms), well-kept gardens. The market **under-produces**.`,
    ]],
    ['example', {
      title: 'Electricity with pollution',
      setup: R`In a regional electricity market, demand is \(P = 200 - Q\) and the private marginal cost of generation is \(P = 20 + Q\) (\(P\) in dollars per megawatt-hour, \(Q\) in thousand MWh). Burning coal imposes an external cost of $30 per MWh in health and climate damage, so the **social** marginal cost is \(P = 50 + Q\).`,
      steps: [
        R`Market outcome (ignoring the externality): \(200 - Q = 20 + Q \Rightarrow Q = 90\), \(P = \$110\).`,
        R`Efficient outcome (including it): \(200 - Q = 50 + Q \Rightarrow Q = 75\), \(P = \$125\).`,
        R`The market over-produces by 15 thousand MWh. For those units the cost to society exceeds the value to buyers. Deadweight loss \(= \tfrac12 \times 30 \times 15 = \$225\) thousand.`,
      ],
      answer: R`A tax of exactly $30 per MWh, equal to the marginal external cost, would make generators face the full social cost and restore the efficient quantity of 75. Such a tax is called a **Pigouvian tax**, after the economist Arthur Pigou.`,
    }],
    ['chart', {
      caption: 'A negative externality: the market produces 90, the efficient quantity is 75',
      x: [0, 150], y: [0, 200], xl: 'Electricity (thousand MWh)', yl: 'Price ($ per MWh)',
      series: [{ label: 'Demand (marginal benefit)', color: D, pts: [[0, 200], [150, 50]] }, { label: 'Private marginal cost', color: S, pts: [[0, 20], [150, 170]] }, { label: 'Social marginal cost (+$30)', color: N, dash: '6 4', pts: [[0, 50], [150, 200]] }],
      areas: [{ top: [[75, 125], [90, 140]], bottom: [[75, 125], [90, 110]], color: '#ff5d73', opacity: 0.55 }],
      marks: [{ x: 90, y: 110, label: 'Market (90, $110)', color: S }, { x: 75, y: 125, label: 'Efficient (75, $125)', color: N }],
      note: 'The red triangle is the deadweight loss from over-production: units whose social cost exceeds their value.',
    }],
    ['h3', 'Fixing externalities'],
    ['table', {
      caption: 'Policy responses to externalities',
      head: ['Tool', 'How it works', 'Strengths', 'Weaknesses'],
      rows: [
        ['Pigouvian tax', 'Tax equal to the marginal external cost', 'Achieves any given reduction at least cost; raises revenue', 'Requires knowing the damage; politically unpopular'],
        ['Cap-and-trade', 'Set a cap on total emissions; firms trade permits', 'Certainty about the quantity; lowest-cost firms abate most', 'Uncertain price; design and monitoring are complex'],
        ['Regulation (command and control)', 'Mandate technologies or limits', 'Simple to understand and enforce', 'Ignores differences in abatement costs, so usually more expensive'],
        ['Subsidy for positive externalities', 'Pay for the external benefit', 'Encourages vaccination, R&D, training', 'Costs taxpayers; may pay for things that would happen anyway'],
        ['Coasian bargaining', 'Clear property rights let parties negotiate', 'No government needed', 'Works only with few parties and low transaction costs'],
      ],
    }],
    ['p', R`Australia’s main industrial carbon policy is the **Safeguard Mechanism**, a baseline-and-credit scheme for facilities emitting more than 100,000 tonnes of CO₂-equivalent a year. Each facility’s baseline generally declines by **4.9% a year to 2030**; facilities that emit below their baseline earn credits they can sell, and those above must buy credits or carbon offsets (source: DCCEEW, high confidence). It is a form of cap-and-trade applied to the largest emitters. The European Union’s Emissions Trading System is a larger cap-and-trade example, and many economists favour an economy-wide carbon price as the least-cost approach.`],
    ['note', R`The **Coase theorem** (Ronald Coase, 1960) says that if property rights are clear and bargaining is cheap, private negotiation reaches the efficient outcome regardless of who holds the rights: a farm harmed by a factory’s runoff and the factory will negotiate a deal. Its real lesson is the converse: externalities persist because property rights are unclear and transaction costs are high, as with millions of people breathing the same air.`],

    ['h', 'Market failure 2: public goods and common resources'],
    ['p', R`Goods can be classified by two properties. A good is **excludable** if people who do not pay can be prevented from using it, and **rival** if one person’s use reduces what is available to others.`],
    ['table', {
      caption: 'Four types of goods',
      head: ['', 'Rival', 'Non-rival'],
      rows: [
        ['Excludable', 'Private goods: coffee, clothes, a car', 'Club goods: streaming services, toll roads when uncongested, software'],
        ['Non-excludable', 'Common resources: ocean fish, groundwater, clean air', 'Public goods: national defence, basic research, street lighting, flood warnings'],
      ],
    }],
    ['p', R`**Public goods** suffer from the **free-rider problem**: because no one can be excluded, each person has an incentive to let others pay. A private firm cannot profitably supply them, even when the benefits far exceed the costs. That is why they are usually funded through taxes. **Common resources** suffer the opposite problem, the **tragedy of the commons**: because no one can be excluded but use is rival, each user overuses the resource, ignoring the cost imposed on others. Overfishing is the textbook case; responses include quotas, tradable fishing rights and marine parks.`],

    ['h', 'Market failure 3: asymmetric information'],
    ['p', R`Markets also fail when one side knows much more than the other. You met the two forms in Financial Literacy, and they are central to finance.`],
    ['list', [
      R`**Adverse selection** (hidden information before a deal): in health insurance, people who know they are high-risk are keenest to buy, so insurers raise premiums, which drives out low-risk buyers, which raises premiums further. This is why Australia uses community rating for private health insurance and the Medicare levy surcharge and Lifetime Health Cover loadings to keep younger, healthier people in the pool.`,
      R`**Moral hazard** (hidden action after a deal): an insured driver may take less care; a bank that expects a government bailout may take excessive risks. Deductibles, co-payments, capital requirements and supervision are all responses.`,
    ]],
    ['p', R`Markets develop their own solutions: **signalling** (a university degree signals ability; a company paying dividends signals confidence), **screening** (insurers’ medical questions; banks’ credit checks), warranties, reputations and independent ratings. Where these are not enough, regulation fills the gap: mandatory disclosure in prospectuses and product disclosure statements, licensing of advisers, prudential supervision of banks and insurers, and deposit guarantees. Much of the Financial System subject is about exactly these institutions.`],

    ['h', 'Market failure 4: market power, and government failure'],
    ['p', R`The final classic failure is **market power**: a single seller or a few sellers can raise prices above marginal cost, restricting output and creating deadweight loss. Lectures 5 and 6 analyse monopoly and oligopoly in depth.`],
    ['p', R`Market failure is a necessary but not sufficient case for government action, because governments fail too. **Government failure** includes regulators who lack information, policies captured by the industries they regulate (**regulatory capture**), lobbying for special privileges (**rent-seeking**), short electoral horizons and unintended consequences. The right comparison is always between an imperfect market and an imperfect government intervention. Independent bodies such as Australia’s Productivity Commission exist partly to evaluate that trade-off.`],

    ['case', {
      title: 'Congestion on Sydney’s roads',
      text: R`Each extra car entering a busy Sydney motorway at peak hour slows every other driver slightly. The driver considers only their own travel time, fuel and toll. Sydney already has many tolled roads, but tolls are mostly fixed charges to repay construction costs rather than prices that vary with congestion. Singapore and London use congestion charges that rise at busy times.`,
      questions: [
        'Explain why peak-hour driving is over-produced, using the idea of a negative externality.',
        'How should an efficient congestion charge vary through the day? Why?',
        'Who gains and who loses from a congestion charge? How could the revenue be used to address fairness concerns?',
        'What government failures might affect the design of such a scheme?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Consumer surplus is value above price; producer surplus is price above cost; their sum is total surplus.`,
      R`A competitive equilibrium maximises total surplus when there are no market failures; efficiency is not the same as fairness.`,
      R`Taxes and price controls create deadweight loss, which grows with elasticity and with the square of the tax.`,
      R`Externalities cause over- or under-production; Pigouvian taxes, cap-and-trade, regulation, subsidies and Coasian bargaining are the remedies.`,
      R`Public goods face free riders; common resources are overused; asymmetric information causes adverse selection and moral hazard.`,
      R`Market failure justifies considering intervention, but government failure must be weighed too.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`In a market with demand \(Q_d = 240 - 4P\) and supply \(Q_s = -60 + 6P\), the equilibrium is \(P = 30\), \(Q = 120\). What is consumer surplus?`, answer: 1800, tol: 0.5, hint: R`Demand reaches zero quantity at \(P = 60\).`, solution: R`Consumer surplus \(= \tfrac12 \times (60 - 30) \times 120 = 1{,}800\).` },
    { type: 'num', level: 'Core', q: R`In the same market, what is producer surplus?`, answer: 1200, tol: 0.5, hint: R`Supply starts at \(P = 10\).`, solution: R`Producer surplus \(= \tfrac12 \times (30 - 10) \times 120 = 1{,}200\). Total surplus is 3,000.` },
    { type: 'num', level: 'Core', q: R`A per-unit tax of 5 in the same market reduces quantity from 120 to 108. What is the deadweight loss?`, answer: 30, tol: 0.1, solution: R`\(\text{DWL} = \tfrac12 \times 5 \times (120 - 108) = 30\).` },
    { type: 'num', level: 'Stretch', q: R`Demand is \(P = 100 - 2Q\) and private marginal cost is \(P = 10 + Q\). Each unit imposes an external cost of 15. What is the deadweight loss of the unregulated market?`, answer: 37.5, tol: 0.1, solution: R`Market: \(100 - 2Q = 10 + Q \Rightarrow Q = 30\). Efficient: \(100 - 2Q = 25 + Q \Rightarrow Q = 25\). \(\text{DWL} = \tfrac12 \times 15 \times (30 - 25) = 37.5\).` },
    { type: 'num', level: 'Core', q: R`In the previous question, what Pigouvian tax per unit would restore the efficient quantity?`, answer: 15, tol: 0.01, solution: R`A tax equal to the marginal external cost, **15** per unit, makes producers face the full social cost.` },
    { type: 'mcq', level: 'Core', q: 'A lighthouse warning ships of rocks is best classified as…', options: ['A private good', 'A club good', 'A common resource', 'A public good'], answer: 3, solution: R`No ship can be excluded from seeing the light, and one ship’s use does not reduce another’s: non-excludable and non-rival, a **public good**.` },
    { type: 'mcq', level: 'Core', q: 'Why does the deadweight loss of a tax grow faster than the tax rate?', options: ['Because tax revenue falls', 'Because DWL is a triangle whose height (the tax) and base (the fall in quantity) both grow with the tax', 'Because buyers always bear the whole tax', 'Because supply becomes perfectly elastic'], answer: 1, solution: R`Both dimensions of the DWL triangle rise with the tax, so DWL rises roughly with the **square** of the tax.` },
    { type: 'mcq', level: 'Core', q: 'After buying comprehensive car insurance, a driver starts parking in riskier places. This is an example of…', options: ['Adverse selection', 'Moral hazard', 'A positive externality', 'The free-rider problem'], answer: 1, solution: R`A change in behaviour after the contract because someone else bears part of the cost is **moral hazard**.` },
    { type: 'mcq', level: 'Stretch', q: 'Which tool gives the most certainty about the total quantity of emissions?', options: ['A Pigouvian carbon tax', 'Cap-and-trade', 'A subsidy for solar panels', 'Voluntary pledges'], answer: 1, solution: R`**Cap-and-trade** fixes the quantity (the cap) and lets the permit price adjust. A carbon tax fixes the price and lets the quantity adjust.` },
    { type: 'long', level: 'Stretch', q: 'Explain why basic scientific research is likely to be under-provided by private markets, and evaluate two ways the Australian government could respond.', answer: R`Basic research produces knowledge that is largely non-rival (one firm’s use of an idea does not reduce another’s) and hard to exclude others from once it is published or observed. The firm funding the research bears the full cost but captures only part of the benefit, because competitors, other industries and future researchers also benefit: a large positive externality with public-good characteristics. Each firm therefore invests less than the socially efficient amount, and many would prefer to free-ride on others’ discoveries.

One response is **direct public funding**, for example through university research grants and public research agencies. This targets basic research that no firm would fund, but it requires government to choose projects well and can be vulnerable to political priorities. A second response is **subsidies or tax incentives for private R&D**, such as Australia’s R&D Tax Incentive. These use firms’ knowledge of commercial opportunities, but they may pay for research that would have happened anyway, favour applied over basic research, and invite reclassification of ordinary spending as R&D. Stronger **intellectual property rights** (patents) are a third option: they make knowledge partly excludable, raising the private return, but they also create temporary monopoly and deadweight loss. A balanced system usually combines all three.`, solution: 'Look for the non-rival and non-excludable nature of knowledge, the externality argument, and a critical evaluation of at least two policy responses.' },
  ],
  glossary: [
    ['Consumer surplus', 'The value buyers receive above what they pay.'],
    ['Producer surplus', 'The amount sellers receive above their cost.'],
    ['Deadweight loss', 'Total surplus lost because quantity differs from the efficient level.'],
    ['Externality', 'A cost or benefit that falls on people outside a transaction.'],
    ['Pigouvian tax', 'A tax equal to the marginal external cost of an activity.'],
    ['Public good', 'A good that is non-excludable and non-rival.'],
    ['Tragedy of the commons', 'Overuse of a rival resource that no one can be excluded from.'],
    ['Government failure', 'When intervention makes outcomes worse, for example through capture or poor information.'],
  ],
  resources: ['CORE', 'OS_ECO', 'KHAN_MICRO', 'MIT1401', 'SAFEGUARD', 'PC', 'book:MANKIW'],
};
