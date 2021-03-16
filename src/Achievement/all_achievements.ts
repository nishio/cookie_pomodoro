/**
 * Achievements: boolean flags of what you achieved.
 * Some are not shown until you get them.
 * Some have a positive effect on the game. Some have negative one.
 */

import { ALWAYS, HIDDEN } from "../utils/ALWAYS";
import { hasResource } from "../Resource/hasResource";
import { after } from "./after";
import { dontHaveConverter } from "./dontHaveConverter";
import { generateAchievementsCookie } from "./generateAchievementsCookie";
import { generateAchievementsDays } from "./generateAchievementsDays";
import { generateAchievementsPomodoro } from "./generateAchievementsPomodoro";
import { numAchieved } from "./numAchieved";
import { TAchievement } from "./TAchievement";
import { generateAchievementsSteel } from "./generateAchievementsSteel";
import { hasConverter } from "../Converter/hasConverter";
import { firstResource } from "./firstResource";

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
    toGet: (g) => g.records.gotPomodoro_t1 >= 4,
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
    description:
      "magic power hates minerals (Mana Regeneration *= 2, if you don't have coal mine)",
    toShow: HIDDEN,
    toGet: (g) => numAchieved(g) >= 7 && dontHaveConverter("coal_mine", g),
    isPermanent: true,
  },
  {
    id: "day2",
    forHuman: "Day 2",
    description: "Welcome again!",
    toShow: ALWAYS,
    toGet: (g) => g.records.days >= 2,
    getProgress: (g) => {
      return { goal: 2, current: g.records.days };
    },
    isPermanent: true,
  },
  {
    id: "steel",
    forHuman: "First Steel",
    description:
      '"There are three things extremely hard: steel, a diamond, and to know one\'s self." – Benjamin Franklin',
    toShow: hasResource("iron_ingot"),
    toGet: (g) => g.resources.steel >= 1,
    isPermanent: false,
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
  {
    id: "cookie_volcano",
    forHuman: "Cookie Volcano",
    description: "Too many cookie!",
    toShow: HIDDEN,
    toGet: (g) => g.resources.cookie >= 3000 && g.records.gotPomodoro_t1 <= 30,
    isPermanent: true,
  },
  {
    id: "burn_earth",
    forHuman: "Burn Earth",
    description: "Stop! You burned the earth!",
    toShow: HIDDEN,
    toGet: (g) => g.records.pollution >= 1000 && g.records.gotPomodoro_t1 <= 40,
    isPermanent: true,
  },
  {
    id: "sick",
    forHuman: "Gramma got sick",
    description:
      "Due to polluted air, her lungs were broken (-1 cookie per 100 pollution)",
    toShow: HIDDEN,
    toGet: (g) => g.records.pollution >= 100,
    isPermanent: false,
  },
  {
    id: "cookie_earth",
    forHuman: "Cookie Earth",
    description: "It is a cookie.",
    toShow: HIDDEN,
    toGet: (g) => g.resources.cookie >= 10000 && g.records.gotPomodoro_t1 <= 30,
    isPermanent: true,
  },
  {
    id: "cookie_planet",
    forHuman: "Cookie Planet",
    toShow: HIDDEN,
    toGet: (g) =>
      g.resources.cookie >= 100000 && g.records.gotPomodoro_t1 <= 35,
    isPermanent: true,
  },
  {
    id: "cookie_universe",
    forHuman: "Cookie Universe",
    description: "It is a cookie.",
    toShow: HIDDEN,
    toGet: (g) =>
      g.resources.cookie >= 1000000 && g.records.gotPomodoro_t1 <= 40,
    isPermanent: true,
  },

  {
    id: "science",
    forHuman: "Eureka!",
    description: "Ouch! An Apple!",
    toShow: HIDDEN,
    toGet: hasResource("science"),
    isPermanent: false,
  },
  firstResource("green_mana"),
  firstResource("lumber"),
  firstResource("apple"),
  firstResource("grape"),
  firstResource("wine"),

  {
    id: "forest",
    forHuman: "First Forest",
    toShow: HIDDEN,
    toGet: hasConverter("forest"),
    isPermanent: false,
  },
  {
    id: "apple_tree",
    forHuman: "First Apple Tree",
    toShow: HIDDEN,
    toGet: hasConverter("apple_tree"),
    isPermanent: false,
  },
  {
    id: "grape_tree",
    forHuman: "First Grape Tree",
    toShow: HIDDEN,
    toGet: hasConverter("grape_tree"),
    isPermanent: false,
  },
  {
    id: "newton",
    forHuman: "First Scientist, Last Magician",
    description: "increase Mana regeneration +1 per a Newton",
    toShow: HIDDEN,
    toGet: hasConverter("newton"),
    isPermanent: false,
  },
  {
    id: "elf",
    forHuman: "Elf",
    description: "increase mana regeneration (+= Forest / 5)",
    toShow: HIDDEN,
    toGet: (g) => {
      return g.records.used_mana > 500 && g.resources.green_mana > 0;
    },
    isPermanent: false,
  },
  firstResource("wheat"),
  firstResource("bread"),
  {
    id: "adam",
    forHuman: "Adam, First Human",
    description: "mmm? Gramdma is not human?",
    toShow: HIDDEN,
    toGet: hasConverter("human"),
    isPermanent: false,
  },
  {
    id: "eve",
    forHuman: "Eve, Second Human",
    description: "Now you can reproduce human without mana!",
    toShow: HIDDEN,
    toGet: (g) => g.converters.human > 1,
    isPermanent: false,
  },
];

generateAchievementsDays();
generateAchievementsPomodoro();
generateAchievementsCookie();
generateAchievementsSteel();

export let numPermanentAchievements = 0;
all_achievements.forEach((a) => {
  if (a.isPermanent) {
    numPermanentAchievements += 1;
  }
});
