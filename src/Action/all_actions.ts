import { burn_coal } from "./burn_coal";
import { click } from "./click";
import { TAction } from "./Actions";
import { no_hunger } from "./no_hunger";
import { breakData } from "./breakData";
import { softReset } from "./softReset";
import { State } from "reactn/default";
import { setGlobal } from "reactn";
import { create_forest } from "./create_forest";
import produce from "immer";

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
      setGlobal((g: State) => {
        const newState = produce(g, (g) => {
          g.converters.apple_tree += 1;
          g.resources.green_mana -= 1;
          g.resources.mana -= 60;
          g.records.used_mana += 61;
        });
        return newState;
      });
    },
  },
  {
    id: "create_grape_tree",
    forHuman: "Create Grape Tree",
    description: "-2 Green Mana, -30 Mana, create Grape Tree",
    toShow: (g) => (g.resources.green_mana ?? 0) >= 2 && g.resources.mana >= 30,

    onClick: () => {
      setGlobal((g: State) => {
        return {
          ...g,
          converters: {
            ...g.converters,
            grape_tree: (g.converters.grape_tree ?? 0) + 1,
          },
          resources: {
            ...g.resources,
            green_mana: (g.resources.green_mana ?? 0) - 2,
            mana: g.resources.mana - 30,
          },
        };
      });
    },
  },
  {
    id: "rain",
    forHuman: "Rain",
    description: "-20 Mana. Instantly create Green Mana (+= #Forest)",
    toShow: (g) => g.resources.mana >= 20,

    onClick: () => {
      setGlobal((g: State) => {
        return {
          ...g,
          resources: {
            ...g.resources,
            green_mana:
              (g.resources.green_mana ?? 0) + (g.converters.forest ?? 0),
            mana: g.resources.mana - 20,
          },
        };
      });
    },
  },
  breakData,
  softReset,
];
