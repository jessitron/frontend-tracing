import "./tracing.js";

console.log("app was here");

const button = document.getElementById("how-long-does-this-take");
button.onclick = () => {
  console.log("thanks for clicking");
  window.sessionStorage.setItem("when", Date.now());
  // now be slow
  setTimeout(() => {
    window.location.href = "/page2.html";
  }, 500);
};
