import { State } from "reactn/default";
import { TConverterID, TResourceID } from "../all_ids";
import { ALWAYS } from "../ALWAYS";
import { grandma } from "./grandma";

export const all_converters: TConverter[] = [
  grandma,
  {
    id: "coal_mine",
    forHuman: "Coal Mine",
    from: "cookie",
    to: "coal",
    fromAmount: 5,
    toAmount: 1,
    toShow: ALWAYS,
    getPrice: (g, amount) => {
      return [[1 + amount, "cookie"]];
    },
  },
  {
    id: "iron_mine",
    forHuman: "Iron Mine",
    from: "cookie",
    to: "iron_ore",
    fromAmount: 5,
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
  from: TResourceID;
  to: TResourceID;
  fromAmount: number;
  toAmount: number;
  addToAmount?: (g: State) => number;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
};
