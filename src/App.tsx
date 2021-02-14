import React from "react";
import { getGlobal, setGlobal, useDispatch, useGlobal } from "reactn";
import "./App.css";

function App() {
  return (
    <div>
      {/* <Pomodoro /> */}
      {/* <Converters /> */}
      <Actions />
      <Inventory />
      {/* <Achievements /> */}
    </div>
  );
}

const Actions = () => {
  const onClick = useDispatch((x) => x + 1, "pomodoro");
  return (
    <div>
      <button onClick={onClick}>Click(for Debug)</button>
    </div>
  );
};

const Inventory = () => {
  const [g] = useGlobal();
  return (
    <div>
      <span>pomodoro: {g.pomodoro}</span>
    </div>
  );
};
export default App;
