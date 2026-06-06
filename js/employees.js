const EmployeeManager = {

getAll() {
    return JSON.parse(
        localStorage.getItem(
            "employees"
        ) || "[]"
    );
},

save(data) {
    localStorage.setItem(
        "employees",
        JSON.stringify(data)
    );
}

};
