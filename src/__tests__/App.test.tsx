import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { act, getByText, render, screen } from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal, setGlobal, useGlobal } from "reactn";
import { lastPromise } from "../Converter/Converters";
import { mockUseState } from "../testutil/mockUseState";
import { mockSetGlobal } from "../testutil/mockSetGlobal";
import {
  checkAchievements,
  getLastAchieved,
  resetLastAchieved,
} from "../Achievement/checkAchievements";
import { TAchievementID } from "../all_ids";
import * as MySnack from "../MySnack";

let mockAddSnack: jest.SpyInstance<any, unknown[]>;
beforeEach(() => {
  const MySnack = require("../Mysnack");
  mockAddSnack = jest.spyOn(MySnack, "addSnack").mockImplementation(() => {});
  resetLastAchieved();
});

afterEach(() => {
  mockAddSnack.mockRestore();
});

const click = (regex: RegExp, regex2: RegExp) => {
  act(() => {
    getByText(screen.getByText(regex), regex2).click();
  });
};

const expectAchieve = (xs: TAchievementID[]) => {
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(xs);
  resetLastAchieved();
};

jest.mock("../localDB"); // disable load/save

test("senario1", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  await initializeGlobalState();
  render(<App />);
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
  expect(getLastAchieved()).toStrictEqual(["cookie1"]);
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
  expectAchieve([]);

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(5);
  click(/^Iron Mine/, /Use 1/);
  expect(getGlobal().resources.iron_ore).toBe(1);
  expectAchieve(["iron"]);

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Furnace/, /Buy/);
  click(/^Workbench/, /Buy/);
  expectAchieve(["mana"]);

  await getOnePomodoro();
  expect(getLastAchieved()).toStrictEqual(["pomodoro9"]);
  resetLastAchieved();

  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Furnace/, /Use 1/);
  expect(getGlobal().resources.iron_ingot).toBe(1);
  click(/^Workbench/, /Use 1/);
  expect(getGlobal().resources.iron_pickaxe).toBe(1);
  await lastPromise;
  expect(getLastAchieved()).toStrictEqual(["iron_pickaxe"]);
  resetLastAchieved();
  expect(getGlobal().achieved.iron_pickaxe).toBe(true);
  expect(getGlobal().records.gotPomodoro).toBe(9);
  expect(getGlobal().resources.mana).toBe(8);

  await getOnePomodoro();
  expect(getGlobal().records.totalAmountOfResources).toBe(22);
  m.mockRestore();
  m2.mockRestore();
});

test("softReset", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  await initializeGlobalState();
  render(<App />);
  await getOnePomodoro();
  expect(getGlobal().resources.pomodoro).toBe(1);
  checkAchievements();
  expect(getLastAchieved()).toStrictEqual(["pomodoro1"]);
  resetLastAchieved();

  screen.getByText("Soft Reset").click();
  const g = getGlobal();
  expect(g.achieved.pomodoro1).toBeFalsy();
  expect(g.records.gotPomodoro).toBe(1);
  expect(g.records.gotPomodoro_t1).toBe(0);
  expect(g.records.numSoftReset).toBe(1);
  m.mockRestore();
  m2.mockRestore();
});

const Foo = () => {
  const [g] = useGlobal();
  const items = g.items.map((e, index) => {
    return null;
  });
  return <>{items}</>;
};
test("foo1", async () => {
  let m = mockUseState();
  let m2 = mockSetGlobal();
  await setGlobal({ items: [] });
  render(<Foo />);
  m.mockRestore();
  m2.mockRestore();
  m = mockUseState();
  m2 = mockSetGlobal();
  await setGlobal({ items: [] });
  m.mockRestore();
  m2.mockRestore();
});

test("foo2", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  await setGlobal({ items: [] });
  render(<Foo />);
  await setGlobal({ items: [] });
  m.mockRestore();
  m2.mockRestore();
});
