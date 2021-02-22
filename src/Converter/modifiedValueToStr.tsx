export const modifiedValueToStr = (
  value?: number,
  inc?: number,
  dec?: number,
  unit?: string
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
    ret += ` ${unit}`;
  }
  return ret;
};
