(() => {

    // =========================
    // STORAGE CORE
    // =========================
    const get = (k) => JSON.parse(localStorage.getItem(k)) || [];
    const set = (k, v) => localStorage.setItem(k, JSON.stringify(v));
    const getValue = (k, f) => localStorage.getItem(k) || f;

    // =========================
    // SAAS SYSTEM
    // =========================
    const SaaS = (() => {

        const PLANS = {
            FREE: {
                limits: {
                    animals: 25,
                    inventory: 25,
                    employees: 5,
                    reports: false
                }
            },
            PRO: {
                limits: {
                    animals: 250,
                    inventory: 250,
                    employees: 25,
                    reports: true
                }
            },
            ENTERPRISE: {
                limits: {
                    animals: Infinity,
                    inventory: Infinity,
                    employees: Infinity,
                    reports: true
                }
            }
        };

        function plan() {
            return localStorage.getItem("subscription") || "FREE";
        }

        function current() {
            return PLANS[plan()] || PLANS.FREE;
        }

        function can(feature, count = 0) {
            const limit = current().limits[feature];

            if (limit === true) return true;
            if (limit === false) return false;

            return count < limit;
        }

        function upgrade(p) {
            localStorage.setItem("subscription", p);
            alert("Upgraded to " + p);
            location.reload();
        }

        return { plan, current, can, upgrade };

    })();

    // =========================
    // NAV HIDE ON SCROLL
    // =========================
    let lastScroll = window.scrollY;
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if (!nav) return;
        nav.classList.toggle("nav-hidden", window.scrollY > lastScroll);
        lastScroll = window.scrollY;
    });

    // =========================
    // DASHBOARD
    // =========================
    function updateDashboard() {

        const animals = get("animals");
        const inventory = get("inventory");
        const tx = get("transactions");

        let income = 0;
        let expense = 0;

        tx.forEach(t => {
            if (t.type === "income") income += t.amount;
            else expense += t.amount;
        });

        const setText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        setText("animalCount", animals.length);
        setText("inventoryCount", inventory.length);
        setText("totalIncome", "$" + income);
        setText("totalExpenses", "$" + expense);
        setText("netProfit", "$" + (income - expense));

        const plan = document.getElementById("planName");
        if (plan) plan.textContent = SaaS.plan();

        const ranchTitle = document.getElementById("ranchTitle");
        if (ranchTitle) {
            ranchTitle.textContent = getValue("ranchName", "Ranch Manager");
        }
    }

    // =========================
    // ANIMALS
    // =========================
    window.addAnimal = function () {

        const animals = get("animals");

        if (!SaaS.can("animals", animals.length)) {
            alert("Upgrade required to add more animals.");
            return;
        }

        animals.push({
            id: Date.now(),
            tag: document.getElementById("tagNumber")?.value || "",
            species: document.getElementById("species")?.value || "",
            breed: document.getElementById("breed")?.value || "",
            sex: document.getElementById("sex")?.value || "",
            weight: document.getElementById("weight")?.value || "",
            birthDate: document.getElementById("birthDate")?.value || ""
        });

        set("animals", animals);
        renderAnimals();
        updateDashboard();
    };

    function renderAnimals() {
        const el = document.getElementById("animalList");
        if (!el) return;

        const animals = get("animals");

        el.innerHTML = animals.map(a => `
            <div class="card">
                <strong>${a.tag}</strong><br>
                ${a.species} - ${a.breed}
            </div>
        `).join("") || "<p>No animals</p>";
    }

    // =========================
    // INVENTORY
    // =========================
    window.addInventoryItem = function () {

        const inv = get("inventory");

        if (!SaaS.can("inventory", inv.length)) {
            alert("Upgrade required for more inventory items.");
            return;
        }

        inv.push({
            id: Date.now(),
            name: document.getElementById("itemName")?.value || "",
            category: document.getElementById("itemCategory")?.value || "",
            quantity: Number(document.getElementById("itemQuantity")?.value || 0),
            reorder: Number(document.getElementById("reorderLevel")?.value || 0)
        });

        set("inventory", inv);
        renderInventory();
        updateDashboard();
    };

    function renderInventory() {
        const el = document.getElementById("inventoryList");
        if (!el) return;

        const inv = get("inventory");

        el.innerHTML = inv.map(i => `
            <div class="card">
                <strong>${i.name}</strong><br>
                ${i.category}<br>
                Qty: ${i.quantity}
            </div>
        `).join("") || "<p>No inventory</p>";
    }

    // =========================
    // FINANCE
    // =========================
    window.addExpense = function () {

        const tx = get("transactions");

        tx.push({
            id: Date.now(),
            name: document.getElementById("expenseName")?.value || "",
            amount: Number(document.getElementById("expenseAmount")?.value || 0),
            type: "expense"
        });

        set("transactions", tx);
        renderFinance();
        updateDashboard();
    };

    function renderFinance() {
        const el = document.getElementById("financeList");
        if (!el) return;

        const tx = get("transactions");

        let income = 0, expense = 0;

        tx.forEach(t => {
            if (t.type === "income") income += t.amount;
            else expense += t.amount;
        });

        el.innerHTML = `
            <div class="card">Income: $${income}</div>
            <div class="card">Expenses: $${expense}</div>
            <div class="card">Profit: $${income - expense}</div>
        `;
    }

    // =========================
    // SETTINGS
    // =========================
    window.saveRanchSettings = function () {
        const name = document.getElementById("ranchName")?.value;
        if (name) localStorage.setItem("ranchName", name);
        updateDashboard();
    };

    window.redeemCode = function () {
        const code = document.getElementById("codeInput")?.value;

        const codes = ["BUDE-ALPHA-001", "BUDE-ALPHA-002"];

        if (codes.includes(code)) {
            localStorage.setItem("subscription", "ENTERPRISE");
            alert("Enterprise Unlocked");
        } else {
            alert("Invalid Code");
        }

        updateDashboard();
    };

    // =========================
    // REPORTS
    // =========================
    function renderReports() {

        const animals = get("animals");
        const tx = get("transactions");

        let expense = 0;

        tx.forEach(t => {
            if (t.type === "expense") expense += t.amount;
        });

        const a = document.getElementById("reportAnimals");
        const e = document.getElementById("reportExpenses");
        const c = document.getElementById("costPerAnimal");

        if (a) a.textContent = animals.length;
        if (e) e.textContent = "$" + expense;
        if (c) c.textContent =
            animals.length ? "$" + (expense / animals.length).toFixed(2) : "$0";
    }

    // =========================
    // INIT
    // =========================
    document.addEventListener("DOMContentLoaded", () => {
        renderAnimals();
        renderInventory();
        renderFinance();
        renderReports();
        updateDashboard();
    });

    // expose SaaS globally for settings page
    window.SaaS = SaaS;

})();
