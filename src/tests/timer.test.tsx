import { render, screen } from "@testing-library/react";
import React from "react";
import { setGlobal } from "reactn";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { PomodoroProgress } from "../PomodoroProgress";
import { mockUseState } from "./mockUseState";

jest.useFakeTimers();
jest.mock("../localDB"); // disable load/save

test("pomodoro", async () => {
  const m = mockUseState();
  initializeGlobalState();
  render(<App />);
  screen.getByText("Start Pomodoro").click();
  expect(screen.getByTestId("pomodoro_status")).toContainHTML("Growing");

  setGlobal({ pomodoroSecond: 25 * 60 + 10 });
  expect(screen.getByTestId("pomodoro_status")).toContainHTML("Growing"); // why not updated?
  m.mockRestore();
});
