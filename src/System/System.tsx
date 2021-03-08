import React from "react";
import { Sentry } from "../initSentry";
import { recover } from "../localDB";
import { Github } from "../Resource/Github";
import { exportSaveData } from "./exportSaveData";
import { importSaveData } from "./importSaveData";
import { grantNotificationPermission } from "./notify";

export const System = () => {
  return (
    <div>
      <h2>
        System
        <Github filename="System/System.tsx" />
      </h2>
      <p>
        <button onClick={exportSaveData}>Export Save Data</button>
        {" / "}
        <button onClick={importSaveData}>Import Save Data</button>
      </p>
      <p>
        <button onClick={recover}>Recover to yesterday data(alpha)</button>
      </p>
      <p>
        <button onClick={grantNotificationPermission}>
          Grant Notification Permission
        </button>
      </p>
      <p>
        <button onClick={bugReport}>Open Bug Report Dialog</button>
      </p>

      <p>
        <a href="https://github.com/nishio/cookie_pomodoro/projects/1">
          Kanban
        </a>
      </p>
      <p>
        <a href="https://twitter.com/hashtag/CookiePomodoro?src=hashtag_click&f=live">
          Twitter Search
        </a>
      </p>
      <p>
        <a href="https://github.com/nishio/cookie_pomodoro/commits/main">
          Commits
        </a>
      </p>
    </div>
  );
};

const bugReport = () => {
  Sentry.captureMessage("Manual Bug Report");
};
