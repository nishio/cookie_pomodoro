import { all_achievements } from "./Achievement/all_achievements";
import { all_converters } from "./Converter/all_converters";
import { all_resources } from "./Resource/all_resources";

export type TAchivementID = "pomodoro1" | "pomodoro2" | "pomodoro4";
export type TConverterID =
  | "grandma"
  | "coal_mine"
  | "iron_mine"
  | "furnace_for_iron";
export type TResourceID =
  | "pomodoro"
  | "cookie"
  | "coal"
  | "iron_ore"
  | "iron_ingot";
export type TRecordID = "lastVisit" | "firstVisit" | "gotPomodoro";

export const isResouseID = (x: string): x is TResourceID => {
  return true;
};

export const isConverterID = (x: string): x is TConverterID => {
  return true;
};

export const update_ids = () => {
  let s = "export type TAchivementID = ";
  s += all_achievements.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";

  s += "export type TConvertedID = ";
  s += all_converters.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";

  s += "export type TResourceID = ";
  s += all_resources.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";
  console.log(s);
};
// @ts-ignore
window.update_ids = update_ids;
