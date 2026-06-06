class UI {
    constructor(app) {
        this.app = app;

        this.sidebar = document.getElementById("sidebar");
        this.backdrop = document.getElementById("backdrop");
        this.menuBtn = document.getElementById("menuBtn");

        this.init();
    }

    init() {
        // MENU OPEN/CLOSE
        this.menuBtn.onclick = () => this.open();

        this.backdrop.onclick = () => this.close();

        document.querySelectorAll(".nav-item").forEach(item => {
            item.addEventListener("click", () => {
                this.switchView(item.dataset.view);
                this.close();
            });
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape") this.close();
        });
    }

    open() {
        this.sidebar.classList.add("open");
        this.backdrop.classList.add("active");
    }

    close() {
        this.sidebar.classList.remove("open");
        this.backdrop.classList.remove("active");
    }

    switchView(viewId) {
        document.querySelectorAll(".view").forEach(v => {
            v.classList.remove("active");
        });

        const target = document.getElementById(viewId);
        if (target) target.classList.add("active");
    }
}

window.ui = null;
