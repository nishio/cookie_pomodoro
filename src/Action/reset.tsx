import { initializeGlobalState } from "../initializeGlobalState";
import { save } from "../localDB";
import { updateFirstVisit } from "../Record/updateFirstVisit";
import { updateLastVisit } from "../Record/updateLastVisit";

export const reset = async () => {
  await initializeGlobalState();
  await updateFirstVisit();
  await updateLastVisit();
  await save();
};
