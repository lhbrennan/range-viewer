export const createHandStatusMap = (hands, status) => {
  if (!hands) {
    return {};
  }
  return hands.reduce((obj, pair) => {
    obj[pair] = status;
    return obj;
  }, {});
};
