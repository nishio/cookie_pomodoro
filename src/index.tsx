import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import addReactNDevTools from "reactn-devtools";
import { initWithLoad } from "./initWithLoad";
import { update_ids } from "./update_ids";
import { initSentry } from "./initSentry";
import * as reactn from "reactn";
if (process.env.NODE_ENV !== "production") {
  // development
  addReactNDevTools({ trace: true, traceLimit: 25 });
  // initSentry();
  // @ts-ignore
  window.reactn = reactn;
  // @ts-ignore
  window.update_ids = update_ids;
} else {
  // production
  initSentry();
}

initWithLoad();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

/*eslint no-undef: "error"*/
declare global {
  interface Window {
    gtag: (
      a: string,
      b: string,
      c?: { event_category?: string; event_label?: string; value?: number }
    ) => unknown;
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
