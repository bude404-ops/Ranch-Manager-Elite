class AnimalManager {

    constructor() {

        this.animals =
            JSON.parse(
                localStorage.getItem("animals")
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "animals",
            JSON.stringify(this.animals)
        );
    }

    addAnimal() {

        const animal = {

            id: Date.now(),

            tag:
                document.getElementById(
                    "tagNumber"
                ).value,

            species:
                document.getElementById(
                    "species"
                ).value,

            breed:
                document.getElementById(
                    "breed"
                ).value,

            sex:
                document.getElementById(
                    "sex"
                ).value,

            weight:
                document.getElementById(
                    "weight"
                ).value,

            birthDate:
                document.getElementById(
                    "birthDate"
                ).value,

            notes:
                document.getElementById(
                    "notes"
                ).value
        };

        if (!animal.tag) {
            alert("Tag Number Required");
            return;
        }

        this.animals.push(animal);

        this.save();

        this.clearForm();

        this.render();
    }

    clearForm() {

        document.getElementById(
            "tagNumber"
        ).value = "";

        document.getElementById(
            "breed"
        ).value = "";

        document.getElementById(
            "weight"
        ).value = "";

        document.getElementById(
            "birthDate"
        ).value = "";

        document.getElementById(
            "notes"
        ).value = "";
    }

    deleteAnimal(id) {

        this.animals =
            this.animals.filter(
                animal => animal.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "animalList"
            );

        if (!list) return;

        list.innerHTML = "";

        if (this.animals.length === 0) {

            list.innerHTML =
                "<p>No animals recorded.</p>";

            return;
        }

        this.animals.forEach(animal => {

            list.innerHTML += `

            <div class="card">

                <h3>
                    ${animal.tag}
                </h3>

                <p>
                    <strong>Species:</strong>
                    ${animal.species}
                </p>

                <p>
                    <strong>Breed:</strong>
                    ${animal.breed}
                </p>

                <p>
                    <strong>Sex:</strong>
                    ${animal.sex}
                </p>

                <p>
                    <strong>Weight:</strong>
                    ${animal.weight}
                </p>

                <p>
                    <strong>Birth Date:</strong>
                    ${animal.birthDate}
                </p>

                <p>
                    <strong>Notes:</strong>
                    ${animal.notes}
                </p>

                <button
                    onclick="manager.deleteAnimal(${animal.id})">
                    Delete
                </button>

            </div>

            `;
        });
    }
}

const manager =
    new AnimalManager();

function addAnimal() {
    manager.addAnimal();
}
