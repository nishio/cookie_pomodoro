import { TResourceID } from "./Resource/all_resources";

export const update = <T extends string>(
  obj: { [key in T]: number },
  k: T,
  diff: number
) => {
  const newObj = { ...obj };
  newObj[k] = (obj[k] ?? 0) + diff;
  return newObj;
};

export const updateResource = (
  obj: { [key in TResourceID]: number },
  k: TResourceID,
  diff: number
) => {
  const newObj = { ...obj };
  newObj[k] = (obj[k] ?? 0) + diff;
  return newObj;
};
