/* ================================================================ */
/* Morphometric Data Table & Chart                                  */
/* ================================================================ */

async function loadData() {
    const response = await fetch('data.json');
    const data = await response.json();
    renderTable(data.morphometrics);
    renderChart(data.morphometrics);
}

function renderTable(entries) {
    const tbody = document.querySelector('#morphometrics-table tbody');

    entries.forEach(entry => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = entry.date;
        row.appendChild(dateCell);

        const weightCell = document.createElement('td');
        weightCell.textContent = entry.weight.value;
        row.appendChild(weightCell);

        tbody.appendChild(row);
    });
}

function renderChart(entries) {
    const ctx = document.getElementById('weight-chart');
    const labels = entries.map(e => e.date);
    const weights = entries.map(e => e.weight.value);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight (g)',
                data: weights,
                borderWidth: 2,
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Weight Over Time'
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Date' }
                },
                y: {
                    title: { display: true, text: 'Weight (g)' },
                    beginAtZero: false
                }
            }
        }
    });
}

loadData();
