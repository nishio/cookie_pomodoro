import { HIDDEN } from "../utils/ALWAYS";
import { hasResource } from "../Resource/hasResource";
import { TAchievement } from "./TAchievement";
import { idToResource } from "../Resource/all_resources";
import { TAchievementID, TResourceID } from "../all_ids";

export const firstResource = (
  id: TResourceID,
  description?: string,
  toShow = HIDDEN
): TAchievement => {
  return {
    id: (id as unknown) as TAchievementID,
    forHuman: `First ${idToResource[id].forHuman}`,
    toShow,
    toGet: hasResource(id),
    isPermanent: false,
  };
};
