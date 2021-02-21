import React from "react";
import { useEffect } from "reactn";
import { Achievements } from "./Achievements";
import { Actions } from "./Actions";
import "./App.css";
import { Converters } from "./Converters";
import { Inventory } from "./Inventory";
import { Pomodoro } from "./Pomodoro";
import { Records } from "./Records";
import { startGlobalTimer } from "./startGlobalTimer";

function App() {
  useEffect(startGlobalTimer, []);
  return (
    <div>
      <h1>CookiePomodoro</h1>
      <Pomodoro />
      <Converters />
      <Actions />
      <Inventory />
      <Achievements />
      <Records />
    </div>
  );
}

export default App;
