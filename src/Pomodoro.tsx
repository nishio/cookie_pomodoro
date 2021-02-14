import React from "react";
import { setGlobal, useGlobal } from "reactn";
import { PomodoroProgress } from "./PomodoroProgress";

export const Pomodoro = () => {
  const [inPomodoro] = useGlobal("inPomodoro");
  const onClick = () => {
    setGlobal({
      inPomodoro: true,
      pomodoroStartTime: Date.now(),
      pomodoroSecond: 0,
    });
  };

  return (
    <div>
      <h2>Pomodoro</h2>
      {inPomodoro ? (
        <PomodoroProgress />
      ) : (
        <button onClick={onClick}>Start Pomodoro</button>
      )}
    </div>
  );
};
