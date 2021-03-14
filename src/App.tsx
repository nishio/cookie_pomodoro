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
import { System } from "./System/System";
import { inDeveleop } from "./Action/inDeveleop";

function App() {
  useEffect(startGlobalTimer, []);
  const styleInDev = inDeveleop() ? { background: "#dfd" } : {};
  return (
    <div style={styleInDev}>
      <h1>CookiePomodoro</h1>A variant of{" "}
      <a href="https://en.wikipedia.org/wiki/Cookie_Clicker">Cookie Clicker</a>{" "}
      game, which requires a{" "}
      <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">pomodoro</a>{" "}
      instead of a click.
      <p>
        <a href="https://github.com/nishio/cookie_pomodoro/wiki/20210314">
          Thank you for your manual bug report(2021-03-14, updated)
        </a>
      </p>
      <Pomodoro />
      <Resources />
      <Converters />
      <Actions />
      <Achievements />
      <Records />
      <System />
      <MySnack />
    </div>
  );
}
export default App;
