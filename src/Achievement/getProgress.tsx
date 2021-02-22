import { State } from "reactn/default";
import { TAchievement } from "./all_achievements";

export const getProgress = (a: TAchievement, g: State, done: boolean) => {
  if (!done && a.getProgress !== undefined) {
    const p = a.getProgress(g);
    const c = p.current ?? 0;
    const percent = Math.floor((100 * c) / p.goal);
    return (
      <span>
        ({c}/{p.goal} = {percent}%)
      </span>
    );
  }
  return null;
};
