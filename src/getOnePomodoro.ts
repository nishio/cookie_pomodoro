import { setGlobal } from "reactn";
import { all_converters } from "./Converter/all_converters";
import { save } from "./localDB";
import { hasConverter } from "./Converter/hasConverter";
import { updateTotalAmountOfResourcces } from "./updateTotalAmountOfResourcces";
import { updateMana } from "./updateMana";
import { updateDays } from "./updateDays";
import { updateGlobal } from "./utils/updateGlobal";

export const getOnePomodoro = () => {
  setGlobal(updateMana);

  setGlobal(updateDays);

  updateGlobal((g) => {
    // activate all converter
    all_converters.forEach((c) => {
      if (hasConverter(c.id)) {
        g.activeConverters[c.id] = g.converters[c.id];
      }
    });

    g.resources.pomodoro += 1;
    g.temporaryEffects = [];
    g.records.gotPomodoro += 1;
    g.records.gotPomodoro_t1 += 1;
  });
  setGlobal(updateTotalAmountOfResourcces);
  return save();
};
