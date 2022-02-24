import "./tracing.js";
import opentelemetry from "@opentelemetry/api";

console.log("Page 2 is here");

const when = Number(window.sessionStorage.getItem("when"));
const duration = Date.now() - when;
console.log("When was it? ", when);

const span = opentelemetry.trace
  .getTracer("jess was here")
  .startSpan("button pushed", {
    startTime: when,
    attributes: { duration_ms: duration, futzing: 73 },
  });
console.log("span is", span);

const team = "jessitron";
const dataset = "frontend-tracing";
const traceId = span.spanContext().traceId;
url =
  "http://ui.honeycomb.io/" +
  team +
  "/datasets/" +
  dataset +
  "/trace?trace_id=" +
  traceId;
console.log(url);
span.end();
