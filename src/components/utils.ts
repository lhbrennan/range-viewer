import { Status, Hand, HandSelectionMap, PseudoSelectionMap } from '../types';
// TODO: probably move this to the other utils file
export const createHandSelectionMap = (hands: Hand[], status: Status): HandSelectionMap => {
  if (!hands) {
    return {};
  }
  return hands.reduce<HandSelectionMap>((map, pair) => {
    map[pair] = status;
    return map;
  }, {});
};

export const createPsuedoSelectionMap = (hands: Hand[], status: boolean): PseudoSelectionMap => {
  if (!hands) {
    return {};
  }
  return hands.reduce<PseudoSelectionMap>((map, pair) => {
    map[pair] = status;
    return map;
  }, {});
};