import { getGlobal } from "reactn";
import { ALWAYS } from "../ALWAYS";
import { TConverter, TModifier } from "./all_converters";
import { isAchieved } from "./isAchieved";

const modifier: TModifier = () => {
  const g = getGlobal();
  let cookie = 0;
  let pomodoro = 0;
  g.temporaryEffects.forEach((e) => {
    if (e.id === "burn_coal") {
      cookie += 4;
    }
    if (e.id === "no_hunger") {
      pomodoro = -1;
    }
  });
  if (isAchieved("has_pomodoro4")) {
    cookie += 1;
  }
  if (isAchieved("three_grandma")) {
    cookie += 1;
  }

  return { cookie, pomodoro };
};

export const grandma: TConverter = {
  id: "grandma",
  forHuman: "Grandma",
  recipes: [
    {
      from: [["pomodoro", 1]],
      to: [["cookie", 2]],
      modifier,
      toShow: ALWAYS,
    },
  ],
  toShow: ALWAYS,
  getPrice: (g, amount) => {
    return [[1 + amount, "pomodoro"]];
  },
};
