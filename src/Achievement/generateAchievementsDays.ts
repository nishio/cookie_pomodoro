import { all_achievements, TAchievement } from "./all_achievements";
import { after } from "./after";
import { fibonacci } from "./fibonacci";

export const generateAchievementsDays = () => {
  let prev = 2;
  fibonacci(2, 3, 10).forEach((n) => {
    all_achievements.push(makeDays(n, prev));
    prev = n;
  });
};
export const makeDays = (n: number, prev: number): TAchievement => {
  return {
    id: `day${n}`,
    forHuman: `Day ${n}`,
    toShow: after(`day${prev}`),
    toGet: (g) => g.records.days >= n,
    getProgress: (g) => {
      return { goal: n, current: g.records.days };
    },
  };
};
