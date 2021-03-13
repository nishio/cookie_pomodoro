import { TAction } from "./Actions";
import { updateGlobal } from "../utils/updateGlobal";

export const create_forest: TAction = {
  id: "create_forest",
  forHuman: "Create Forest",
  description: "-80 Mana. Create Forest",
  toShow: (g) => g.resources.mana >= 80,

  onClick: () => {
    updateGlobal((g) => {
      g.converters.forest += 1;
      g.resources.mana -= 80;
      g.records.used_mana += 80;
    });
  },
};
