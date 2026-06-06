window.Ranch = {
    state: {},
    modules: {},

    init(moduleMap) {
        this.modules = moduleMap;

        console.log("Ranch Core Initialized");

        if (this.modules.ui?.init) {
            this.modules.ui.init(this);
        }

        if (this.modules.app?.init) {
            this.modules.app.init(this);
        }
    },

    log(msg) {
        console.log("[RANCH]", msg);
    }
};
