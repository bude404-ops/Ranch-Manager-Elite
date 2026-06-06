/**
 * Ranch Manager Elite — GPS & Fencing Module
 * Handles map features, geolocation, and fencing
 */
window.RanchGPS = {
    core: null,
    fences: [],
    waterSources: [],
    gates: [],

    init(core) {
        this.core = core;
        this.loadGPSData();
    },

    addFence() {
        alert('Fence feature coming soon. You will be able to draw polygon boundaries on the map.');
        // Future: Open map modal, capture polygon coordinates
    },

    addWaterSource() {
        alert('Water source feature coming soon. You will be able to mark troughs, ponds, and wells.');
    },

    addGate() {
        alert('Gate feature coming soon. You will be able to mark entry/exit points on fences.');
    },

    /**
     * Get current GPS position
     */
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                pos => resolve({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy
                }),
                err => reject(err),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        });
    },

    saveGPSData() {
        try {
            const data = {
                fences: this.fences,
                waterSources: this.waterSources,
                gates: this.gates
            };
            localStorage.setItem('ranch_gps', JSON.stringify(data));
        } catch (err) {
            console.error('[GPS] Save failed:', err);
        }
    },

    loadGPSData() {
        try {
            const saved = localStorage.getItem('ranch_gps');
            if (saved) {
                const data = JSON.parse(saved);
                this.fences = data.fences || [];
                this.waterSources = data.waterSources || [];
                this.gates = data.gates || [];
            }
        } catch (err) {
            console.error('[GPS] Load failed:', err);
        }
    }
};
