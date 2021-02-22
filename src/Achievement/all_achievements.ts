import { State } from "reactn/default";
import { TAchievementID } from "../all_ids";
import { ALWAYS, HIDDEN } from "../ALWAYS";
import { after } from "./after";
import { dontHaveConverter } from "./dontHaveConverter";
import { generateAchievementsCookie } from "./generateAchievementsCookie";
import { generateAchievementsDays } from "./generateAchievementsDays";
import { generateAchievementsPomodoro } from "./generateAchievementsPomodoro";
import { numAchieved } from "./numAchieved";

type TProgress = { goal: number; current: number };

export type TAchievement = {
  id: TAchievementID;
  forHuman?: string;
  description?: string;
  toShow: (g: State) => boolean;
  toGet: (g: State) => boolean;
  getProgress?: (g: State) => TProgress;
};

export const all_achievements: TAchievement[] = [
  {
    id: "pomodoro1",
    forHuman: "First Pomodoro",
    toShow: ALWAYS,
    toGet: (g) => g.resources.pomodoro >= 1,
  },
  {
    id: "pomodoro2",
    forHuman: "Two Pomodoro",
    description: "Have 2 pomodoro",
    toShow: after("pomodoro1"),
    toGet: (g) => g.resources.pomodoro >= 2,
  },
  {
    id: "pomodoro4",
    forHuman: "Got Four Pomodoro",
    toShow: after("pomodoro2"),
    toGet: (g) => g.records.gotPomodoro >= 4,
  },
  {
    id: "has_pomodoro4",
    forHuman: "Have 4 Pomodoro",
    description: "patient kids get more cookie (+1)",
    toShow: HIDDEN,
    toGet: (g) => g.resources.pomodoro >= 4,
  },
  {
    id: "idle_assets",
    forHuman: "Idle assets",
    description: "Have 8 Pomodoro",
    toShow: HIDDEN,
    toGet: (g) => g.resources.pomodoro >= 8,
  },
  {
    id: "cookie1",
    forHuman: "First Cookie",
    toShow: ALWAYS,
    toGet: (g) => g.resources.cookie >= 1,
  },
  {
    id: "coal",
    forHuman: "First Coal",
    toShow: ALWAYS,
    toGet: (g) => g.resources.coal >= 1,
  },
  {
    id: "iron",
    forHuman: "First Iron Ore",
    toShow: after("coal"),
    toGet: (g) => g.resources.iron_ore >= 1,
  },

  {
    id: "iron_ingot",
    forHuman: "First Iron Ingot",
    toShow: after("iron"),
    toGet: (g) => g.resources.iron_ingot >= 1,
  },

  {
    id: "iron_pickaxe",
    forHuman: "First Iron Pickaxe",
    description: "increase production of mining (+1)",
    toShow: ALWAYS,
    toGet: (g) => g.resources.iron_pickaxe >= 1,
  },

  {
    id: "iron_pickaxe2",
    forHuman: "More Iron Pickaxe",
    description: "increase production of mining (+1)",
    toShow: after("iron_pickaxe"),
    toGet: (g) => g.resources.iron_pickaxe >= 2,
  },
  {
    id: "iron_pickaxe4",
    forHuman: "Enough Iron Pickaxe",
    description: "increase production of mining (+1)",
    toShow: after("iron_pickaxe2"),
    toGet: (g) => g.resources.iron_pickaxe >= 4,
  },
  {
    id: "mana",
    forHuman: "Found Mana Spring",
    description: "generate Mana depends on the number of achievements",
    toShow: HIDDEN,
    toGet: (g) => numAchieved(g) >= 7,
  },
  {
    id: "mana100",
    forHuman: "100 Mana",
    toShow: ALWAYS,
    toGet: (g) => g.resources.mana >= 100,
    getProgress: (g) => ({ goal: 100, current: g.resources.mana }),
  },

  {
    id: "three_grandma",
    forHuman: "Three Grandma",
    description: "too many grandma! (Cookie +1)",
    toShow: HIDDEN,
    toGet: (g) => g.converters.grandma >= 3 && g.records.gotPomodoro <= 12,
  },

  {
    id: "no_mine",
    forHuman: "No Mine",
    description: "magic power hates minerals (Mana *2)",
    toShow: HIDDEN,
    toGet: (g) => numAchieved(g) >= 7 && dontHaveConverter("coal_mine", g),
  },
  {
    id: "day2",
    forHuman: "Day 2",
    toShow: ALWAYS,
    toGet: (g) => g.records.days >= 2,
    getProgress: (g) => {
      return { goal: 2, current: g.records.days };
    },
  },
];

generateAchievementsDays();
generateAchievementsPomodoro();
generateAchievementsCookie();
