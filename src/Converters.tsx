import React from "react";
import { getGlobal, setGlobal, useGlobal } from "reactn";
import { all_converters } from "./all_converters";
import { isConverterID } from "./all_ids";
import { update } from "./update";

export const Converters = () => {
  const [converters] = useGlobal("converters");
  const [resources] = useGlobal("resources");
  const g = getGlobal();
  const list = all_converters.map((c) => {
    if (c.toShow(g)) {
      if (!isConverterID(c.id)) {
        throw new TypeError(`${c.id} not in TConvererID`);
      }
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
          setGlobal({
            converters: update(g.converters, c.id, 1),
            resources: newResources,
          });
        };
        buyButton = <button onClick={buy}>Buy({priceStr})</button>;
      } else {
        buyButton = <button disabled>Buy({priceStr})</button>;
      }

      let useButton = null;
      const canUse =
        (g.activeConverters[c.id] ?? 0) > 0 &&
        g.resources[c.from] >= c.fromAmount;
      if (canUse) {
        const use = () => {
          setGlobal({
            activeConverters: update(g.activeConverters, c.id, -1),
            resources: update(
              update(g.resources, c.from, -c.fromAmount),
              c.to,
              c.toAmount
            ),
          });
        };
        useButton = <button onClick={use}>Use 1</button>;
      } else {
        useButton = <button disabled>Use 1</button>;
      }
      return (
        <li key={c.id}>
          {c.forHuman ?? c.id}: {amount} {buyButton}:{" "}
          {g.activeConverters[c.id] ?? 0} {useButton}
        </li>
      );
    }
    return null;
  });

  return (
    <div>
      <h2>Converters</h2>
      <ul>{list}</ul>
    </div>
  );
};
