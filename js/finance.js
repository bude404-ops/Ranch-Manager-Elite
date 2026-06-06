function addTransaction() {
    const name = document.getElementById("transactionName").value;
    const amount = Number(document.getElementById("transactionAmount").value);
    const type = document.getElementById("transactionType").value;

    if (!name) return alert("Required");

    const tx = Ranch.get("transactions", []);

    tx.push({
        id: Date.now(),
        name,
        amount,
        type,
        date: new Date().toISOString()
    });

    Ranch.set("transactions", tx);

    renderTransactions();
    updateFinance();
    updateChart();
}

function renderTransactions() {
    const list = document.getElementById("transactionList");
    const tx = Ranch.get("transactions", []);

    list.innerHTML = tx.map(t =>
        `<div class="card">${t.name} - $${t.amount}</div>`
    ).join("");
}

function updateFinance() {
    const tx = Ranch.get("transactions", []);

    let income = 0, expense = 0;

    tx.forEach(t => {
        t.type === "income"
            ? income += t.amount
            : expense += t.amount;
    });

    document.getElementById("totalIncome").textContent = income;
    document.getElementById("totalExpenses").textContent = expense;
    document.getElementById("netProfit").textContent = income - expense;
}
