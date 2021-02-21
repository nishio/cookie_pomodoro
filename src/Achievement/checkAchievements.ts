import { getGlobal, setGlobal } from "reactn";
import { all_achievements, TAchivementID } from "./all_achievements";

export const checkAchievements = () => {
  const g = getGlobal();
  all_achievements.forEach((a) => {
    if (!(a.id in g.achieved)) {
      if (a.toGet(g)) {
        const newObj = { ...g.achieved };
        newObj[a.id as TAchivementID] = true;
        setGlobal({ achieved: newObj });
      }
    }
  });
};
