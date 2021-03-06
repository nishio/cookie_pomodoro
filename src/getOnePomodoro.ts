import { getGlobal, setGlobal } from "reactn";
import { all_converters } from "./Converter/all_converters";
import { save } from "./localDB";
import { TConverterID, TRecordID, TResourceID } from "./all_ids";
import { update, updateResource } from "./update";
import { hasConverter } from "./Converter/hasConverter";
import { updateTotalAmountOfResourcces } from "./updateTotalAmountOfResourcces";
import { updateMana } from "./updateMana";
import { updateDays } from "./updateDays";

export const getOnePomodoro = async () => {
  await setGlobal(updateMana);

  await setGlobal(updateDays);

  await setGlobal((g) => {
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
      records: update<TRecordID>(
        update<TRecordID>(g.records, "gotPomodoro_t1", 1),
        "gotPomodoro",
        1
      ),
    };
  });
  await setGlobal(updateTotalAmountOfResourcces);
  await save();
};
