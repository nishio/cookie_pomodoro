import { ALWAYS, HIDDEN } from "../ALWAYS";
import { hasResource } from "../Resource/hasResource";
import { after } from "./after";
import { dontHaveConverter } from "./dontHaveConverter";
import { generateAchievementsCookie } from "./generateAchievementsCookie";
import { generateAchievementsDays } from "./generateAchievementsDays";
import { generateAchievementsPomodoro } from "./generateAchievementsPomodoro";
import { numAchieved } from "./numAchieved";
import { TAchievement } from "./TAchievement";

export const all_achievements: TAchievement[] = [
  {
    id: "pomodoro1",
    forHuman: "First Pomodoro",
    toShow: ALWAYS,
    toGet: (g) => g.resources.pomodoro >= 1,
    isPermanent: false,
  },
  {
    id: "pomodoro2",
    forHuman: "Two Pomodoro",
    description: "Have 2 pomodoro",
    toShow: after("pomodoro1"),
    toGet: (g) => g.resources.pomodoro >= 2,
    isPermanent: false,
  },
  {
    id: "pomodoro4",
    forHuman: "Got Four Pomodoro",
    toShow: after("pomodoro2"),
    toGet: (g) => g.records.gotPomodoro >= 4,
    isPermanent: false,
  },
  {
    id: "has_pomodoro4",
    forHuman: "Have 4 Pomodoro",
    description: "patient kids get more cookie (+1)",
    toShow: HIDDEN,
    toGet: (g) => g.resources.pomodoro >= 4,
    isPermanent: false,
  },
  {
    id: "idle_assets",
    forHuman: "Idle assets",
    description: "Have 8 Pomodoro",
    toShow: HIDDEN,
    toGet: (g) => g.resources.pomodoro >= 8,
    isPermanent: true,
  },
  {
    id: "cookie1",
    forHuman: "First Cookie",
    toShow: ALWAYS,
    toGet: (g) => g.resources.cookie >= 1,
    isPermanent: false,
  },
  {
    id: "coal",
    forHuman: "First Coal",
    toShow: ALWAYS,
    toGet: (g) => g.resources.coal >= 1,
    isPermanent: false,
  },
  {
    id: "iron",
    forHuman: "First Iron Ore",
    toShow: after("coal"),
    toGet: (g) => g.resources.iron_ore >= 1,
    isPermanent: false,
  },

  {
    id: "iron_ingot",
    forHuman: "First Iron Ingot",
    toShow: after("iron"),
    toGet: (g) => g.resources.iron_ingot >= 1,
    isPermanent: false,
  },

  {
    id: "iron_pickaxe",
    forHuman: "First Iron Pickaxe",
    description: "increase production of mining (+1)",
    toShow: ALWAYS,
    toGet: (g) => g.resources.iron_pickaxe >= 1,
    isPermanent: false,
  },

  {
    id: "iron_pickaxe2",
    forHuman: "More Iron Pickaxe",
    description: "increase production of mining (+1)",
    toShow: after("iron_pickaxe"),
    toGet: (g) => g.resources.iron_pickaxe >= 2,
    isPermanent: false,
  },
  {
    id: "iron_pickaxe4",
    forHuman: "Enough Iron Pickaxe",
    description: "increase production of mining (+1)",
    toShow: after("iron_pickaxe2"),
    toGet: (g) => g.resources.iron_pickaxe >= 4,
    isPermanent: false,
  },
  {
    id: "mana",
    forHuman: "Found Mana Spring",
    description: "generate Mana depends on the number of achievements",
    toShow: HIDDEN,
    toGet: (g) => numAchieved(g) >= 7,
    isPermanent: false,
  },
  {
    id: "mana100",
    forHuman: "100 Mana",
    toShow: ALWAYS,
    toGet: (g) => g.resources.mana >= 100,
    getProgress: (g) => ({ goal: 100, current: g.resources.mana }),
    isPermanent: false,
  },

  {
    id: "three_grandma",
    forHuman: "Three Grandma",
    description: "too many grandma! (Cookie +1)",
    toShow: HIDDEN,
    toGet: (g) => g.converters.grandma >= 3 && g.records.gotPomodoro <= 12,
    isPermanent: true,
  },

  {
    id: "no_mine",
    forHuman: "No Mine",
    description: "magic power hates minerals (Mana *2)",
    toShow: HIDDEN,
    toGet: (g) => numAchieved(g) >= 7 && dontHaveConverter("coal_mine", g),
    isPermanent: true,
  },
  {
    id: "day2",
    forHuman: "Day 2",
    toShow: ALWAYS,
    toGet: (g) => g.records.days >= 2,
    getProgress: (g) => {
      return { goal: 2, current: g.records.days };
    },
    isPermanent: true,
  },

  {
    id: "steel_pickaxe",
    forHuman: "First Steel Pickaxe",
    description: "increase production of mining (+1)",
    toShow: hasResource("iron_pickaxe"),
    toGet: (g) => g.resources.steel_pickaxe >= 1,
    isPermanent: false,
  },

  {
    id: "steel_pickaxe2",
    forHuman: "More Steel Pickaxe",
    description: "increase production of mining (+1)",
    toShow: after("steel_pickaxe"),
    toGet: (g) => g.resources.steel_pickaxe >= 2,
    isPermanent: false,
  },
  {
    id: "steel_pickaxe4",
    forHuman: "Enough Steel Pickaxe",
    description: "increase production of mining (+1)",
    toShow: after("steel_pickaxe2"),
    toGet: (g) => g.resources.steel_pickaxe >= 4,
    isPermanent: false,
  },
];

generateAchievementsDays();
generateAchievementsPomodoro();
generateAchievementsCookie();
