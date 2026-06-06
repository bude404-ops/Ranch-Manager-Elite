/* =====================================================
RANCH OS ENTERPRISE
app.js v3
===================================================== */

const RanchOS = {

    get(key, fallback = []) {

        try {

            const value =
                localStorage.getItem(key);

            return value
                ? JSON.parse(value)
                : fallback;

        } catch {

            return fallback;

        }

    },

    set(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }

};

/* ====================================
UI
==================================== */

function toggleSidebar() {

    document
        .getElementById("sidebar")
        ?.classList
        .toggle("open");

}

function showSection(id) {

    document
        .querySelectorAll(".page-section")
        .forEach(section => {

            section.classList.add(
                "hidden"
            );

        });

    document
        .getElementById(id)
        ?.classList.remove(
            "hidden"
        );

}

/* ====================================
DASHBOARD
==================================== */

function updateDashboard() {

    const setValue =
        (id, value) => {

            const el =
                document.getElementById(id);

            if (el) {

                el.textContent =
                    value;

            }

        };

    setValue(
        "animalCount",
        RanchOS.get(
            "animals",
            []
        ).length
    );

    setValue(
        "paddockCount",
        RanchOS.get(
            "paddocks",
            []
        ).length
    );

    setValue(
        "equipmentCount",
        RanchOS.get(
            "equipment",
            []
        ).length
    );

    setValue(
        "employeeCount",
        RanchOS.get(
            "employees",
            []
        ).length
    );

}

/* ====================================
LIVESTOCK
==================================== */

function addAnimal() {

    const tag =
        document.getElementById(
            "tagNumber"
        )?.value || "";

    const species =
        document.getElementById(
            "species"
        )?.value || "";

    const breed =
        document.getElementById(
            "breed"
        )?.value || "";

    const weight =
        document.getElementById(
            "weight"
        )?.value || "";

    if (!tag.trim()) {

        alert(
            "Tag Number Required"
        );

        return;

    }

    const animals =
        RanchOS.get(
            "animals",
            []
        );

    animals.push({

        id: Date.now(),

        tag,

        species,

        breed,

        weight,

        created:
            new Date()
            .toISOString()

    });

    RanchOS.set(
        "animals",
        animals
    );

    renderAnimals();

    updateDashboard();

}

function renderAnimals() {

    const list =
        document.getElementById(
            "animalList"
        );

    if (!list) return;

    const animals =
        RanchOS.get(
            "animals",
            []
        );

    list.innerHTML =
        animals.map(
            animal => `
            <div class="card">

                <strong>
                    ${animal.tag}
                </strong>

                <br>

                ${animal.species}

                <br>

                ${animal.breed}

                <br>

                Weight:
                ${animal.weight}

            </div>
        `
        ).join("");

}
/* ====================================
INVENTORY
==================================== */

function addInventoryItem() {

    const name =
        document.getElementById(
            "inventoryName"
        )?.value || "";

    const qty =
        document.getElementById(
            "inventoryQty"
        )?.value || 0;

    if (!name.trim()) return;

    const inventory =
        RanchOS.get(
            "inventory",
            []
        );

    inventory.push({

        id: Date.now(),

        name,

        qty

    });

    RanchOS.set(
        "inventory",
        inventory
    );

    renderInventory();

}

function renderInventory() {

    const list =
        document.getElementById(
            "inventoryList"
        );

    if (!list) return;

    const inventory =
        RanchOS.get(
            "inventory",
            []
        );

    list.innerHTML =
        inventory.map(
            item => `
            <div class="card">

                <strong>
                    ${item.name}
                </strong>

                <br>

                Qty:
                ${item.qty}

            </div>
        `
        ).join("");

}

/* ====================================
EQUIPMENT
==================================== */

function addEquipment() {

    const name =
        document.getElementById(
            "equipmentName"
        )?.value || "";

    if (!name.trim()) return;

    const equipment =
        RanchOS.get(
            "equipment",
            []
        );

    equipment.push({

        id: Date.now(),

        name,

        status: "Active"

    });

    RanchOS.set(
        "equipment",
        equipment
    );

    renderEquipment();

    updateDashboard();

}

