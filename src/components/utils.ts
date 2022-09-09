import { Status, HandStatusMap } from '../types';

export const createHandStatusMap = (hands: string[], status: Status) => {
  if (!hands) {
    return {};
  }
  return hands.reduce<HandStatusMap>((map, pair) => {
    map[pair] = status;
    return map;
  }, {});
};
