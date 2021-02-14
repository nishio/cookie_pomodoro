import React from "react";
import { setGlobal, useGlobal } from "reactn";
import { PomodoroProgress } from "./PomodoroProgress";

export const Pomodoro = () => {
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
