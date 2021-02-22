import { all_achievements, TAchievement } from "./all_achievements";
import { after } from "./after";
import { fibonacci } from "./fibonacci";
export const generateAchievementsPomodoro = () => {
  let prev = 4;
  fibonacci(prev, prev + 1, 15).forEach((n) => {
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
