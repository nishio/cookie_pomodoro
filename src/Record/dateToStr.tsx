export const dateToStr = (x?: number) => {
  if (x === undefined) {
    return "Not yet";
  }
  return new Date(x as number).toLocaleString();
};
