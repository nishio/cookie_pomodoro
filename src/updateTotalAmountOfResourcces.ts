import { TRecordID } from "./all_ids";
import { all_resources } from "./Resource/all_resources";
import { State } from "reactn/default";
import { addSnack } from "./MySnack";

export const updateTotalAmountOfResourcces = (g: State) => {
  const taor = getTotalAmountOfResource(g);
  const newRecord: {
    [key in TRecordID]: number;
  } = {
    ...g.records,
    totalAmountOfResources: taor,
  };
  console.log(g.records.gotPomodoro);
  if (g.records.gotPomodoro === 10) {
    if (taor > (g.records.totalAmountOfResources10 ?? 0)) {
      newRecord["totalAmountOfResources10"] = taor;
      addSnack(`Best record: TAoR@10 = ${taor}`);
    }
  }
  if (g.records.gotPomodoro === 20) {
    if (taor > (g.records.totalAmountOfResources20 ?? 0)) {
      newRecord["totalAmountOfResources20"] = taor;
      addSnack(`Best record: TAoR@20 = ${taor}`);
    }
  }
  if (g.records.gotPomodoro === 40) {
    if (taor > (g.records.totalAmountOfResources40 ?? 0)) {
      newRecord["totalAmountOfResources40"] = taor;
      addSnack(`Best record: TAoR@40 = ${taor}`);
    }
  }
  return { records: newRecord };
};
const getTotalAmountOfResource = (g: State): number => {
  let ret = 0;
  all_resources.forEach((r) => {
    ret += g.resources[r.id] ?? 0;
  });
  return ret;
};