function renderEquipment() {

    const list =
        document.getElementById(
            "equipmentList"
        );

    if (!list) return;

    const equipment =
        RanchOS.get(
            "equipment",
            []
        );

    list.innerHTML =
        equipment.map(
            item => `
            <div class="card">

                <strong>
                    ${item.name}
                </strong>

                <br>

                ${item.status}

            </div>
        `
        ).join("");

}

/* ====================================
EMPLOYEES
==================================== */

function addEmployee() {

    const name =
        document.getElementById(
            "employeeName"
        )?.value || "";

    if (!name.trim()) return;

    const employees =
        RanchOS.get(
            "employees",
            []
        );

    employees.push({

        id: Date.now(),

        name,

        role: "Worker"

    });

    RanchOS.set(
        "employees",
        employees
    );

    renderEmployees();

    updateDashboard();

}

function renderEmployees() {

    const list =
        document.getElementById(
            "employeeList"
        );

    if (!list) return;

    const employees =
        RanchOS.get(
            "employees",
            []
        );

    list.innerHTML =
        employees.map(
            employee => `
            <div class="card">

                <strong>
                    ${employee.name}
                </strong>

                <br>

                ${employee.role}

            </div>
        `
        ).join("");

}

/* ====================================
WORK ORDERS
==================================== */

function addWorkOrder() {

    const title =
        document.getElementById(
            "workTitle"
        )?.value || "";

    if (!title.trim()) return;

    const workorders =
        RanchOS.get(
            "workorders",
            []
        );

    workorders.push({

        id: Date.now(),

        title,

        status: "Open",

        created:
            new Date()
            .toISOString()

    });

    RanchOS.set(
        "workorders",
        workorders
    );

    renderWorkOrders();

}

function renderWorkOrders() {

    const list =
        document.getElementById(
            "workOrderList"
        );

    if (!list) return;

    const workorders =
        RanchOS.get(
            "workorders",
            []
        );

    list.innerHTML =
        workorders.map(
            order => `
            <div class="card">

                <strong>
                    ${order.title}
                </strong>

                <br>

                Status:
                ${order.status}

            </div>
        `
        ).join("");

}
/* ====================================
PADDOCKS
==================================== */

function addPaddock() {

const name =
    document.getElementById(
        "paddockName"
    )?.value || "";

const acres =
    document.getElementById(
        "paddockAcres"
    )?.value || "";

if (!name.trim()) return;

const paddocks =
    RanchOS.get(
        "paddocks",
        []
    );

paddocks.push({

    id: Date.now(),

    name,

    acres,

    status: "Active"

});

RanchOS.set(
    "paddocks",
    paddocks
);

renderPaddocks();

updateDashboard();

}

function renderPaddocks() {

const list =
    document.getElementById(
        "paddockList"
    );

if (!list) return;

const paddocks =
    RanchOS.get(
        "paddocks",
        []
    );

list.innerHTML =
    paddocks.map(
        paddock => `
        <div class="card">

            <strong>
                ${paddock.name}
            </strong>

            <br>

            Acres:
            ${paddock.acres}

        </div>
    `
    ).join("");

}

/* ====================================
FINANCE
==================================== */

function addTransaction() {

const name =
    document.getElementById(
        "transactionName"
    )?.value || "";

const amount =
    Number(
        document.getElementById(
            "transactionAmount"
        )?.value || 0
    );

const type =
    document.getElementById(
        "transactionType"
    )?.value || "expense";

if (!name.trim()) return;

const transactions =
    RanchOS.get(
        "transactions",
        []
    );

transactions.push({

    id: Date.now(),

    name,

    amount,

    type

});

RanchOS.set(
    "transactions",
    transactions
);

renderTransactions();

updateFinance();

if (
    window.RanchCharts
    ?.refresh
) {

    RanchCharts.refresh();

}

}

function renderTransactions() {

const list =
    document.getElementById(
        "transactionList"
    );

if (!list) return;

const transactions =
    RanchOS.get(
        "transactions",
        []
    );

list.innerHTML =
    transactions.map(
        transaction => `
        <div class="card">

            <strong>
                ${transaction.name}
            </strong>

            <br>

            ${transaction.type}

            <br>

            $${transaction.amount}

        </div>
    `
    ).join("");

}

