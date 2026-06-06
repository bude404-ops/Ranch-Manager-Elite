/**
 * Ranch Manager Elite — Core Module
 * Central orchestrator for all app modules
 */
window.Ranch = {
    modules: {},
    initialized: false,

    /**
     * Initialize all modules
     * @param {Object} mods - Module registry {ui, app, storage, gps, charts, subscriptions}
     */
    init(mods) {
        if (this.initialized) {
            console.warn('[RANCH] Already initialized, skipping.');
            return;
        }

        this.modules = mods || {};

        try {
            // Validate required modules
            if (!this.modules.ui) throw new Error('UI module is required');
            if (!this.modules.app) throw new Error('App module is required');

            // Initialize modules in dependency order
            this.modules.ui.init(this);
            this.modules.app.init(this);

            // Optional modules
            if (this.modules.storage) this.modules.storage.init?.(this);
            if (this.modules.gps) this.modules.gps.init?.(this);
            if (this.modules.charts) this.modules.charts.init?.(this);
            if (this.modules.subscriptions) this.modules.subscriptions.init?.(this);

            this.initialized = true;
            this.log('Ranch OS Core Loaded — v1.0.0');
        } catch (err) {
            console.error('[RANCH] Initialization failed:', err);
            throw err;
        }
    },

    /**
     * Log with prefix
     * @param {string} msg 
     */
    log(msg) {
        console.log('[RANCH]', msg);
    },

    /**
     * Safe module accessor
     * @param {string} name 
     * @returns {Object|null}
     */
    getModule(name) {
        return this.modules[name] || null;
    }
};
