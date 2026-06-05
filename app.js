(() => {

    "use strict";

    // =========================
    // GLOBAL SAFETY WRAPPER
    // =========================
    try {

        console.log("🐄 Ranch Manager Elite - Booting...");

        // =========================
        // SAFE STORAGE ENGINE
        // =========================
        const Storage = {
            get(key, fallback) {
                try {
                    const data = localStorage.getItem(key);
                    return data ? JSON.parse(data) : fallback;
                } catch (e) {
                    console.warn("Storage read error:", key, e);
                    return fallback;
                }
            },

            set(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (e) {
                    console.warn("Storage write error:", key, e);
                }
            },

            raw(key, fallback = "") {
                return localStorage.getItem(key) || fallback;
            }
        };

        // =========================
        // SAFE ELEMENT HELPER
        // =========================
        const $ = (id) => document.getElementById(id);

        const setText = (id, value) => {
            const el = $(id);
            if (el) el.textContent = value;
        };

        // =========================
        // SAAS SYSTEM (SAFE)
        // =========================
        const SaaS = {
            plan() {
                return Storage.raw("subscription", "FREE");
            },

            limits() {
                const p = this.plan();

                const map = {
                    FREE: { animals: 25, inventory: 25, employees: 5 },
                    PRO: { animals: 250, inventory: 250, employees: 25 },
                    ENTERPRISE: { animals: Infinity, inventory: Infinity, employees: Infinity }
                };

                return map[p] || map.FREE;
            },

            can(feature, count) {
                const limit = this.limits()[feature];
                if (limit === undefined) return true;
                return count < limit;
            },

            upgrade(plan) {
                Storage.set("subscription", plan);
                alert("Upgraded to " + plan);
                location.reload();
            }
        };

        // expose globally
        window.SaaS = SaaS;

        // =========================
        // NAV HIDE (SAFE)
        // =========================
        try {
            let lastScroll = window.scrollY;
            const nav = document.querySelector("nav");

            window.addEventListener("scroll", () => {
                if (!nav) return;
                nav.classList.toggle("nav-hidden", window.scrollY > lastScroll);
                lastScroll = window.scrollY;
            });
        } catch (e) {
            console.warn("Nav scroll module failed:", e);
        }

        // =========================
        // ANIMALS MODULE
        // =========================
        function getAnimals() {
            return Storage.get("animals", []);
        }

        window.addAnimal = function () {
            try {
                const animals = getAnimals();

                if (!SaaS.can("animals", animals.length)) {
                    alert("Upgrade required for more animals.");
                    return;
                }

                animals.push({
                    id: Date.now(),
                    tag: $("tagNumber")?.value || "",
                    species: $("species")?.value || "",
                    breed: $("breed")?.value || "",
                    sex: $("sex")?.value || "",
                    weight: $("weight")?.value || "",
                    birthDate: $("birthDate")?.value || ""
                });

                Storage.set("animals", animals);
                renderAnimals();
                updateDashboard();

            } catch (e) {
                console.error("addAnimal failed:", e);
            }
        };

        function renderAnimals() {
            try {
                const el = $("animalList");
                if (!el) return;

                const animals = getAnimals();

                el.innerHTML = animals.length
                    ? animals.map(a => `
                        <div class="card">
                            <strong>${a.tag}</strong><br>
                            ${a.species} - ${a.breed}
                        </div>
                    `).join("")
                    : "<p>No animals</p>";

            } catch (e) {
                console.warn("renderAnimals failed:", e);
            }
        }

        // =========================
        // INVENTORY MODULE
        // =========================
        function getInventory() {
            return Storage.get("inventory", []);
        }

        window.addInventoryItem = function () {
            try {
                const inv = getInventory();

                if (!SaaS.can("inventory", inv.length)) {
                    alert("Upgrade required for inventory limit.");
                    return;
                }

                inv.push({
                    id: Date.now(),
                    name: $("itemName")?.value || "",
                    category: $("itemCategory")?.value || "",
                    quantity: Number($("itemQuantity")?.value || 0),
                    reorder: Number($("reorderLevel")?.value || 0)
                });

                Storage.set("inventory", inv);
                renderInventory();
                updateDashboard();

            } catch (e) {
                console.error("addInventoryItem failed:", e);
            }
        };

        function renderInventory() {
            try {
                const el = $("inventoryList");
                if (!el) return;

                const inv = getInventory();

                el.innerHTML = inv.length
                    ? inv.map(i => `
                        <div class="card">
                            <strong>${i.name}</strong><br>
                            ${i.category}<br>
                            Qty: ${i.quantity}
                        </div>
                    `).join("")
                    : "<p>No inventory</p>";

            } catch (e) {
                console.warn("renderInventory failed:", e);
            }
        }

        // =========================
        // FINANCE MODULE
        // =========================
        function getTx() {
            return Storage.get("transactions", []);
        }

        window.addExpense = function () {
            try {
                const tx = getTx();

                tx.push({
                    id: Date.now(),
                    name: $("expenseName")?.value || "",
                    amount: Number($("expenseAmount")?.value || 0),
                    type: "expense"
                });

                Storage.set("transactions", tx);
                renderFinance();
                updateDashboard();

            } catch (e) {
                console.error("addExpense failed:", e);
            }
        };

        function renderFinance() {
            try {
                const el = $("financeList");
                if (!el) return;

                const tx = getTx();

                let income = 0;
                let expense = 0;

                tx.forEach(t => {
                    if (t.type === "income") income += t.amount;
                    else expense += t.amount;
                });

                el.innerHTML = `
                    <div class="card">Income: $${income}</div>
                    <div class="card">Expenses: $${expense}</div>
                    <div class="card">Profit: $${income - expense}</div>
                `;

            } catch (e) {
                console.warn("renderFinance failed:", e);
            }
        }

        // =========================
        // DASHBOARD (SAFE CORE)
        // =========================
        function updateDashboard() {
            try {

                const animals = getAnimals();
                const inventory = getInventory();
                const tx = getTx();

                let income = 0;
                let expense = 0;

                tx.forEach(t => {
                    if (t.type === "income") income += t.amount;
                    else expense += t.amount;
                });

                setText("animalCount", animals.length);
                setText("inventoryCount", inventory.length);
                setText("totalIncome", "$" + income);
                setText("totalExpenses", "$" + expense);
                setText("netProfit", "$" + (income - expense));

                setText("planName", SaaS.plan());

                const ranchTitle = $("ranchTitle");
                if (ranchTitle) {
                    ranchTitle.textContent = Storage.raw("ranchName", "Ranch Manager Elite");
                }

            } catch (e) {
                console.error("Dashboard update failed:", e);
            }
        }

        // =========================
        // GLOBAL SAFE INIT
        // =========================
        document.addEventListener("DOMContentLoaded", () => {
            try {
                renderAnimals();
                renderInventory();
                renderFinance();
                updateDashboard();
                console.log("✅ Ranch Manager Elite Loaded Safely");
            } catch (e) {
                console.error("Init failed:", e);
            }
        });

    } catch (fatal) {
        console.error("❌ FATAL APP ERROR:", fatal);
        document.body.innerHTML = "<h2>App failed to load. Check console.</h2>";
    }

})();
