import { resetLastAchieved } from "../Achievement/checkAchievements";
import { initializeGlobalState } from "../initializeGlobalState";
import { mockUseState } from "./mockUseState";

let _mockAddSnack: jest.SpyInstance<any, unknown[]>;
let _mockUseState: jest.SpyInstance<[unknown, React.Dispatch<unknown>], []>;

export const before = () => {
  const MySnack = require("../Mysnack");
  _mockAddSnack = jest.spyOn(MySnack, "addSnack").mockImplementation(() => {});
  resetLastAchieved();
  _mockUseState = mockUseState();
  initializeGlobalState();
};

export const after = () => {
  _mockAddSnack.mockRestore();
  _mockUseState.mockRestore();
};
