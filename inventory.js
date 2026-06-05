class InventoryManager {

    constructor() {

        this.inventory =
            JSON.parse(
                localStorage.getItem(
                    "inventory"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "inventory",
            JSON.stringify(
                this.inventory
            )
        );
    }

    addItem() {

        const item = {

            id: Date.now(),

            name:
                document.getElementById(
                    "itemName"
                ).value,

            category:
                document.getElementById(
                    "itemCategory"
                ).value,

            quantity:
                Number(
                    document.getElementById(
                        "itemQuantity"
                    ).value
                ),

            reorder:
                Number(
                    document.getElementById(
                        "reorderLevel"
                    ).value
                )
        };

        if (!item.name) {

            alert(
                "Item Name Required"
            );

            return;
        }

        this.inventory.push(item);

        this.save();

        this.render();

        document.getElementById(
            "itemName"
        ).value = "";

        document.getElementById(
            "itemQuantity"
        ).value = "";

        document.getElementById(
            "reorderLevel"
        ).value = "";
    }

    deleteItem(id) {

        this.inventory =
            this.inventory.filter(
                item =>
                    item.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "inventoryList"
            );

        if (!list) return;

        list.innerHTML = "";

        if (
            this.inventory.length === 0
        ) {

            list.innerHTML =
                "<p>No inventory items.</p>";

            return;
        }

        this.inventory.forEach(item => {

            const lowStock =
                item.quantity <=
                item.reorder;

            list.innerHTML += `

            <div class="card">

                <h3>${item.name}</h3>

                <p>
                    Category:
                    ${item.category}
                </p>

                <p>
                    Quantity:
                    ${item.quantity}
                </p>

                <p>
                    Reorder Level:
                    ${item.reorder}
                </p>

                <p class="${
                    lowStock
                    ? "status-danger"
                    : "status-good"
                }">

                    ${
                        lowStock
                        ? "LOW STOCK"
                        : "IN STOCK"
                    }

                </p>

                <button
                onclick="inventory.deleteItem(${item.id})">
                Delete
                </button>

            </div>
            `;
        });
    }
}

const inventory =
    new InventoryManager();

function addItem() {

    inventory.addItem();
}
