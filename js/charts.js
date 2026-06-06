function renderProfitChart(){

    const ctx = document.getElementById("profitChart");
    if(!ctx) return;

    const data = Storage.get("transactions");

    let labels = [];
    let values = [];
    let balance = 0;

    data.forEach(t => {
        balance += (t.type === "income" ? t.amount : -t.amount);
        labels.push(new Date(t.id).toLocaleDateString());
        values.push(balance);
    });

    new Chart(ctx, {
        type:"line",
        data:{
            labels,
            datasets:[{
                label:"Profit Trend",
                data:values
            }]
        }
    });
}
