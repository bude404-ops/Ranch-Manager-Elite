let profitChart;

function renderProfitChart() {

    const transactions = RanchStorage.get("transactions", []);

    let labels = [];
    let income = [];
    let expenses = [];
    let runningIncome = 0;
    let runningExpenses = 0;

    transactions.forEach((t, i) => {

        labels.push("Tx " + (i + 1));

        if (t.type === "income") {
            runningIncome += Number(t.amount);
        } else {
            runningExpenses += Number(t.amount);
        }

        income.push(runningIncome);
        expenses.push(runningExpenses);
    });

    const ctx = document.getElementById("profitChart");

    if (!ctx) return;

    if (profitChart) profitChart.destroy();

    profitChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "Income",
                    data: income,
                    borderColor: "green"
                },
                {
                    label: "Expenses",
                    data: expenses,
                    borderColor: "red"
                }
            ]
        }
    });
}
