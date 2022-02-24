import "./tracing.js";
import opentelemetry from "@opentelemetry/api";

console.log("Page 2 is here");

// get the start time from session storage!
const whenString = window.sessionStorage.getItem("when");
window.sessionStorage.removeItem("when"); // don't repeat this action on reload

if (whenString) {
  const when = new Date(Number(whenString));
  // create a span!!
  const span = opentelemetry.trace
    .getTracer("my app")
    .startSpan("button pushed", {
      startTime: numberToHrtime(when), // the terrible secret!!!!!!
      attributes: {
        // these are all for my own troubleshooting
        futzing: 160,
        "app.comment": "converting stored time to date",
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

  // Now, do something clever that gives the user a link to the trace in honeycomb
  const team = "jessitron"; // change this
  const dataset = "frontend-tracing"; // change this

  const traceUrl =
    "https://ui.honeycomb.io/" +
    team +
    "/datasets/" +
    dataset +
    "/trace?trace_id=" +
    traceId;
  console.log("Trace URL:", traceUrl);

  // create a link in the document
  const putTheTraceLinkHere = document.getElementById("trace-link");
  const traceLink = document.createElement("a");
  const linkText = document.createTextNode("See the newly created trace");
  traceLink.appendChild(linkText);
  traceLink.setAttribute("href", traceUrl);
  traceLink.setAttribute("target", "_blank");
  putTheTraceLinkHere.replaceChildren(traceLink);
}
