const WorkOrderManager = {

getAll() {
    return JSON.parse(
        localStorage.getItem(
            "workorders"
        ) || "[]"
    );
},

save(data) {
    localStorage.setItem(
        "workorders",
        JSON.stringify(data)
    );
}

};
