import { TConverter, TRecipe } from "./all_converters";
import { setGlobal } from "reactn";
import { State } from "reactn/default";
import { TResourceID } from "../all_ids";
import { update } from "../update";
import { checkAchievements } from "../Achievement/checkAchievements";
import { save } from "../localDB";

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
    let newResources = { ...g.resources };
    r.from.forEach(([unit, value]) => {
      let diff = value + (mod[unit] ?? 0);
      if (diff < 0) {
        diff = 0; // dont increse resouces
      }
      diff *= repeat;
      newResources = update(newResources, unit, -diff);
    });
    r.to.forEach(([unit, value]) => {
      let diff = value + (mod[unit] ?? 0);
      diff *= repeat;
      newResources = update(newResources, unit, diff);
    });

    setGlobal({
      activeConverters: update(g.activeConverters, converter.id, -repeat),
      resources: newResources,
    })
      .then(() => {
        checkAchievements();
      })
      .then(() => {
        save();
      });
  };
  return use;
};
