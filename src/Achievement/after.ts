import { State } from "reactn/default";
import { TAchievementID } from "../all_ids";

export const after = (id: TAchievementID) => {
  return (g: State) => id in g.achieved;
};
