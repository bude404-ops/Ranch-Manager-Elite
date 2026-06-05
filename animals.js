// Ranch Manager Elite - Animal Registry V2

class AnimalManager {

    constructor() {

        this.animals =
            JSON.parse(localStorage.getItem("animals")) || [];

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

            tag: document.getElementById("tagNumber").value,
            species: document.getElementById("species").value,
            breed: document.getElementById("breed").value,
            sex: document.getElementById("sex").value,
            weight: Number(document.getElementById("weight").value || 0),
            birthDate: document.getElementById("birthDate").value,
            notes: document.getElementById("notes").value,

            createdAt: new Date().toISOString()
        };

        if (!animal.tag) {
            alert("Tag Number is required");
            return;
        }

        this.animals.push(animal);

        this.save();

        this.render();
    }

    deleteAnimal(id) {

        this.animals =
            this.animals.filter(
                a => a.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById("animalList");

        if (!list) return;

        list.innerHTML = "";

        this.animals.forEach(animal => {

            list.innerHTML += `
                <div class="card">
                    <h3>Tag: ${animal.tag}</h3>

                    <p><strong>Species:</strong> ${animal.species}</p>
                    <p><strong>Breed:</strong> ${animal.breed}</p>
                    <p><strong>Sex:</strong> ${animal.sex}</p>
                    <p><strong>Weight:</strong> ${animal.weight} lbs</p>
                    <p><strong>Birth Date:</strong> ${animal.birthDate}</p>

                    ${animal.notes ? `<p>${animal.notes}</p>` : ""}

                    <button onclick="animalManager.deleteAnimal(${animal.id})">
                        Delete
                    </button>
                </div>
            `;
        });
    }
}

const animalManager = new AnimalManager();

function addAnimal() {
    animalManager.addAnimal();
}
