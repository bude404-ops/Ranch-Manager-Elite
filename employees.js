// Ranch Manager Elite - Employees System V1 (Clean Production Build)

class EmployeeManager {

    constructor() {

        this.employees =
            JSON.parse(localStorage.getItem("employees")) || [];

        this.workOrders =
            JSON.parse(localStorage.getItem("workOrders")) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "employees",
            JSON.stringify(this.employees)
        );
    }

    addEmployee() {

        const employee = {

            id: Date.now(),

            name: document.getElementById("name").value.trim(),
            role: document.getElementById("role").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            status: document.getElementById("status").value,

            createdAt: new Date().toISOString()
        };

        if (!employee.name) {
            alert("Employee name is required");
            return;
        }

        this.employees.push(employee);

        this.save();

        this.render();
    }

    deleteEmployee(id) {

        this.employees =
            this.employees.filter(e => e.id !== id);

        this.save();

        this.render();
    }

    getOpenWorkOrders(employeeName) {

        return this.workOrders.filter(w =>
            w.assignedTo === employeeName && !w.completed
        ).length;
    }

    render() {

        const list =
            document.getElementById("employeeList");

        if (!list) return;

        list.innerHTML = "";

        if (this.employees.length === 0) {
            list.innerHTML = "<p>No employees added yet.</p>";
            return;
        }

        this.employees.forEach(emp => {

            const openTasks =
                this.getOpenWorkOrders(emp.name);

            list.innerHTML += `
                <div class="card">
                    <h3>${emp.name}</h3>

                    <p><strong>Role:</strong> ${emp.role || "N/A"}</p>
                    <p><strong>Phone:</strong> ${emp.phone || "N/A"}</p>
                    <p><strong>Email:</strong> ${emp.email || "N/A"}</p>
                    <p><strong>Status:</strong> ${emp.status}</p>

                    <p><strong>Open Work Orders:</strong> ${openTasks}</p>

                    <button onclick="employeeManager.deleteEmployee(${emp.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    }
}

const employeeManager = new EmployeeManager();

function addEmployee() {
    employeeManager.addEmployee();
}
