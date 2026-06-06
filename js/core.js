window.Ranch = {
    modules: {},

    init(mods) {
        this.modules = mods;

        this.modules.ui.init(this);
        this.modules.app.init(this);

        console.log("Ranch OS Core Loaded");
    },

    log(msg) {
        console.log("[RANCH]", msg);
    }
};
