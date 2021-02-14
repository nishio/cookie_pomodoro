import { State } from "reactn/default";
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
];

type TGetPrice = (g: State, amount: number) => [number, string][];
type TConverter = {
  id: string;
  forHuman?: string;
  from: string;
  to: string;
  fromAmount: number;
  toAmount: number;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
};
