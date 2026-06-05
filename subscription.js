class SubscriptionManager {

    constructor() {

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

        this.plans = {

            FREE: {
                name: "Free",
                animalLimit: 25,
                reports: false,
                finance: true,
                ai: false
            },

            PRO: {
                name: "Pro",
                animalLimit: 250,
                reports: true,
                finance: true,
                ai: false
            },

            ENTERPRISE: {
                name: "Enterprise",
                animalLimit: 5000,
                reports: true,
                finance: true,
                ai: true
            },

            FOUNDER: {
                name: "Founder",
                animalLimit: 999999,
                reports: true,
                finance: true,
                ai: true
            }
        };
    }

    getCurrentPlan() {

        return (
            localStorage.getItem(
                "subscription"
            ) || "FREE"
        );
    }

    setPlan(plan) {

        localStorage.setItem(
            "subscription",
            plan
        );
    }

    getPlanDetails() {

        const plan =
            this.getCurrentPlan();

        return (
            this.plans[plan] ||
            this.plans.FREE
        );
    }

    redeem(code) {

        if (
            this.founderCodes.includes(
                code
            )
        ) {

            localStorage.setItem(
                "subscription",
                "FOUNDER"
            );

            return true;
        }

        return false;
    }

    canUseReports() {

        return this.getPlanDetails()
            .reports;
    }

    canUseAI() {

        return this.getPlanDetails()
            .ai;
    }

    getAnimalLimit() {

        return this.getPlanDetails()
            .animalLimit;
    }

    isFounder() {

        return (
            this.getCurrentPlan() ===
            "FOUNDER"
        );
    }

    getPlanName() {

        return this.getPlanDetails()
            .name;
    }
}

window.subscriptions =
    new SubscriptionManager();
