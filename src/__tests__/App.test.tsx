import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { act, getByText, render, screen } from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal } from "reactn";
import { lastPromise } from "../Converter/Converters";
import { mockUseState } from "../mockUseState";
import { mockSetGlobal } from "../mockSetGlobal";
import {
  checkAchievements,
  getLastAchieved,
  resetLastAchieved,
} from "../Achievement/checkAchievements";

const click = (regex: RegExp, regex2: RegExp) => {
  act(() => {
    getByText(screen.getByText(regex), regex2).click();
  });
};

jest.mock("../localDB"); // disable load/save

test("senario1", async () => {
  mockUseState();
  await initializeGlobalState();
  render(<App />);
  mockSetGlobal();
  await getOnePomodoro();
  expect(getGlobal().resources.pomodoro).toBe(1);
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["pomodoro1"]);
  resetLastAchieved();

  click(/^Grandma/, /^Buy/);
  expect(getGlobal().resources.pomodoro).toBe(0);
  expect(getGlobal().converters.grandma).toBe(1);
  expect(getLastAchieved()).toStrictEqual([]);

  await getOnePomodoro();
  expect(getGlobal().resources.pomodoro).toBe(1);

  click(/^Grandma/, /^Use 1/);
  expect(getGlobal().resources.pomodoro).toBe(0);
  expect(getGlobal().resources.cookie).toBe(2);
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["cookie1", "cookie2"]);
  resetLastAchieved();

  click(/^Coal Mine/, /^Buy/);
  expect(getGlobal().resources.cookie).toBe(1);
  expect(getGlobal().converters.coal_mine).toBe(1);
  click(/^Iron Mine/, /^Buy/);
  expect(getLastAchieved()).toStrictEqual([]);

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(2);
  expect(getLastAchieved()).toStrictEqual([]);

  await getOnePomodoro();
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["pomodoro4"]);
  resetLastAchieved();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(4);
  expect(getGlobal().resources.mana).toBe(0);
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["cookie3"]);
  resetLastAchieved();

  await getOnePomodoro();
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["pomodoro5"]);
  resetLastAchieved();

  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(6);
  click(/^Coal Mine/, /Use 1/);
  expect(getGlobal().resources.coal).toBe(1);
  expect(getGlobal().resources.mana).toBe(0);
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["coal"]);
  resetLastAchieved();

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(3);
  expect(getGlobal().resources.mana).toBe(0);
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["mana"]);
  resetLastAchieved();

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(5);
  click(/^Iron Mine/, /Use 1/);
  expect(getGlobal().resources.iron_ore).toBe(1);
  expect(getGlobal().resources.mana).toBe(8);
  expect(getLastAchieved()).toStrictEqual([]);

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Furnace/, /Buy/);
  click(/^Workbench/, /Buy/);
  expect(getLastAchieved()).toStrictEqual(["iron"]);
  resetLastAchieved();

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Furnace/, /Use 1/);
  expect(getGlobal().resources.iron_ingot).toBe(1);
  click(/^Workbench/, /Use 1/);
  expect(getGlobal().resources.iron_pickaxe).toBe(1);
  await lastPromise;
  checkAchievements();
  expect(getGlobal().achieved.iron_pickaxe).toBe(true);
  expect(getGlobal().records.gotPomodoro).toBe(9);
  expect(getGlobal().resources.mana).toBe(25);
});
