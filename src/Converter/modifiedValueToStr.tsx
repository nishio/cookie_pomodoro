import { idToResource, TResourceID } from "../Resource/all_resources";

export const modifiedValueToStr = (
  value?: number,
  inc?: number,
  dec?: number,
  unit?: TResourceID
) => {
  value = value ?? 0;
  let ret = `${value}`;
  inc = inc ?? 0;
  dec = dec ?? 0;
  if (inc !== 0) {
    ret += ` + ${inc}`;
  }
  if (dec !== 0) {
    ret += ` - ${dec}`;
  }
  if (inc !== 0 || dec !== 0) {
    ret = `${ret} = ${value + inc - dec}`;
  }
  if (unit !== undefined) {
    const s = idToResource[unit].forHuman ?? unit;
    ret += ` ${s}`;
  }
  return ret;
};
