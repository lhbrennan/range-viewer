export const totalPossibleCombos = 1326;

export const HAND_TYPES = {
  PAIR: 'pair',
  SUITED: 'suited',
  UNSUITED: 'unsuited',
};

export const SUITS = {
  h: 'hearts',
  d: 'diamonds',
  c: 'clubs',
  s: 'spades',
};

export const CARD_RANKS = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
]; // eslint-disable-line

export const roundToPrecision = (num, precision) => {
  const adjuster = 1 / precision;
  return Math.round(num * adjuster) / adjuster;
};

export const calcNumHandCombos = (hand) => {
  const handType = determineHandType(hand);

  if (handType === HAND_TYPES.PAIR) {
    return 6;
  }
  if (handType === HAND_TYPES.SUITED) {
    return 4;
  }
  return 12;
};

export const determineHandType = (hand) => {
  if (hand.charAt(0) === hand.charAt(1)) {
    return HAND_TYPES.PAIR;
  }
  if (hand.charAt(2) === 's') {
    return HAND_TYPES.SUITED;
  }
  return HAND_TYPES.UNSUITED;
};

export const getAllPairCombos = (hand) => {
  const rank = hand.charAt(0);
  return [
    [`${rank}h`, `${rank}s`],
    [`${rank}h`, `${rank}c`],
    [`${rank}h`, `${rank}d`],
    [`${rank}s`, `${rank}d`],
    [`${rank}s`, `${rank}c`],
    [`${rank}d`, `${rank}c`],
  ];
};

export const getAllSuitedCombos = (hand) => {
  const [a, b] = hand.split('');
  return Object.keys(SUITS).map((suit) => [`${a}${suit}`, `${b}${suit}`]);
};

export const getAllUnsuitedCombos = (hand) => {
  const [a, b] = hand.split('');

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

export const getAllHandsFromCombo = (hand) => {
  const handType = determineHandType(hand);

  if (handType === HAND_TYPES.PAIR) {
    return getAllPairCombos(hand);
  } else if (handType === HAND_TYPES.SUITED) {
    return getAllSuitedCombos(hand);
  } else {
    return getAllUnsuitedCombos(hand);
  }
};

export const hasDuplicates = (array) => new Set(array).size !== array.length;

export const isCard = (str) => {
  if (
    str.length !== 2 ||
    !CARD_RANKS.includes(str.charAt(0)) ||
    !Object.keys(SUITS).includes(str.charAt(1))
  ) {
    return false;
  }

  return true;
};

export const isHand = (str) => {
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

// TODO(luke.brennan): this is gross, refactor it
export const isHandCombo = (str) => {
  if (str.length < 2 || str.length > 3) {
    return false;
  }

  const firstChar = str.charAt(0);
  const secondChar = str.charAt(1);

  const firstCharRank = CARD_RANKS.indexOf(firstChar);
  const secondCharRank = CARD_RANKS.indexOf(secondChar);

  if (
    firstCharRank < 0 ||
    secondCharRank < 0 ||
    secondCharRank < firstCharRank
  ) {
    return false;
  }

  if (str.length === 3 && firstChar === secondChar) {
    return false;
  }

  if (str.charAt(2) && !['o', 's'].includes(str.charAt(2))) {
    return false;
  }

  return true;
};

export const handCombosAreSimilar = (combo1, combo2) => {
  if (!isHandCombo(combo1) || !isHandCombo(combo2)) {
    return false;
  }

  const len1 = combo1.length;
  const len2 = combo2.length;

  if (len1 !== len2) {
    return false;
  }

  if (
    determineHandType(combo1) === HAND_TYPES.PAIR &&
    determineHandType(combo2) === HAND_TYPES.PAIR
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

export const isSubRange = (str) => {
  const len = str.length;
  if (len < 3 || len > 7) {
    return false;
  }

  const lastChar = str.charAt(len - 1);
  if (lastChar === '+' && isHandCombo(str.slice(0, len))) {
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
export const unpackRangeItem = (rangeItem) => {
  if (isHand(rangeItem)) {
    return rangeItem;
  }

  if (isHandCombo(rangeItem)) {
    return getAllHandsFromCombo(rangeItem);
  }

  // if (isSubRange(rangeItem)) {
  //   return getAllHandsFromSubRange(rangeItem);
  // }

  return [];
};

export const unpackRange = (range) => {
  range.reduce((hands, rangeItem) => {
    hands.push(...unpackRangeItem(rangeItem));
    return hands;
  }, []);
};

/*
TERMINOLOGY
'hand' = 'AhQs' = two specific cards
'handCombo' = 'AQs' = all combinations of two specific cards
'subRange' = 'KJs+' or '44-77' = a range of hand combinations
'rangeItem' = a superset containing all of: subRange, handComb, hand
'range' = [ATs, AQo, JJ+, 67o, 8c9c] = an array of subRange's
*/
