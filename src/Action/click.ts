import { getOnePomodoro } from "../getOnePomodoro";
import { inDeveleop } from "./inDeveleop";

export const click = {
  id: "click",
  forHuman: "Click(for Debug)",
  onClick: getOnePomodoro,
  toShow: inDeveleop,
};
