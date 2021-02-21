import { ALWAYS } from "../ALWAYS";
import { TConverter } from "./all_converters";

export const grandma: TConverter = {
  id: "grandma",
  forHuman: "Grandma",
  froms: [["pomodoro", 1]],
  to: "cookie",
  toAmount: 2,
  addToAmount: (g) => {
    let ret = 0;
    g.temporaryEffects.forEach((e) => {
      if (e.id === "burn_coal") {
        ret += 4;
      }
    });
    if ("has_pomodoro4" in g.achieved) {
      ret += 1;
    }
    return ret;
  },
  toShow: ALWAYS,
  getPrice: (g, amount) => {
    return [[1 + amount, "pomodoro"]];
  },
};
