/**
 * Converter: converts some resources into another resource
 * It can use once per pomodoro.
 */

import { State } from "reactn/default";
import { TConverterID, TResourceID } from "../all_ids";
import { ALWAYS } from "../utils/ALWAYS";
import { addMiningProduction } from "./addMiningProduction";
import { grandma } from "./grandma";
import { hasConverter } from "./hasConverter";
import { hasAchieved } from "../Resource/hasAchieved";
import { nth_fibonacci } from "../utils/nth_fibonacci";

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
      return [["cookie", 1 + amount]];
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
      return [["cookie", 1 + amount]];
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
      return [["cookie", 1 + amount]];
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
      return [["cookie", 1 + amount]];
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
      return [["green_mana", nth_fibonacci(amount)]];
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
      return [["apple", nth_fibonacci(amount)]];
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
      return [["apple", nth_fibonacci(amount)]];
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
      return [["grape", nth_fibonacci(amount)]];
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
      return [];
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
  {
    id: "human",
    forHuman: "Human",
    toShow: hasConverter("human"),
    getPrice: (g, amount) => {
      if (hasAchieved("eve")) {
        return [
          ["bread", 1],
          ["wine", 1],
          ["apple", 1],
        ];
      }
      return [];
    },
    recipes: grandma.recipes,
  },
];
export type TCosts = [TResourceID, number][];
export type TGetPrice = (g: State, amount: number) => TCosts;

export type TConverter = {
  id: TConverterID;
  forHuman?: string;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
  recipes?: TRecipe[];
};

export type TRecipe = {
  from: [TResourceID, number][];
  to: [TResourceID, number][];
  modifier: TModifier;
  toShow: (g: State) => boolean;
  name?: string;
};
export type TModifier = () => Partial<{ [key in TResourceID]: number }>;
