export const dateToStr = (x?: number) => {
  if (x === undefined || x === 0) {
    return "Not yet";
  }
  return new Date(x as number).toLocaleString();
};
