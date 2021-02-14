export const update = (
  obj: { [key: string]: number },
  k: string,
  diff: number
) => {
  console.log(obj, k, diff);
  const newObj = { ...obj };
  newObj[k] = (obj[k] ?? 0) + diff;
  return newObj;
};
