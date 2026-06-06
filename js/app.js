function addAnimal(){
    const animals = Storage.get("animals");

    animals.push({
        id:Date.now(),
        name:document.getElementById("animalName").value,
        type:document.getElementById("animalType").value
    });

    Storage.set("animals", animals);
    renderAnimals();
}

function renderAnimals(){
    const list = document.getElementById("animalList");
    if(!list) return;

    const animals = Storage.get("animals");

    list.innerHTML = animals.map(a =>
        `<div class="card">${a.name} - ${a.type}</div>`
    ).join("");
}

function addTransaction(){
    const t = Storage.get("transactions");

    t.push({
        id:Date.now(),
        desc:document.getElementById("desc").value,
        amount:Number(document.getElementById("amount").value),
        type:document.getElementById("type").value
    });

    Storage.set("transactions", t);
    renderTransactions();
}

function renderTransactions(){
    const list = document.getElementById("transactions");
    if(!list) return;

    const t = Storage.get("transactions");

    list.innerHTML = t.map(x =>
        `<div class="card">${x.desc} - $${x.amount}</div>`
    ).join("");
}

function addEmployee(){
    const e = Storage.get("employees");

    e.push({
        id:Date.now(),
        name:document.getElementById("empName").value,
        role:document.getElementById("empRole").value
    });

    Storage.set("employees", e);
    renderEmployees();
}

function renderEmployees(){
    const list = document.getElementById("employeeList");
    if(!list) return;

    const e = Storage.get("employees");

    list.innerHTML = e.map(x =>
        `<div class="card">${x.name} - ${x.role}</div>`
    ).join("");
}

function addWorkOrder(){
    const w = Storage.get("workorders");

    w.push({
        id:Date.now(),
        task:document.getElementById("task").value,
        assigned:document.getElementById("assignedTo").value
    });

    Storage.set("workorders", w);
    renderWork();
}

function renderWork(){
    const list = document.getElementById("workList");
    if(!list) return;

    const w = Storage.get("workorders");

    list.innerHTML = w.map(x =>
        `<div class="card">${x.task} → ${x.assigned}</div>`
    ).join("");
}
