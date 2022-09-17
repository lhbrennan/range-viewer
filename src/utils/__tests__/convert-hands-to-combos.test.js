import { getAllCombosFromHands } from '..';

describe('getAllCombosFromHands', () => {
  test('the combos array is the right length', () => {
    const hands1 = ['AKs', '44', 'T8'];
    const hands2 = ['KK', 'QQ', 'JJ'];
    expect(getAllCombosFromHands(hands1).length).toBe(22);
    expect(getAllCombosFromHands(hands2).length).toBe(18);
  })

  test('gets the correct combos', () => {
    const hands1 = ['AKs'];
    expect(getAllCombosFromHands(hands1).sort()).toEqual([['Ah', 'Kh'], ['Ac', 'Kc'], ['As', 'Ks'], ['Ad', 'Kd']].sort());
  })
});
