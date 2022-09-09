import { STATUS, HAND_TYPE } from './constants';

export type Status = keyof typeof STATUS;
export type HandStatusMap = { [hand: string]: Status };
export type PseudoSelectionMap = { [hand: string]: boolean };
export type HandType = keyof typeof HAND_TYPE;
