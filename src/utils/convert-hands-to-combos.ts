import { includes, determineHandType } from '.';
import { HAND_TYPE, SUITS, CARD_RANKS } from '../constants';
import type { Hand, Combo, Rank } from '../types';

export const getAllPairCombos = (hand: Hand): Combo[] => {
  const rank = hand.charAt(0);
  // TODO-TYPESCRIPT: is there a better way to validate that rank is type RANK?
  if (!includes(CARD_RANKS, rank)) {
    console.error('Recieved an invalid hand');
    return [];
  }
  return [
    [`${rank}h`, `${rank}s`],
    [`${rank}h`, `${rank}c`],
    [`${rank}h`, `${rank}d`],
    [`${rank}s`, `${rank}d`],
    [`${rank}s`, `${rank}c`],
    [`${rank}d`, `${rank}c`],
  ];
};

export const getAllSuitedCombos = (hand: Hand): Combo[] => {
  const [a, b] = hand.split('');
  // @ts-ignore
  return Object.keys(SUITS).map((suit) => [`${a}${suit}`, `${b}${suit}`]);
};

// TODO-TYPESCRIPT: maybe type this arg as UnsuitedHand?
export const getAllUnsuitedCombos = (hand: Hand): Combo[] => {
  // @ts-ignore
  const [a, b]: [Rank, Rank] = hand.split('');
  return [
    [`${a}h`, `${b}s`],
    [`${a}h`, `${b}c`],
    [`${a}h`, `${b}d`],
    [`${a}s`, `${b}d`],
    [`${a}s`, `${b}c`],
    [`${a}d`, `${b}c`],
    [`${a}s`, `${b}h`],
    [`${a}c`, `${b}h`],
    [`${a}d`, `${b}h`],
    [`${a}d`, `${b}s`],
    [`${a}c`, `${b}s`],
    [`${a}c`, `${b}d`],
  ];
};

export const getAllCombosFromHand = (hand: Hand): Combo[] => {
  const handType = determineHandType(hand);

  if (handType === HAND_TYPE.pair) {
    return getAllPairCombos(hand);
  } else if (handType === HAND_TYPE.suited) {
    return getAllSuitedCombos(hand);
  } else {
    return getAllUnsuitedCombos(hand);
  }
};

export const getAllCombosFromHands = (hands: Hand[]): Combo[] => {
  let combos: Combo[] = [];
  hands.forEach((hand) => {
    combos = [...combos, ...getAllCombosFromHand(hand)];
  });
  return combos;
};
