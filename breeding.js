class BreedingManager {

    constructor() {

        this.records =
            JSON.parse(
                localStorage.getItem(
                    "breedingRecords"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "breedingRecords",
            JSON.stringify(
                this.records
            )
        );
    }

    addRecord() {

        const record = {

            id: Date.now(),

            dam:
                document.getElementById(
                    "damTag"
                ).value,

            sire:
                document.getElementById(
                    "sireTag"
                ).value,

            breedingDate:
                document.getElementById(
                    "breedingDate"
                ).value,

            calvingDate:
                document.getElementById(
                    "expectedCalving"
                ).value,

            status:
                document.getElementById(
                    "pregnancyStatus"
                ).value,

            notes:
                document.getElementById(
                    "breedingNotes"
                ).value
        };

        if (!record.dam) {

            alert(
                "Dam Tag Required"
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
                record =>
                    record.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "breedingList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.records.forEach(record => {

            list.innerHTML += `

            <div class="card">

                <h3>
                    Dam: ${record.dam}
                </h3>

                <p>
                    Sire:
                    ${record.sire}
                </p>

                <p>
                    Breeding:
                    ${record.breedingDate}
                </p>

                <p>
                    Expected Calving:
                    ${record.calvingDate}
                </p>

                <p>
                    Status:
                    ${record.status}
                </p>

                <p>
                    ${record.notes}
                </p>

                <button
                onclick="breeding.deleteRecord(${record.id})">
                Delete
                </button>

            </div>

            `;
        });
    }
}

const breeding =
    new BreedingManager();

function addBreedingRecord() {

    breeding.addRecord();
}