/* ====================================
TAX CENTER
==================================== */

function updateFinance() {

const transactions =
    RanchOS.get(
        "transactions",
        []
    );

let income = 0;
let expenses = 0;

transactions.forEach(
    transaction => {

        if (
            transaction.type ===
            "income"
        ) {

            income +=
                Number(
                    transaction.amount
                );

        } else {

            expenses +=
                Number(
                    transaction.amount
                );

        }

    }
);

const profit =
    income - expenses;

const taxIncome =
    document.getElementById(
        "taxIncome"
    );

const taxExpenses =
    document.getElementById(
        "taxExpenses"
    );

const taxProfit =
    document.getElementById(
        "taxProfit"
    );

if (taxIncome)
    taxIncome.textContent =
        "$" +
        income.toFixed(2);

if (taxExpenses)
    taxExpenses.textContent =
        "$" +
        expenses.toFixed(2);

if (taxProfit)
    taxProfit.textContent =
        "$" +
        profit.toFixed(2);

}

/* ====================================
REPORTS
==================================== */

function generateReport() {

const report =
    document.getElementById(
        "reportContainer"
    );

if (!report) return;

report.innerHTML = `

    <div class="card">

        <h3>
            Ranch Summary
        </h3>

        <p>
            Animals:
            ${RanchOS.get(
                "animals",
                []
            ).length}
        </p>

        <p>
            Paddocks:
            ${RanchOS.get(
                "paddocks",
                []
            ).length}
        </p>

        <p>
            Equipment:
            ${RanchOS.get(
                "equipment",
                []
            ).length}
        </p>

        <p>
            Employees:
            ${RanchOS.get(
                "employees",
                []
            ).length}
        </p>

    </div>

`;

}
/* ====================================
SETTINGS
==================================== */

function saveSettings() {

const ranchName =
    document.getElementById(
        "ranchNameInput"
    )?.value || "Ranch OS";

localStorage.setItem(
    "ranchName",
    ranchName
);

const title =
    document.getElementById(
        "ranchTitle"
    );

if (title) {

    title.textContent =
        ranchName;

}

alert(
    "Settings Saved"
);

}

/* ====================================
ENTERPRISE ACTIVATION
==================================== */

function activateEnterprise() {

const code =
    document.getElementById(
        "enterpriseCode"
    )?.value || "";

if (
    code.toUpperCase() ===
    "RANCH26"
) {

    localStorage.setItem(
        "subscription",
        "ENTERPRISE"
    );

    const badge =
        document.getElementById(
            "planBadge"
        );

    if (badge) {

        badge.textContent =
            "ENTERPRISE";

    }

    alert(
        "Enterprise Activated"
    );

} else {

    alert(
        "Invalid Code"
    );

}

}

/* ====================================
GPS PLACEHOLDERS
==================================== */

function addFence() {

alert(
    "Fence mapping coming in GPS module"
);

}

function addWaterSource() {

alert(
    "Water source mapping coming in GPS module"
);

}

function addGate() {

alert(
    "Gate mapping coming in GPS module"
);

}

/* ====================================
INITIALIZATION
==================================== */

function initialize() {

const ranchTitle =
    document.getElementById(
        "ranchTitle"
    );

if (ranchTitle) {

    ranchTitle.textContent =
        localStorage.getItem(
            "ranchName"
        ) || "Ranch OS";

}

const planBadge =
    document.getElementById(
        "planBadge"
    );

if (planBadge) {

    planBadge.textContent =
        localStorage.getItem(
            "subscription"
        ) || "FREE";

}

renderAnimals();

renderInventory();

renderEquipment();

renderEmployees();

renderWorkOrders();

renderPaddocks();

renderTransactions();

updateFinance();

updateDashboard();

generateReport();

if (
    window.RanchCharts
    ?.refresh
) {

    RanchCharts.refresh();

}

}

/* ====================================
APP START
==================================== */

document.addEventListener(
"DOMContentLoaded",
initialize
);
