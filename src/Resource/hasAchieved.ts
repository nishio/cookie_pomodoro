import { State } from "reactn/default";
import { TAchievementID } from "../all_ids";

export const hasAchieved = (id: TAchievementID) => {
  return (g: State) => {
    if (id in g.achieved) {
      return true;
    }
    return false;
  };
};
