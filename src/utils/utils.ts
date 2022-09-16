import { HAND_TYPE, HANDS, SUITS, CARD_RANKS, CARDS } from '../constants';
import { Hand, HandType, Card, Rank, Combo } from '../types';

export const roundToPrecision = (num: number, precision: number) => {
  const adjuster = 1 / precision;
  return Math.round(num * adjuster) / adjuster;
};

export const calcNumHandCombos = (hand: Hand) => {
  const handType = determineHandType(hand);

  if (handType === HAND_TYPE.pair) {
    return 6;
  }
  if (handType === HAND_TYPE.suited) {
    return 4;
  }
  return 12;
};

export const determineHandType = (hand: Hand): HandType => {
  if (hand.charAt(0) === hand.charAt(1)) {
    return HAND_TYPE.pair;
  }
  if (hand.charAt(2) === 's') {
    return HAND_TYPE.suited;
  }
  return HAND_TYPE.unsuited;
};
// TODO: change to getAllPairExactHands
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

// TODO: change 'ExactHands' to 'Combos'
export const getAllExactHandsFromHand = (hand: Hand): Combo[] => {
  const handType = determineHandType(hand);

  if (handType === HAND_TYPE.pair) {
    return getAllPairCombos(hand);
  } else if (handType === HAND_TYPE.suited) {
    return getAllSuitedCombos(hand);
  } else {
    return getAllUnsuitedCombos(hand);
  }
};

// commented out because it's not in use
// export const hasDuplicates = (array: any[]) => new Set(array).size !== array.length;

export const isCard = (str: string): str is Card => {
  return includes(CARDS, str);
  // if (
  //   str.length !== 2 ||
  //   !CARD_RANKS.includes(str.charAt(0)) ||
  //   !Object.keys(SUITS).includes(str.charAt(1))
  // ) {
  //   return false;
  // }

  // return true;
};

export const isExactHand = (str: string) => {
  if (str.length !== 4) {
    return false;
  }
  const card1 = str.slice(0, 2);
  const card2 = str.slice(2);
  if (!isCard(card1) || !isCard(card2)) {
    return false;
  }
  if (card1 === card2) {
    return false;
  }

  return true;
};

function includes<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
  return coll.includes(el as T);
}

// const isCombo = (maybeCombo: string[]): maybeCombo is Combo => {
//   return maybeCombo.length === 2 && isCard(maybeCombo[0]) && isCard(maybeCombo[1]);
// };

export const isHand = (str: string): str is Hand => {
  return includes(HANDS, str);
};

export const handCombosAreSimilar = (combo1: string, combo2: string) => {
  if (!isHand(combo1) || !isHand(combo2)) {
    return false;
  }

  const len1 = combo1.length;
  const len2 = combo2.length;

  if (len1 !== len2) {
    return false;
  }

  if (
    determineHandType(combo1) === HAND_TYPE.pair &&
    determineHandType(combo2) === HAND_TYPE.pair
  ) {
    return true;
  }

  const firstCardRank = combo1.charAt(0) === combo2.charAt(0);
  const modifiersMatch = len1 === 2 || combo1.charAt(2) === combo2.charAt(2);

  if (!firstCardRank || !modifiersMatch) {
    return false;
  }

  return true;
};

export const isSubRange = (str: string) => {
  const len = str.length;
  if (len < 3 || len > 7) {
    return false;
  }

  const lastChar = str.charAt(len - 1);
  if (lastChar === '+' && isHand(str.slice(0, len))) {
    return true;
  }

  if (!str.includes('-')) {
    return false;
  }
  const [combo1, combo2] = str.split('-');
  if (handCombosAreSimilar(combo1, combo2)) {
    return true;
  }

  return false;
};

// const getAllHandsFromSubRange = (subRange) => {
//   const hands = [];

//   const lastChar = subRange.charAt(subRange.length - 1);

//   if(lastChar === '+') {

//   }
// }

/* KTs+ => KTs,KJs,KQs
   KTo+ => KTo,KJo,KQo
   KT+ => KTs+,KTo+
   KQs => KhQh,KdQd,KsQs,KcQc
*/
export const unpackRangeItem = (rangeItem: string) => {
  if (isExactHand(rangeItem)) {
    return rangeItem;
  }

  if (isHand(rangeItem)) {
    return getAllExactHandsFromHand(rangeItem);
  }

  // if (isSubRange(rangeItem)) {
  //   return getAllHandsFromSubRange(rangeItem);
  // }

  return [];
};

// export const unpackRange = (range: string[]) => {
//   range.reduce((hands, rangeItem) => {
//     hands.push(...unpackRangeItem(rangeItem));
//     return hands;
//   }, []);
// };

/*
TERMINOLOGY
'combo' = 'AhQs' = two specific cards
'hand' = 'AQs' = all combinations of two specific cards
'subRange' = 'KJs+' or '44-77' = a range of hand combinations
'rangeItem' = a superset containing all of: subRange, handComb, hand
'range' = [ATs, AQo, JJ+, 67o, 8c9c] = an array of subRange's
*/
