const R = String.raw;
export default {
  id: '26134-03', subject: '26134', title: 'Probability for decisions', mins: 70, level: 'Foundation',
  summary: 'The language of uncertainty: sample spaces and events, three ways to assign probabilities, the addition and multiplication rules, conditional probability and independence from contingency tables, Bayes’ theorem and the base-rate fallacy (with fraud detection), counting rules, and decision trees with expected monetary value and the value of information.',
  objectives: [
    'Define experiments, sample spaces and events, and assign probabilities by the classical, relative-frequency and subjective approaches',
    'Apply the complement, addition and multiplication rules',
    'Compute joint, marginal and conditional probabilities from a contingency table and test for independence',
    'Use Bayes’ theorem to update probabilities and avoid the base-rate fallacy',
    'Count outcomes with permutations and combinations',
    'Solve a decision problem with a decision tree, expected monetary value and the expected value of perfect information',
  ],
  body: [
    ['h', 'Why probability?'],
    ['p', R`Every business decision is made without knowing the future: whether a customer will repay, whether a product will sell, whether a share will rise, whether a transaction is fraudulent. Probability is the mathematics of uncertainty. It lets us quantify how likely outcomes are, combine uncertain events correctly, update our beliefs when new evidence arrives, and choose actions that perform well on average. It also protects us from some of the most expensive mistakes in finance, which have come from getting probability wrong.`],

    ['h', 'The basic vocabulary'],
    ['defs', [
      ['Random experiment', 'A process with uncertain outcome: a customer applies for a loan; the ASX 200 trades for a day.'],
      ['Sample space (S)', 'The set of all possible outcomes: {repays, defaults}; {up, down, unchanged}.'],
      ['Event', 'A subset of outcomes: "the index rises by more than 1%".'],
      ['Mutually exclusive events', 'Events that cannot happen together: a loan cannot both default and be repaid in full on time.'],
      ['Complement (Aᶜ)', 'Everything in S that is not in A.'],
    ]],
    ['p', R`Probabilities satisfy three rules: every probability lies between 0 and 1, the probabilities of all outcomes in the sample space sum to 1, and the probability of an event is the sum of the probabilities of the outcomes in it. There are three ways to assign them:`],
    ['list', [
      R`**Classical**: equally likely outcomes, \(P(A) = \) favourable outcomes / total outcomes. The chance of rolling a six is 1/6.`,
      R`**Relative frequency**: the long-run proportion in repeated trials or historical data. If 50 of 1,000 similar past loans defaulted, estimate \(P(\text{default}) = 0.05\).`,
      R`**Subjective**: a considered judgement when history is thin, such as the probability that a new drug gains approval or that the RBA raises rates next month. Market prices often reveal subjective probabilities: interest-rate futures imply the market’s probability of a rate change.`,
    ]],

    ['h', 'The rules of probability'],
    ['math', R`P(A^c) = 1 - P(A) \qquad P(A \cup B) = P(A) + P(B) - P(A \cap B)`, 'The probability of the complement of A is one minus the probability of A. The probability of A or B equals P of A plus P of B minus P of A and B.'],
    ['p', R`The **complement rule** is often the easiest route: the probability that at least one of ten independent loans (each with a 5% default chance) defaults is \(1 - 0.95^{10} = 40.1\%\), much easier than adding up all the cases. The **addition rule** subtracts the overlap so it is not counted twice; for mutually exclusive events the overlap is zero.`],
    ['math', R`P(A \mid B) = \frac{P(A \cap B)}{P(B)} \qquad P(A \cap B) = P(A \mid B)\,P(B)`, 'The conditional probability of A given B equals the probability of A and B divided by the probability of B. So the probability of A and B equals P of A given B times P of B.'],
    ['p', R`A **conditional probability** restricts attention to the cases where \(B\) has happened. Two events are **independent** if knowing one tells you nothing about the other: \(P(A \mid B) = P(A)\), equivalently \(P(A \cap B) = P(A)P(B)\).`],

    ['h', 'Contingency tables: reading probabilities from data'],
    ['p', R`A bank reviews 1,000 personal loans made two years ago, classified by the applicant’s credit score band at the time and whether the loan later defaulted (illustrative data).`],
    ['table', {
      caption: 'Loans by credit score and outcome (counts)',
      head: ['', 'Defaulted', 'Did not default', 'Total'],
      rows: [['High score', '14', '686', '700'], ['Low score', '36', '264', '300'], ['Total', '50', '950', '1,000']],
    }],
    ['steps', [
      R`**Marginal** probabilities come from the totals: \(P(\text{Default}) = 50/1{,}000 = 0.05\); \(P(\text{Low}) = 300/1{,}000 = 0.30\).`,
      R`**Joint** probabilities come from the cells: \(P(\text{Low} \cap \text{Default}) = 36/1{,}000 = 0.036\).`,
      R`**Conditional** probabilities restrict to a row or column: \(P(\text{Default} \mid \text{Low}) = 36/300 = 0.12\), while \(P(\text{Default} \mid \text{High}) = 14/700 = 0.02\).`,
      R`**Addition rule**: \(P(\text{Low} \cup \text{Default}) = 0.30 + 0.05 - 0.036 = 0.314\).`,
      R`**Independence?** \(P(\text{Default} \mid \text{Low}) = 0.12 \ne P(\text{Default}) = 0.05\), so default and credit score are **not** independent: the score is informative, which is exactly why lenders use it.`,
    ]],
    ['p', R`Low-score borrowers default six times as often as high-score borrowers. A bank would price that difference into interest rates (risk-based pricing) or decline the riskiest applicants. The conditional probability of default is the foundation of credit risk models, which you will study in Commercial Bank Management.`],
    ['warn', R`\(P(A \mid B)\) is not \(P(B \mid A)\). Here \(P(\text{Default} \mid \text{Low}) = 0.12\), but \(P(\text{Low} \mid \text{Default}) = 36/50 = 0.72\). Confusing the two, sometimes called the prosecutor’s fallacy, leads to disastrous reasoning in courts, medicine and finance.`],

    ['h', 'Bayes’ theorem: updating beliefs with evidence'],
    ['p', R`Bayes’ theorem turns \(P(\text{evidence} \mid \text{hypothesis})\), which we often know, into \(P(\text{hypothesis} \mid \text{evidence})\), which we actually want:`],
    ['math', R`P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E \mid H)\,P(H) + P(E \mid H^c)\,P(H^c)}`, 'The probability of the hypothesis given the evidence equals P of E given H times P of H, divided by the total probability of the evidence: P of E given H times P of H plus P of E given not H times P of not H.'],
    ['p', R`\(P(H)\) is the **prior**, what we believed before the evidence; \(P(H \mid E)\) is the **posterior**, what we believe after it.`],
    ['example', {
      title: 'How reliable is a fraud alert?',
      setup: R`0.2% of card transactions are fraudulent. A bank’s fraud model flags 95% of fraudulent transactions (sensitivity) but also flags 2% of legitimate ones (false positive rate). A transaction is flagged. What is the probability it is actually fraud?`,
      steps: [
        R`Prior: \(P(F) = 0.002\).`,
        R`Probability of a flag: \(P(\text{flag}) = 0.95 \times 0.002 + 0.02 \times 0.998 = 0.0019 + 0.01996 = 0.02186\).`,
        R`Posterior: \(P(F \mid \text{flag}) = 0.0019/0.02186 = 0.087\).`,
        R`Check with counts: in 1,000,000 transactions there are 2,000 frauds, of which 1,900 are flagged; of the 998,000 legitimate ones, 19,960 are flagged. Only 1,900 of 21,860 flags, or 8.7%, are fraud.`,
      ],
      answer: R`Even an accurate-sounding model produces mostly false alarms when the event is rare. Ignoring the low prior is the **base-rate fallacy**. For the bank, the right response is not to block every flagged transaction but to use the flag to trigger a cheap check (such as a text message to the customer), and to invest in lowering the false positive rate.`,
    }],
    ['key', R`Rare events plus imperfect tests equal many false positives. Always ask for the base rate before interpreting a signal, whether it is a fraud alert, a medical test, a credit warning or a "can’t-miss" trading signal.`],
    ['p', R`Bayesian updating is also how good analysts should process news: start with a prior view (for example, a 60% probability of an RBA rate rise), then update it in proportion to how much more likely the new data (a strong CPI release) are under one hypothesis than the other. Markets do this continuously, which is why prices react to surprises rather than to the data themselves.`],

    ['h', 'Counting rules'],
    ['p', R`For classical probabilities we often need to count outcomes.`],
    ['math', R`{}_nP_r = \frac{n!}{(n-r)!} \qquad {}_nC_r = \binom{n}{r} = \frac{n!}{r!\,(n-r)!}`, 'The number of permutations of r items from n equals n factorial over n minus r factorial. The number of combinations equals n factorial over r factorial times n minus r factorial.'],
    ['p', R`**Permutations** count ordered arrangements: the number of ways to award gold, silver and bronze among 10 analysts is \({}_{10}P_3 = 720\). **Combinations** count unordered selections: the number of different 5-share portfolios from a list of 20 is \(\binom{20}{5} = 15{,}504\). Combinations reappear in the binomial distribution in the next lecture and in binomial option pricing in Derivative Securities.`],

    ['h', 'The danger of assuming independence'],
    ['p', R`Suppose two mortgages each have a 5% probability of default. If defaults were independent, the probability that both default would be \(0.05 \times 0.05 = 0.25\%\). But defaults are driven by common factors (unemployment, interest rates, house prices). If, given that one borrower defaults, the other defaults with probability 40%, the joint probability is \(0.05 \times 0.40 = 2\%\), eight times higher. Before 2008, many structured mortgage securities were rated using models that underestimated exactly this dependence. When US house prices fell nationwide, defaults arrived together, and securities rated AAA suffered heavy losses. The global financial crisis was, among other things, a very expensive lesson about conditional probability.`],

    ['h', 'Decision trees and expected monetary value'],
    ['p', R`Probability becomes a decision tool when combined with payoffs. A **decision tree** lays out decisions (squares), chance events (circles) and payoffs. We solve it by working backwards, replacing each chance node with its **expected monetary value (EMV)** and choosing the best branch at each decision node.`],
    ['example', {
      title: 'Should we launch the product?',
      setup: R`Launching costs $2 million. There is a 40% chance of success (present value of cash flows $6 million) and a 60% chance of failure ($0.5 million). Not launching yields $0.`,
      steps: [
        R`EMV of launching \(= 0.4 \times 6 + 0.6 \times 0.5 - 2 = 2.4 + 0.3 - 2 = \$0.7\) million.`,
        R`EMV of not launching \(= 0\). Choose to launch.`,
        R`**Value of perfect information**: if a perfect forecast told us the outcome in advance, we would launch only on success, earning \(6 - 2 = \$4\) million with probability 0.4, and nothing otherwise: \(0.4 \times 4 = \$1.6\) million.`,
        R`EVPI \(= 1.6 - 0.7 = \$0.9\) million.`,
      ],
      answer: R`Launch, with an EMV of $0.7 million. No market research, however good, can be worth more than $0.9 million, and imperfect research is worth less. EVPI gives a ceiling on what to spend on information.`,
    }],
    ['warn', R`EMV assumes the decision-maker is risk-neutral. A small company for which a $1.5 million loss would be fatal may rationally reject a positive-EMV gamble. Utility theory, which you will meet in Financial Metrics for Decision Making, incorporates attitudes to risk.`],

    ['h', 'Probability errors people make'],
    ['list', [
      R`**Gambler’s fallacy**: believing that after five red spins, black is "due". Independent events have no memory. After five losing trades, the next trade’s odds are unchanged.`,
      R`**Hot-hand beliefs in markets**: assuming a fund’s winning streak will continue when the evidence for persistence is weak.`,
      R`**Conjunction fallacy**: judging a detailed story (A and B) more likely than one of its parts (A), which is impossible because \(P(A \cap B) \le P(A)\). Compelling investment narratives exploit this.`,
      R`**Base-rate neglect**: as in the fraud example.`,
      R`**Assuming independence** where outcomes share common causes, as in 2008.`,
    ]],

    ['h', 'In Excel and Python'],
    ['code', { lang: 'excel', say: 'Excel counts with COUNTIFS, computes conditional probabilities as ratios, and has COMBIN and PERMUT for counting.', src: R`Joint count         =COUNTIFS(Score,"Low",Outcome,"Default")        → 36
P(Default | Low)    =COUNTIFS(Score,"Low",Outcome,"Default")/COUNTIF(Score,"Low")   → 0.12
Bayes               =(0.95*0.002)/(0.95*0.002+0.02*0.998)           → 0.087
Combinations        =COMBIN(20,5)                                   → 15,504
Permutations        =PERMUT(10,3)                                   → 720
EMV                 =SUMPRODUCT(probabilities, payoffs) - cost` }],
    ['code', { lang: 'python', say: 'The Python code builds the contingency table with pandas crosstab and simulates the fraud example.', src: R`import pandas as pd, numpy as np
from math import comb

loans = pd.DataFrame({"score": ["High"]*700 + ["Low"]*300,
                      "default": [1]*14 + [0]*686 + [1]*36 + [0]*264})
table = pd.crosstab(loans.score, loans.default, margins=True)
print(table)
print(loans.groupby("score")["default"].mean())      # P(default | score)

rng = np.random.default_rng(0)
fraud = rng.random(1_000_000) < 0.002
flag = np.where(fraud, rng.random(fraud.size) < 0.95, rng.random(fraud.size) < 0.02)
print(fraud[flag].mean())                            # close to 0.087
print(comb(20, 5))                                   # 15504` }],

    ['case', {
      title: 'The credit card approval model',
      text: R`A fintech lender’s new model classifies applicants as "approve" or "decline". In testing, 3% of applicants later default. The model declines 85% of applicants who would default, but also declines 10% of applicants who would repay. Each approved good customer earns the lender $300 in present value; each approved defaulter costs $2,500.`,
      questions: [
        'Of the applicants the model approves, what proportion will default? Use Bayes’ theorem or a table of 10,000 applicants.',
        'Calculate the expected profit per applicant with and without the model (approve everyone).',
        'The marketing team wants to approve 5% more applicants by loosening the model. What additional information do you need to evaluate this?',
        'What fairness and privacy questions should the lender consider before using the model?',
      ],
    }],

    ['h', 'Summary'],
    ['list', [
      R`Probabilities can be classical, relative-frequency or subjective; they obey simple rules.`,
      R`Complement: \(1 - P(A)\). Addition: \(P(A) + P(B) - P(A \cap B)\). Multiplication: \(P(A \mid B)P(B)\).`,
      R`Contingency tables give joint, marginal and conditional probabilities; independence means \(P(A \mid B) = P(A)\).`,
      R`Bayes’ theorem updates priors with evidence; with rare events, most positive signals are false alarms.`,
      R`Combinations and permutations count outcomes.`,
      R`Decision trees use EMV; EVPI caps the value of information; correlated risks break independence-based models.`,
    ]],
  ],
  exercises: [
    { type: 'num', level: 'Core', q: R`\(P(A) = 0.4\), \(P(B) = 0.3\) and \(P(A \cap B) = 0.12\). What is \(P(A \cup B)\)?`, answer: 0.58, tol: 0.001, solution: R`\(0.4 + 0.3 - 0.12 = 0.58\). Since \(P(A)P(B) = 0.12 = P(A \cap B)\), A and B are independent.` },
    { type: 'num', level: 'Core', q: R`In the loan table, what is the probability that a defaulted loan came from a low-score applicant?`, answer: 0.72, tol: 0.001, solution: R`\(P(\text{Low} \mid \text{Default}) = 36/50 = 0.72\).` },
    { type: 'num', level: 'Core', q: R`Each of 20 independent suppliers has a 3% chance of failing to deliver this month. What is the probability that at least one fails? (Three decimals.)`, answer: 0.456, tol: 0.001, solution: R`\(1 - 0.97^{20} = 1 - 0.5438 = 0.456\).` },
    { type: 'num', level: 'Stretch', q: R`A disease affects 1% of people. A test detects it in 90% of those who have it and gives a false positive for 5% of those who do not. What is the probability that someone with a positive test has the disease? (Three decimals.)`, answer: 0.154, tol: 0.001, solution: R`\(P = 0.9 \times 0.01/(0.9 \times 0.01 + 0.05 \times 0.99) = 0.009/0.0585 = 0.154\). Most positives are false alarms because the disease is rare.` },
    { type: 'num', level: 'Core', q: R`How many different 4-stock portfolios can be formed from 30 stocks?`, answer: 27405, tol: 0.5, solution: R`\(\binom{30}{4} = 27{,}405\).` },
    { type: 'num', level: 'Core', q: R`A project has a 30% chance of a $5 million payoff and a 70% chance of losing $1 million. What is its expected monetary value, in $ million?`, answer: 0.8, tol: 0.001, solution: R`\(0.3 \times 5 + 0.7 \times (-1) = 1.5 - 0.7 = 0.8\).` },
    { type: 'mcq', level: 'Core', q: 'A roulette wheel has landed on red eight times in a row. The probability of black on the next spin is…', options: ['Higher than usual, because black is due', 'Lower than usual, because red is hot', 'Unchanged, because spins are independent', 'Exactly 50%, because there are only two colours'], answer: 2, solution: R`Spins are independent, so the probability is **unchanged** (slightly below 50% because of the green zero). Believing otherwise is the gambler’s fallacy.` },
    { type: 'mcq', level: 'Core', q: 'Which statement shows that two events A and B are independent?', options: ['P(A ∩ B) = 0', 'P(A | B) = P(A)', 'P(A) + P(B) = 1', 'P(A | B) = P(B | A)'], answer: 1, solution: R`Independence means knowing B does not change the probability of A: \(P(A \mid B) = P(A)\). \(P(A \cap B) = 0\) describes mutually exclusive events, which are dependent (unless one has probability zero).` },
    { type: 'mcq', level: 'Stretch', q: 'In the product-launch example, a consultant offers research that would reveal success or failure perfectly, for $1.2 million. Should you buy it?', options: ['Yes, perfect information is always worth buying', 'No, because it costs more than the EVPI of $0.9 million', 'Yes, because the EMV of launching is positive', 'No, because the EMV of launching is negative'], answer: 1, solution: R`Perfect information is worth at most the **EVPI of $0.9 million**, so paying $1.2 million would lower expected value by $0.3 million.` },
    { type: 'long', level: 'Stretch', q: 'Explain, with a numerical illustration, how the assumption that mortgage defaults are independent can dramatically understate the risk of a portfolio of mortgages.', answer: R`If defaults were independent, the probability that many borrowers default together would be tiny, because it is the product of many small probabilities. For example, with a 5% default probability, the chance that two particular borrowers both default is 0.05 × 0.05 = 0.25%, and the chance that 10 particular borrowers all default is 0.05^10, effectively zero. A security that loses money only if more than, say, 20% of a large pool defaults would look almost riskless.

In reality, defaults share common drivers: a recession raises unemployment for many borrowers at once, higher interest rates raise everyone’s repayments, and falling house prices remove everyone’s equity cushion together. Then the conditional probability of default given that another borrower has defaulted is much higher than 5%. If it is 40%, the probability that both of two borrowers default is 0.05 × 0.40 = 2%, eight times the independent estimate, and the probability of large numbers of simultaneous defaults rises by many orders of magnitude.

This is what happened in the United States in 2007–08. Senior tranches of mortgage-backed securities and CDOs were rated AAA partly because models assumed limited correlation between defaults across regions. When house prices fell nationwide, defaults became highly correlated, losses reached supposedly safe tranches, and the resulting losses at banks triggered the global financial crisis. The lesson: joint probabilities must be modelled with conditional probabilities that reflect common risk factors, and stress tests should consider scenarios where correlations rise.`, solution: 'Look for the independence calculation, the conditional-probability correction, the common-factor explanation, and the 2008 application.' },
  ],
  glossary: [
    ['Sample space', 'The set of all possible outcomes of an experiment.'],
    ['Conditional probability', 'The probability of an event given that another has occurred.'],
    ['Independence', 'Two events are independent if one gives no information about the other.'],
    ['Bayes’ theorem', 'A rule for updating a prior probability with new evidence to obtain a posterior probability.'],
    ['Base-rate fallacy', 'Ignoring how rare an event is when interpreting a signal.'],
    ['Combination', 'An unordered selection of items; n choose r.'],
    ['Expected monetary value', 'The probability-weighted average payoff of a decision.'],
    ['EVPI', 'The expected value of perfect information: the most one should pay for a perfect forecast.'],
  ],
  resources: ['OS_STATS', 'KHAN_STATS', 'SEEING', 'MIT18650', 'RBA_GFC', 'book:KAHNEMAN'],
};
