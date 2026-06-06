const LivestockManager = {

getAll() {
    return JSON.parse(
        localStorage.getItem(
            "animals"
        ) || "[]"
    );
},

save(data) {
    localStorage.setItem(
        "animals",
        JSON.stringify(data)
    );
},

total() {
    return this.getAll().length;
}

};
