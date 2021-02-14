import { getGlobal, useGlobal } from "reactn";
import { all_achievements } from "./all_achievements";

export const Achievements = () => {
  const [achieved] = useGlobal("achieved");
  const g = getGlobal();
  const list = all_achievements.map((a) => {
    if (a.toShow(g)) {
      const checkbox = a.id in achieved ? "\u2611" : "\u2610";
      return (
        <li key={a.id}>
          {checkbox} {a.forHuman ?? a.id}
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
