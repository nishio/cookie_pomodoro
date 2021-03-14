import React, { ReactNode } from "react";
import { setGlobal, useGlobal } from "reactn";
import { getOnePomodoro } from "./getOnePomodoro";
import { save } from "./localDB";
import { toMinSec } from "./utils/toMinSec";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Github } from "./Resource/Github";

const TimeToMature = 25 * 60;
const TimeToOvergrow = 60 * 60;
export const PomodoroProgress = () => {
  const [sec] = useGlobal("pomodoroSecond");
  const fromStart = toMinSec(sec);
  const toMature = toMinSec(TimeToMature - sec);
  const toOvergrow = toMinSec(TimeToMature + TimeToOvergrow - sec);
  const cancel = () => {
    setGlobal({ inPomodoro: false });
    save();
  };

  const harvest = () => {
    window.gtag("event", "harvest");
    getOnePomodoro();
    cancel();
  };

  let state: string | ReactNode;
  if (sec < TimeToMature) {
    const percent = (100 * sec) / TimeToMature;
    state = (
      <>
        <LinearProgress variant="determinate" value={percent} />
        {fromStart} / Mature to {toMature} ({percent.toFixed(2)} %)
        <br />
        <span data-testid="pomodoro_status">Growing</span>{" "}
        <button onClick={cancel}>cancel</button>
      </>
    );
  } else if (sec < TimeToMature + TimeToOvergrow) {
    state = (
      <>
        <LinearProgress
          variant="determinate"
          value={(100 * (sec - TimeToMature)) / TimeToOvergrow}
        />
        {fromStart} / Overgrow to {toOvergrow} <br />
        <button onClick={harvest}>harvest</button>
        <Github filename="getOnePomodoro.ts" />
      </>
    );
  } else {
    state = (
      <>
        Overgrown <button onClick={cancel}>reset</button>
      </>
    );
  }
  return <span id="pomodoro-progress">{state}</span>;
};
