import { ALWAYS } from "../ALWAYS";
import { TConverter, TCosts } from "./all_converters";
import { isAchieved } from "./isAchieved";

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
    if (isAchieved("has_pomodoro4")) {
      ret += 1;
    }
    if (isAchieved("three_grandma")) {
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
