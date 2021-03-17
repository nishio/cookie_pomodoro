import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { act, getByText, render, screen } from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal } from "reactn";
import { mockUseState } from "./mockUseState";
import { mockSetGlobal } from "../testutil/mockSetGlobal";
import {
  checkAchievements,
  getLastAchieved,
  resetLastAchieved,
} from "../Achievement/checkAchievements";
import { TAchievementID } from "../all_ids";
import { updateGlobal } from "../utils/updateGlobal";

jest.mock("../localDB"); // disable load/save

let mockAddSnack: jest.SpyInstance<any, unknown[]>;
beforeEach(() => {
  const MySnack = require("../Mysnack");
  mockAddSnack = jest.spyOn(MySnack, "addSnack").mockImplementation(() => {});
  resetLastAchieved();
});

afterEach(() => {
  mockAddSnack.mockRestore();
});

export const click = (regex: RegExp, regex2?: RegExp) => {
  if (regex2 !== undefined) {
    act(() => {
      getByText(screen.getByText(regex), regex2).click();
    });
  } else {
    screen.getByText(regex).click();
  }
};

export const expectAchieve = (xs?: TAchievementID[]) => {
  checkAchievements();
  if (xs === undefined) {
    console.log("expect:", getLastAchieved());
    return;
  }
  expect(getLastAchieved()).toStrictEqual(xs);
  resetLastAchieved();
};

test("senario_start", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  await initializeGlobalState();
  render(<App />);
  await getOnePomodoro();
  expect(getGlobal().resources.pomodoro).toBe(1);
  expectAchieve(["pomodoro1"]);

  click(/^Grandma/, /^Buy/);
  expect(getGlobal().resources.pomodoro).toBe(0);
  expect(getGlobal().converters.grandma).toBe(1);
  expectAchieve([]);

  await getOnePomodoro();
  expect(getGlobal().resources.pomodoro).toBe(1);

  click(/^Grandma/, /^Use 1/);
  expect(getGlobal().resources.pomodoro).toBe(0);
  expect(getGlobal().resources.cookie).toBe(2);
  expectAchieve(["cookie1"]);

  click(/^Coal Mine/, /^Buy/);
  expect(getGlobal().resources.cookie).toBe(1);
  expect(getGlobal().converters.coal_mine).toBe(1);
  click(/^Iron Mine/, /^Buy/);
  expectAchieve([]);

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(2);
  expectAchieve([]);

  await getOnePomodoro();
  expectAchieve(["pomodoro4"]);
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(4);
  expect(getGlobal().resources.mana).toBe(0);
  expectAchieve(["cookie3"]);

  await getOnePomodoro();
  expectAchieve(["pomodoro5"]);
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(6);
  expectAchieve(["cookie5"]);
  click(/^Coal Mine/, /Use 1/);
  expect(getGlobal().resources.coal).toBe(1);
  expect(getGlobal().resources.mana).toBe(0);
  expectAchieve(["coal", "mana"]);

  await getOnePomodoro();
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(3);
  expect(getGlobal().resources.mana).toBe(8);
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
  expectAchieve([]);

  await getOnePomodoro();
  expectAchieve(["pomodoro9"]);
  click(/^Grandma/, /Use 1/);
  expect(getGlobal().resources.cookie).toBe(2);
  click(/^Furnace/, /Use 1/);
  expect(getGlobal().resources.iron_ingot).toBe(1);
  expectAchieve(["iron_ingot"]);
  click(/^Workbench/, /Use 1/);
  expect(getGlobal().resources.iron_pickaxe).toBe(1);
  expectAchieve(["iron_pickaxe"]);

  expect(getGlobal().achieved.iron_pickaxe).toBe(true);
  expect(getGlobal().records.gotPomodoro).toBe(9);
  expect(getGlobal().resources.mana).toBe(34);

  await getOnePomodoro();
  expect(getGlobal().records.totalAmountOfResources).toBe(50);
  expect(getGlobal().records.totalAmountOfResources10).toBe(50);
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

test("human eats foods", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  initializeGlobalState();
  updateGlobal((g) => {
    g.converters.human = 5;
    g.resources.cookie = 7;
    g.resources.apple = 2;
  });
  render(<App />);
  await getOnePomodoro();
  let g = getGlobal();
  expect(g.resources.cookie).toBe(2);
  expect(g.records.cumulative_population).toBe(5);
  expect(g.records.food_stock).toBe(4);

  getOnePomodoro();
  g = getGlobal();
  expect(g.resources.cookie).toBe(0);
  expect(g.resources.apple).toBe(0);
  expect(g.records.food_stock).toBe(0);
  expect(g.converters.human).toBe(4);
  expect(g.records.starvation).toBe(1);
  expect(g.records.cumulative_population).toBe(9);

  m.mockRestore();
  m2.mockRestore();
});

test("grandma drink wines", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  initializeGlobalState();
  updateGlobal((g) => {
    g.converters.grandma = 3;
    g.converters.grape_tree = 1;
    g.resources.wine = 5;
  });
  render(<App />);
  screen.getByText("Drink Wine").click();
  let g = getGlobal();
  expect(g.resources.wine).toBe(2);
  expect(screen.getByText("1 + 1 = 2 Wine")).toBeTruthy();
  m.mockRestore();
  m2.mockRestore();
});

test("bug softreset make achievements", async () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  initializeGlobalState();
  render(<App />);
  screen.getByText("Soft Reset").click();
  let g = getGlobal();
  expect(g.achieved.pomodoro2817).toBeUndefined();
  expect("pomodoro2817" in g.achieved).toBeFalsy(); // fixed bug
  m.mockRestore();
  m2.mockRestore();
});

export const repeat = (n: number, f: () => unknown) => {
  for (let i = 0; i < n; i++) {
    f();
  }
};
