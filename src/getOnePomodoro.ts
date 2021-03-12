import { setGlobal } from "reactn";
import { all_converters } from "./Converter/all_converters";
import { save } from "./localDB";
import { TConverterID } from "./all_ids";
import { updateResource } from "./update";
import { hasConverter } from "./Converter/hasConverter";
import { updateTotalAmountOfResourcces } from "./updateTotalAmountOfResourcces";
import { updateMana } from "./updateMana";
import { updateDays } from "./updateDays";

export const getOnePomodoro = () => {
  setGlobal(updateMana);

  setGlobal(updateDays);

  setGlobal((g) => {
    // activate all converter
    const activeConverters: { [key in TConverterID]: number } = {
      ...g.activeConverters,
    };
    all_converters.forEach((c) => {
      if (hasConverter(c.id)) {
        activeConverters[c.id] = g.converters[c.id];
      }
    });

    return {
      ...updateResource(g, "pomodoro", 1),
      temporaryEffects: [],
      activeConverters: activeConverters,
      records: {
        ...g.records,
        gotPomodoro: (g.records.gotPomodoro ?? 0) + 1,
        gotPomodoro_t1: (g.records.gotPomodoro_t1 ?? 0) + 1,
      },
    };
  });
  setGlobal(updateTotalAmountOfResourcces);
  return save();
};
