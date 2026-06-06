/* =========================
   STORAGE CORE
========================= */

const Ranch = {
    storage: {
        get(key, fallback = []) {
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : fallback;
            } catch {
                return fallback;
            }
        },

        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

/* =========================
   DATA
========================= */

let profitChart;

/* =========================
   ANIMALS
========================= */

function addAnimal() {

    const tag = document.getElementById("tagNumber");
    if (!tag || !tag.value.trim()) return;

    const animals = Ranch.storage.get("animals", []);

    animals.push({
        id: Date.now(),
        tagNumber: tag.value,
        species: document.getElementById("species")?.value || "",
        breed: document.getElementById("breed")?.value || "",
        sex: document.getElementById("sex")?.value || "",
        weight: document.getElementById("weight")?.value || ""
    });

    Ranch.storage.set("animals", animals);

    renderAnimals();
    updateDashboard();

    tag.value = "";
}

function renderAnimals() {

    const el = document.getElementById("animalList");
    const animals = Ranch.storage.get("animals", []);

    el.innerHTML = animals.length
        ? animals.map(a => `
            <div class="card">
                <strong>${a.tagNumber}</strong><br>
                ${a.species}<br>
                ${a.breed}
            </div>
        `).join("")
        : "<p>No animals</p>";
}

/* =========================
   INVENTORY
========================= */

function addInventoryItem() {

    const name = document.getElementById("itemName");
    if (!name || !name.value.trim()) return;

    const items = Ranch.storage.get("inventory", []);

    items.push({
        id: Date.now(),
        name: name.value,
        category: document.getElementById("itemCategory")?.value || "",
        quantity: Number(document.getElementById("itemQuantity")?.value || 0),
        reorder: Number(document.getElementById("reorderLevel")?.value || 0)
    });

    Ranch.storage.set("inventory", items);

    renderInventory();
    updateDashboard();

    name.value = "";
}

function renderInventory() {

    const el = document.getElementById("inventoryList");
    const items = Ranch.storage.get("inventory", []);

    el.innerHTML = items.length
        ? items.map(i => `
            <div class="card">
                <strong>${i.name}</strong><br>
                ${i.category}<br>
                Qty: ${i.quantity}
            </div>
        `).join("")
        : "<p>No inventory</p>";
}

/* =========================
   FINANCE
========================= */

function addTransaction() {

    const name = document.getElementById("transactionName");
    if (!name || !name.value.trim()) return;

    const transactions = Ranch.storage.get("transactions", []);

    transactions.push({
        id: Date.now(),
        name: name.value,
        amount: Number(document.getElementById("transactionAmount")?.value || 0),
        type: document.getElementById("transactionType")?.value || "expense"
    });

    Ranch.storage.set("transactions", transactions);

    renderTransactions();
    updateFinanceTotals();
    updateProfitChart();
}

function renderTransactions() {

    const el = document.getElementById("transactionList");
    const data = Ranch.storage.get("transactions", []);

    el.innerHTML = data.length
        ? data.map(t => `
            <div class="card">
                <strong>${t.name}</strong><br>
                ${t.type}<br>
                $${t.amount}
            </div>
        `).join("")
        : "<p>No transactions</p>";
}

/* =========================
   FINANCE TOTALS
========================= */

function updateFinanceTotals() {

    const data = Ranch.storage.get("transactions", []);

    let income = 0;
    let expense = 0;

    data.forEach(t => {
        if (t.type === "income") income += Number(t.amount);
        else expense += Number(t.amount);
    });

    document.getElementById("totalIncome").textContent = "$" + income;
    document.getElementById("totalExpenses").textContent = "$" + expense;
    document.getElementById("netProfit").textContent = "$" + (income - expense);
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    document.getElementById("animalCount").textContent =
        Ranch.storage.get("animals", []).length;

    document.getElementById("inventoryCount").textContent =
        Ranch.storage.get("inventory", []).length;
}

/* =========================
   📊 PROFIT CHART
========================= */

function updateProfitChart() {

    const transactions = Ranch.storage.get("transactions", []);

    let running = 0;
    const labels = [];
    const data = [];

    transactions.forEach((t, i) => {

        if (t.type === "income") running += Number(t.amount);
        else running -= Number(t.amount);

        labels.push(i + 1);
        data.push(running);
    });

    const ctx = document.getElementById("profitChart");

    if (!ctx) return;

    if (profitChart) profitChart.destroy();

    profitChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Profit Trend",
                data,
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        }
    });
}

/* =========================
   INIT
========================= */

function init() {

    renderAnimals();
    renderInventory();
    renderTransactions();
    updateFinanceTotals();
    updateDashboard();
    updateProfitChart();
}

document.addEventListener("DOMContentLoaded", init);
