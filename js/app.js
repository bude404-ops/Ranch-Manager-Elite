/* =====================================================
   RANCH MANAGER ELITE
   APP.JS (FIXED + PRODUCTION READY)
===================================================== */

/* =========================
   GLOBAL DATA LAYER
========================= */

const Ranch = {
    storage: {
        get(key, fallback = []) {
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : fallback;
            } catch (err) {
                console.error("Storage get error:", err);
                return fallback;
            }
        },

        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
};

/* =========================
   NAVIGATION
========================= */

function toggleNav() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("nav-open");
}

function showSection(id) {
    document.querySelectorAll("main section").forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) target.style.display = "block";
}

/* =========================
   SETTINGS
========================= */

function loadRanchSettings() {
    const name = localStorage.getItem("ranchName") || "Ranch Dashboard";
    const plan = localStorage.getItem("subscription") || "FREE";

    const title = document.getElementById("ranchTitle");
    if (title) title.textContent = name;

    document.querySelectorAll("#planName").forEach(el => {
        el.textContent = plan;
    });
}

/* =========================
   ANIMALS
========================= */

function addAnimal() {
    const tag = document.getElementById("tagNumber");
    if (!tag || !tag.value.trim()) {
        alert("Tag Number required");
        return;
    }

    const animals = Ranch.storage.get("animals", []);

    animals.push({
        id: Date.now(),
        tagNumber: tag.value,
        species: document.getElementById("species")?.value || "",
        breed: document.getElementById("breed")?.value || "",
        sex: document.getElementById("sex")?.value || "",
        weight: document.getElementById("weight")?.value || "",
        birthDate: document.getElementById("birthDate")?.value || "",
        notes: document.getElementById("notes")?.value || ""
    });

    Ranch.storage.set("animals", animals);

    tag.value = "";

    renderAnimals();
    updateDashboard();
}

function renderAnimals() {
    const container = document.getElementById("animalList");
    if (!container) return;

    const animals = Ranch.storage.get("animals", []);

    container.innerHTML = animals.length
        ? animals.map(a => `
            <div class="card">
                <strong>${a.tagNumber}</strong><br>
                ${a.species}<br>
                ${a.breed}<br>
                ${a.sex}<br>
                ${a.weight} lbs
            </div>
        `).join("")
        : "<p>No animals found.</p>";
}

/* =========================
   INVENTORY
========================= */

function addInventoryItem() {
    const name = document.getElementById("itemName");
    if (!name || !name.value.trim()) {
        alert("Item name required");
        return;
    }

    const inventory = Ranch.storage.get("inventory", []);

    inventory.push({
        id: Date.now(),
        name: name.value,
        category: document.getElementById("itemCategory")?.value || "",
        quantity: Number(document.getElementById("itemQuantity")?.value || 0),
        reorder: Number(document.getElementById("reorderLevel")?.value || 0)
    });

    Ranch.storage.set("inventory", inventory);

    name.value = "";

    renderInventory();
    updateDashboard();
}

function renderInventory() {
    const container = document.getElementById("inventoryList");
    if (!container) return;

    const inventory = Ranch.storage.get("inventory", []);

    container.innerHTML = inventory.length
        ? inventory.map(item => `
            <div class="card">
                <strong>${item.name}</strong><br>
                ${item.category}<br>
                Qty: ${item.quantity}<br>
                Reorder: ${item.reorder}
            </div>
        `).join("")
        : "<p>No inventory.</p>";
}

/* =========================
   FINANCE
========================= */

function addTransaction() {
    const name = document.getElementById("transactionName");
    const amount = Number(document.getElementById("transactionAmount")?.value || 0);

    if (!name || !name.value.trim()) {
        alert("Description required");
        return;
    }

    const transactions = Ranch.storage.get("transactions", []);

    transactions.push({
        id: Date.now(),
        name: name.value,
        amount,
        type: document.getElementById("transactionType")?.value || "expense",
        category: document.getElementById("transactionCategory")?.value || "Other",
        created: new Date().toISOString()
    });

    Ranch.storage.set("transactions", transactions);

    name.value = "";

    renderTransactions();
    updateFinanceTotals();
    updateDashboard();
}

