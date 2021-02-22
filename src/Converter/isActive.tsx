import { State } from "reactn/default";
import { TConverter } from "./all_converters";

export function isActive(g: State, c: TConverter) {
  return (g.activeConverters[c.id] ?? 0) > 0;
}
