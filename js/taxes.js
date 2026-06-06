const TaxManager = {

profit() {

    return (
        FinanceManager.totalIncome()
        -
        FinanceManager.totalExpenses()
    );

}

};
