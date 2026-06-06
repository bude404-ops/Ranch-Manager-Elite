/* =====================================================
RANCH OS - app.js
Production Starter
===================================================== */

const RanchOS = {
get(key, fallback = []) {
try {
const v = localStorage.getItem(key);
return v ? JSON.parse(v) : fallback;
} catch {
return fallback;
}
},

set(key, value) {
localStorage.setItem(key, JSON.stringify(value));
}
};

function toggleSidebar() {
document.getElementById("sidebar")?.classList.toggle("open");
}

function showSection(id) {
document.querySelectorAll(".page-section")
.forEach(s => s.classList.add("hidden"));

document.getElementById(id)
?.classList.remove("hidden");
}

function addAnimal() {

const tag =
document.getElementById("tagNumber")?.value || "";

const species =
document.getElementById("species")?.value || "";

const breed =
document.getElementById("breed")?.value || "";

const weight =
document.getElementById("weight")?.value || "";

if (!tag.trim()) {
alert("Tag number required");
return;
}

const animals =
RanchOS.get("animals", []);

animals.push({
id: Date.now(),
tag,
species,
breed,
weight
});

RanchOS.set(
"animals",
animals
);

renderAnimals();
updateDashboard();
}

function renderAnimals() {

const el =
document.getElementById(
"animalList"
);

if (!el) return;

const animals =
RanchOS.get(
"animals",
[]
);

el.innerHTML =
animals.map(a => "<div class="list-item"> <strong>${a.tag}</strong> ${a.species} ${a.breed} <br> Weight: ${a.weight} </div>").join("");
}

function addPaddock() {

const name =
document.getElementById(
"paddockName"
)?.value || "";

const acres =
document.getElementById(
"paddockAcres"
)?.value || "";

if (!name.trim()) return;

const paddocks =
RanchOS.get(
"paddocks",
[]
);

paddocks.push({
id: Date.now(),
name,
acres
});

RanchOS.set(
"paddocks",
paddocks
);

renderPaddocks();
updateDashboard();
}

function renderPaddocks() {

const el =
document.getElementById(
"paddockList"
);

if (!el) return;

const paddocks =
RanchOS.get(
"paddocks",
[]
);

el.innerHTML =
paddocks.map(p => "<div class="list-item"> <strong>${p.name}</strong> ${p.acres} acres </div>").join("");
}

function addEquipment() {

const name =
document.getElementById(
"equipmentName"
)?.value || "";

if (!name.trim()) return;

const equipment =
RanchOS.get(
"equipment",
[]
);

equipment.push({
id: Date.now(),
name
});

RanchOS.set(
"equipment",
equipment
);

renderEquipment();
updateDashboard();
}

function renderEquipment() {

const el =
document.getElementById(
"equipmentList"
);

if (!el) return;

const equipment =
RanchOS.get(
"equipment",
[]
);

el.innerHTML =
equipment.map(e => "<div class="list-item"> ${e.name} </div>").join("");
}

function addEmployee() {

const name =
document.getElementById(
"employeeName"
)?.value || "";

if (!name.trim()) return;

const employees =
RanchOS.get(
"employees",
[]
);

employees.push({
id: Date.now(),
name
});

RanchOS.set(
"employees",
employees
);

renderEmployees();
updateDashboard();
}

function renderEmployees() {

const el =
document.getElementById(
"employeeList"
);

if (!el) return;

const employees =
RanchOS.get(
"employees",
[]
);

el.innerHTML =
employees.map(e => "<div class="list-item"> ${e.name} </div>").join("");
}

function addWorkOrder() {

const title =
document.getElementById(
"workTitle"
)?.value || "";

if (!title.trim()) return;

const orders =
RanchOS.get(
"workorders",
[]
);

orders.push({
id: Date.now(),
title,
status: "Open"
});

RanchOS.set(
"workorders",
orders
);

renderWorkOrders();
}

function renderWorkOrders() {

const el =
document.getElementById(
"workOrderList"
);

if (!el) return;

const orders =
RanchOS.get(
"workorders",
[]
);

el.innerHTML =
orders.map(o => "<div class="list-item"> <strong>${o.title}</strong> <br> ${o.status} </div>").join("");
}

