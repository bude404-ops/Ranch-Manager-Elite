const animals =
JSON.parse(localStorage.getItem("animals")) || [];

const expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

const totalAnimals = animals.length;

let totalExpenses = 0;

expenses.forEach(expense => {
    totalExpenses += Number(expense.amount || 0);
});

const averageCost =
totalAnimals > 0
? totalExpenses / totalAnimals
: 0;

document.getElementById("reportAnimals")
.textContent = totalAnimals;

document.getElementById("reportExpenses")
.textContent =
"$" + totalExpenses.toFixed(2);

document.getElementById("costPerAnimal")
.textContent =
"$" + averageCost.toFixed(2);
