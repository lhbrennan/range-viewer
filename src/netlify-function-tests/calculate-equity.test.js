import {
  generateRandomBoard,
  calcEquityOnCompleteBoard,
  determineIfHeroWins,
  // calcEquityByMonteCarloSimulation,
} from '../../netlify/functions/calculate-equity';
import { roundToPrecision, getAllCombosFromHands, filterCombosWithExcludedCards } from '../utils';
import { hasDuplicates } from './utils';

describe('generateRandomBoard', () => {
  const deadCards1 = ['Kh', 'Qh'];
  const deadCards2 = ['Kh', '9c'];
  const deadCards3 = ['5c', '6c'];

  const board1 = generateRandomBoard(['Ah', '2s', '7c'], deadCards1);
  const board2 = generateRandomBoard(['Ks', 'Ts', '7s', '2h'], deadCards2);
  const board3 = generateRandomBoard([], deadCards3);

  test('should return an array of 7 cards', () => {
    expect(board1).toHaveLength(5);
    expect(board2).toHaveLength(5);
    expect(board3).toHaveLength(5);
  });

  test('all cards should be unique', () => {
    expect(hasDuplicates([...board1, ...deadCards1])).toBeFalsy();
    expect(hasDuplicates([...board2, ...deadCards2])).toBeFalsy();
    expect(hasDuplicates([...board3, ...deadCards3])).toBeFalsy();
  });
});

describe('calcEquityOnCompleteBoard', () => {
  test('calculates equities correctly when villian has a range 1', () => {
    const heroCombo = ['Ah', 'Ac'];
    const villianCombos = [
      ['As', 'Ad'],
      ['Ks', 'Kc'],
      ['Ks', 'Kd'],
      ['Kc', 'Kd'],
      ['Qs', 'Qc'],
      ['Qs', 'Qd'],
      ['Qs', 'Qh'],
      ['Qc', 'Qd'],
      ['Qc', 'Qh'],
      ['Qd', 'Qh'],
    ];
    const board = ['Kh', '7s', '9h', 'Jh', 'Js'];
    const equity = calcEquityOnCompleteBoard(heroCombo, villianCombos, board);
    expect(roundToPrecision(equity, 0.01)).toBe(0.65);
  });

  test('calculates equities correctly when villian has a range 2', () => {
    const heroCombo = ['Ah', 'Ac'];
    const board = ['Ks', '9s', '9h', 'Jh', '3s'];
    const villianCombos = filterCombosWithExcludedCards(
      getAllCombosFromHands(['JTs', 'T9s', '98s', '44', '33']),
      [...heroCombo, ...board]
    );
    const equity = calcEquityOnCompleteBoard(heroCombo, villianCombos, board);
    expect(equity).toBe(0.5);
  });

  test('calculates equities correctly when villian has specific hole cards', () => {
    const heroCombo = ['Ad', 'Ah'];
    const villianCombos = [['Ks', 'Kd']];
    const board = ['Js', '7h', '6h', '8d', '5c'];
    const equity = calcEquityOnCompleteBoard(heroCombo, villianCombos, board);
    expect(equity).toBe(1);
  });
});

describe('determineIfHeroWins', () => {
  test('correctly compares hands of different ranks', () => {
    const heroHoleCards = ['Ac', 'Ks'];
    const villianHoleCards = ['Ah', 'Th'];

    const board1 = ['9s', 'Tc', '3h', '4d', '9c'];
    expect(
      determineIfHeroWins([...heroHoleCards, ...board1], [...villianHoleCards, ...board1])
    ).toEqual('lose');

    const board2 = ['9s', 'Kc', '3h', '4h', '9h'];
    expect(
      determineIfHeroWins([...heroHoleCards, ...board2], [...villianHoleCards, ...board2])
    ).toEqual('lose');

    const board3 = ['9s', 'Kc', '3c', '4h', '9h'];
    expect(
      determineIfHeroWins([...heroHoleCards, ...board3], [...villianHoleCards, ...board3])
    ).toEqual('win');

    const board4 = ['As', 'Ad', '7c', '7h', '9h'];
    expect(
      determineIfHeroWins([...heroHoleCards, ...board4], [...villianHoleCards, ...board4])
    ).toEqual('tie');
  });

  // describe('calcEquityByMonteCarloSimulation', () => {
  //   test('villian is drawing dead', () => {
  //     const heroHand = ['As', 'Ac'];
  //     const villianRange = ['KK', 'QQ'];
  //     const board = ['Ad', 'Ah', '4c'];

  //     const equity = calcEquityByMonteCarloSimulation(heroHand, villianRange, board, 1000);
  //     expect(equity).toEqual(1);
  //   });
  // });
});
