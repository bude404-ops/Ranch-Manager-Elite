class Auth {

    constructor() {
        this.user = JSON.parse(localStorage.getItem("rmp_user")) || null;
    }

    isLoggedIn() {
        return true; // ALWAYS allow app usage (guest mode supported)
    }

    getPlan() {
        return this.user?.plan || "free";
    }

    login(email) {

        const user = {
            email,
            plan: "free",
            created: new Date().toISOString()
        };

        this.user = user;
        localStorage.setItem("rmp_user", JSON.stringify(user));
    }

    upgrade(plan, code = null) {

        if (!this.user) {
            this.login("guest@local");
        }

        // ENTERPRISE UNLOCK
        if (code === "RANCH26") {
            plan = "enterprise";
        }

        this.user.plan = plan;

        localStorage.setItem("rmp_user", JSON.stringify(this.user));

        window.dispatchEvent(new Event("planChanged"));
    }

    can(feature) {

        const plan = this.getPlan();

        const permissions = {

            free: {
                animals: 25,
                inventory: 50,
                gps: false,
                workOrders: false,
                employees: false,
                charts: false,
                export: false
            },

            pro: {
                animals: Infinity,
                inventory: Infinity,
                gps: true,
                workOrders: true,
                employees: true,
                charts: true,
                export: true
            },

            enterprise: {
                animals: Infinity,
                inventory: Infinity,
                gps: true,
                workOrders: true,
                employees: true,
                charts: true,
                export: true,
                ai: true,
                auditLogs: true,
                advancedGps: true
            }
        };

        return permissions[plan]?.[feature];
    }
}

window.auth = new Auth();
