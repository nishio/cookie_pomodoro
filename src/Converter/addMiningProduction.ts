import { isAchieved } from "./isAchieved";

export const addMiningProduction = () => {
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
  if (isAchieved("steel_pickaxe")) {
    ret += 1;
  }
  if (isAchieved("steel_pickaxe2")) {
    ret += 1;
  }
  if (isAchieved("steel_pickaxe4")) {
    ret += 1;
  }
  return { coal: ret, iron_ore: ret };
};
