/**
 * Ranch Manager Elite — Charts Module
 * Handles data visualization using Canvas API
 */
window.RanchCharts = {
    core: null,
    charts: {},

    init(core) {
        this.core = core;
    },

    /**
     * Create a simple bar chart on a canvas
     * @param {string} canvasId - Canvas element ID
     * @param {Array} data - Array of {label, value} objects
     * @param {Object} options - Chart options
     */
    renderBarChart(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        // Handle high-DPI displays
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = options.padding || 40;
        const barColor = options.barColor || '#2a6b3f';
        const textColor = options.textColor || '#b0b0b0';

        ctx.clearRect(0, 0, width, height);

        if (!data || data.length === 0) {
            ctx.fillStyle = textColor;
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('No data available', width / 2, height / 2);
            return;
        }

        const maxValue = Math.max(...data.map(d => d.value));
        const barWidth = (width - padding * 2) / data.length * 0.7;
        const gap = (width - padding * 2) / data.length * 0.3;
        const chartHeight = height - padding * 2;

        data.forEach((item, index) => {
            const x = padding + index * (barWidth + gap) + gap / 2;
            const barHeight = (item.value / maxValue) * chartHeight;
            const y = height - padding - barHeight;

            // Draw bar
            ctx.fillStyle = barColor;
            ctx.fillRect(x, y, barWidth, barHeight);

            // Draw label
            ctx.fillStyle = textColor;
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, height - padding + 20);

            // Draw value
            ctx.fillText(item.value.toString(), x + barWidth / 2, y - 8);
        });

        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
    },

    /**
     * Refresh economy chart
     */
    refresh() {
        const app = this.core?.getModule('app');
        if (!app) return;

        const data = [
            { label: 'Animals', value: app.state.animals.length },
            { label: 'Tasks', value: app.state.tasks.length },
            { label: 'Inventory', value: app.state.inventory.length }
        ];

        this.renderBarChart('economyChart', data, {
            barColor: '#2a6b3f',
            textColor: '#b0b0b0'
        });
    }
};
