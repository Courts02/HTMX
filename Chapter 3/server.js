import express from 'express';

const app = express(); // Initialize Express application

// Set static folder to serve public assets (like CSS, JS, images)
app.use(express.static('public'));

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// Route to fetch Bitcoin price
app.get('/get-price', async (req, res) => {
    try {
        // Fetch Bitcoin price from CoinGecko API
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        const price = data.bitcoin.usd; // Extract Bitcoin price in USD
        
        // Send the price as an HTML snippet with success styling
        res.send(`<div class="price-display success">$${price.toLocaleString()}</div>`);
    } catch (error) {
        console.error('Price fetch error:', error);
        
        // Send an error message if fetching fails
        res.send(`
            <div class="price-display error">
                Unable to fetch price
                <span class="error-details">🔄 Retrying...</span>
            </div>
        `);
    }
});

// Start the server on port 3001
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
