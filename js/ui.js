/**
 * Ranch Manager Elite — UI Module
 * Handles sidebar, navigation, view switching, and accessibility
 */
window.RanchUI = {
    core: null,
    sidebar: null,
    backdrop: null,
    menuBtn: null,
    initialized: false,

    init(core) {
        if (this.initialized) return;
        this.core = core;

        this.sidebar = document.getElementById('sidebar');
        this.backdrop = document.getElementById('backdrop');
        this.menuBtn = document.getElementById('menuBtn');

        if (!this.sidebar || !this.backdrop || !this.menuBtn) {
            console.error('[UI] Required DOM elements missing');
            return;
        }

        this.bind();
        this.initialized = true;
    },

    bind() {
        // Menu button — use click for better compatibility
        this.menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Backdrop click
        this.backdrop.addEventListener('click', () => {
            this.close();
        });

        // Nav item clicks — event delegation
        this.sidebar.addEventListener('click', (e) => {
            const item = e.target.closest('.nav-item');
            if (!item) return;

            const view = item.dataset.view;
            if (view) {
                this.switchView(view);
                this.close();
            }
        });

        // Keyboard support for nav items
        this.sidebar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const item = e.target.closest('.nav-item');
                if (item) {
                    e.preventDefault();
                    const view = item.dataset.view;
                    if (view) {
                        this.switchView(view);
                        this.close();
                    }
                }
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });

        // Close on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) this.close();
        });
    },

    open() {
        this.sidebar.classList.add('open');
        this.backdrop.classList.add('active');
        this.menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.sidebar.classList.remove('open');
        this.backdrop.classList.remove('active');
        this.menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    },

    toggle() {
        if (this.sidebar.classList.contains('open')) {
            this.close();
        } else {
            this.open();
        }
    },

    switchView(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
            v.setAttribute('aria-hidden', 'true');
        });

        // Show target view
        const target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            target.setAttribute('aria-hidden', 'false');
            
            // Update page title
            const title = target.querySelector('h2')?.textContent || viewId;
            document.title = `${title} — Ranch Manager Elite`;
        } else {
            console.warn(`[UI] View "${viewId}" not found`);
        }
    }
};
