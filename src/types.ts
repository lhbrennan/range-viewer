import { STATUS, HANDS, HAND_TYPE, CARDS, CARD_RANKS } from './constants';

export type Status = keyof typeof STATUS;
export type Hand = typeof HANDS[number];
export type HandStatusMap = { [key in Hand]?: Status };
export type PseudoSelectionMap = { [key in Hand]?: boolean };
export type HandType = keyof typeof HAND_TYPE;
export type Card = typeof CARDS[number];
export type ExactHand = `${Card}${Card}`;
export type Rank = typeof CARD_RANKS[number];
export type Combo = [Card, Card];
