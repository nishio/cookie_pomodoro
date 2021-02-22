import { State } from "reactn/default";
import { TConverterID } from "../all_ids";

export const dontHaveConverter = (id: TConverterID, g: State) => {
  const num = g.converters[id] ?? 0;
  return num === 0;
};
