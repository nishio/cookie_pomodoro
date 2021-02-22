import { setGlobal } from "reactn";
import { TAchievementID } from "./Achievement/all_achievements";
import { TTemporaryEffect } from "./Action/Actions";
import { TConverterID } from "./Converter/all_converters";
import { TRecordID } from "./Record/all_records";
import { TResourceID } from "./Resource/all_resources";

const INITIAL_GLOBAL_STATE = {
  version: 1,
  inPomodoro: false,
  pomodoroStartTime: 0,
  pomodoroSecond: 0,
  resources: {} as { [key in TResourceID]: number },
  achieved: {} as { [key in TAchievementID]: boolean },
  converters: {} as { [key in TConverterID]: number },
  activeConverters: {} as { [key in TConverterID]: number },
  records: {} as { [key in TRecordID]: number },
  temporaryEffects: [] as TTemporaryEffect[],
};

export const initializeGlobalState = () => {
  return setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
