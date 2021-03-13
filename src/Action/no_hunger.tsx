import { TAction } from "./Actions";
import { updateGlobal } from "../utils/updateGlobal";

export const no_hunger: TAction = {
  id: "no_hunger",
  forHuman: "No hunger",
  description: "-100 Mana. Grandma doesn't require pomodoro (-1 pomodoro cost)",
  toShow: (g) => g.resources.mana >= 100,

  onClick: () => {
    updateGlobal((g) => {
      g.resources.mana -= 100;
      g.records.used_mana += 100;
      g.temporaryEffects.push(no_hunger_effect);
    });
  },
};
const no_hunger_effect = {
  id: "no_hunger",
  forHuman: "No Hunger",
};
