import { setGlobal } from "reactn";
import { inDeveleop } from "./inDeveleop";

export const breakData = {
  id: "breakData",
  onClick: () => {
    setGlobal((g) => {
      return { resources: { ...g.resources, pomodoro: undefined as any } };
    });
  },
  // toShow: inDeveleop,
  toShow: () => false,
};
