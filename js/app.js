window.RanchApp = {
    core: null,
    state: {
        money: 10000, revenue: 0, expenses: 0,
        animals: [], tasks: [], inventory: [],
        transactions: [], healthRecords: [], breedingRecords: [],
        incomeRate: 50, lastSaved: null, animalLimit: 25
    },
    loopInterval: null,
    initialized: false,
    sampleAnimals: [
        { id: 'A001', name: 'Bessie', type: 'cattle', breed: 'Angus', sex: 'Female', age: 4, weight: 1200, health: 'healthy', location: 'North Pasture', added: '2026-01-15', lastWeighed: '2026-05-20' },
        { id: 'A002', name: 'Duke', type: 'cattle', breed: 'Hereford', sex: 'Male', age: 3, weight: 1800, health: 'healthy', location: 'South Creek', added: '2026-02-10', lastWeighed: '2026-05-18' },
        { id: 'A003', name: 'Rosie', type: 'cattle', breed: 'Angus', sex: 'Female', age: 2, weight: 950, health: 'pregnant', location: 'Barn A', added: '2026-03-05', lastWeighed: '2026-05-22' },
        { id: 'A004', name: 'Thunder', type: 'cattle', breed: 'Brahman', sex: 'Male', age: 5, weight: 2100, health: 'healthy', location: 'North Pasture', added: '2025-11-20', lastWeighed: '2026-05-15' },
        { id: 'A005', name: 'Daisy', type: 'cattle', breed: 'Jersey', sex: 'Female', age: 3, weight: 1100, health: 'healthy', location: 'South Creek', added: '2026-01-28', lastWeighed: '2026-05-21' },
        { id: 'A006', name: 'Wooly', type: 'sheep', breed: 'Merino', sex: 'Female', age: 2, weight: 150, health: 'healthy', location: 'East Hill', added: '2026-04-01', lastWeighed: '2026-05-19' }
    ],
    sampleTasks: [
        { id: 'T001', title: 'Check water troughs in North Pasture', priority: 'high', completed: false, due: '2026-06-06', category: 'maintenance' },
        { id: 'T002', title: 'Vaccinate new calves', priority: 'high', completed: false, due: '2026-06-07', category: 'health' },
        { id: 'T003', title: 'Repair fence line by creek', priority: 'medium', completed: false, due: '2026-06-08', category: 'maintenance' },
        { id: 'T004', title: 'Order feed supplement', priority: 'low', completed: true, due: '2026-06-05', category: 'inventory' },
        { id: 'T005', title: 'Weigh heifers for market', priority: 'medium', completed: false, due: '2026-06-09', category: 'operations' }
    ],
    sampleInventory: [
        { id: 'I001', name: 'Alfalfa Hay', category: 'feed', quantity: 450, unit: 'bales', minLevel: 100, lastRestocked: '2026-05-15' },
        { id: 'I002', name: 'Cattle Mineral', category: 'feed', quantity: 12, unit: 'bags', minLevel: 5, lastRestocked: '2026-05-20' },
        { id: 'I003', name: 'IVOMEC Pour-On', category: 'medicine', quantity: 3, unit: 'bottles', minLevel: 2, lastRestocked: '2026-04-10' },
        { id: 'I004', name: 'Ear Tags #1045-1100', category: 'supplies', quantity: 56, unit: 'tags', minLevel: 20, lastRestocked: '2026-03-01' },
        { id: 'I005', name: 'Fence Wire 12.5ga', category: 'equipment', quantity: 8, unit: 'rolls', minLevel: 3, lastRestocked: '2026-02-15' }
    ],
    sampleTransactions: [
        { id: 'TR001', title: 'Sold 3 steers @ auction', amount: 4850, type: 'income', date: '2026-05-28', category: 'sales' },
        { id: 'TR002', title: 'Feed delivery - alfalfa', amount: -1200, type: 'expense', date: '2026-05-25', category: 'feed' },
        { id: 'TR003', title: 'Vet services - pregnancy check', amount: -350, type: 'expense', date: '2026-05-22', category: 'health' },
        { id: 'TR004', title: 'Sold 2 heifers private treaty', amount: 3200, type: 'income', date: '2026-05-18', category: 'sales' },
        { id: 'TR005', title: 'Fuel - diesel delivery', amount: -890, type: 'expense', date: '2026-05-15', category: 'fuel' }
    ],
    init(core) {
        if (this.initialized) return;
        this.core = core;
        this.loadState();
        this.bindEvents();
        this.startLoop();
        this.initialized = true;
        this.core.log('App module initialized');
    },
    bindEvents() {
        document.body.addEventListener('click', (e) => {
            const action = e.target.dataset.action || e.target.closest('[data-action]')?.dataset.action;
            if (!action) return;
            switch (action) {
                case 'add-animal':
                case 'quick-add-animal': this.addAnimal(); break;
                case 'add-task':
                case 'quick-add-task': this.addTask(); break;
                case 'add-inventory': this.addInventory(); break;
                case 'add-transaction': this.addTransaction(); break;
                case 'add-health-record': this.addHealthRecord(); break;
                case 'quick-scan': this.scanRFID(); break;
                case 'quick-weigh': this.quickWeigh(); break;
                case 'filter-animals': this.showFilterModal(); break;
                case 'view-all-tasks': this.core.getModule('ui')?.switchView('tasks'); break;
                case 'export-data': this.exportData(); break;
                case 'import-data': this.importData(); break;
                case 'clear-data': this.clearData(); break;
                case 'logout': this.core.clearAuthState(); break;
                case 'show-pricing':
                case 'upgrade-grower':
                case 'upgrade-rancher':
                case 'upgrade-enterprise':
                case 'subscribe-grower':
                case 'subscribe-rancher':
                case 'subscribe-enterprise': this.handleUpgrade(action); break;
                case 'close-modal': this.core.getModule('ui')?.closeModal(); break;
                case 'list-animal': this.listAnimalForSale(); break;
                case 'view-auctions': this.viewAuctions(); break;
                case 'learn-more': this.core.showToast('Feature details coming soon', 'info'); break;
                case 'ai-analyze': this.aiAnalyze(); break;
                default:
                    if (action.startsWith('remove-')) {
                        const id = e.target.closest('[data-id]')?.dataset.id;
                        if (id) this.handleRemove(action, id);
                    }
                    if (action.startsWith('toggle-')) {
                        const id = e.target.closest('[data-id]')?.dataset.id;
                        if (id) this.handleToggle(action, id);
                    }
            }
        });
        document.getElementById('animalSearch')?.addEventListener('input', (e) => {
            this.renderAnimals(e.target.value);
        });
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.renderAnimals(null, chip.dataset.filter);
            });
        });
        document.querySelectorAll('.inv-cat').forEach(cat => {
            cat.addEventListener('click', () => {
                document.querySelectorAll('.inv-cat').forEach(c => c.classList.remove('active'));
                cat.classList.add('active');
                this.renderInventory(cat.dataset.cat);
            });
        });
        document.querySelectorAll('.health-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.health-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.renderHealth(tab.dataset.tab);
            });
        });
    },
    addAnimal() {
        const tier = this.core.state.tier;
        const limit = this.getTierLimit('animals');
        if (this.state.animals.length >= limit) {
            this.core.showToast(`Free plan limited to ${limit} animals. Upgrade to add more.`, 'warning');
            this.core.getModule('ui')?.switchView('upgrade');
            return;
        }
        const name = prompt('Animal name or ID:');
        if (!name?.trim()) return;
        const animal = {
            id: 'A' + Date.now().toString(36).toUpperCase(),
            name: name.trim(),
            type: 'cattle', breed: 'Unknown', sex: 'Unknown', age: 0,
            weight: 0, health: 'healthy', location: 'Unassigned',
            added: new Date().toISOString().split('T')[0], lastWeighed: '-'
        };
        this.state.animals.push(animal);
        this.saveState();
        this.render();
        this.core.showToast(`${animal.name} added successfully`, 'success');
    },
    removeAnimal(id) {
        if (!confirm('Remove this animal from records?')) return;
        this.state.animals = this.state.animals.filter(a => a.id !== id);
        this.saveState();
        this.render();
    },
    addTask() {
        const title = prompt('Task description:');
        if (!title?.trim()) return;
        const task = {
            id: 'T' + Date.now().toString(36).toUpperCase(),
            title: title.trim(), priority: 'medium', completed: false,
            due: new Date().toISOString().split('T')[0], category: 'general'
        };
        this.state.tasks.push(task);
        this.saveState();
        this.render();
        this.core.showToast('Task added', 'success');
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
    addInventory() {
        const name = prompt('Item name:');
        if (!name?.trim()) return;
        const item = {
            id: 'I' + Date.now().toString(36).toUpperCase(),
            name: name.trim(), category: 'supplies', quantity: 1,
            unit: 'units', minLevel: 0,
            lastRestocked: new Date().toISOString().split('T')[0]
        };
        this.state.inventory.push(item);
        this.saveState();
        this.render();
    },
    removeInventory(id) {
        this.state.inventory = this.state.inventory.filter(i => i.id !== id);
        this.saveState();
        this.render();
    },
    addTransaction() {
        const title = prompt('Transaction description:');
        if (!title?.trim()) return;
        const amountStr = prompt('Amount (negative for expense):');
        const amount = parseFloat(amountStr);
        if (isNaN(amount)) return;
        const tx = {
            id: 'TR' + Date.now().toString(36).toUpperCase(),
            title: title.trim(), amount: amount,
            type: amount > 0 ? 'income' : 'expense',
            date: new Date().toISOString().split('T')[0], category: 'general'
        };
        this.state.transactions.push(tx);
        if (amount > 0) this.state.revenue += amount;
        else this.state.expenses += Math.abs(amount);
        this.saveState();
        this.render();
        this.core.showToast('Transaction recorded', 'success');
    },
    addHealthRecord() {
        const animalId = prompt('Animal ID:');
        if (!animalId) return;
        const note = prompt('Health note / treatment:');
        if (!note) return;
        this.state.healthRecords.push({
            id: 'H' + Date.now().toString(36).toUpperCase(),
            animalId, note,
            date: new Date().toISOString().split('T')[0], vet: 'Self'
        });
        this.saveState();
        this.core.showToast('Health record added', 'success');
    },
    scanRFID() {
        this.core.showToast('RFID scanner ready. Tap NFC tag or scan barcode.', 'info');
    },
    quickWeigh() {
        const id = prompt('Animal ID or Tag:');
        if (!id) return;
        const weight = prompt('Weight (lbs):');
        if (!weight) return;
        const animal = this.state.animals.find(a => a.id === id || a.name === id);
        if (animal) {
            animal.weight = parseInt(weight);
            animal.lastWeighed = new Date().toISOString().split('T')[0];
            this.saveState();
            this.render();
            this.core.showToast(`${animal.name} weighed: ${weight} lbs`, 'success');
        } else {
            this.core.showToast('Animal not found', 'error');
        }
    },
    aiAnalyze() {
        const analysis = `📊 Ranch Analysis:
• ${this.state.animals.length} animals generating ~$${this.state.animals.length * this.state.incomeRate}/day
• ${this.state.tasks.filter(t => !t.completed).length} pending tasks
• Pasture health: Good (NDVI 0.72)
• Recommendation: Rotate North Pasture cattle to South Creek within 3 days`;
        alert(analysis);
    },
    listAnimalForSale() {
        this.core.showToast('Market listing feature coming in next update', 'info');
    },
    viewAuctions() {
        this.core.showToast('Local auction data loading...', 'info');
    },
    handleUpgrade(action) {
        const ui = this.core.getModule('ui');
        if (action === 'show-pricing') {
            ui?.switchView('upgrade');
            return;
        }
        const tierMap = {
            'upgrade-grower': 'GROWER', 'subscribe-grower': 'GROWER',
            'upgrade-rancher': 'RANCHER', 'subscribe-rancher': 'RANCHER',
            'upgrade-enterprise': 'ENTERPRISE', 'subscribe-enterprise': 'ENTERPRISE'
        };
        const tier = tierMap[action];
        if (tier) {
            this.core.state.tier = tier;
            this.core.state.user = { ...this.core.state.user, tier };
            this.core.saveAuthState(this.core.state.user);
            this.core.showToast(`Upgraded to ${tier}!`, 'success');
            ui?.switchView('dashboard');
            this.updateTierUI();
        }
    },
    getTierLimit(feature) {
        const limits = {
            FREE: { animals: 25, team: 1, pastures: 2 },
            GROWER: { animals: Infinity, team: 1, pastures: 10 },
            RANCHER: { animals: Infinity, team: 3, pastures: Infinity },
            ENTERPRISE: { animals: Infinity, team: Infinity, pastures: Infinity }
        };
        return limits[this.core.state.tier]?.[feature] || limits.FREE[feature];
    },
    updateTierUI() {
        const badge = document.getElementById('tierBadge');
        if (badge) badge.textContent = this.core.state.tier;
        const settingsTier = document.getElementById('settingsTier');
        if (settingsTier) settingsTier.textContent = this.core.state.tier + ' Plan';
        const limit = this.getTierLimit('animals');
        const count = this.state.animals.length;
        const pct = limit === Infinity ? 5 : (count / limit * 100);
        const fill = document.querySelector('.storage-fill');
        const label = document.querySelector('.storage-label');
        if (fill) fill.style.width = Math.min(pct, 100) + '%';
        if (label) label.textContent = `${this.core.state.tier} Plan — ${count}/${limit === Infinity ? '∞' : limit} animals`;
        const upgradeBtn = document.querySelector('.btn-upgrade-sidebar');
        if (upgradeBtn) {
            if (this.core.state.tier === 'ENTERPRISE') {
                upgradeBtn.style.display = 'none';
            } else {
                const nextTier = this.core.state.tier === 'FREE' ? 'Grower' : this.core.state.tier === 'GROWER' ? 'Rancher' : 'Enterprise';
                const nextPrice = this.core.state.tier === 'FREE' ? '$9.99' : this.core.state.tier === 'GROWER' ? '$19.99' : '$39.99';
                upgradeBtn.textContent = `Upgrade to ${nextTier} — ${nextPrice}/mo`;
            }
        }
    },
    saveState() {
        try {
            const data = JSON.stringify(this.state);
            localStorage.setItem('ranch_app_state', data);
            this.state.lastSaved = new Date().toISOString();
        } catch (err) {
            console.error('[APP] Save failed:', err);
            if (err.name === 'QuotaExceededError') {
                this.core.showToast('Storage full! Export data to continue.', 'error');
            }
        }
    },
    loadState() {
        try {
            const saved = localStorage.getItem('ranch_app_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            } else {
                this.state.animals = [...this.sampleAnimals];
                this.state.tasks = [...this.sampleTasks];
                this.state.inventory = [...this.sampleInventory];
                this.state.transactions = [...this.sampleTransactions];
                this.state.revenue = 8050;
                this.state.expenses = 2440;
                this.saveState();
            }
        } catch (err) {
            console.error('[APP] Load failed:', err);
            this.state.animals = [...this.sampleAnimals];
            this.state.tasks = [...this.sampleTasks];
        }
    },
    exportData() {
        this.core.getModule('storage')?.exportData?.();
    },
    importData() {
        this.core.getModule('storage')?.importData?.();
    },
    clearData() {
        if (!confirm('⚠️ WARNING: This will permanently delete ALL ranch data. This cannot be undone. Are you sure?')) return;
        if (!confirm('FINAL CONFIRMATION: Type YES to delete everything')) return;
        localStorage.removeItem('ranch_app_state');
        this.state = {
            money: 10000, revenue: 0, expenses: 0,
            animals: [], tasks: [], inventory: [],
            transactions: [], healthRecords: [], breedingRecords: [],
            incomeRate: 50, lastSaved: null, animalLimit: 25
        };
        this.render();
        this.core.showToast('All data cleared', 'warning');
    },
    startLoop() {
        if (this.loopInterval) clearInterval(this.loopInterval);
        this.loopInterval = setInterval(() => {
            this.state.money += this.state.animals.length * this.state.incomeRate;
            this.saveState();
            this.renderDashboard();
        }, 30000);
    },
    stopLoop() {
        if (this.loopInterval) {
            clearInterval(this.loopInterval);
            this.loopInterval = null;
        }
    },
    render() {
        this.renderDashboard();
        this.renderAnimals();
        this.renderTasks();
        this.renderInventory();
        this.renderFinance();
        this.renderHealth('health-records');
        this.updateTierUI();
    },
    renderDashboard() {
        const dashAnimalCount = document.getElementById('dashAnimalCount');
        if (dashAnimalCount) dashAnimalCount.textContent = this.state.animals.length;
        const dashRevenue = document.getElementById('dashRevenue');
        if (dashRevenue) dashRevenue.textContent = '$' + this.state.revenue.toLocaleString();
        const animalCount = document.getElementById('animalCount');
        if (animalCount) animalCount.textContent = this.state.animals.length;
        const taskCount = document.getElementById('taskCount');
        if (taskCount) taskCount.textContent = this.state.tasks.filter(t => !t.completed).length;
        const incomeRate = document.getElementById('incomeRate');
        if (incomeRate) incomeRate.textContent = '$' + (this.state.animals.length * this.state.incomeRate);
        const dashAlerts = document.getElementById('dashAlerts');
        if (dashAlerts) {
            const alerts = this.state.inventory.filter(i => i.quantity <= i.minLevel).length;
            dashAlerts.textContent = alerts;
        }
        const navAnimalCount = document.getElementById('navAnimalCount');
        if (navAnimalCount) navAnimalCount.textContent = this.state.animals.length;
        const navTaskCount = document.getElementById('navTaskCount');
        if (navTaskCount) navTaskCount.textContent = this.state.tasks.filter(t => !t.completed).length;
        const dashTaskList = document.getElementById('dashTaskList');
        if (dashTaskList) {
            const pending = this.state.tasks.filter(t => !t.completed).slice(0, 3);
            if (pending.length === 0) {
                dashTaskList.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><p>No tasks scheduled for today</p><button class="btn-primary btn-sm" data-action="add-task">Add Task</button></div>`;
            } else {
                dashTaskList.innerHTML = pending.map(t => `
                    <div class="task-item ${t.completed ? 'completed' : ''}" data-id="${t.id}">
                        <div class="task-checkbox" data-action="toggle-task" data-id="${t.id}"></div>
                        <div class="task-content">
                            <div class="task-title">${this.escapeHtml(t.title)}</div>
                            <div class="task-meta">Due ${t.due}</div>
                        </div>
                        <span class="task-priority ${t.priority}">${t.priority}</span>
                    </div>
                `).join('');
            }
        }
    },
    renderAnimals(search = '', filter = 'all') {
        const grid = document.getElementById('animalGrid');
        if (!grid) return;
        let animals = this.state.animals;
        if (search) {
            animals = animals.filter(a =>
                a.name.toLowerCase().includes(search.toLowerCase()) ||
                a.id.toLowerCase().includes(search.toLowerCase()) ||
                a.breed.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (filter !== 'all') {
            animals = animals.filter(a => a.type === filter);
        }
        if (animals.length === 0) {
            grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-icon">🐄</div><p>No animals found</p><button class="btn-primary btn-sm" data-action="add-animal">Add First Animal</button></div>`;
            return;
        }
        grid.innerHTML = animals.map(a => {
            const healthClass = a.health === 'healthy' ? 'healthy' : a.health === 'pregnant' ? 'warning' : 'danger';
            const icon = a.type === 'cattle' ? '🐄' : a.type === 'sheep' ? '🐑' : a.type === 'pig' ? '🐖' : '🐴';
            return `
                <div class="animal-card ${healthClass}" data-id="${a.id}">
                    <div class="animal-card-icon">${icon}</div>
                    <div class="animal-card-id">${a.id}</div>
                    <div class="animal-card-name">${this.escapeHtml(a.name)}</div>
                    <div class="animal-card-meta">${a.breed} • ${a.sex} • ${a.age}y</div>
                    <div class="animal-card-stats">
                        <div class="animal-stat"><div class="animal-stat-value">${a.weight}</div><div class="animal-stat-label">lbs</div></div>
                        <div class="animal-stat"><div class="animal-stat-value">${a.health}</div><div class="animal-stat-label">status</div></div>
                    </div>
                </div>
            `;
        }).join('');
    },
    renderTasks() {
        const list = document.getElementById('taskList');
        if (!list) return;
        const tasks = this.state.tasks;
        if (tasks.length === 0) {
            list.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><p>No tasks yet</p><button class="btn-primary btn-sm" data-action="add-task">Add Task</button></div>`;
            return;
        }
        list.innerHTML = tasks.map(t => `
            <div class="task-item ${t.completed ? 'completed' : ''}" data-id="${t.id}">
                <div class="task-checkbox" data-action="toggle-task" data-id="${t.id}"></div>
                <div class="task-content">
                    <div class="task-title">${this.escapeHtml(t.title)}</div>
                    <div class="task-meta">Due ${t.due} • ${t.category}</div>
                </div>
                <span class="task-priority ${t.priority}">${t.priority}</span>
                <button class="btn-icon" style="width:32px;height:32px;" data-action="remove-task" data-id="${t.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        `).join('');
    },
    renderInventory(category = 'feed') {
        const list = document.getElementById('inventoryList');
        if (!list) return;
        const items = this.state.inventory.filter(i => i.category === category);
        if (items.length === 0) {
            list.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><p>No ${category} items</p><button class="btn-primary btn-sm" data-action="add-inventory">Add Item</button></div>`;
            return;
        }
        list.innerHTML = items.map(i => {
            const low = i.quantity <= i.minLevel;
            return `
                <div class="transaction-item">
                    <div class="transaction-icon">${this.getCategoryIcon(i.category)}</div>
                    <div class="transaction-details">
                        <div class="transaction-title">${this.escapeHtml(i.name)}</div>
                        <div class="transaction-date">Last restocked: ${i.lastRestocked}</div>
                    </div>
                    <div style="text-align:right;">
                        <div class="transaction-title" style="color:${low ? 'var(--danger)' : 'var(--success)'};">${i.quantity} ${i.unit}</div>
                        <div class="transaction-date">${low ? '⚠️ Low stock' : 'OK'}</div>
                    </div>
                </div>
            `;
        }).join('');
    },
    renderFinance() {
        const finIncome = document.getElementById('finIncome');
        if (finIncome) finIncome.textContent = '$' + this.state.revenue.toLocaleString();
        const finExpense = document.getElementById('finExpense');
        if (finExpense) finExpense.textContent = '$' + this.state.expenses.toLocaleString();
        const finProfit = document.getElementById('finProfit');
        if (finProfit) finProfit.textContent = '$' + (this.state.revenue - this.state.expenses).toLocaleString();
        const list = document.getElementById('transactionList');
        if (!list) return;
        const txs = this.state.transactions.slice(0, 10);
        if (txs.length === 0) {
            list.innerHTML = `<div class="empty-state"><div class="empty-icon">💰</div><p>No transactions yet</p></div>`;
            return;
        }
        list.innerHTML = txs.map(t => `
            <div class="transaction-item">
                <div class="transaction-icon">${t.amount > 0 ? '💵' : '💸'}</div>
                <div class="transaction-details">
                    <div class="transaction-title">${this.escapeHtml(t.title)}</div>
                    <div class="transaction-date">${t.date} • ${t.category}</div>
                </div>
                <div class="transaction-amount ${t.type}">${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toLocaleString()}</div>
            </div>
        `).join('');
    },
    renderHealth(tab) {
        const content = document.getElementById('healthContent');
        if (!content) return;
        if (tab === 'health-records') {
            if (this.state.healthRecords.length === 0) {
                content.innerHTML = `<div class="empty-state"><div class="empty-icon">🏥</div><p>No health records yet</p><button class="btn-primary btn-sm" data-action="add-health-record">Add Record</button></div>`;
            } else {
                content.innerHTML = this.state.healthRecords.map(r => `
                    <div class="transaction-item">
                        <div class="transaction-icon">🏥</div>
                        <div class="transaction-details">
                            <div class="transaction-title">${this.escapeHtml(r.note)}</div>
                            <div class="transaction-date">${r.date} • Animal: ${r.animalId}</div>
                        </div>
                    </div>
                `).join('');
            }
        } else if (tab === 'breeding') {
            content.innerHTML = `<div class="empty-state"><div class="empty-icon">🍼</div><p>Breeding records will appear here</p><button class="btn-primary btn-sm" data-action="add-breeding-record">Add Breeding Record</button></div>`;
        } else if (tab === 'vaccinations') {
            content.innerHTML = `<div class="empty-state"><div class="empty-icon">💉</div><p>Vaccination schedule will appear here</p><button class="btn-primary btn-sm" data-action="add-vaccination">Add Vaccination</button></div>`;
        }
    },
    getCategoryIcon(cat) {
        const icons = { feed: '🌾', medicine: '💊', equipment: '🔧', supplies: '📦' };
        return icons[cat] || '📦';
    },
    handleRemove(action, id) {
        if (action === 'remove-animal') this.removeAnimal(id);
        else if (action === 'remove-task') this.removeTask(id);
        else if (action === 'remove-inventory') this.removeInventory(id);
    },
    handleToggle(action, id) {
        if (action === 'toggle-task') this.toggleTask(id);
    },
    showFilterModal() {
        this.core.getModule('ui')?.openModal('Filter Animals', `
            <div style="display:flex;flex-direction:column;gap:12px;">
                <label style="color:var(--text-secondary);font-size:0.85rem;">Breed</label>
                <select style="padding:12px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);color:var(--text-primary);">
                    <option>All Breeds</option><option>Angus</option><option>Hereford</option><option>Brahman</option><option>Jersey</option>
                </select>
                <label style="color:var(--text-secondary);font-size:0.85rem;">Health Status</label>
                <select style="padding:12px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);color:var(--text-primary);">
                    <option>All</option><option>Healthy</option><option>Sick</option><option>Pregnant</option>
                </select>
                <button class="btn-primary btn-full" style="margin-top:8px;" data-action="close-modal">Apply Filters</button>
            </div>
        `);
    },
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};
