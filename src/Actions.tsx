import React from "react";
import { getOnePomodoro } from "./getOnePomodoro";

export const Actions = () => {
  return (
    <div>
      <h2>Actions</h2>
      <DebugActions />
    </div>
  );
};

const DebugActions = () => {
  if (process.env.NODE_ENV !== "production") {
    return <button onClick={getOnePomodoro}>Click(for Debug)</button>;
  }
  return null;
};
