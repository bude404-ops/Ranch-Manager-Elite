// Ranch Manager Elite - Employees System V1

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

            name: document.getElementById("name").value,
            role: document.getElementById("role").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            status: document.getElementById("status").value,

            createdAt: new Date().toISOString()
        };

        if (!employee.name) {
            alert("Employee name required");
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

    getAssignedWorkCount(employeeName) {

        return this.workOrders.filter(w =>
            w.assignedTo === employeeName && !w.completed
        ).length;
    }

    render() {

        const list =
            document.getElementById("employeeList");

        if (!list) return;

        list.innerHTML = "";

        this.employees.forEach(emp => {

            const assigned = this.getAssignedWorkCount(emp.name);

            list.innerHTML += `
                <div class="card">
                    <h3>${emp.name}</h3>

                    <p><strong>Role:</strong> ${emp.role}</p>
                    <p><strong>Phone:</strong> ${emp.phone}</p>
                    <p><strong>Email:</strong> ${emp.email}</p>
                    <p><strong>Status:</strong> ${emp.status}</p>

                    <p><strong>Open Tasks:</strong> ${assigned}</p>

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
