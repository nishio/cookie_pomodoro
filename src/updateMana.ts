import { numAchieved } from "./Achievement/numAchieved";
import { dontHaveConverter } from "./Achievement/dontHaveConverter";
import { isAchieved } from "./Converter/isAchieved";
import { State } from "reactn/default";

export const updateMana = (g: State) => {
  if (isAchieved("mana")) {
    let manaRegene = numAchieved(g);
    manaRegene -= Math.floor(g.records.pollution ?? 0 / 10);
    if (isAchieved("no_mine") && dontHaveConverter("coal_mine", g)) {
      manaRegene *= 2;
    }
    const manaLimit = g.records.manaLimit ?? 100;
    let mana = (g.resources.mana ?? 0) + manaRegene;
    mana = clip(mana, 0, manaLimit);
    if (mana === null || isNaN(mana)) {
      mana = manaLimit;
    }
    return {
      resources: { ...g.resources, mana },
      records: { ...g.records, manaLimit },
    };
  }
};

const clip = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};
