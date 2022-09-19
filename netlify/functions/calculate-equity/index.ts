import { Handler } from '@netlify/functions';
import { CARDS } from '../../../src/constants';
import { getAllCombosFromHands, filterCombosWithExcludedCards } from '../../../src/utils';
import type {
  Combo,
  Hand,
  Card,
  SevenCardHand,
  ShowdownOutcome,
  CompleteBoard,
} from '../../../src/types';
const HandApi = require('pokersolver').Hand;

function calcEquityByMonteCarloSimulation(
  heroCombo: Combo,
  villianHandRange: Hand[],
  board: Card[],
  numTrials: number
) {
  let equityNumerator = 0;
  const unfilteredVillianComboRange = getAllCombosFromHands(villianHandRange);

  for (let i = 0; i < numTrials; i++) {
    const completeBoard = generateRandomBoard(board, heroCombo);
    const excludedCards = [...completeBoard, ...heroCombo];
    const villianCombos = filterCombosWithExcludedCards(unfilteredVillianComboRange, excludedCards);
    const equity = calcEquityOnCompleteBoard(heroCombo, villianCombos, completeBoard);
    equityNumerator += equity;
  }
  return equityNumerator / numTrials;
}

function generateRandomBoard(initialBoard: Card[], deadCards: Card[]): CompleteBoard {
  const completeBoard = [...initialBoard];

  const availableCards = [...CARDS].filter(
    (card) => ![...initialBoard, ...deadCards].includes(card)
  );

  while (completeBoard.length < 5) {
    const selectedCardIdx = pickRandomArrayElementIdx(availableCards.length);
    const selectedCard = availableCards.splice(selectedCardIdx, 1)[0];
    completeBoard.push(selectedCard);
  }
  // @ts-ignore
  return completeBoard;
}

function calcEquityOnCompleteBoard(
  heroCombo: Combo,
  villianCombos: Combo[],
  board: [Card, Card, Card, Card, Card]
): number {
  let wins = 0;
  let ties = 0;

  villianCombos.forEach((villianCombo) => {
    const outcome: ShowdownOutcome = determineIfHeroWins(
      [...heroCombo, ...board],
      [...villianCombo, ...board]
    );
    if (outcome === 'win') {
      wins++;
    } else if (outcome === 'tie') {
      ties++;
    }
  });

  return (wins + 0.5 * ties) / villianCombos.length;
}

function determineIfHeroWins(
  heroSevenCards: SevenCardHand,
  villianSevenCards: SevenCardHand
): ShowdownOutcome {
  const solvedHeroHand = HandApi.solve(heroSevenCards);
  const solvedVillianHand = HandApi.solve(villianSevenCards);
  const winner = HandApi.winners([solvedHeroHand, solvedVillianHand]);
  if (winner.length > 1) {
    return 'tie';
  }
  if (winner[0] === solvedHeroHand) {
    return 'win';
  } else if (winner[0] === solvedVillianHand) {
    return 'lose';
  } else {
    console.error('Unable to deterine if hero wins');
    return null;
  }
}

function pickRandomArrayElementIdx(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

// available from '/.netlify/functions/calculate-equity'
const handler: Handler = async (event, context, callback) => {
  const { heroHand, villianRange, board, numTrials } = JSON.parse(event.body || '');
  const equity = calcEquityByMonteCarloSimulation(heroHand, villianRange, board, Number(numTrials));
  return { statusCode: 200, body: `"Equity: ${equity}"` };
};

module.exports = {
  calcEquityByMonteCarloSimulation,
  generateRandomBoard,
  calcEquityOnCompleteBoard,
  determineIfHeroWins,
  pickRandomArrayElementIdx,
  handler,
};
