import { setGlobal } from "reactn";
import { TAchivementID, TConverterID, TResourceID } from "./all_ids";

const INITIAL_GLOBAL_STATE = {
  inPomodoro: false,
  pomodoroStartTime: 0,
  pomodoroSecond: 0,
  resources: {} as { [key in TResourceID]: number },
  achieved: {} as { [key in TAchivementID]: boolean },
  converters: {} as { [key in TConverterID]: number },
};

export const initializeGlobalState = () => {
  setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
