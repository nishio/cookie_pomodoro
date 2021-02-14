import React from "react";
import { getGlobal, setGlobal } from "reactn";

export const Actions = () => {
  return (
    <div>
      <h2>Actions</h2>
      <DebugActions />
    </div>
  );
};

const DebugActions = () => {
  const onClick = () => {
    const g = getGlobal();
    const r = g.resources;
    setGlobal({ resources: { ...r, pomodoro: r.pomodoro + 1 } });
  };
  if (process.env.NODE_ENV !== "production") {
    return <button onClick={onClick}>Click(for Debug)</button>;
  }
  return null;
};
