import React, { ReactNode } from "react";
import { setGlobal, useGlobal } from "reactn";
import { getOnePomodoro } from "./getOnePomodoro";
import { toMinSec } from "./toMinSec";

export const PomodoroProgress = () => {
  const [sec] = useGlobal("pomodoroSecond");
  const fromStart = toMinSec(sec);
  const toEnd = toMinSec(25 * 60 - sec);
  const cancel = () => {
    setGlobal({ inPomodoro: false });
  };

  let state: string | ReactNode;
  if (sec < 20 * 60) {
    state = (
      <>
        Growing <button onClick={cancel}>cancel</button>
      </>
    );
  } else if (sec < 30 * 60) {
    state = <button onClick={getOnePomodoro}>harvest</button>;
  } else {
    state = (
      <>
        Overgrown <button onClick={cancel}>reset</button>
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
