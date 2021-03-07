/**
 * Converter: converts one resource into another resource
 * It can use once per pomodoro.
 */

import { State } from "reactn/default";
import { TConverterID, TResourceID } from "../all_ids";
import { ALWAYS } from "../utils/ALWAYS";
import { hasResource } from "../Resource/hasResource";
import { addMiningProduction } from "./addMiningProduction";
import { grandma } from "./grandma";
import { hasConverter } from "./hasConverter";
import { isAchieved } from "./isAchieved";

const NoMod = () => {
  return {};
};

export const all_converters: TConverter[] = [
  grandma,
  {
    id: "coal_mine",
    forHuman: "Coal Mine",
    toShow: ALWAYS,
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
    recipes: [
      {
        from: [["cookie", 5]],
        to: [["coal", 1]],
        modifier: addMiningProduction,
        toShow: ALWAYS,
      },
    ],
  },
  {
    id: "iron_mine",
    forHuman: "Iron Mine",
    toShow: hasConverter("coal_mine"),
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
    recipes: [
      {
        from: [["cookie", 5]],
        to: [["iron_ore", 1]],
        modifier: addMiningProduction,
        toShow: ALWAYS,
      },
    ],
  },
  {
    id: "furnace",
    forHuman: "Furnace",
    toShow: hasConverter("iron_mine"),
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
    recipes: [
      {
        from: [
          ["coal", 1],
          ["iron_ore", 1],
        ],
        to: [["iron_ingot", 1]],
        modifier: NoMod,
        toShow: ALWAYS,
      },
      {
        from: [
          ["iron_ingot", 2],
          ["coal", 2],
        ],
        to: [["steel", 1]],
        modifier: NoMod,
        toShow: () => isAchieved("iron_pickaxe"),
      },
    ],
  },
  {
    id: "workbench",
    forHuman: "Workbench",
    toShow: hasConverter("furnace"),
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
    recipes: [
      {
        from: [["iron_ingot", 1]],
        to: [["iron_pickaxe", 1]],
        modifier: NoMod,
        toShow: ALWAYS,
      },
      {
        from: [
          ["steel", 1],
          ["iron_pickaxe", 2],
        ],
        to: [["steel_pickaxe", 1]],
        modifier: NoMod,
        toShow: hasResource("steel"),
      },
    ],
  },
];

export type TGetPrice = (g: State, amount: number) => [number, TResourceID][];
export type TCosts = [TResourceID, number][];

export type TConverter = {
  id: TConverterID;
  forHuman?: string;
  // froms: TCosts;
  // decreaseCost?: (g: State) => TCosts;
  // to: TResourceID;
  // toAmount: number;
  // addToAmount?: (g: State) => number;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
  recipes?: TRecipe[];
};

export type TRecipe = {
  from: [TResourceID, number][];
  to: [TResourceID, number][];
  modifier: TModifier;
  toShow: (g: State) => boolean;
};
export type TModifier = () => Partial<{ [key in TResourceID]: number }>;
