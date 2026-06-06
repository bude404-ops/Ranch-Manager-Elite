/* =====================================================
   RANCH MANAGER ELITE
   CORE V1
===================================================== */

const Ranch = {

    storage: {

        get(key, fallback = []) {

            try {

                const value = localStorage.getItem(key);

                return value
                    ? JSON.parse(value)
                    : fallback;

            } catch (err) {

                console.error(err);

                return fallback;
            }
        },

        set(key, value) {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        }

    }

};

/* =====================================================
   MOBILE NAV
===================================================== */

function toggleNav() {

    const nav =
        document.getElementById(
            "navMenu"
        );

    if (!nav) return;

    nav.classList.toggle(
        "nav-open"
    );
}

/* =====================================================
   SAAS
===================================================== */

const SaaS = {

    upgrade(plan) {

        localStorage.setItem(
            "subscription",
            plan
        );

        document
            .querySelectorAll("#planName")
            .forEach(el => {

                el.textContent = plan;

            });

        alert(
            "Plan updated: " + plan
        );
    }

};

/* =====================================================
   SETTINGS
===================================================== */

function loadRanchSettings() {

    const ranchName =
        localStorage.getItem(
            "ranchName"
        ) || "Operations Dashboard";

    const plan =
        localStorage.getItem(
            "subscription"
        ) || "FREE";

    const title =
        document.getElementById(
            "ranchTitle"
        );

    if (title) {

        title.textContent =
            ranchName;

    }

    document
        .querySelectorAll("#planName")
        .forEach(el => {

            el.textContent =
                plan;

        });
}
/* =====================================================
   ANIMALS
===================================================== */

function addAnimal() {

    const tag =
        document.getElementById(
            "tagNumber"
        );

    if (!tag) return;

    if (!tag.value.trim()) {

        alert(
            "Tag Number required"
        );

        return;
    }

    const animals =
        Ranch.storage.get(
            "animals",
            []
        );

    animals.push({

        id: Date.now(),

        tagNumber:
            tag.value,

        species:
            document.getElementById(
                "species"
            )?.value || "",

        breed:
            document.getElementById(
                "breed"
            )?.value || "",

        sex:
            document.getElementById(
                "sex"
            )?.value || "",

        weight:
            document.getElementById(
                "weight"
            )?.value || "",

        birthDate:
            document.getElementById(
                "birthDate"
            )?.value || "",

        notes:
            document.getElementById(
                "notes"
            )?.value || ""

    });

    Ranch.storage.set(
        "animals",
        animals
    );

    renderAnimals();
updateDashboard();
updateReports();

tag.value = "";
}

function renderAnimals() {

    const container =
        document.getElementById(
            "animalList"
        );

    if (!container) return;

    const animals =
        Ranch.storage.get(
            "animals",
            []
        );

    if (!animals.length) {

        container.innerHTML =
            "<p>No animals found.</p>";

        return;
    }

    container.innerHTML =
        animals.map(a => `

        <div class="card">

            <strong>
                ${a.tagNumber}
            </strong>

            <br>

            ${a.species}

            <br>

            ${a.breed}

            <br>

            ${a.sex}

            <br>

            ${a.weight} lbs

        </div>

        `).join("");
}

/* =====================================================
   INVENTORY
===================================================== */

function addInventoryItem() {

    const name =
        document.getElementById(
            "itemName"
        );

    if (!name) return;

    if (!name.value.trim()) {

        alert(
            "Item name required"
        );

        return;
    }

    const inventory =
        Ranch.storage.get(
            "inventory",
            []
        );

    inventory.push({

        id: Date.now(),

        name:
            name.value,

        category:
            document.getElementById(
                "itemCategory"
            )?.value || "",

        quantity:
            Number(
                document.getElementById(
                    "itemQuantity"
                )?.value || 0
            ),

        reorder:
            Number(
                document.getElementById(
                    "reorderLevel"
                )?.value || 0
            )

    });

    Ranch.storage.set(
        "inventory",
        inventory
    );

    renderInventory();
updateDashboard();
updateReports();

name.value = "";

}

function renderInventory() {

    const container =
        document.getElementById(
            "inventoryList"
        );

    if (!container) return;

    const inventory =
        Ranch.storage.get(
            "inventory",
            []
        );

    if (!inventory.length) {

        container.innerHTML =
            "<p>No inventory.</p>";

        return;
    }

    container.innerHTML =
        inventory.map(item => `

        <div class="card">

            <strong>
                ${item.name}
            </strong>

            <br>

            ${item.category}

            <br>

            Quantity:
            ${item.quantity}

            <br>

            Reorder:
            ${item.reorder}

        </div>

        `).join("");

}

/* =====================================================
   FINANCE
===================================================== */

function addTransaction() {

    const name =
        document.getElementById(
            "transactionName"
        );

    if (!name) return;

    const amount =
        Number(
            document.getElementById(
                "transactionAmount"
            )?.value || 0
        );

    if (!name.value.trim()) {

        alert(
            "Description required"
        );

        return;
    }

    const transactions =
        Ranch.storage.get(
            "transactions",
            []
        );

    transactions.push({

        id: Date.now(),

        name:
            name.value,

        amount:
            amount,

        type:
            document.getElementById(
                "transactionType"
            )?.value || "expense",

        category:
            document.getElementById(
                "transactionCategory"
            )?.value || "Other",

        created:
            new Date().toISOString()

    });

    Ranch.storage.set(
        "transactions",
        transactions
    );

    renderTransactions();
    updateFinanceTotals();
    updateDashboard();
}

