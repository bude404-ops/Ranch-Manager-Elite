const animals =
JSON.parse(localStorage.getItem("animals")) || [];

const inventory =
JSON.parse(localStorage.getItem("inventory")) || [];

const healthRecords =
JSON.parse(localStorage.getItem("healthRecords")) || [];

const breedingRecords =
JSON.parse(localStorage.getItem("breedingRecords")) || [];

const workOrders =
JSON.parse(localStorage.getItem("workOrders")) || [];

const transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

const subscription =
localStorage.getItem("subscription") || "FREE";

const ranchName =
localStorage.getItem("ranchName") || "Ranch Operations Center";

let income = 0;
let expenses = 0;

transactions.forEach(t => {

    const amount = Number(t.amount || 0);

    if (t.type === "income") {
        income += amount;
    } else {
        expenses += amount;
    }
});

const profit = income - expenses;

// Helpers
function set(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// Core counts
set("ranchTitle", ranchName);

set("animalCount", animals.length);
set("inventoryCount", inventory.length);
set("healthCount", healthRecords.length);
set("breedingCount", breedingRecords.length);

const openWorkOrders =
workOrders.filter(w => !w.completed).length;

set("workOrderCount", openWorkOrders);

set("planName", subscription);

set("totalIncome", "$" + income.toFixed(2));
set("totalExpenses", "$" + expenses.toFixed(2));
set("netProfit", "$" + profit.toFixed(2));

// ALERT ENGINE
const alerts = document.getElementById("alerts");

if (alerts) {

    let html = "";

    if (openWorkOrders > 0) {
        html += `<p>🔧 ${openWorkOrders} open work orders</p>`;
    }

    const sickAnimals =
        healthRecords.filter(r =>
            r.type === "Injury" || r.type === "Surgery"
        ).length;

    if (sickAnimals > 0) {
        html += `<p>🩺 ${sickAnimals} critical health records</p>`;
    }

    const lowInventory =
        inventory.filter(i =>
            Number(i.quantity) <= Number(i.reorder)
        ).length;

    if (lowInventory > 0) {
        html += `<p>📦 ${lowInventory} low inventory items</p>`;
    }

    if (html === "") {
        html = "<p>✅ All systems normal</p>";
    }

    alerts.innerHTML = html;
}

// SUMMARY PANEL
const summary = document.getElementById("summary");

if (summary) {

    summary.innerHTML = `
        <p><strong>Animals:</strong> ${animals.length}</p>
        <p><strong>Health Records:</strong> ${healthRecords.length}</p>
        <p><strong>Breeding Records:</strong> ${breedingRecords.length}</p>
        <p><strong>Inventory Items:</strong> ${inventory.length}</p>
        <p><strong>Open Work Orders:</strong> ${openWorkOrders}</p>
        <p><strong>Income:</strong> $${income.toFixed(2)}</p>
        <p><strong>Expenses:</strong> $${expenses.toFixed(2)}</p>
        <p><strong>Profit:</strong> $${profit.toFixed(2)}</p>
    `;
}

console.log("Dashboard V4 Loaded");
