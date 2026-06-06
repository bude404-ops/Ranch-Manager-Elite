const StorageManager = {

    exportData() {

        const data = {};

        Object.keys(localStorage).forEach(key => {

            data[key] =
                localStorage.getItem(key);

        });

        console.log(data);

        alert(
            "Backup exported"
        );

    }

};
