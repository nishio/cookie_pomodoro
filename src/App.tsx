import React from "react";
import { getGlobal, setGlobal, useEffect, useGlobal } from "reactn";
import { State } from "reactn/default";
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
type TGetPrice = (g: State, amount: number) => [number, string][];
type TConverter = {
  id: string;
  forHuman?: string;
  from: string;
  to: string;
  fromAmount: number;
  toAmount: number;
  toShow: (g: State) => boolean;
  getPrice: TGetPrice;
};

const all_converters: TConverter[] = [
  {
    id: "grandma",
    forHuman: "Grandma",
    from: "pomodoro",
    to: "cookie",
    fromAmount: 1,
    toAmount: 2,
    toShow: (g: any) => true,
    getPrice: (g: any, amount: number) => {
      return [[1 + amount, "pomodoro"]];
    },
  },
];
const Converters = () => {
  const [converters] = useGlobal("converters");
  const [resources] = useGlobal("resources");
  const g = getGlobal();
  const list = all_converters.map((c) => {
    if (c.toShow(g)) {
      const amount = converters[c.id] ?? 0;
      const price = c.getPrice(g, amount);
      const priceStr = price.map(([value, unit]) => `${value} ${unit}`);
      const canBuy = price.every(([value, unit]) => {
        return resources[unit] >= value;
      });
      let buyButton = null;
      if (canBuy) {
        const buy = () => {
          let newResources = { ...g.resources };
          price.forEach(([value, unit]) => {
            newResources = update(newResources, unit, -value);
          });
          setGlobal({
            converters: update(g.converters, c.id, 1),
            resources: newResources,
          });
        };
        buyButton = <button onClick={buy}>Buy({priceStr})</button>;
      }
      return (
        <li key={c.id}>
          {c.forHuman ?? c.id} {amount}
          {buyButton}
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

const update = (obj: { [key: string]: number }, k: string, diff: number) => {
  console.log(obj, k, diff);
  const newObj = { ...obj };
  newObj[k] = (obj[k] ?? 0) + diff;
  return newObj;
};
