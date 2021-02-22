import { getGlobal } from "reactn";
import { TAchivementID } from "../Achievement/all_achievements";

export const isAchieved = (id: TAchivementID): boolean => {
  if (id in getGlobal().achieved) {
    return true;
  }
  return false;
};
