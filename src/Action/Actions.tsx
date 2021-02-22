import { useGlobal } from "reactn";
import { State } from "reactn/default";
import { all_actions } from "./all_actions";

type TActionID = string;
export type TAction = {
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

export const Actions = () => {
  const [g] = useGlobal();
  const buttons = all_actions.map((a) => {
    if (a.toShow(g)) {
      return (
        <li key={a.id}>
          <button onClick={a.onClick}>{a.forHuman ?? a.id}</button>{" "}
          {a.description}
        </li>
      );
    }
    return null;
  });
  const effects = g.temporaryEffects.map((e, index) => {
    return <li key={index}>{e.forHuman ?? e.id}</li>;
  });
  return (
    <div>
      <h2>Actions</h2>
      <div id="actions">
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
