import React from "react";
import { getOnePomodoro } from "./getOnePomodoro";
import { initializeGlobalState } from "./initializeGlobalState";
import { save } from "./localDB";

export const Actions = () => {
  return (
    <div>
      <h2>Actions</h2>
      <DebugActions />
    </div>
  );
};

const reset = () => {
  initializeGlobalState();
  save();
};
const DebugActions = () => {
  if (process.env.NODE_ENV !== "production") {
    const buttons = [
      <button key="click" onClick={getOnePomodoro}>
        Click(for Debug)
      </button>,
      <button key="reset" onClick={reset}>
        Reset
      </button>,
    ];
    return <>{buttons}</>;
  }
  return null;
};
