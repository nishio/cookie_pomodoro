export const all_achievements = [
  {
    id: "pomodoro1",
    forHuman: "First Pomodoro",
    toShow: (g: any) => true,
    toGet: (g: any) => g.pomodoro >= 1,
  },
  {
    id: "pomodoro2",
    toShow: (g: any) => g.pomodoro >= 1,
    toGet: (g: any) => g.pomodoro >= 2,
  },
  {
    id: "pomodoro4",
    toShow: (g: any) => g.pomodoro >= 2,
    toGet: (g: any) => g.pomodoro >= 4,
  },
];
