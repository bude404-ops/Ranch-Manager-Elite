/* =====================================================
RANCH OS ENTERPRISE
charts.js v1.0
Dashboard Analytics Engine
===================================================== */

const RanchCharts = {

profitChart: null,

refresh() {

    this.renderProfitChart();

    this.updateAnalytics();

},

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
        RanchOS.get(
            "transactions",
            []
        );

    let runningProfit = 0;

    const labels = [];

    const values = [];

    transactions.forEach(
        (
            transaction,
            index
        ) => {

            if (
                transaction.type ===
                "income"
            ) {

                runningProfit +=
                    Number(
                        transaction.amount
                    );

            } else {

                runningProfit -=
                    Number(
                        transaction.amount
                    );

            }

            labels.push(
                "#" +
                (index + 1)
            );

            values.push(
                runningProfit
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

                            data:
                                values,

                            tension:
                                0.35,

                            borderWidth:
                                3,

                            fill:
                                true

                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    plugins: {

                        legend: {

                            display:
                                true

                        }

                    }

                }

            }
        );

},

updateAnalytics() {

    const animals =
        RanchOS.get(
            "animals",
            []
        );

    const paddocks =
        RanchOS.get(
            "paddocks",
            []
        );

    const employees =
        RanchOS.get(
            "employees",
            []
        );

    const equipment =
        RanchOS.get(
            "equipment",
            []
        );

    const inventory =
        RanchOS.get(
            "inventory",
            []
        );

    const transactions =
        RanchOS.get(
            "transactions",
            []
        );

    let income = 0;

    let expenses = 0;

    transactions.forEach(
        transaction => {

            if (
                transaction.type ===
                "income"
            ) {

                income +=
                    Number(
                        transaction.amount
                    );

            } else {

                expenses +=
                    Number(
                        transaction.amount
                    );

            }

        }
    );

    const profit =
        income -
        expenses;

    const analytics = {

        animals:
            animals.length,

        paddocks:
            paddocks.length,

        employees:
            employees.length,

        equipment:
            equipment.length,

        inventory:
            inventory.length,

        income,

        expenses,

        profit

    };

    localStorage.setItem(

        "analytics",

        JSON.stringify(
            analytics
        )

    );

},

getAnalytics() {

    try {

        return JSON.parse(

            localStorage.getItem(
                "analytics"
            )

        ) || {};

    } catch {

        return {};

    }

}

};

/* =====================================
RANCH KPI HELPERS
===================================== */

function getTotalIncome() {

return RanchOS.get(
    "transactions",
    []
)

.filter(
    transaction =>
    transaction.type ===
    "income"
)

.reduce(

    (
        total,
        transaction
    ) =>

    total +
    Number(
        transaction.amount
    ),

    0

);

}

function getTotalExpenses() {

return RanchOS.get(
    "transactions",
    []
)

.filter(
    transaction =>
    transaction.type ===
    "expense"
)

.reduce(

    (
        total,
        transaction
    ) =>

    total +
    Number(
        transaction.amount
    ),

    0

);

}

function getNetProfit() {

return (
    getTotalIncome() -
    getTotalExpenses()
);

}

function getAnimalCount() {

return RanchOS.get(
    "animals",
    []
).length;

}

function getEmployeeCount() {

return RanchOS.get(
    "employees",
    []
).length;

}

function getPaddockCount() {

return RanchOS.get(
    "paddocks",
    []
).length;

}

/* =====================================
REPORT GENERATOR
===================================== */

function generateAnalyticsReport() {

return {

    date:
        new Date()
        .toLocaleDateString(),

    animals:
        getAnimalCount(),

    employees:
        getEmployeeCount(),

    paddocks:
        getPaddockCount(),

    income:
        getTotalIncome(),

    expenses:
        getTotalExpenses(),

    profit:
        getNetProfit()

};

}

/* =====================================
EXPORT REPORT
===================================== */

function exportAnalyticsReport() {

const report =
    generateAnalyticsReport();

const blob =
    new Blob(

        [

            JSON.stringify(

                report,

                null,

                2

            )

        ],

        {

            type:
            "application/json"

        }

    );

const url =
    URL.createObjectURL(
        blob
    );

const link =
    document.createElement(
        "a"
    );

link.href =
    url;

link.download =
    "ranch-report.json";

link.click();

}

/* =====================================
AUTO REFRESH
===================================== */

document.addEventListener(

"DOMContentLoaded",

() => {

    setTimeout(
        () => {

            RanchCharts
                .refresh();

        },

        250

    );

}

);

/* =====================================================
RANCH OS CHARTS MODULE COMPLETE

Future Expansion:

- Revenue Forecasting
- Feed Cost Trends
- Herd Growth Charts
- Breeding Performance
- Employee Productivity
- Grazing Analytics
- AI Forecast Models

===================================================== */
