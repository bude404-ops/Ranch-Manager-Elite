// Ranch Manager Elite - Breeding System V1

class BreedingManager {

    constructor() {

        this.records =
            JSON.parse(localStorage.getItem("breedingRecords")) || [];

        this.animals =
            JSON.parse(localStorage.getItem("animals")) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "breedingRecords",
            JSON.stringify(this.records)
        );
    }

    addRecord() {

        const record = {

            id: Date.now(),

            femaleTag:
                document.getElementById("femaleTag").value,

            maleTag:
                document.getElementById("maleTag").value,

            status:
                document.getElementById("breedingStatus").value,

            breedingDate:
                document.getElementById("breedingDate").value,

            expectedDate:
                document.getElementById("expectedDate").value,

            notes:
                document.getElementById("notes").value,

            createdAt: new Date().toISOString()
        };

        if (!record.femaleTag) {
            alert("Female Tag is required");
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

    animalExists(tag) {

        return this.animals.some(
            a => a.tag === tag
        );
    }

    render() {

        const list =
            document.getElementById("breedingList");

        if (!list) return;

        list.innerHTML = "";

        this.records.forEach(record => {

            const femaleValid =
                this.animalExists(record.femaleTag);

            const maleValid =
                record.maleTag
                ? this.animalExists(record.maleTag)
                : true;

            const statusColor =
                record.status === "Calved"
                ? "status-good"
                : record.status === "Failed"
                ? "status-danger"
                : "status-warning";

            list.innerHTML += `
                <div class="card">
                    <h3>Breeding Pair</h3>

                    <p><strong>Female:</strong> ${record.femaleTag}
                    ${femaleValid ? "" : "⚠"}</p>

                    <p><strong>Male:</strong> ${record.maleTag || "N/A"}
                    ${maleValid ? "" : "⚠"}</p>

                    <p><strong>Status:</strong>
                    <span class="${statusColor}">
                    ${record.status}
                    </span></p>

                    <p><strong>Breeding Date:</strong> ${record.breedingDate}</p>
                    <p><strong>Expected Date:</strong> ${record.expectedDate}</p>

                    ${record.notes ? `<p>${record.notes}</p>` : ""}

                    <button onclick="breedingManager.deleteRecord(${record.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    }
}

const breedingManager = new BreedingManager();

function addBreedingRecord() {
    breedingManager.addRecord();
}
