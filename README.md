# InputValid-dotnet-secure - Node.js/Express Secure Build (Input Validation)

This repository houses a specific application build that is part of a larger comparative study, "Evaluating the Effectiveness of Secure Coding Practices Across Python, MERN, and .NET 8." The experiment systematically assesses how secure coding techniques mitigate critical web application vulnerabilities—specifically improper input validation, insecure secrets management, and insecure error handling—across these three diverse development stacks. Through the development of paired vulnerable and secure application versions, this study aims to provide empirical evidence on the practical effectiveness of various security controls and the impact of architectural differences on developer effort and overall security posture.

## Purpose
This particular build contains the **Secure Build** of the Node.js/Express application, specifically designed to demonstrate robust secure coding practices for **Input Validation**.

## Vulnerability Focus
This application build specifically addresses the mitigation of:
* **Improper Input Validation:** Ensuring all user input is thoroughly checked and sanitized on the server-side to prevent malicious data from entering the system.

## Key Secure Coding Practices Implemented
* **Express-Validator Middleware for Input Validation:** All user inputs submitted to the `/signup` endpoint are subjected to comprehensive, server-side validation using `express-validator` middleware. This robust implementation includes:
    * **Sanitization:** `trim()` to remove leading/trailing whitespace from inputs.
    * **Required Fields:** `notEmpty()` checks to ensure critical fields are not blank.
    * **Length Constraints:** `isLength()` for minimum and maximum length requirements on fields like username, password, email, and phone number.
    * **Format Validation:** `isEmail()` for email address format and `matches()` with regular expressions for username character sets, phone number format, and password complexity (uppercase, lowercase, numbers, special characters).
    * **Custom Validation:** A `custom()` validator to ensure `confirmPassword` matches the `password` field.
    This approach ensures data integrity, guards against common injection attacks (e.g., SQL Injection, XSS), and prevents malformed data from affecting application logic.

## Setup and Running the Application

### Prerequisites
* Node.js (LTS recommended) and npm (Node Package Manager).

### Steps
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    # Navigate to the specific build folder, e.g.:
    cd InputValid-dotnet-secure/mern/secure-input-validation # Assuming this is MERN's backend, often named 'server' or similar
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    This will install `express` and `express-validator`.
3.  **Run the application:**
    ```bash
    node server.js
    ```
    The application will typically start on `http://localhost:5000`.

## API Endpoints

### `POST /signup`
* **Purpose:** Handles user registration requests with robust server-side input validation.
* **Method:** `POST`
* **Content-Type:** `application/json`
* **Request Body Example (JSON):**
    ```json
    {
      "username": "MyValidUser",
      "email": "user@example.com",
      "phoneNumber": "123-456-7890",
      "password": "SecureP@ssw0rd!",
      "confirmPassword": "SecureP@ssw0rd!"
    }
    ```
* **Expected Behavior:**
    * **Valid Inputs:** Returns `200 OK` with a success message. Check the backend console for `--- VALIDATION SUCCESS ---`.
    * **Invalid Inputs (e.g., empty fields, too long username, invalid email format, non-matching passwords):** Returns `400 Bad Request` with a JSON payload detailing the specific validation errors (typically an array of error objects). Check the backend console for `--- VALIDATION FAILED ---` and specific error messages.

## Static Analysis Tooling
This specific build is designed to be analyzed by Static Analysis Security Testing (SAST) tools such as Semgrep and ESLint-Security (if configured) to measure their detection capabilities for the implemented **input validation** security controls and to verify compliance with secure coding standards.
