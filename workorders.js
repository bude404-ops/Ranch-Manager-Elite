// Ranch Manager Elite - Work Orders System V1

class WorkOrderManager {

    constructor() {

        this.orders =
            JSON.parse(localStorage.getItem("workOrders")) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "workOrders",
            JSON.stringify(this.orders)
        );
    }

    addOrder() {

        const order = {

            id: Date.now(),

            title:
                document.getElementById("title").value,

            priority:
                document.getElementById("priority").value,

            assignedTo:
                document.getElementById("assignedTo").value,

            dueDate:
                document.getElementById("dueDate").value,

            description:
                document.getElementById("description").value,

            completed: false,

            createdAt: new Date().toISOString()
        };

        if (!order.title) {
            alert("Task title is required");
            return;
        }

        this.orders.push(order);

        this.save();

        this.render();
    }

    toggleComplete(id) {

        this.orders = this.orders.map(order => {

            if (order.id === id) {
                return {
                    ...order,
                    completed: !order.completed
                };
            }

            return order;
        });

        this.save();

        this.render();
    }

    deleteOrder(id) {

        this.orders =
            this.orders.filter(
                o => o.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById("workOrderList");

        if (!list) return;

        list.innerHTML = "";

        this.orders
        .sort((a, b) =>
            new Date(a.dueDate) - new Date(b.dueDate)
        )
        .forEach(order => {

            const priorityClass =
                order.priority === "Critical"
                ? "danger-box"
                : order.priority === "High"
                ? "alert-box"
                : "";

            list.innerHTML += `
                <div class="card ${priorityClass}">
                    <h3>${order.title}</h3>

                    <p><strong>Priority:</strong> ${order.priority}</p>
                    <p><strong>Assigned:</strong> ${order.assignedTo || "Unassigned"}</p>
                    <p><strong>Due:</strong> ${order.dueDate}</p>

                    ${order.description ? `<p>${order.description}</p>` : ""}

                    <p>
                        <strong>Status:</strong>
                        ${order.completed ? "✅ Completed" : "⏳ Open"}
                    </p>

                    <button onclick="workOrderManager.toggleComplete(${order.id})">
                        Toggle Complete
                    </button>

                    <button onclick="workOrderManager.deleteOrder(${order.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    }
}

const workOrderManager = new WorkOrderManager();

function addWorkOrder() {
    workOrderManager.addOrder();
}
