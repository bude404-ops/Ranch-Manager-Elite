const InventoryManager = {

getAll() {
    return JSON.parse(
        localStorage.getItem(
            "inventory"
        ) || "[]"
    );
},

save(data) {
    localStorage.setItem(
        "inventory",
        JSON.stringify(data)
    );
}

};
