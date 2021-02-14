import React from "react";
import { getGlobal, setGlobal, useEffect, useGlobal } from "reactn";
import { Achievements } from "./Achievements";
import { Actions } from "./Actions";
import "./App.css";
import { Inventory } from "./Inventory";
import { Pomodoro } from "./Pomodoro";
import { startGlobalTimer } from "./startGlobalTimer";

function App() {
  useEffect(startGlobalTimer, []);
  return (
    <div>
      <h1>CookiePomodoro</h1>
      <Pomodoro />
      <Converters />
      <Actions />
      <Inventory />
      <Achievements />
    </div>
  );
}
const all_converters = [
  {
    id: "grandma",
    forHuman: "Grandma",
    from: "pomodoro",
    to: "cookie",
    fromAmount: 1,
    toAmount: 2,
    toShow: (g: any) => true,
    getPrice: (g: any, amount: number) => {
      return [[1, "pomodoro"]];
    },
  },
];
const Converters = () => {
  const [converters] = useGlobal("converters");
  const g = getGlobal();
  const list = all_converters.map((c) => {
    if (c.toShow(g)) {
      const amount = converters[c.id] ?? 0;
      const price = c.getPrice(g, amount);
      const priceStr = price.map(([value, unit]) => `${value} ${unit}`);
      const buy = () => {
        const newObj = { ...g.converters };
        newObj[c.id] = amount + 1;
        setGlobal({ converters: newObj });
      };
      return (
        <li key={c.id}>
          {c.forHuman ?? c.id} {amount}
          <button onClick={buy}>Buy({priceStr})</button>
        </li>
      );
    }
    return null;
  });

  return (
    <div>
      <h2>Converters</h2>
      <ul>{list}</ul>
    </div>
  );
};
export default App;
