const SettingsManager = {

saveName(name) {

    localStorage.setItem(
        "ranchName",
        name
    );

},

getName() {

    return (
        localStorage.getItem(
            "ranchName"
        ) || "Ranch OS"
    );

}

};
