const animals =
JSON.parse(
    localStorage.getItem("animals")
) || [];

const transactions =
JSON.parse(
    localStorage.getItem("transactions")
) || [];

const totalAnimals =
animals.length;

let income = 0;
let expenses = 0;

transactions.forEach(transaction => {

    if (transaction.type === "income") {

        income += Number(
            transaction.amount || 0
        );

    } else {

        expenses += Number(
            transaction.amount || 0
        );
    }
});

const profit =
income - expenses;

const costPerAnimal =
totalAnimals > 0
? expenses / totalAnimals
: 0;

document.getElementById(
    "reportAnimals"
).textContent =
totalAnimals;

document.getElementById(
    "reportIncome"
).textContent =
"$" + income.toFixed(2);

document.getElementById(
    "reportExpenses"
).textContent =
"$" + expenses.toFixed(2);

document.getElementById(
    "reportProfit"
).textContent =
"$" + profit.toFixed(2);

document.getElementById(
    "costPerAnimal"
).textContent =
"$" + costPerAnimal.toFixed(2);

const summary =
`
Animals: ${totalAnimals}

Income: $${income.toFixed(2)}

Expenses: $${expenses.toFixed(2)}

Profit: $${profit.toFixed(2)}
`;

document.getElementById(
    "ranchSummary"
).textContent =
summary;
