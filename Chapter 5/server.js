import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST request for email validation
app.post('/email', (req, res) => {
    // Extract the submitted email address from the request body
    const submittedEmail = req.body.email;
    // Regular expression for validating email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the submitted email matches the regular expression
    if (emailRegex.test(submittedEmail)) {
        // If the email is valid, return a success message with the validated email
        return res.send(`
        <div class="mb-3" hx-target="this" hx-swap="outerHTML">
            <label class="form-label">Email address</label>
            <input
                type="email"
                class="form-control"
                name="email"
                hx-post="/email"
                value="${submittedEmail}" 
            >
            <!-- Display success alert -->
            <div class="alert alert-success" role="alert">
                That email is valid
            </div>
        </div>
        `);
    } else {
        // If the email is invalid, return an error message with the submitted email
        return res.send(`
        <div class="mb-3" hx-target="this" hx-swap="outerHTML">
            <label class="form-label">Email address</label>
            <input
                type="email"
                class="form-control"
                name="email"
                hx-post="/email"
                value="${submittedEmail}" 
            >
            <!-- Display error alert -->
            <div class="alert alert-danger" role="alert">
                Please enter a valid email address
            </div>
        </div>
        `);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});