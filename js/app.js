window.RanchApp = {
    core: null,

    state: {
        money: 1000,
        animals: [],
        tasks: [],
        inventory: []
    },

    init(core) {
        this.core = core;

        this.bind();
        this.loop();
        this.render();

        this.core.log("App initialized");
    },

    bind() {
        document.body.addEventListener("click", (e) => {
            const action = e.target.dataset.action;

            if (action === "add-animal") this.addAnimal();
            if (action === "add-task") this.addTask();

            if (e.target.id === "aiBtn") {
                alert("AI module will be added next upgrade");
            }
        });
    },

    addAnimal() {
        const name = prompt("Animal name:");
        if (!name) return;

        this.state.animals.push({ name });
        this.render();
    },

    addTask() {
        const title = prompt("Task:");
        if (!title) return;

        this.state.tasks.push({ title });
        this.render();
    },

    loop() {
        setInterval(() => {
            this.state.money += this.state.animals.length * 5;
            this.render();
        }, 8000);
    },

    render() {
        document.getElementById("dashboardBox").innerText =
            "Money: $" + this.state.money;

        document.getElementById("animalsBox").innerHTML =
            this.state.animals.map(a => `<div class="card">${a.name}</div>`).join("");

        document.getElementById("tasksBox").innerHTML =
            this.state.tasks.map(t => `<div class="card">${t.title}</div>`).join("");

        document.getElementById("economyBox").innerText =
            "Income: $" + (this.state.animals.length * 5);
    }
};
