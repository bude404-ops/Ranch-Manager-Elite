const founderCodes = [

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

function saveSettings() {

    localStorage.setItem(
        "ranchName",
        document.getElementById(
            "ranchName"
        ).value
    );

    localStorage.setItem(
        "ownerName",
        document.getElementById(
            "ownerName"
        ).value
    );

    alert("Settings Saved");
}

function saveSubscription() {

    const plan =
        document.getElementById(
            "subscriptionPlan"
        ).value;

    localStorage.setItem(
        "subscription",
        plan
    );

    alert("Subscription Updated");
}

function activateFounderCode() {

    const code =
        document.getElementById(
            "founderCode"
        ).value;

    const status =
        document.getElementById(
            "founderStatus"
        );

    if (
        founderCodes.includes(code)
    ) {

        localStorage.setItem(
            "subscription",
            "ENTERPRISE"
        );

        status.textContent =
            "Founder Access Activated";

    } else {

        status.textContent =
            "Invalid Code";
    }
}

function exportData() {

    const data = {

        animals:
            JSON.parse(
                localStorage.getItem(
                    "animals"
                )
            ) || [],

        transactions:
            JSON.parse(
                localStorage.getItem(
                    "transactions"
                )
            ) || [],

        ranchName:
            localStorage.getItem(
                "ranchName"
            ),

        ownerName:
            localStorage.getItem(
                "ownerName"
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

    const link =
        document.createElement(
            "a"
        );

    link.href = url;

    link.download =
        "ranch-backup.json";

    link.click();
}

function clearData() {

    if (
        confirm(
            "Delete all ranch data?"
        )
    ) {

        localStorage.clear();

        location.reload();
    }
}

window.onload = () => {

    document.getElementById(
        "ranchName"
    ).value =
    localStorage.getItem(
        "ranchName"
    ) || "";

    document.getElementById(
        "ownerName"
    ).value =
    localStorage.getItem(
        "ownerName"
    ) || "";

    document.getElementById(
        "subscriptionPlan"
    ).value =
    localStorage.getItem(
        "subscription"
    ) || "FREE";
};
