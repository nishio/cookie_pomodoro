import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeGlobalState } from "./initializeGlobalState";
import addReactNDevTools from "reactn-devtools";
import { load, save } from "./localDB";
import { updateLastVisit } from "./updateLastVisit";
import { getGlobal, setGlobal } from "reactn";

if (process.env.NODE_ENV !== "production") {
  // development
  addReactNDevTools({ trace: true, traceLimit: 25 });
} else {
  // production
  // initSentry();
}

const updateFirstVisit = () => {
  const g = getGlobal();
  if (g.records.firstVisit === undefined) {
    return setGlobal((g) => {
      return {
        records: { ...g.records, firstVisit: Date.now() },
      };
    });
  }
};
(async () => {
  await initializeGlobalState();
  await load();
  await updateFirstVisit();
  await updateLastVisit();
  await save();
})();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
