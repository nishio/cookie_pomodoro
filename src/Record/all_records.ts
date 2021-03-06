/**
 * Record: Currently it is ambiguous concept and will be renamed in future.
 * Some are parmanent, so that it is similar to the high scores.
 * Some are similar to statistics.
 */
import { dateToStr } from "./dateToStr";
import { numberToStr } from "./numberToStr";
import { TRecord } from "./TRecord";

export const all_records: TRecord[] = [
  {
    id: "firstVisit",
    forHuman: "First Visit",
    toStr: dateToStr,
    isPermanent: true,
  },
  {
    id: "lastVisit",
    forHuman: "Last Visit",
    toStr: dateToStr,
    isPermanent: true,
  },
  {
    id: "gotPomodoro",
    forHuman: "Got Pomodoro(Total)",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "gotPomodoro_t1",
    forHuman: "Turn(Got Pomodoro in this Round)",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "lastPomodoro",
    forHuman: "Last Pomodoro",
    toStr: dateToStr,
    isPermanent: true,
  },
  {
    id: "days",
    forHuman: "Days with Pomodoro",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "manaLimit",
    forHuman: "Mana Limit",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "totalAmountOfResources",
    forHuman: "Total Amount of Resources(TAoR)",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "totalAmountOfResources10",
    forHuman: "TAoR @ Turn 10",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "totalAmountOfResources20",
    forHuman: "TAoR @ Turn 20",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "totalAmountOfResources40",
    forHuman: "TAoR @ Turn 40",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "pollution",
    forHuman: "Air Pollution",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "numSoftReset",
    forHuman: "Number of Soft Reset",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "numAchieved",
    forHuman: "Number of Achievement",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "used_mana",
    forHuman: "Used Mana",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "starvation",
    forHuman: "Death by Starvation",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "cumulative_population",
    forHuman: "Cumulative Population",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "food_stock",
    forHuman: "Food Stock",
    toStr: numberToStr,
    isPermanent: false,
  },
  {
    id: "numGotPermanent",
    forHuman: "Got Permanent Achievements",
    toStr: numberToStr,
    isPermanent: false,
  },
];
