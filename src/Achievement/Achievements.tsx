import { getGlobal, useGlobal } from "reactn";
import { isPermanent, PermanentMark_WithLink } from "../Record/isPermanent";
import { Github } from "../Resource/Github";
import { all_achievements, numPermanentAchievements } from "./all_achievements";
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
          {checkbox} {isPermanent(a)}
          {a.forHuman ?? a.id} {progress}
          {a.description ? <p>{a.description}</p> : null}
        </li>
      );
    }
    return null;
  });
  const percent = (
    (100 * g.records.numGotPermanent) /
    numPermanentAchievements
  ).toFixed(1);
  return (
    <div id="achievements">
      <h2>
        Achievements
        <Github filename="Achievement/all_achievements.ts" />
      </h2>
      {PermanentMark_WithLink}: {g.records.numGotPermanent} /{" "}
      {numPermanentAchievements} = {percent}%<ul>{list}</ul>
    </div>
  );
};
