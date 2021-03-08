import { setGlobal } from "reactn";
import { TTemporaryEffect } from "./Action/Actions";
import {
  TAchievementID,
  TConverterID,
  TRecordID,
  TResourceID,
} from "./all_ids";
import { all_converters } from "./Converter/all_converters";
import { all_records } from "./Record/all_records";
import { all_resources } from "./Resource/all_resources";

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

export const getInitialGlobalState = () => {
  all_converters.forEach((c) => {
    INITIAL_GLOBAL_STATE.converters[c.id] = 0;
    INITIAL_GLOBAL_STATE.activeConverters[c.id] = 0;
  });
  all_resources.forEach((r) => {
    INITIAL_GLOBAL_STATE.resources[r.id] = 0;
  });
  all_records.forEach((r) => {
    INITIAL_GLOBAL_STATE.records[r.id] = 0;
  });
  INITIAL_GLOBAL_STATE.records.manaLimit = 100;
  INITIAL_GLOBAL_STATE.achieved = {} as typeof INITIAL_GLOBAL_STATE.achieved;
  INITIAL_GLOBAL_STATE.temporaryEffects = [];
  return INITIAL_GLOBAL_STATE;
};

export const initializeGlobalState = () => {
  return setGlobal(getInitialGlobalState());
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
