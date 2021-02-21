import { initializeGlobalState } from "./initializeGlobalState";
import { load, save } from "./localDB";
import { updateLastVisit } from "./Record/updateLastVisit";
import { updateFirstVisit } from "./Record/updateFirstVisit";

export const initWithLoad = async () => {
  await initializeGlobalState();
  await load();
  await updateFirstVisit();
  await updateLastVisit();
  await save();
};
