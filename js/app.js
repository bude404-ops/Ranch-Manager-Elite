const Ranch = {
    storage: {
        get(key, fallback = []) {
            try {
                return JSON.parse(localStorage.getItem(key)) || fallback;
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
   NAVIGATION FIX (IMPORTANT)
========================= */

function toggleNav() {
    document.getElementById("navMenu").classList.toggle("active");
}

function showSection(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

/* =========================
   ANIMALS
========================= */

function addAnimal() {
    const tag = document.getElementById("tagNumber");

    if (!tag.value.trim()) return alert("Tag required");

    const animals = Ranch.storage.get("animals");

    animals.push({
        id: Date.now(),
        tag: tag.value,
        species: document.getElementById("species").value,
        breed: document.getElementById("breed").value
    });

    Ranch.storage.set("animals", animals);

    tag.value = "";
    renderAnimals();
    updateDashboard();
}

function renderAnimals() {
    const el = document.getElementById("animalList");
    const animals = Ranch.storage.get("animals");

    el.innerHTML = animals.map(a =>
        `<div class="card"><b>${a.tag}</b><br>${a.species}<br>${a.breed}</div>`
    ).join("");
}

/* =========================
   INVENTORY
========================= */

function addInventoryItem() {
    const name = document.getElementById("itemName");
    if (!name.value.trim()) return alert("Item required");

    const items = Ranch.storage.get("inventory");

    items.push({
        id: Date.now(),
        name: name.value,
        quantity: Number(document.getElementById("itemQuantity").value || 0),
        reorder: Number(document.getElementById("reorderLevel").value || 0)
    });

    Ranch.storage.set("inventory", items);

    name.value = "";
    renderInventory();
    updateDashboard();
}

function renderInventory() {
    const el = document.getElementById("inventoryList");
    const items = Ranch.storage.get("inventory");

    el.innerHTML = items.map(i =>
        `<div class="card"><b>${i.name}</b><br>Qty: ${i.quantity}</div>`
    ).join("");
}

/* =========================
   FINANCE
========================= */

function addTransaction() {
    const name = document.getElementById("transactionName");
    const amount = Number(document.getElementById("transactionAmount").value || 0);

    if (!name.value.trim()) return alert("Required");

    const tx = Ranch.storage.get("transactions");

    tx.push({
        id: Date.now(),
        name: name.value,
        amount,
        type: document.getElementById("transactionType").value
    });

    Ranch.storage.set("transactions", tx);

    name.value = "";
    renderTransactions();
    updateFinance();
}

function renderTransactions() {
    const el = document.getElementById("transactionList");
    const tx = Ranch.storage.get("transactions");

    el.innerHTML = tx.map(t =>
        `<div class="card"><b>${t.name}</b><br>$${t.amount} (${t.type})</div>`
    ).join("");
}

function updateFinance() {
    const tx = Ranch.storage.get("transactions");

    let income = 0, expense = 0;

    tx.forEach(t => {
        t.type === "income"
            ? income += t.amount
            : expense += t.amount;
    });

    document.getElementById("totalIncome").textContent = "$" + income;
    document.getElementById("totalExpenses").textContent = "$" + expense;
    document.getElementById("netProfit").textContent = "$" + (income - expense);

    updateChart(tx);
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {
    document.getElementById("animalCount").textContent =
        Ranch.storage.get("animals").length;

    document.getElementById("inventoryCount").textContent =
        Ranch.storage.get("inventory").length;
}

/* =========================
   INIT
========================= */

function init() {
    renderAnimals();
    renderInventory();
    renderTransactions();
    updateDashboard();
    updateFinance();
}

document.addEventListener("DOMContentLoaded", init);
