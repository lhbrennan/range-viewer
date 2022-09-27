import { isCard, isHand, filterCombosWithExcludedCards, getAllCombosFromHands } from '..';

describe('isCard', () => {
  test('it works', () => {
    expect(isCard('Ah')).toBe(true);
    expect(isCard('Ks')).toBe(true);
    expect(isCard('4c')).toBe(true);
    expect(isCard('Td')).toBe(true);
    expect(isCard('Tds')).toBe(false);
    expect(isCard('TTc')).toBe(false);
    expect(isCard('Ax')).toBe(false);
  });
});

// describe('isExactHand', () => {
//   test('it works', () => {
//     expect(isExactHand('AhKc')).toBe(true);
//     expect(isExactHand('Ts9d')).toBe(true);
//     expect(isExactHand('4c4h')).toBe(true);
//     expect(isExactHand('Td9d')).toBe(true);
//     expect(isExactHand('Tds')).toBe(false);
//     expect(isExactHand('TTc')).toBe(false);
//     expect(isExactHand('Ax5')).toBe(false);
//     expect(isExactHand('JsJs')).toBe(false);
//   });
// });

describe('isHand', () => {
  test('it works', () => {
    expect(isHand('AKs')).toBe(true);
    expect(isHand('AKo')).toBe(false);
    expect(isHand('AK')).toBe(true);
    expect(isHand('AA')).toBe(true);
    expect(isHand('AhKc')).toBe(false);
    expect(isHand('Ts9d')).toBe(false);
    expect(isHand('4c')).toBe(false);
    expect(isHand('Td9d')).toBe(false);
    expect(isHand('TTc')).toBe(false);
    expect(isHand('Ax5')).toBe(false);
    expect(isHand('JsJs')).toBe(false);
    expect(isHand('JJs')).toBe(false);
  });
});

// describe('handCombosAreSimilar', () => {
//   test('it works', () => {
//     expect(handCombosAreSimilar('AKs', 'A9s')).toBe(true);
//     expect(handCombosAreSimilar('33', '77')).toBe(true);
//     expect(handCombosAreSimilar('T6', 'T9')).toBe(true);
//     expect(handCombosAreSimilar('T6', 'J9')).toBe(false);
//     expect(handCombosAreSimilar('T6', 'T9s')).toBe(false);
//     expect(handCombosAreSimilar('44', '77s')).toBe(false);
//     expect(handCombosAreSimilar('5Js', '5Ks')).toBe(false);
//   });
// });

describe('filterCombosWithExcludedCards', () => {
  test('returns the right number of combos', () => {
    const heroCombos = [
      ['Th', 'Td'],
      ['Ah', '7c'],
      ['Ks', 'Ts'],
    ];
    const boards = [
      ['5c', '6h', '7h', 'Kc'],
      ['Td', '6h', '7h'],
    ];

    const villianCombos1 = filterCombosWithExcludedCards(
      getAllCombosFromHands(['K8s', 'Q8', 'JJ', '97s', '85s']),
      [...heroCombos[0], ...boards[0]]
    );
    expect(villianCombos1.length).toBe(27);

    const villianCombos2 = filterCombosWithExcludedCards(
      getAllCombosFromHands(['K8s', 'Q8', 'JJ', '97s', '85s']),
      [...heroCombos[1], ...boards[1]]
    );
    expect(villianCombos2.length).toBe(29);

    const villianCombos3 = filterCombosWithExcludedCards(
      getAllCombosFromHands(['KTs', 'K8s', 'T7s', 'T6s']),
      [...heroCombos[2], ...boards[1]]
    );
    expect(villianCombos3.length).toBe(11);
  });
});
