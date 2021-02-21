import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { initializeGlobalState } from "./initializeGlobalState";

test("renders learn react link", () => {
  initializeGlobalState();
  render(<App />);
});
