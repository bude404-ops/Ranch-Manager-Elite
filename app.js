/* =========================
   STORAGE CORE
========================= */

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

/* =========================
   NAV
========================= */

function toggleNav() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("nav-open");
}

/* =========================
   SETTINGS
========================= */

function loadRanchSettings() {
    const title = document.getElementById("ranchTitle");
    if (title) {
        title.textContent =
            localStorage.getItem("ranchName") ||
            "Ranch Manager Elite";
    }
}

/* =========================
   ANIMALS
========================= */

function addAnimal() {

    const tag = document.getElementById("tagNumber");
    if (!tag || !tag.value.trim()) return alert("Tag required");

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

    renderAnimals();
    updateDashboard();

    tag.value = "";
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
    if (!name || !name.value.trim()) return alert("Item required");

    const inventory = Ranch.storage.get("inventory", []);

    inventory.push({
        id: Date.now(),
        name: name.value,
        category: document.getElementById("itemCategory")?.value || "",
        quantity: Number(document.getElementById("itemQuantity")?.value || 0),
        reorder: Number(document.getElementById("reorderLevel")?.value || 0)
    });

    Ranch.storage.set("inventory", inventory);

    renderInventory();
    updateDashboard();

    name.value = "";
}

function renderInventory() {
    const container = document.getElementById("inventoryList");
    if (!container) return;

    const inventory = Ranch.storage.get("inventory", []);

    container.innerHTML = inventory.length
        ? inventory.map(i => `
            <div class="card">
                <strong>${i.name}</strong><br>
                ${i.category}<br>
                Qty: ${i.quantity}<br>
                Reorder: ${i.reorder}
            </div>
        `).join("")
        : "<p>No inventory.</p>";
}

/* =========================
   FINANCE
========================= */

function addTransaction() {

    const name = document.getElementById("transactionName");
    if (!name || !name.value.trim()) return alert("Description required");

    const transactions = Ranch.storage.get("transactions", []);

    transactions.push({
        id: Date.now(),
        name: name.value,
        amount: Number(document.getElementById("transactionAmount")?.value || 0),
        type: document.getElementById("transactionType")?.value || "expense",
        category: document.getElementById("transactionCategory")?.value || "",
        created: new Date().toISOString()
    });

    Ranch.storage.set("transactions", transactions);

    renderTransactions();
    updateFinanceTotals();
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

    let income = 0, expenses = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += Number(t.amount);
        else expenses += Number(t.amount);
    });

    document.getElementById("totalIncome").textContent = "$" + income.toFixed(2);
    document.getElementById("totalExpenses").textContent = "$" + expenses.toFixed(2);
    document.getElementById("netProfit").textContent = "$" + (income - expenses).toFixed(2);
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const animals = Ranch.storage.get("animals", []);
    const inventory = Ranch.storage.get("inventory", []);

    document.getElementById("animalCount").textContent = animals.length;
    document.getElementById("inventoryCount").textContent = inventory.length;
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
}

document.addEventListener("DOMContentLoaded", initializePage);
