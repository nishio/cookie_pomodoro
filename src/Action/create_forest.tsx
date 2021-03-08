import { TAction } from "./Actions";
import { State } from "reactn/default";
import { setGlobal } from "reactn";
import { updateResource } from "../update";

export const create_forest: TAction = {
  id: "create_forest",
  forHuman: "Create Forest",
  description: "-80 Mana. Create Forest",
  toShow: (g) => g.resources.mana >= 80,

  onClick: () => {
    setGlobal((g: State) => {
      return {
        ...g,
        converter: { ...g.converters, forest: (g.converters.forest ?? 0) + 1 },
        ...updateResource(g, "mana", -80),
      };
    });
  },
};
