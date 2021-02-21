import { getGlobal, setGlobal } from "reactn";
import { all_achievements, TAchivementID } from "./all_achievements";

export const checkAchievements = (): Promise<unknown> => {
  const g = getGlobal();
  const newObj = { ...g.achieved };

  all_achievements.forEach((a) => {
    if (!(a.id in g.achieved)) {
      if (a.toGet(g)) {
        newObj[a.id as TAchivementID] = true;
      }
    }
  });
  return setGlobal({ achieved: newObj });
};
