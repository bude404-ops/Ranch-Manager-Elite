// Ranch Manager Elite Dashboard 2.0

const animals =
JSON.parse(
    localStorage.getItem("animals")
) || [];

const inventory =
JSON.parse(
    localStorage.getItem("inventory")
) || [];

const healthRecords =
JSON.parse(
    localStorage.getItem("healthRecords")
) || [];

const transactions =
JSON.parse(
    localStorage.getItem("transactions")
) || [];

const subscription =
localStorage.getItem(
    "subscription"
) || "FREE";

const ranchName =
localStorage.getItem(
    "ranchName"
) || "Ranch Operations Center";

let income = 0;
let expenses = 0;

transactions.forEach(transaction => {

    const amount =
        Number(
            transaction.amount || 0
        );

    if (
        transaction.type ===
        "income"
    ) {

        income += amount;

    } else {

        expenses += amount;
    }
});

const profit =
income - expenses;

// Ranch Name

const ranchTitle =
document.getElementById(
    "ranchTitle"
);

if (ranchTitle) {

    ranchTitle.textContent =
        ranchName;
}

// Animals

const animalCount =
document.getElementById(
    "animalCount"
);

if (animalCount) {

    animalCount.textContent =
        animals.length;
}

// Inventory

const inventoryCount =
document.getElementById(
    "inventoryCount"
);

if (inventoryCount) {

    inventoryCount.textContent =
        inventory.length;
}

// Health

const healthCount =
document.getElementById(
    "healthCount"
);

if (healthCount) {

    healthCount.textContent =
        healthRecords.length;
}

// Subscription

const planName =
document.getElementById(
    "planName"
);

if (planName) {

    planName.textContent =
        subscription;
}

// Finance

const incomeElement =
document.getElementById(
    "totalIncome"
);

if (incomeElement) {

    incomeElement.textContent =
        "$" +
        income.toFixed(2);
}

const expenseElement =
document.getElementById(
    "totalExpenses"
);

if (expenseElement) {

    expenseElement.textContent =
        "$" +
        expenses.toFixed(2);
}

const profitElement =
document.getElementById(
    "netProfit"
);

if (profitElement) {

    profitElement.textContent =
        "$" +
        profit.toFixed(2);
}

// Low Stock Alerts

const lowStockAlerts =
document.getElementById(
    "lowStockAlerts"
);

if (lowStockAlerts) {

    const lowStockItems =
        inventory.filter(
            item =>
                Number(item.quantity) <=
                Number(item.reorder)
        );

    if (
        lowStockItems.length === 0
    ) {

        lowStockAlerts.innerHTML =
            "<p>No low stock alerts.</p>";

    } else {

        let html = "";

        lowStockItems.forEach(item => {

            html += `
            <div class="card">
                <strong>${item.name}</strong>
                <br>
                Qty: ${item.quantity}
                <br>
                Reorder At: ${item.reorder}
            </div>
            `;
        });

        lowStockAlerts.innerHTML =
            html;
    }
}

// Ranch Summary

const ranchSummary =
document.getElementById(
    "ranchSummary"
);

if (ranchSummary) {

    ranchSummary.innerHTML = `

        <p>
            Animals:
            <strong>
                ${animals.length}
            </strong>
        </p>

        <p>
            Inventory Items:
            <strong>
                ${inventory.length}
            </strong>
        </p>

        <p>
            Health Records:
            <strong>
                ${healthRecords.length}
            </strong>
        </p>

        <p>
            Income:
            <strong>
                $${income.toFixed(2)}
            </strong>
        </p>

        <p>
            Expenses:
            <strong>
                $${expenses.toFixed(2)}
            </strong>
        </p>

        <p>
            Profit:
            <strong>
                $${profit.toFixed(2)}
            </strong>
        </p>

        <p>
            Subscription:
            <strong>
                ${subscription}
            </strong>
        </p>
    `;
}

console.log(
    "Dashboard Loaded Successfully"
);
