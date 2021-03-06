import { TConverter, TRecipe } from "./all_converters";
import React from "react";
import { modifiedValueToStr } from "./modifiedValueToStr";
import { getGlobal } from "reactn";
import { State } from "reactn/default";
import { TResourceID } from "../all_ids";
import { build_onUse } from "./build_onUse";

export function isEnoughResource(
  r: TRecipe,
  g: State,
  mod: Partial<{ [key in TResourceID]: number }>
) {
  return r.from.every(([unit, value]) => {
    return g.resources[unit] >= value + (mod[unit] ?? 0);
  });
}

const getMaxUse = (
  r: TRecipe,
  g: State,
  mod: Partial<{ [key in TResourceID]: number }>,
  numActive: number
) => {
  let ret = numActive;
  r.from.forEach(([unit, value]) => {
    const denom = value + (mod[unit] ?? 0);
    if (denom > 0) {
      const canUse = Math.floor(g.resources[unit] / denom);
      ret = Math.min(ret, canUse);
    }
  });
  return ret;
};

export function renderRecipe(
  this: { isActive: boolean; converter: TConverter; numActive: number },
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
    const use = build_onUse(r, g, mod, this.converter, 1);
    const maxUse = getMaxUse(r, g, mod, this.numActive);
    const onMaxUse = build_onUse(r, g, mod, this.converter, maxUse);
    if (maxUse < 2) {
      useButton = <button onClick={use}>Use 1</button>;
    } else if (maxUse < 4) {
      useButton = (
        <>
          <button onClick={use}>Use 1</button>
          <button onClick={onMaxUse}>Use {maxUse}</button>
        </>
      );
    } else {
      const halfUse = Math.floor(maxUse / 2);
      const onHalfUse = build_onUse(r, g, mod, this.converter, halfUse);
      useButton = (
        <>
          <button onClick={use}>Use 1</button>
          <button data-testid="use_half" onClick={onHalfUse}>
            Use {halfUse}
          </button>
          <button data-testid="use_max" onClick={onMaxUse}>
            Use {maxUse}
          </button>
        </>
      );
    }
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

  let testid = r.name ?? toStr;
  if (this.converter.forHuman === "Human") {
    testid += "@Human";
  }
  return (
    <p key={index} data-testid={testid}>
      Convert <strong>{fromStr}</strong> into <strong>{toStr}</strong>{" "}
      {useButton}
    </p>
  );
}
