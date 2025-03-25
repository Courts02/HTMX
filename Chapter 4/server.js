import express from 'express';

const app = express(); // Initialize Express application

// Set static folder to serve public assets (like CSS, JS, images)
app.use(express.static('public'));

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// Handle POST request for user search
app.post('/search', async (req, res) => {
    const searchTerm = req.body.search.toLowerCase(); // Get search term and convert to lowercase
    
    if (!searchTerm) {
        return res.send('<tr></tr>'); // Return an empty row if no search term is provided
    }
    
    // Fetch user data from external API (jsonplaceholder.typicode.com)
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json();

    // Filter users based on search term (matching name or email)
    const searchResults = users.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
    });
    
    // Convert search results into HTML table rows
    const searchResultHtml = searchResults
        .map((user) => `
        <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        </tr>
        `)
        .join('');
    
    res.send(searchResultHtml); // Send HTML response back to frontend
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
