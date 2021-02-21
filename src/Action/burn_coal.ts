import { setGlobal } from "reactn";
import { State } from "reactn/default";
import { TResourceID } from "../Resource/all_resources";
import { updateResource } from "../update";

export const burn_coal = {
  id: "burn_coal",
  forHuman: "Burn coal",
  onClick: () => {
    setGlobal((g: State) => {
      return {
        ...g,
        ...updateResource(g, "coal", -1),
        temporaryEffects: [...g.temporaryEffects, burn_coal_effect],
      };
    });
  },
  toShow: (g: State) => g.resources.coal >= 1,
  description: "Temporary increases grandma production (+4)",
};

export const burn_coal_effect = {
  id: "burn_coal",
  forHuman: "Burn coal",
};
