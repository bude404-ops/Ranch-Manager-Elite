class Auth {

    constructor() {
        this.user = this.loadUser();
    }

    // OPTIONAL LOGIN ONLY
    login(email, password = null) {

        const user = {
            email,
            plan: "free",
            created: new Date().toISOString(),
            upgraded: false
        };

        localStorage.setItem("rmp_user", JSON.stringify(user));
        this.user = user;

        this.onLoginSuccess();
    }

    logout() {
        localStorage.removeItem("rmp_user");
        this.user = null;
        location.reload();
    }

    loadUser() {
        return JSON.parse(localStorage.getItem("rmp_user"));
    }

    isLoggedIn() {
        return !!this.user;
    }

    getPlan() {
        return this.user?.plan || "local";
    }

    // UPGRADES ONLY (not required for app use)
    upgradeTo(plan) {

        if (!this.user) {
            alert("Create an account first to upgrade.");
            return;
        }

        this.user.plan = plan;

        localStorage.setItem("rmp_user", JSON.stringify(this.user));

        alert("Upgraded to: " + plan);

        window.dispatchEvent(new Event("planChanged"));
    }

    onLoginSuccess() {
        console.log("User logged in (optional system)");
    }
}

window.auth = new Auth();
