import { getGlobal, setGlobal } from "reactn";

export const updateFirstVisit = () => {
  const g = getGlobal();
  if (g.records.firstVisit === undefined || g.records.firstVisit === 0) {
    return setGlobal((g) => {
      return {
        records: { ...g.records, firstVisit: Date.now() },
      };
    });
  }
};
