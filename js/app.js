const Ranch = {

    storage: {

        get(key, fallback = []) {
            try {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : fallback;
            } catch (err) {
                console.error(err);
                return fallback;
            }
        },

        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }

    }

};

/* =====================================================
   NAVIGATION
===================================================== */

function toggleNav() {
    document.getElementById("navMenu")?.classList.toggle("nav-open");
}

function showSection(id) {

    document.querySelectorAll("main section").forEach(sec => {
        sec.style.display = "none";
    });

    const target = document.getElementById(id);
    if (target) target.style.display = "block";
}

/* =====================================================
   ANIMALS
===================================================== */

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

/* =====================================================
   RENDER ANIMALS
===================================================== */

function renderAnimals() {

    const container = document.getElementById("animalList");
    if (!container) return;

    const animals = Ranch.storage.get("animals", []);

    if (!animals.length) {
        container.innerHTML = "<p>No animals found.</p>";
        return;
    }

    container.innerHTML = animals.map(a => `
        <div class="card">
            <strong>${a.tagNumber}</strong><br>
            ${a.species}<br>
            ${a.breed}<br>
            ${a.sex}<br>
            ${a.weight} lbs
        </div>
    `).join("");
}

/* =====================================================
   INVENTORY
===================================================== */

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

/* =====================================================
   RENDER INVENTORY
===================================================== */

function renderInventory() {

    const container = document.getElementById("inventoryList");
    if (!container) return;

    const inventory = Ranch.storage.get("inventory", []);

    if (!inventory.length) {
        container.innerHTML = "<p>No inventory.</p>";
        return;
    }

    container.innerHTML = inventory.map(item => `
        <div class="card">
            <strong>${item.name}</strong><br>
            ${item.category}<br>
            Qty: ${item.quantity}<br>
            Reorder: ${item.reorder}
        </div>
    `).join("");
}

/* =====================================================
   FINANCE
===================================================== */

function addTransaction() {

    const name = document.getElementById("transactionName");
    const amountInput = document.getElementById("transactionAmount");

    if (!name || !name.value.trim()) {
        alert("Description required");
        return;
    }

    const amount = Number(amountInput?.value || 0);

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
    if (amountInput) amountInput.value = "";

    renderTransactions();
    updateFinanceTotals();
    updateDashboard();
    updateProfitChart();
}

/* =====================================================
   RENDER TRANSACTIONS
===================================================== */

function renderTransactions() {

    const list = document.getElementById("transactionList");
    if (!list) return;

    const transactions = Ranch.storage.get("transactions", []);

    if (!transactions.length) {
        list.innerHTML = "<p>No transactions.</p>";
        return;
    }

    list.innerHTML = transactions.map(t => `
        <div class="card">
            <strong>${t.name}</strong><br>
            ${t.type}<br>
            $${Number(t.amount).toFixed(2)}
        </div>
    `).join("");
}

/* =====================================================
   FINANCE TOTALS
===================================================== */

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

    document.getElementById("totalIncome").textContent = income.toFixed(2);
    document.getElementById("totalExpenses").textContent = expenses.toFixed(2);
    document.getElementById("netProfit").textContent = profit.toFixed(2);
}

/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const animals = Ranch.storage.get("animals", []);
    const inventory = Ranch.storage.get("inventory", []);

    document.getElementById("ranchSummary").innerHTML = `
        <p>Animals: ${animals.length}</p>
        <p>Inventory: ${inventory.length}</p>
    `;
}

/* =====================================================
   CHART HOOK (from charts.js)
===================================================== */

function updateProfitChart() {
    if (typeof window.updateProfitChartExternal === "function") {
        window.updateProfitChartExternal();
    }
}

/* =====================================================
   INIT
===================================================== */

function initializePage() {

    loadRanchSettings();

    renderAnimals();
    renderInventory();
    renderTransactions();

    updateFinanceTotals();
    updateDashboard();

    showSection("dashboard");
}

/* =====================================================
   SETTINGS
===================================================== */

function loadRanchSettings() {

    const title = document.getElementById("ranchTitle");

    const ranchName =
        localStorage.getItem("ranchName") ||
        "Ranch Dashboard";

    if (title) title.textContent = ranchName;
}

/* =====================================================
   STARTUP
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initializePage();
    console.log("🐄 Ranch Manager Elite Loaded");
});

/* =====================================================
   GLOBAL EXPORTS (THIS FIXES YOUR BUTTONS)
===================================================== */

window.addAnimal = addAnimal;
window.addTransaction = addTransaction;
window.addInventoryItem = addInventoryItem;
window.toggleNav = toggleNav;
window.showSection = showSection;
