import { initializeGlobalState } from "./initializeGlobalState";
import { save } from "./localDB";
import { updateFirstVisit } from "./updateFirstVisit";
import { updateLastVisit } from "./updateLastVisit";

export const reset = async () => {
  await initializeGlobalState();
  await updateFirstVisit();
  await updateLastVisit();
  await save();
};
