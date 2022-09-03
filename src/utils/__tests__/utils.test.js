import { isCard, isHand, isHandCombo, handCombosAreSimilar } from '../utils';

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

describe('isHand', () => {
  test('it works', () => {
    expect(isHand('AhKc')).toBe(true);
    expect(isHand('Ts9d')).toBe(true);
    expect(isHand('4c4h')).toBe(true);
    expect(isHand('Td9d')).toBe(true);
    expect(isHand('Tds')).toBe(false);
    expect(isHand('TTc')).toBe(false);
    expect(isHand('Ax5')).toBe(false);
    expect(isHand('JsJs')).toBe(false);
  });
});

describe('isHandCombo', () => {
  test('it works', () => {
    expect(isHandCombo('AKs')).toBe(true);
    expect(isHandCombo('AKo')).toBe(true);
    expect(isHandCombo('AK')).toBe(true);
    expect(isHandCombo('AA')).toBe(true);
    expect(isHandCombo('AhKc')).toBe(false);
    expect(isHandCombo('Ts9d')).toBe(false);
    expect(isHandCombo('4c')).toBe(false);
    expect(isHandCombo('Td9d')).toBe(false);
    expect(isHandCombo('TTc')).toBe(false);
    expect(isHandCombo('Ax5')).toBe(false);
    expect(isHandCombo('JsJs')).toBe(false);
    expect(isHandCombo('JJs')).toBe(false);
  });
});

describe('handCombosAreSimilar', () => {
  test('it works', () => {
    expect(handCombosAreSimilar('AKs', 'A9s')).toBe(true);
    expect(handCombosAreSimilar('33', '77')).toBe(true);
    expect(handCombosAreSimilar('T6', 'T9')).toBe(true);
    expect(handCombosAreSimilar('T6', 'J9')).toBe(false);
    expect(handCombosAreSimilar('T6', 'T9s')).toBe(false);
    expect(handCombosAreSimilar('44', '77s')).toBe(false);
    expect(handCombosAreSimilar('5Js', '5Ks')).toBe(false);
  });
});
