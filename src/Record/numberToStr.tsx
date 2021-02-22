export const numberToStr = (x: unknown) => {
  const n: number = (x as number | undefined) ?? 0;
  return n.toString();
};
