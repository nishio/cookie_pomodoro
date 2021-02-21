import { State } from "reactn/default";
import { all_achievements } from "./all_achievements";

export const numAchieved = (g: State) => {
  let ret = 0;
  all_achievements.forEach((a) => {
    if (g.achieved[a.id]) {
      ret += 1;
    }
  });
  return ret;
};
