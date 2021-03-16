import { getGlobal, setGlobal } from "reactn";
import { TAchievementID } from "../all_ids";
import { addSnack } from "../MySnack";
import { all_achievements } from "./all_achievements";

export const checkAchievements = (): void => {
  const g = getGlobal();
  const newObj = { ...g.achieved };
  let numAchieved = 0;
  let numGotPermanent = 0;
  let isChanged = false;
  all_achievements.forEach((a) => {
    if (!(a.id in g.achieved)) {
      if (a.toGet(g)) {
        newObj[a.id as TAchievementID] = true;
        addSnack("New achievement: " + a.forHuman ?? a.id);
        lastAchieved.push(a.id);
        numAchieved++;
        isChanged = true;
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
  if (isChanged) {
    setGlobal({
      achieved: newObj,
      records: { ...g.records, numAchieved, numGotPermanent },
    });
    checkAchievements();
  }
};

//-- for test
let lastAchieved: TAchievementID[] = [];
export const getLastAchieved = () => lastAchieved;
export const resetLastAchieved = () => {
  lastAchieved = [];
};
//--
