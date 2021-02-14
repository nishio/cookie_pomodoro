import { State } from "reactn/default";
import { ALWAYS } from "./ALWAYS";

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
    toShow: (g) => g.resources.pomodoro >= 1,
    toGet: (g) => g.resources.pomodoro >= 2,
  },
  {
    id: "pomodoro4",
    toShow: (g) => g.resources.pomodoro >= 2,
    toGet: (g) => g.resources.pomodoro >= 4,
  },
];
