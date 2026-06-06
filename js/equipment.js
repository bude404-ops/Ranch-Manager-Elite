const EquipmentManager = {

getAll() {
    return JSON.parse(
        localStorage.getItem(
            "equipment"
        ) || "[]"
    );
},

save(data) {
    localStorage.setItem(
        "equipment",
        JSON.stringify(data)
    );
}

};
