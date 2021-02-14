import React from "react";
import { useEffect } from "reactn";
import { Actions } from "./Actions";
import "./App.css";
import { Inventory } from "./Inventory";
import { Pomodoro } from "./Pomodoro";
import { startGlobalTimer } from "./startGlobalTimer";

function App() {
  useEffect(startGlobalTimer, []);
  return (
    <div>
      <Pomodoro />
      {/* <Converters /> */}
      <Actions />
      <Inventory />
      {/* <Achievements /> */}
    </div>
  );
}

export default App;
