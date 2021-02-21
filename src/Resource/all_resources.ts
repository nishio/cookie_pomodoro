import { State } from "reactn/default";
import { ALWAYS } from "../ALWAYS";

export type TResourceID =
  | "pomodoro"
  | "cookie"
  | "coal"
  | "iron_ore"
  | "iron_ingot"
  | "iron_pickaxe";

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
    toShow: (g) => g.converters.coal_mine >= 1,
  },
  {
    id: "iron_ore",
    forHuman: "Iron Ore",
    toShow: (g) => g.converters.iron_mine >= 1,
  },
  {
    id: "iron_ingot",
    forHuman: "Iron Ingot",
    toShow: (g) => g.converters.furnace_for_iron >= 1,
  },
  {
    id: "iron_pickaxe",
    forHuman: "Iron Pickaxe",
    toShow: (g) => g.converters.workbench_for_iron_pickaxe >= 1,
  },
];
export type TResource = {
  id: TResourceID;
  forHuman?: string;
  toShow: (g: State) => boolean;
};
