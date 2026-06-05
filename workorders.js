class WorkOrderManager {

    constructor() {

        this.orders =
            JSON.parse(
                localStorage.getItem(
                    "workOrders"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "workOrders",
            JSON.stringify(
                this.orders
            )
        );
    }

    addOrder() {

        const order = {

            id: Date.now(),

            title:
                document.getElementById(
                    "workTitle"
                ).value,

            category:
                document.getElementById(
                    "workCategory"
                ).value,

            priority:
                document.getElementById(
                    "workPriority"
                ).value,

            assigned:
                document.getElementById(
                    "assignedTo"
                ).value,

            due:
                document.getElementById(
                    "dueDate"
                ).value,

            notes:
                document.getElementById(
                    "workNotes"
                ).value,

            completed:
                false
        };

        if (!order.title) {

            alert(
                "Task Title Required"
            );

            return;
        }

        this.orders.push(
            order
        );

        this.save();

        this.render();
    }

    completeOrder(id) {

        this.orders.forEach(order => {

            if (
                order.id === id
            ) {

                order.completed =
                    true;
            }
        });

        this.save();

        this.render();
    }

    deleteOrder(id) {

        this.orders =
            this.orders.filter(
                order =>
                    order.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "workOrderList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.orders.forEach(order => {

            list.innerHTML += `

            <div class="card">

                <h3>
                    ${order.title}
                </h3>

                <p>
                    Category:
                    ${order.category}
                </p>

                <p>
                    Priority:
                    ${order.priority}
                </p>

                <p>
                    Assigned:
                    ${order.assigned}
                </p>

                <p>
                    Due:
                    ${order.due}
                </p>

                <p>
                    Status:
                    ${
                        order.completed
                        ? "Completed"
                        : "Open"
                    }
                </p>

                <p>
                    ${order.notes}
                </p>

                ${
                    !order.completed
                    ? `
                    <button
                    onclick="workOrders.completeOrder(${order.id})">
                    Complete
                    </button>
                    `
                    : ""
                }

                <button
                onclick="workOrders.deleteOrder(${order.id})">
                Delete
                </button>

            </div>

            `;
        });
    }
}

const workOrders =
    new WorkOrderManager();

function addWorkOrder() {

    workOrders.addOrder();
}
