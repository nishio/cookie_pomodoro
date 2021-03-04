import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { getGlobal } from "reactn";

export const initSentry = () => {
  Sentry.init({
    dsn:
      "https://c38fadd6e0bb4928bc41fab0b8518111@o376998.ingest.sentry.io/5661417",
    integrations: [new Integrations.BrowserTracing()],
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception && !shownReportDialog) {
        shownReportDialog = true;
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      Sentry.setContext("saveData", getGlobal());

      return event;
    },

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
};
let shownReportDialog = false;
