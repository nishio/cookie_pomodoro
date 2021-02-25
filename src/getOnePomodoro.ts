import { getGlobal, setGlobal } from "reactn";
import { numAchieved } from "./Achievement/numAchieved";
import { all_converters } from "./Converter/all_converters";
import { isDifferentDate } from "./isDifferentDate";
import { save } from "./localDB";
import { TConverterID, TRecordID } from "./all_ids";
import { update, updateResource } from "./update";
import { dontHaveConverter } from "./Achievement/dontHaveConverter";
import { isAchieved } from "./Converter/isAchieved";
import { hasConverter } from "./Converter/hasConverter";
import { all_resources } from "./Resource/all_resources";
import { State } from "reactn/default";
import { addSnack } from "./MySnack";

export const getOnePomodoro = async () => {
  const g = getGlobal();
  const activeConverters = {} as { [key in TConverterID]: number };
  all_converters.forEach((c) => {
    if (hasConverter(c.id)) {
      activeConverters[c.id] = g.converters[c.id];
    }
  });
  if (isAchieved("mana")) {
    let mana = numAchieved(g);
    if (isAchieved("no_mine") && dontHaveConverter("coal_mine", g)) {
      mana *= 2;
    }
    await setGlobal({
      ...updateResource(g, "mana", mana),
    });
  }
  if (g.records.lastPomodoro !== 0) {
    if (isDifferentDate(g.records.lastPomodoro)) {
      await setGlobal((g) => {
        return {
          records: update<TRecordID>(g.records, "days", 1),
        };
      });
    }
  }
  await setGlobal((g) => {
    return {
      records: { ...g.records, lastPomodoro: Date.now() },
    };
  });

  await setGlobal((g) => {
    return {
      ...updateResource(g, "pomodoro", 1),
      temporaryEffects: [],
      activeConverters: activeConverters,
      records: update<TRecordID>(g.records, "gotPomodoro", 1),
    };
  });
  await setGlobal((g: State) => {
    const taor = getTotalAmountOfResource(g);
    const newRecord: { [key in TRecordID]: number } = {
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
  });
  await save();
};

const getTotalAmountOfResource = (g: State): number => {
  let ret = 0;
  all_resources.forEach((r) => {
    ret += g.resources[r.id] ?? 0;
  });
  return ret;
};
