import { getGlobal, setGlobal } from "reactn";
import { numAchieved } from "./Achievement/numAchieved";
import { all_converters, TConverterID } from "./Converter/all_converters";
import { save } from "./localDB";
import { update } from "./update";

export const getOnePomodoro = async () => {
  const g = getGlobal();
  const activeConverters = {} as { [key in TConverterID]: number };
  all_converters.forEach((c) => {
    if ((g.converters[c.id] ?? 0) > 0) {
      activeConverters[c.id] = g.converters[c.id];
    }
  });
  if ("mana" in g.achieved) {
    await setGlobal({
      resources: update(g.resources, "mana", numAchieved(g)),
    });
  }
  await setGlobal({
    resources: update(g.resources, "pomodoro", 1),
    activeConverters: activeConverters,
    records: update(g.records, "gotPomodoro", 1),
  });
  await save();
};
