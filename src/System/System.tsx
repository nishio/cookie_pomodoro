import React from "react";
import { Github } from "../Resource/Github";
import { exportSaveData } from "./exportSaveData";
import { importSaveData } from "./importSaveData";

export const System = () => {
  return (
    <div>
      <h2>
        System
        <Github filename="System/System.tsx" />
      </h2>
      <button onClick={exportSaveData}>Export Save Data</button>
      <button onClick={importSaveData}>Import Save Data</button>
    </div>
  );
};
