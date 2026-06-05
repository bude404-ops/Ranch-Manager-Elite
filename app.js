// =======================================
// Ranch Manager Elite - GLOBAL APP CORE
// Single SaaS Engine
// =======================================

const App = (() => {

    // -----------------------------
    // STORAGE
    // -----------------------------
    const get = (key) =>
        JSON.parse(localStorage.getItem(key)) || [];

    const set = (key, value) =>
        localStorage.setItem(key, JSON.stringify(value));

    const getValue = (key, fallback) =>
        localStorage.getItem(key) || fallback;

    // -----------------------------
    // NAV HIDE ON SCROLL
    // -----------------------------
    let lastScrollY = window.scrollY;
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (!nav) return;

        if (window.scrollY > lastScrollY) {
            nav.classList.add("nav-hidden");
        } else {
            nav.classList.remove("nav-hidden");
        }

        lastScrollY = window.scrollY;
    });

    // -----------------------------
    // DASHBOARD ENGINE
    // -----------------------------
    const updateDashboard = () => {

        const animals = get("animals");
        const inventory = get("inventory");
        const health = get("healthRecords");
        const breeding = get("breedingRecords");
        const workOrders = get("workOrders");
        const transactions = get("transactions");

        let income = 0;
        let expenses = 0;

        transactions.forEach(t => {
            const amt = Number(t.amount || 0);
            if (t.type === "income") income += amt;
            else expenses += amt;
        });

        const profit = income - expenses;

        const openWork = workOrders.filter(w => !w.completed).length;

        const setText = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };

        // CORE COUNTS
        setText("animalCount", animals.length);
        setText("inventoryCount", inventory.length);
        setText("healthCount", health.length);
        setText("breedingCount", breeding.length);
        setText("workOrderCount", openWork);

        // FINANCE
        setText("totalIncome", "$" + income.toFixed(2));
        setText("totalExpenses", "$" + expenses.toFixed(2));
        setText("netProfit", "$" + profit.toFixed(2));

        // ALERT SYSTEM
        const alerts = document.getElementById("alerts");

        if (alerts) {

            let html = "";

            if (openWork)
                html += `<p>🔧 ${openWork} open work orders</p>`;

            const healthRisk = health.filter(r =>
                r.type === "Injury" || r.type === "Surgery"
            ).length;

            if (healthRisk)
                html += `<p>🩺 ${healthRisk} health alerts</p>`;

            const lowStock = inventory.filter(i =>
                Number(i.quantity) <= Number(i.reorder)
            ).length;

            if (lowStock)
                html += `<p>📦 ${lowStock} low inventory items</p>`;

            if (!html)
                html = "<p>✅ All systems normal</p>";

            alerts.innerHTML = html;
        }

        // SUMMARY PANEL
        const summary = document.getElementById("summary");

        if (summary) {

            summary.innerHTML = `
                <p><strong>Animals:</strong> ${animals.length}</p>
                <p><strong>Inventory:</strong> ${inventory.length}</p>
                <p><strong>Health:</strong> ${health.length}</p>
                <p><strong>Breeding:</strong> ${breeding.length}</p>
                <p><strong>Work Orders:</strong> ${openWork}</p>
                <p><strong>Income:</strong> $${income.toFixed(2)}</p>
                <p><strong>Expenses:</strong> $${expenses.toFixed(2)}</p>
                <p><strong>Profit:</strong> $${profit.toFixed(2)}</p>
            `;
        }

        console.log("App.js Dashboard Engine Active");
    };

    // -----------------------------
    // INIT
    // -----------------------------
    const init = () => {

        updateDashboard();

        console.log("Ranch Manager Elite App Loaded");
    };

    return {
        init,
        get,
        set,
        updateDashboard
    };

})();

document.addEventListener("DOMContentLoaded", App.init);
