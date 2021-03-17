import React from "react";
import { useGlobal } from "reactn";
import { State } from "reactn/default";
import { checkAchievements } from "../Achievement/checkAchievements";
import { save } from "../localDB";
import { Github } from "../Resource/Github";
import { all_actions } from "./all_actions";

type TActionID = string;
export type TAction = {
  id: TActionID;
  forHuman?: string;
  description?: string;
  toShow: (g: State) => boolean;
  onClick: () => void;
  getMax?: (g: State) => number;
  repeat?: (n: number) => () => unknown;
};

export type TTemporaryEffect = {
  id: TActionID;
  forHuman?: string;
  value?: number;
};

export const Actions = () => {
  const [g] = useGlobal();
  const buttons = all_actions.map((a) => {
    if (a.toShow(g)) {
      if (a.getMax !== undefined) {
        const maxUse = a.getMax(g);
        if (maxUse > 4) {
          const half = Math.floor(maxUse / 2);
          const repeat = (num: number) => {
            if (a.repeat) {
              const onClick = a.repeat(num);
              return () => {
                onClick();
                checkAchievements();
                save();
              };
            }
            return () => {
              for (let i = 0; i < num; i++) {
                a.onClick();
              }
              checkAchievements();
              save();
            };
          };
          return (
            <li key={a.id}>
              <button onClick={repeat(1)}>{a.forHuman ?? a.id}</button>
              <button onClick={repeat(half)}>x{half}</button>
              <button onClick={repeat(maxUse)}>x{maxUse}</button>{" "}
              {a.description}
            </li>
          );
        }
      }
      const onClick = () => {
        a.onClick();
        checkAchievements();
        save();
      };
      return (
        <li key={a.id}>
          <button onClick={onClick}>{a.forHuman ?? a.id}</button>{" "}
          {a.description}
        </li>
      );
    }
    return null;
  });
  const effects = g.temporaryEffects.map((e, index) => {
    let s = e.forHuman ?? e.id;
    if (e.value !== undefined) {
      s = `${s} x${e.value}`;
    }
    return <li key={index}>{s}</li>;
  });
  return (
    <div>
      <h2>
        Actions
        <Github filename="Action/all_actions.ts" />
      </h2>
      <div id="actions" data-testid="action">
        <p>create instant/temporary effects</p>
        <ul>{buttons}</ul>
      </div>
      <h2>Temporary Effects</h2>
      <div id="temporary-effects">
        <p>last until next pomodoro start</p>
        <ul>{effects}</ul>
      </div>
    </div>
  );
};
