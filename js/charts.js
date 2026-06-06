window.RanchCharts = {
    core: null,
    init(core) {
        this.core = core;
    },
    renderBarChart(canvasId, data, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        const width = rect.width;
        const height = rect.height;
        const padding = options.padding || 40;
        const barColor = options.barColor || '#2d8a4e';
        const textColor = options.textColor || '#a8b5a8';
        ctx.clearRect(0, 0, width, height);
        if (!data || data.length === 0) {
            ctx.fillStyle = textColor;
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('No data available', width / 2, height / 2);
            return;
        }
        const maxValue = Math.max(...data.map(d => d.value)) || 1;
        const barWidth = (width - padding * 2) / data.length * 0.7;
        const gap = (width - padding * 2) / data.length * 0.3;
        const chartHeight = height - padding * 2;
        data.forEach((item, index) => {
            const x = padding + index * (barWidth + gap) + gap / 2;
            const barHeight = (item.value / maxValue) * chartHeight;
            const y = height - padding - barHeight;
            const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
            gradient.addColorStop(0, barColor);
            gradient.addColorStop(1, 'rgba(45, 138, 78, 0.3)');
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, barHeight);
            ctx.fillStyle = textColor;
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x + barWidth / 2, height - padding + 20);
            ctx.fillStyle = '#f0f4f0';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText(item.value.toString(), x + barWidth / 2, y - 8);
        });
        ctx.strokeStyle = '#1e2a1e';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
    },
    refresh() {
        const app = this.core?.getModule('app');
        if (!app) return;
        const data = [
            { label: 'Animals', value: app.state.animals.length },
            { label: 'Tasks', value: app.state.tasks.filter(t => !t.completed).length },
            { label: 'Inventory', value: app.state.inventory.length }
        ];
        this.renderBarChart('economyChart', data, {
            barColor: '#2d8a4e',
            textColor: '#a8b5a8'
        });
    }
};
