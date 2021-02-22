import { TRecordID } from "../all_ids";

export type TRecord = {
  id: TRecordID;
  forHuman?: string;
  toStr: (x?: number) => string;
};
