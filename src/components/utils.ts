import { Status, Hand, HandStatusMap, PseudoSelectionMap } from '../types';
// TODO: probably move this to the other utils file
export const createHandStatusMap = (hands: Hand[], status: Status): HandStatusMap => {
  if (!hands) {
    return {};
  }
  return hands.reduce<HandStatusMap>((map, pair) => {
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
