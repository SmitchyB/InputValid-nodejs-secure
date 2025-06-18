const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator'); // Import express-validator functions
const app = express();
const port = 5000; 
// Middleware to enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// =======================================================
// SECURE Sign-Up Endpoint with Input Validation
// =======================================================
app.post('/signup',
    // Change 1. Define validation rules for each field using express-validator
    // These are the "secure coding practices" for input validation.

    // Username Validation
    body('username')
        .trim() // Sanitize: Remove leading/trailing whitespace
        .notEmpty().withMessage('Username is required.') // Ensure username is not empty
        .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters.') // Length check
        .matches(/^[a-zA-Z0-9_-]+$/).withMessage('Username contains invalid characters (only alphanumeric, _, - allowed).'), // Regex to allow only alphanumeric characters, underscores, and hyphens

    // Email Validation
    body('email')
        .trim() // Sanitize: Remove leading/trailing whitespace
        .notEmpty().withMessage('Email is required.') // Ensure email is not empty
        .isEmail().withMessage('Please enter a valid email address.') // Validate email format
        .isLength({ max: 255 }).withMessage('Email address is too long.'), // Max length for practical reasons

    // Phone Number Validation (basic US format for demonstration)
    body('phoneNumber')
        .trim()  // Sanitize: Remove leading/trailing whitespace
        .notEmpty().withMessage('Phone number is required.') // Ensure phone number is not empty
        .matches(/^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).withMessage('Please enter a valid phone number format (e.g., 123-456-7890).') // Regex to validate phone number format
        .isLength({ min: 10, max: 15 }).withMessage('Phone number length is invalid.'), // min/max digits

    // Password Validation
    body('password')
        .notEmpty().withMessage('Password is required.') // Ensure password is not empty
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.') // Minimum length for security
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.') // Matches at least one uppercase letter
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.') // Matches at least one lowercase letter
        .matches(/[0-9]/).withMessage('Password must contain at least one number.') // Matches at least one digit
        .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character.'), // Matches anything not alphanumeric

    // Confirm Password Validation
    body('confirmPassword')
        .notEmpty().withMessage('Confirm Password is required.') // Ensure confirm password is not empty
        // Custom validation to check if confirmPassword matches password
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match.');
            }
            return true;
        }),

    //Process the request after validation rules are applied
    (req, res) => {
        const { username, email, phoneNumber, password, confirmPassword } = req.body;

        // Log the RAW, UNVALIDATED data received (for demonstration purposes)
        console.log('--- RECEIVED UNVALIDATED SIGN-UP DATA ---');
        console.log(`Username: "${username}"`);
        console.log(`Email: "${email}"`);
        console.log(`Phone Number: "${phoneNumber}"`);
        console.log(`Password: "${password}"`); // Still logging raw here for demo, but never do this in production
        console.log(`Confirm Password: "${confirmPassword}"`);
        console.log('-----------------------------------------');

        //Change 2. Check for validation errors and send appropriate responses
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If there are errors, log them on the server and send them back to the client
            console.log('--- VALIDATION FAILED ---');
            console.log(errors.array()); // Log detailed errors
            console.log('-------------------------');

            // Send a 400 Bad Request status with the validation errors
            return res.status(400).json({ errors: errors.array() });
        }

        // If validation passes, log success and send a success response
        console.log('--- VALIDATION SUCCESS ---');
        console.log('Received data is VALID.');
        console.log('--------------------------');

        res.status(200).json({ message: 'Sign-up data successfully validated and received!' });
    }
);

// Start the server
app.listen(port, () => {
    console.log(`Node.js SECURE Backend listening at http://localhost:${port}`);
    console.log('Ready to receive sign-up data with input validation.');
});