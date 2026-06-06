function toggleNav() {
    document.getElementById("navMenu")?.classList.toggle("active");
}

/* =====================
   NAV SECTIONS
===================== */

function showSection(id) {

    document.querySelectorAll(".section").forEach(s => {
        s.classList.add("hidden");
    });

    document.getElementById(id)?.classList.remove("hidden");
}

/* =====================
   ANIMALS
===================== */

function addAnimal() {

    const tag = document.getElementById("tagNumber");

    if (!tag?.value.trim()) return alert("Tag required");

    const animals = Storage.get("animals", []);

    animals.push({
        id: Date.now(),
        tagNumber: tag.value,
        species: document.getElementById("species")?.value || "",
        breed: document.getElementById("breed")?.value || ""
    });

    Storage.set("animals", animals);

    tag.value = "";

    renderAnimals();
    updateDashboard();
}

function renderAnimals() {

    const list = document.getElementById("animalList");
    const animals = Storage.get("animals", []);

    if (!list) return;

    list.innerHTML = animals.map(a => `
        <div class="card">
            <strong>${a.tagNumber}</strong><br/>
            ${a.species}<br/>
            ${a.breed}
        </div>
    `).join("");
}

/* =====================
   FINANCE
===================== */

function addTransaction() {

    const name = document.getElementById("transactionName");
    const amount = Number(document.getElementById("transactionAmount")?.value || 0);

    if (!name?.value.trim()) return alert("Missing name");

    const transactions = Storage.get("transactions", []);

    transactions.push({
        id: Date.now(),
        name: name.value,
        amount,
        type: document.getElementById("transactionType")?.value || "expense"
    });

    Storage.set("transactions", transactions);

    name.value = "";

    renderTransactions();
    updateFinance();
    updateChart();
    updateDashboard();
}

function renderTransactions() {

    const list = document.getElementById("transactionList");
    const transactions = Storage.get("transactions", []);

    if (!list) return;

    list.innerHTML = transactions.map(t => `
        <div class="card">
            <strong>${t.name}</strong><br/>
            ${t.type}<br/>
            $${t.amount.toFixed(2)}
        </div>
    `).join("");
}

function updateFinance() {

    const transactions = Storage.get("transactions", []);

    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expenses += t.amount;
    });

    document.getElementById("totalIncome").textContent = "$" + income.toFixed(2);
    document.getElementById("totalExpenses").textContent = "$" + expenses.toFixed(2);
    document.getElementById("netProfit").textContent = "$" + (income - expenses).toFixed(2);
}

/* =====================
   DASHBOARD
===================== */

function updateDashboard() {

    const animals = Storage.get("animals", []);
    const transactions = Storage.get("transactions", []);

    const summary = document.getElementById("ranchSummary");

    if (summary) {
        summary.innerHTML = `
            <p>Animals: ${animals.length}</p>
            <p>Transactions: ${transactions.length}</p>
        `;
    }
}

/* =====================
   INIT
===================== */

document.addEventListener("DOMContentLoaded", () => {

    renderAnimals();
    renderTransactions();
    updateFinance();
    updateDashboard();
    updateChart();

    console.log("Ranch Manager Elite FINAL loaded");

});
