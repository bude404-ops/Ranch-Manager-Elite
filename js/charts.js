let profitChart;

function updateChart() {

    const transactions = Storage.get("transactions", []);

    let labels = [];
    let data = [];

    let runningProfit = 0;

    transactions.forEach(t => {

        const amount = Number(t.amount || 0);

        if (t.type === "income") runningProfit += amount;
        else runningProfit -= amount;

        labels.push(t.name || "tx");
        data.push(runningProfit);

    });

    const ctx = document.getElementById("profitChart");

    if (!ctx) return;

    if (profitChart) profitChart.destroy();

    profitChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Profit Trend",
                data,
                borderColor: "green",
                fill: false
            }]
        }
    });

}
