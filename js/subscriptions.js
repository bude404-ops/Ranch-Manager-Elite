/* =====================================================
RANCH OS ENTERPRISE
subscriptions.js
Free / Pro / Enterprise
===================================================== */

const RanchSubscriptions = {

plans: {

    FREE: {

        name: "FREE",

        features: [

            "dashboard",
            "livestock",
            "inventory",
            "finance"

        ]

    },

    PRO: {

        name: "PRO",

        features: [

            "dashboard",
            "livestock",
            "inventory",
            "equipment",
            "employees",
            "workorders",
            "finance",
            "reports",
            "taxes",
            "health",
            "breeding"

        ]

    },

    ENTERPRISE: {

        name: "ENTERPRISE",

        features: [

            "dashboard",
            "livestock",
            "inventory",
            "equipment",
            "employees",
            "workorders",
            "paddocks",
            "gps",
            "finance",
            "reports",
            "taxes",
            "health",
            "breeding",
            "feed",
            "maintenance",
            "analytics",
            "documents",
            "vendors",
            "customers",
            "backup"

        ]

    }

},

getCurrentPlan() {

    return (
        localStorage.getItem(
            "subscription"
        ) || "FREE"
    );

},

setPlan(plan) {

    localStorage.setItem(
        "subscription",
        plan
    );

    this.updateBadge();

    this.applyPlan();

},

updateBadge() {

    const badge =
        document.getElementById(
            "planBadge"
        );

    if (!badge) return;

    badge.textContent =
        this.getCurrentPlan();

},

hasFeature(feature) {

    const plan =
        this.getCurrentPlan();

    const features =
        this.plans[plan]
        ?.features || [];

    return features.includes(
        feature
    );

},

applyPlan() {

    const lockMap = {

        paddocks: "paddocks",
        gps: "gps",
        reports: "reports",
        taxes: "taxes",
        health: "health",
        breeding: "breeding",
        feed: "feed",
        maintenance: "maintenance",
        analytics: "analytics",
        documents: "documents",
        vendors: "vendors",
        customers: "customers"

    };

    Object.keys(lockMap)
        .forEach(sectionId => {

            const button =
                document.querySelector(
                    `[onclick="showSection('${sectionId}')"]`
                );

            if (!button)
                return;

            const allowed =
                this.hasFeature(
                    lockMap[
                        sectionId
                    ]
                );

            button.style.display =
                allowed
                ? "block"
                : "none";

        });

}

};

/* =====================================
OWNER ACCESS
===================================== */

function activateEnterprise() {

const code =
    document.getElementById(
        "enterpriseCode"
    )?.value || "";

const cleanCode =
    code.trim()
    .toUpperCase();

if (
    cleanCode ===
    "RANCH26"
) {

    RanchSubscriptions
        .setPlan(
            "ENTERPRISE"
        );

    localStorage.setItem(
        "ownerAccess",
        "true"
    );

    alert(
        "Enterprise Activated"
    );

    return;

}

alert(
    "Invalid Code"
);

}

/* =====================================
UPGRADE BUTTONS
===================================== */

function upgradeToPro() {

RanchSubscriptions
    .setPlan(
        "PRO"
    );

alert(
    "Pro Activated"
);

}

function upgradeToEnterprise() {

RanchSubscriptions
    .setPlan(
        "ENTERPRISE"
    );

alert(
    "Enterprise Activated"
);

}

/* =====================================
FEATURE GATE
===================================== */

function requireFeature(
feature,
callback
) {

if (
    RanchSubscriptions
    .hasFeature(
        feature
    )
) {

    callback();

    return true;

}

alert(

    "This feature requires a higher subscription tier."

);

return false;

}

/* =====================================
BACKUP ACCESS
===================================== */

function exportBackup() {

if (

    !RanchSubscriptions
    .hasFeature(
        "backup"
    )

) {

    alert(

        "Backup export requires Enterprise."

    );

    return;

}

const data = {

    animals:
        RanchOS.get(
            "animals",
            []
        ),

    paddocks:
        RanchOS.get(
            "paddocks",
            []
        ),

    inventory:
        RanchOS.get(
            "inventory",
            []
        ),

    equipment:
        RanchOS.get(
            "equipment",
            []
        ),

    employees:
        RanchOS.get(
            "employees",
            []
        ),

    workorders:
        RanchOS.get(
            "workorders",
            []
        ),

    transactions:
        RanchOS.get(
            "transactions",
            []
        )

};

const blob =
    new Blob(

        [
            JSON.stringify(
                data,
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

const a =
    document.createElement(
        "a"
    );

a.href = url;

a.download =
    "ranchos-backup.json";

a.click();

}

/* =====================================
RESET APP
===================================== */

function clearRanchData() {

const confirmReset =
    confirm(

        "Delete all Ranch OS data?"

    );

if (
    !confirmReset
) return;

localStorage.clear();

location.reload();

}

/* =====================================
STARTUP
===================================== */

document.addEventListener(

"DOMContentLoaded",

() => {

    RanchSubscriptions
        .updateBadge();

    RanchSubscriptions
        .applyPlan();

}

);
