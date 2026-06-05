const animals =
JSON.parse(localStorage.getItem("animals")) || [];

document.getElementById("animalCount").textContent =
animals.length;

const plan =
localStorage.getItem("subscription") || "free";

document.getElementById("planName").textContent =
plan.toUpperCase();
