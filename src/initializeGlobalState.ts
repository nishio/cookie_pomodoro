import { setGlobal } from "reactn";

const INITIAL_GLOBAL_STATE = {
  pomodoro: 0,
};

export const initializeGlobalState = () => {
  setGlobal(INITIAL_GLOBAL_STATE);
};

type TYPE_GLOBAL_STATE = typeof INITIAL_GLOBAL_STATE;

declare module "reactn/default" {
  export interface State extends TYPE_GLOBAL_STATE {}
}
