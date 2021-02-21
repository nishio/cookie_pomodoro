import { getOnePomodoro } from "../getOnePomodoro";
const inDeveleop = () => {
  return process.env.NODE_ENV !== "production";
};

export const click = {
  id: "click",
  forHuman: "Click(for Debug)",
  onClick: getOnePomodoro,
  toShow: inDeveleop,
};
