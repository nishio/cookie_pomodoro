import { burn_coal } from "./burn_coal";
import { click } from "./click";
import { TAction } from "./Actions";
import { no_hunger } from "./no_hunger";
import { breakData } from "./breakData";
import { softReset } from "./softReset";

export const all_actions: TAction[] = [
  click,
  burn_coal,
  no_hunger,
  breakData,
  softReset,
];
