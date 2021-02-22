export const isDifferentDate = (x: number) => {
  return new Date(x).toDateString() !== new Date().toDateString();
};
