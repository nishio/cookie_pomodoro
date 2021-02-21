import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { load } from "../localDB";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal } from "reactn";
test("App", () => {
  initializeGlobalState();
  load();
  render(<App />);
});

test("load", () => {
  initializeGlobalState();
  render(<App />);
  act(() => {
    getOnePomodoro();
  });
  expect(getGlobal().resources.pomodoro).toBe(1);
  // act(() => {
  //   screen.getByText("Buy(1 pomodoro)").click();
  // });
});
