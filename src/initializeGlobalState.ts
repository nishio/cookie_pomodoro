import { setGlobal } from "reactn";

const INITIAL_GLOBAL_STATE = {
  inPomodoro: false,
  pomodoroStartTime: 0,
  pomodoro: 0,
  pomodoroSecond: 0,
  achieved: {} as { [key: string]: boolean },
  converters: {} as { [key: string]: number },
};

export const initializeGlobalState = () => {
  setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
