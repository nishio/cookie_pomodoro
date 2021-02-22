import { all_achievements, TAchievement } from "./all_achievements";
import { after } from "./after";

export const generateAchievementsPomodoro = () => {
  let prev = 4;
  [8, 16, 32, 64, 128, 256, 512, 1024].forEach((n) => {
    all_achievements.push(makePomodoro(n, prev));
    prev = n;
  });
};
const makePomodoro = (n: number, prev: number): TAchievement => {
  return {
    id: `pomodoro${n}`,
    forHuman: `Got ${n} Pomodoro`,
    toShow: after(`pomodoro${prev}`),
    toGet: (g) => g.records.gotPomodoro >= n,
  };
};
