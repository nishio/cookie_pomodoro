import { State } from "reactn/default";
import { TResourceID } from "../all_ids";
import { ALWAYS } from "../ALWAYS";
import { hasConverter } from "../Converter/hasConverter";
import { hasResource } from "./hasResource";

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
    toShow: hasConverter("furnace_for_iron"),
  },
  {
    id: "iron_pickaxe",
    forHuman: "Iron Pickaxe",
    toShow: hasConverter("workbench_for_iron_pickaxe"),
  },
  {
    id: "mana",
    forHuman: "Mana",
    toShow: hasResource("mana"),
  },
  {
    id: "steel",
    forHuman: "Steel",
    toShow: hasResource("steel"),
  },
];

export const idToResource = {} as { [key in TResourceID]: TResource };
all_resources.forEach((r) => {
  idToResource[r.id] = r;
});
