import { State } from "reactn/default";
import { isAchieved } from "./isAchieved";

export const addMiningProduction = (g: State) => {
  let ret = 0;
  if (isAchieved("iron_pickaxe")) {
    ret += 1;
  }
  if (isAchieved("iron_pickaxe2")) {
    ret += 1;
  }
  if (isAchieved("iron_pickaxe4")) {
    ret += 1;
  }
  return ret;
};
