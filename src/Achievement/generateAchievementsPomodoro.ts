import { all_achievements } from "./all_achievements";
import { TAchievement } from "./TAchievement";
import { after } from "./after";
import { fibonacci } from "../utils/fibonacci";
import { TAchievementID } from "../all_ids";
export const generateAchievementsPomodoro = () => {
  let prev = 4;
  fibonacci(prev, prev + 1, 15).forEach((n) => {
    all_achievements.push(makePomodoro(n, prev));
    prev = n;
  });
};
const makePomodoro = (n: number, prev: number): TAchievement => {
  return {
    id: `pomodoro${n}` as TAchievementID,
    forHuman: `Got ${n} Pomodoro`,
    toShow: after(`pomodoro${prev}` as TAchievementID),
    toGet: (g) => (g.records.gotPomodoro ?? 0) >= n,
    getProgress: (g) => {
      return { goal: n, current: g.records.gotPomodoro };
    },
    isPermanent: true,
  };
};
