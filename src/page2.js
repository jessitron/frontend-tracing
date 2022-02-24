import "./tracing.js";
import opentelemetry from "@opentelemetry/api";

/* Copied from https://github.com/open-telemetry/opentelemetry-js/blob/28c9e8829488a7fa131803447b0511195ae1fdf0/packages/opentelemetry-core/src/common/time.ts#L36
 */
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
/* end copied from otel */

console.log("Page 2 is here");

// get the start time from session storage!
const when = Number(window.sessionStorage.getItem("when"));

// create a span!!
const span = opentelemetry.trace
  .getTracer("jess was here")
  .startSpan("button pushed", {
    startTime: numberToHrtime(when), // the terrible secret!!!!!!
    attributes: {
      // these are all for my own troubleshooting
      futzing: 160,
      "app.comment": "hrtime",
      "app.when": when,
      "app.hrtime": JSON.stringify(numberToHrtime(when)),
      "app.my_duration": Date.now() - when,
      "app.after": Date.now(),
    },
  });
console.log("span is", span); // debugging
const traceId = span.spanContext().traceId; // debugging
// end the span!!
span.end();

const team = "jessitron";
const dataset = "frontend-tracing";
const traceUrl =
  "https://ui.honeycomb.io/" +
  team +
  "/datasets/" +
  dataset +
  "/trace?trace_id=" +
  traceId;
console.log("specified startTime", traceUrl);

// create a link in the document
const putTheTraceLinkHere = document.getElementById("trace-link");
const traceLink = document.createElement("a");
const linkText = document.createTextNode("See the newly created trace");
traceLink.appendChild(linkText);
traceLink.setAttribute("href", traceUrl);
putTheTraceLinkHere.replaceChildren(traceLink);
