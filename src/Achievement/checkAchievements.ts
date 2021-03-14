import { getGlobal, setGlobal } from "reactn";
import { TAchievementID } from "../all_ids";
import { addSnack } from "../MySnack";
import { all_achievements } from "./all_achievements";

export const checkAchievements = (): void => {
  const g = getGlobal();
  const newObj = { ...g.achieved };
  let numAchieved = 0;
  let numGotPermanent = 0;
  all_achievements.forEach((a) => {
    if (!(a.id in g.achieved)) {
      if (a.toGet(g)) {
        newObj[a.id as TAchievementID] = true;
        addSnack("New achievement: " + a.forHuman ?? a.id);
        lastAchieved.push(a.id);
        numAchieved++;
      }
    } else {
      numAchieved++;
    }
  });

  all_achievements.forEach((a) => {
    if (a.isPermanent) {
      if (a.id in newObj) {
        numGotPermanent += 1;
      }
    }
  });
  setGlobal({
    achieved: newObj,
    records: { ...g.records, numAchieved, numGotPermanent },
  });
};

//-- for test
let lastAchieved: TAchievementID[] = [];
export const getLastAchieved = () => lastAchieved;
export const resetLastAchieved = () => {
  lastAchieved = [];
};
//--
