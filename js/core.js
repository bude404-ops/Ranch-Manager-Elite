window.Ranch = {
    modules: {},
    state: {
        initialized: false,
        authenticated: false,
        user: null,
        tier: 'FREE',
        offline: false
    },
    init(mods) {
        if (this.state.initialized) {
            console.warn('[RANCH] Already initialized');
            return;
        }
        this.modules = mods || {};
        try {
            if (!this.modules.ui) throw new Error('UI module required');
            if (!this.modules.app) throw new Error('App module required');
            this.modules.ui.init(this);
            this.modules.app.init(this);
            ['storage', 'gps', 'charts', 'subscriptions'].forEach(name => {
                if (this.modules[name] && typeof this.modules[name].init === 'function') {
                    try {
                        this.modules[name].init(this);
                    } catch (err) {
                        console.warn(`[RANCH] ${name} module init failed:`, err);
                    }
                }
            });
            this.loadAuthState();
            this.setupOfflineDetection();
            this.state.initialized = true;
            this.log('Ranch OS Elite v2.0 Loaded');
            this.showToast('Ranch Manager Elite ready', 'success');
        } catch (err) {
            console.error('[RANCH] Fatal initialization error:', err);
            this.showToast('Failed to start app. Please refresh.', 'error');
        }
    },
    loadAuthState() {
        try {
            const auth = localStorage.getItem('ranch_auth');
            if (auth) {
                const data = JSON.parse(auth);
                this.state.authenticated = true;
                this.state.user = data;
                this.state.tier = data.tier || 'FREE';
                this.showApp();
            }
        } catch (e) {
            console.warn('[RANCH] Auth load failed:', e);
        }
    },
    saveAuthState(user) {
        this.state.authenticated = true;
        this.state.user = user;
        this.state.tier = user.tier || 'FREE';
        localStorage.setItem('ranch_auth', JSON.stringify(user));
        this.showApp();
        this.showToast(`Welcome, ${user.ranchName || 'Rancher'}!`, 'success');
    },
    clearAuthState() {
        this.state.authenticated = false;
        this.state.user = null;
        this.state.tier = 'FREE';
        localStorage.removeItem('ranch_auth');
        this.showAuth();
    },
    showAuth() {
        const auth = document.getElementById('authScreen');
        const app = document.getElementById('appContainer');
        if (auth) auth.classList.remove('hidden');
        if (app) app.classList.add('hidden');
    },
    showApp() {
        const auth = document.getElementById('authScreen');
        const app = document.getElementById('appContainer');
        if (auth) auth.classList.add('hidden');
        if (app) {
            app.classList.remove('hidden');
            this.modules.app?.render?.();
        }
        const badge = document.getElementById('tierBadge');
        if (badge) badge.textContent = this.state.tier;
    },
    setupOfflineDetection() {
        const updateStatus = () => {
            this.state.offline = !navigator.onLine;
            const status = document.getElementById('syncStatus');
            if (status) {
                status.textContent = this.state.offline ? '○' : '●';
                status.className = this.state.offline ? 'sync-status offline' : 'sync-status online';
            }
            if (this.state.offline) {
                this.showToast('Working offline', 'warning');
            }
        };
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
        updateStatus();
    },
    getModule(name) {
        return this.modules[name] || null;
    },
    log(msg) {
        console.log('[RANCH]', msg);
    },
    showToast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-message">${this.escapeHtml(message)}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
