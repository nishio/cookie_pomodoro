import { getGlobal, setGlobal } from "reactn";
import { numAchieved } from "./Achievement/numAchieved";
import { TRecordID } from "./all_ids";
import { all_converters, TConverterID } from "./Converter/all_converters";
import { save } from "./localDB";
import { update, updateResource } from "./update";

export const getOnePomodoro = async () => {
  const g = getGlobal();
  const activeConverters = {} as { [key in TConverterID]: number };
  all_converters.forEach((c) => {
    if ((g.converters[c.id] ?? 0) > 0) {
      activeConverters[c.id] = g.converters[c.id];
    }
  });
  if ("mana" in g.achieved) {
    let mana = numAchieved(g);
    if ("no_mine" in g.achieved && g.converters.coal_mine === 0) {
      mana *= 2;
    }
    await setGlobal({
      ...updateResource(g, "mana", mana),
    });
  }
  await setGlobal((g) => {
    return {
      ...updateResource(g, "pomodoro", 1),
      temporaryEffects: [],
      activeConverters: activeConverters,
      records: update<TRecordID>(g.records, "gotPomodoro", 1),
    };
  });
  await save();
};
