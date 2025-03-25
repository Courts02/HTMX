import express from 'express'; // Import the Express framework

const app = express(); // Create an Express application

// Set static folder to serve static files like CSS and JS from the "public" directory
app.use(express.static('public'));

// Middleware to parse URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (from API requests)
app.use(express.json());

// Handle POST request to '/calculate' to process BMI calculation
app.post('/calculate', (req, res) => {
    // Extract height and weight from the request body and convert them to numbers
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    // Calculate BMI using the formula: weight / (height * height)
    const bmi = weight / (height * height);
    
    // Send the calculated BMI back as an HTML response
    res.send(`
    <p>Height of ${height} & Weight of ${weight} gives you BMI of ${bmi.toFixed(2)}</p>
    `);
});

// Start the server on port 3000 and log a message when it is running
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
