function toggleNav() {
    document.getElementById("navMenu")?.classList.toggle("nav-open");
}

function showSection(id) {
    document.querySelectorAll("main section").forEach(s => s.style.display = "none");
    document.getElementById(id).style.display = "block";
}

/* =====================
   ANIMALS
===================== */

function addAnimal() {

    const tag = document.getElementById("tagNumber");
    if (!tag?.value.trim()) return alert("Tag required");

    const animals = RanchStorage.get("animals");

    animals.push({
        id: Date.now(),
        tagNumber: tag.value
    });

    RanchStorage.set("animals", animals);

    tag.value = "";

    renderAnimals();
    updateDashboard();
}

function renderAnimals() {

    const el = document.getElementById("animalList");
    const animals = RanchStorage.get("animals");

    el.innerHTML = animals.length
        ? animals.map(a => `<div class="card">${a.tagNumber}</div>`).join("")
        : "<p>No animals</p>";
}

/* =====================
   FINANCE
===================== */

function addTransaction() {

    const name = document.getElementById("transactionName");
    const amount = document.getElementById("transactionAmount");

    if (!name?.value.trim()) return alert("Missing description");

    const transactions = RanchStorage.get("transactions");

    transactions.push({
        id: Date.now(),
        name: name.value,
        amount: Number(amount.value || 0),
        type: document.getElementById("transactionType").value
    });

    RanchStorage.set("transactions", transactions);

    name.value = "";
    amount.value = "";

    renderTransactions();
    updateFinanceTotals();
    updateDashboard();
    renderProfitChart();
}

function renderTransactions() {

    const el = document.getElementById("transactionList");
    const tx = RanchStorage.get("transactions");

    el.innerHTML = tx.length
        ? tx.map(t => `
            <div class="card">
                ${t.name}<br>
                ${t.type}<br>
                $${t.amount}
            </div>
        `).join("")
        : "<p>No transactions</p>";
}

function updateFinanceTotals() {

    const tx = RanchStorage.get("transactions");

    let income = 0;
    let expense = 0;

    tx.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("totalIncome").textContent = "$" + income;
    document.getElementById("totalExpenses").textContent = "$" + expense;
    document.getElementById("netProfit").textContent = "$" + (income - expense);
}

/* =====================
   DASHBOARD
===================== */

function updateDashboard() {

    const animals = RanchStorage.get("animals");

    document.getElementById("ranchSummary").innerHTML = `
        <p>Animals: ${animals.length}</p>
    `;
}

/* =====================
   INIT
===================== */

function initializePage() {

    showSection("dashboard");

    renderAnimals();
    renderTransactions();
    updateFinanceTotals();
    updateDashboard();
    renderProfitChart();
}

document.addEventListener("DOMContentLoaded", initializePage);

/* GLOBALS */
window.toggleNav = toggleNav;
window.showSection = showSection;
window.addAnimal = addAnimal;
window.addTransaction = addTransaction;
