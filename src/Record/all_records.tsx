import { TRecordID } from "../all_ids";
import { dateToStr } from "./dateToStr";

export type TRecord = {
  id: TRecordID;
  forHuman?: string;
  toStr: (x?: number) => string;
};

const numberToStr = (x: unknown) => {
  const n: number = (x as number | undefined) ?? 0;
  return n.toString();
};
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
