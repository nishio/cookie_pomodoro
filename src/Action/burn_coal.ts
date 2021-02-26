import { setGlobal } from "reactn";
import { State } from "reactn/default";
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
        records: { ...g.records, pollution: g.records.pollution + 1 },
      };
    });
  },
  toShow: (g: State) => g.resources.coal >= 1,
  description: "-1 coal. Increases grandma production (+4 cookie)",
};

export const burn_coal_effect = {
  id: "burn_coal",
  forHuman: "Burn coal",
};
