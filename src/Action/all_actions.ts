import { burn_coal } from "./burn_coal";
import { click } from "./click";
import { TAction } from "./Actions";
import { no_hunger } from "./no_hunger";
import { breakData } from "./breakData";
import { softReset } from "./softReset";
import { create_forest } from "./create_forest";
import { updateGlobal } from "../utils/updateGlobal";

export const all_actions: TAction[] = [
  click,
  burn_coal,
  no_hunger,
  create_forest,
  {
    id: "create_apple_tree",
    forHuman: "Create Apple Tree",
    description: "-1 Green Mana, -60 Mana, create Apple Tree",
    toShow: (g) => g.resources.green_mana >= 1 && g.resources.mana >= 60,

    onClick: () => {
      updateGlobal((g) => {
        g.converters.apple_tree += 1;
        g.resources.green_mana -= 1;
        g.resources.mana -= 60;
        g.records.used_mana += 61;
      });
    },
  },
  {
    id: "create_grape_tree",
    forHuman: "Create Grape Tree",
    description: "-2 Green Mana, -30 Mana, create Grape Tree",
    toShow: (g) => (g.resources.green_mana ?? 0) >= 2 && g.resources.mana >= 30,

    onClick: () => {
      updateGlobal((g) => {
        g.converters.grape_tree += 1;
        g.resources.green_mana -= 2;
        g.resources.mana -= 30;
        g.records.used_mana += 32;
      });
    },
  },
  {
    id: "rain",
    forHuman: "Rain",
    description: "-20 Mana. Instantly create Green Mana (+= #Forest)",
    toShow: (g) => g.resources.mana >= 20,

    onClick: () => {
      updateGlobal((g) => {
        g.resources.green_mana += g.converters.forest;
        g.resources.mana -= 20;
        g.records.used_mana += 20;
      });
    },
  },
  breakData,
  softReset,
];
