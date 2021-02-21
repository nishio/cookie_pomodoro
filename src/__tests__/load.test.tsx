import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { render } from "@testing-library/react";
import { load } from "../localDB";

test("success load", () => {
  initializeGlobalState();
  load();
  render(<App />);
});
