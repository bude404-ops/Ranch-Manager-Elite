const FinanceManager = {

getAll() {
    return JSON.parse(
        localStorage.getItem(
            "transactions"
        ) || "[]"
    );
},

totalIncome() {

    return this.getAll()
        .filter(
            x => x.type === "income"
        )
        .reduce(
            (a,b)=>a+Number(
                b.amount||0
            ),
            0
        );

},

totalExpenses() {

    return this.getAll()
        .filter(
            x => x.type === "expense"
        )
        .reduce(
            (a,b)=>a+Number(
                b.amount||0
            ),
            0
        );

}

};
