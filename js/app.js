function toggleNav() {
    document.getElementById("navMenu")?.classList.toggle("nav-open");
}

/* =========================
   ANIMALS
========================= */

function addAnimal() {

    const tag = document.getElementById("tagNumber");

    if (!tag.value.trim()) return alert("Tag required");

    const animals = Storage.get("animals");

    animals.push({
        id: Date.now(),
        tagNumber: tag.value
    });

    Storage.set("animals", animals);

    renderAnimals();
}

function renderAnimals() {

    const container = document.getElementById("animalList");
    const animals = Storage.get("animals");

    container.innerHTML = animals.map(a =>
        `<div class="card">${a.tagNumber}</div>`
    ).join("");
}

/* =========================
   FINANCE
========================= */

function addTransaction() {

    const name = document.getElementById("transactionName");
    const amount = Number(document.getElementById("transactionAmount").value);

    if (!name.value) return alert("Required");

    const transactions = Storage.get("transactions");

    transactions.push({
        id: Date.now(),
        name: name.value,
        amount,
        type: document.getElementById("transactionType").value
    });

    Storage.set("transactions", transactions);

    renderTransactions();
    updateFinance();
    updateProfitChart();
}

function renderTransactions() {

    const list = document.getElementById("transactionList");
    const transactions = Storage.get("transactions");

    list.innerHTML = transactions.map(t => `
        <div class="card">
            ${t.name} - $${t.amount} (${t.type})
        </div>
    `).join("");
}

function updateFinance() {

    const transactions = Storage.get("transactions");

    let income = 0, expenses = 0;

    transactions.forEach(t => {
        t.type === "income"
            ? income += t.amount
            : expenses += t.amount;
    });

    document.getElementById("totalIncome").textContent = income;
    document.getElementById("totalExpenses").textContent = expenses;
    document.getElementById("netProfit").textContent = income - expenses;
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const animals = Storage.get("animals");
    const transactions = Storage.get("transactions");

    document.getElementById("ranchSummary").innerHTML = `
        <p>Animals: ${animals.length}</p>
        <p>Transactions: ${transactions.length}</p>
    `;
}

/* =========================
   INIT
========================= */

window.onload = () => {

    renderAnimals();
    renderTransactions();
    updateFinance();
    updateDashboard();
    updateProfitChart();

};
