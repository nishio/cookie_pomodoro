import { getGlobal, setGlobal } from "reactn";

export const updateLastVisit = () => {
  setGlobal((g) => {
    return { records: { ...g.records, lastVisit: Date.now() } };
  });
};
