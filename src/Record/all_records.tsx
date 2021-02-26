import { dateToStr } from "./dateToStr";
import { numberToStr } from "./numberToStr";
import { TRecord } from "./TRecord";

export const all_records: TRecord[] = [
  {
    id: "firstVisit",
    forHuman: "First Visit",
    toStr: dateToStr,
  },
  {
    id: "lastVisit",
    forHuman: "Last Visit",
    toStr: dateToStr,
  },
  {
    id: "gotPomodoro",
    forHuman: "Got Pomodoro",
    toStr: numberToStr,
  },
  {
    id: "lastPomodoro",
    forHuman: "Last Pomodoro",
    toStr: dateToStr,
  },
  {
    id: "days",
    forHuman: "Days with Pomodoro",
    toStr: numberToStr,
  },
  {
    id: "manaLimit",
    forHuman: "Mana Limit",
    toStr: numberToStr,
  },
  {
    id: "totalAmountOfResources",
    forHuman: "Total Amount of Resources(TAoR)",
    toStr: numberToStr,
  },
  {
    id: "totalAmountOfResources10",
    forHuman: "TAoR @ 10 Pomodoro",
    toStr: numberToStr,
  },
  {
    id: "totalAmountOfResources20",
    forHuman: "TAoR @ 20 Pomodoro",
    toStr: numberToStr,
  },
  {
    id: "totalAmountOfResources40",
    forHuman: "TAoR @ 40 Pomodoro",
    toStr: numberToStr,
  },
  {
    id: "pollution",
    forHuman: "Air Pollution",
    toStr: numberToStr,
  },
];
