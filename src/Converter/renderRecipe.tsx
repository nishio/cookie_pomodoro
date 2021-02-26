import { TConverter, TRecipe } from "./all_converters";
import React from "react";
import { modifiedValueToStr } from "./modifiedValueToStr";
import { getGlobal, setGlobal } from "reactn";
import { State } from "reactn/default";
import { TResourceID } from "../all_ids";
import { update } from "../update";
import { checkAchievements } from "../Achievement/checkAchievements";
import { save } from "../localDB";

export function isEnoughResource(
  r: TRecipe,
  g: State,
  mod: Partial<{ [key in TResourceID]: number }>
) {
  return r.from.every(([unit, value]) => {
    return g.resources[unit] >= value + (mod[unit] ?? 0);
  });
}

export function renderRecipe(
  this: { isActive: boolean; converter: TConverter },
  r: TRecipe,
  index: number
) {
  let useButton = null;
  const g = getGlobal();
  if (!r.toShow(g)) {
    return null;
  }
  const mod = r.modifier();
  const canUse = this.isActive && isEnoughResource(r, g, mod);
  if (canUse) {
    const use = () => {
      let newResources = { ...g.resources };
      r.from.forEach(([unit, value]) => {
        newResources = update(newResources, unit, -(value + (mod[unit] ?? 0)));
      });
      r.to.forEach(([unit, value]) => {
        newResources = update(newResources, unit, value + (mod[unit] ?? 0));
      });

      setGlobal({
        activeConverters: update(g.activeConverters, this.converter.id, -1),
        resources: newResources,
      })
        .then(() => {
          checkAchievements();
        })
        .then(() => {
          save();
        });
    };
    useButton = <button onClick={use}>Use 1</button>;
  } else {
    useButton = <button disabled>Use 1</button>;
  }

  let fromStr = r.from
    .map(([unit, value]) => {
      return modifiedValueToStr(value, mod[unit], unit);
    })
    .join(" ");
  let toStr = r.to
    .map(([unit, value]) => {
      return modifiedValueToStr(value, mod[unit], unit);
    })
    .join(" ");

  return (
    <p key={index}>
      Convert <strong>{fromStr}</strong> into <strong>{toStr}</strong>{" "}
      {useButton}
    </p>
  );
}
