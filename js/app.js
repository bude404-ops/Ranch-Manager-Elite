// RANCH OS ENTERPRISE
// app.js FINAL STARTER

function getData(key) {
return JSON.parse(
localStorage.getItem(key) || "[]"
);
}

function saveData(key, data) {
localStorage.setItem(
key,
JSON.stringify(data)
);
}

function toggleSidebar() {
document
.getElementById("sidebar")
?.classList.toggle("open");
}

function showSection(id) {

document
    .querySelectorAll(".page-section")
    .forEach(section =>
        section.classList.add("hidden")
    );

document
    .getElementById(id)
    ?.classList.remove("hidden");

}

function updateDashboard() {

document.getElementById(
    "animalCount"
).textContent =
    getData("animals").length;

document.getElementById(
    "paddockCount"
).textContent =
    getData("paddocks").length;

document.getElementById(
    "equipmentCount"
).textContent =
    getData("equipment").length;

document.getElementById(
    "employeeCount"
).textContent =
    getData("employees").length;

}

/* LIVESTOCK */

function addAnimal() {

const animals =
    getData("animals");

animals.push({
    id: Date.now(),
    tag:
        document.getElementById(
            "tagNumber"
        ).value,
    species:
        document.getElementById(
            "species"
        ).value,
    breed:
        document.getElementById(
            "breed"
        ).value,
    weight:
        document.getElementById(
            "weight"
        ).value
});

saveData(
    "animals",
    animals
);

renderAnimals();
updateDashboard();

}

function renderAnimals() {

const animals =
    getData("animals");

const list =
    document.getElementById(
        "animalList"
    );

if (!list) return;

list.innerHTML =
    animals.map(a => `
    <div class="card">
        <strong>${a.tag}</strong><br>
        ${a.species}<br>
        ${a.breed}<br>
        ${a.weight}
    </div>
`).join("");

}

/* INVENTORY */

function addInventoryItem() {

const inventory =
    getData("inventory");

inventory.push({
    id: Date.now(),
    name:
        document.getElementById(
            "inventoryName"
        ).value,
    qty:
        document.getElementById(
            "inventoryQty"
        ).value
});

saveData(
    "inventory",
    inventory
);

renderInventory();

}

function renderInventory() {

const inventory =
    getData("inventory");

const list =
    document.getElementById(
        "inventoryList"
    );

if (!list) return;

list.innerHTML =
    inventory.map(i => `
    <div class="card">
        ${i.name}
        <br>
        Qty: ${i.qty}
    </div>
`).join("");

}

/* EQUIPMENT */

function addEquipment() {

const equipment =
    getData("equipment");

equipment.push({
    id: Date.now(),
    name:
        document.getElementById(
            "equipmentName"
        ).value
});

saveData(
    "equipment",
    equipment
);

renderEquipment();
updateDashboard();

}

function renderEquipment() {

const equipment =
    getData("equipment");

const list =
    document.getElementById(
        "equipmentList"
    );

if (!list) return;

list.innerHTML =
    equipment.map(e => `
    <div class="card">
        ${e.name}
    </div>
`).join("");

}

/* EMPLOYEES */

function addEmployee() {

const employees =
    getData("employees");

employees.push({
    id: Date.now(),
    name:
        document.getElementById(
            "employeeName"
        ).value
});

saveData(
    "employees",
    employees
);

renderEmployees();
updateDashboard();

}

function renderEmployees() {

const employees =
    getData("employees");

const list =
    document.getElementById(
        "employeeList"
    );

if (!list) return;

list.innerHTML =
    employees.map(e => `
    <div class="card">
        ${e.name}
    </div>
`).join("");

}

/* WORK ORDERS */

function addWorkOrder() {

const orders =
    getData("workorders");

orders.push({
    id: Date.now(),
    title:
        document.getElementById(
            "workTitle"
        ).value
});

saveData(
    "workorders",
    orders
);

renderWorkOrders();

}

function renderWorkOrders() {

const orders =
    getData("workorders");

const list =
    document.getElementById(
        "workOrderList"
    );

if (!list) return;

list.innerHTML =
    orders.map(o => `
    <div class="card">
        ${o.title}
    </div>
`).join("");

}

/* FINANCE */

function addTransaction() {

const transactions =
    getData("transactions");

transactions.push({

    id: Date.now(),

    name:
        document.getElementById(
            "transactionName"
        ).value,

    amount:
        document.getElementById(
            "transactionAmount"
        ).value,

    type:
        document.getElementById(
            "transactionType"
        ).value
});

saveData(
    "transactions",
    transactions
);

renderTransactions();
updateFinance();

}

function renderTransactions() {

const transactions =
    getData("transactions");

const list =
    document.getElementById(
        "transactionList"
    );

if (!list) return;

list.innerHTML =
    transactions.map(t => `
    <div class="card">
        ${t.name}
        <br>
        $${t.amount}
    </div>
`).join("");

}

function updateFinance() {

const transactions =
    getData("transactions");

let income = 0;
let expenses = 0;

transactions.forEach(t => {

    if (t.type === "income")
        income += Number(t.amount);

    else
        expenses += Number(t.amount);
});

const profit =
    income - expenses;

const incomeEl =
    document.getElementById(
        "taxIncome"
    );

const expenseEl =
    document.getElementById(
        "taxExpenses"
    );

const profitEl =
    document.getElementById(
        "taxProfit"
    );

if (incomeEl)
    incomeEl.textContent =
        "$" + income.toFixed(2);

if (expenseEl)
    expenseEl.textContent =
        "$" + expenses.toFixed(2);

if (profitEl)
    profitEl.textContent =
        "$" + profit.toFixed(2);

}

/* SETTINGS */

function saveSettings() {

const name =
    document.getElementById(
        "ranchNameInput"
    ).value;

localStorage.setItem(
    "ranchName",
    name
);

document.getElementById(
    "ranchTitle"
).textContent = name;

}

function activateEnterprise() {

const code =
    document.getElementById(
        "enterpriseCode"
    ).value;

if (
    code.toUpperCase() ===
    "RANCH26"
) {

    localStorage.setItem(
        "subscription",
        "ENTERPRISE"
    );

    document.getElementById(
        "planBadge"
    ).textContent =
        "ENTERPRISE";
}

}

/* STARTUP */

document.addEventListener(
"DOMContentLoaded",
() => {

    renderAnimals();
    renderInventory();
    renderEquipment();
    renderEmployees();
    renderWorkOrders();
    renderTransactions();

    updateFinance();
    updateDashboard();
}

);
