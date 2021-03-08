import { burn_coal } from "./burn_coal";
import { click } from "./click";
import { TAction } from "./Actions";
import { no_hunger } from "./no_hunger";
import { breakData } from "./breakData";
import { softReset } from "./softReset";
import { State } from "reactn/default";
import { setGlobal } from "reactn";
import { create_forest } from "./create_forest";

export const all_actions: TAction[] = [
  click,
  burn_coal,
  no_hunger,
  create_forest,
  {
    id: "create_apple_tree",
    forHuman: "Create Apple Tree",
    description: "-1 Green Mana, -60 Mana, create Apple Tree",
    toShow: (g) => g.resources.green_mana >= 1 || g.resources.mana >= 60,

    onClick: () => {
      setGlobal((g: State) => {
        return {
          ...g,
          converter: {
            ...g.converters,
            apple_tree: (g.converters.apple_tree ?? 0) + 1,
          },
          resources: {
            ...g.resources,
            green_mana: (g.resources.green_mana ?? 0) - 1,
            mana: g.resources.mana - 60,
          },
        };
      });
    },
  },
  breakData,
  softReset,
];
