// Ranch Manager Elite Dashboard

const animals =
JSON.parse(localStorage.getItem("animals")) || [];

const expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

const subscription =
localStorage.getItem("subscription") || "FREE";

// Total Animals
const animalCount =
document.getElementById("animalCount");

if (animalCount) {
    animalCount.textContent = animals.length;
}

// Subscription Plan
const planName =
document.getElementById("planName");

if (planName) {
    planName.textContent =
    subscription.toUpperCase();
}

// Total Expenses
let totalExpenses = 0;

expenses.forEach(expense => {
    totalExpenses += Number(
        expense.amount || 0
    );
});

const expenseElement =
document.getElementById(
    "totalExpenses"
);

if (expenseElement) {
    expenseElement.textContent =
    "$" + totalExpenses.toFixed(2);
}

// Dashboard Ready
console.log(
    "Ranch Manager Elite Dashboard Loaded"
);
