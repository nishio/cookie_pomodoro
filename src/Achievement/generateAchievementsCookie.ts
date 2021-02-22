import { after } from "./after";
import { fibonacci } from "./fibonacci";
import { all_achievements } from "./all_achievements";
import { TAchievement } from "./TAchievement";
import { TAchievementID } from "../all_ids";

export const generateAchievementsCookie = () => {
  let prev = 1;
  fibonacci(prev, prev + 1, 15).forEach((n) => {
    all_achievements.push(makeCookie(n, prev));
    prev = n;
  });
};
const makeCookie = (n: number, prev: number): TAchievement => {
  return {
    id: `cookie${n}` as TAchievementID,
    forHuman: `Have ${n} Cookie`,
    toShow: after(`cookie${prev}` as TAchievementID),
    toGet: (g) => g.resources.cookie >= n,
    getProgress: (g) => {
      return { goal: n, current: g.resources.cookie };
    },
  };
};
