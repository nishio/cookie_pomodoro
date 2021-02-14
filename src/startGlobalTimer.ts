import { getGlobal, setGlobal } from "reactn";

export const startGlobalTimer = () => {
  window.setInterval(() => {
    const g = getGlobal();
    if (g.inPomodoro) {
      const ms = Date.now() - g.pomodoroStartTime;
      setGlobal({ pomodoroSecond: Math.floor(ms / 1000) });
    }
  }, 500);
};
