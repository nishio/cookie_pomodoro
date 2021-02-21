/**
 * Action: works instantly without any resource
 */
import { setGlobal, useGlobal } from "reactn";
import { State } from "reactn/default";
import { TResourceID } from "../Resource/all_resources";
import { update, updateResource } from "../update";
import { burn_coal } from "./burn_coal";
import { click } from "./click";
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
  forHuman?: string;
};

const no_hunger_effect = {
  id: "no_hunger",
  forHuman: "No Hunger",
};
const no_hunger: TAction = {
  id: "no_hunger",
  forHuman: "No hunger",
  description: "grandma doesn't require pomodoro",
  toShow: (g) => g.resources.mana >= 100,

  onClick: () => {
    setGlobal((g: State) => {
      return {
        ...g,
        ...updateResource(g, "mana", -100),
        temporaryEffects: [...g.temporaryEffects, no_hunger_effect],
      };
    });
  },
};

const all_actions: TAction[] = [click, reset, burn_coal, no_hunger];

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
  const effects = g.temporaryEffects.map((e, index) => {
    return <li key="{index}">{e.forHuman ?? e.id}</li>;
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
