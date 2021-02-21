import { TRecordID } from "../all_ids";

const dateToStr = (x: unknown) => {
  return new Date(x as number).toLocaleString();
};

export type TRecord = {
  id: TRecordID;
  forHuman?: string;
  toStr: (x: unknown) => string;
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
];
