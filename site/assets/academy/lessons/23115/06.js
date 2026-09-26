const R = String.raw;
export default {
  id: '23115-06', subject: '23115', title: 'Oligopoly, game theory and pricing strategy', mins: 70, level: 'Intermediate',
  summary: 'Most real markets sit between perfect competition and monopoly. Monopolistic competition, measuring concentration with the HHI, oligopoly and strategic interdependence, game theory (dominant strategies, Nash equilibrium, the prisoner’s dilemma, repeated games), Cournot and Bertrand competition, entry deterrence, cartels and the ACCC, and the pricing strategies firms actually use.',
  objectives: [
    'Compare the four market structures and explain monopolistic competition',
    'Measure market concentration with concentration ratios and the Herfindahl–Hirschman Index',
    'Find dominant strategies and Nash equilibria in simple games, and explain the prisoner’s dilemma',
    'Explain why cartels are unstable and how repeated interaction can sustain tacit collusion',
    'Solve a Cournot duopoly and compare it with monopoly, Bertrand competition and perfect competition',
    'Use backward induction to analyse entry deterrence, and evaluate common pricing strategies',
  ],
  body: [
    ['h', 'The world between competition and monopoly'],
    ['p', R`Few markets look like the textbook extremes. Your local cafés each sell a slightly different product. Australia’s supermarkets are dominated by two chains; its mobile network market by three; its domestic airline market by two main groups; its banking by four large banks. Vietnam’s telecommunications, beer and steel markets are similarly concentrated. In these markets each firm must think about how its rivals will react: **strategic interdependence**. That is the domain of game theory, one of the great intellectual achievements of twentieth-century economics.`],
    ['table', {
      caption: 'Four market structures',
      head: ['Structure', 'Number of firms', 'Product', 'Barriers to entry', 'Price-setting power', 'Examples'],
      rows: [
        ['Perfect competition', 'Many', 'Identical', 'None', 'None (price taker)', 'Wheat, foreign exchange'],
        ['Monopolistic competition', 'Many', 'Differentiated', 'Low', 'Some', 'Cafés, restaurants, hairdressers, clothing brands'],
        ['Oligopoly', 'A few', 'Identical or differentiated', 'High', 'Significant, but interdependent', 'Supermarkets, banks, airlines, telecoms'],
        ['Monopoly', 'One', 'Unique', 'Very high', 'Large', 'Electricity networks, patented drugs'],
      ],
    }],

    ['h', 'Monopolistic competition'],
    ['p', R`In **monopolistic competition**, many firms sell differentiated products and entry is easy. Each café has a small monopoly over its particular coffee, location and atmosphere, so it faces a downward-sloping demand curve and sets \(MR = MC\), like a monopolist. But if cafés earn economic profits, new cafés open, taking customers and shifting each incumbent’s demand curve left, until economic profit is zero. In the long run, price equals average total cost, but on the downward-sloping part of the average cost curve: each café operates with **excess capacity** and charges a mark-up over marginal cost. The inefficiency is the price we pay for **variety**, which consumers value. Advertising and branding are central in these markets because they aim to make demand less elastic.`],

    ['h', 'Measuring concentration'],
    ['p', R`Economists and regulators measure how concentrated a market is. The **four-firm concentration ratio (CR4)** is the combined market share of the four largest firms. The **Herfindahl–Hirschman Index (HHI)** sums the squares of every firm’s market share (in percentage points):`],
    ['math', R`HHI = \sum_{i=1}^{N} s_i^2, \qquad 0 < HHI \le 10{,}000`, 'The Herfindahl–Hirschman Index equals the sum of the squared market shares of all firms, between zero and ten thousand.'],
    ['example', {
      title: 'A concentrated grocery market',
      setup: R`Suppose a grocery market has shares of 37%, 30%, 10% and 8%, with the remaining 15% split among five firms of 3% each.`,
      steps: [
        R`CR4 \(= 37 + 30 + 10 + 8 = 85\%\).`,
        R`HHI \(= 37^2 + 30^2 + 10^2 + 8^2 + 5 \times 3^2 = 1{,}369 + 900 + 100 + 64 + 45 = 2{,}478\).`,
        R`If the 10% and 8% firms merged, HHI would rise by \(2 \times 10 \times 8 = 160\) to 2,638.`,
      ],
      answer: R`Squaring gives large firms more weight, so the HHI is more informative than CR4. Competition authorities commonly treat markets with an HHI above about 1,800 to 2,500 as highly concentrated and scrutinise mergers that raise the HHI significantly. The ACCC’s 2025 supermarkets inquiry described Australian grocery retailing as an oligopoly in which Coles and Woolworths together hold about two-thirds of sales.`,
    }],

    ['h', 'Game theory: the basic tools'],
    ['p', R`A **game** has players, strategies (the choices available to each player) and payoffs (the outcome for each player from every combination of choices). We solve games by asking what each player will do, anticipating what the others will do.`],
    ['defs', [
      ['Dominant strategy', 'A strategy that gives a player a higher payoff than any alternative, whatever the other players do.'],
      ['Nash equilibrium', 'A set of strategies in which no player can gain by changing strategy alone, given the others’ strategies. Named after John Nash.'],
      ['Prisoner’s dilemma', 'A game in which each player’s dominant strategy leads to an outcome that is worse for both than if they had cooperated.'],
    ]],
    ['h3', 'The pricing prisoner’s dilemma'],
    ['p', R`Two supermarket chains, A and B, each choose a high or a low price for the month. Monthly profits (in $ million) are shown as (A’s profit, B’s profit):`],
    ['table', {
      caption: 'A pricing game between two chains ($ million profit per month)',
      head: ['', 'B charges high', 'B charges low'],
      rows: [
        ['A charges high', '(10, 10)', '(4, 14)'],
        ['A charges low', '(14, 4)', '(6, 6)'],
      ],
    }],
    ['steps', [
      R`Consider A. If B charges high, A earns 10 by charging high or 14 by charging low: low is better. If B charges low, A earns 4 by charging high or 6 by charging low: low is better again. So **low is A’s dominant strategy**.`,
      R`By symmetry, low is also B’s dominant strategy.`,
      R`The Nash equilibrium is (low, low) with profits of 6 each, even though (high, high) would give each 10.`,
    ]],
    ['key', R`In a prisoner’s dilemma, individually rational choices produce a collectively worse outcome. For the two firms, that is bad; for consumers, who get low prices, it is good. Competition law exists partly to keep firms stuck in this dilemma rather than escaping it by agreement.`],
    ['h3', 'Cartels and why they break down'],
    ['p', R`If the two chains could sign a binding agreement to charge high prices, both would gain. Such an agreement is a **cartel**. But cartels are unstable because each member can gain by secretly cheating (cutting its price or raising its output) while the others hold to the agreement. OPEC’s long history of quotas and quota-breaking illustrates the tension. In Australia cartel conduct (price fixing, output restriction, market sharing and bid rigging) is illegal under the Competition and Consumer Act and can be a **criminal offence** for individuals, with prison terms. The ACCC offers immunity to the first cartel member to report, which deliberately exploits the prisoner’s dilemma among cartel members.`],
    ['h3', 'Repeated games and tacit collusion'],
    ['p', R`Firms in the same market meet every month for years. In a **repeated game**, cheating today can be punished tomorrow, for example by triggering a price war. Suppose each chain values future profits with a discount factor \(\delta\) per month (a dollar next month is worth \(\delta\) dollars today). Keeping prices high forever is worth \(10/(1 - \delta)\). Cheating earns 14 this month and then 6 forever after, worth \(14 + 6\delta/(1-\delta)\). Cooperation is sustainable when the first is at least the second:`],
    ['math', R`\frac{10}{1-\delta} \ge 14 + \frac{6\delta}{1-\delta} \;\Longleftrightarrow\; \delta \ge \frac{14 - 10}{14 - 6} = 0.5`, 'Ten over one minus delta is at least fourteen plus six delta over one minus delta, which holds if and only if delta is at least fourteen minus ten over fourteen minus six, which is one half.'],
    ['p', R`When firms are patient and interact often, high prices can be sustained **without any explicit agreement**, by each firm simply matching the others and punishing deviations. This is **tacit collusion**. It is hard to prosecute because there is no agreement to prove, which is why regulators focus on market structure, transparency and practices that make coordination easier. Paradoxically, **price-matching guarantees** ("we will match any competitor’s price") can soften competition: they remove the gain from undercutting, because a rival’s cut is matched instantly.`],

    ['h', 'Competing on quantities and prices: Cournot and Bertrand'],
    ['p', R`Two classic models show how much the details of competition matter. In the **Cournot** model, firms choose **quantities** (for example, how much capacity to build), and the market price adjusts to clear the market. Take market demand \(P = 100 - Q\) with \(Q = q_1 + q_2\) and a constant marginal cost of $20 for both firms.`],
    ['steps', [
      R`Firm 1’s profit: \((100 - q_1 - q_2 - 20)\,q_1\). Setting the derivative to zero gives its **best response**: \(q_1 = (80 - q_2)/2\).`,
      R`By symmetry \(q_2 = (80 - q_1)/2\). Solving the two equations: \(q_1 = q_2 = 80/3 \approx 26.67\).`,
      R`Total output \(Q = 53.33\), price \(P = \$46.67\), profit per firm \((46.67 - 20)(26.67) \approx \$711\), total \$1,422.`,
    ]],
    ['table', {
      caption: 'Same demand and costs, different market structures',
      head: ['Structure', 'Total output', 'Price', 'Total industry profit'],
      rows: [
        ['Monopoly (or perfect cartel)', '40', '$60.00', '$1,600'],
        ['Cournot duopoly', '53.3', '$46.67', '$1,422'],
        ['Bertrand duopoly (identical products)', '80', '$20.00', '$0'],
        ['Perfect competition', '80', '$20.00', '$0'],
      ],
    }],
    ['p', R`With \(n\) identical Cournot firms, total output is \(\frac{n}{n+1}\) of the competitive output, so the price approaches marginal cost as the number of firms grows. In the **Bertrand** model, firms choose **prices** for identical products. Any firm that charges slightly less than its rival captures the whole market, so undercutting continues until price equals marginal cost, even with only two firms. The contrast teaches an important lesson: the number of firms alone does not determine competition. What matters is how firms compete, how differentiated their products are and whether capacity is constrained.`],

    ['h', 'Sequential games: entry and credible threats'],
    ['p', R`Some games are played in sequence. Suppose a new airline considers entering a route served by an incumbent. If it enters, the incumbent can **fight** (start a price war, losing money for both) or **accommodate** (share the market). The incumbent announces that it will fight any entrant. Should the entrant believe it?`],
    ['table', {
      caption: 'Entry game payoffs ($ million): (entrant, incumbent)',
      head: ['Entrant’s choice', 'Incumbent fights', 'Incumbent accommodates'],
      rows: [['Enter', '(−5, 2)', '(8, 12)'], ['Stay out', '(0, 25)', '(0, 25)']],
    }],
    ['p', R`Solve by **backward induction**, starting from the last decision. If the entrant enters, the incumbent compares fighting (2) with accommodating (12) and will accommodate. The threat to fight is **not credible**. Knowing this, the entrant enters and earns 8. The incumbent’s threat could become credible only if it committed in advance to fighting, for example by building excess capacity that makes a price war cheap for it, or by developing a reputation across many routes for always fighting. Investment in commitment is a common business strategy, and it explains why incumbents sometimes build capacity ahead of demand.`],

    ['h', 'Pricing strategies in practice'],
    ['table', {
      caption: 'Common pricing strategies and the economics behind them',
      head: ['Strategy', 'What it is', 'Economic logic', 'Risk'],
      rows: [
        ['Cost-plus', 'Price = unit cost × (1 + mark-up)', 'Simple; implicitly assumes a stable elasticity', 'Ignores demand; can leave money on the table'],
        ['Value-based', 'Price set by customers’ willingness to pay', 'Captures consumer surplus', 'Requires good customer research'],
        ['Penetration', 'Low launch price to build share', 'Network effects, learning curves, switching costs', 'Losses if scale never arrives'],
        ['Skimming', 'High launch price, lowered over time', 'Discriminates between eager and patient buyers', 'Invites entry'],
        ['Bundling', 'Selling products together', 'Reduces dispersion in willingness to pay', 'Competition authorities may object when dominant firms tie products'],
        ['Dynamic pricing', 'Prices change with demand in real time', 'Allocates scarce capacity (flights, rides, electricity)', 'Customer backlash; algorithmic collusion concerns'],
        ['Loss leader', 'A key item sold below cost', 'Draws traffic that buys profitable items', 'Must be permitted by competition law; can be misleading'],
      ],
    }],
    ['note', R`Algorithms now set many prices. Regulators worry that pricing algorithms that learn to match and punish competitors could reach tacit collusion faster and more reliably than humans, without any human agreement. This is an active area for competition law in Australia, Europe and the US.`],

    ['case', {
      title: 'Two banks and a rate cut',
      text: R`The RBA cuts the cash rate by 0.25 percentage points. The four major Australian banks each decide whether to pass the full cut on to variable mortgage rates or to keep part of it to protect their net interest margins. Each bank worries that if it alone withholds the cut, it will lose customers to rivals and to smaller lenders; but if all withhold part of the cut, all earn more. Brokers and comparison websites make it easy for borrowers to compare rates.`,
      questions: [
        'Set up the decision as a two-player game with illustrative payoffs. Is it a prisoner’s dilemma?',
        'How does repeated interaction among the major banks affect the likely outcome?',
        'What role do brokers, comparison sites and smaller lenders play in making the market more competitive?',
        'What could regulators do if they believed banks were tacitly coordinating?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Monopolistic competition combines product differentiation with free entry: zero long-run profit, but excess capacity and variety.`,
      R`Concentration is measured by CR4 and the HHI; regulators scrutinise mergers that raise the HHI in concentrated markets.`,
      R`In a Nash equilibrium no player gains by deviating alone; in a prisoner’s dilemma, dominant strategies lead to a worse joint outcome.`,
      R`Cartels are unstable and illegal; repeated interaction can sustain tacit collusion when firms are patient (\(\delta\) high).`,
      R`Cournot competition gives outcomes between monopoly and competition; Bertrand price competition with identical products drives price to marginal cost.`,
      R`Backward induction reveals which threats are credible; pricing strategies apply elasticity, discrimination and commitment.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`A market has four firms with shares of 40%, 40%, 10% and 10%. What is the HHI?`, answer: 3400, tol: 0.5, solution: R`\(40^2 + 40^2 + 10^2 + 10^2 = 1{,}600 + 1{,}600 + 100 + 100 = 3{,}400\). Compare four equal firms: \(4 \times 25^2 = 2{,}500\). Same CR4 (100%), but the HHI shows the first market is more concentrated.` },
    { type: 'num', level: 'Core', q: R`Two firms with market shares of 12% and 9% merge. By how much does the HHI increase?`, answer: 216, tol: 0.5, solution: R`Increase \(= (12 + 9)^2 - 12^2 - 9^2 = 2 \times 12 \times 9 = 216\).` },
    { type: 'num', level: 'Stretch', q: R`Two Cournot firms face demand \(P = 120 - Q\) and each has marginal cost 30. What is the market price?`, answer: 60, tol: 0.01, solution: R`Each firm produces \((120 - 30)/3 = 30\), so \(Q = 60\) and \(P = 120 - 60 = 60\). A monopoly would charge 75; perfect competition 30.` },
    { type: 'num', level: 'Stretch', q: R`In a repeated pricing game, cooperating earns 8 per period, cheating earns 12 in the period you cheat and then 5 per period forever. What is the minimum discount factor that sustains cooperation? (Two decimals.)`, answer: 0.57, tol: 0.005, solution: R`Need \(8/(1-\delta) \ge 12 + 5\delta/(1-\delta)\). Multiply by \(1-\delta\): \(8 \ge 12(1-\delta) + 5\delta = 12 - 7\delta \Rightarrow \delta \ge 4/7 = 0.57\).` },
    { type: 'mcq', level: 'Core', q: 'In the supermarket pricing game in the lecture, what is the Nash equilibrium?', options: ['Both charge high', 'Both charge low', 'A high, B low', 'There is no equilibrium'], answer: 1, solution: R`Low is a dominant strategy for both, so (low, low) is the Nash equilibrium, even though (high, high) gives both more profit.` },
    { type: 'mcq', level: 'Core', q: 'Why does the ACCC grant immunity to the first cartel member who reports the cartel?', options: ['To reward the largest firm', 'To create a prisoner’s dilemma among cartel members, making cartels less stable', 'Because cartels are legal in Australia', 'To reduce the ACCC’s workload'], answer: 1, solution: R`Immunity gives each member an incentive to confess first, turning the cartel into a **prisoner’s dilemma** and destabilising it.` },
    { type: 'mcq', level: 'Core', q: 'Which statement about monopolistic competition in the long run is correct?', options: ['Firms earn large economic profits', 'Price equals marginal cost', 'Firms earn zero economic profit but operate with excess capacity', 'There is only one firm'], answer: 2, solution: R`Free entry drives economic profit to zero, but because each firm faces a downward-sloping demand curve, price exceeds marginal cost and firms produce below minimum-ATC output: **excess capacity**.` },
    { type: 'mcq', level: 'Stretch', q: 'An incumbent threatens a price war if a rival enters, but after entry it would earn more by accommodating. According to backward induction, the rival should…', options: ['Stay out, because the threat is frightening', 'Enter, because the threat is not credible', 'Merge with the incumbent', 'Charge a price above the incumbent’s'], answer: 1, solution: R`Once entry has occurred, the incumbent’s best response is to accommodate, so the threat is **not credible** and a rational rival enters.` },
    { type: 'long', level: 'Stretch', q: 'Explain why a "we will match any competitor’s price" guarantee, which sounds pro-consumer, might actually lead to higher prices in an oligopoly.', answer: R`In an oligopoly each firm is tempted to cut its price to win customers from rivals: that temptation is what keeps prices down in a prisoner’s-dilemma pricing game. A price-matching guarantee changes the payoffs. If firm A promises to match any lower price, then firm B knows that cutting its price will not win A’s customers, because A’s customers will automatically receive the same low price. B’s gain from undercutting largely disappears, while B still loses margin on its existing customers. The guarantee therefore acts as a credible, automatic punishment for price cuts, exactly the mechanism that sustains tacit collusion in repeated games, but without any agreement between the firms.

As a result, all firms can maintain higher prices with less risk of a price war. The guarantee also shifts the task of monitoring rivals’ prices onto customers. Its competitive effect depends on details: if few customers claim the match, or if firms differ in costs and products, the effect is weaker. But economic theory and some empirical studies suggest that widespread price-matching in concentrated markets can soften competition, which is why competition authorities examine such policies.`, solution: 'Look for the change in incentives to undercut, the link to punishment and tacit collusion, and appropriate caveats.' },
  ],
  glossary: [
    ['Oligopoly', 'A market dominated by a few interdependent firms.'],
    ['Monopolistic competition', 'Many firms selling differentiated products with free entry.'],
    ['Herfindahl–Hirschman Index', 'The sum of squared market shares, a measure of concentration.'],
    ['Nash equilibrium', 'A strategy combination in which no player gains by changing strategy alone.'],
    ['Dominant strategy', 'A strategy that is best whatever the other players do.'],
    ['Cartel', 'An agreement among competitors to restrict competition; illegal in Australia.'],
    ['Tacit collusion', 'Coordination on high prices without an explicit agreement.'],
    ['Backward induction', 'Solving a sequential game by reasoning from the last move to the first.'],
  ],
  resources: ['CORE', 'OS_ECO', 'KHAN_MICRO', 'MIT1401', 'PC', 'book:MANKIW'],
};
