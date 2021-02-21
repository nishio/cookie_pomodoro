import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { load } from "../localDB";

test("App", () => {
  initializeGlobalState();
  load();
  render(<App />);
});

test("load", () => {
  initializeGlobalState();
  load();
  render(<App />);
});
