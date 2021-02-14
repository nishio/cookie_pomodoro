import React from "react";
import { useGlobal } from "reactn";
import { checkAchievements } from "./checkAchievements";

export const Inventory = () => {
  const [g] = useGlobal();
  requestAnimationFrame(checkAchievements);
  return (
    <div>
      <h2>Inventory</h2>
      <span>pomodoro: {g.pomodoro}</span>
    </div>
  );
};
