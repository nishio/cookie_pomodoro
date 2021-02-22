import { State } from "reactn/default";
import { TResourceID } from "./all_ids";

export const update = <T extends string>(
  obj: { [key in T]: number },
  k: T,
  diff: number
) => {
  const newObj = { ...obj };
  newObj[k] = (obj[k] ?? 0) + diff;
  return newObj;
};

export const updateResource = (g: State, k: TResourceID, diff: number) => {
  const newObj = { ...g.resources };
  newObj[k] = (g.resources[k] ?? 0) + diff;
  return { resources: newObj };
};
