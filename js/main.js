document.getElementById('dropdownMenuButton').addEventListener('click', function() {
    var dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});


//Conservation Status Over Time
const jsonData = [
    { "date": "2020", "species": "Tiger", "status": "Endangered" },
    { "date": "2020", "species": "Elephant", "status": "Vulnerable" },
    { "date": "2021", "species": "Tiger", "status": "Endangered" },
    { "date": "2021", "species": "Elephant", "status": "Vulnerable" },
    { "date": "2022", "species": "Tiger", "status": "Vulnerable" },
    { "date": "2022", "species": "Elephant", "status": "Endangered" },
    { "date": "2023", "species": "Elephant", "status": "Vulnerable" },
    { "date": "2023", "species": "Tiger", "status": "Endangered" }
];
//Species Population Dynamics
const data = {
    labels: ['2018', '2019', '2020', '2021', '2022'],  // Years of the survey
    datasets: [
        {
            label: 'Tigers',
            data: [200, 220, 210, 232, 250],  // Population data per year
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
        },
        {
            label: 'Elephants',
            data: [150, 160, 152, 148, 160],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
        },
        {
            label: 'Lions',
            data: [80, 60, 65, 70, 75],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgb(255, 206, 86)',
            borderWidth: 1
        }
    ]
};

// Conservation Status Over Time
// Mapping statuses to numeric values for better chart visualization
const statusValues = {
    "Endangered": 3,
    "Vulnerable": 2,
    "Least Concern": 1
};

// Processing data into a format suitable for Chart.js
const datasets = jsonData.reduce((acc, item) => {
    const { date, species, status } = item;
    if (!acc[species]) {
        acc[species] = {
            label: species,
            data: [],
            borderColor: getRandomColor(), // Random color for each species
            fill: false
        };
    }
    acc[species].data.push({
        x: date,
        y: statusValues[status]
    });
    return acc;
}, {});

const chartData = {
    datasets: Object.values(datasets)
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
// First, check if the element exists
const canvas = document.getElementById('conservationChart');

if (canvas) {
    // Only proceed if the canvas element exists
    const ctx = canvas.getContext('2d');
    const conservationChart = new Chart(ctx, {
        type: 'line',
        data: chartData, // Use the processed data
        options: {
            scales: {
                x: {
                    type: 'category',
                    labels: ['2020', '2021', '2022','2023'], // Explicitly specify labels for the x-axis
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Conservation Status',
                        font: {
                            size:24
                        }
                    },
                    color:'#333',
                    padding:{
                        top:10,
                        bottom:30
                    },
                    ticks: {
                        // Custom labels for statuses
                        callback: function(value) {
                            return Object.keys(statusValues).find(key => statusValues[key] === value);
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            },
            responsive: true
        }
    });
} else {
    console.error('Failed to get the canvas element. Ensure the element exists in the DOM before this script runs.');
}



///Conservation Over time
        const populationChartconfig = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Population'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Species Population Dynamics Over Time',
                        padding: {
                            top: 20,
                            bottom: 30
                        },
                        font: {
                            size: 16
                        }
                    }
                },
                responsive: true
            }
        };
        
        const canvas2 = document.getElementById('populationChart');
        if(canvas2){
            const xtss = document.getElementById('populationChart').getContext('2d');
            const populationChart = new Chart(xtss, populationChartconfig);
        }
      


