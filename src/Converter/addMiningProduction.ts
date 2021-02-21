import { State } from "reactn/default";

export const addMiningProduction = (g: State) => {
  let ret = 0;
  if ("iron_pickaxe" in g.achieved) {
    ret += 1;
  }
  if ("iron_pickaxe2" in g.achieved) {
    ret += 1;
  }
  if ("iron_pickaxe3" in g.achieved) {
    ret += 1;
  }
  return ret;
};
