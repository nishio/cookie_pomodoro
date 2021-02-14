// @ts-ignore
export const update = <T>(obj: { [key in T]: number }, k: T, diff: number) => {
  const newObj = { ...obj };
  newObj[k] = (obj[k] ?? 0) + diff;
  return newObj;
};
