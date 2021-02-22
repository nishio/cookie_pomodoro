import { all_achievements } from "./Achievement/all_achievements";
import { all_actions } from "./Action/all_actions";
import { all_converters } from "./Converter/all_converters";
import { all_records } from "./Record/all_records";
import { all_resources } from "./Resource/all_resources";

export const update_ids = () => {
  let s = "export type TAchievementID = ";
  s += all_achievements.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";

  s += "export type TConverterID = ";
  s += all_converters.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";

  s += "export type TResourceID = ";
  s += all_resources.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";

  s += "export type TActionID = ";
  s += all_actions.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";

  s += "export type TRecordID = ";
  s += all_records.map((x) => `"${x.id}"`).join(" | ");
  s += ";\n";
  console.log(s);
};
