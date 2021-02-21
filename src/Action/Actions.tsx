/**
 * Action: works instantly without any resource
 */
import React from "react";
import { getOnePomodoro } from "../getOnePomodoro";
import { reset } from "./reset";

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
