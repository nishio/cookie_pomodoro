import { State } from "reactn/default";
import { ALWAYS, HIDDEN } from "./ALWAYS";

type TAchievement = {
  id: string;
  forHuman?: string;
  toShow: (g: State) => boolean;
  toGet: (g: State) => boolean;
};

export const all_achievements: TAchievement[] = [
  {
    id: "pomodoro1",
    forHuman: "First Pomodoro",
    toShow: ALWAYS,
    toGet: (g) => g.resources.pomodoro >= 1,
  },
  {
    id: "pomodoro2",
    forHuman: "Two Pomodoro",
    toShow: (g) => "pomodoro1" in g.achieved,
    toGet: (g) => g.resources.pomodoro >= 2,
  },
  {
    id: "pomodoro4",
    forHuman: "Four Pomodoro",
    toShow: (g) => "pomodoro2" in g.achieved,
    toGet: (g) => g.resources.pomodoro >= 4,
  },
  {
    id: "cookie1",
    forHuman: "First Cookie",
    toShow: ALWAYS,
    toGet: (g) => g.resources.cookie >= 1,
  },
];
