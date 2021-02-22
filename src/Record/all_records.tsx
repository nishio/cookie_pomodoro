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
];
