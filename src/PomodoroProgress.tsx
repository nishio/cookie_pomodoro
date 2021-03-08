import React, { ReactNode } from "react";
import { setGlobal, useGlobal } from "reactn";
import { getOnePomodoro } from "./getOnePomodoro";
import { save } from "./localDB";
import { toMinSec } from "./utils/toMinSec";
import LinearProgress from "@material-ui/core/LinearProgress";

const TimeToMature = 25 * 60;
const TimeToOvergrow = 60 * 60;
export const PomodoroProgress = () => {
  const [sec] = useGlobal("pomodoroSecond");
  const fromStart = toMinSec(sec);
  const toMature = toMinSec(TimeToMature - sec);
  const toOvergrow = toMinSec(TimeToMature + TimeToOvergrow - sec);
  const cancel = async () => {
    await setGlobal({ inPomodoro: false });
    await save();
  };

  const harvest = async () => {
    window.gtag("event", "harvest");
    window.gtag("event", "click", { event_label: "harvest_button" });
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
        {fromStart} / Mature to {toMature} <br />
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
        {fromStart} / Overgrow to {toOvergrow} <br />
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
  return <span id="pomodoro-progress">{state}</span>;
};
