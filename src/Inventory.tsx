import React from "react";
import { useGlobal } from "reactn";

export const Inventory = () => {
  const [g] = useGlobal();
  return (
    <div>
      <h2>Inventory</h2>
      <span>pomodoro: {g.pomodoro}</span>
    </div>
  );
};
