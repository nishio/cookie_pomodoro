import { after } from "./after";
import { TAchievement } from "./TAchievement";
import { fibonacci } from "./fibonacci";
import { TAchievementID } from "../all_ids";
import { all_achievements } from "./all_achievements";

export const generateAchievementsSteel = () => {
  let prev = 2;
  fibonacci(prev, prev + 1, 15).forEach((n) => {
    all_achievements.push(makeSteel(n, prev));
    prev = n;
  });
};
const makeSteel = (n: number, prev: number): TAchievement => {
  return {
    id: `steel${n}` as TAchievementID,
    forHuman: `Have ${n} Steel`,
    toShow: after(`steel${prev}` as TAchievementID),
    toGet: (g) => g.resources.steel >= n,
    getProgress: (g) => {
      return { goal: n, current: g.resources.steel };
    },
    isPermanent: false,
  };
};
