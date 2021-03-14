import { useGlobal } from "reactn";
import { all_converters } from "./all_converters";
import { save } from "../localDB";
import { checkAchievements } from "../Achievement/checkAchievements";
import { isActive } from "./isActive";
import React from "react";
import { Github } from "../Resource/Github";
import { renderRecipe } from "./renderRecipe";
import { idToResource } from "../Resource/all_resources";
import { updateGlobal } from "../utils/updateGlobal";

export const Converters = () => {
  const [g] = useGlobal();
  const list = all_converters.map((c) => {
    if (c.toShow(g)) {
      const amount = g.converters[c.id] ?? 0;
      const price = c.getPrice(g, amount);

      const priceStr = price.map(
        ([unit, value]) => `${value} ${idToResource[unit].forHuman ?? unit}`
      );
      const canBuy = price.every(([unit, value]) => {
        return g.resources[unit] >= value;
      });
      let buyButton = null;
      if (price.length === 0) {
        // no way to buy
        buyButton = <span>(can not buy)</span>;
      } else if (canBuy) {
        const buy = () => {
          updateGlobal((g) => {
            price.forEach(([unit, value]) => {
              g.resources[unit] -= value;
            });
            g.converters[c.id] += 1;
          });
          checkAchievements();
          save();
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
