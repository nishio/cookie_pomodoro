export const update = <T extends string>(
  obj: { [key in T]: number },
  k: T,
  diff: number
) => {
  const newObj = { ...obj };
  newObj[k] = (obj[k] ?? 0) + diff;
  return newObj;
};
