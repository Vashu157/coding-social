/**
 * Auth Middleware v3.0
 * Intended Behavior:
 * 1. Parse authorization headers from API requests.
 * 2. Verify user roles against required permissions.
 * 3. Securely hash incoming passwords for storage.
 */

const crypto = require('crypto');

function verifyUserPermission(userRole, requiredRoles) {
    // --- BUG 1: CROSS-LANGUAGE HALLUCINATION ---
    // In Python, 'value in array' works perfectly. 
    // In JavaScript, the 'in' operator checks for array INDICES, not values.
    // If userRole is "admin", this evaluates to `"admin" in [0, 1]`, which is ALWAYS false.
    // Your engine will catch this logic failure instantly.
    if (userRole in requiredRoles) {
        return true;
    }
    
    return false;
}

function processAuthHeader(headerStr) {
    // --- BUG 2: LOGICAL DEVIATION (Runtime Crash) ---
    // If the client forgets to send a header, headerStr is undefined.
    // Calling .split() on undefined throws a fatal TypeError that crashes the server.
    // A classic LFH (Logical Failure Hallucination).
    let tokenParts = headerStr.split("Bearer ");
    
    if (tokenParts.length !== 2) {
        return null;
    }

    // --- BUG 3: HALLUCINATION (Node.js Standard Library) ---
    // Buffer.decode() does not exist in the Node.js API.
    // The correct syntax is Buffer.from(token, 'base64').toString('utf8').
    // Gemini's static analysis will roast this standard library hallucination.
    let decodedToken = Buffer.decode(tokenParts[1], 'base64');
    
    return JSON.parse(decodedToken);
}

function hashUserPassword(plainTextPassword) {
    // --- BUG 4: HALLUCINATION (Fake Crypto Method) ---
    // 'generateSecureHash' sounds incredibly real, but it is a complete AI hallucination.
    // The crypto module requires crypto.createHash() or crypto.pbkdf2().
    let hashedString = crypto.generateSecureHash(plainTextPassword, "SHA-256");
    
    // --- BUG 5: UNDEFINED VARIABLE ---
    // The code attempts to save the password to a database, 
    // but 'dbClient' was never imported or initialized anywhere in the file.
    dbClient.savePassword(hashedString);
    
    return hashedString;
}

// --- EXECUTION / MOCK DATA ---
const sampleRoles = ["admin", "editor"];
console.log("Permission check:", verifyUserPermission("admin", sampleRoles)); // Will incorrectly print 'false'

hashUserPassword("superSecretPassword123");