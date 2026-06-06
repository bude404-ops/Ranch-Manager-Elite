/**
 * Ranch Manager Elite — App Module
 * Business logic: animals, tasks, inventory, economy, data persistence
 */
window.RanchApp = {
    core: null,
    state: {
        money: 1000,
        animals: [],
        tasks: [],
        inventory: [],
        incomeRate: 5,
        lastSaved: null
    },
    loopInterval: null,
    initialized: false,

    init(core) {
        if (this.initialized) return;
        this.core = core;

        this.loadState();
        this.bind();
        this.startLoop();
        this.render();

        this.core.log('App initialized');
        this.initialized = true;
    },

    bind() {
        document.body.addEventListener('click', (e) => {
            const action = e.target.dataset.action || e.target.closest('[data-action]')?.dataset.action;
            if (!action) return;

            switch (action) {
                case 'add-animal':
                    this.addAnimal();
                    break;
                case 'add-task':
                    this.addTask();
                    break;
                case 'add-inventory':
                    this.addInventory();
                    break;
                case 'ai-analyze':
                    this.aiAnalyze();
                    break;
                case 'add-fence':
                    this.addFence();
                    break;
                case 'add-water':
                    this.addWater();
                    break;
                case 'add-gate':
                    this.addGate();
                    break;
                case 'export-data':
                    this.exportData();
                    break;
                case 'import-data':
                    this.importData();
                    break;
                case 'clear-data':
                    this.clearData();
                    break;
                default:
                    console.log(`[APP] Unhandled action: ${action}`);
            }
        });

        // AI button in topbar
        const aiBtn = document.getElementById('aiBtn');
        if (aiBtn) {
            aiBtn.addEventListener('click', () => {
                this.core.getModule('ui')?.switchView('ai');
            });
        }
    },

    // --- Animals ---
    addAnimal() {
        const name = prompt('Animal name:');
        if (!name || !name.trim()) return;

        const animal = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            name: name.trim(),
            type: 'cattle',
            added: new Date().toISOString(),
            health: 100
        };

        this.state.animals.push(animal);
        this.saveState();
        this.render();
    },

    removeAnimal(id) {
        this.state.animals = this.state.animals.filter(a => a.id !== id);
        this.saveState();
        this.render();
    },

    // --- Tasks ---
    addTask() {
        const title = prompt('Task description:');
        if (!title || !title.trim()) return;

        const task = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            title: title.trim(),
            completed: false,
            created: new Date().toISOString()
        };

        this.state.tasks.push(task);
        this.saveState();
        this.render();
    },

    toggleTask(id) {
        const task = this.state.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveState();
            this.render();
        }
    },

    removeTask(id) {
        this.state.tasks = this.state.tasks.filter(t => t.id !== id);
        this.saveState();
        this.render();
    },

    // --- Inventory ---
    addInventory() {
        const item = prompt('Item name:');
        if (!item || !item.trim()) return;

        const inventoryItem = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            name: item.trim(),
            quantity: 1,
            added: new Date().toISOString()
        };

        this.state.inventory.push(inventoryItem);
        this.saveState();
        this.render();
    },

    removeInventory(id) {
        this.state.inventory = this.state.inventory.filter(i => i.id !== id);
        this.saveState();
        this.render();
    },

    // --- Economy Loop ---
    startLoop() {
        // Clear any existing interval
        if (this.loopInterval) clearInterval(this.loopInterval);

        this.loopInterval = setInterval(() => {
            this.state.money += this.state.animals.length * this.state.incomeRate;
            this.saveState();
            this.render();
        }, 8000);
    },

    stopLoop() {
        if (this.loopInterval) {
            clearInterval(this.loopInterval);
            this.loopInterval = null;
        }
    },

    // --- AI ---
    aiAnalyze() {
        const analysis = this.state.animals.length > 0
            ? `You have ${this.state.animals.length} animals generating $${this.state.animals.length * this.state.incomeRate} every 8 seconds.`
            : 'Add animals to your ranch to start generating income.';
        alert(analysis);
    },

    // --- GPS Delegation ---
    addFence() {
        this.core.getModule('gps')?.addFence?.();
    },

    addWater() {
        this.core.getModule('gps')?.addWaterSource?.();
    },

    addGate() {
        this.core.getModule('gps')?.addGate?.();
    },

    // --- Data Persistence ---
    saveState() {
        try {
            const data = JSON.stringify(this.state);
            localStorage.setItem('ranch_state', data);
            this.state.lastSaved = new Date().toISOString();
        } catch (err) {
            console.error('[APP] Failed to save state:', err);
            // Handle quota exceeded
            if (err.name === 'QuotaExceededError') {
                alert('Storage full! Export and clear data to continue.');
            }
        }
    },

    loadState() {
        try {
            const saved = localStorage.getItem('ranch_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Merge with defaults to handle schema changes
                this.state = { ...this.state, ...parsed };
            }
        } catch (err) {
            console.error('[APP] Failed to load state:', err);
        }
    },

    exportData() {
        this.core.getModule('storage')?.exportData?.();
    },

    importData() {
        this.core.getModule('storage')?.importData?.();
    },

    clearData() {
        if (!confirm('WARNING: This will delete ALL ranch data. Are you sure?')) return;
        localStorage.removeItem('ranch_state');
        this.state = {
            money: 1000,
            animals: [],
            tasks: [],
            inventory: [],
            incomeRate: 5,
            lastSaved: null
        };
        this.render();
        alert('All data cleared.');
    },

    // --- Rendering ---
    render() {
        // Dashboard
        const dashboardBox = document.getElementById('dashboardBox');
        if (dashboardBox) {
            dashboardBox.textContent = `Money: $${this.state.money.toLocaleString()}`;
        }

        const animalCount = document.getElementById('animalCount');
        if (animalCount) animalCount.textContent = this.state.animals.length;

        const taskCount = document.getElementById('taskCount');
        if (taskCount) taskCount.textContent = this.state.tasks.length;

        const incomeRate = document.getElementById('incomeRate');
        if (incomeRate) incomeRate.textContent = `$${this.state.animals.length * this.state.incomeRate}`;

        // Animals list
        const animalsBox = document.getElementById('animalsBox');
        if (animalsBox) {
            if (this.state.animals.length === 0) {
                animalsBox.innerHTML = '<p class="empty-state">No animals registered yet.</p>';
            } else {
                animalsBox.innerHTML = this.state.animals.map(a => `
                    <div class="list-item">
                        <div>
                            <div class="list-item-name">${this.escapeHtml(a.name)}</div>
                            <div class="list-item-meta">Added ${new Date(a.added).toLocaleDateString()}</div>
                        </div>
                        <div class="list-item-actions">
                            <button class="btn-small" data-action="remove-animal" data-id="${a.id}">🗑️</button>
                        </div>
                    </div>
                `).join('');

                // Bind delete buttons
                animalsBox.querySelectorAll('[data-action="remove-animal"]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.removeAnimal(btn.dataset.id);
                    });
                });
            }
        }

        // Tasks list
        const tasksBox = document.getElementById('tasksBox');
        if (tasksBox) {
            if (this.state.tasks.length === 0) {
                tasksBox.innerHTML = '<p class="empty-state">No tasks pending.</p>';
            } else {
                tasksBox.innerHTML = this.state.tasks.map(t => `
                    <div class="list-item" style="${t.completed ? 'opacity:0.6;text-decoration:line-through;' : ''}">
                        <div>
                            <div class="list-item-name">${this.escapeHtml(t.title)}</div>
                            <div class="list-item-meta">${t.completed ? 'Done' : 'Pending'}</div>
                        </div>
                        <div class="list-item-actions">
                            <button class="btn-small" style="background:${t.completed ? '#2a6b3f' : '#333'};" data-action="toggle-task" data-id="${t.id}">✓</button>
                            <button class="btn-small" data-action="remove-task" data-id="${t.id}">🗑️</button>
                        </div>
                    </div>
                `).join('');

                tasksBox.querySelectorAll('[data-action="toggle-task"]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleTask(btn.dataset.id);
                    });
                });

                tasksBox.querySelectorAll('[data-action="remove-task"]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.removeTask(btn.dataset.id);
                    });
                });
            }
        }

        // Inventory list
        const inventoryBox = document.getElementById('inventoryBox');
        if (inventoryBox) {
            if (this.state.inventory.length === 0) {
                inventoryBox.innerHTML = '<p class="empty-state">Inventory is empty.</p>';
            } else {
                inventoryBox.innerHTML = this.state.inventory.map(i => `
                    <div class="list-item">
                        <div>
                            <div class="list-item-name">${this.escapeHtml(i.name)}</div>
                            <div class="list-item-meta">Qty: ${i.quantity}</div>
                        </div>
                        <div class="list-item-actions">
                            <button class="btn-small" data-action="remove-inventory" data-id="${i.id}">🗑️</button>
                        </div>
                    </div>
                `).join('');

                inventoryBox.querySelectorAll('[data-action="remove-inventory"]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.removeInventory(btn.dataset.id);
                    });
                });
            }
        }

        // Economy
        const economyBox = document.getElementById('economyBox');
        if (economyBox) {
            economyBox.textContent = `Income: $${this.state.animals.length * this.state.incomeRate} / 8s`;
        }

        // Subscription status
        const subStatus = document.getElementById('subStatus');
        if (subStatus) {
            const sub = localStorage.getItem('subscription') || 'Free';
            subStatus.textContent = sub;
        }
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
