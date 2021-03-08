import { getGlobal, setGlobal, useGlobal } from "reactn";
import { all_converters } from "./all_converters";
import { save } from "../localDB";
import { update } from "../update";
import { checkAchievements } from "../Achievement/checkAchievements";
import { isActive } from "./isActive";
import React from "react";
import { Github } from "../Resource/Github";
import { renderRecipe } from "./renderRecipe";

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

      let recipes = null;
      let numActive = g.activeConverters[c.id] ?? 0;

      if (c.recipes) {
        recipes = c.recipes.map(renderRecipe, {
          isActive: isActive(g, c),
          converter: c,
          numActive,
        });
      }

      let showNumActive = (
        <>
          Active <strong style={{ color: "red" }}>0</strong>
        </>
      );
      if (numActive > 0) {
        showNumActive = (
          <>
            Active <strong>{numActive}</strong>
          </>
        );
      }

      return (
        <li key={c.id}>
          {c.forHuman ?? c.id}: Have <strong>{amount}</strong> {buyButton}
          <br />
          {showNumActive}
          {recipes}
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
