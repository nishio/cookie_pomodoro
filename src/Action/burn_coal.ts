import { State } from "reactn/default";
import { updateGlobal } from "../utils/updateGlobal";

export const burn_coal = {
  id: "burn_coal",
  forHuman: "Burn coal",
  onClick: () => {
    updateGlobal((g) => {
      g.resources.coal -= 1;
      g.temporaryEffects.push(burn_coal_effect);
      g.records.pollution += 1;
    });
  },
  toShow: (g: State) => g.resources.coal >= 1,
  description: "-1 coal. Increases grandma production (+4 cookie)",
  getMax: (g: State) => g.resources.coal,
  repeat: (n: number) => {
    return () => {
      updateGlobal((g) => {
        g.resources.coal -= n;
        g.temporaryEffects.push({ ...burn_coal_effect, value: n });
        g.records.pollution += n;
      });
    };
  },
};

export const burn_coal_effect = {
  id: "burn_coal",
  forHuman: "Burn coal",
  value: 1,
};
