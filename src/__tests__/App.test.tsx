import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { act, getByText, render, screen } from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal } from "reactn";
import { lastPromise } from "../Converter/Converters";

const click = (regex: RegExp, regex2: RegExp) => {
  act(() => {
    getByText(screen.getByText(regex), regex2).click();
  });
};

jest.mock("../localDB"); // disable load/save
test("senario1", async () => {
  initializeGlobalState();
  render(<App />);

  act(() => {
    getOnePomodoro();
  });
  expect(getGlobal().resources.pomodoro).toBe(1);

  click(/^Grandma/, /^Buy/);
  expect(getGlobal().resources.pomodoro).toBe(0);
  expect(getGlobal().converters.grandma).toBe(1);

  act(() => {
    getOnePomodoro();
  });
  expect(getGlobal().resources.pomodoro).toBe(1);

  click(/^Grandma/, /^Use 1/);
  expect(getGlobal().resources.pomodoro).toBe(0);
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Coal Mine/, /^Buy/);
  expect(getGlobal().resources.cookie).toBe(1);
  expect(getGlobal().converters.coal_mine).toBe(1);
  click(/^Iron Mine/, /^Buy/);

  const getOnePomoAndUseGrandma = () => {
    act(() => {
      getOnePomodoro();
    });
    click(/^Grandma/, /Use 1/);
  };

  getOnePomoAndUseGrandma();
  expect(getGlobal().resources.cookie).toBe(2);

  getOnePomoAndUseGrandma();
  expect(getGlobal().resources.cookie).toBe(4);

  getOnePomoAndUseGrandma();
  expect(getGlobal().resources.cookie).toBe(6);
  click(/^Coal Mine/, /Use 1/);
  expect(getGlobal().resources.coal).toBe(1);

  getOnePomoAndUseGrandma();
  expect(getGlobal().resources.cookie).toBe(3);

  getOnePomoAndUseGrandma();
  expect(getGlobal().resources.cookie).toBe(5);
  click(/^Iron Mine/, /Use 1/);
  expect(getGlobal().resources.iron_ore).toBe(1);

  getOnePomoAndUseGrandma();
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Furnace/, /Buy/);
  click(/^Workbench/, /Buy/);

  getOnePomoAndUseGrandma();
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Furnace/, /Use 1/);
  expect(getGlobal().resources.iron_ingot).toBe(1);
  click(/^Workbench/, /Use 1/);
  expect(getGlobal().resources.iron_pickaxe).toBe(1);
  await lastPromise;
  expect(getGlobal().achieved.iron_pickaxe).toBe(true);
  expect(getGlobal().records.gotPomodoro).toBe(9);
});
