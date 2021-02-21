/**
 * Action: works instantly without any resource
 */
import React from "react";
import { getGlobal, setGlobal, useGlobal } from "reactn";
import { State } from "reactn/default";
import { ALWAYS } from "../ALWAYS";
import { getOnePomodoro } from "../getOnePomodoro";
import { reset } from "./reset";

type TActionID = string;
type TAction = {
  id: TActionID;
  forHuman?: string;
  description?: string;
  toShow: (g: State) => boolean;
  onClick: () => void;
};

export type TTemporaryEffect = {
  id: TActionID;
};
const inDeveleop = () => {
  return process.env.NODE_ENV !== "production";
};
const all_actions: TAction[] = [
  {
    id: "reset",
    forHuman: "Complete Reset",
    description: "Notice: you will lose everything",
    onClick: reset,
    toShow: ALWAYS,
  },
  {
    id: "click",
    forHuman: "Click(for Debug)",
    onClick: getOnePomodoro,
    toShow: inDeveleop,
  },
  {
    id: "burn_coal",
    forHuman: "Burn coal",
    onClick: () => {
      setGlobal((g) => {
        return {
          ...g,
          temporaryEffects: [...g.temporaryEffects, { id: "burn_coal" }],
        };
      });
    },
    toShow: (g) => g.resources.coal >= 1,
    description: "Temporary increases grandma production (+1)",
  },
];
export const Actions = () => {
  const [g] = useGlobal();
  const buttons = all_actions.map((a) => {
    if (a.toShow(g)) {
      return (
        <li>
          <button key="{a.id}" onClick={a.onClick}>
            {a.forHuman ?? a.id}
          </button>{" "}
          {a.description}
        </li>
      );
    }
    return null;
  });
  const effects = g.temporaryEffects.map((e) => {
    return <li>{(e as TTemporaryEffect).id}</li>;
  });
  return (
    <div>
      <h2>Actions</h2>
      <div id="actions">
        <p>create temporary effects</p>
        <ul>{buttons}</ul>
      </div>
      <h2>Temporary Effects</h2>
      <div id="temporary-effects">
        <p>effect until next pomodoro start</p>
        <ul>{effects}</ul>
      </div>
    </div>
  );
};
