import { act } from "@testing-library/react";
import ReactN, { setGlobal as originalSetGlobal } from "reactn";
import NewGlobalState from "reactn/types/new-global-state";
import { Reducers } from "reactn/default";
import Callback from "reactn/types/callback";
export const mockSetGlobal = () => {
  jest
    .spyOn(ReactN, "setGlobal")
    .mockImplementation(
      (
        newGlobalState?: NewGlobalState<{}>,
        callback?: Callback<{}, Reducers> | undefined
      ) => {
        let p: Promise<{}>;
        act(() => {
          p = originalSetGlobal(newGlobalState, callback);
        });
        return p!;
      }
    );
};
