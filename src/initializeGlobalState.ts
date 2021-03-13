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
import { produce } from "immer";

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
  const init = produce(INITIAL_GLOBAL_STATE, (g) => {
    all_converters.forEach((c) => {
      g.converters[c.id] = 0;
      g.activeConverters[c.id] = 0;
    });
    all_resources.forEach((r) => {
      g.resources[r.id] = 0;
    });
    all_records.forEach((r) => {
      g.records[r.id] = 0;
    });
    g.records.manaLimit = 100;
    g.achieved = {} as typeof INITIAL_GLOBAL_STATE.achieved;
    g.temporaryEffects = [];
  });
  return init;
};

export const initializeGlobalState = () => {
  return setGlobal(getInitialGlobalState());
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
