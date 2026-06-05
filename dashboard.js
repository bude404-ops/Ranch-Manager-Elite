// Ranch Manager Elite - Dashboard V4 + UI Controls

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
    if (t.type === "income") income += amount;
    else expenses += amount;
});

const profit = income - expenses;

// NAV HIDE ON SCROLL (GLOBAL)
let lastScrollY = window.scrollY;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (!nav) return;

    if (window.scrollY > lastScrollY) {
        nav.classList.add("nav-hidden");
    } else {
        nav.classList.remove("nav-hidden");
    }

    lastScrollY = window.scrollY;
});

// SAFE SETTER
function set(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// HEADER
set("ranchTitle", ranchName);

// COUNTS
set("animalCount", animals.length);
set("inventoryCount", inventory.length);
set("healthCount", healthRecords.length);
set("breedingCount", breedingRecords.length);

// WORK ORDERS
const openWorkOrders = workOrders.filter(w => !w.completed).length;
set("workOrderCount", openWorkOrders);

// SUBSCRIPTION
set("planName", subscription);

// FINANCE
set("totalIncome", "$" + income.toFixed(2));
set("totalExpenses", "$" + expenses.toFixed(2));
set("netProfit", "$" + profit.toFixed(2));

// ALERTS
const alerts = document.getElementById("alerts");

if (alerts) {

    let html = "";

    if (openWorkOrders > 0)
        html += `<p>🔧 ${openWorkOrders} open work orders</p>`;

    const healthRisk = healthRecords.filter(r =>
        r.type === "Injury" || r.type === "Surgery"
    ).length;

    if (healthRisk > 0)
        html += `<p>🩺 ${healthRisk} critical health cases</p>`;

    const lowStock = inventory.filter(i =>
        Number(i.quantity) <= Number(i.reorder)
    ).length;

    if (lowStock > 0)
        html += `<p>📦 ${lowStock} low inventory items</p>`;

    if (!html)
        html = "<p>✅ All systems normal</p>";

    alerts.innerHTML = html;
}

// SUMMARY
const summary = document.getElementById("summary");

if (summary) {

    summary.innerHTML = `
        <p><strong>Animals:</strong> ${animals.length}</p>
        <p><strong>Inventory:</strong> ${inventory.length}</p>
        <p><strong>Health:</strong> ${healthRecords.length}</p>
        <p><strong>Breeding:</strong> ${breedingRecords.length}</p>
        <p><strong>Work Orders:</strong> ${openWorkOrders}</p>
        <p><strong>Income:</strong> $${income.toFixed(2)}</p>
        <p><strong>Expenses:</strong> $${expenses.toFixed(2)}</p>
        <p><strong>Profit:</strong> $${profit.toFixed(2)}</p>
    `;
}

console.log("Dashboard Updated: Nav Hide + SaaS Engine Loaded");
