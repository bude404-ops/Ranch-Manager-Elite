window.RanchUI = {
    core: null,

    sidebar: null,
    backdrop: null,
    menuBtn: null,

    init(core) {
        this.core = core;

        this.sidebar = document.getElementById("sidebar");
        this.backdrop = document.getElementById("backdrop");
        this.menuBtn = document.getElementById("menuBtn");

        this.bind();
    },

    bind() {
        // Use pointer events for better mobile + desktop support
        this.menuBtn?.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            this.toggle();
        });

        this.backdrop?.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            this.close();
        });

        // Event delegation (FIX: works even if nav items are re-rendered later)
        document.addEventListener("pointerdown", (e) => {
            const item = e.target.closest(".nav-item");
            if (!item) return;

            const view = item.dataset.view;
            if (view) {
                this.switchView(view);
                this.close();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.close();
        });
    },

    open() {
        this.sidebar?.classList.add("open");
        this.backdrop?.classList.add("active");

        document.body.style.overflow = "hidden"; // mobile fix
    },

    close() {
        this.sidebar?.classList.remove("open");
        this.backdrop?.classList.remove("active");

        document.body.style.overflow = ""; // restore scroll
    },

    toggle() {
        if (this.sidebar?.classList.contains("open")) {
            this.close();
        } else {
            this.open();
        }
    },

    switchView(view) {
        document.querySelectorAll(".view").forEach(v => {
            v.classList.remove("active");
        });

        const el = document.getElementById(view);
        if (el) el.classList.add("active");
    }
};
