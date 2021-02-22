import { getGlobal } from "reactn";
import { TAchievementID } from "../Achievement/all_achievements";

export const isAchieved = (id: TAchievementID): boolean => {
  if (id in getGlobal().achieved) {
    return true;
  }
  return false;
};
