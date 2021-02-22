import { TAction } from "./Actions";
import { updateResource } from "../update";
import { setGlobal } from "reactn";
import { State } from "reactn/default";

export const no_hunger: TAction = {
  id: "no_hunger",
  forHuman: "No hunger",
  description: "grandma doesn't require pomodoro",
  toShow: (g) => g.resources.mana >= 100,

  onClick: () => {
    setGlobal((g: State) => {
      return {
        ...g,
        ...updateResource(g, "mana", -100),
        temporaryEffects: [...g.temporaryEffects, no_hunger_effect],
      };
    });
  },
};
const no_hunger_effect = {
  id: "no_hunger",
  forHuman: "No Hunger",
};
