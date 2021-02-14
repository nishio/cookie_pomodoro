import React from "react";
import { getGlobal, useGlobal } from "reactn";
import { State } from "reactn/default";
import { ALWAYS } from "./ALWAYS";
import { checkAchievements } from "./checkAchievements";

type Resource = {
  id: string;
  forHuman?: string;
  toShow: (g: State) => boolean;
};

const all_resources: Resource[] = [
  {
    id: "pomodoro",
    toShow: ALWAYS,
  },
];

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
