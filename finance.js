let expenses =
JSON.parse(
localStorage.getItem("expenses")
) || [];

function addExpense(){

    const item = {
        name:
        document.getElementById(
        "expenseName").value,

        amount:
        document.getElementById(
        "expenseAmount").value
    };

    expenses.push(item);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderExpenses();
}

function renderExpenses(){

    const list =
    document.getElementById(
    "expenseList");

    list.innerHTML = "";

    expenses.forEach(e=>{

        list.innerHTML += `
        <div class="card">
            ${e.name}
            - $${e.amount}
        </div>`;
    });
}

renderExpenses();
