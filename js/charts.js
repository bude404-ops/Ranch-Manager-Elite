let chart;

function updateChart(transactions) {

    const labels = [];
    const data = [];

    let running = 0;

    transactions.forEach((t, i) => {
        running += t.type === "income" ? t.amount : -t.amount;
        labels.push(i + 1);
        data.push(running);
    });

    const ctx = document.getElementById("profitChart");

    if (!ctx) return;

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Profit Trend",
                data,
                borderWidth: 2
            }]
        }
    });
}
