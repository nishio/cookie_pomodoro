import React from "react";
import { setGlobal, useGlobal } from "reactn";
import { save } from "./localDB";
import { notify } from "./System/notify";
import { PomodoroProgress } from "./PomodoroProgress";

export const Pomodoro = () => {
  const [inPomodoro] = useGlobal("inPomodoro");
  const onClick = () => {
    setGlobal({
      inPomodoro: true,
      pomodoroStartTime: Date.now(),
      pomodoroSecond: 0,
      temporaryEffects: [],
    });
    setTimeout(notify, 25 * 60 * 1000);
    save();
  };

  return (
    <div>
      <h2>Pomodoro</h2>
      <div id="pomodoro">
        {inPomodoro ? (
          <PomodoroProgress />
        ) : (
          <button onClick={onClick}>Start Pomodoro</button>
        )}
      </div>
    </div>
  );
};
