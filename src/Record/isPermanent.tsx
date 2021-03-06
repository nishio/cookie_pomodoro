/**
 * If x.isPermanent for x in Record or Achievement,
 * x keeps value after soft-reset (./Action/softReset.ts)
 */

import { TAchievement } from "../Achievement/TAchievement";
import { TRecord } from "./TRecord";

export const isPermanent = (x: TAchievement | TRecord) => {
  if (x.isPermanent) {
    return (
      <a href="https://github.com/nishio/cookie_pomodoro/blob/main/src/Record/isPermanent.tsx">
        [P]
      </a>
    );
  }
  return null;
};
