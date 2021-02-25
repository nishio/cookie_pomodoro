import React from "react";
import { State } from "reactn/default";
import { TAchievement } from "./TAchievement";
import CircularProgress from "@material-ui/core/CircularProgress";

export const getProgress = (a: TAchievement, g: State, done: boolean) => {
  if (!done && a.getProgress !== undefined) {
    const p = a.getProgress(g);
    const c = p.current ?? 0;
    const percent = Math.floor((100 * c) / p.goal);
    return (
      <span>
        ({c}/{p.goal} = {percent}%{" "}
        <CircularProgress
          size={12}
          thickness={15}
          variant="determinate"
          value={percent}
        />
        )
      </span>
    );
  }
  return null;
};
