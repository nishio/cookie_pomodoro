import { setGlobal } from "reactn";
import { TAchivementID, TConverterID, TRecordID, TResourceID } from "./all_ids";

const INITIAL_GLOBAL_STATE = {
  version: 1,
  inPomodoro: false,
  pomodoroStartTime: 0,
  pomodoroSecond: 0,
  resources: {} as { [key in TResourceID]: number },
  achieved: {} as { [key in TAchivementID]: boolean },
  converters: {} as { [key in TConverterID]: number },
  activeConverters: {} as { [key in TConverterID]: number },
  records: {} as { [key in TRecordID]: number },
};

export const initializeGlobalState = () => {
  return setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