function renderTransactions() {

    const list =
        document.getElementById(
            "transactionList"
        );

    if (!list) return;

    const transactions =
        Ranch.storage.get(
            "transactions",
            []
        );

    if (!transactions.length) {

        list.innerHTML =
            "<p>No transactions.</p>";

        return;
    }

    list.innerHTML =
        transactions.map(t => `

        <div class="card">

            <strong>
                ${t.name}
            </strong>

            <br>

            Type:
            ${t.type}

            <br>

            Category:
            ${t.category}

            <br>

            Amount:
            $${Number(
                t.amount
            ).toFixed(2)}

        </div>

        `).join("");
}

function updateFinanceTotals() {

    const transactions =
        Ranch.storage.get(
            "transactions",
            []
        );

    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {

        const amount =
            Number(
                t.amount || 0
            );

        if (
            t.type === "income"
        ) {

            income += amount;

        } else {

            expenses += amount;
        }

    });

    const profit =
        income - expenses;

    const incomeEl =
        document.getElementById(
            "totalIncome"
        );

    const expenseEl =
        document.getElementById(
            "totalExpenses"
        );

    const profitEl =
        document.getElementById(
            "netProfit"
        );

    if (incomeEl) {

        incomeEl.textContent =
            "$" +
            income.toFixed(2);

    }

    if (expenseEl) {

        expenseEl.textContent =
            "$" +
            expenses.toFixed(2);

    }

    if (profitEl) {

        profitEl.textContent =
            "$" +
            profit.toFixed(2);

    }

    updateTaxes(
    income,
    expenses,
    profit
);

}

/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const animals =
        Ranch.storage.get(
            "animals",
            []
        );

    const inventory =
        Ranch.storage.get(
            "inventory",
            []
        );

    const animalCount =
        document.getElementById(
            "animalCount"
        );

    const inventoryCount =
        document.getElementById(
            "inventoryCount"
        );

    if (animalCount) {

        animalCount.textContent =
            animals.length;

    }

    if (inventoryCount) {

        inventoryCount.textContent =
            inventory.length;

    }

    const summary =
        document.getElementById(
            "ranchSummary"
        );

    if (summary) {

        summary.innerHTML = `

            <p>
                Animals:
                <strong>
                    ${animals.length}
                </strong>
            </p>

            <p>
                Inventory:
                <strong>
                    ${inventory.length}
                </strong>
            </p>

            <p>
                Status:
                <strong>
                    Operational
                </strong>
            </p>

        `;
    }

    const alerts =
        document.getElementById(
            "lowStockAlerts"
        );

    if (alerts) {

        const lowStock =
            inventory.filter(
                item =>
                    Number(
                        item.quantity
                    ) <=
                    Number(
                        item.reorder
                    )
            );

        if (
            lowStock.length === 0
        ) {

            alerts.innerHTML =
                "<p>No alerts.</p>";

        } else {

            alerts.innerHTML =
    lowStock.map(item => `

    <div class="card">

        <strong>
            ${item.name}
        </strong>

        <br>

        Qty:
        ${item.quantity}

    </div>

    `).join("");

        }
    }
}
/* =====================================================
   REPORTS
===================================================== */

function updateReports() {

    const animals =
        Ranch.storage.get(
            "animals",
            []
        );

    const inventory =
        Ranch.storage.get(
            "inventory",
            []
        );

    const transactions =
        Ranch.storage.get(
            "transactions",
            []
        );

    let expenses = 0;

    transactions.forEach(t => {

        if (
            t.type === "expense"
        ) {

            expenses +=
                Number(
                    t.amount || 0
                );
        }

    });

    const rAnimals =
        document.getElementById(
            "rAnimals"
        );

    const rInventory =
        document.getElementById(
            "rInventory"
        );

    const rExpenses =
        document.getElementById(
            "rExpenses"
        );

    if (rAnimals) {

        rAnimals.textContent =
            animals.length;

    }

    if (rInventory) {

        rInventory.textContent =
            inventory.length;

    }

    if (rExpenses) {

        rExpenses.textContent =
            "$" +
            expenses.toFixed(2);

    }

}

/* =====================================================
   TAXES
===================================================== */

function updateTaxes(
    income,
    expenses,
    profit
) {

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

    if (taxIncome) {

        taxIncome.textContent =
            "$" +
            income.toFixed(2);

    }

    if (taxExpenses) {

        taxExpenses.textContent =
            "$" +
            expenses.toFixed(2);

    }

    if (taxProfit) {

        taxProfit.textContent =
            "$" +
            profit.toFixed(2);

    }

}

function refreshTaxPage() {

    const transactions =
        Ranch.storage.get(
            "transactions",
            []
        );

    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {

        const amount =
            Number(
                t.amount || 0
            );

        if (
            t.type === "income"
        ) {

            income += amount;

        } else {

            expenses += amount;

        }

    });

    updateTaxes(
    income,
    expenses,
    income - expenses
);

}
    
/* =====================================================
   PAGE INIT
===================================================== */


function initializePage() {

    loadRanchSettings();

    renderAnimals();

    renderInventory();

    renderTransactions();

    updateFinanceTotals();

    updateDashboard();

    updateReports();

    refreshTaxPage();

}

/* =====================================================
   STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializePage();

        console.log(
            "🐄 Ranch Manager Elite Core V1 Loaded"
        );

    }
);

/* =====================================================
   GLOBAL EXPORTS
===================================================== */

window.toggleNav =
    toggleNav;

window.addAnimal =
    addAnimal;

window.addInventoryItem =
    addInventoryItem;

window.addTransaction =
    addTransaction;

window.SaaS =
    SaaS;
