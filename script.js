// Variables
let currency = 500;
let currencyPerSecond = 0;

let lemonadeStandCost = 25;
let lemonadeStandCount = 0;
let lemonadeStandEfficiency = 1;

let dropshipCost = 50;
let dropshipCount = 0;
let dropshipEfficiency = 2;

let partTimeJobCost = 100;
let partTimeJobCount = 0;
let partTimeJobEfficiency = 4;

// DOM Elements
const currencyCountElement = document.getElementById('currency-count');
const currencyPerSecondElement = document.getElementById('currency-per-second');
const clickButton = document.getElementById('click-button');
const lemonadeStandButton = document.getElementById('buy-item');
const lemonadeStandCountElement = document.getElementById('item-count');
const lemonadeStandCostElement = document.getElementById('item-cost');
const dropshipButton = document.getElementById('buy-generator');
const dropshipCostElement = document.getElementById('generator-cost');
const dropshipCountElement = document.getElementById('generator-count');
const partTimeJobButton = document.getElementById('buy-big-clicker');
const partTimeJobCostElement = document.getElementById('big-clicker-cost');
const partTimeJobCountElement = document.getElementById('big-clicker-count');

// Create the initial chart instance
const ctx = document.getElementById('currencyChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],  // Timestamp labels for the X-axis
        datasets: [{
            label: 'Net Worth',
            data: [],   // Currency per second values for the Y-axis
            fill: false,
            borderColor: 'rgb(0, 128, 0)',
            pointRadius: 0,
            tension: 0.1
        }]
    },
    options: {
        animation: {
            duration: 0 // Set animation duration to 0 for no animation
        },
        scales: {
            x: {
                display: false // Hide X-axis
            },
            y: {
                display: true // Show Y-axis
            }
        }
    }
});

function toggleNightMode() {
    const clickerContainer = document.getElementById('clicker-container');
    clickerContainer.classList.toggle('night-mode');
}

// Function to update button states based on currency
function updateButtonStates() {
    // Check if the player can afford a lemonade stand and update UI
    if (currency >= lemonadeStandCost) {
        lemonadeStandButton.removeAttribute('disabled');
    } else {
        lemonadeStandButton.setAttribute('disabled', 'true');
    }

    // Check if the player can afford a dropship and update UI
    if (currency >= dropshipCost && lemonadeStandCount >= 10) {
        dropshipButton.removeAttribute('disabled');
    } else {
        dropshipButton.setAttribute('disabled', 'true');
    }
}

// Function to update currency per second display
function updateCurrencyPerSecond() {
    const newCurrencyPerSecond = lemonadeStandCount * lemonadeStandEfficiency + dropshipCount * dropshipEfficiency;
    if (newCurrencyPerSecond !== currencyPerSecond) {
        currencyPerSecond = newCurrencyPerSecond;
        currencyPerSecondElement.textContent = currencyPerSecond.toFixed(1);
    }
}

// Main update loop
setInterval(() => {
    // Generate currency per second for each owned item and generator
    currency += currencyPerSecond;

    // Update UI
    currencyCountElement.textContent = currency.toFixed(1);

    // Update button states
    updateButtonStates();

    // Update Chart
    if (new Date().getSeconds() % 5 === 0) {
        updateChart();
    }

}, 1000);

// Event listener for the click button
clickButton.addEventListener('click', () => {
    // Increase currency count
    currency++;

    // Update currency count display
    currencyCountElement.textContent = currency.toFixed(1);

    // Update button states
    updateButtonStates();
});

// LEMONADE STAND CODE
lemonadeStandButton.addEventListener('click', () => {
    // Deduct the cost of the lemonade stand
    currency -= lemonadeStandCost;

    // Increase the lemonade stand count and update the cost
    lemonadeStandCount++;
    lemonadeStandCost = lemonadeStandCost * 1.1;

    if(lemonadeStandCount == 15){
        lemonadeStandEfficiency *= 2;
    }

    // Update UI
    currencyCountElement.textContent = currency.toFixed(1);
    lemonadeStandCountElement.textContent = lemonadeStandCount;
    lemonadeStandCostElement.textContent = lemonadeStandCost.toFixed(1);

    // Update currency per second display
    updateCurrencyPerSecond();
    // Update button states
    updateButtonStates();
});

// DROPSHIP CODE
dropshipButton.addEventListener('click', () => {
    // Deduct the cost of the dropship
    currency -= dropshipCost;

    // Increase the dropship count
    dropshipCount++;
    dropshipCost = dropshipCost * 1.2;

    if(dropshipEfficiency == 15){
        dropshipEfficiency *= 2;
    }

    // Update UI
    currencyCountElement.textContent = currency.toFixed(1);
    dropshipCostElement.textContent = dropshipCost.toFixed(1);
    dropshipCountElement.textContent = dropshipCount;

    // Update currency per second display
    updateCurrencyPerSecond();
    // Update button states
    updateButtonStates();
});

// PART TIME JOB CODE
partTimeJobButton.addEventListener('click', () => {
    // Deduct the cost of the part-time job
    currency -= partTimeJobCost;

    // Increase the part-time job count
    partTimeJobCount++;
    partTimeJobCost = partTimeJobCost * 1.2;

    if(partTimeJobEfficiency == 15){
        partTimeJobEfficiency *= 2;
    }

    // Update UI
    currencyCountElement.textContent = currency.toFixed(1);
    partTimeJobCostElement.textContent = partTimeJobCost.toFixed(1);
    partTimeJobCountElement.textContent = partTimeJobCount;

    // Update currency per second display
    updateCurrencyPerSecond();
    // Update button states
    updateButtonStates();
});

// Function to update the currency per second chart
function updateChart() {
    // Add a new data point with the current timestamp and currency per second value
    chart.data.labels.push(''); // Empty string to avoid displaying timestamps
    chart.data.datasets[0].data.push(currency);

    // Limit the number of data points to one minute (60 seconds)
    const maxDataPoints = 60;
    if (chart.data.labels.length > maxDataPoints) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    // Update the chart without animation
    chart.update({ duration: 0 });
}

// Initial button states
updateButtonStates();
