const R = String.raw;
const D = '#5fe3e0', S = '#ff7ab6', N = '#e9b85c', V = '#9b8cff';
export default {
  id: '23115-05', subject: '23115', title: 'Costs, perfect competition and monopoly', mins: 75, level: 'Foundation',
  summary: 'What costs look like inside a firm and how market structure shapes prices and profits: fixed, variable, average and marginal cost; economies of scale; profit maximisation, shutdown and entry under perfect competition; monopoly pricing, deadweight loss and the Lerner index; price discrimination; and how competition law and investors think about market power.',
  objectives: [
    'Calculate fixed, variable, average and marginal costs and explain their shapes',
    'Explain economies and diseconomies of scale and natural monopoly',
    'Find the profit-maximising output of a competitive firm, and apply the shutdown and break-even rules',
    'Explain why entry and exit drive long-run economic profit to zero in competitive markets',
    'Solve for monopoly price, quantity, profit and deadweight loss, and compute the Lerner index',
    'Analyse price discrimination and the regulation of market power, and connect market power to "economic moats" in investing',
  ],
  body: [
    ['h', 'Inside the firm: costs'],
    ['p', R`To understand how firms behave in markets, we first need their costs. Economists distinguish the **short run**, in which at least one input (usually capital such as a factory or an oven) is fixed, from the **long run**, in which every input can be changed. In the short run, total cost splits into **fixed costs** (rent, insurance, loan interest: paid whatever the output) and **variable costs** (ingredients, casual wages, electricity: rising with output).`],
    ['defs', [
      ['Total cost (TC)', 'Fixed cost plus variable cost: \\(TC = FC + VC\\).'],
      ['Average total cost (ATC)', 'Cost per unit: \\(ATC = TC/Q\\), the sum of average fixed and average variable cost.'],
      ['Average variable cost (AVC)', 'Variable cost per unit: \\(AVC = VC/Q\\).'],
      ['Marginal cost (MC)', 'The extra cost of producing one more unit: \\(MC = \\Delta TC/\\Delta Q\\).'],
    ]],
    ['example', {
      title: 'A bakery’s daily costs',
      setup: R`A bakery pays fixed costs of $200 a day. Output \(Q\) is measured in hundreds of loaves.`,
      steps: [
        R`From the table below, marginal cost first falls (specialisation: a second baker can run the oven while the first shapes dough) and then rises (the oven gets crowded: **diminishing marginal returns** to the variable input).`,
        R`Average variable cost is lowest at \(Q = 4\) ($42.50 per hundred loaves).`,
        R`Average total cost is lowest at \(Q = 6\) ($81.67), where marginal cost ($70) is still below ATC; at \(Q = 7\), MC ($100) is above ATC, so ATC starts to rise.`,
      ],
      answer: R`The marginal-cost curve cuts both average curves at their minimum points. That is not a coincidence: whenever the marginal unit costs less than the average, it pulls the average down; whenever it costs more, it pulls the average up. (Your marks work the same way: a test score below your average lowers the average.)`,
    }],
    ['table', {
      caption: 'The bakery’s costs ($ per day; Q in hundreds of loaves)',
      head: ['Q', 'Total cost', 'Marginal cost', 'Average variable cost', 'Average total cost'],
      rows: [
        ['0', '200', '—', '—', '—'], ['1', '260', '60', '60.00', '260.00'], ['2', '300', '40', '50.00', '150.00'], ['3', '330', '30', '43.33', '110.00'],
        ['4', '370', '40', '42.50', '92.50'], ['5', '420', '50', '44.00', '84.00'], ['6', '490', '70', '48.33', '81.67'], ['7', '590', '100', '55.71', '84.29'], ['8', '730', '140', '66.25', '91.25'],
      ],
    }],
    ['chart', {
      caption: 'Marginal cost cuts average variable and average total cost at their minimums',
      x: [1, 8], y: [0, 160], xl: 'Output (hundreds of loaves per day)', yl: '$ per hundred loaves',
      series: [
        { label: 'Marginal cost', color: S, pts: [[1, 60], [2, 40], [3, 30], [4, 40], [5, 50], [6, 70], [7, 100], [8, 140]] },
        { label: 'Average variable cost', color: D, pts: [[1, 60], [2, 50], [3, 43.33], [4, 42.5], [5, 44], [6, 48.33], [7, 55.71], [8, 66.25]] },
        { label: 'Average total cost (to 150 at Q = 2)', color: N, pts: [[2, 150], [3, 110], [4, 92.5], [5, 84], [6, 81.67], [7, 84.29], [8, 91.25]] },
      ],
      marks: [{ x: 4, y: 42.5, label: 'min AVC', color: D }, { x: 6, y: 81.67, label: 'min ATC', color: N }],
    }],
    ['h3', 'The long run: economies of scale'],
    ['p', R`In the long run a firm chooses its scale. The **long-run average cost** curve shows the lowest cost of producing each output when every input can vary. Over some range, larger firms often have lower average costs: **economies of scale**, from specialisation, bulk purchasing, spreading large fixed costs (research, software, advertising) over more units, and engineering relationships (a pipeline’s capacity grows faster than its surface area). Beyond some size, **diseconomies of scale** may set in as coordination and management become harder. The smallest output at which long-run average cost is minimised is the **minimum efficient scale**.`],
    ['p', R`When economies of scale are so large that one firm can supply the whole market at lower cost than two or more could, the industry is a **natural monopoly**. Electricity transmission lines, water pipes and railway tracks are classic examples: duplicating them would waste resources. That is why Australia regulates the prices charged by electricity and gas networks through the Australian Energy Regulator rather than relying on competition.`],

    ['h', 'Perfect competition'],
    ['p', R`A **perfectly competitive** market has many small firms selling identical products, buyers and sellers with full information, and free entry and exit. No firm can influence the price: each is a **price taker**. Wheat, many agricultural commodities, and to a close approximation the market for a widely traded share or currency, fit this description. Because each extra unit sells at the market price, a competitive firm’s marginal revenue equals the price: \(MR = P\).`],
    ['key', R`Every profit-maximising firm, in any market structure, produces where **marginal revenue equals marginal cost**. For a price taker, that means producing where **price equals marginal cost**.`],
    ['example', {
      title: 'How much should the bakery produce?',
      setup: R`Suppose bread is a competitive market and the bakery can sell as much as it likes at the market price. Consider three prices per hundred loaves.`,
      steps: [
        R`**Price $100**: produce up to the point where MC reaches $100, that is 6 or 7 hundred loaves (the seventh hundred adds exactly as much revenue as cost). Profit \(= 6 \times 100 - 490 = \$110\) a day. Price is above ATC, so the bakery earns an economic profit.`,
        R`**Price $70**: produce 5 or 6 hundred loaves. Revenue \(420\) against cost \(490\): a loss of \$70. But price ($70) exceeds average variable cost ($48.33), so each loaf covers its variable cost and contributes to the fixed cost. Shutting down would lose the whole \$200 of fixed cost, so the bakery should **keep operating in the short run**.`,
        R`**Price $40**: this is below the minimum AVC of $42.50, so no output covers its variable cost. Producing 4 hundred loaves would lose \(370 - 160 = \$210\), more than the \$200 lost by **shutting down**. The bakery should shut down temporarily.`,
      ],
      answer: R`The rules are: produce where \(P = MC\); operate in the short run as long as \(P \ge\) minimum AVC (the **shutdown price**); earn economic profit only when \(P >\) minimum ATC (the **break-even price**). The competitive firm’s short-run supply curve is therefore its marginal-cost curve above the minimum of AVC.`,
    }],
    ['warn', R`Fixed costs do not affect the output decision in the short run: they are paid either way. They matter for the long-run decision to stay in the industry. Confusing the two leads firms to close profitable operations or keep hopeless ones open.`],
    ['h3', 'The long run: entry, exit and zero economic profit'],
    ['p', R`If bakeries earn economic profits, new bakeries enter, market supply shifts right and the price falls. If they make losses, some exit, supply shifts left and the price rises. Entry and exit continue until the price equals the minimum of long-run average total cost, where each firm earns **zero economic profit**. Zero economic profit is not a disaster: it means owners earn exactly what their capital and time could earn elsewhere, their opportunity cost. The consequences for society are attractive: goods are produced at the lowest possible average cost, and price equals marginal cost, so total surplus is maximised.`],
    ['note', R`For investors, this is the central lesson of competitive markets: **abnormal profits attract competitors, and competition erodes them**. A company that earns returns on capital well above its cost of capital for many years must have something that stops the process: a barrier to entry. Warren Buffett calls such a barrier an **economic moat**.`],

    ['h', 'Monopoly'],
    ['p', R`A **monopoly** is a single seller of a product without close substitutes, protected by **barriers to entry**. Barriers include legal protection (patents, copyrights, licences), control of an essential resource, economies of scale (natural monopoly), and **network effects**, where a product becomes more valuable as more people use it (payment networks, marketplaces, social media). Monopolies are rare, but many firms have some market power, and the monopoly model shows its effects clearly.`],
    ['p', R`A monopolist faces the whole downward-sloping market demand curve. To sell one more unit it must lower the price on all units, so **marginal revenue is below price**. For linear demand \(P = a - bQ\), total revenue is \(aQ - bQ^2\) and marginal revenue is \(MR = a - 2bQ\): the same intercept, twice the slope.`],
    ['example', {
      title: 'A monopoly versus a competitive industry',
      setup: R`Market demand is \(P = 100 - Q\) and marginal cost is constant at $20 per unit.`,
      steps: [
        R`**Competition**: price equals marginal cost, \(P = 20\), so \(Q = 80\). Consumer surplus \(= \tfrac12 \times 80 \times 80 = 3{,}200\).`,
        R`**Monopoly**: \(MR = 100 - 2Q = 20 \Rightarrow Q = 40\). Price from the demand curve: \(P = 100 - 40 = \$60\).`,
        R`Monopoly profit \(= (60 - 20) \times 40 = 1{,}600\). Consumer surplus falls to \(\tfrac12 \times 40 \times 40 = 800\).`,
        R`Deadweight loss \(= \tfrac12 \times (60 - 20) \times (80 - 40) = 800\): units buyers value above their cost are not produced.`,
      ],
      answer: R`The monopolist halves output and triples the price. Of the 3,200 of consumer surplus under competition, 1,600 becomes monopoly profit (a transfer), 800 remains with consumers, and 800 is simply destroyed (the deadweight loss). The deadweight loss, not the profit, is the efficiency cost of monopoly.`,
    }],
    ['chart', {
      caption: 'Monopoly: MR = MC at Q = 40, price $60; competition would give Q = 80 at $20',
      x: [0, 100], y: [0, 100], xl: 'Quantity', yl: 'Price ($)',
      series: [{ label: 'Demand: P = 100 − Q', color: D, pts: [[0, 100], [100, 0]] }, { label: 'Marginal revenue: 100 − 2Q', color: V, dash: '6 4', pts: [[0, 100], [50, 0]] }, { label: 'Marginal cost = $20', color: S, pts: [[0, 20], [100, 20]] }],
      areas: [{ top: [[0, 60], [40, 60]], bottom: [[0, 20], [40, 20]], color: N, opacity: 0.25 }, { top: [[40, 60], [80, 20]], bottom: [[40, 20], [80, 20]], color: '#ff5d73', opacity: 0.5 }],
      marks: [{ x: 40, y: 60, label: 'Monopoly (40, $60)', color: N }, { x: 80, y: 20, label: 'Competitive (80, $20)', color: '#ffffff' }],
      note: 'Gold rectangle: monopoly profit (1,600). Red triangle: deadweight loss (800).',
    }],
    ['h3', 'Measuring market power: the Lerner index'],
    ['p', R`Combining the monopoly rule \(MR = MC\) with the formula \(MR = P(1 + 1/\varepsilon)\) from lecture 3 gives a neat result:`],
    ['math', R`L = \frac{P - MC}{P} = -\frac{1}{\varepsilon_d}`, 'The Lerner index equals price minus marginal cost, over price, which equals minus one over the price elasticity of demand.'],
    ['p', R`The mark-up over marginal cost is larger when demand is less elastic. In the example, \(L = (60 - 20)/60 = 0.67\), and the demand elasticity at \(Q = 40\) is \(-60/40 = -1.5\), so \(-1/\varepsilon = 0.67\) as well. A perfectly competitive firm has \(L = 0\). The Lerner index also confirms that a monopolist always operates on the elastic part of demand: \(L\) cannot exceed 1, so \(|\varepsilon| \ge 1\).`],

    ['h', 'Price discrimination'],
    ['p', R`A firm with market power can earn more by charging different prices to different customers, if it can identify groups with different elasticities and prevent resale.`],
    ['list', [
      R`**First-degree (perfect)**: each customer pays their maximum willingness to pay, as in some negotiated sales. Output is efficient, but the firm captures all the surplus.`,
      R`**Second-degree**: prices vary with quantity or version (bulk discounts, economy and premium seats, phone plans), and customers sort themselves.`,
      R`**Third-degree**: different prices for identifiable groups (student and senior discounts, different prices by country).`,
    ]],
    ['example', {
      title: 'Two markets, one product',
      setup: R`A software firm with marginal cost $20 sells to businesses, with demand \(P = 100 - Q_A\), and to students, with demand \(P = 60 - Q_B\).`,
      steps: [
        R`Businesses: \(MR = 100 - 2Q_A = 20 \Rightarrow Q_A = 40\), \(P_A = \$60\).`,
        R`Students: \(MR = 60 - 2Q_B = 20 \Rightarrow Q_B = 20\), \(P_B = \$40\).`,
        R`Profit \(= 40 \times 40 + 20 \times 20 = \$2{,}000\).`,
        R`With a single price, combined demand is \(Q = 160 - 2P\) (for \(P \le 60\)), so \(P = 80 - Q/2\), \(MR = 80 - Q = 20 \Rightarrow Q = 60\), \(P = \$50\), profit \(= 30 \times 60 = \$1{,}800\).`,
      ],
      answer: R`Price discrimination raises profit from $1,800 to $2,000 by charging the less elastic group (businesses) more and the more elastic group (students) less. In this case total output is the same (60), but price discrimination can also expand output by serving customers who would otherwise be priced out, as with student discounts.`,
    }],

    ['h', 'Regulating market power'],
    ['p', R`Australia’s **Competition and Consumer Act 2010**, enforced by the ACCC, prohibits cartel conduct, misuse of market power and anti-competitive agreements. Since **1 January 2026**, acquisitions above set thresholds must be notified to the ACCC and cannot proceed until cleared, replacing the previous voluntary system. Natural monopolies in energy networks are subject to price regulation, and some essential services are publicly owned. Vietnam’s Competition Law 2018, administered by the National Competition Commission, plays a similar role there.`],
    ['p', R`Regulators weigh the costs of market power (higher prices, deadweight loss, less innovation pressure) against possible benefits (economies of scale, the rewards that fund research). Patents are the clearest trade-off: society deliberately grants a temporary monopoly to reward invention.`],
    ['h3', 'Monopsony: market power on the buying side'],
    ['p', R`A **monopsony** is a single (or dominant) buyer. An employer that is the main source of jobs in a town can pay wages below the value workers produce, and employ fewer people than a competitive market would. Supermarkets buying from farmers are sometimes accused of buyer power. Monopsony also explains why a moderate minimum wage can raise both wages and employment in some labour markets, the nuance promised in lecture 2.`],

    ['case', {
      title: 'The moat test',
      text: R`An analyst compares two ASX-listed companies. Company A operates the only licensed securities exchange and clearing house for a large share of trading in its market, and has earned a return on invested capital (ROIC) well above its cost of capital for two decades. Company B makes solar panel frames; five years ago it earned very high returns, but dozens of new manufacturers entered, prices fell sharply, and its ROIC is now below its cost of capital. A Vietnamese company, C, is the dominant operator of a popular e-wallet with strong network effects but faces a growing bank-backed rival.`,
      questions: [
        'Using the theory of competitive markets, explain what happened to Company B.',
        'Identify the barriers to entry that protect Company A. What risks could erode them?',
        'How do network effects create market power for Company C, and what could reverse them?',
        'How should expected market power affect the long-term growth and return assumptions in a valuation?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Marginal cost falls then rises (diminishing returns) and cuts AVC and ATC at their minimums.`,
      R`Economies of scale lower long-run average cost; extreme economies of scale create natural monopolies.`,
      R`Competitive firms produce where \(P = MC\), operate if \(P \ge\) min AVC, and in the long run earn zero economic profit.`,
      R`A monopolist sets \(MR = MC\), charges more, produces less and creates deadweight loss; \((P - MC)/P = -1/\varepsilon\).`,
      R`Price discrimination exploits differences in elasticity. Competition law, merger control and price regulation limit market power.`,
      R`Sustained high returns require barriers to entry: the economist’s version of an investor’s moat.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A firm’s total cost rises from $5,400 to $5,730 when output increases from 300 to 310 units. What is the marginal cost per unit?`, answer: 33, tol: 0.01, solution: R`\(MC = (5{,}730 - 5{,}400)/(310 - 300) = 330/10 = \$33\).` },
    { type: 'num', level: 'Core', q: R`A firm has fixed costs of $1,200 and variable costs of $3,000 when producing 150 units. What is its average total cost?`, answer: 28, tol: 0.01, solution: R`\(ATC = (1{,}200 + 3{,}000)/150 = \$28\). AVC is $20 and AFC is $8.` },
    { type: 'num', level: 'Core', q: R`A monopolist faces demand \(P = 120 - 2Q\) and constant marginal cost of 30. What price does it charge?`, answer: 75, tol: 0.01, solution: R`\(MR = 120 - 4Q = 30 \Rightarrow Q = 22.5\). \(P = 120 - 2(22.5) = 75\).` },
    { type: 'num', level: 'Core', q: R`For the monopolist in the previous question, what is the deadweight loss?`, answer: 506.25, tol: 0.1, hint: 'The competitive quantity is where price equals marginal cost.', solution: R`Competitive: \(120 - 2Q = 30 \Rightarrow Q = 45\). \(\text{DWL} = \tfrac12 \times (75 - 30) \times (45 - 22.5) = 506.25\).` },
    { type: 'num', level: 'Core', q: R`What is the Lerner index for that monopolist? (Two decimals.)`, answer: 0.6, tol: 0.005, solution: R`\(L = (75 - 30)/75 = 0.60\). Check: elasticity at \(Q = 22.5\) is \((dQ/dP)(P/Q) = (-0.5)(75/22.5) = -1.67\), and \(1/1.67 = 0.60\).` },
    { type: 'num', level: 'Stretch', q: R`In the bakery example, the market price is $45 per hundred loaves. What is the best output (in hundreds of loaves) in the short run? Enter 0 if the bakery should shut down.`, answer: 4, tol: 0.01, hint: 'Compare the price with the minimum AVC, then find where MC is at or below the price.', solution: R`Minimum AVC is $42.50 at \(Q = 4\), so the price covers variable costs and the bakery should operate. MC is $40 for the 4th hundred and $50 for the 5th, so it produces **4** hundred loaves. Profit \(= 180 - 370 = -\$190\), better than the \$200 loss from shutting down.` },
    { type: 'mcq', level: 'Core', q: 'In long-run equilibrium in a perfectly competitive market, firms earn…', options: ['Large economic profits', 'Zero economic profit, which still covers the opportunity cost of owners’ capital and time', 'Zero accounting profit', 'Negative economic profit'], answer: 1, solution: R`Entry and exit drive price to minimum ATC, so **economic profit is zero**. Accounting profit is positive because it excludes the implicit opportunity costs.` },
    { type: 'mcq', level: 'Core', q: 'Why is a monopolist’s marginal revenue below its price?', options: ['Because it pays more tax', 'Because to sell another unit it must lower the price on all units sold', 'Because its costs are higher', 'Because demand is perfectly elastic'], answer: 1, solution: R`Facing the downward-sloping market demand curve, the monopolist gains the price of the extra unit but **loses revenue on all the units it could have sold at the higher price**.` },
    { type: 'mcq', level: 'Core', q: 'Which of the following is the best example of a natural monopoly?', options: ['A café chain', 'An electricity transmission network', 'A wheat farm', 'A clothing brand'], answer: 1, solution: R`Transmission networks have enormous fixed costs and low marginal costs, so one network can serve the market at lower average cost than two. They are therefore regulated.` },
    { type: 'long', level: 'Stretch', q: 'A mining company made a large economic profit when the iron ore price was high. Using the theory of competitive markets, explain what you would expect to happen to the industry and to the company’s profits over the following decade, and why some firms might keep earning above-normal returns.', answer: R`High prices and economic profits signal that resources are more valuable in iron ore mining than elsewhere. Existing miners expand output along their marginal-cost curves, and new mines are developed, both in Australia and overseas (for example, new projects in Africa). Because mines take years to plan, approve and build, supply responds slowly at first, so high prices can persist for several years. As new capacity arrives, market supply shifts right and the price falls towards the minimum long-run average cost of the marginal producer. Economic profits for the industry as a whole shrink towards zero, and high-cost mines may close when prices fall below their average variable cost.

Some firms can keep earning above-normal returns even in the long run if they have durable cost advantages: very high-grade, low-cost deposits close to ports, owned rail and port infrastructure, scale economies and operating expertise. These are forms of scarcity rent: the price is set by the higher-cost marginal producer, so the lowest-cost producers earn a margin above their own costs. Investors should therefore distinguish between cyclical profits from temporarily high prices, which competition erodes, and structural advantages that persist.`, solution: 'Look for entry and expansion, slow supply response, falling prices toward long-run average cost, exit of high-cost producers, and the idea of durable cost advantages (rents) for low-cost producers.' },
  ],
  glossary: [
    ['Marginal cost', 'The extra cost of producing one more unit.'],
    ['Diminishing marginal returns', 'Each extra unit of a variable input adds less output when other inputs are fixed.'],
    ['Economies of scale', 'Falling long-run average cost as output increases.'],
    ['Shutdown price', 'The minimum of average variable cost; below it a firm should stop producing in the short run.'],
    ['Price taker', 'A firm that cannot influence the market price.'],
    ['Barrier to entry', 'Anything that prevents new firms from entering a profitable market.'],
    ['Lerner index', 'The mark-up \\((P - MC)/P\\), a measure of market power.'],
    ['Monopsony', 'A market with a single dominant buyer.'],
  ],
  resources: ['CORE', 'OS_ECO', 'KHAN_MICRO', 'MIT1401', 'PC', 'book:MANKIW'],
};
