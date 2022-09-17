import { Handler } from '@netlify/functions';
import { CARDS } from '../../../src/constants';
import { getAllCombosFromHands } from '../../../src/utils';
import type { Combo, Hand, Card } from '../../../src/types';
const HandApi = require('pokersolver').Hand;

function calcEquityByMonteCarloSimulation(
  heroCombo: Combo, // old: AhJc --> new: ['Ah', 'Jc']
  villianHandRange: Hand[], // old: [[As,9h], [Kc, Ks]...] --> new: [A9, KK, ...]
  board: Card[],
  numTrials: number
) {
  let wins = 0;
  const unfilteredVillianComboRange = getAllCombosFromHands(villianHandRange);

  for (let i = 0; i < numTrials; i++) {
    const completeBoard = generateRandomBoard(board, heroCombo);
    const excludedCards = [...completeBoard, ...heroCombo];
    const villianComboRange = unfilteredVillianComboRange.filter((combo) => {
      const [firstCard, secondCard] = combo;
      return !excludedCards.includes(firstCard) && !excludedCards.includes(secondCard);
    });
    const equity = calcEquityOnCompleteBoard(heroCombo, villianComboRange, completeBoard);
    wins += equity;
  }
  return wins / numTrials;
}

function generateRandomBoard(initialBoard: Card[], deadCards: Card[]) {
  const finalBoard = [...initialBoard];

  const availableCards = [...CARDS].filter(
    (card) => ![...initialBoard, ...deadCards].includes(card)
  );

  for (let i = initialBoard.length; i < 5; i++) {
    const selectedCardIdx = pickRandomArrayElementIdx(availableCards.length);
    const selectedCard = availableCards.splice(selectedCardIdx, 1)[0];
    finalBoard.push(selectedCard);
  }

  return finalBoard;
}

function calcEquityOnCompleteBoard(
  heroHand: Combo,
  villianComboRange: Combo[],
  board: Card[]
): number {
  let wins = 0;
  let ties = 0;

  villianComboRange.forEach((villianHand) => {
    const outcome = determineIfHeroWins([...heroHand, ...board], [...villianHand, ...board]);
    if (outcome === 'win') {
      wins++;
    } else if (outcome === 'tie') {
      ties++;
    }
  });

  return (wins + 0.5 * ties) / villianComboRange.length;
}

function determineIfHeroWins(heroHand: Card[], villianHand: Card[]) {
  const solvedHeroHand = HandApi.solve(heroHand);
  const solvedVillianHand = HandApi.solve(villianHand);
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
  const equity = calcEquityByMonteCarloSimulation(heroHand, villianRange, board, numTrials);
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
