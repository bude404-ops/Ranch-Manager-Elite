const ReportManager = {

summary() {

    return {

        animals:
            LivestockManager.total(),

        income:
            FinanceManager
            .totalIncome(),

        expenses:
            FinanceManager
            .totalExpenses(),

        profit:
            TaxManager
            .profit()

    };

}

};
