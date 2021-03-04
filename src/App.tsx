import React from "react";
import { useEffect } from "reactn";
import { Achievements } from "./Achievement/Achievements";
import { Actions } from "./Action/Actions";
import "./App.css";
import { Converters } from "./Converter/Converters";
import { Resources } from "./Resource/Resources";
import { Pomodoro } from "./Pomodoro";
import { Records } from "./Record/Records";
import { startGlobalTimer } from "./startGlobalTimer";
import { MySnack } from "./MySnack";
import { exportSaveData } from "./exportSaveData";
import { importSaveData } from "./importSaveData";

function App() {
  useEffect(startGlobalTimer, []);
  return (
    <div>
      <h1>CookiePomodoro</h1>A variant of{" "}
      <a href="https://en.wikipedia.org/wiki/Cookie_Clicker">Cookie Clicker</a>{" "}
      game, which requires a{" "}
      <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">pomodoro</a>{" "}
      instead of a click.
      <Pomodoro />
      <Resources />
      <Converters />
      <Actions />
      <Achievements />
      <Records />
      <hr />
      <button onClick={exportSaveData}>Export Save Data</button>
      <button onClick={importSaveData}>Import Save Data</button>
      <MySnack />
    </div>
  );
}

export default App;
