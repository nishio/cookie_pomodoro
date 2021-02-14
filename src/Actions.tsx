import React from "react";
import { useDispatch } from "reactn";

export const Actions = () => {
  return (
    <div>
      <h2>Actions</h2>
      <DebugActions />
    </div>
  );
};

const DebugActions = () => {
  const onClick = useDispatch((x) => x + 1, "pomodoro");
  if (process.env.NODE_ENV !== "production") {
    return <button onClick={onClick}>Click(for Debug)</button>;
  }
  return null;
};
