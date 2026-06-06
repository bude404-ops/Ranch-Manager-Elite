const Ranch = {
    storage: {
        get: (k, f = []) => JSON.parse(localStorage.getItem(k)) || f,
        set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
    }
};

/* NAV */
function toggleNav() {
    const nav = document.getElementById("navMenu");
    if (nav) nav.classList.toggle("open");
}

/* PAGE SWITCH */
function showSection(id) {
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    const target = document.getElementById(id);
    if (target) target.classList.add("active");
}

/* ANIMALS */
function addAnimal() {
    const tag = document.getElementById("tagNumber");

    if (!tag.value.trim()) return alert("Tag required");

    const animals = Ranch.storage.get("animals", []);

    animals.push({
        id: Date.now(),
        tag: tag.value,
        species: document.getElementById("species").value,
        breed: document.getElementById("breed").value
    });

    Ranch.storage.set("animals", animals);

    tag.value = "";
    renderAnimals();
}

function renderAnimals() {
    const list = document.getElementById("animalList");
    const animals = Ranch.storage.get("animals", []);

    list.innerHTML = animals.map(a => `
        <div class="card">
            <b>${a.tag}</b><br/>
            ${a.species}<br/>
            ${a.breed}
        </div>
    `).join("");
}

/* FINANCE */
function addTransaction() {
    const name = document.getElementById("transactionName");
    const amount = document.getElementById("transactionAmount");

    if (!name.value) return alert("Missing name");

    const transactions = Ranch.storage.get("transactions", []);

    transactions.push({
        id: Date.now(),
        name: name.value,
        amount: Number(amount.value),
        type: document.getElementById("transactionType").value
    });

    Ranch.storage.set("transactions", transactions);

    name.value = "";
    amount.value = "";

    renderTransactions();
    updateTotals();
    updateChart();
}

function renderTransactions() {
    const list = document.getElementById("transactionList");
    const data = Ranch.storage.get("transactions", []);

    list.innerHTML = data.map(t => `
        <div class="card">
            <b>${t.name}</b><br/>
            ${t.type}<br/>
            $${t.amount}
        </div>
    `).join("");
}

function updateTotals() {
    const data = Ranch.storage.get("transactions", []);

    let income = 0, expense = 0;

    data.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("totalIncome").textContent = income;
    document.getElementById("totalExpenses").textContent = expense;
    document.getElementById("netProfit").textContent = income - expense;
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
    renderAnimals();
    renderTransactions();
    updateTotals();
    updateChart();
});
