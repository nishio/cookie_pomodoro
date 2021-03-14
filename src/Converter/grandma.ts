import { getGlobal } from "reactn";
import { ALWAYS } from "../utils/ALWAYS";
import { TConverter, TModifier } from "./all_converters";
import { hasConverter } from "./hasConverter";
import { isAchieved } from "./isAchieved";

const modifier: TModifier = () => {
  const g = getGlobal();
  let cookie = 0;
  let pomodoro = 0;
  let wine = 0;
  let bread = 0;

  g.temporaryEffects.forEach((e) => {
    if (e.id === "burn_coal") {
      cookie += 4;
    }
    if (e.id === "no_hunger") {
      pomodoro = -1;
    }
    if (e.id === "drink_wine") {
      wine += 1;
      bread += 1;
      cookie += 1;
    }
  });
  if (isAchieved("has_pomodoro4")) {
    cookie += 1;
  }
  if (isAchieved("three_grandma")) {
    cookie += 1;
  }
  if (isAchieved("sick")) {
    cookie -= Math.floor(g.records.pollution / 100);
  }

  return { cookie, pomodoro, wine, bread };
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
    {
      from: [["grape", 3]],
      to: [["wine", 1]],
      modifier,
      toShow: hasConverter("grape_tree"),
    },
    {
      from: [["wheat", 3]],
      to: [["bread", 1]],
      modifier,
      toShow: hasConverter("plain"),
    },
  ],
  toShow: ALWAYS,
  getPrice: (g, amount) => {
    return [["pomodoro", 1 + amount]];
  },
};
