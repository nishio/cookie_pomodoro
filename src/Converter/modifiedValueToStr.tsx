import { TResourceID } from "../all_ids";
import { idToResource } from "../Resource/all_resources";

export const modifiedValueToStr = (
  value?: number,
  mod?: number,
  unit?: TResourceID
) => {
  value = value ?? 0;
  let ret = `${value}`;
  mod = mod ?? 0;
  if (mod > 0) {
    ret += ` + ${mod}`;
  }
  if (mod < 0) {
    ret += ` - ${-mod}`;
  }
  if (mod !== 0) {
    ret = `${ret} = ${value + mod}`;
  }
  if (unit !== undefined) {
    const s = idToResource[unit].forHuman ?? unit;
    ret += ` ${s}`;
  }
  return ret;
};
