import { initializeGlobalState } from "./initializeGlobalState";
import { load, save } from "./localDB";
import { updateLastVisit } from "./updateLastVisit";
import { updateFirstVisit } from "./updateFirstVisit";

export const initWithLoad = async () => {
  await initializeGlobalState();
  await load();
  await updateFirstVisit();
  await updateLastVisit();
  await save();
};
