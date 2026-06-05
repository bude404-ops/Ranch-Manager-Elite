class EmployeeManager {

    constructor() {

        this.employees =
            JSON.parse(
                localStorage.getItem(
                    "employees"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "employees",
            JSON.stringify(
                this.employees
            )
        );
    }

    addEmployee() {

        const employee = {

            id: Date.now(),

            name:
                document.getElementById(
                    "employeeName"
                ).value,

            phone:
                document.getElementById(
                    "employeePhone"
                ).value,

            email:
                document.getElementById(
                    "employeeEmail"
                ).value,

            role:
                document.getElementById(
                    "employeeRole"
                ).value,

            pay:
                document.getElementById(
                    "employeePay"
                ).value
        };

        if (!employee.name) {

            alert(
                "Employee Name Required"
            );

            return;
        }

        this.employees.push(
            employee
        );

        this.save();

        this.render();
    }

    deleteEmployee(id) {

        this.employees =
            this.employees.filter(
                employee =>
                    employee.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "employeeList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.employees.forEach(employee => {

            list.innerHTML += `

            <div class="card">

                <h3>${employee.name}</h3>

                <p>${employee.role}</p>

                <p>${employee.phone}</p>

                <p>${employee.email}</p>

                <p>$${employee.pay}/hr</p>

                <button
                onclick="employees.deleteEmployee(${employee.id})">
                Delete
                </button>

            </div>

            `;
        });
    }
}

const employees =
    new EmployeeManager();

function addEmployee() {

    employees.addEmployee();
}
