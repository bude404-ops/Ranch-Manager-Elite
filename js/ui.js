window.RanchUI = {
    core: null,
    sidebar: null,
    backdrop: null,
    menuBtn: null,
    bottomNav: null,
    initialized: false,
    init(core) {
        if (this.initialized) return;
        this.core = core;
        this.sidebar = document.getElementById('sidebar');
        this.backdrop = document.getElementById('backdrop');
        this.menuBtn = document.getElementById('menuBtn');
        this.bottomNav = document.getElementById('bottomNav');
        this.bindEvents();
        this.bindAuth();
        this.bindPricingToggle();
        this.initialized = true;
    },
    bindEvents() {
        this.menuBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSidebar();
        });
        this.backdrop?.addEventListener('click', () => this.closeSidebar());
        this.sidebar?.addEventListener('click', (e) => {
            const item = e.target.closest('.nav-item');
            if (!item) return;
            e.preventDefault();
            const view = item.dataset.view;
            if (view) {
                this.switchView(view);
                this.closeSidebar();
            }
        });
        this.bottomNav?.addEventListener('click', (e) => {
            const item = e.target.closest('.bottom-item');
            if (!item) return;
            e.preventDefault();
            const view = item.dataset.view;
            if (view) this.switchView(view);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
                this.closeModal();
            }
        });
        document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') this.closeModal();
        });
        document.querySelector('.modal-close')?.addEventListener('click', () => this.closeModal());
    },
    bindAuth() {
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab + 'Form')?.classList.add('active');
            });
        });
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            this.core.saveAuthState({ email, ranchName: 'Sunset Ranch', tier: 'FREE' });
        });
        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = e.target.querySelectorAll('input, select');
            this.core.saveAuthState({ email: inputs[1].value, ranchName: inputs[0].value, tier: 'FREE' });
        });
        document.getElementById('guestLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.core.saveAuthState({ email: 'guest@ranch.local', ranchName: 'Guest Ranch', tier: 'FREE' });
        });
    },
    bindPricingToggle() {
        document.querySelectorAll('.pricing-period').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.pricing-period').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const period = btn.dataset.period;
                document.querySelectorAll('.pricing-price').forEach(price => {
                    const val = price.dataset[period];
                    if (val) price.innerHTML = `$${val}<span>/mo</span>`;
                });
            });
        });
    },
    openSidebar() {
        this.sidebar?.classList.add('open');
        this.backdrop?.classList.add('active');
        this.menuBtn?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    },
    closeSidebar() {
        this.sidebar?.classList.remove('open');
        this.backdrop?.classList.remove('active');
        this.menuBtn?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    },
    toggleSidebar() {
        if (this.sidebar?.classList.contains('open')) this.closeSidebar();
        else this.openSidebar();
    },
    switchView(viewId) {
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
            v.setAttribute('aria-hidden', 'true');
        });
        const target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            target.setAttribute('aria-hidden', 'false');
        }
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewId);
        });
        document.querySelectorAll('.bottom-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewId);
        });
        const titleMap = {
            dashboard: 'Dashboard', animals: 'Livestock', pasture: 'Pasture & Grazing',
            health: 'Health & Breeding', tasks: 'Tasks & Calendar', inventory: 'Inventory & Feed',
            finance: 'Finance & Sales', reports: 'Reports & Analytics', ai: 'AI Ranch Assistant',
            gps: 'Maps & Fencing', team: 'Team Management', market: 'Livestock Market',
            settings: 'Settings', upgrade: 'Upgrade Plan'
        };
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) pageTitle.textContent = titleMap[viewId] || 'Ranch Manager';
        document.title = `${titleMap[viewId] || 'Ranch Manager'} — Ranch Manager Elite`;
        document.querySelector('.app-content')?.scrollTo(0, 0);
    },
    openModal(title, content) {
        const overlay = document.getElementById('modalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        if (overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },
    closeModal() {
        const overlay = document.getElementById('modalOverlay');
        if (overlay) overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
};
