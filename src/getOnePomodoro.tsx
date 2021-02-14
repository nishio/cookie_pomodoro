import { getGlobal, setGlobal } from "reactn";
import { update } from "./update";

export const getOnePomodoro = () => {
  const g = getGlobal();
  setGlobal({ resources: update(g.resources, "pomodoro", 1) });
};
