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
    forHuman: "Got Pomodoro",
    toStr: numberToStr,
    isPermanent: true,
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
    forHuman: "TAoR @ 10 Pomodoro",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "totalAmountOfResources20",
    forHuman: "TAoR @ 20 Pomodoro",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "totalAmountOfResources40",
    forHuman: "TAoR @ 40 Pomodoro",
    toStr: numberToStr,
    isPermanent: true,
  },
  {
    id: "pollution",
    forHuman: "Air Pollution",
    toStr: numberToStr,
    isPermanent: false,
  },
];
