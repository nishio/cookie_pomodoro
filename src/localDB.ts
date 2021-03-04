import Dexie from "dexie";
import { getGlobal, setGlobal } from "reactn";
import { checkLoadData, checkSaveData } from "./checkSaveData";

export interface ISave {
  id?: number; // Primary key. Optional (autoincremented)
  json: string;
}
class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  saves: Dexie.Table<ISave, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super("CookiePomodoro");
    this.version(1).stores({
      saves: "++id",
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.saves = this.table("saves");
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

export const load = () => {
  return loadRaw().then((json) => {
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
  });
};
export const save = (): Promise<number> => {
  checkSaveData();
  return localDB.saves
    .orderBy("id")
    .reverse()
    .limit(1)
    .toArray()
    .then((x) => {
      const g = getGlobal();
      if (x.length === 0) {
        return localDB.saves.add({ json: JSON.stringify(g) });
      } else {
        return localDB.saves.update(x[0].id!, { json: JSON.stringify(g) });
      }
    });
};

export const localDB = new MyAppDatabase();
