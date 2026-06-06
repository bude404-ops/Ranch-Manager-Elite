function renderChart(){

const tx = Storage.get("tx", []);

const ctx = document.getElementById("chart");

if(!ctx) return;

new Chart(ctx, {
type:"line",
data:{
labels:tx.map((_,i)=>i),
datasets:[{
label:"Cash Flow",
data:tx.map(t=>t.amount)
}]
}
});

}
