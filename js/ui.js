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
        this.bindAccountCreation();
        this.bindPricingToggle();

        this.renderAccountSection();

        setTimeout(() => {
            document.querySelectorAll('[data-view]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const view = btn.dataset.view;

                    if (view) {
                        this.switchView(view);
                        this.closeSidebar();
                    }
                });
            });
        }, 500);

        this.initialized = true;

        if (this.core?.updateDemoBanner) {
            this.core.updateDemoBanner();
        }
    },

    bindEvents() {

        this.menuBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleSidebar();
        });

        this.backdrop?.addEventListener('click', () => {
            this.closeSidebar();
        });

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

            if (view) {
                this.switchView(view);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSidebar();
                this.closeModal();
            }
        });

        document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') {
                this.closeModal();
            }
        });

        document.querySelector('.modal-close')?.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeSidebar();
            }
        });

        let startX = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;

            if (
                this.sidebar?.classList.contains('open') &&
                startX - endX > 80
            ) {
                this.closeSidebar();
            }
        });
    },

    bindAuth() {

        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {

                document.querySelectorAll('.auth-tab')
                    .forEach(t => t.classList.remove('active'));

                document.querySelectorAll('.auth-form')
                    .forEach(f => f.classList.remove('active'));

                tab.classList.add('active');

                document
                    .getElementById(tab.dataset.tab + 'Form')
                    ?.classList.add('active');
            });
        });

        document.getElementById('loginForm')
            ?.addEventListener('submit', (e) => {

                e.preventDefault();

                const email =
                    e.target.querySelector('input[type="email"]').value;

                this.core?.saveAuthState({
                    email,
                    ranchName: 'My Ranch',
                    tier: 'FREE'
                });
            });

        document.getElementById('registerForm')
            ?.addEventListener('submit', (e) => {

                e.preventDefault();

                const inputs =
                    e.target.querySelectorAll('input');

                this.core?.saveAuthState({
                    ranchName: inputs[0].value,
                    email: inputs[1].value,
                    tier: 'FREE'
                });
            });

        document.getElementById('guestLink')
            ?.addEventListener('click', (e) => {

                e.preventDefault();

                this.core?.saveAuthState({
                    email: 'guest@ranch.local',
                    ranchName: 'Guest Ranch',
                    tier: 'FREE'
                });
            });
    },

    bindAccountCreation() {

        const createForm =
            document.getElementById('createAccountForm');

        if (createForm) {

            createForm.addEventListener('submit', (e) => {

                e.preventDefault();

                const ranchName =
                    document.getElementById('acctRanchName')?.value.trim();

                const email =
                    document.getElementById('acctEmail')?.value.trim();

                const password =
                    document.getElementById('acctPassword')?.value;

                const confirm =
                    document.getElementById('acctConfirm')?.value;

                if (!ranchName || !email || !password) {
                    this.core?.showToast(
                        'Please complete all fields',
                        'error'
                    );
                    return;
                }

                if (password !== confirm) {
                    this.core?.showToast(
                        'Passwords do not match',
                        'error'
                    );
                    return;
                }

                if (password.length < 6) {
                    this.core?.showToast(
                        'Password must be at least 6 characters',
                        'warning'
                    );
                    return;
                }

                const user = {
                    ranchName,
                    email,
                    tier: this.core?.state?.tier || 'FREE',
                    createdAt: new Date().toISOString()
                };

                this.core?.saveAuthState(user);

                this.renderAccountSection();

                this.core?.showToast(
                    'Account created successfully',
                    'success'
                );
            });
        }

        const loginForm =
            document.getElementById('settingsLoginForm');

        if (loginForm) {

            loginForm.addEventListener('submit', (e) => {

                e.preventDefault();

                const email =
                    document.getElementById('settingsLoginEmail')?.value;

                if (!email) {
                    this.core?.showToast(
                        'Enter an email',
                        'error'
                    );
                    return;
                }

                this.core?.saveAuthState({
                    email,
                    ranchName: 'My Ranch',
                    tier: this.core?.state?.tier || 'FREE'
                });

                this.renderAccountSection();

                this.core?.showToast(
                    'Logged in successfully',
                    'success'
                );
            });
        }

        document
            .getElementById('settingsLogoutBtn')
            ?.addEventListener('click', () => {

                if (confirm('Log out?')) {

                    this.core?.clearAuthState();

                    this.renderAccountSection();

                    this.core?.showToast(
                        'Logged out',
                        'info'
                    );
                }
            });
    },

    renderAccountSection() {

        const loggedIn =
            this.core?.state?.authenticated;

        const create =
            document.getElementById('accountCreateSection');

        const login =
            document.getElementById('accountLoginSection');

        const info =
            document.getElementById('accountInfoSection');

        if (loggedIn) {

            if (create) create.style.display = 'none';
            if (login) login.style.display = 'none';
            if (info) info.style.display = 'block';

            document.getElementById('accountEmailDisplay').textContent =
                this.core?.state?.user?.email || '';

            document.getElementById('accountRanchDisplay').textContent =
                this.core?.state?.user?.ranchName || '';

        } else {

            if (create) create.style.display = 'block';
            if (login) login.style.display = 'block';
            if (info) info.style.display = 'none';
        }
    },

    bindPricingToggle() {

        document.querySelectorAll('.pricing-period')
            .forEach(btn => {

                btn.addEventListener('click', () => {

                    document.querySelectorAll('.pricing-period')
                        .forEach(b => b.classList.remove('active'));

                    btn.classList.add('active');

                    const period = btn.dataset.period;

                    document.querySelectorAll('.pricing-price')
                        .forEach(price => {

                            const val = price.dataset[period];

                            if (val) {
                                price.innerHTML =
                                    `$${val}<span>/mo</span>`;
                            }
                        });
                });
            });
    },

    openSidebar() {

        this.sidebar?.classList.add('open');
        this.backdrop?.classList.add('active');

        this.menuBtn?.setAttribute(
            'aria-expanded',
            'true'
        );

        document.body.classList.add('sidebar-open');
    },

    closeSidebar() {

        this.sidebar?.classList.remove('open');
        this.backdrop?.classList.remove('active');

        this.menuBtn?.setAttribute(
            'aria-expanded',
            'false'
        );

        document.body.classList.remove('sidebar-open');
    },

    toggleSidebar() {

        if (this.sidebar?.classList.contains('open')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    },

    switchView(viewId) {

        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
            view.setAttribute('aria-hidden', 'true');
        });

        const target =
            document.getElementById(viewId);

        if (target) {
            target.classList.add('active');
            target.setAttribute('aria-hidden', 'false');
        }

        document.querySelectorAll('.nav-item')
            .forEach(item => {
                item.classList.toggle(
                    'active',
                    item.dataset.view === viewId
                );
            });

        document.querySelectorAll('.bottom-item')
            .forEach(item => {
                item.classList.toggle(
                    'active',
                    item.dataset.view === viewId
                );
            });

        const titleMap = {
            dashboard: 'Dashboard',
            animals: 'Livestock',
            pasture: 'Pasture & Grazing',
            health: 'Health & Breeding',
            tasks: 'Tasks & Calendar',
            inventory: 'Inventory & Feed',
            finance: 'Finance & Sales',
            reports: 'Reports & Analytics',
            ai: 'AI Ranch Assistant',
            gps: 'Maps & Fencing',
            market: 'Livestock Market',
            settings: 'Settings',
            upgrade: 'Upgrade Plan'
        };

        const title =
            titleMap[viewId] || 'Ranch Manager';

        const pageTitle =
            document.getElementById('pageTitle');

        if (pageTitle) {
            pageTitle.textContent = title;
        }

        document.title =
            `${title} — Ranch Manager Elite`;

        document.querySelector('.app-content')
            ?.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        this.closeSidebar();
    },

    openModal(title, content) {

        const overlay =
            document.getElementById('modalOverlay');

        const modalTitle =
            document.getElementById('modalTitle');

        const modalBody =
            document.getElementById('modalBody');

        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;

        overlay?.classList.remove('hidden');
    },

    closeModal() {

        document
            .getElementById('modalOverlay')
            ?.classList.add('hidden');
    }
};
