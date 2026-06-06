window.SubscriptionManager = {
    core: null,
    tiers: {
        FREE: {
            name: 'Free', price: 0, animals: 25, team: 1, pastures: 2,
            features: ['basic_tracking', 'tasks', 'inventory', 'finance_basic'],
            label: 'Free'
        },
        GROWER: {
            name: 'Grower', price: 9.99, animals: Infinity, team: 1, pastures: 10,
            features: ['basic_tracking', 'tasks', 'inventory', 'finance_basic', 'pasture', 'ndvi', 'breeding', 'health_advanced'],
            label: 'Grower'
        },
        RANCHER: {
            name: 'Rancher', price: 19.99, animals: Infinity, team: 3, pastures: Infinity,
            features: ['basic_tracking', 'tasks', 'inventory', 'finance_basic', 'pasture', 'ndvi', 'breeding', 'health_advanced', 'gps', 'reports', 'market', 'rfid', 'voice'],
            label: 'Rancher'
        },
        ENTERPRISE: {
            name: 'Enterprise', price: 39.99, animals: Infinity, team: Infinity, pastures: Infinity,
            features: ['all', 'ai', 'api', 'white_label', 'priority_support', 'custom'],
            label: 'Enterprise'
        }
    },
    init(core) {
        this.core = core;
        const saved = localStorage.getItem('subscription');
        if (saved && this.tiers[saved]) {
            this.core.state.tier = saved;
        }
    },
    activate(tier = 'FREE') {
        const validTier = this.tiers[tier] ? tier : 'FREE';
        localStorage.setItem('subscription', validTier);
        localStorage.setItem('subscription_date', new Date().toISOString());
        this.core.state.tier = validTier;
        if (this.core.state.user) {
            this.core.state.user.tier = validTier;
        }
        this.core?.showToast(`Subscription: ${this.tiers[validTier].name}`, 'success');
        return this.tiers[validTier];
    },
    getCurrent() {
        const tier = this.core?.state?.tier || localStorage.getItem('subscription') || 'FREE';
        return { tier, ...this.tiers[tier] };
    },
    hasFeature(feature) {
        const current = this.getCurrent();
        return current.features.includes(feature) || current.features.includes('all');
    },
    canAddAnimal(count) {
        const current = this.getCurrent();
        return count < current.animals;
    },
    getUpgradePath() {
        const current = this.getCurrent().tier;
        const paths = {
            FREE: { next: 'GROWER', price: '$9.99', savings: '' },
            GROWER: { next: 'RANCHER', price: '$19.99', savings: '' },
            RANCHER: { next: 'ENTERPRISE', price: '$39.99', savings: '' },
            ENTERPRISE: null
        };
        return paths[current];
    }
};
