import { getGlobal, setGlobal } from "reactn";
import { setDefaultValue } from "./checkSaveData";

export const startGlobalTimer = () => {
  window.setInterval(() => {
    const g = getGlobal();
    if (g.inPomodoro) {
      const ms = Date.now() - g.pomodoroStartTime;
      setDefaultValue(getGlobal()); // temporary fix of on memory data
      setGlobal({ pomodoroSecond: Math.floor(ms / 1000) });
    }
  }, 500);
};
