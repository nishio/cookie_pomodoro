import Dexie from "dexie";
import { getGlobal, setGlobal } from "reactn";

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
  loadRaw().then((json) => {
    if (json !== null) {
      setGlobal(JSON.parse(json));
    }
  });
};
export const save = (): Promise<number> => {
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
