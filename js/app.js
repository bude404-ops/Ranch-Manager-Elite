window.RanchApp = {
    core: null,
    state: {
        money: 10000, revenue: 0, expenses: 0,
        animals: [], tasks: [], inventory: [],
        transactions: [], healthRecords: [], breedingRecords: [],
        pastures: [],
        incomeRate: 50, lastSaved: null, animalLimit: 25
    },
    loopInterval: null,
    initialized: false,

    sampleAnimals: [
        // Cattle
        { id: 'A001', name: 'Bessie',    type: 'cattle',  breed: 'Angus',       sex: 'Female', age: 4, weight: 1200, health: 'healthy',  location: 'North Pasture', added: '2026-01-15', lastWeighed: '2026-05-20', notes: '' },
        { id: 'A002', name: 'Duke',      type: 'cattle',  breed: 'Hereford',    sex: 'Male',   age: 3, weight: 1800, health: 'healthy',  location: 'South Creek',   added: '2026-02-10', lastWeighed: '2026-05-18', notes: '' },
        { id: 'A003', name: 'Rosie',     type: 'cattle',  breed: 'Angus',       sex: 'Female', age: 2, weight: 950,  health: 'pregnant', location: 'Barn A',        added: '2026-03-05', lastWeighed: '2026-05-22', notes: 'Due July 2026' },
        { id: 'A004', name: 'Thunder',   type: 'cattle',  breed: 'Brahman',     sex: 'Male',   age: 5, weight: 2100, health: 'healthy',  location: 'North Pasture', added: '2025-11-20', lastWeighed: '2026-05-15', notes: 'Breeding bull' },
        { id: 'A005', name: 'Daisy',     type: 'cattle',  breed: 'Jersey',      sex: 'Female', age: 3, weight: 1100, health: 'healthy',  location: 'South Creek',   added: '2026-01-28', lastWeighed: '2026-05-21', notes: 'Dairy' },
        { id: 'A006', name: 'Maverick',  type: 'cattle',  breed: 'Longhorn',    sex: 'Male',   age: 6, weight: 1950, health: 'healthy',  location: 'East Hill',     added: '2025-08-10', lastWeighed: '2026-05-10', notes: '' },
        { id: 'A007', name: 'Clover',    type: 'cattle',  breed: 'Simmental',   sex: 'Female', age: 2, weight: 1050, health: 'healthy',  location: 'North Pasture', added: '2026-04-02', lastWeighed: '2026-05-19', notes: '' },
        { id: 'A008', name: 'Biscuit',   type: 'cattle',  breed: 'Charolais',   sex: 'Female', age: 3, weight: 1300, health: 'sick',     location: 'Barn A',        added: '2026-02-20', lastWeighed: '2026-06-01', notes: 'Respiratory — on antibiotics' },
        { id: 'A009', name: 'Ranger',    type: 'cattle',  breed: 'Brangus',     sex: 'Male',   age: 4, weight: 1750, health: 'healthy',  location: 'South Creek',   added: '2025-10-05', lastWeighed: '2026-05-17', notes: '' },
        { id: 'A010', name: 'Pearl',     type: 'cattle',  breed: 'Limousin',    sex: 'Female', age: 1, weight: 680,  health: 'healthy',  location: 'East Hill',     added: '2026-05-01', lastWeighed: '2026-05-30', notes: 'Born on ranch' },
        // Sheep
        { id: 'A011', name: 'Wooly',     type: 'sheep',   breed: 'Merino',      sex: 'Female', age: 2, weight: 150,  health: 'healthy',  location: 'East Hill',     added: '2026-04-01', lastWeighed: '2026-05-19', notes: '' },
        { id: 'A012', name: 'Baa-rbara', type: 'sheep',   breed: 'Suffolk',     sex: 'Female', age: 3, weight: 175,  health: 'healthy',  location: 'East Hill',     added: '2026-03-15', lastWeighed: '2026-05-18', notes: '' },
        { id: 'A013', name: 'Rambo',     type: 'sheep',   breed: 'Dorper',      sex: 'Male',   age: 4, weight: 220,  health: 'healthy',  location: 'East Hill',     added: '2025-12-01', lastWeighed: '2026-05-10', notes: 'Breeding ram' },
        { id: 'A014', name: 'Cotton',    type: 'sheep',   breed: 'Rambouillet', sex: 'Female', age: 1, weight: 110,  health: 'pregnant', location: 'Barn A',        added: '2026-05-10', lastWeighed: '2026-06-01', notes: 'First pregnancy' },
        // Pigs
        { id: 'A015', name: 'Hammy',     type: 'pig',     breed: 'Duroc',       sex: 'Male',   age: 1, weight: 280,  health: 'healthy',  location: 'Pig Pen',       added: '2026-03-20', lastWeighed: '2026-05-28', notes: '' },
        { id: 'A016', name: 'Petunia',   type: 'pig',     breed: 'Hampshire',   sex: 'Female', age: 2, weight: 320,  health: 'pregnant', location: 'Pig Pen',       added: '2026-01-10', lastWeighed: '2026-05-25', notes: 'Due in 3 weeks' },
        { id: 'A017', name: 'Truffle',   type: 'pig',     breed: 'Berkshire',   sex: 'Female', age: 1, weight: 260,  health: 'healthy',  location: 'Pig Pen',       added: '2026-04-05', lastWeighed: '2026-05-27', notes: '' },
        // Horses
        { id: 'A018', name: 'Apache',    type: 'horse',   breed: 'Quarter Horse', sex: 'Male', age: 7, weight: 1150, health: 'healthy',  location: 'Horse Paddock', added: '2024-06-01', lastWeighed: '2026-05-05', notes: 'Working horse' },
        { id: 'A019', name: 'Sierra',    type: 'horse',   breed: 'Paint',       sex: 'Female', age: 5, weight: 1080, health: 'healthy',  location: 'Horse Paddock', added: '2025-03-10', lastWeighed: '2026-05-05', notes: '' },
        // Goats
        { id: 'A020', name: 'Billy',     type: 'goat',    breed: 'Boer',        sex: 'Male',   age: 3, weight: 180,  health: 'healthy',  location: 'East Hill',     added: '2026-02-14', lastWeighed: '2026-05-20', notes: '' },
        { id: 'A021', name: 'Nanny',     type: 'goat',    breed: 'Nubian',      sex: 'Female', age: 2, weight: 140,  health: 'healthy',  location: 'East Hill',     added: '2026-02-14', lastWeighed: '2026-05-20', notes: 'Dairy goat' },
        { id: 'A022', name: 'Skip',      type: 'goat',    breed: 'Kiko',        sex: 'Male',   age: 1, weight: 95,   health: 'healthy',  location: 'East Hill',     added: '2026-05-01', lastWeighed: '2026-06-01', notes: 'Born on ranch' },
        // Chickens
        { id: 'A023', name: 'Flock A',   type: 'chicken', breed: 'Rhode Island Red', sex: 'Female', age: 1, weight: 6, health: 'healthy', location: 'Chicken Coop', added: '2026-03-01', lastWeighed: '2026-05-01', notes: '24 hens — laying 18 eggs/day' },
        { id: 'A024', name: 'Flock B',   type: 'chicken', breed: 'Leghorn',     sex: 'Female', age: 2, weight: 5,   health: 'healthy',  location: 'Chicken Coop', added: '2025-10-01', lastWeighed: '2026-04-01', notes: '12 hens — laying 10 eggs/day' },
    ],

    samplePastures: [
        {
            id: 'P001', name: 'North Pasture', acres: 45,
            condition: 'good', grassHeight: 8, lastRain: '2026-06-04', rainfallIn: 1.2,
            daysGrazed: 12, restDays: 0, maxRestDays: 21,
            animals: ['A001', 'A004', 'A007'],
            forageScore: 82, soilMoisture: 'adequate',
            notes: 'Rotate in 9 days', color: '#22c55e'
        },
        {
            id: 'P002', name: 'South Creek',   acres: 32,
            condition: 'good', grassHeight: 10, lastRain: '2026-06-04', rainfallIn: 1.2,
            daysGrazed: 6,  restDays: 0, maxRestDays: 21,
            animals: ['A002', 'A005', 'A009'],
            forageScore: 91, soilMoisture: 'adequate',
            notes: 'Excellent growth', color: '#16a34a'
        },
        {
            id: 'P003', name: 'East Hill',     acres: 28,
            condition: 'fair', grassHeight: 4, lastRain: '2026-05-29', rainfallIn: 0.4,
            daysGrazed: 19, restDays: 0, maxRestDays: 21,
            animals: ['A006', 'A010', 'A011', 'A012', 'A013', 'A020', 'A021', 'A022'],
            forageScore: 54, soilMoisture: 'dry',
            notes: '⚠️ Rotate soon — 2 days left', color: '#f59e0b'
        },
        {
            id: 'P004', name: 'West Flat',     acres: 38,
            condition: 'resting', grassHeight: 14, lastRain: '2026-06-04', rainfallIn: 1.2,
            daysGrazed: 0,  restDays: 14, maxRestDays: 21,
            animals: [],
            forageScore: 95, soilMoisture: 'good',
            notes: 'Ready in 7 days', color: '#3b82f6'
        },
        {
            id: 'P005', name: 'Barn A',        acres: 2,
            condition: 'good', grassHeight: 0, lastRain: '2026-06-04', rainfallIn: 1.2,
            daysGrazed: 0,  restDays: 0, maxRestDays: 0,
            animals: ['A003', 'A008', 'A014'],
            forageScore: 100, soilMoisture: 'n/a',
            notes: 'Sick/pregnant animals', color: '#94a3b8'
        },
    ],

    sampleTasks: [
        { id: 'T001', title: 'Check water troughs in North Pasture', priority: 'high',   completed: false, due: '2026-06-06', category: 'maintenance' },
        { id: 'T002', title: 'Vaccinate new calves',                  priority: 'high',   completed: false, due: '2026-06-07', category: 'health' },
        { id: 'T003', title: 'Repair fence line by creek',            priority: 'medium', completed: false, due: '2026-06-08', category: 'maintenance' },
        { id: 'T004', title: 'Order feed supplement',                  priority: 'low',    completed: true,  due: '2026-06-05', category: 'inventory' },
        { id: 'T005', title: 'Rotate East Hill cattle to West Flat',  priority: 'high',   completed: false, due: '2026-06-08', category: 'pasture' },
        { id: 'T006', title: 'Weigh heifers for market',              priority: 'medium', completed: false, due: '2026-06-09', category: 'operations' },
        { id: 'T007', title: 'Check Petunia — farrowing soon',       priority: 'high',   completed: false, due: '2026-06-10', category: 'health' },
    ],

    sampleInventory: [
        { id: 'I001', name: 'Alfalfa Hay',        category: 'feed',      quantity: 450, unit: 'bales',   minLevel: 100, lastRestocked: '2026-05-15' },
        { id: 'I002', name: 'Cattle Mineral',      category: 'feed',      quantity: 12,  unit: 'bags',    minLevel: 5,   lastRestocked: '2026-05-20' },
        { id: 'I003', name: 'Pig Grower Pellets',  category: 'feed',      quantity: 8,   unit: 'bags',    minLevel: 4,   lastRestocked: '2026-05-18' },
        { id: 'I004', name: 'IVOMEC Pour-On',      category: 'medicine',  quantity: 3,   unit: 'bottles', minLevel: 2,   lastRestocked: '2026-04-10' },
        { id: 'I005', name: 'Penicillin G',        category: 'medicine',  quantity: 2,   unit: 'bottles', minLevel: 2,   lastRestocked: '2026-05-22' },
        { id: 'I006', name: 'Ear Tags #1045-1100', category: 'supplies',  quantity: 56,  unit: 'tags',    minLevel: 20,  lastRestocked: '2026-03-01' },
        { id: 'I007', name: 'Fence Wire 12.5ga',   category: 'equipment', quantity: 8,   unit: 'rolls',   minLevel: 3,   lastRestocked: '2026-02-15' },
        { id: 'I008', name: 'Sheep Drench',        category: 'medicine',  quantity: 1,   unit: 'bottles', minLevel: 2,   lastRestocked: '2026-04-01' },
    ],

    sampleTransactions: [
        { id: 'TR001', title: 'Sold 3 steers @ auction',         amount:  4850,  type: 'income',  date: '2026-05-28', category: 'sales' },
        { id: 'TR002', title: 'Feed delivery - alfalfa',          amount: -1200,  type: 'expense', date: '2026-05-25', category: 'feed' },
        { id: 'TR003', title: 'Vet services - pregnancy check',   amount:  -350,  type: 'expense', date: '2026-05-22', category: 'health' },
        { id: 'TR004', title: 'Sold 2 heifers private treaty',   amount:  3200,  type: 'income',  date: '2026-05-18', category: 'sales' },
        { id: 'TR005', title: 'Fuel - diesel delivery',           amount:  -890,  type: 'expense', date: '2026-05-15', category: 'fuel' },
        { id: 'TR006', title: 'Egg sales — weekly',               amount:   180,  type: 'income',  date: '2026-06-01', category: 'sales' },
        { id: 'TR007', title: 'Pig feed pellets',                 amount:  -210,  type: 'expense', date: '2026-05-30', category: 'feed' },
    ],

    // ─── Init ────────────────────────────────────────────────────────────────

    init(core) {
        if (this.initialized) return;
        this.core = core;
        this.loadState();
        this.bindEvents();
        this.startLoop();
        this.initialized = true;
        this.core.log('App module initialized');
    },

    // ─── Events ──────────────────────────────────────────────────────────────

    bindEvents() {
        document.body.addEventListener('click', (e) => {
            const el = e.target.closest('[data-action]');
            const action = el?.dataset.action;
            if (!action) return;
            switch (action) {
                case 'add-animal':
                case 'quick-add-animal':   this.addAnimal(); break;
                case 'add-task':
                case 'quick-add-task':     this.addTask(); break;
                case 'add-inventory':      this.addInventory(); break;
                case 'add-transaction':    this.addTransaction(); break;
                case 'add-health-record':  this.addHealthRecord(); break;
                case 'quick-scan':         this.scanRFID(); break;
                case 'quick-weigh':        this.quickWeigh(); break;
                case 'filter-animals':     this.showFilterModal(); break;
                case 'view-all-tasks':     this.core.getModule('ui')?.switchView('tasks'); break;
                case 'export-data':        this.exportData(); break;
                case 'import-data':        this.importData(); break;
                case 'clear-data':         this.clearData(); break;
                case 'logout':             this.core.clearAuthState(); break;
                case 'show-pricing':
                case 'upgrade-grower':
                case 'upgrade-rancher':
                case 'upgrade-enterprise':
                case 'subscribe-grower':
                case 'subscribe-rancher':
                case 'subscribe-enterprise': this.handleUpgrade(action); break;
                case 'close-modal':        this.core.getModule('ui')?.closeModal(); break;
                case 'list-animal':        this.listAnimalForSale(); break;
                case 'view-auctions':      this.viewAuctions(); break;
                case 'learn-more':         this.core.showToast('Feature details coming soon', 'info'); break;
                case 'ai-analyze':         this.aiAnalyze(); break;
                case 'move-animals':       this.showMoveAnimalsModal(el.dataset.id); break;
                case 'log-rain':           this.showRainLogModal(el.dataset.id); break;
                case 'confirm-move':       this.confirmMoveAnimals(); break;
                case 'confirm-rain':       this.confirmRainLog(); break;
                default:
                    if (action.startsWith('remove-')) {
                        const id = el.closest('[data-id]')?.dataset.id || el.dataset.id;
                        if (id) this.handleRemove(action, id);
                    }
                    if (action.startsWith('toggle-')) {
                        const id = el.closest('[data-id]')?.dataset.id || el.dataset.id;
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

    // ─── Animal CRUD ─────────────────────────────────────────────────────────

    addAnimal() {
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
            name: name.trim(), type: 'cattle', breed: 'Unknown',
            sex: 'Unknown', age: 0, weight: 0, health: 'healthy',
            location: 'Unassigned', notes: '',
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
        // also remove from pastures
        this.state.pastures.forEach(p => { p.animals = p.animals.filter(aid => aid !== id); });
        this.saveState();
        this.render();
    },

    // ─── Tasks ───────────────────────────────────────────────────────────────

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
        if (task) { task.completed = !task.completed; this.saveState(); this.render(); }
    },

    removeTask(id) {
        this.state.tasks = this.state.tasks.filter(t => t.id !== id);
        this.saveState(); this.render();
    },

    // ─── Inventory ───────────────────────────────────────────────────────────

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
        this.saveState(); this.render();
    },

    removeInventory(id) {
        this.state.inventory = this.state.inventory.filter(i => i.id !== id);
        this.saveState(); this.render();
    },

    // ─── Finance ─────────────────────────────────────────────────────────────

    addTransaction() {
        const title = prompt('Transaction description:');
        if (!title?.trim()) return;
        const amountStr = prompt('Amount (negative for expense):');
        const amount = parseFloat(amountStr);
        if (isNaN(amount)) return;
        const tx = {
            id: 'TR' + Date.now().toString(36).toUpperCase(),
            title: title.trim(), amount,
            type: amount > 0 ? 'income' : 'expense',
            date: new Date().toISOString().split('T')[0], category: 'general'
        };
        this.state.transactions.push(tx);
        if (amount > 0) this.state.revenue += amount;
        else this.state.expenses += Math.abs(amount);
        this.saveState(); this.render();
        this.core.showToast('Transaction recorded', 'success');
    },

    // ─── Health ──────────────────────────────────────────────────────────────

    addHealthRecord() {
        const animalId = prompt('Animal ID:');
        if (!animalId) return;
        const note = prompt('Health note / treatment:');
        if (!note) return;
        this.state.healthRecords.push({
            id: 'H' + Date.now().toString(36).toUpperCase(),
            animalId, note, date: new Date().toISOString().split('T')[0], vet: 'Self'
        });
        this.saveState();
        this.core.showToast('Health record added', 'success');
    },

    // ─── Pasture ─────────────────────────────────────────────────────────────

    showMoveAnimalsModal(pastureId) {
        const pasture = this.state.pastures.find(p => p.id === pastureId);
        if (!pasture) return;
        const otherPastures = this.state.pastures.filter(p => p.id !== pastureId);
        const animalsHere = this.state.animals.filter(a => pasture.animals.includes(a.id));

        const animalOptions = animalsHere.length
            ? animalsHere.map(a => `<label style="display:flex;align-items:center;gap:8px;padding:8px;background:var(--bg-input);border-radius:8px;cursor:pointer;">
                <input type="checkbox" value="${a.id}" style="width:18px;height:18px;accent-color:var(--primary);">
                <span>${this.escapeHtml(a.name)} — ${a.breed} (${a.weight} lbs)</span>
              </label>`).join('')
            : '<p style="color:var(--text-secondary)">No animals in this pasture</p>';

        const pastureOptions = otherPastures.map(p =>
            `<option value="${p.id}">${p.name} (${p.animals.length} animals, ${p.acres} ac)</option>`
        ).join('');

        this.core.getModule('ui')?.openModal(`Move Animals from ${pasture.name}`, `
            <div style="display:flex;flex-direction:column;gap:12px;">
                <p style="color:var(--text-secondary);font-size:0.85rem;">Select animals to move:</p>
                <div id="moveAnimalList" style="display:flex;flex-direction:column;gap:8px;">${animalOptions}</div>
                <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:8px;">Move to:</p>
                <select id="moveDestination" style="padding:12px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);color:var(--text-primary);">
                    ${pastureOptions}
                </select>
                <input type="hidden" id="moveSourceId" value="${pastureId}">
                <button class="btn-primary btn-full" style="margin-top:8px;" data-action="confirm-move">Move Animals</button>
            </div>
        `);
    },

    confirmMoveAnimals() {
        const sourceId = document.getElementById('moveSourceId')?.value;
        const destId = document.getElementById('moveDestination')?.value;
        const checked = [...document.querySelectorAll('#moveAnimalList input:checked')].map(i => i.value);

        if (!checked.length) { this.core.showToast('Select at least one animal', 'warning'); return; }

        const source = this.state.pastures.find(p => p.id === sourceId);
        const dest   = this.state.pastures.find(p => p.id === destId);
        if (!source || !dest) return;

        checked.forEach(id => {
            source.animals = source.animals.filter(a => a !== id);
            if (!dest.animals.includes(id)) dest.animals.push(id);
            const animal = this.state.animals.find(a => a.id === id);
            if (animal) animal.location = dest.name;
        });

        this.saveState();
        this.render();
        this.core.getModule('ui')?.closeModal();
        this.core.showToast(`${checked.length} animal(s) moved to ${dest.name}`, 'success');
    },

    showRainLogModal(pastureId) {
        const pasture = this.state.pastures.find(p => p.id === pastureId);
        if (!pasture) return;
        this.core.getModule('ui')?.openModal(`Log Rainfall — ${pasture.name}`, `
            <div style="display:flex;flex-direction:column;gap:12px;">
                <p style="color:var(--text-secondary);font-size:0.85rem;">Last recorded: ${pasture.lastRain} (${pasture.rainfallIn}" in)</p>
                <label style="color:var(--text-secondary);font-size:0.85rem;">Rainfall (inches)</label>
                <input type="number" id="rainAmount" step="0.1" min="0" placeholder="e.g. 0.8"
                    style="padding:12px;background:var(--bg-input);border:1px solid var(--border);border-radius:var(--radius-md);color:var(--text-primary);font-size:1rem;">
                <input type="hidden" id="rainPastureId" value="${pastureId}">
                <button class="btn-primary btn-full" style="margin-top:8px;" data-action="confirm-rain">Save Rainfall</button>
            </div>
        `);
    },

    confirmRainLog() {
        const pid = document.getElementById('rainPastureId')?.value;
        const amount = parseFloat(document.getElementById('rainAmount')?.value);
        if (isNaN(amount) || amount < 0) { this.core.showToast('Enter a valid amount', 'warning'); return; }
        const pasture = this.state.pastures.find(p => p.id === pid);
        if (!pasture) return;
        pasture.rainfallIn = amount;
        pasture.lastRain = new Date().toISOString().split('T')[0];
        if (amount >= 0.5) pasture.soilMoisture = 'good';
        else if (amount >= 0.2) pasture.soilMoisture = 'adequate';
        else pasture.soilMoisture = 'dry';
        this.saveState();
        this.renderPasture();
        this.core.getModule('ui')?.closeModal();
        this.core.showToast(`Rainfall logged: ${amount}" for ${pasture.name}`, 'success');
    },

    // ─── Misc actions ────────────────────────────────────────────────────────

    scanRFID() { this.core.showToast('RFID scanner ready. Tap NFC tag or scan barcode.', 'info'); },

    quickWeigh() {
        const id = prompt('Animal ID or Name:');
        if (!id) return;
        const weight = prompt('Weight (lbs):');
        if (!weight) return;
        const animal = this.state.animals.find(a => a.id === id || a.name.toLowerCase() === id.toLowerCase());
        if (animal) {
            animal.weight = parseInt(weight);
            animal.lastWeighed = new Date().toISOString().split('T')[0];
            this.saveState(); this.render();
            this.core.showToast(`${animal.name} weighed: ${weight} lbs`, 'success');
        } else {
            this.core.showToast('Animal not found', 'error');
        }
    },

    aiAnalyze() {
        const sick    = this.state.animals.filter(a => a.health === 'sick').length;
        const preg    = this.state.animals.filter(a => a.health === 'pregnant').length;
        const lowInv  = this.state.inventory.filter(i => i.quantity <= i.minLevel).length;
        const overdue = this.state.pastures.filter(p => p.daysGrazed >= p.maxRestDays && p.maxRestDays > 0);
        const analysis = `📊 Ranch Analysis — ${new Date().toLocaleDateString()}\n\n` +
            `🐄 ${this.state.animals.length} total animals\n` +
            `🤒 ${sick} sick · 🍼 ${preg} pregnant\n` +
            `💵 Net profit YTD: $${(this.state.revenue - this.state.expenses).toLocaleString()}\n` +
            `📦 ${lowInv} low-stock inventory items\n` +
            `🌿 ${overdue.length} pasture(s) need rotation\n\n` +
            `✅ Recommendation: ${overdue.length ? 'Rotate ' + overdue.map(p => p.name).join(', ') + ' immediately.' : 'Pasture rotation is on schedule.'} ` +
            `${sick ? 'Follow up on sick animals in Barn A.' : 'Herd health looks good.'}`;
        alert(analysis);
    },

    listAnimalForSale() { this.core.showToast('Market listing feature coming in next update', 'info'); },
    viewAuctions()      { this.core.showToast('Local auction data loading...', 'info'); },

    // ─── Upgrade ─────────────────────────────────────────────────────────────

    handleUpgrade(action) {
        const ui = this.core.getModule('ui');
        if (action === 'show-pricing') { ui?.switchView('upgrade'); return; }
        const tierMap = {
            'upgrade-grower':     'GROWER',   'subscribe-grower':    'GROWER',
            'upgrade-rancher':    'RANCHER',  'subscribe-rancher':   'RANCHER',
            'upgrade-enterprise': 'ENTERPRISE','subscribe-enterprise':'ENTERPRISE'
        };
        const tier = tierMap[action];
        if (tier) {
            if (!this.core.state.authenticated) {
                this.core.showToast('Create a free account to save your subscription!', 'warning');
                ui?.switchView('settings'); return;
            }
            this.core.state.tier = tier;
            this.core.state.user = { ...this.core.state.user, tier };
            localStorage.setItem('subscription', tier);
            localStorage.setItem('subscription_date', new Date().toISOString());
            this.core.saveAuthState(this.core.state.user);
            this.core.showToast(`Upgraded to ${tier}!`, 'success');
            ui?.switchView('dashboard');
            this.updateTierUI();
        }
    },

    getTierLimit(feature) {
        const limits = {
            FREE:       { animals: 25,       team: 1,        pastures: 5 },
            GROWER:     { animals: Infinity,  team: 1,        pastures: 20 },
            RANCHER:    { animals: Infinity,  team: 3,        pastures: Infinity },
            ENTERPRISE: { animals: Infinity,  team: Infinity, pastures: Infinity }
        };
        return limits[this.core.state.tier]?.[feature] ?? limits.FREE[feature];
    },

    updateTierUI() {
        const badge = document.getElementById('tierBadge');
        if (badge) badge.textContent = this.core.state.tier;
        const settingsTier = document.getElementById('settingsTier');
        if (settingsTier) settingsTier.textContent = this.core.state.tier + ' Plan';
        const limit = this.getTierLimit('animals');
        const count = this.state.animals.length;
        const pct   = limit === Infinity ? 5 : (count / limit * 100);
        const fill  = document.querySelector('.storage-fill');
        const label = document.querySelector('.storage-label');
        if (fill)  fill.style.width = Math.min(pct, 100) + '%';
        if (label) label.textContent = `${this.core.state.tier} Plan — ${count}/${limit === Infinity ? '∞' : limit} animals`;
        const upgradeBtn = document.querySelector('.btn-upgrade-sidebar');
        if (upgradeBtn) {
            if (this.core.state.tier === 'ENTERPRISE') {
                upgradeBtn.style.display = 'none';
            } else {
                const map = { FREE: ['Grower','$9.99'], GROWER: ['Rancher','$19.99'], RANCHER: ['Enterprise','$39.99'] };
                const [name, price] = map[this.core.state.tier] || ['Grower','$9.99'];
                upgradeBtn.textContent = `Upgrade to ${name} — ${price}/mo`;
            }
        }
    },

    // ─── Persistence ─────────────────────────────────────────────────────────

    saveState() {
        try {
            localStorage.setItem('ranch_app_state', JSON.stringify(this.state));
            this.state.lastSaved = new Date().toISOString();
        } catch (err) {
            if (err.name === 'QuotaExceededError') this.core.showToast('Storage full! Export data to continue.', 'error');
        }
    },

    loadState() {
        try {
            const saved = localStorage.getItem('ranch_app_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
                // Migrate: add pastures if missing
                if (!this.state.pastures || !this.state.pastures.length) {
                    this.state.pastures = [...this.samplePastures];
                }
            } else {
                this.state.animals      = [...this.sampleAnimals];
                this.state.tasks        = [...this.sampleTasks];
                this.state.inventory    = [...this.sampleInventory];
                this.state.transactions = [...this.sampleTransactions];
                this.state.pastures     = [...this.samplePastures];
                this.state.revenue      = 8230;
                this.state.expenses     = 2650;
                this.saveState();
            }
        } catch (err) {
            this.state.animals   = [...this.sampleAnimals];
            this.state.tasks     = [...this.sampleTasks];
            this.state.pastures  = [...this.samplePastures];
        }
    },

    exportData() { this.core.getModule('storage')?.exportData?.(); },
    importData() { this.core.getModule('storage')?.importData?.(); },

    clearData() {
        if (!confirm('⚠️ WARNING: This will permanently delete ALL ranch data. Are you sure?')) return;
        if (!confirm('FINAL CONFIRMATION: Delete everything?')) return;
        localStorage.removeItem('ranch_app_state');
        this.state = {
            money: 10000, revenue: 0, expenses: 0,
            animals: [], tasks: [], inventory: [], transactions: [],
            healthRecords: [], breedingRecords: [], pastures: [],
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

    stopLoop() { if (this.loopInterval) { clearInterval(this.loopInterval); this.loopInterval = null; } },

    // ─── Render ──────────────────────────────────────────────────────────────

    render() {
        this.renderDashboard();
        this.renderAnimals();
        this.renderTasks();
        this.renderInventory();
        this.renderFinance();
        this.renderHealth('health-records');
        this.renderPasture();
        this.updateTierUI();
    },

    renderDashboard() {
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('dashAnimalCount', this.state.animals.length);
        set('dashRevenue', '$' + this.state.revenue.toLocaleString());
        set('navAnimalCount', this.state.animals.length);
        set('navTaskCount', this.state.tasks.filter(t => !t.completed).length);
        const alerts = this.state.inventory.filter(i => i.quantity <= i.minLevel).length
                     + this.state.pastures.filter(p => p.daysGrazed >= p.maxRestDays && p.maxRestDays > 0).length;
        set('dashAlerts', alerts);

        const dashTaskList = document.getElementById('dashTaskList');
        if (dashTaskList) {
            const pending = this.state.tasks.filter(t => !t.completed).slice(0, 3);
            if (!pending.length) {
                dashTaskList.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><p>No pending tasks</p><button class="btn-primary btn-sm" data-action="add-task">Add Task</button></div>`;
            } else {
                dashTaskList.innerHTML = pending.map(t => `
                    <div class="task-item${t.completed ? ' completed' : ''}" data-id="${t.id}">
                        <div class="task-checkbox" data-action="toggle-task" data-id="${t.id}"></div>
                        <div class="task-content">
                            <div class="task-title">${this.escapeHtml(t.title)}</div>
                            <div class="task-meta">Due ${t.due}</div>
                        </div>
                        <span class="task-priority ${t.priority}">${t.priority}</span>
                    </div>`).join('');
            }
        }
    },

    renderAnimals(search = '', filter = 'all') {
        const grid = document.getElementById('animalGrid');
        if (!grid) return;
        let animals = this.state.animals;
        if (search) animals = animals.filter(a =>
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.id.toLowerCase().includes(search.toLowerCase()) ||
            a.breed.toLowerCase().includes(search.toLowerCase())
        );
        if (filter && filter !== 'all') animals = animals.filter(a => a.type === filter);
        if (!animals.length) {
            grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🐄</div><p>No animals found</p><button class="btn-primary btn-sm" data-action="add-animal">Add First Animal</button></div>`;
            return;
        }
        const typeIcons = { cattle: '🐄', sheep: '🐑', pig: '🐖', horse: '🐴', goat: '🐐', chicken: '🐔', duck: '🦆' };
        grid.innerHTML = animals.map(a => {
            const healthClass = a.health === 'healthy' ? 'healthy' : a.health === 'pregnant' ? 'warning' : 'danger';
            const icon = typeIcons[a.type] || '🐾';
            return `<div class="animal-card ${healthClass}" data-id="${a.id}">
                <div class="animal-card-icon">${icon}</div>
                <div class="animal-card-id">${a.id}</div>
                <div class="animal-card-name">${this.escapeHtml(a.name)}</div>
                <div class="animal-card-meta">${a.breed} · ${a.sex} · ${a.age}y</div>
                <div class="animal-card-stats">
                    <div class="animal-stat"><div class="animal-stat-value">${a.weight}</div><div class="animal-stat-label">lbs</div></div>
                    <div class="animal-stat"><div class="animal-stat-value" style="font-size:0.75rem;text-transform:capitalize">${a.health}</div><div class="animal-stat-label">status</div></div>
                </div>
                ${a.notes ? `<div style="font-size:0.75rem;color:var(--text-secondary);margin-top:8px;font-style:italic">${this.escapeHtml(a.notes)}</div>` : ''}
            </div>`;
        }).join('');
    },

    renderPasture() {
        const view = document.getElementById('pasture');
        if (!view) return;

        const totalAcres = this.state.pastures.reduce((s, p) => s + p.acres, 0);
        const totalAnimals = this.state.animals.length;
        const auPerAcre = totalAcres ? (totalAnimals / totalAcres).toFixed(2) : 0;
        const needRotation = this.state.pastures.filter(p => p.daysGrazed >= p.maxRestDays && p.maxRestDays > 0);

        view.innerHTML = `
        <style>
            .pasture-map { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-bottom:20px; }
            .pasture-card { background:var(--bg-card); border-radius:16px; border:2px solid var(--border); padding:16px; position:relative; overflow:hidden; cursor:pointer; transition:all 0.2s; }
            .pasture-card:active { transform:scale(0.98); }
            .pasture-card.overgrazing { border-color:var(--danger); }
            .pasture-card.warning-grazing { border-color:var(--warning); }
            .pasture-card.resting { border-color:var(--info); }
            .pasture-card.good { border-color:var(--success); }
            .pasture-bar-bg { height:8px; background:var(--bg-input); border-radius:4px; margin:8px 0; overflow:hidden; }
            .pasture-bar { height:100%; border-radius:4px; transition:width 0.5s; }
            .pasture-metric { display:flex; justify-content:space-between; font-size:0.78rem; color:var(--text-secondary); margin:3px 0; }
            .pasture-metric span:last-child { color:var(--text-primary); font-weight:600; }
            .pasture-actions { display:flex; gap:8px; margin-top:10px; }
            .pasture-action-btn { flex:1; padding:7px; border-radius:8px; border:1px solid var(--border); background:var(--bg-input); color:var(--text-primary); font-size:0.78rem; cursor:pointer; text-align:center; transition:all 0.2s; }
            .pasture-action-btn:active { background:var(--border); }
            .forage-ring { position:absolute; top:12px; right:12px; width:44px; height:44px; }
            .rotation-timeline { background:var(--bg-card); border-radius:14px; border:1px solid var(--border); padding:16px; margin-bottom:16px; }
            .timeline-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
            .timeline-row:last-child { margin-bottom:0; }
            .timeline-name { font-size:0.85rem; font-weight:600; min-width:110px; }
            .timeline-track { flex:1; height:10px; background:var(--bg-input); border-radius:5px; overflow:hidden; }
            .timeline-fill { height:100%; border-radius:5px; transition:width 0.4s; }
            .timeline-label { font-size:0.75rem; color:var(--text-secondary); min-width:60px; text-align:right; }
            .summary-pills { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
            .summary-pill { padding:8px 14px; border-radius:20px; background:var(--bg-card); border:1px solid var(--border); font-size:0.8rem; display:flex; flex-direction:column; align-items:center; min-width:80px; }
            .summary-pill .pill-val { font-size:1.1rem; font-weight:700; color:var(--primary); }
            .summary-pill .pill-lbl { font-size:0.7rem; color:var(--text-secondary); }
            .rain-log { background:var(--bg-card); border-radius:14px; border:1px solid var(--border); padding:14px; margin-bottom:16px; }
            .rain-row { display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); }
            .rain-row:last-child { border-bottom:none; }
        </style>

        ${needRotation.length ? `<div style="background:rgba(239,68,68,0.1);border:1px solid var(--danger);border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:0.88rem;color:var(--danger);">
            ⚠️ <strong>${needRotation.length} pasture(s) need rotation:</strong> ${needRotation.map(p => p.name).join(', ')}
        </div>` : ''}

        <div class="summary-pills">
            <div class="summary-pill"><span class="pill-val">${totalAcres}</span><span class="pill-lbl">Total Acres</span></div>
            <div class="summary-pill"><span class="pill-val">${auPerAcre}</span><span class="pill-lbl">Animals/Acre</span></div>
            <div class="summary-pill"><span class="pill-val">${this.state.pastures.filter(p => p.condition === 'resting').length}</span><span class="pill-lbl">Resting</span></div>
            <div class="summary-pill"><span class="pill-val">${this.state.pastures.filter(p => p.forageScore >= 80).length}</span><span class="pill-lbl">High Forage</span></div>
        </div>

        <div class="section-header"><div class="section-title">Paddock Overview</div></div>
        <div class="pasture-map">
            ${this.state.pastures.map(p => {
                const pct = p.maxRestDays > 0 ? Math.min((p.daysGrazed / p.maxRestDays) * 100, 100) : 0;
                const restPct = p.maxRestDays > 0 ? Math.min((p.restDays / p.maxRestDays) * 100, 100) : 0;
                const cardClass = p.condition === 'resting' ? 'resting'
                    : pct >= 100 ? 'overgrazing'
                    : pct >= 80  ? 'warning-grazing'
                    : 'good';
                const barColor = pct >= 100 ? 'var(--danger)' : pct >= 80 ? 'var(--warning)' : 'var(--success)';
                const forageColor = p.forageScore >= 80 ? '#22c55e' : p.forageScore >= 55 ? '#f59e0b' : '#ef4444';
                const animalsHere = this.state.animals.filter(a => p.animals.includes(a.id));
                return `<div class="pasture-card ${cardClass}">
                    <svg class="forage-ring" viewBox="0 0 44 44">
                        <circle cx="22" cy="22" r="18" fill="none" stroke="var(--bg-input)" stroke-width="5"/>
                        <circle cx="22" cy="22" r="18" fill="none" stroke="${forageColor}" stroke-width="5"
                            stroke-dasharray="${(p.forageScore / 100) * 113} 113"
                            stroke-linecap="round" transform="rotate(-90 22 22)"/>
                        <text x="22" y="26" text-anchor="middle" fill="${forageColor}" font-size="10" font-weight="700">${p.forageScore}</text>
                    </svg>
                    <div style="font-size:1rem;font-weight:700;margin-bottom:2px;padding-right:52px">${p.name}</div>
                    <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:8px">${p.acres} acres · ${animalsHere.length} animals</div>
                    ${p.condition !== 'resting' ? `
                        <div class="pasture-metric"><span>Grazed</span><span>${p.daysGrazed}/${p.maxRestDays} days</span></div>
                        <div class="pasture-bar-bg"><div class="pasture-bar" style="width:${pct}%;background:${barColor}"></div></div>
                    ` : `
                        <div class="pasture-metric"><span>Resting</span><span>${p.restDays}/${p.maxRestDays} days</span></div>
                        <div class="pasture-bar-bg"><div class="pasture-bar" style="width:${restPct}%;background:var(--info)"></div></div>
                    `}
                    <div class="pasture-metric"><span>Grass height</span><span>${p.grassHeight}" in</span></div>
                    <div class="pasture-metric"><span>Soil moisture</span><span style="text-transform:capitalize">${p.soilMoisture}</span></div>
                    <div class="pasture-metric"><span>Last rain</span><span>${p.lastRain} (${p.rainfallIn}")</span></div>
                    ${p.notes ? `<div style="font-size:0.75rem;color:var(--warning);margin-top:6px">${p.notes}</div>` : ''}
                    <div class="pasture-actions">
                        <div class="pasture-action-btn" data-action="move-animals" data-id="${p.id}">🔄 Move</div>
                        <div class="pasture-action-btn" data-action="log-rain" data-id="${p.id}">🌧️ Rain</div>
                    </div>
                </div>`;
            }).join('')}
        </div>

        <div class="section-header"><div class="section-title">Rotation Timeline</div></div>
        <div class="rotation-timeline">
            ${this.state.pastures.filter(p => p.maxRestDays > 0).map(p => {
                const pct = Math.min(p.condition === 'resting'
                    ? (p.restDays / p.maxRestDays) * 100
                    : (p.daysGrazed / p.maxRestDays) * 100, 100);
                const color = p.condition === 'resting' ? 'var(--info)'
                    : pct >= 100 ? 'var(--danger)'
                    : pct >= 80 ? 'var(--warning)'
                    : 'var(--success)';
                const label = p.condition === 'resting'
                    ? `Rest ${p.restDays}d`
                    : `Grazed ${p.daysGrazed}d`;
                return `<div class="timeline-row">
                    <div class="timeline-name">${p.name}</div>
                    <div class="timeline-track"><div class="timeline-fill" style="width:${pct}%;background:${color}"></div></div>
                    <div class="timeline-label">${label}</div>
                </div>`;
            }).join('')}
        </div>

        <div class="section-header"><div class="section-title">Rainfall Log</div></div>
        <div class="rain-log">
            ${this.state.pastures.map(p => `
                <div class="rain-row">
                    <div>
                        <div style="font-size:0.88rem;font-weight:600">${p.name}</div>
                        <div style="font-size:0.75rem;color:var(--text-secondary)">${p.lastRain}</div>
                    </div>
                    <div style="text-align:right">
                        <div style="font-weight:700;color:var(--info)">${p.rainfallIn}"</div>
                        <div style="font-size:0.75rem;color:var(--text-secondary);text-transform:capitalize">${p.soilMoisture}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        `;
    },

    renderTasks() {
        const list = document.getElementById('taskList');
        if (!list) return;
        const tasks = this.state.tasks;
        if (!tasks.length) {
            list.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><p>No tasks yet</p><button class="btn-primary btn-sm" data-action="add-task">Add Task</button></div>`;
            return;
        }
        list.innerHTML = tasks.map(t => `
            <div class="task-item${t.completed ? ' completed' : ''}" data-id="${t.id}">
                <div class="task-checkbox" data-action="toggle-task" data-id="${t.id}"></div>
                <div class="task-content">
                    <div class="task-title">${this.escapeHtml(t.title)}</div>
                    <div class="task-meta">Due ${t.due} · ${t.category}</div>
                </div>
                <span class="task-priority ${t.priority}">${t.priority}</span>
                <button class="btn-icon" style="width:32px;height:32px;" data-action="remove-task" data-id="${t.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>`).join('');
    },

    renderInventory(category = 'feed') {
        const list = document.getElementById('inventoryList');
        if (!list) return;
        const items = this.state.inventory.filter(i => i.category === category);
        if (!items.length) {
            list.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><p>No ${category} items</p><button class="btn-primary btn-sm" data-action="add-inventory">Add Item</button></div>`;
            return;
        }
        list.innerHTML = items.map(i => {
            const low = i.quantity <= i.minLevel;
            return `<div class="transaction-item">
                <div class="transaction-icon">${this.getCategoryIcon(i.category)}</div>
                <div class="transaction-details">
                    <div class="transaction-title">${this.escapeHtml(i.name)}</div>
                    <div class="transaction-date">Restocked: ${i.lastRestocked}</div>
                </div>
                <div style="text-align:right">
                    <div class="transaction-title" style="color:${low ? 'var(--danger)' : 'var(--success)'}">${i.quantity} ${i.unit}</div>
                    <div class="transaction-date">${low ? '⚠️ Low' : '✓ OK'}</div>
                </div>
            </div>`;
        }).join('');
    },

    renderFinance() {
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('finIncome',  '$' + this.state.revenue.toLocaleString());
        set('finExpense', '$' + this.state.expenses.toLocaleString());
        set('finProfit',  '$' + (this.state.revenue - this.state.expenses).toLocaleString());
        const list = document.getElementById('transactionList');
        if (!list) return;
        const txs = this.state.transactions.slice(0, 10);
        if (!txs.length) {
            list.innerHTML = `<div class="empty-state"><div class="empty-icon">💰</div><p>No transactions yet</p></div>`;
            return;
        }
        list.innerHTML = txs.map(t => `
            <div class="transaction-item">
                <div class="transaction-icon">${t.amount > 0 ? '💵' : '💸'}</div>
                <div class="transaction-details">
                    <div class="transaction-title">${this.escapeHtml(t.title)}</div>
                    <div class="transaction-date">${t.date} · ${t.category}</div>
                </div>
                <div class="transaction-amount ${t.type}">${t.amount > 0 ? '+' : ''}$${Math.abs(t.amount).toLocaleString()}</div>
            </div>`).join('');
    },

    renderHealth(tab) {
        const content = document.getElementById('healthContent');
        if (!content) return;
        if (tab === 'health-records') {
            content.innerHTML = !this.state.healthRecords.length
                ? `<div class="empty-state"><div class="empty-icon">🏥</div><p>No health records yet</p><button class="btn-primary btn-sm" data-action="add-health-record">Add Record</button></div>`
                : this.state.healthRecords.map(r => `
                    <div class="transaction-item">
                        <div class="transaction-icon">🏥</div>
                        <div class="transaction-details">
                            <div class="transaction-title">${this.escapeHtml(r.note)}</div>
                            <div class="transaction-date">${r.date} · Animal: ${r.animalId}</div>
                        </div>
                    </div>`).join('');
        } else if (tab === 'breeding') {
            content.innerHTML = `<div class="empty-state"><div class="empty-icon">🍼</div><p>Breeding records will appear here</p><button class="btn-primary btn-sm" data-action="add-breeding-record">Add Breeding Record</button></div>`;
        } else if (tab === 'vaccinations') {
            content.innerHTML = `<div class="empty-state"><div class="empty-icon">💉</div><p>Vaccination schedule will appear here</p><button class="btn-primary btn-sm" data-action="add-vaccination">Add Vaccination</button></div>`;
        }
    },

    // ─── Helpers ─────────────────────────────────────────────────────────────

    getCategoryIcon(cat) {
        return { feed: '🌾', medicine: '💊', equipment: '🔧', supplies: '📦' }[cat] || '📦';
    },

    handleRemove(action, id) {
        if (action === 'remove-animal')    this.removeAnimal(id);
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
                    <option>All Breeds</option><option>Angus</option><option>Hereford</option><option>Brahman</option><option>Jersey</option><option>Longhorn</option><option>Merino</option><option>Suffolk</option><option>Duroc</option><option>Hampshire</option><option>Boer</option>
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
        div.textContent = String(text);
        return div.innerHTML;
    }
};
