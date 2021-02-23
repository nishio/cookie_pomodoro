import React, { ReactNode } from "react";
import { setGlobal, useGlobal } from "reactn";
import { getOnePomodoro } from "./getOnePomodoro";
import { save } from "./localDB";
import { toMinSec } from "./toMinSec";
import LinearProgress from "@material-ui/core/LinearProgress";

const TimeToMature = 20 * 60;
const TimeToOvergrow = 60 * 60;
export const PomodoroProgress = () => {
  const [sec] = useGlobal("pomodoroSecond");
  const fromStart = toMinSec(sec);
  const toEnd = toMinSec(25 * 60 - sec);
  const cancel = async () => {
    await setGlobal({ inPomodoro: false });
    await save();
  };

  const harvest = async () => {
    await getOnePomodoro();
    await cancel();
  };
  let state: string | ReactNode;
  if (sec < TimeToMature) {
    state = (
      <>
        <LinearProgress
          variant="determinate"
          value={(100 * sec) / TimeToMature}
        />
        Growing <button onClick={cancel}>cancel</button>
      </>
    );
  } else if (sec < TimeToMature + TimeToOvergrow) {
    state = (
      <>
        <LinearProgress
          variant="determinate"
          value={(100 * (sec - TimeToMature)) / TimeToOvergrow}
        />

        <button onClick={harvest}>harvest</button>
      </>
    );
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
