const SubscriptionManager = {

codes: {
    "RANCH26": "ENTERPRISE",
    "RANCH26A": "ENTERPRISE",
    "RANCH26B": "ENTERPRISE",
    "RANCH26C": "ENTERPRISE",
    "RANCH26D": "ENTERPRISE",
    "RANCH26E": "ENTERPRISE"
},

current() {

    return localStorage.getItem(
        "subscription"
    ) || "FREE";

},

set(plan) {

    localStorage.setItem(
        "subscription",
        plan
    );

    const badge =
        document.getElementById(
            "planBadge"
        );

    if (badge) {

        badge.textContent =
            plan;

    }

},

activateCode(code) {

    const upper =
        code.toUpperCase();

    if (
        this.codes[upper]
    ) {

        this.set(
            this.codes[upper]
        );

        alert(
            "Enterprise Activated"
        );

        return true;

    }

    return false;

},

canUse(feature) {

    const plan =
        this.current();

    const permissions = {

        FREE: [
            "animals",
            "finance",
            "inventory"
        ],

        PRO: [
            "animals",
            "finance",
            "inventory",
            "employees",
            "workorders",
            "equipment"
        ],

        ENTERPRISE: [
            "animals",
            "finance",
            "inventory",
            "employees",
            "workorders",
            "equipment",
            "gps",
            "paddocks",
            "taxes",
            "reports"
        ]

    };

    return permissions[plan]
        ?.includes(feature);

}

};

function activateEnterprise() {

const code =
    document.getElementById(
        "enterpriseCode"
    )?.value || "";

if (
    !SubscriptionManager
    .activateCode(code)
) {

    alert(
        "Invalid Code"
    );

}

}
