import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeGlobalState } from "./initializeGlobalState";
import addReactNDevTools from "reactn-devtools";
import { load } from "./localDB";

if (process.env.NODE_ENV !== "production") {
  // development
  addReactNDevTools({ trace: true, traceLimit: 25 });
} else {
  // production
  // initSentry();
}

initializeGlobalState();
load();
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
