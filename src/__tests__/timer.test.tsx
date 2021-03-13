import { render, screen } from "@testing-library/react";
import React from "react";
import { setGlobal } from "reactn";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { PomodoroProgress } from "../PomodoroProgress";
import { mockSetGlobal } from "../testutil/mockSetGlobal";
import { mockUseState } from "../testutil/mockUseState";

jest.useFakeTimers();
jest.mock("../localDB"); // disable load/save

test("pomodoro", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  await initializeGlobalState();
  render(<App />);
  screen.getByText("Start Pomodoro").click();
  console.log(screen.getByText(/0:/).innerHTML);
  await setGlobal({ pomodoroSecond: 10 });
  console.log(screen.getByText(/0:/).innerHTML); // why 0:00??
  m.mockRestore();
  m2.mockRestore();
});
