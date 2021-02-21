import { State } from "reactn/default";
import { TConverterID, TResourceID } from "./all_ids";
import { ALWAYS } from "./ALWAYS";

export const all_converters: TConverter[] = [
  {
    id: "grandma",
    forHuman: "Grandma",
    from: "pomodoro",
    to: "cookie",
    fromAmount: 1,
    toAmount: 2,
    toShow: ALWAYS,
    getPrice: (g, amount) => {
      return [[1 + amount, "pomodoro"]];
    },
  },
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
];

type TGetPrice = (g: State, amount: number) => [number, TResourceID][];
export type TConverter = {
  id: TConverterID;
  forHuman?: string;
  from: TResourceID;
  to: TResourceID;
  fromAmount: number;
  toAmount: number;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
};
