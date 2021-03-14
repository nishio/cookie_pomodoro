import { getGlobal, setGlobal } from "reactn";
import * as Sentry from "@sentry/react";
import { loadRaw } from "./localDB";
import { State } from "reactn/default";
import { produce } from "immer";
import { all_converters } from "./Converter/all_converters";
import { all_resources } from "./Resource/all_resources";
import { all_records } from "./Record/all_records";

export const checkSaveData = () => {
  const newData = getGlobal();
  const r = check_and_fix(newData);
  if (r.fixed) {
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
        Sentry.setContext("fixedData", r.fixed_state);
        Sentry.setContext("fixReport", r.fix_report);
        Sentry.captureMessage("Insane Save Data");
      });
    setGlobal(r.fixed_state);
  }
};

export const checkLoadData = (g: State) => {
  const r = check_and_fix(getGlobal());
  if (r.fixed) {
    Sentry.setContext("newData", g);
    Sentry.setContext("fixedData", r.fixed_state);
    Sentry.setContext("fixReport", r.fix_report);
    Sentry.captureMessage("Insane Load Data");
    setGlobal(r.fixed_state);
  }
};

const check_and_fix = (g: State) => {
  const fix_report: string[] = [];
  const fixed_state = produce(g, (g) => {
    all_resources.forEach((r) => {
      const x = g.resources[r.id];
      if (x === null || x === undefined || isNaN(x)) {
        g.resources[r.id] = 0;
        fix_report.push(`resource:${r.id}`);
      }
    });
    all_converters.forEach((c) => {
      const x = g.converters[c.id];
      if (x === null || x === undefined || isNaN(x)) {
        g.converters[c.id] = 0;
        fix_report.push(`converter:${c.id}`);
      }
    });
    all_records.forEach((r) => {
      const x = g.records[r.id];
      if (x === null || x === undefined || isNaN(x)) {
        g.records[r.id] = 0;
        fix_report.push(`record:${r.id}`);
      }
    });
  });
  return {
    fixed: fix_report.length > 0,
    fix_report,
    fixed_state,
  };
};

export const setDefaultValue = (g: State) => {
  const r = check_and_fix(g);
  if (r.fixed) {
    setGlobal(r.fixed_state);
  }
};
