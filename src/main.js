const navbar = document.getElementById("navbar");
const navbarmenu = document.getElementById("navbar-menu");

navbar.addEventListener("mouseenter", function () {
  navbarmenu.classList.toggle("hidden");
});
navbar.addEventListener("mouseleave", function () {
  navbarmenu.classList.toggle("hidden");
});

const darkmode = document.getElementById("darkmode");
let rotation = 0;

darkmode.addEventListener("click", function () {
  rotation = rotation === 0 ? 180 : 0;
  darkmode.style.transform = `rotate(${rotation}deg)`;
});
