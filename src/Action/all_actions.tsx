import { burn_coal } from "./burn_coal";
import { click } from "./click";
import { reset } from "./reset";
import { TAction } from "./Actions";
import { no_hunger } from "./no_hunger";
import { breakData } from "./breakData";

export const all_actions: TAction[] = [
  click,
  reset,
  burn_coal,
  no_hunger,
  breakData,
];