function addTransaction() {

const name =
document.getElementById(
"transactionName"
)?.value || "";

const amount =
Number(
document.getElementById(
"transactionAmount"
)?.value || 0
);

const type =
document.getElementById(
"transactionType"
)?.value || "expense";

if (!name.trim()) return;

const transactions =
RanchOS.get(
"transactions",
[]
);

transactions.push({
id: Date.now(),
name,
amount,
type
});

RanchOS.set(
"transactions",
transactions
);

renderTransactions();
updateFinance();
updateChart();
}

function renderTransactions() {

const el =
document.getElementById(
"transactionList"
);

if (!el) return;

const transactions =
RanchOS.get(
"transactions",
[]
);

el.innerHTML =
transactions.map(t => "<div class="list-item"> <strong>${t.name}</strong> <br> ${t.type} : $${t.amount} </div>").join("");
}

function updateFinance() {

const transactions =
RanchOS.get(
"transactions",
[]
);

let income = 0;
let expenses = 0;

transactions.forEach(t => {

if (t.type === "income") {
  income += Number(t.amount);
} else {
  expenses += Number(t.amount);
}

});

const profit =
income - expenses;

const taxIncome =
document.getElementById(
"taxIncome"
);

const taxExpenses =
document.getElementById(
"taxExpenses"
);

const taxProfit =
document.getElementById(
"taxProfit"
);

if (taxIncome)
taxIncome.textContent =
"$" + income.toFixed(2);

if (taxExpenses)
taxExpenses.textContent =
"$" + expenses.toFixed(2);

if (taxProfit)
taxProfit.textContent =
"$" + profit.toFixed(2);
}

function updateDashboard() {

const setText =
(id, value) => {

  const el =
    document.getElementById(id);

  if (el)
    el.textContent = value;

};

setText(
"animalCount",
RanchOS.get("animals", []).length
);

setText(
"paddockCount",
RanchOS.get("paddocks", []).length
);

setText(
"equipmentCount",
RanchOS.get("equipment", []).length
);

setText(
"employeeCount",
RanchOS.get("employees", []).length
);
}

function saveSettings() {

const name =
document.getElementById(
"ranchNameInput"
)?.value || "Ranch OS";

localStorage.setItem(
"ranchName",
name
);

const title =
document.getElementById(
"ranchTitle"
);

if (title)
title.textContent = name;
}

function activateEnterprise() {

const code =
document.getElementById(
"enterpriseCode"
)?.value || "";

if (
code.toUpperCase() ===
"RANCH26"
) {

localStorage.setItem(
  "subscription",
  "ENTERPRISE"
);

document.getElementById(
  "planBadge"
).textContent =
  "ENTERPRISE";

alert(
  "Enterprise Activated"
);

} else {

alert(
  "Invalid code"
);

}
}

let profitChart;

function updateChart() {

const canvas =
document.getElementById(
"profitChart"
);

if (
!canvas ||
typeof Chart === "undefined"
) return;

const transactions =
RanchOS.get(
"transactions",
[]
);

let running = 0;

const labels = [];
const data = [];

transactions.forEach(
(t, i) => {

  running +=
    t.type === "income"
      ? Number(t.amount)
      : -Number(t.amount);

  labels.push(i + 1);
  data.push(running);

}

);

if (profitChart)
profitChart.destroy();

profitChart =
new Chart(canvas, {

  type: "line",

  data: {

    labels,

    datasets: [{
      label: "Profit Trend",
      data
    }]

  }

});

}

function initialize() {

const title =
document.getElementById(
"ranchTitle"
);

if (title) {

title.textContent =
  localStorage.getItem(
    "ranchName"
  ) || "Ranch OS";

}

const badge =
document.getElementById(
"planBadge"
);

if (badge) {

badge.textContent =
  localStorage.getItem(
    "subscription"
  ) || "FREE";

}

renderAnimals();
renderPaddocks();
renderEquipment();
renderEmployees();
renderWorkOrders();
renderTransactions();

updateFinance();
updateDashboard();
RanchCharts.refresh();
}

document.addEventListener(
"DOMContentLoaded",
initialize
);
