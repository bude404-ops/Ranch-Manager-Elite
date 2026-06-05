class HealthManager {

    constructor() {

        this.records =
            JSON.parse(
                localStorage.getItem(
                    "healthRecords"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "healthRecords",
            JSON.stringify(
                this.records
            )
        );
    }

    addRecord() {

        const record = {

            id: Date.now(),

            animalTag:
                document.getElementById(
                    "animalTag"
                ).value,

            date:
                document.getElementById(
                    "recordDate"
                ).value,

            type:
                document.getElementById(
                    "recordType"
                ).value,

            notes:
                document.getElementById(
                    "recordNotes"
                ).value
        };

        if (!record.animalTag) {

            alert(
                "Animal Tag Required"
            );

            return;
        }

        this.records.push(record);

        this.save();

        this.render();
    }

    deleteRecord(id) {

        this.records =
            this.records.filter(
                r => r.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "healthList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.records.forEach(record => {

            list.innerHTML += `

            <div class="card">

                <h3>${record.animalTag}</h3>

                <p>${record.type}</p>

                <p>${record.date}</p>

                <p>${record.notes}</p>

                <button
                onclick="health.deleteRecord(${record.id})">
                Delete
                </button>

            </div>

            `;
        });
    }
}

const health =
    new HealthManager();

function addHealthRecord() {
    health.addRecord();
}
