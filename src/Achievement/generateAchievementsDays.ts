import { all_achievements, TAchievement } from "./all_achievements";
import { after } from "./after";

export const generateAchievementsDays = () => {
  let prev = 2;
  [4, 8, 16, 32, 64, 128, 256, 512, 1024].forEach((n) => {
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
