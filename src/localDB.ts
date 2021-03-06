import Dexie from "dexie";
import { getGlobal, setGlobal } from "reactn";
import { checkLoadData, checkSaveData } from "./checkSaveData";
import { getDateStr } from "./utils/getDateStr";

export interface ISave {
  id?: number; // Primary key. Optional (autoincremented)
  json: string;
}
export interface IDailyBackup {
  id: string;
  json: string;
}
class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  saves: Dexie.Table<ISave, number>; // number = type of the primkey
  dailyBackup: Dexie.Table<IDailyBackup, string>;
  //...other tables goes here...

  constructor() {
    super("CookiePomodoro");
    this.version(1).stores({
      saves: "++id",
      //...other tables goes here...
    });
    this.version(2).stores({
      saves: "++id",
      dailyBackup: "id",
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.saves = this.table("saves");
    this.dailyBackup = this.table("dailyBackup");
  }
}

export const loadRaw = async (): Promise<string | null> => {
  const x = await localDB.saves.orderBy("id").reverse().limit(1).toArray();
  if (x.length === 0) {
    return null;
  } else {
    return x[0].json;
  }
};

const loadJSON = (json: string | null) => {
  if (json !== null) {
    const value = JSON.parse(json);
    // rename
    if (value.converters.furnace_for_iron) {
      value.converters.furnace =
        (value.converters.furnace ?? 0) +
        (value.converters.furnace_for_iron ?? 0);
      value.converters.furnace_for_iron = undefined;
    }
    if (value.converters.workbench_for_iron_pickaxe) {
      value.converters.workbench =
        (value.converters.workbench ?? 0) +
        (value.converters.workbench_for_iron_pickaxe ?? 0);
      value.converters.workbench_for_iron_pickaxe = undefined;
    }
    checkLoadData(value);
    return setGlobal(value);
  }
};

export const load = () => {
  return loadRaw().then(loadJSON);
};

export const save = (): Promise<unknown> => {
  checkSaveData();

  const g = getGlobal();
  return localDB.saves
    .orderBy("id")
    .reverse()
    .limit(1)
    .toArray()
    .then((x) => {
      if (x.length === 0) {
        return localDB.saves.add({ json: JSON.stringify(g) });
      } else {
        return localDB.saves.update(x[0].id!, { json: JSON.stringify(g) });
      }
    })
    .then(() => {
      const today = getDateStr();
      return localDB.dailyBackup.put(
        {
          id: today,
          json: JSON.stringify(g),
        },
        today
      );
    });
};

export const recover = (): Promise<unknown> => {
  return localDB.dailyBackup
    .orderBy("id")
    .reverse()
    .limit(2)
    .toArray()
    .then((xs) => {
      const today = getDateStr();
      let json: string;
      if (xs.length === 0) {
        alert("no data to recover");
        return;
      } else if (xs.length === 1) {
        if (xs[0].id === today) {
          alert("no data to recover");
          return;
        }
        json = xs[0].json;
      } else {
        if (xs[0].id === today) {
          json = xs[1].json;
        } else {
          json = xs[0].json;
        }
      }
      return loadJSON(json);
    });
};

export const localDB = new MyAppDatabase();
