function toggleSidebar() {
    const sidebar =
        document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

function showSection(id) {

    document
        .querySelectorAll(".page-section")
        .forEach(section => {
            section.classList.add("hidden");
        });

    const target =
        document.getElementById(id);

    if (target) {
        target.classList.remove("hidden");
    }
}

function updateDashboard() {

    const animals =
        JSON.parse(
            localStorage.getItem("animals") || "[]"
        );

    const paddocks =
        JSON.parse(
            localStorage.getItem("paddocks") || "[]"
        );

    const equipment =
        JSON.parse(
            localStorage.getItem("equipment") || "[]"
        );

    const employees =
        JSON.parse(
            localStorage.getItem("employees") || "[]"
        );

    document.getElementById("animalCount").textContent =
        animals.length;

    document.getElementById("paddockCount").textContent =
        paddocks.length;

    document.getElementById("equipmentCount").textContent =
        equipment.length;

    document.getElementById("employeeCount").textContent =
        employees.length;
}

document.addEventListener(
    "DOMContentLoaded",
    updateDashboard
);
