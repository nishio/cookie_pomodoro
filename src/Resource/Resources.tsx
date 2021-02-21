import { getGlobal, useGlobal } from "reactn";
import { isResouseID } from "../all_ids";
import { all_resources } from "./all_resources";
import { checkAchievements } from "../Achievement/checkAchievements";

export const Resources = () => {
  const [resources] = useGlobal("resources");
  requestAnimationFrame(checkAchievements);
  const g = getGlobal();
  const list = all_resources.map((r) => {
    if (!isResouseID(r.id)) {
      throw new TypeError(`${r.id} not in TResourceID`);
    }
    if (r.toShow(g)) {
      return (
        <li key={r.id}>
          {r.forHuman ?? r.id}: {resources[r.id] ?? 0}
        </li>
      );
    }
    return null;
  });

  return (
    <div>
      <h2>Resources</h2>
      <ul>{list}</ul>
    </div>
  );
};
