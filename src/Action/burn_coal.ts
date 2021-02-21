import { setGlobal } from "reactn";
import { State } from "reactn/default";

export const burn_coal = {
  id: "burn_coal",
  forHuman: "Burn coal",
  onClick: () => {
    setGlobal((g) => {
      return {
        ...g,
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
