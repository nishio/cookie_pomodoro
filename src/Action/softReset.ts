import { ALWAYS } from "../utils/ALWAYS";
import { getInitialGlobalState } from "../initializeGlobalState";
import { all_records } from "../Record/all_records";
import { getGlobal, setGlobal } from "reactn";
import { all_achievements } from "../Achievement/all_achievements";
import { save } from "../localDB";
import { produce } from "immer";

const onClick = () => {
  const c = getGlobal(); // current daat
  const g = getInitialGlobalState();

  const newState = produce(g, (g) => {
    all_records.forEach((r) => {
      if (r.isPermanent) {
        g.records[r.id] = c.records[r.id];
      }
    });
    all_achievements.forEach((a) => {
      if (a.isPermanent) {
        g.achieved[a.id] = c.achieved[a.id];
      }
    });
    g.temporaryEffects = c.temporaryEffects; // temporary effect is not target
    g.records.numSoftReset = (g.records.numSoftReset ?? 0) + 1;
  });
  setGlobal(newState);
  save();
};

export const softReset = {
  id: "soft_reset",
  forHuman: "Soft Reset",
  description: "Permanent [P] records and achivements do not reset",
  onClick: onClick,
  toShow: ALWAYS,
};
