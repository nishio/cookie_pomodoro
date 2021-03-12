import React from "react";
import App from "../App";
import { initializeGlobalState } from "../initializeGlobalState";
import { render } from "@testing-library/react";
import { load } from "../localDB";

jest.mock("../localDB"); // disable load/save

test("success load", async () => {
  initializeGlobalState();
  await load();
  render(<App />);
});
