import { Handler } from '@netlify/functions';
import { CARDS } from '../../../src/constants';
const HandApi = require('pokersolver').Hand;

function calcEquityByMonteCarloSimulation(
  hand, // AhJc
  range, // [[As,9h], [Kc, Ks]...]
  board, // [2d, 9d, 4s],
  numTrials // 5000
) {
  let wins = 0;

  for (let i = 0; i < numTrials; i++) {
    const completeBoard = generateRandomBoard(board, hand);
    const equity = calcEquityOnCompleteBoard(hand, range, completeBoard);
    wins += equity;
  }

  return wins / numTrials;
}

function generateRandomBoard(initialBoard, deadCards) {
  const finalBoard = [...initialBoard];

  const availableCards = [...CARDS].filter(
    (card) => ![...initialBoard, ...deadCards].includes(card)
  );

  for (let i = initialBoard.length; i < 5; i++) {
    const selectedCardIdx = pickRandomArrayElement(availableCards);
    const selectedCard = availableCards.splice(selectedCardIdx, 1)[0];
    finalBoard.push(selectedCard);
  }

  return finalBoard;
}

function calcEquityOnCompleteBoard(hand, range, board) {
  let wins = 0;
  let ties = 0;

  range.forEach((villianHand) => {
    const outcome = determineIfHeroWins([...hand, ...board], [...villianHand, ...board]);
    if (outcome === 'win') {
      wins++;
    } else if (outcome === 'tie') {
      ties++;
    }
  });

  return wins / (range.length - ties);
}

function determineIfHeroWins(heroHand, villianHand) {
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

function pickRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//----- For Netlify Serverless ----

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
  pickRandomArrayElement,
  handler,
};
