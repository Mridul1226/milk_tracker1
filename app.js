async function getBatchData() {
    const batchId = document.getElementById('batchId').value;
    const response = await fetch(`http://localhost:3000/api/batch/${batchId}`);
    const data = await response.json();

    if (response.ok) {
        displayBatchData(data);
        updateChart(data.sensorData);
    } else {
        alert(data.message);
    }
}

function displayBatchData(batch) {
    const batchInfoDiv = document.getElementById('batch-info');
    batchInfoDiv.innerHTML = `
        <h3>Batch ID: ${batch.batchId}</h3>
        <p>Spoilage Time: ${batch.spoilageTime} hours</p>
        <p>Bacterial Contamination: ${batch.bacterialContamination} CFU/mL</p>
    `;
}

function updateChart(sensorData) {
    const ctx = document.getElementById('sensorChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(sensorData),
            datasets: [{
                label: 'Sensor Data',
                data: Object.values(sensorData),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                backgroundcolor: 'rgba(255, 99, 132, 0.2)',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                       color: 'rgba(0, 0, 0, 0.5)',  // Set x-axis grid line color
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.5)', // Set y-axis grid line color
                    },
                    beginAtZero: true
                }
            }
        }
        
    });
}
