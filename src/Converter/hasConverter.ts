import { State } from "reactn/default";
import { TConverterID } from "./all_converters";

export const hasConverter = (id: TConverterID) => {
  return (g: State) => {
    return g.converters[id] >= 1;
  };
};
