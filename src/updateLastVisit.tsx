import { getGlobal, setGlobal } from "reactn";

export const updateLastVisit = () => {
  const g = getGlobal();
  setGlobal({ records: { ...g.records, lastVisit: Date.now() } });
};
