import { numAchieved } from "./Achievement/numAchieved";
import { dontHaveConverter } from "./Achievement/dontHaveConverter";
import { isAchieved } from "./Converter/isAchieved";
import { State } from "reactn/default";

export const updateMana = (g: State) => {
  if (isAchieved("mana")) {
    let manaRegene = numAchieved(g);
    if (isAchieved("no_mine") && dontHaveConverter("coal_mine", g)) {
      manaRegene *= 2;
    }
    const mana = Math.min((g.resources.mana ?? 0) + manaRegene, 100);
    return {
      resources: { ...g.resources, mana },
      records: { ...g.records, manaLimit: 100 },
    };
  }
};
