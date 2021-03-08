import { State } from "reactn/default";
import { TResourceID } from "../all_ids";
import { ALWAYS } from "../utils/ALWAYS";
import { hasConverter } from "../Converter/hasConverter";
import { hasAchieved } from "./hasAchieved";

export type TResource = {
  id: TResourceID;
  forHuman?: string;
  toShow: (g: State) => boolean;
};

export const all_resources: TResource[] = [
  {
    id: "pomodoro",
    forHuman: "Pomodoro",
    toShow: ALWAYS,
  },
  {
    id: "cookie",
    forHuman: "Cookie",
    toShow: ALWAYS,
  },
  {
    id: "coal",
    forHuman: "Coal",
    toShow: hasConverter("coal_mine"),
  },
  {
    id: "iron_ore",
    forHuman: "Iron Ore",
    toShow: hasConverter("iron_mine"),
  },
  {
    id: "iron_ingot",
    forHuman: "Iron Ingot",
    toShow: hasConverter("furnace"),
  },
  {
    id: "iron_pickaxe",
    forHuman: "Iron Pickaxe",
    toShow: hasConverter("workbench"),
  },
  {
    id: "mana",
    forHuman: "Mana",
    toShow: hasAchieved("mana"),
  },
  {
    id: "steel",
    forHuman: "Steel",
    toShow: hasAchieved("steel"),
  },
  {
    id: "steel_pickaxe",
    forHuman: "Steel Pickaxe",
    toShow: hasAchieved("steel_pickaxe"),
  },
];

export const idToResource = {} as { [key in TResourceID]: TResource };
all_resources.forEach((r) => {
  idToResource[r.id] = r;
});