function renderTransactions() {
    const list = document.getElementById("transactionList");
    if (!list) return;

    const transactions = Ranch.storage.get("transactions", []);

    list.innerHTML = transactions.length
        ? transactions.map(t => `
            <div class="card">
                <strong>${t.name}</strong><br>
                ${t.type}<br>
                ${t.category}<br>
                $${Number(t.amount).toFixed(2)}
            </div>
        `).join("")
        : "<p>No transactions.</p>";
}

function updateFinanceTotals() {
    const transactions = Ranch.storage.get("transactions", []);

    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
        const amount = Number(t.amount || 0);
        if (t.type === "income") income += amount;
        else expenses += amount;
    });

    const profit = income - expenses;

    document.getElementById("totalIncome") &&
        (document.getElementById("totalIncome").textContent = `$${income.toFixed(2)}`);

    document.getElementById("totalExpenses") &&
        (document.getElementById("totalExpenses").textContent = `$${expenses.toFixed(2)}`);

    document.getElementById("netProfit") &&
        (document.getElementById("netProfit").textContent = `$${profit.toFixed(2)}`);

    updateTaxes(income, expenses, profit);
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {
    const animals = Ranch.storage.get("animals", []);
    const inventory = Ranch.storage.get("inventory", []);

    document.getElementById("animalCount") &&
        (document.getElementById("animalCount").textContent = animals.length);

    document.getElementById("inventoryCount") &&
        (document.getElementById("inventoryCount").textContent = inventory.length);

    const summary = document.getElementById("ranchSummary");
    if (summary) {
        summary.innerHTML = `
            <p>Animals: <strong>${animals.length}</strong></p>
            <p>Inventory: <strong>${inventory.length}</strong></p>
            <p>Status: <strong>Operational</strong></p>
        `;
    }

    const alerts = document.getElementById("lowStockAlerts");
    if (alerts) {
        const low = inventory.filter(i => Number(i.quantity) <= Number(i.reorder));

        alerts.innerHTML = low.length
            ? low.map(i => `<div class="card">${i.name}<br>Qty: ${i.quantity}</div>`).join("")
            : "<p>No alerts.</p>";
    }
}

/* =========================
   REPORTS + TAXES
========================= */

function updateReports() {
    const transactions = Ranch.storage.get("transactions", []);

    let expenses = 0;
    transactions.forEach(t => {
        if (t.type === "expense") expenses += Number(t.amount || 0);
    });

    const el = document.getElementById("rExpenses");
    if (el) el.textContent = `$${expenses.toFixed(2)}`;
}

function updateTaxes(income, expenses, profit) {
    document.getElementById("taxIncome") &&
        (document.getElementById("taxIncome").textContent = `$${income.toFixed(2)}`);

    document.getElementById("taxExpenses") &&
        (document.getElementById("taxExpenses").textContent = `$${expenses.toFixed(2)}`);

    document.getElementById("taxProfit") &&
        (document.getElementById("taxProfit").textContent = `$${profit.toFixed(2)}`);
}

function refreshTaxPage() {
    const transactions = Ranch.storage.get("transactions", []);

    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
        const amount = Number(t.amount || 0);
        if (t.type === "income") income += amount;
        else expenses += amount;
    });

    updateTaxes(income, expenses, income - expenses);
}

/* =========================
   INIT
========================= */

function initializePage() {
    loadRanchSettings();
    renderAnimals();
    renderInventory();
    renderTransactions();
    updateFinanceTotals();
    updateDashboard();
    updateReports();
    refreshTaxPage();
}

document.addEventListener("DOMContentLoaded", () => {
    initializePage();
    showSection("dashboard");

    console.log("🐄 Ranch Manager Elite Loaded (FIXED)");
});

/* =========================
   GLOBAL EXPORTS
========================= */

window.toggleNav = toggleNav;
window.showSection = showSection;
window.addAnimal = addAnimal;
window.addInventoryItem = addInventoryItem;
window.addTransaction = addTransaction;
