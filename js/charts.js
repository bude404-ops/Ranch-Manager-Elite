let RanchCharts = {

profitChart: null,

renderProfitChart() {

    const canvas =
        document.getElementById(
            "profitChart"
        );

    if (
        !canvas ||
        typeof Chart ===
        "undefined"
    ) return;

    const transactions =
        JSON.parse(
            localStorage.getItem(
                "transactions"
            ) || "[]"
        );

    let running = 0;

    const labels = [];
    const data = [];

    transactions.forEach(
        (t, index) => {

            running +=
                t.type === "income"
                ? Number(
                    t.amount
                )
                : -Number(
                    t.amount
                );

            labels.push(
                index + 1
            );

            data.push(
                running
            );

        }
    );

    if (
        this.profitChart
    ) {

        this.profitChart
            .destroy();

    }

    this.profitChart =
        new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels,

                    datasets: [

                        {
                            label:
                            "Profit Trend",

                            data
                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false

                }

            }
        );

},

refresh() {

    this.renderProfitChart();

}

};

document.addEventListener(
"DOMContentLoaded",
() => {

    RanchCharts.refresh();

}

);
