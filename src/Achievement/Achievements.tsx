import { getGlobal, useGlobal } from "reactn";
import { all_achievements } from "./all_achievements";
import { getProgress } from "./getProgress";

export const Achievements = () => {
  const [achieved] = useGlobal("achieved");
  const g = getGlobal();
  const list = all_achievements.map((a) => {
    const done = a.id in achieved;
    if (done || a.toShow(g)) {
      const checkbox = done ? "\u2611" : "\u2610";
      const progress = getProgress(a, g, done);
      return (
        <li key={a.id}>
          {checkbox} {a.forHuman ?? a.id} {progress}
          {a.description ? <p>{a.description}</p> : null}
        </li>
      );
    }
    return null;
  });
  return (
    <div>
      <h2>Achievements</h2>
      <ul>{list}</ul>
    </div>
  );
};
