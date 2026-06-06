function addTx(){

const name = document.getElementById("name");
const amount = document.getElementById("amount");

if(!name.value) return;

const tx = Storage.get("tx");

tx.push({
id:Date.now(),
name:name.value,
amount:Number(amount.value)
});

Storage.set("tx", tx);

renderTx();
}

function renderTx(){

const list = document.getElementById("list");
if(!list) return;

const tx = Storage.get("tx");

list.innerHTML = tx.map(t=>`
<div class="card">
${t.name} - $${t.amount}
</div>
`).join("");

}

function init(){

renderTx();
renderChart?.();

if(document.getElementById("map")){
const map = L.map('map').setView([46.7,-117.1], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

}

document.addEventListener("DOMContentLoaded", init);
