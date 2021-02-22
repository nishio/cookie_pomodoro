import { getGlobal } from "reactn";
import { TAchievementID } from "../all_ids";

export const isAchieved = (id: TAchievementID): boolean => {
  if (id in getGlobal().achieved) {
    return true;
  }
  return false;
};
