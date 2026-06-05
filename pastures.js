class PastureManager {

    constructor() {

        this.pastures =
            JSON.parse(
                localStorage.getItem(
                    "pastures"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "pastures",
            JSON.stringify(
                this.pastures
            )
        );
    }

    addPasture() {

        const pasture = {

            id: Date.now(),

            name:
                document.getElementById(
                    "pastureName"
                ).value,

            acres:
                document.getElementById(
                    "pastureAcres"
                ).value,

            capacity:
                document.getElementById(
                    "animalCapacity"
                ).value,

            status:
                document.getElementById(
                    "pastureStatus"
                ).value
        };

        if (!pasture.name) {

            alert(
                "Pasture Name Required"
            );

            return;
        }

        this.pastures.push(
            pasture
        );

        this.save();

        this.render();
    }

    deletePasture(id) {

        this.pastures =
            this.pastures.filter(
                pasture =>
                    pasture.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "pastureList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.pastures.forEach(
            pasture => {

                list.innerHTML += `
                <div class="card">

                    <h3>
                        ${pasture.name}
                    </h3>

                    <p>
                        Acres:
                        ${pasture.acres}
                    </p>

                    <p>
                        Capacity:
                        ${pasture.capacity}
                    </p>

                    <p>
                        Status:
                        ${pasture.status}
                    </p>

                    <button
                    onclick="pastures.deletePasture(${pasture.id})">
                    Delete
                    </button>

                </div>
                `;
            }
        );
    }
}

const pastures =
    new PastureManager();

function addPasture() {
    pastures.addPasture();
}
