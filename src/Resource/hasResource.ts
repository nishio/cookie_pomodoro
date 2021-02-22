import { State } from "reactn/default";
import { TResourceID } from "../all_ids";

export const hasResource = (id: TResourceID) => {
  return (g: State) => {
    return g.resources[id] >= 1;
  };
};
