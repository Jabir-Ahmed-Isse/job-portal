// Sentry error monitoring. Imported first in server.js so it can hook into
// Express and Mongoose before they load.
import * as Sentry from "@sentry/node"
import {nodeProfilingIntegration} from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://a61a455af511f670bd6b2f396ab31b2a@o4509094733873152.ingest.us.sentry.io/4509094757662720",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  // Tracing is off. Uncomment to record performance traces for every request
  // (profiles are only collected while a trace is running).
  // tracesSampleRate: 1.0,

  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',
});

// Example span from Sentry's setup guide; work inside a span gets profiled.
Sentry.startSpan({
  name: "My Span",
}, () => {
});
