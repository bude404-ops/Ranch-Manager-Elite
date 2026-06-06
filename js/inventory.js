function addInventory() {
    const name = document.getElementById("itemName").value;
    const qty = Number(document.getElementById("itemQuantity").value);

    if (!name) return alert("Item required");

    const items = Ranch.get("inventory", []);

    items.push({
        id: Date.now(),
        name,
        quantity: qty
    });

    Ranch.set("inventory", items);
    renderInventory();
    updateDashboard();
}

function renderInventory() {
    const list = document.getElementById("inventoryList");
    const items = Ranch.get("inventory", []);

    list.innerHTML = items.map(i =>
        `<div class="card">${i.name} - ${i.quantity}</div>`
    ).join("");
}
