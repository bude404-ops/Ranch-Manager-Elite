// Ranch Manager Elite Dashboard Enterprise V3

const animals =
JSON.parse(localStorage.getItem("animals")) || [];

const inventory =
JSON.parse(localStorage.getItem("inventory")) || [];

const healthRecords =
JSON.parse(localStorage.getItem("healthRecords")) || [];

const transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

const breedingRecords =
JSON.parse(localStorage.getItem("breedingRecords")) || [];

const feedRecords =
JSON.parse(localStorage.getItem("feedRecords")) || [];

const equipment =
JSON.parse(localStorage.getItem("equipment")) || [];

const workOrders =
JSON.parse(localStorage.getItem("workOrders")) || [];

const employees =
JSON.parse(localStorage.getItem("employees")) || [];

const contacts =
JSON.parse(localStorage.getItem("contacts")) || [];

const documents =
JSON.parse(localStorage.getItem("documents")) || [];

const calendarEvents =
JSON.parse(localStorage.getItem("calendarEvents")) || [];

const subscription =
localStorage.getItem("subscription") || "FREE";

const ranchName =
localStorage.getItem("ranchName") ||
"Ranch Operations Center";

let income = 0;
let expenses = 0;

transactions.forEach(transaction => {

    const amount =
    Number(transaction.amount || 0);

    if (
        transaction.type === "income"
    ) {

        income += amount;

    } else {

        expenses += amount;
    }
});

const profit =
income - expenses;

const feedCost =
feedRecords.reduce(
    (total, record) =>
        total +
        Number(record.cost || 0),
    0
);

const openWorkOrders =
workOrders.filter(
    workOrder =>
        !workOrder.completed
).length;

const serviceDue =
equipment.filter(
    item =>
        Number(item.hours) >=
        Number(item.interval)
).length;

const lowInventory =
inventory.filter(
    item =>
        Number(item.quantity) <=
        Number(item.reorder)
).length;

function setText(id, value) {

    const element =
    document.getElementById(id);

    if (element) {

        element.textContent =
        value;
    }
}

// Header

setText(
    "ranchTitle",
    ranchName
);

// Main KPI Cards

setText(
    "animalCount",
    animals.length
);

setText(
    "inventoryCount",
    inventory.length
);

setText(
    "healthCount",
    healthRecords.length
);

setText(
    "planName",
    subscription
);

setText(
    "totalIncome",
    "$" + income.toFixed(2)
);

setText(
    "totalExpenses",
    "$" + expenses.toFixed(2)
);

setText(
    "netProfit",
    "$" + profit.toFixed(2)
);

// Alerts

const lowStockAlerts =
document.getElementById(
    "lowStockAlerts"
);

if (lowStockAlerts) {

    let html = "";

    if (lowInventory > 0) {

        html += `
        <div class="card">
            ⚠️ Low Inventory Alerts:
            ${lowInventory}
        </div>
        `;
    }

    if (serviceDue > 0) {

        html += `
        <div class="card">
            🚜 Equipment Service Due:
            ${serviceDue}
        </div>
        `;
    }

    if (openWorkOrders > 0) {

        html += `
        <div class="card">
            🔧 Open Work Orders:
            ${openWorkOrders}
        </div>
        `;
    }

    if (html === "") {

        html = `
        <div class="card">
            ✅ No Active Alerts
        </div>
        `;
    }

    lowStockAlerts.innerHTML =
    html;
}

// Ranch Summary

const ranchSummary =
document.getElementById(
    "ranchSummary"
);

if (ranchSummary) {

    ranchSummary.innerHTML = `

        <p><strong>Animals:</strong>
        ${animals.length}</p>

        <p><strong>Inventory Items:</strong>
        ${inventory.length}</p>

        <p><strong>Health Records:</strong>
        ${healthRecords.length}</p>

        <p><strong>Breeding Records:</strong>
        ${breedingRecords.length}</p>

        <p><strong>Feed Records:</strong>
        ${feedRecords.length}</p>

        <p><strong>Equipment Units:</strong>
        ${equipment.length}</p>

        <p><strong>Employees:</strong>
        ${employees.length}</p>

        <p><strong>Contacts:</strong>
        ${contacts.length}</p>

        <p><strong>Documents:</strong>
        ${documents.length}</p>

        <p><strong>Calendar Events:</strong>
        ${calendarEvents.length}</p>

        <p><strong>Open Work Orders:</strong>
        ${openWorkOrders}</p>

        <p><strong>Feed Costs:</strong>
        $${feedCost.toFixed(2)}</p>

        <p><strong>Total Income:</strong>
        $${income.toFixed(2)}</p>

        <p><strong>Total Expenses:</strong>
        $${expenses.toFixed(2)}</p>

        <p><strong>Net Profit:</strong>
        $${profit.toFixed(2)}</p>

        <p><strong>Subscription:</strong>
        ${subscription}</p>

    `;
}

console.log(
    "Ranch Manager Elite Dashboard Enterprise V3 Loaded"
);
