import {
  generateRandomBoard,
  calcEquityOnCompleteBoard,
  determineIfHeroWins,
  calcEquityByMonteCarloSimulation,
} from '../calcEquity';
import { roundToPrecision, hasDuplicates, getAllPairCombos } from '../../utils';

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
  const hand1 = ['Ah', 'Ac'];
  const range1 = [
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
  const board1 = ['Kh', '7s', '9h', 'Jh', 'Js'];

  test('calculates equities correctly', () => {
    const equity = calcEquityOnCompleteBoard(hand1, range1, board1);
    expect(roundToPrecision(equity, 0.01)).toEqual(0.67);
  });
});

describe('determineIfHeroWins', () => {
  test('correctly compares hands of different ranks', () => {
    const heroHoleCards = ['Ac', 'Ks'];
    const villianHoleCards = ['Ah', 'Th'];

    const board1 = ['9s', 'Tc', '3h', '4d', '9c'];
    expect(
      determineIfHeroWins(
        [...heroHoleCards, ...board1],
        [...villianHoleCards, ...board1]
      )
    ).toEqual('lose');

    const board2 = ['9s', 'Kc', '3h', '4h', '9h'];
    expect(
      determineIfHeroWins(
        [...heroHoleCards, ...board2],
        [...villianHoleCards, ...board2]
      )
    ).toEqual('lose');

    const board3 = ['9s', 'Kc', '3c', '4h', '9h'];
    expect(
      determineIfHeroWins(
        [...heroHoleCards, ...board3],
        [...villianHoleCards, ...board3]
      )
    ).toEqual('win');

    const board4 = ['As', 'Ad', '7c', '7h', '9h'];
    expect(
      determineIfHeroWins(
        [...heroHoleCards, ...board4],
        [...villianHoleCards, ...board4]
      )
    ).toEqual('tie');
  });

  describe('calcEquityByMonteCarloSimulation', () => {
    test('villian is drawing dead', () => {
      const heroHand = ['As', 'Ac'];
      const villianRange = [
        ...getAllPairCombos('KK'),
        ...getAllPairCombos('QQ'),
      ];
      const board = ['Ad', 'Ah', '4c'];

      const equity = calcEquityByMonteCarloSimulation(
        heroHand,
        villianRange,
        board,
        1000
      );
      expect(equity).toEqual(1);
    });
  });
});
