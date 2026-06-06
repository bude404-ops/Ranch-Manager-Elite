let chart;

function updateChart() {
    const transactions = Storage.get("transactions", []);

    let labels = [];
    let data = [];
    let running = 0;

    transactions.forEach(t => {
        const amt = Number(t.amount || 0);
        running += t.type === "income" ? amt : -amt;

        labels.push(t.name);
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
                borderColor: "green",
                fill: false
            }]
        }
    });
}
