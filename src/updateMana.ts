import { numAchieved } from "./Achievement/numAchieved";
import { updateResource } from "./update";
import { dontHaveConverter } from "./Achievement/dontHaveConverter";
import { isAchieved } from "./Converter/isAchieved";
import { State } from "reactn/default";

export const updateMana = (g: State) => {
  if (isAchieved("mana")) {
    let mana = numAchieved(g);
    if (isAchieved("no_mine") && dontHaveConverter("coal_mine", g)) {
      mana *= 2;
    }
    return {
      ...updateResource(g, "mana", mana),
    };
  }
};
