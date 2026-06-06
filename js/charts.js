let profitChart;

function updateProfitChart() {

    const transactions = Storage.get("transactions", []);

    let labels = [];
    let data = [];

    let running = 0;

    transactions.forEach((t, i) => {

        const amount = Number(t.amount || 0);

        running += t.type === "income" ? amount : -amount;

        labels.push(`TX ${i + 1}`);
        data.push(running);
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
                borderWidth: 2,
                fill: true
            }]
        }
    });
}
