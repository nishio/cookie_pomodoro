import { State } from "reactn/default";
import { TAchievementID } from "../all_ids";

export type TAchievement = {
  id: TAchievementID;
  forHuman?: string;
  description?: string;
  toShow: (g: State) => boolean;
  toGet: (g: State) => boolean;
  getProgress?: (g: State) => TProgress;
  isPermanent: boolean;
};
type TProgress = { goal: number; current: number };
