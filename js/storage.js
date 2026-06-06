/**
 * Ranch Manager Elite — Storage Module
 * Handles data export/import, backup, and storage management
 */
window.StorageManager = {
    core: null,

    init(core) {
        this.core = core;
    },

    /**
     * Export all app data as JSON file download
     */
    exportData() {
        try {
            const data = {
                ranch_state: null,
                subscription: null,
                exportDate: new Date().toISOString(),
                version: '1.0.0'
            };

            // Collect all localStorage data
            Object.keys(localStorage).forEach(key => {
                try {
                    data[key] = JSON.parse(localStorage.getItem(key));
                } catch {
                    data[key] = localStorage.getItem(key);
                }
            });

            // Create downloadable file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ranch-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.core?.log('Backup exported successfully');
            alert('Backup exported! Check your downloads folder.');
        } catch (err) {
            console.error('[STORAGE] Export failed:', err);
            alert('Export failed: ' + err.message);
        }
    },

    /**
     * Import data from JSON file
     */
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

                    // Clear existing
                    localStorage.clear();

                    // Restore data
                    Object.keys(data).forEach(key => {
                        if (key === 'exportDate' || key === 'version') return;
                        const value = typeof data[key] === 'object' 
                            ? JSON.stringify(data[key]) 
                            : data[key];
                        localStorage.setItem(key, value);
                    });

                    // Reload app state
                    window.location.reload();
                } catch (err) {
                    console.error('[STORAGE] Import failed:', err);
                    alert('Import failed: Invalid backup file.');
                }
            };
            reader.readAsText(file);
        };

        input.click();
    },

    /**
     * Get storage usage info
     */
    getStorageInfo() {
        let total = 0;
        Object.keys(localStorage).forEach(key => {
            total += localStorage.getItem(key).length * 2; // UTF-16 = 2 bytes per char
        });
        return {
            used: total,
            usedKB: (total / 1024).toFixed(2),
            estimatedQuota: 5 * 1024 * 1024, // ~5MB typical limit
            percentUsed: ((total / (5 * 1024 * 1024)) * 100).toFixed(1)
        };
    }
};
