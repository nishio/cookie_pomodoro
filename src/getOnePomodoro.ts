import { setGlobal } from "reactn";
import { all_converters } from "./Converter/all_converters";
import { save } from "./localDB";
import { hasConverter } from "./Converter/hasConverter";
import { updateTotalAmountOfResourcces } from "./updateTotalAmountOfResourcces";
import { updateMana } from "./updateMana";
import { updateDays } from "./updateDays";
import { updateGlobal } from "./utils/updateGlobal";
import { TResourceID } from "./all_ids";
import { checkAchievements } from "./Achievement/checkAchievements";

export const getOnePomodoro = () => {
  setGlobal(updateMana);

  setGlobal(updateDays);

  updateGlobal((g) => {
    const foods: TResourceID[] = ["apple", "bread", "cookie", "grape"];
    if (g.converters.human > 0) {
      for (let i = g.converters.human; i > 0; i--) {
        let maxID: TResourceID = "apple";
        let maxValue = 0;
        foods.forEach((id) => {
          if (g.resources[id] > maxValue) {
            maxID = id;
            maxValue = g.resources[id];
          }
        });
        if (maxValue === 0) {
          // no foods
          g.converters.human -= 1;
          g.records.starvation += 1;
        } else {
          g.resources[maxID] -= 1;
        }
      }
      g.records.cumulative_population += g.converters.human;
    }
    let food_stock = 0;
    foods.forEach((id) => {
      food_stock += g.resources[id];
    });
    g.records.food_stock = food_stock;
  });

  updateGlobal((g) => {
    // activate all converter
    all_converters.forEach((c) => {
      if (hasConverter(c.id)) {
        g.activeConverters[c.id] = g.converters[c.id];
      }
    });

    g.resources.pomodoro += 1;
    g.temporaryEffects = [];
    g.records.gotPomodoro += 1;
    g.records.gotPomodoro_t1 += 1;
  });
  setGlobal(updateTotalAmountOfResourcces);
  checkAchievements();
  return save();
};
