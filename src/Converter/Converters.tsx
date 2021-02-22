import { getGlobal, setGlobal, useGlobal } from "reactn";
import { all_converters } from "./all_converters";
import { save } from "../localDB";
import { update } from "../update";
import { checkAchievements } from "../Achievement/checkAchievements";
import { isEnoughResource } from "./isEnoughResource";
import { isActive } from "./isActive";
import { modifiedValueToStr } from "./modifiedValueToStr";
import { TResourceID } from "../all_ids";
import React from "react";
import { Github } from "../Resource/Github";

export let lastPromise: Promise<unknown> = Promise.resolve();
export const Converters = () => {
  const [converters] = useGlobal("converters");
  const [resources] = useGlobal("resources");
  const [achieved] = useGlobal("achieved");
  const g = getGlobal();
  const list = all_converters.map((c) => {
    if (c.toShow(g)) {
      const amount = converters[c.id] ?? 0;
      const price = c.getPrice(g, amount);
      const priceStr = price.map(([value, unit]) => `${value} ${unit}`);
      const canBuy = price.every(([value, unit]) => {
        return resources[unit] >= value;
      });
      let buyButton = null;
      if (canBuy) {
        const buy = () => {
          let newResources = { ...g.resources };
          price.forEach(([value, unit]) => {
            newResources = update(newResources, unit, -value);
          });
          lastPromise = setGlobal({
            converters: update(g.converters, c.id, 1),
            resources: newResources,
          })
            .then(() => {
              return checkAchievements();
            })
            .then(() => {
              return save();
            });
        };
        buyButton = <button onClick={buy}>Buy({priceStr})</button>;
      } else {
        buyButton = <button disabled>Buy({priceStr})</button>;
      }

      let addToAmount = 0;
      if (c.addToAmount !== undefined) {
        addToAmount = c.addToAmount(g);
      }

      let useButton = null;
      const decreaseCost = {} as { [key in TResourceID]: number };
      if (c.decreaseCost !== undefined) {
        c.decreaseCost(g).forEach(([unit, value]) => {
          decreaseCost[unit] = value;
        });
      }

      const canUse = isActive(g, c) && isEnoughResource(g, c, decreaseCost);
      if (canUse) {
        const use = () => {
          let newResources = { ...g.resources };
          c.froms.forEach(([unit, value]) => {
            newResources = update(
              newResources,
              unit,
              -(value - (decreaseCost[unit] ?? 0))
            );
          });

          lastPromise = setGlobal({
            activeConverters: update(g.activeConverters, c.id, -1),
            resources: update(newResources, c.to, c.toAmount + addToAmount),
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
      let fromStr = c.froms
        .map(([unit, value]) => {
          return modifiedValueToStr(value, 0, decreaseCost[unit], unit);
        })
        .join(" ");
      const toStr = modifiedValueToStr(c.toAmount, addToAmount, 0, c.to);

      return (
        <li key={c.id}>
          {c.forHuman ?? c.id}: Have {amount} {buyButton}: Active{" "}
          {g.activeConverters[c.id] ?? 0} {useButton}
          <p>
            Convert {fromStr} into {toStr}
          </p>
        </li>
      );
    }
    return null;
  });

  return (
    <div>
      <h2>
        Converters
        <Github filename="Converter/all_converters.ts" />
      </h2>
      <div id="converters">
        <p>Can be used once per a pomodoro</p>
        <ul>{list}</ul>
      </div>
    </div>
  );
};
