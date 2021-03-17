import React from "react";
import App from "../App";
import { act, getByText, render, screen } from "@testing-library/react";
import { getOnePomodoro } from "../getOnePomodoro";
import { getGlobal } from "reactn";
import { click, repeat, expectAchieve } from "./App.test";
import { before, after } from "./before_after";
import { resetLastAchieved } from "../Achievement/checkAchievements";

jest.mock("../localDB"); // disable load/save
beforeEach(before);
afterEach(after);
const useRecipe = (regex: RegExp, regex2?: RegExp) => {
  if (regex2 === undefined) {
    regex2 = /^Use 1$/;
  }
  act(() => {
    getByText(screen.getByTestId(regex), regex2!).click();
  });
};

test("senario_forest", () => {
  render(<App />);
  repeat(4, getOnePomodoro);
  click(/^Grandma/, /^Buy/);
  click(/^Grandma/, /^Buy/);

  getOnePomodoro();
  getOnePomodoro();
  click(/^Grandma/, /^Buy/);

  getOnePomodoro();
  resetLastAchieved();
  click(/^Grandma/, /^Use/);
  expectAchieve(["cookie1", "cookie3", "mana", "no_mine"]);

  getOnePomodoro();
  click(/^Grandma/, /^Use/);

  getOnePomodoro();
  click(/^Grandma/, /^Use/);

  getOnePomodoro();
  click(/^Grandma/, /^Use/);

  getOnePomodoro();
  click(/^Create Forest/);

  getOnePomodoro();
  useRecipe(/Green Mana/);

  getOnePomodoro();
  click(/^Forest/, /^Buy/); // should before turn
  useRecipe(/Green Mana/);
  click(/^Create Apple Tree/);
  click(/^Grandma/, /^Use 3/);

  getOnePomodoro();
  useRecipe(/Green Mana/, /Use 2/);
  click(/^Create Grape Tree/);
  useRecipe(/Apple/);

  getOnePomodoro();
  useRecipe(/Green Mana/, /Use 2/);
  click(/^Newton/, /^Buy/);
  useRecipe(/Grape/);
  click(/^Forest/, /^Buy/);
  click(/^Grape Tree/, /^Buy/);
  useRecipe(/Apple/);

  getOnePomodoro();
  click(/^Grandma/, /^Use 3/);
  click(/^Grape Tree/, /^Use 2/);
  useRecipe(/Green Mana/, /Use 3/);
  useRecipe(/Science/);
  useRecipe(/Apple/);
  click(/^Newton/, /^Buy/);
  click(/^Forest/, /^Buy/);
  click(/^Create Forest/);

  getOnePomodoro();
  useRecipe(/Green Mana/, /Use 5/);
  click(/^Rain/);
  click(/^Create Plain/);
  useRecipe(/Apple/);
  useRecipe(/Science/);
  useRecipe(/Grape/, /Use 2/);
  useRecipe(/Wine/);
  click(/^Rain/);
  click(/^Rain/);
  click(/^Create Plain/);

  getOnePomodoro();
  useRecipe(/Green Mana/, /Use 5/);
  click(/^Create Plain/);
  useRecipe(/Apple/);
  useRecipe(/Wheat/, /Use 2/);
  useRecipe(/Grape/, /Use 2/);
  useRecipe(/Wine/);

  getOnePomodoro();
  useRecipe(/Wheat/, /Use 3/);
  useRecipe(/Bread/);
  click(/^Create Human/);
  useRecipe(/Green Mana/, /Use 5/);
  useRecipe(/Apple/);
  click(/^Apple Tree/, /Buy/);

  getOnePomodoro();
  useRecipe(/Wheat/, /Use 3/);
  useRecipe(/Bread@Human/);
  useRecipe(/Apple/, /2/);
  useRecipe(/Green Mana/, /Use 5/);

  getOnePomodoro();
  click(/^Create Human/);
  let g = getGlobal();
  expect(g.converters.human).toBe(2);
  expect(g.achieved.eve).toBeTruthy();
  // click(/^Human: Have/, /Buy/);
});
