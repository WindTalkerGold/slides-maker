import { html } from '../app.js';

export default html`
    <style>
        .demo-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
            width: 100%;
            height: 100%;
            overflow-y: auto;
            text-align: left;
        }
        .box {
            border: 1px solid rgba(0,0,0,0.1);
            padding: 15px;
            border-radius: 8px;
            background: rgba(255,255,255,0.5);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: rgba(0,0,0,0.05);
        }
        .chart-container {
            width: 100%;
            height: 200px;
            position: relative;
        }
        /* KaTeX minimal override if needed */
        .katex { font-size: 1.2em; }
    </style>

    <!-- Load external libraries dynamically if needed, 
         but here we will just assume they are loaded or use vanilla JS for now.
         Actually, we'll inject script tags via onMount if we really want to use them without modifying index.html -->

    <h1>Data & Math</h1>
    
    <div class="demo-grid">
        <div class="box">
            <h3>Table</h3>
            <table>
                <thead>
                    <tr><th>Metric</th><th>Q1</th><th>Q2</th></tr>
                </thead>
                <tbody>
                    <tr><td>Revenue</td><td>$10k</td><td>$15k</td></tr>
                    <tr><td>Users</td><td>1,200</td><td>1,500</td></tr>
                    <tr><td>Growth</td><td>15%</td><td>25%</td></tr>
                </tbody>
            </table>
        </div>

        <div class="box">
            <h3>Chart (Chart.js)</h3>
            <div class="chart-container">
                <canvas id="myChart"></canvas>
            </div>
        </div>

        <div class="box">
            <h3>Formula (KaTeX)</h3>
            <p>The solution to <span id="formula-source">ax^2 + bx + c = 0</span> is:</p>
            <div id="formula-target" style="margin-top:20px;"></div>
        </div>

        <div class="box">
            <h3>Interactive Calculation</h3>
            <p>
                <label>Radius: <input type="number" id="radius" value="5" style="width:50px"></label>
                <button id="calc-btn">Calculate Area</button>
            </p>
            <p>Area: <span id="area-result">78.54</span></p>
        </div>
    </div>
`;

// Helper to load script
const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

// Helper to load stylesheet
const loadCSS = (href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
}

export const onMount = async (container) => {
    console.log('Mounting Page 3...');

    // 1. Chart.js
    try {
        await loadScript('https://cdn.jsdelivr.net/npm/chart.js');
        const ctx = container.querySelector('#myChart').getContext('2d');

        // Destroy existing chart if this slide was re-loaded to prevent memory leaks/overlap
        if (window.myDemoChart) window.myDemoChart.destroy();

        window.myDemoChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                },
                maintainAspectRatio: false
            }
        });
    } catch (e) {
        container.querySelector('.chart-container').textContent = 'Error loading Chart.js';
        console.error(e);
    }

    // 2. KaTeX
    try {
        loadCSS('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css');
        await loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js');

        const formula = "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}";
        katex.render(formula, container.querySelector('#formula-target'), {
            throwOnError: false
        });
    } catch (e) {
        container.querySelector('#formula-target').textContent = 'Error loading KaTeX';
    }

    // 3. Interactive Calculation
    const btn = container.querySelector('#calc-btn');
    const input = container.querySelector('#radius');
    const result = container.querySelector('#area-result');

    // Clean up previous listeners if any (simple implementation, usually we'd store the specific fn)
    const calcHandler = () => {
        const r = parseFloat(input.value);
        result.textContent = (Math.PI * r * r).toFixed(2);
    };

    btn.onclick = calcHandler;
};
