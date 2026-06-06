/**
 * Ranch Manager Elite — Subscription Module
 * Handles subscription tiers and feature gating
 */
window.SubscriptionManager = {
    core: null,
    tiers: {
        FREE: { name: 'Free', maxAnimals: 50, features: ['basic'] },
        PRO: { name: 'Pro', maxAnimals: 500, features: ['basic', 'charts', 'export'] },
        ENTERPRISE: { name: 'Enterprise', maxAnimals: Infinity, features: ['basic', 'charts', 'export', 'ai', 'gps'] }
    },

    init(core) {
        this.core = core;
    },

    /**
     * Activate a subscription tier
     * @param {string} tier - Tier name: FREE, PRO, ENTERPRISE
     */
    activate(tier = 'ENTERPRISE') {
        const validTier = this.tiers[tier] ? tier : 'FREE';
        localStorage.setItem('subscription', validTier);
        localStorage.setItem('subscriptionActivated', new Date().toISOString());
        
        this.core?.log(`Subscription activated: ${validTier}`);
        return this.tiers[validTier];
    },

    /**
     * Get current subscription info
     */
    getCurrent() {
        const tier = localStorage.getItem('subscription') || 'FREE';
        return {
            tier: tier,
            ...this.tiers[tier]
        };
    },

    /**
     * Check if a feature is available
     * @param {string} feature 
     */
    hasFeature(feature) {
        const current = this.getCurrent();
        return current.features.includes(feature);
    },

    /**
     * Check if animal limit reached
     */
    canAddAnimal(currentCount) {
        const current = this.getCurrent();
        return currentCount < current.maxAnimals;
    }
};
