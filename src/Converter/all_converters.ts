/**
 * Converter: converts one resource into another resource
 * It can use once per pomodoro.
 */

import { State } from "reactn/default";
import { TConverterID, TResourceID } from "../all_ids";
import { ALWAYS } from "../utils/ALWAYS";
import { addMiningProduction } from "./addMiningProduction";
import { grandma } from "./grandma";
import { hasConverter } from "./hasConverter";
import { hasAchieved } from "../Resource/hasAchieved";
import { fibonacci } from "../Achievement/fibonacci";

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
        toShow: hasAchieved("iron_pickaxe"),
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
        toShow: hasAchieved("steel"),
      },
    ],
  },
  {
    id: "forest",
    forHuman: "Forest",
    toShow: hasConverter("forest"),
    getPrice: (g, amount) => {
      return [[nth_fibonacci(amount), "green_mana"]];
    },
    recipes: [
      {
        from: [],
        to: [["green_mana", 1]],
        modifier: NoMod,
        toShow: ALWAYS,
      },
      {
        from: [],
        to: [["lumber", 1]],
        modifier: NoMod,
        toShow: hasConverter("forest"),
      },
    ],
  },
  {
    id: "apple_tree",
    forHuman: "Apple Tree",
    toShow: hasConverter("apple_tree"),
    getPrice: (g, amount) => {
      return [[nth_fibonacci(amount), "apple"]];
    },
    recipes: [
      {
        from: [],
        to: [["apple", 1]],
        modifier: NoMod,
        toShow: ALWAYS,
      },
    ],
  },
  {
    id: "newton",
    forHuman: "Newton",
    toShow: hasConverter("apple_tree"),
    getPrice: (g, amount) => {
      return [[nth_fibonacci(amount), "apple"]];
    },
    recipes: [
      {
        from: [
          ["cookie", 5],
          ["apple", 1],
        ],
        to: [["science", 1]],
        modifier: NoMod,
        toShow: ALWAYS,
      },
    ],
  },
  {
    id: "grape_tree",
    forHuman: "Grape Tree",
    toShow: hasConverter("grape_tree"),
    getPrice: (g, amount) => {
      return [[nth_fibonacci(amount), "grape"]];
    },
    recipes: [
      {
        from: [],
        to: [["grape", 1]],
        modifier: NoMod,
        toShow: ALWAYS,
      },
    ],
  },
  {
    id: "plain",
    forHuman: "Plain",
    toShow: hasConverter("plain"),
    getPrice: (g, amount) => {
      return [[10000, "green_mana"]];
    },
    recipes: [
      {
        from: [],
        to: [["wheat", 1]],
        modifier: NoMod,
        toShow: ALWAYS,
      },
    ],
  },
];
const nth_fibonacci = (n: number, prev = 0, start = 1) => {
  return fibonacci(prev, start, n + 1)[n];
};
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
