const R = String.raw;
export default {
  id: '23115-01', subject: '23115', title: 'Thinking like an economist', mins: 60, level: 'Foundation',
  summary: 'The core ideas that make economics a way of thinking: scarcity and opportunity cost, marginal decisions, incentives, sunk costs, the production possibility frontier, comparative advantage and the gains from trade, how economists use models, and the difference between positive and normative claims.',
  objectives: [
    'Explain scarcity and measure opportunity cost in money and in goods',
    'Make decisions at the margin by comparing marginal benefit and marginal cost, and ignore sunk costs',
    'Draw and interpret a production possibility frontier, including increasing opportunity cost',
    'Identify comparative advantage and calculate the gains from specialisation and trade',
    'Describe the circular flow of income and the role of prices as signals',
    'Distinguish positive from normative statements and explain why economists use simplified models',
  ],
  body: [
    ['h', 'Economics is the study of choice under scarcity'],
    ['p', R`Economics is often described as the study of money, markets or the economy. Those are its subjects, but its core is a way of thinking. **Scarcity** means that our wants exceed the resources available to satisfy them: time, money, land, labour, materials, attention. Because resources are scarce, every person, firm and government must **choose**, and every choice means giving something up. Economics is the systematic study of how those choices are made, how they interact in markets, and what the consequences are for the whole society.`],
    ['p', R`Economists divide the subject into two halves. **Microeconomics** studies individual decision-makers (households and firms) and how they interact in particular markets: why is rent so high in Sydney, how should a café price its coffee, what happens when a supermarket chain merges with a rival? **Macroeconomics** studies the economy as a whole: growth, inflation, unemployment, interest rates, exchange rates and government budgets. A finance professional needs both, because asset prices respond to firm-level news and to economy-wide shocks.`],
    ['key', R`Scarcity forces choice, and every choice has a cost measured by the best alternative given up. That single sentence contains the whole of economics in miniature.`],

    ['h', 'Opportunity cost'],
    ['p', R`The **opportunity cost** of an action is the value of the best alternative you give up to take it. It is the only cost that matters for decisions, and it is often not the same as the money you pay.`],
    ['example', {
      title: 'What does a year at university really cost?',
      setup: R`A domestic student pays tuition of about $16,000 a year (deferred through HELP), buys books for $800, and pays rent and food of $22,000. Instead of studying full time, the student could work full time for $55,000 a year before tax (illustrative figures).`,
      steps: [
        R`Tuition and books are genuine costs of studying: $16,800.`,
        R`Rent and food are **not** extra costs of studying, because the student would pay for somewhere to live and something to eat either way (unless study forces a more expensive city).`,
        R`The largest cost is the **forgone income**: roughly $55,000 before tax, or about $46,000 after tax.`,
        R`Economic cost of a year of study \(\approx 16{,}800 + 46{,}000 = \$62{,}800\), almost four times the tuition.`,
      ],
      answer: R`The opportunity cost of study is dominated by forgone earnings, not fees. Studying is still usually an excellent investment, because a degree raises lifetime earnings by far more; the point is that the comparison must use the right costs.`,
    }],
    ['p', R`Firms think the same way. A company that owns its office building pays no rent, but using the building has an opportunity cost: the rent it could have earned by leasing it out. Accountants record explicit costs; economists add implicit costs such as forgone rent and the return the owners could have earned elsewhere. The difference between **accounting profit** and **economic profit** is exactly those implicit opportunity costs, an idea you will meet again as the cost of capital in finance.`],
    ['math', R`\text{Economic profit} = \text{Total revenue} - \text{Explicit costs} - \text{Implicit (opportunity) costs}`, 'Economic profit equals total revenue minus explicit costs minus implicit, or opportunity, costs.'],

    ['h', 'Thinking at the margin'],
    ['p', R`Most real decisions are not all-or-nothing. They are about **a little more or a little less**: one more hour of study, one more worker, one more hour of opening, one more dollar of advertising. Economists call these **marginal** changes. The rule for good decisions is simple: take an action if and only if its **marginal benefit** exceeds its **marginal cost**, and keep expanding an activity until the two are equal.`],
    ['example', {
      title: 'Should the café stay open later?',
      setup: R`A café is deciding how many hours to open in the evening. Each extra hour requires staff, power and ingredients costing $95 (rising to $120 for the sixth hour because of penalty rates). The extra gross profit from sales falls as the evening gets later.`,
      steps: [
        R`Hour 1: marginal benefit $180, marginal cost $95, net +$85.`,
        R`Hour 2: $160 vs $95, +$65. Hour 3: $140 vs $95, +$45. Hour 4: $110 vs $95, +$15.`,
        R`Hour 5: $80 vs $95, −$15. Hour 6: $60 vs $120, −$60.`,
      ],
      answer: R`The café should open four extra hours. The fifth hour still brings in $80 of gross profit, which sounds good, but it costs $95 to produce. Average figures ("the evening makes money overall") would hide this; marginal analysis reveals it.`,
    }],
    ['h3', 'Sunk costs are sunk'],
    ['p', R`A **sunk cost** is a cost that has already been incurred and cannot be recovered whatever you decide now. Because it is the same under every option, it should not affect the decision. Yet people, and organisations, routinely let sunk costs drive choices: finishing a bad film because the ticket was expensive, or pouring money into a failing project because "we have already spent so much". Psychologists call this the **sunk-cost fallacy**.`],
    ['example', {
      title: 'The half-built system',
      setup: R`A company has spent $2 million on a new software system. Finishing it will cost another $1 million. Once finished, it is expected to generate benefits worth $1.5 million in present-value terms. A manager argues: "We will have spent $3 million for $1.5 million of benefits, so we should abandon it."`,
      steps: [
        R`The $2 million is sunk: it is gone whether the project continues or stops.`,
        R`Continue: pay $1 million more, receive $1.5 million. Net gain \(= +\$0.5\) million.`,
        R`Stop: pay nothing more, receive nothing. Net gain \(= 0\).`,
      ],
      answer: R`The company should finish the system: it is $0.5 million better off than abandoning it. The original decision may have been a mistake, but that is a lesson for the future, not a reason to make a second mistake now. This is exactly the logic of net present value that you will use in capital budgeting.`,
    }],
    ['h3', 'People respond to incentives'],
    ['p', R`Because people compare marginal benefits and costs, changing those benefits or costs changes behaviour. A tax on sugary drinks raises their price and reduces consumption; a subsidy for home batteries increases installations; performance bonuses tied to short-term sales can encourage employees to mis-sell products, as Australia’s Banking Royal Commission (2019) documented in detail. Good policy and good management start by asking what behaviour an incentive will actually produce, including the unintended kind.`],

    ['h', 'The production possibility frontier'],
    ['p', R`A **production possibility frontier (PPF)** shows the combinations of two goods an economy can produce with its available resources and technology, if those resources are used efficiently. Points on the frontier are efficient, points inside it waste resources (for example, unemployment), and points outside it are unattainable today.`],
    ['table', {
      caption: 'An economy’s production possibilities (illustrative)',
      head: ['Point', 'Machinery (units)', 'Food (tonnes)', 'Opportunity cost of each extra unit of machinery'],
      rows: [
        ['A', '0', '100', '—'],
        ['B', '10', '95', '0.5 tonnes of food'],
        ['C', '20', '85', '1.0 tonne'],
        ['D', '30', '65', '2.0 tonnes'],
        ['E', '40', '35', '3.0 tonnes'],
        ['F', '45', '0', '7.0 tonnes'],
      ],
    }],
    ['p', R`The opportunity cost of machinery rises as the economy produces more of it. The first units are made by the workers and land best suited to machinery and least useful for farming; later units require moving excellent farmland and skilled farmers into factories. This **increasing opportunity cost** gives the PPF its bowed-out shape. The slope of the frontier at any point is the opportunity cost.`],
    ['p', R`The frontier shifts outwards when the economy acquires more resources (population growth, investment in capital) or better technology. That outward shift **is** economic growth. Choosing more machinery today (investment) instead of food (consumption) can shift the frontier out faster in the future: the same trade-off between consuming now and investing for later that sits at the centre of finance.`],

    ['h', 'Comparative advantage and the gains from trade'],
    ['p', R`Why do people and countries trade? The obvious answer, that each buys what it cannot make, is incomplete. David Ricardo’s insight, two centuries old and still one of the most important ideas in economics, is that trade benefits both parties even when one of them is better at producing **everything**. What matters is not absolute advantage but **comparative advantage**: producing a good at a lower opportunity cost.`],
    ['table', {
      caption: 'Output per worker per week (illustrative)',
      head: ['Country', 'Rice (tonnes)', 'Machinery (units)', 'Opportunity cost of 1 machine', 'Opportunity cost of 1 tonne of rice'],
      rows: [
        ['Australia', '6', '3', '2 tonnes of rice', '0.5 machines'],
        ['Vietnam', '4', '1', '4 tonnes of rice', '0.25 machines'],
      ],
    }],
    ['p', R`Australia is more productive in both goods: it has an **absolute advantage** in both. But Vietnam gives up only 0.25 machines to produce a tonne of rice, while Australia gives up 0.5, so Vietnam has the **comparative advantage in rice**. Australia gives up only 2 tonnes of rice per machine, against 4 for Vietnam, so Australia has the **comparative advantage in machinery**.`],
    ['example', {
      title: 'Specialisation makes both countries richer',
      setup: R`Each country has 100 workers. Without trade, each splits its workers evenly between the two goods.`,
      steps: [
        R`No trade: Australia produces 300 rice and 150 machines; Vietnam produces 200 rice and 50 machines. World total: 500 rice, 200 machines.`,
        R`With specialisation: Vietnam puts all 100 workers into rice (400 tonnes). Australia puts 30 workers into rice (180) and 70 into machinery (210). World total: **580 rice and 210 machines**, more of both goods from the same workers.`,
        R`Trade at a price between the two opportunity costs, say 3 tonnes of rice per machine: Vietnam sends 180 tonnes of rice to Australia in exchange for 60 machines.`,
        R`Vietnam now consumes 220 rice and 60 machines (up from 200 and 50). Australia consumes 360 rice and 150 machines (up from 300 and 150).`,
      ],
      answer: R`Both countries consume more than they could produce alone. The gains come from each producing where its opportunity cost is lowest. Any price between 2 and 4 tonnes of rice per machine benefits both; where it lands decides how the gains are shared.`,
    }],
    ['note', R`Comparative advantage explains much of Australia’s trade: it exports iron ore, coal, gas, education and agricultural products, and imports manufactured goods. It also explains why you should not do everything yourself: even if you are a faster typist than a professional, your time may be worth more analysing investments. But notice what the model leaves out: workers in the shrinking industry lose out unless they can move, which is why trade policy debates focus so much on adjustment and redistribution.`],

    ['h', 'The circular flow and the role of prices'],
    ['p', R`A market economy coordinates millions of decisions without a central planner. The **circular flow** diagram shows how: households sell labour and capital to firms in **factor markets** and receive wages, rent, interest and profit; they spend that income on goods and services from firms in **product markets**. Governments tax and spend; the financial system channels saving into investment; the rest of the world buys exports and sells imports.`],
    ['p', R`Prices hold this system together. A price is a **signal** (it tells producers what consumers value and consumers what resources are scarce) and an **incentive** (a higher price rewards producers who supply more and consumers who use less). When a drought cuts the wheat harvest, the rising wheat price automatically tells millers to economise, farmers elsewhere to plant more and consumers to substitute rice, without anyone needing to know why. Friedrich Hayek emphasised that prices summarise dispersed information that no planner could ever collect. The next lecture shows exactly how supply and demand determine those prices.`],

    ['h', 'How economists use models'],
    ['p', R`Economic models, like maps, are deliberately simplified. A map of Sydney’s train network ignores buildings and hills because they are irrelevant to the question it answers. An economic model makes **assumptions** to isolate the forces that matter for a question. The most important assumption is **ceteris paribus**, "other things equal": we change one variable at a time to see its effect. A model is judged not by whether its assumptions are literally true, but by whether it explains and predicts the phenomenon it was built for.`],
    ['warn', R`The danger is forgetting the assumptions. A model that assumes perfectly rational, fully informed agents is useful for many questions but misleading for others, such as why people fall for scams or buy extended warranties. You will study these limits in the behavioural finance subject.`],
    ['h3', 'Positive and normative statements'],
    ['list', [
      R`A **positive** statement describes how the world is and can be tested with evidence: "Raising the minimum wage by 10% reduces teenage employment by 2%."`,
      R`A **normative** statement says how the world should be and involves values: "The minimum wage should be raised."`,
    ]],
    ['p', R`Economists often agree on positive questions and disagree on normative ones, because people weigh efficiency, fairness and freedom differently. When you read economic commentary, and when you write it, separate the two. A strong analysis states the evidence, then states the value judgement openly.`],

    ['case', {
      title: 'The Bega Valley dairy farmer',
      text: R`A dairy farmer in New South Wales owns her land outright, works 60 hours a week on the farm and earns an accounting profit of $70,000 a year. A developer has offered to lease the land for $45,000 a year, and a regional co-operative has offered her a management job paying $85,000. Last year she spent $120,000 on a new milking shed that has no resale value. Milk prices have fallen, and she is considering whether to keep farming, lease the land and take the job, or sell.`,
      questions: [
        'Calculate her economic profit from farming, listing the implicit costs.',
        'How should the $120,000 spent on the milking shed affect her decision?',
        'Which non-financial factors might rationally lead her to keep farming even if economic profit is negative?',
        'Write one positive and one normative statement about Australian dairy policy.',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Scarcity forces choice; the cost of any choice is the best alternative given up (opportunity cost).`,
      R`Decide at the margin: act while marginal benefit exceeds marginal cost. Ignore sunk costs.`,
      R`Economic profit subtracts implicit opportunity costs that accounting profit ignores.`,
      R`The PPF shows efficient production; its bowed shape reflects increasing opportunity cost, and growth shifts it out.`,
      R`Comparative advantage, not absolute advantage, determines who should produce what, and trade can make both sides better off.`,
      R`Prices act as signals and incentives; models simplify on purpose; keep positive and normative claims apart.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A graduate can take a job paying $62,000 after tax or do a one-year master’s degree with fees of $38,000 (and no income). Living costs are the same either way. What is the opportunity cost of the master’s year, in dollars?`, answer: 100000, tol: 1, solution: R`Fees of $38,000 plus forgone after-tax income of $62,000 = **$100,000**. Living costs are excluded because they are incurred under both options.` },
    { type: 'num', level: 'Core', q: R`A business owner earns revenue of $400,000 and pays explicit costs of $310,000. She could earn $85,000 working elsewhere, and her $100,000 of capital in the business could earn 6% elsewhere. What is her economic profit?`, answer: -1000, tol: 1, solution: R`Accounting profit = 400,000 − 310,000 = $90,000. Implicit costs = 85,000 + 0.06 × 100,000 = $91,000. Economic profit = 90,000 − 91,000 = **−$1,000**: the business earns slightly less than her resources could earn elsewhere.` },
    { type: 'num', level: 'Core', q: R`In the PPF table, what is the opportunity cost (in tonnes of food) of increasing machinery from 20 to 40 units?`, answer: 50, tol: 0.1, solution: R`Food falls from 85 to 35 tonnes, so the opportunity cost is **50 tonnes** for 20 machines, an average of 2.5 tonnes per machine, higher than earlier units because of increasing opportunity cost.` },
    { type: 'num', level: 'Core', q: R`In one hour, Minh can write 4 pages of a report or build 2 spreadsheet models. Lan can write 3 pages or build 3 models. What is Minh’s opportunity cost of one model, in pages?`, answer: 2, tol: 0.01, solution: R`Minh gives up 4 pages for 2 models, so each model costs **2 pages**. Lan’s opportunity cost of a model is 1 page, so Lan has the comparative advantage in models and Minh in writing.` },
    { type: 'num', level: 'Stretch', q: R`A project has already cost $3.2 million. Completing it will cost $1.8 million more and produce benefits worth $2.1 million in present value. By how many millions of dollars is the firm better off completing it rather than abandoning it?`, answer: 0.3, tol: 0.001, solution: R`The $3.2 million is sunk. Completing: 2.1 − 1.8 = +$0.3 million. Abandoning: 0. The firm is **$0.3 million** better off completing it.` },
    { type: 'mcq', level: 'Core', q: 'Which statement is normative?', options: ['Higher interest rates reduce housing construction.', 'Australia’s unemployment rate rose last quarter.', 'The government should cut fuel excise to help households.', 'A tariff raises the domestic price of imported goods.'], answer: 2, solution: R`"Should" signals a value judgement: **normative**. The others are positive statements that could be tested with data.` },
    { type: 'mcq', level: 'Core', q: 'Country X can produce more of both goods than country Y with the same resources. Can both still gain from trade?', options: ['No, X should produce everything itself', 'Yes, if their opportunity costs differ, each can specialise in its comparative advantage', 'Only if Y subsidises its exports', 'Only if both have the same opportunity costs'], answer: 1, solution: R`Gains from trade depend on **comparative** advantage (differing opportunity costs), not absolute advantage. If opportunity costs were identical, there would be no gain.` },
    { type: 'mcq', level: 'Core', q: 'A firm should expand output as long as…', options: ['Total revenue exceeds total cost', 'Average revenue exceeds average cost', 'Marginal benefit exceeds marginal cost', 'It has not yet recovered its sunk costs'], answer: 2, solution: R`Decisions are made at the margin: expand while **marginal benefit exceeds marginal cost**. Totals and averages can hide unprofitable marginal units; sunk costs are irrelevant.` },
    { type: 'long', level: 'Core', q: 'Explain why the production possibility frontier is usually bowed outwards, and describe two events that would shift an Australian PPF outwards and one that would move the economy inside it.', answer: R`The PPF is bowed outwards because resources are not equally suited to producing every good. When an economy starts producing more of one good, it first moves the resources that are best at that good and worst at the other, so the opportunity cost is low. As it continues, it must move resources that are increasingly good at the other good and less suited to the first, so each additional unit costs more and more of the other good. Increasing opportunity cost means the slope becomes steeper, giving the bowed shape.

Events that shift the frontier outwards include an increase in resources, such as population growth through skilled migration or investment that increases the capital stock, and improvements in technology or productivity, such as automation in mining or better agricultural techniques. A recession that leaves workers unemployed and factories idle would move the economy to a point inside the frontier: the capacity still exists, but it is not being used.`, solution: 'Look for the resource-suitability explanation, two valid outward shifts (resources, technology, human capital) and one inefficiency example.' },
  ],
  glossary: [
    ['Scarcity', 'The condition in which wants exceed the resources available to satisfy them.'],
    ['Opportunity cost', 'The value of the best alternative given up when a choice is made.'],
    ['Marginal analysis', 'Comparing the extra benefit and extra cost of a small change in an activity.'],
    ['Sunk cost', 'A cost already incurred that cannot be recovered and should not affect decisions.'],
    ['Production possibility frontier', 'The combinations of goods an economy can produce with full, efficient use of its resources.'],
    ['Comparative advantage', 'The ability to produce a good at a lower opportunity cost than another producer.'],
    ['Economic profit', 'Revenue minus explicit and implicit (opportunity) costs.'],
    ['Ceteris paribus', 'Holding all other factors constant while examining the effect of one change.'],
  ],
  resources: ['CORE', 'OS_ECO', 'KHAN_MICRO', 'MIT1401', 'BOE_KB', 'RBA_EXPL', 'book:MANKIW'],
};
