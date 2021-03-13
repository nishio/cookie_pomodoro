import { TConverter, TRecipe } from "./all_converters";
import { State } from "reactn/default";
import { TResourceID } from "../all_ids";
import { checkAchievements } from "../Achievement/checkAchievements";
import { save } from "../localDB";
import { updateGlobal } from "../utils/updateGlobal";

export const build_onUse = (
  r: TRecipe,
  g: State,
  mod: Partial<
    {
      [key in TResourceID]: number;
    }
  >,
  converter: TConverter,
  repeat: number
) => {
  const use = () => {
    updateGlobal((g) => {
      r.from.forEach(([unit, value]) => {
        let diff = value + (mod[unit] ?? 0);
        if (diff < 0) {
          diff = 0; // dont increse resouces
        }
        diff *= repeat;
        g.resources[unit] -= diff;
      });
      r.to.forEach(([unit, value]) => {
        let diff = value + (mod[unit] ?? 0);
        diff *= repeat;
        g.resources[unit] += diff;
      });
      g.activeConverters[converter.id] -= repeat;
    });
    checkAchievements();
    save();
  };
  return use;
};
