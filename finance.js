class FinanceManager {

    constructor() {

        this.transactions =
            JSON.parse(
                localStorage.getItem(
                    "transactions"
                )
            ) || [];

        this.render();
    }

    save() {

        localStorage.setItem(
            "transactions",
            JSON.stringify(
                this.transactions
            )
        );
    }

    addTransaction() {

        const transaction = {

            id: Date.now(),

            name:
                document.getElementById(
                    "transactionName"
                ).value,

            amount:
                Number(
                    document.getElementById(
                        "transactionAmount"
                    ).value
                ),

            type:
                document.getElementById(
                    "transactionType"
                ).value,

            category:
                document.getElementById(
                    "transactionCategory"
                ).value
        };

        if (
            !transaction.name ||
            !transaction.amount
        ) {
            alert(
                "Description and Amount Required"
            );
            return;
        }

        this.transactions.push(
            transaction
        );

        this.save();

        this.clearForm();

        this.render();
    }

    clearForm() {

        document.getElementById(
            "transactionName"
        ).value = "";

        document.getElementById(
            "transactionAmount"
        ).value = "";
    }

    deleteTransaction(id) {

        this.transactions =
            this.transactions.filter(
                transaction =>
                    transaction.id !== id
            );

        this.save();

        this.render();
    }

    render() {

        const list =
            document.getElementById(
                "transactionList"
            );

        if (!list) return;

        let income = 0;
        let expenses = 0;

        list.innerHTML = "";

        this.transactions.forEach(
            transaction => {

                if (
                    transaction.type ===
                    "income"
                ) {
                    income +=
                        transaction.amount;
                } else {
                    expenses +=
                        transaction.amount;
                }

                list.innerHTML += `
                <div class="card">

                    <h3>
                        ${transaction.name}
                    </h3>

                    <p>
                        ${transaction.category}
                    </p>

                    <p>
                        ${transaction.type.toUpperCase()}
                    </p>

                    <p>
                        $${transaction.amount.toFixed(2)}
                    </p>

                    <button
                    onclick="finance.deleteTransaction(${transaction.id})">
                    Delete
                    </button>

                </div>
                `;
            }
        );

        const profit =
            income - expenses;

        document.getElementById(
            "totalIncome"
        ).textContent =
            "$" +
            income.toFixed(2);

        document.getElementById(
            "totalExpenses"
        ).textContent =
            "$" +
            expenses.toFixed(2);

        document.getElementById(
            "netProfit"
        ).textContent =
            "$" +
            profit.toFixed(2);
    }
}

const finance =
    new FinanceManager();

function addTransaction() {
    finance.addTransaction();
}
