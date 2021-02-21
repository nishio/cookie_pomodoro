import { State } from "reactn/default";
import { TConverterID, TResourceID } from "../all_ids";
import { ALWAYS } from "../ALWAYS";
import { grandma } from "./grandma";

export const all_converters: TConverter[] = [
  grandma,
  {
    id: "coal_mine",
    forHuman: "Coal Mine",
    froms: [["cookie", 5]],
    to: "coal",
    toAmount: 1,
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
    toShow: (g) => {
      return g.converters.coal_mine >= 1;
    },
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
    toShow: (g) => {
      return g.converters.coal_mine >= 1;
    },
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
  },
];

type TGetPrice = (g: State, amount: number) => [number, TResourceID][];
export type TConverter = {
  id: TConverterID;
  forHuman?: string;
  froms: [TResourceID, number][];
  to: TResourceID;
  toAmount: number;
  addToAmount?: (g: State) => number;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
};
