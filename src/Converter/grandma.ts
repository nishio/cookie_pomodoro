import { ALWAYS } from "../ALWAYS";
import { TConverter, TCosts } from "./all_converters";

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
    if ("three_grandma" in g.achieved) {
      ret += 1;
    }
    return ret;
  },
  decreaseCost: (g) => {
    let ret = [] as TCosts;
    g.temporaryEffects.forEach((e) => {
      if (e.id === "no_hunger") {
        ret = [["pomodoro", 1]];
      }
    });
    return ret;
  },
  toShow: ALWAYS,
  getPrice: (g, amount) => {
    return [[1 + amount, "pomodoro"]];
  },
};
