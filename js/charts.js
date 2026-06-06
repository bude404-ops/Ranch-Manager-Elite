let chart;

function updateChart() {
    const tx = Ranch.get("transactions", []);

    const labels = tx.map(t => new Date(t.date).toLocaleDateString());
    const data = tx.map(t =>
        t.type === "income" ? t.amount : -t.amount
    );

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
                borderColor: "green",
                fill: false
            }]
        }
    });
}
