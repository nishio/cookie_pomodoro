import { State } from "reactn/default";
import { ALWAYS, HIDDEN } from "../ALWAYS";

type TAchievement = {
  id: string;
  forHuman?: string;
  description?: string;
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
    description: "Have 2 pomodoro",
    toShow: (g) => "pomodoro1" in g.achieved,
    toGet: (g) => g.resources.pomodoro >= 2,
  },
  {
    id: "pomodoro4",
    forHuman: "Got Four Pomodoro",
    toShow: (g) => "pomodoro2" in g.achieved,
    toGet: (g) => g.records.gotPomodoro >= 4,
  },
  {
    id: "has_pomodoro4",
    forHuman: "Have 4 Pomodoro",
    description: "patient kids get more cookie (+1)",
    toShow: HIDDEN,
    toGet: (g) => g.resources.pomodoro >= 4,
  },
  {
    id: "cookie1",
    forHuman: "First Cookie",
    toShow: ALWAYS,
    toGet: (g) => g.resources.cookie >= 1,
  },
  {
    id: "coal",
    forHuman: "First Coal",
    toShow: ALWAYS,
    toGet: (g) => g.resources.coal >= 1,
  },
];
