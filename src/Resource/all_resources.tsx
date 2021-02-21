import { State } from "reactn/default";
import { ALWAYS } from "../ALWAYS";

export const all_resources: Resource[] = [
  {
    id: "pomodoro",
    forHuman: "Pomodoro",
    toShow: ALWAYS,
  },
  {
    id: "cookie",
    forHuman: "Cookie",
    toShow: ALWAYS,
  },
  {
    id: "coal",
    forHuman: "Coal",
    toShow: (g) => g.converters.coal_mine >= 1,
  },
];
type Resource = {
  id: string;
  forHuman?: string;
  toShow: (g: State) => boolean;
};
