import { State } from "reactn/default";
import { TResourceID } from "./all_resources";

export const hasResource = (id: TResourceID) => {
  return (g: State) => {
    console.log(id, g.resources[id] >= 1, g);
    return g.resources[id] >= 1;
  };
};
