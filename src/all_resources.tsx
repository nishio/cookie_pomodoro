import { State } from "reactn/default";
import { ALWAYS } from "./ALWAYS";

export const all_resources: Resource[] = [
  {
    id: "pomodoro",
    toShow: ALWAYS,
  },
  {
    id: "cookie",
    toShow: ALWAYS,
  },
];
type Resource = {
  id: string;
  forHuman?: string;
  toShow: (g: State) => boolean;
};