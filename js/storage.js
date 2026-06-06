const StorageManager = {

get(key, fallback = []) {

    try {

        const value =
            localStorage.getItem(
                key
            );

        return value
            ? JSON.parse(value)
            : fallback;

    } catch {

        return fallback;

    }

},

set(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

},

remove(key) {

    localStorage.removeItem(
        key
    );

},

exportData() {

    const backup = {

        animals:
            this.get(
                "animals",
                []
            ),

        inventory:
            this.get(
                "inventory",
                []
            ),

        equipment:
            this.get(
                "equipment",
                []
            ),

        employees:
            this.get(
                "employees",
                []
            ),

        workorders:
            this.get(
                "workorders",
                []
            ),

        transactions:
            this.get(
                "transactions",
                []
            ),

        paddocks:
            this.get(
                "paddocks",
                []
            ),

        gpsMap:
            this.get(
                "gpsMap",
                []
            ),

        settings:
            {
                ranchName:
                    localStorage.getItem(
                        "ranchName"
                    ),

                subscription:
                    localStorage.getItem(
                        "subscription"
                    )
            }

    };

    const blob =
        new Blob(
            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )
            ],
            {
                type:
                "application/json"
            }
        );

    const link =
        document.createElement(
            "a"
        );

    link.href =
        URL.createObjectURL(
            blob
        );

    link.download =
        "ranchos-backup.json";

    link.click();

},

importData(data) {

    try {

        Object.keys(data)
            .forEach(key => {

                if (
                    key ===
                    "settings"
                ) {

                    localStorage
                    .setItem(
                        "ranchName",
                        data.settings
                            .ranchName ||
                        "Ranch OS"
                    );

                    localStorage
                    .setItem(
                        "subscription",
                        data.settings
                            .subscription ||
                        "FREE"
                    );

                } else {

                    localStorage
                    .setItem(
                        key,
                        JSON.stringify(
                            data[key]
                        )
                    );

                }

            });

        alert(
            "Backup Imported"
        );

        location.reload();

    } catch {

        alert(
            "Import Failed"
        );

    }

}

};
