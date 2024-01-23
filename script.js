// Variables
let currency = 500;
let currencyPerSecond = 0;

let itemCost = 25;
let itemsOwned = 0;
let itemEfficiency = 1;

let generatorCost = 50;
let generatorCount = 0;
let generatorEfficiency = 2;

let bigClickerCost = 100;
let bigClickerCount = 0;
let bigClickerEfficiency = 4;


// DOM Elements
const currencyCountElement = document.getElementById('currency-count');
const currencyPerSecondElement = document.getElementById('currency-per-second');
const clickButton = document.getElementById('click-button');
const itemButton = document.getElementById('buy-item');
const itemCountElement = document.getElementById('item-count');
const itemCostElement = document.getElementById('item-cost');
const generatorButton = document.getElementById('buy-generator');
const generatorCostElement = document.getElementById('generator-cost');
const generatorCountElement = document.getElementById('generator-count');
const bigClickerButton = document.getElementById('buy-big-clicker');
const bigClickerCostElement = document.getElementById('big-clicker-cost');
const bigClickerCountElement = document.getElementById('big-clicker-count');

// Create the initial chart instance
const ctx = document.getElementById('currencyChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],  // Timestamp labels for the X-axis
        datasets: [{
            label: 'Finances',
            data: [],   // Currency per second values for the Y-axis
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
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


// Function to update button states based on currency
function updateButtonStates() {
    // Check if the player can afford an item and update UI
    if (currency >= itemCost) {
        itemButton.removeAttribute('disabled');
    } else {
        itemButton.setAttribute('disabled', 'true');
    }

    // Check if the player can afford a generator and update UI
    if (currency >= generatorCost && itemsOwned >= 10) {
        generatorButton.removeAttribute('disabled');
    } else {
        generatorButton.setAttribute('disabled', 'true');
    }
}

// Function to update currency per second display
function updateCurrencyPerSecond() {
    const newCurrencyPerSecond = itemsOwned * itemEfficiency + generatorCount * generatorEfficiency;
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
    updateChart();

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

// ITEM CODE
itemButton.addEventListener('click', () => {
    // Deduct the cost of the item
    currency -= itemCost;

    // Increase the item count and update the item cost
    itemsOwned++;
    itemCost = itemCost * 1.1;

    if(itemsOwned == 15){
        itemEfficiency *= 2;
    }

    // Update UI
    currencyCountElement.textContent = currency.toFixed(1);
    itemCountElement.textContent = itemsOwned;
    itemCostElement.textContent = itemCost.toFixed(1);

    // Update currency per second display
    updateCurrencyPerSecond();
    // Update button states
    updateButtonStates();
});

// GENERATOR CODE
generatorButton.addEventListener('click', () => {
    // Deduct the cost of the generator
    currency -= generatorCost;

    // Increase the generator count
    generatorCount++;
    generatorCost = generatorCost * 1.2;

    if(generatorEfficiency == 15){
        generatorEfficiency *= 2;
    }

    // Update UI
    currencyCountElement.textContent = currency.toFixed(1);
    generatorCostElement.textContent = generatorCost.toFixed(1);
    generatorCountElement.textContent = generatorCount;

    // Update currency per second display
    updateCurrencyPerSecond();
    // Update button states
    updateButtonStates();
});

// BIG CLICKER CODE
bigClickerButton.addEventListener('click', () => {
    // Deduct the cost of the big clicker
    currency -= bigClickerCost;

    // Increase the big clicker count
    bigClickerCount++;
    bigClickerCost = bigClickerCost * 1.2;

    if(bigClickerEfficiency == 15){
        bigClickerEfficiency *= 2;
    }

    // Update UI
    currencyCountElement.textContent = currency.toFixed(1);
    bigClickerCostElement.textContent = bigClickerCost.toFixed(1);
    bigClickerCountElement.textContent = bigClickerCount;

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
