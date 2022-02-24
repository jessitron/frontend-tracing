import "./tracing.js";
import opentelemetry from "@opentelemetry/api";

// COPIED FROM OTEL
const NANOSECOND_DIGITS = 9;
const SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
function numberToHrtime(epochMillis) {
  const epochSeconds = epochMillis / 1000;
  // Decimals only.
  const seconds = Math.trunc(epochSeconds);
  // Round sub-nanosecond accuracy to nanosecond.
  const nanos =
    Number((epochSeconds - seconds).toFixed(NANOSECOND_DIGITS)) *
    SECOND_TO_NANOSECONDS;
  return [seconds, nanos];
}

console.log("Page 2 is here");

const when = Number(window.sessionStorage.getItem("when"));
const my_duration = Date.now() - when;
const after = Date.now();
console.log("When was it? ", when);
console.log("When is it now? ", Date.now());
console.log("So it took like", my_duration);

const team = "jessitron";
const dataset = "frontend-tracing";

const span = opentelemetry.trace
  .getTracer("jess was here")
  .startSpan("button pushed", {
    //   startTime: when,
    attributes: {
      futzing: 73,
      "app.when": when,
      "app.my_duration": my_duration,
      "app.after": after,
    },
  });
console.log("span is", span);

const traceId = span.spanContext().traceId;
url =
  "http://ui.honeycomb.io/" +
  team +
  "/datasets/" +
  dataset +
  "/trace?trace_id=" +
  traceId;
console.log("no startTime", url);
span.end();

function stuff() {
  // scope the variables
  const span = opentelemetry.trace
    .getTracer("jess was here")
    .startSpan("button pushed", {
      startTime: numberToHrtime(when),
      attributes: {
        futzing: 160,
        "app.comment": "hrtime",
        "app.when": when,
        "app.my_duration": my_duration,
        "app.after": after,
      },
    });
  console.log("span is", span);

  const traceId = span.spanContext().traceId;
  url =
    "http://ui.honeycomb.io/" +
    team +
    "/datasets/" +
    dataset +
    "/trace?trace_id=" +
    traceId;
  console.log("specified startTime", url);
  span.end();
}
stuff();
