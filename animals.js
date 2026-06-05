class AnimalManager {

    constructor() {

        this.animals =
            JSON.parse(
                localStorage.getItem("animals")
            ) || [];

        this.render();
    }

    addAnimal() {

        const tag =
            document.getElementById(
                "tagNumber"
            ).value;

        const breed =
            document.getElementById(
                "breed"
            ).value;

        const animal = {
            id: Date.now(),
            tag,
            breed
        };

        this.animals.push(animal);

        localStorage.setItem(
            "animals",
            JSON.stringify(this.animals)
        );

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "animalList"
            );

        if (!list) return;

        list.innerHTML = "";

        this.animals.forEach(a => {

            list.innerHTML += `
                <div class="card">
                    <strong>${a.tag}</strong>
                    <br>
                    ${a.breed}
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
