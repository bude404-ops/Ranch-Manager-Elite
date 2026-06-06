window.StorageManager = {
    core: null,
    init(core) {
        this.core = core;
    },
    exportData() {
        try {
            const data = {
                exportDate: new Date().toISOString(),
                version: '2.0.0',
                app: JSON.parse(localStorage.getItem('ranch_app_state') || '{}'),
                auth: JSON.parse(localStorage.getItem('ranch_auth') || '{}'),
                subscription: localStorage.getItem('subscription') || 'FREE'
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ranch-elite-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.core?.showToast('Backup exported to Downloads', 'success');
        } catch (err) {
            console.error('[STORAGE] Export failed:', err);
            this.core?.showToast('Export failed: ' + err.message, 'error');
        }
    },
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    if (!confirm('This will overwrite all current data. Continue?')) return;
                    if (data.app) localStorage.setItem('ranch_app_state', JSON.stringify(data.app));
                    if (data.auth) localStorage.setItem('ranch_auth', JSON.stringify(data.auth));
                    if (data.subscription) localStorage.setItem('subscription', data.subscription);
                    this.core?.showToast('Backup restored! Reloading...', 'success');
                    setTimeout(() => window.location.reload(), 1500);
                } catch (err) {
                    this.core?.showToast('Import failed: Invalid file', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },
    getStorageInfo() {
        let total = 0;
        Object.keys(localStorage).forEach(key => {
            total += localStorage.getItem(key).length * 2;
        });
        return {
            used: total,
            usedKB: (total / 1024).toFixed(2),
            percentUsed: ((total / (5 * 1024 * 1024)) * 100).toFixed(1)
        };
    }
};
