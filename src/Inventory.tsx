import React from "react";
import { getGlobal, useGlobal } from "reactn";
import { all_resources } from "./all_resources";
import { checkAchievements } from "./checkAchievements";

export const Inventory = () => {
  const [resources] = useGlobal("resources");
  requestAnimationFrame(checkAchievements);
  const g = getGlobal();
  const list = all_resources.map((r) => {
    if (r.toShow(g)) {
      return (
        <li key={r.id}>
          {r.forHuman ?? r.id}: {resources[r.id]}
        </li>
      );
    }
    return null;
  });

  return (
    <div>
      <h2>Inventory</h2>
      <ul>{list}</ul>
    </div>
  );
};
