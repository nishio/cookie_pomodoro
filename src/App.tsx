import React, { ReactNode } from "react";
import {
  getGlobal,
  setGlobal,
  useDispatch,
  useEffect,
  useGlobal,
} from "reactn";
import { Actions } from "./Actions";
import "./App.css";
import { Inventory } from "./Inventory";

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

const toMinSec = (sec: number) => {
  const minus = sec < 0 ? "-" : "";
  if (sec < 0) {
    sec *= -1;
  }
  const min = Math.floor(sec / 60);
  const s = sec - 60 * min;
  return `${minus}${min}:${s.toString().padStart(2, "0")}`;
};

const startGlobalTimer = () => {
  window.setInterval(() => {
    const g = getGlobal();
    if (g.inPomodoro) {
      const ms = Date.now() - g.pomodoroStartTime;
      setGlobal({ pomodoroSecond: Math.floor(ms / 1000) });
    }
  }, 500);
};

const PomodoroProgress = () => {
  const [sec] = useGlobal("pomodoroSecond");
  const fromStart = toMinSec(sec);
  const toEnd = toMinSec(25 * 60 - sec);
  const cancel = () => {
    setGlobal({ inPomodoro: false });
  };
  const getOne = useDispatch((x) => x + 1, "pomodoro");

  let state: string | ReactNode;
  if (sec < 20 * 60) {
    state = (
      <>
        growing <button onClick={cancel}>cancel</button>
      </>
    );
  } else if (sec < 30 * 60) {
    state = <button onClick={getOne}>harvest</button>;
  } else {
    state = (
      <>
        overgrown <button onClick={cancel}>reset</button>
      </>
    );
  }
  return (
    <span id="pomodoro-progress">
      {fromStart} / {toEnd} <br />
      {state}
    </span>
  );
};

const Pomodoro = () => {
  const [inPomodoro] = useGlobal("inPomodoro");
  if (inPomodoro) {
    return <PomodoroProgress />;
  } else {
    const onClick = () => {
      setGlobal({
        inPomodoro: true,
        pomodoroStartTime: Date.now(),
        pomodoroSecond: 0,
      });
    };
    return <button onClick={onClick}>start pomodoro</button>;
  }
};
export default App;
