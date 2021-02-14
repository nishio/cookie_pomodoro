import React from "react";
import { useDispatch } from "reactn";

export const Actions = () => {
  const onClick = useDispatch((x) => x + 1, "pomodoro");
  return (
    <div>
      <button onClick={onClick}>Click(for Debug)</button>
    </div>
  );
};
