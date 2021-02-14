import React, { ReactNode } from "react";
import { setGlobal, useDispatch, useGlobal } from "reactn";
import { toMinSec } from "./toMinSec";

export const PomodoroProgress = () => {
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
