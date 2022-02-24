import "./tracing.js";

console.log("app was here");

const button = document.getElementById("how-long-does-this-take");
button.onclick = () => {
  console.log("thanks for clicking");
  window.location.href = "/page2.html";
};
