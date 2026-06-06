(function () {
    "use strict";

    // =====================================================
    // EVENT BUS (UNCHANGED CORE)
    // =====================================================

    class EventBus {
        constructor() {
            this.events = {};
        }

        on(event, fn) {
            (this.events[event] ||= []).push(fn);
        }

        emit(event, data) {
            (this.events[event] || []).forEach(fn => fn(data));
        }
    }

    // =====================================================
    // MULTIPLAYER LAYER (ABSTRACTED BACKEND)
    // =====================================================

    class NetworkAdapter {
        constructor(app) {
            this.app = app;
            this.sessionId = this.generateId();
            this.peers = [];
            this.online = false;
        }

        connect() {
            // Firebase/WebSocket placeholder layer
            this.online = true;
            this.app.log("🌐 Connected to multiplayer network");

            this.broadcast({
                type: "join",
                sessionId: this.sessionId
            });

            this.startSyncLoop();
        }

        broadcast(payload) {
            // In real version: Firebase push / WebSocket emit
            console.log("[SYNC OUT]", payload);
        }

        receive(payload) {
            // Merge remote updates
            if (payload.sessionId === this.sessionId) return;

            this.app.log("📡 Sync event received: " + payload.type);

            this.app.state.remoteEvents.push(payload);
            this.app.bus.emit("remote-update", payload);
        }

        startSyncLoop() {
            setInterval(() => {
                this.broadcast({
                    type: "state-sync",
                    sessionId: this.sessionId,
                    state: this.app.state
                });
            }, 5000);
        }

        generateId() {
            return Math.random().toString(36).substring(2, 10);
        }
    }

    // =====================================================
    // AI RANCH ASSISTANT (LOCAL AI BRAIN)
    // =====================================================

    class AIEngine {
        constructor(app) {
            this.app = app;
        }

        ask(input) {
            const text = input.toLowerCase();

            // SIMPLE AI RULE BRAIN (offline-friendly)
            if (text.includes("feed")) {
                return this.autoFeed();
            }

            if (text.includes("money")) {
                return `You currently have $${this.app.state.money}. Income is driven by herd size.`;
            }

            if (text.includes("task")) {
                return this.autoTask();
            }

            if (text.includes("optimize")) {
                return this.optimizeRanch();
            }

            return "AI: I can help with feed, money, tasks, optimize.";
        }

        autoFeed() {
            let fed = 0;

            this.app.state.animals.forEach(a => {
                if (a.hunger > 60) {
                    a.hunger -= 30;
                    a.health += 5;
                    fed++;
                }
            });

            this.app.toast(`AI fed ${fed} animals`);
            this.app.log(`AI auto-feed executed (${fed})`);
            return `Fed ${fed} animals automatically.`;
        }

        autoTask() {
            const task = {
                id: Date.now(),
                title: "AI Generated: Check ranch health",
                done: false
            };

            this.app.state.tasks.push(task);
            this.app.toast("AI created task");
            return "AI created a new task.";
        }

        optimizeRanch() {
            const income = this.app.state.animals.length * 7;
            return `Optimization suggestion: expand herd. Estimated income $${income}/cycle.`;
        }
    }

    // =====================================================
    // MAIN APP
    // =====================================================

    class RanchApp {
        constructor() {
            this.version = "Enterprise v6.0 AI + Multiplayer";

            this.bus = new EventBus();
            this.state = this.loadState();

            this.state.remoteEvents ||= [];

            this.network = new NetworkAdapter(this);
            this.ai = new AIEngine(this);

            this.modules = {
                animals: new AnimalModule(this),
                tasks: new TaskModule(this),
                economy: new EconomyModule(this),
                logs: new LogModule(this),
                ui: new UIModule(this),
                chat: new AIChatModule(this)
            };

            this.init();
        }

        init() {
            document.addEventListener("DOMContentLoaded", () => {
                this.bindUI();
                this.startLoops();
                this.modules.ui.renderAll();

                this.network.connect();

                this.toast("Ranch v6 AI Online 🤖");
            });
        }

        bindUI() {
            document.body.addEventListener("click", (e) => {
                const action = e.target?.dataset?.action;
                if (!action) return;

                this.bus.emit(action, e.target);
            });

            this.bus.on("add-animal", () => this.modules.animals.add());
            this.bus.on("add-task", () => this.modules.tasks.add());
        }

        startLoops() {
            setInterval(() => this.save(), 12000);

            setInterval(() => {
                this.modules.animals.simulate();
                this.modules.economy.tick();
                this.modules.ui.renderAll();
            }, 7000);
        }

        updateState(fn) {
            fn(this.state);

            this.network.broadcast({
                type: "state-update",
                state: this.state,
                sessionId: this.network.sessionId
            });

            this.save();
        }

        loadState() {
            return JSON.parse(localStorage.getItem("ranch_v6") || JSON.stringify({
                animals: [],
                tasks: [],
                money: 1000,
                logs: [],
                remoteEvents: []
            }));
        }

        save() {
            localStorage.setItem("ranch_v6", JSON.stringify(this.state));
        }

        log(msg) {
            this.state.logs.push({
                time: new Date().toISOString(),
                message: msg
            });
            console.log("[V6]", msg);
        }

        toast(msg) {
            const el = document.createElement("div");
            el.innerText = msg;

            Object.assign(el.style, {
                position: "fixed",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#111",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                zIndex: 9999
            });

            document.body.appendChild(el);
            setTimeout(() => el.remove(), 2500);
        }
    }

    // =====================================================
    // AI CHAT MODULE
    // =====================================================

    class AIChatModule {
        constructor(app) {
            this.app = app;
        }

        send(message) {
            const response = this.app.ai.ask(message);
            this.app.toast(response);
            this.app.log("AI: " + message);
            return response;
        }
    }

    // =====================================================
    // ANIMALS
    // =====================================================

    class AnimalModule {
        constructor(app) {
            this.app = app;
        }

        add() {
            const name = prompt("Animal name:");
            const type = prompt("Type:");

            this.app.updateState(s => {
                s.animals.push({
                    id: Date.now(),
                    name,
                    type,
                    health: 100,
                    hunger: 40
                });
            });
        }

        simulate() {
            this.app.state.animals.forEach(a => {
                a.hunger += 4;
                a.health -= a.hunger > 70 ? 2 : 1;
            });
        }

        render() {
            const el = document.querySelector("#animals");
            if (!el) return;

            el.innerHTML = "";

            this.app.state.animals.forEach(a => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerHTML = `
                    <h3>${a.name}</h3>
                    <p>${a.type}</p>
                    <p>❤️ ${a.health} 🍖 ${a.hunger}</p>
                    <button data-action="feed-${a.id}">Feed</button>
                `;

                el.appendChild(div);
            });
        }
    }

    // =====================================================
    // TASKS
    // =====================================================

    class TaskModule {
        constructor(app) {
            this.app = app;
        }

        add() {
            const title = prompt("Task:");
            this.app.state.tasks.push({
                id: Date.now(),
                title,
                done: false
            });
        }

        render() {
            const el = document.querySelector("#tasks");
            if (!el) return;

            el.innerHTML = "";

            this.app.state.tasks.forEach(t => {
                const div = document.createElement("div");
                div.className = "card";
                div.innerText = t.title;
                el.appendChild(div);
            });
        }
    }

    // =====================================================
    // ECONOMY
    // =====================================================

    class EconomyModule {
        constructor(app) {
            this.app = app;
        }

        tick() {
            const income = this.app.state.animals.length * 6;
            this.app.state.money += income;
        }

        render() {
            const el = document.querySelector("#economy");
            if (!el) return;

            el.innerHTML = `<div class="card">💰 $${this.app.state.money}</div>`;
        }
    }

    // =====================================================
    // LOGS
    // =====================================================

    class LogModule {
        constructor(app) {
            this.app = app;
        }

        render() {
            const el = document.querySelector("#logs");
            if (!el) return;

            el.innerHTML = "";

            this.app.state.logs.slice(-10).forEach(l => {
                const div = document.createElement("div");
                div.innerText = `${l.time}: ${l.message}`;
                el.appendChild(div);
            });
        }
    }

    // =====================================================
    // UI
    // =====================================================

    class UIModule {
        constructor(app) {
            this.app = app;
        }

        renderAll() {
            this.app.modules.animals.render();
            this.app.modules.tasks.render();
            this.app.modules.economy.render();
            this.app.modules.logs.render();
        }
    }

    // =====================================================
    // BOOT
    // =====================================================

    window.ranchApp = new RanchApp();

})();
