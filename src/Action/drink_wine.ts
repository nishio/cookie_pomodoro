import { updateGlobal } from "../utils/updateGlobal";
import { State } from "reactn/default";

export const drink_wine = {
  id: "drink_wine",
  forHuman: "Drink Wine",
  onClick: () => {
    updateGlobal((g) => {
      g.resources.wine -= g.converters.grandma;
      g.temporaryEffects.push(drink_wine_effect);
    });
  },
  toShow: (g: State) => g.resources.wine >= g.converters.grandma,
  description: "-1 Wine per Grandma. Increases grandma production",
  getMax: (g: State) => g.resources.coal,
};

export const drink_wine_effect = {
  id: "drink_wine",
  forHuman: "Drink wine",
};
