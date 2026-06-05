// Ranch Manager Elite - Health System V2

class HealthManager {

    constructor() {

        this.records =
            JSON.parse(localStorage.getItem("healthRecords")) || [];

        this.animals =
            JSON.parse(localStorage.getItem("animals")) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "healthRecords",
            JSON.stringify(this.records)
        );
    }

    addRecord() {

        const record = {

            id: Date.now(),

            animalTag:
                document.getElementById("animalTag").value,

            type:
                document.getElementById("recordType").value,

            treatment:
                document.getElementById("treatment").value,

            vet:
                document.getElementById("vetName").value,

            date:
                document.getElementById("date").value,

            notes:
                document.getElementById("notes").value,

            createdAt: new Date().toISOString()
        };

        if (!record.animalTag) {
            alert("Animal Tag is required");
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

    isHighPriority(type) {

        return (
            type === "Injury" ||
            type === "Surgery"
        );
    }

    render() {

        const list =
            document.getElementById("healthList");

        if (!list) return;

        list.innerHTML = "";

        this.records.forEach(record => {

            const animalExists =
                this.animals.some(
                    a => a.tag === record.animalTag
                );

            list.innerHTML += `
                <div class="card ${this.isHighPriority(record.type) ? "danger-box" : ""}">
                    <h3>Tag: ${record.animalTag}</h3>

                    <p><strong>Type:</strong> ${record.type}</p>
                    <p><strong>Treatment:</strong> ${record.treatment}</p>
                    <p><strong>Vet:</strong> ${record.vet || "N/A"}</p>
                    <p><strong>Date:</strong> ${record.date}</p>

                    ${record.notes ? `<p>${record.notes}</p>` : ""}

                    ${
                        !animalExists
                        ? `<p class="status-warning">⚠ Animal tag not found</p>`
                        : `<p class="status-good">Linked to Animal</p>`
                    }

                    <button onclick="healthManager.deleteRecord(${record.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    }
}

const healthManager = new HealthManager();

function addHealthRecord() {
    healthManager.addRecord();
}
