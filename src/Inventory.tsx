import React from "react";
import { useGlobal } from "reactn";

export const Inventory = () => {
  const [g] = useGlobal();
  return (
    <div>
      <span>pomodoro: {g.pomodoro}</span>
    </div>
  );
};
