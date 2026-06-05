// Ranch Manager Elite - Inventory System V2

class InventoryManager {

    constructor() {

        this.inventory =
            JSON.parse(
                localStorage.getItem("inventory")
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "inventory",
            JSON.stringify(this.inventory)
        );
    }

    addItem() {

        const item = {

            id: Date.now(),

            name:
                document.getElementById("itemName").value,

            category:
                document.getElementById("itemCategory").value,

            quantity:
                Number(document.getElementById("itemQuantity").value || 0),

            reorder:
                Number(document.getElementById("reorderLevel").value || 0)
        };

        if (!item.name) {

            alert("Item name is required");
            return;
        }

        this.inventory.push(item);

        this.save();

        this.render();
    }

    deleteItem(id) {

        this.inventory =
            this.inventory.filter(
                item => item.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById("inventoryList");

        if (!list) return;

        list.innerHTML = "";

        this.inventory.forEach(item => {

            const lowStock =
                Number(item.quantity) <= Number(item.reorder);

            list.innerHTML += `
                <div class="card ${lowStock ? "danger-box" : ""}">
                    <h3>${item.name}</h3>
                    <p>Category: ${item.category}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Reorder Level: ${item.reorder}</p>

                    ${
                        lowStock
                        ? `<p class="status-warning">⚠ Low Stock</p>`
                        : `<p class="status-good">OK</p>`
                    }

                    <button onclick="inventoryManager.deleteItem(${item.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    }
}

const inventoryManager =
    new InventoryManager();

function addItem() {
    inventoryManager.addItem();
}
