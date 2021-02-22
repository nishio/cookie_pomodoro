/**
 * Converter: converts one resource into another resource
 * It can use once per pomodoro.
 */

import { State } from "reactn/default";
import { TConverterID, TResourceID } from "../all_ids";
import { ALWAYS } from "../ALWAYS";
import { addMiningProduction } from "./addMiningProduction";
import { grandma } from "./grandma";
import { hasConverter } from "./hasConverter";

export const all_converters: TConverter[] = [
  grandma,
  {
    id: "coal_mine",
    forHuman: "Coal Mine",
    froms: [["cookie", 5]],
    to: "coal",
    toAmount: 1,
    addToAmount: addMiningProduction,
    toShow: ALWAYS,
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
  },
  {
    id: "iron_mine",
    forHuman: "Iron Mine",
    froms: [["cookie", 5]],
    to: "iron_ore",
    toAmount: 1,
    addToAmount: addMiningProduction,
    toShow: hasConverter("coal_mine"),
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
  },
  {
    id: "furnace_for_iron",
    forHuman: "Furnace for Iron",
    to: "iron_ingot",
    froms: [
      ["coal", 1],
      ["iron_ore", 1],
    ],
    toAmount: 1,
    toShow: hasConverter("iron_mine"),
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
  },
  {
    id: "workbench_for_iron_pickaxe",
    forHuman: "Workbench for Iron Pickaxe",
    to: "iron_pickaxe",
    froms: [["iron_ingot", 1]],
    toAmount: 1,
    toShow: hasConverter("furnace_for_iron"),
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
  },
];

export type TGetPrice = (g: State, amount: number) => [number, TResourceID][];
export type TCosts = [TResourceID, number][];

export type TConverter = {
  id: TConverterID;
  forHuman?: string;
  froms: TCosts;
  decreaseCost?: (g: State) => TCosts;
  to: TResourceID;
  toAmount: number;
  addToAmount?: (g: State) => number;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
};
