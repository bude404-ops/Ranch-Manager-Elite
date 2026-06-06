window.RanchGPS = {
    core: null,
    fences: [],
    waterSources: [],
    gates: [],
    currentPosition: null,
    init(core) {
        this.core = core;
        this.loadGPSData();
    },
    addFence() {
        this.core?.showToast('Draw fence line on map (feature coming in v2.1)', 'info');
    },
    addWaterSource() {
        this.core?.showToast('Mark water source location (feature coming in v2.1)', 'info');
    },
    addGate() {
        this.core?.showToast('Place gate marker (feature coming in v2.1)', 'info');
    },
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                pos => {
                    this.currentPosition = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        accuracy: pos.coords.accuracy
                    };
                    resolve(this.currentPosition);
                },
                err => reject(err),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        });
    },
    saveGPSData() {
        try {
            const data = { fences: this.fences, waterSources: this.waterSources, gates: this.gates };
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
