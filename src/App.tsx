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

function App() {
  useEffect(startGlobalTimer, []);
  return (
    <div>
      <h1>CookiePomodoro</h1>
      <Pomodoro />
      <Resources />
      <Converters />
      <Actions />
      <Achievements />
      <Records />
    </div>
  );
}

export default App;
