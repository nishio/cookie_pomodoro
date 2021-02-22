import { getGlobal, setGlobal } from "reactn";
import { all_achievements, TAchievementID } from "./all_achievements";

export const checkAchievements = (): Promise<unknown> => {
  const g = getGlobal();
  const newObj = { ...g.achieved };

  all_achievements.forEach((a) => {
    if (!(a.id in g.achieved)) {
      if (a.toGet(g)) {
        newObj[a.id as TAchievementID] = true;
      }
    }
  });
  return setGlobal({ achieved: newObj });
};
