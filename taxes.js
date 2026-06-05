const transactions =
JSON.parse(
    localStorage.getItem(
        "transactions"
    )
) || [];

let income = 0;
let expenses = 0;

const categories = {};

transactions.forEach(transaction => {

    const amount =
        Number(
            transaction.amount || 0
        );

    if (
        transaction.type ===
        "income"
    ) {

        income += amount;

    } else {

        expenses += amount;

        const category =
            transaction.category ||
            "Other";

        categories[category] =
            (categories[category] || 0)
            + amount;
    }
});

const profit =
income - expenses;

document.getElementById(
    "taxIncome"
).textContent =
"$" + income.toFixed(2);

document.getElementById(
    "taxExpenses"
).textContent =
"$" + expenses.toFixed(2);

document.getElementById(
    "taxProfit"
).textContent =
"$" + profit.toFixed(2);

const summary =
document.getElementById(
    "taxSummary"
);

let html = "";

for (const category in categories) {

    html += `
    <div class="card">

        <strong>${category}</strong>

        <br>

        $${categories[
            category
        ].toFixed(2)}

    </div>
    `;
}

summary.innerHTML = html;

function exportCPA() {

    const report = {

        income,
        expenses,
        profit,
        categories
    };

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

    link.href = url;

    link.download =
        "CPA_Report.json";

    link.click();
}
