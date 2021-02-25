import { isDifferentDate } from "./isDifferentDate";
import { State } from "reactn/default";

export const updateDays = (g: State) => {
  const newObj = { ...g.records, lastPomodoro: Date.now() };

  if (isDifferentDate(g.records.lastPomodoro)) {
    return {
      records: { ...newObj, days: g.records.days + 1 },
    };
  }
  return { records: newObj };
};
