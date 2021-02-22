import { State } from "reactn/default";
import { TAchievement } from "./all_achievements";

export const getProgress = (a: TAchievement, g: State, done: boolean) => {
  if (!done && a.getProgress !== undefined) {
    const p = a.getProgress(g);
    const percent = Math.floor((100 * p.current) / p.goal);
    return (
      <span>
        ({p.current}/{p.goal} = {percent}%)
      </span>
    );
  }
  return null;
};
