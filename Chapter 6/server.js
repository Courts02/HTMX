import express from 'express';

const app = express(); // Initialize Express application

// Set static folder to serve public assets (like CSS, JS, images)
app.use(express.static('public'));

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());


// Handle GET request for profile edit
app.get('/user/:id/edit', (req, res) => {
    // Send an HTML form for editing the user profile
    res.send(`
    <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML"> 
        <!-- Input field for name -->
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" value="Greg Lim">             
        </div>
        <!-- Textarea for bio -->
        <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea type="text" class="form-control" id="bio" name="bio">
                Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses
            </textarea>      
        </div>
        <!-- Save Changes button (submits the form with a PUT request to update the user profile) -->
        <button type="submit" class="btn btn-primary">Save Changes</button>
        <!-- Cancel button (navigates back to /index.html) -->
        <button type="submit" hx-get="/index.html" class="btn btn-secondary">Cancel</button>
    </form>             
    `);
});

// Handle PUT request for editing the profile
app.put('/user/:id', (req, res) => {
    // Extract updated name and bio values from the request body
    const name = req.body.name;
    const bio = req.body.bio;

    // Send the updated profile back as an HTML card
    res.send(`
        <div class="card" style="width: 18rem;"
            hx-target="this" 
            hx-swap="outerHTML">
            <div class="card-body">
                <!-- Display updated name and bio -->
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${bio}</p>
                <!-- Button to navigate back to the edit form -->
                <button href="#" class="btn btn-primary" hx-get="/user/1/edit">Click To Edit</button>
            </div>
        </div> 
    `);
});


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
