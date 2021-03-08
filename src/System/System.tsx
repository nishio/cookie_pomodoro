import React from "react";
import { Github } from "../Resource/Github";
import { exportSaveData } from "./exportSaveData";
import { importSaveData } from "./importSaveData";

export const System = () => {
  return (
    <div>
      <h2>
        System
        <Github filename="System/System.tsx" />
      </h2>
      <button onClick={exportSaveData}>Export Save Data</button>
      {" / "}
      <button onClick={importSaveData}>Import Save Data</button>
      <p>
        <button onClick={grantNotificationPermission}>
          Grant Notification Permission
        </button>
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

const grantNotificationPermission = () => {
  if (Notification !== undefined) {
    Notification.requestPermission();
  } else {
    alert(
      "Your browser doesn't support Notifiation API (for example iOS Safari)"
    );
  }
};
