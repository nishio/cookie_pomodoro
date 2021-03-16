import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import {
  act,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal } from "reactn";
import { mockUseState } from "../testutil/mockUseState";
import { mockSetGlobal } from "../testutil/mockSetGlobal";
import {
  checkAchievements,
  getLastAchieved,
  resetLastAchieved,
} from "../Achievement/checkAchievements";
import { TAchievementID } from "../all_ids";
import { updateGlobal } from "../utils/updateGlobal";
import { ContactlessOutlined } from "@material-ui/icons";

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

const expectAchieve = (xs?: TAchievementID[]) => {
  checkAchievements();
  if (xs === undefined) {
    console.log("expect:", getLastAchieved());
    return;
  }
  expect(getLastAchieved()).toStrictEqual(xs);
  resetLastAchieved();
};

jest.mock("../localDB"); // disable load/save

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

const repeat = (n: number, f: () => unknown) => {
  for (let i = 0; i < n; i++) {
    f();
  }
};

test("senario_coal", () => {
  const m = mockUseState();
  const m2 = mockSetGlobal();
  initializeGlobalState();
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
  expectAchieve(["cookie_earth"]);
  m.mockRestore();
  m2.mockRestore();
});
