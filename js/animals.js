function addAnimal() {
    const tag = document.getElementById("tagNumber").value;
    const species = document.getElementById("species").value;

    if (!tag) return alert("Tag required");

    const animals = Ranch.get("animals", []);

    animals.push({
        id: Date.now(),
        tag,
        species
    });

    Ranch.set("animals", animals);
    renderAnimals();
    updateDashboard();
}

function renderAnimals() {
    const list = document.getElementById("animalList");
    const animals = Ranch.get("animals", []);

    list.innerHTML = animals.map(a =>
        `<div class="card"><b>${a.tag}</b><br>${a.species}</div>`
    ).join("");
}
