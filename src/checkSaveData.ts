import { getGlobal, setGlobal } from "reactn";
import { TRecordID, TResourceID } from "./all_ids";
import * as Sentry from "@sentry/react";
import { loadRaw } from "./localDB";
import { State } from "reactn/default";
import { produce } from "immer";

export const checkSaveData = () => {
  if (isInsane(getGlobal())) {
    const newData = getGlobal();
    let prevData: any = null;
    loadRaw()
      .then((json) => {
        if (json !== null) {
          prevData = JSON.parse(json);
        }
      })
      .then(() => {
        Sentry.setContext("prevData", prevData);
        Sentry.setContext("newData", newData);
        Sentry.captureMessage("Insane Save Data");
      });
    setDefaultValue(newData);
  }
};

export const checkLoadData = (g: State) => {
  if (isInsane(g)) {
    Sentry.setContext("newData", g);
    Sentry.captureMessage("Insane Load Data");
    setDefaultValue(g);
  }
};

const isInsane = (g: State) => {
  {
    let id: TResourceID;
    for (id in g.resources) {
      const x = g.resources[id];
      if (x === null || x === undefined || isNaN(x)) {
        return true;
      }
    }
  }
  {
    let id: TRecordID;
    for (id in g.records) {
      const x = g.records[id];
      if (x === null || x === undefined || isNaN(x)) {
        return true;
      }
    }
  }
};

export const setDefaultValue = (g: State) => {
  setGlobal(
    produce(g, (g) => {
      {
        let id: TResourceID;
        for (id in g.resources) {
          const x = g.resources[id];
          if (x === null || x === undefined || isNaN(x)) {
            g.resources[id] = 0;
          }
        }
      }
      {
        let id: TRecordID;
        for (id in g.records) {
          const x = g.records[id];
          if (x === null || x === undefined || isNaN(x)) {
            g.records[id] = 0;
          }
        }
      }
    })
  );
};
