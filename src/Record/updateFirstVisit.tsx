import { getGlobal, setGlobal } from "reactn";

export const updateFirstVisit = () => {
  const g = getGlobal();
  if (g.records.firstVisit === undefined) {
    return setGlobal((g) => {
      return {
        records: { ...g.records, firstVisit: Date.now() },
      };
    });
  }
};
