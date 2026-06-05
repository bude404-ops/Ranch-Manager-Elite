class SubscriptionManager {

    constructor(){

        this.founderCodes = [
            "BUDE-ALPHA-001",
            "BUDE-ALPHA-002",
            "BUDE-ALPHA-003",
            "BUDE-ALPHA-004",
            "BUDE-ALPHA-005",
            "BUDE-ALPHA-006",
            "BUDE-ALPHA-007",
            "BUDE-ALPHA-008",
            "BUDE-ALPHA-009",
            "BUDE-ALPHA-010"
        ];
    }

    redeem(code){

        if(this.founderCodes.includes(code)){

            localStorage.setItem(
                "subscription",
                "enterprise_plus"
            );

            return true;
        }

        return false;
    }
}

window.subscriptions =
    new SubscriptionManager();
