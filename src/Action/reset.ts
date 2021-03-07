import { ALWAYS } from "../utils/ALWAYS";
import { initializeGlobalState } from "../initializeGlobalState";
import { save } from "../localDB";
import { updateFirstVisit } from "../Record/updateFirstVisit";
import { updateLastVisit } from "../Record/updateLastVisit";

const onReset = async () => {
  await initializeGlobalState();
  await updateFirstVisit();
  await updateLastVisit();
  await save();
};

export const reset = {
  id: "reset",
  forHuman: "Complete Reset",
  description: "Notice: you will lose everything",
  onClick: onReset,
  toShow: ALWAYS,
};
