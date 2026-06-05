class AnimalManager {

    constructor(){

        this.animals =
            JSON.parse(
                localStorage.getItem("animals")
            ) || [];
    }

    addAnimal(animal){

        animal.id =
            Date.now();

        this.animals.push(animal);

        this.save();
    }

    save(){

        localStorage.setItem(
            "animals",
            JSON.stringify(this.animals)
        );
    }

    getAll(){

        return this.animals;
    }
}

window.animals =
    new AnimalManager();
