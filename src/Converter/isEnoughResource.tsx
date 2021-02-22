import { State } from "reactn/default";
import { TConverter } from "./all_converters";
import { TResourceID } from "../Resource/all_resources";

export function isEnoughResource(
  g: State,
  c: TConverter,
  decreaseCost: {
    [key in TResourceID]: number;
  }
) {
  return c.froms.every(([unit, value]) => {
    return g.resources[unit] >= value - (decreaseCost[unit] ?? 0);
  });
}
