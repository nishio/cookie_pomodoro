import React from "react";
import App from "../App";
import { act, getByText, render, screen } from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal } from "reactn";
import { click, repeat, expectAchieve } from "./App.test";
import { before, after } from "./before_after";

jest.mock("../localDB"); // disable load/save
beforeEach(before);
afterEach(after);

test("senario_coal", () => {
  render(<App />);

  getOnePomodoro();
  click(/^Grandma/, /^Buy/);

  getOnePomodoro();
  click(/^Grandma/, /^Use/);
  click(/^Coal Mine/, /^Buy/);
  click(/^Iron Mine/, /^Buy/);

  repeat(8, getOnePomodoro);
  expectAchieve([
    "pomodoro1",
    "cookie1",
    "pomodoro2",
    "pomodoro4",
    "pomodoro5",
    "has_pomodoro4",
    "pomodoro9",
    "mana",
    "idle_assets",
  ]);
  click(/^Grandma/, /^Buy/);
  click(/^Grandma/, /^Buy/);
  expectAchieve(["three_grandma"]);

  getOnePomodoro();
  click(/^Grandma/, /^Use 3/);
  expectAchieve(["cookie3", "cookie5", "cookie8"]);
  click(/^Coal Mine/, /^Use 1/);
  click(/^Iron Mine/, /^Use 1/);
  expectAchieve(["coal", "iron"]);
  click(/^Furnace/, /^Buy/);
  click(/^Workbench/, /^Buy/);

  getOnePomodoro();
  click(/^Furnace/, /^Use/);
  click(/^Workbench/, /^Use/);
  expectAchieve(["iron_ingot", "iron_pickaxe"]);

  getOnePomodoro();
  getOnePomodoro();
  expectAchieve(["pomodoro14"]);
  click(/^Grandma/, /^Use 3/);
  click(/^Coal Mine/, /^Use 1/);
  click(/^Iron Mine/, /^Use 1/);

  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });

  click(/^Workbench/, /^Use/);
  expectAchieve(["iron_pickaxe2"]);

  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });
  click(/^Workbench/, /^Use/); // thrid pickaxe

  getOnePomodoro();
  expectAchieve(["mana100"]);
  let g = getGlobal();
  expect(g.resources.mana).toBe(100);
  expect(g.resources.coal).toBe(0);

  screen.getByText(/^No hunger/).click();
  click(/^Grandma/, /^Use 1/);
  click(/^Coal Mine/, /^Use 1/);
  repeat(3, () => {
    act(() => {
      getByText(screen.getByTestId(/^action/), /^Burn coal/).click();
    });
  });
  expect(screen.getByText(/16 Cookie/)).toBeTruthy();
  click(/^Grandma/, /^Use 1/);
  expectAchieve(["cookie13"]);
  click(/^Grandma/, /^Use 1/);
  click(/^Iron Mine/, /^Use/);

  getOnePomodoro();
  click(/^Grandma/, /^Buy/);
  click(/^Coal Mine/, /^Use/);
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });
  click(/^Workbench/, /^Use/);
  expectAchieve(["cookie21", "iron_pickaxe4"]);

  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });

  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });

  getOnePomodoro();
  click(/^Coal Mine/, /^Use/);
  act(() => {
    getByText(screen.getByTestId(/^1 Steel/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Steel Pickaxe/), /^Use 1/).click();
  });
  expectAchieve(["steel", "steel_pickaxe"]);
  click(/^Coal Mine/, /^Buy/);
  click(/^Coal Mine/, /^Buy/);

  getOnePomodoro();
  click(/^Coal Mine/, /^Use 2/);
  screen.getByText(/^No hunger/).click();
  repeat(12, () => {
    act(() => {
      getByText(screen.getByTestId(/^action/), /^Burn coal/).click();
    });
  });
  click(/^Grandma/, /^Use 1/);
  click(/^Coal Mine/, /^Use/);
  repeat(5, () => {
    act(() => {
      getByText(screen.getByTestId(/^action/), /^Burn coal/).click();
    });
  });
  click(/^Grandma/, /^Use 3/);
  expectAchieve(["cookie34", "cookie55", "cookie89", "cookie144", "cookie233"]);

  click(/^Furnace/, /^Buy/);
  click(/^Furnace/, /^Buy/);
  click(/^Iron Mine/, /^Use/);

  getOnePomodoro();
  click(/^Grandma/, /^Buy/);
  click(/^Coal Mine/, /^Use 3/);
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Steel$/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Steel Pickaxe/), /^Use 1/).click();
  });

  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Steel$/), /^Use 1/).click();
  });
  click(/^Iron Mine/, /^Use/);
  click(/^Coal Mine/, /^Use 3/);
  // should buy workbench
  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 3/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Pickaxe/), /^Use 1/).click();
  });
  click(/^Workbench/, /^Buy/);
  click(/^Iron Mine/, /^Use/);
  click(/^Coal Mine/, /^Use 3/);

  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Pickaxe/), /^Use 2/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Ingot/), /^Use 3/).click();
  });
  click(/^Coal Mine/, /^Use 3/);

  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Steel Pickaxe/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Steel$/), /^Use 1/).click();
  });
  act(() => {
    getByText(screen.getByTestId(/^1 Iron Pickaxe/), /^Use 1/).click();
  });
  click(/^Coal Mine/, /^Use 3/);
  repeat(10, () => {
    click(/^Coal Mine/, /^Buy/);
  });

  getOnePomodoro();
  act(() => {
    getByText(screen.getByTestId(/^1 Steel Pickaxe/), /^Use 1/).click();
  });
  click(/^Coal Mine/, /^Use 13/);

  getOnePomodoro();
  getByText(screen.getByTestId("action"), "x162").click(); // burn coal
  click(/^Coal Mine/, /^Use 3/);
  getByText(screen.getByTestId("action"), "x21").click(); // burn coal
  click(/^Grandma/, /^Use 1/);
  click(/^Coal Mine/, /^Use 10/);
  getByText(screen.getByTestId("action"), "x70").click(); // burn coal
  click(/^Grandma/, /^Use 4/);

  getOnePomodoro();
  click(/^Coal Mine/, /^Use 13/);
  repeat(37, () => {
    // no meaning in 37. coal mine is now 50. should buy beforehand
    click(/^Coal Mine/, /^Buy/);
  });

  getOnePomodoro();
  click(/^Coal Mine/, /^Use 50/);
  repeat(36, () => {
    // no meaning in 37. coal mine is now 50. should buy beforehand
    click(/^Coal Mine/, /^Buy/);
  });

  getOnePomodoro();
  click(/^Coal Mine/, /^Use 86/);
  getByText(screen.getByTestId("action"), "x1043").click(); // burn coal
  expectAchieve([
    "steel_pickaxe2",
    "pomodoro23",
    "steel_pickaxe4",
    "sick",
    "cookie377",
    "cookie610",
    "cookie_volcano",
    "cookie987",
    "cookie1597",
    "cookie2584",
    "burn_earth",
  ]);
  click(/^Grandma/, /^Use 4/);
  expectAchieve([]); // cookie_earth is not achieved because it is turn 31
  g = getGlobal();
  expect(g.resources.cookie).toBe(17001);
  expect(g.records.pollution).toBe(1316);
  expect(g.records.gotPomodoro_t1).toBe(31);
});
