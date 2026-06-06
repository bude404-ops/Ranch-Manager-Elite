/* =========================
   RANCH MANAGER ELITE
   FIXED CORE APP
========================= */

const Ranch = {
  storage: {
    get(key, fallback = []) {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch (e) {
        return fallback;
      }
    },

    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

/* =========================
   NAV
========================= */

function toggleNav() {
  const nav = document.getElementById("navMenu");
  if (!nav) return;
  nav.classList.toggle("active");
}

/* =========================
   SETTINGS
========================= */

function loadRanchSettings() {
  const title = document.getElementById("ranchTitle");

  if (title) {
    title.textContent =
      localStorage.getItem("ranchName") || "Ranch Dashboard";
  }
}

/* =========================
   ANIMALS
========================= */

function addAnimal() {
  const tag = document.getElementById("tagNumber");

  if (!tag || !tag.value.trim()) {
    alert("Tag Number required");
    return;
  }

  const animals = Ranch.storage.get("animals");

  animals.push({
    id: Date.now(),
    tagNumber: tag.value
  });

  Ranch.storage.set("animals", animals);

  tag.value = "";

  renderAnimals();
  updateDashboard();
}

function renderAnimals() {
  const el = document.getElementById("animalList");
  if (!el) return;

  const animals = Ranch.storage.get("animals");

  el.innerHTML = animals.length
    ? animals
        .map(
          a => `
        <div class="card">
          <strong>${a.tagNumber}</strong>
        </div>
      `
        )
        .join("")
    : "<p>No animals found</p>";
}

/* =========================
   INVENTORY
========================= */

function addInventoryItem() {
  const name = document.getElementById("itemName");

  if (!name || !name.value.trim()) {
    alert("Item name required");
    return;
  }

  const inventory = Ranch.storage.get("inventory");

  inventory.push({
    id: Date.now(),
    name: name.value,
    quantity: Number(
      document.getElementById("itemQuantity")?.value || 0
    )
  });

  Ranch.storage.set("inventory", inventory);

  name.value = "";

  renderInventory();
  updateDashboard();
}

function renderInventory() {
  const el = document.getElementById("inventoryList");
  if (!el) return;

  const inventory = Ranch.storage.get("inventory");

  el.innerHTML = inventory.length
    ? inventory
        .map(
          i => `
        <div class="card">
          <strong>${i.name}</strong><br>
          Qty: ${i.quantity}
        </div>
      `
        )
        .join("")
    : "<p>No inventory</p>";
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {
  const animals = Ranch.storage.get("animals");
  const inventory = Ranch.storage.get("inventory");

  const animalCount = document.getElementById("animalCount");
  const inventoryCount = document.getElementById("inventoryCount");

  if (animalCount) animalCount.textContent = animals.length;
  if (inventoryCount) inventoryCount.textContent = inventory.length;

  const summary = document.getElementById("ranchSummary");

  if (summary) {
    summary.innerHTML = `
      <p>Animals: <strong>${animals.length}</strong></p>
      <p>Inventory: <strong>${inventory.length}</strong></p>
      <p>Status: <strong>Operational</strong></p>
    `;
  }
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadRanchSettings();
  renderAnimals();
  renderInventory();
  updateDashboard();
});
