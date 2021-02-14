import { getGlobal, setGlobal } from "reactn";
import { all_converters } from "./all_converters";
import { TConverterID } from "./all_ids";
import { update } from "./update";

export const getOnePomodoro = () => {
  const g = getGlobal();
  const activeConverters = {} as { [key in TConverterID]: number };
  all_converters.forEach((c) => {
    if ((g.converters[c.id] ?? 0) > 0) {
      activeConverters[c.id] = g.converters[c.id];
    }
  });
  setGlobal({
    resources: update(g.resources, "pomodoro", 1),
    activeConverters: activeConverters,
  });
};
