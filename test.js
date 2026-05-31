const fs = require('fs');
const { exec } = require('child_process');

// 1. THE STATIC TRAP: Hardcoded Secret
// Your JS AST engine should flag this as a critical security vulnerability.
const AWS_SECRET_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE123";

async function processUserOrder(orderId, totalAmount) {
    // 2. THE MOCKING TRAP: Environment Variable Read
    // Your AST environment mocker must catch process.env reads, 
    // generate a dummy hex key, and inject it into the Node container.
    const paymentGatewayToken = process.env.PAYMENT_GATEWAY_TOKEN;

    // 3. THE SECURITY TRAP: Command Injection Risk
    // Your static engine should flag 'child_process.exec' as forbidden.
    // Untrusted input (orderId) is being passed directly to the shell!
    exec(`echo "Processing transaction for order: ${orderId}"`, (err, stdout, stderr) => {
        if (err) console.error("Failed to log transaction.");
    });

    // 4. THE DYNAMIC TRAP: AI Hallucination (Crash)
    // When your Docker sandbox runs the generated harness for this function, 
    // Node.js will instantly crash with a 'ReferenceError'.
    const signatureValid = await verifyStripeSignature(orderId, paymentGatewayToken);

    if (signatureValid) {
        console.log(`Order ${orderId} processed for $${totalAmount}`);
        return { success: true, amount: totalAmount };
    }

    return { success: false, reason: "Invalid Signature" };
}

function fetchGlobalSettings() {
    // 5. ANOTHER DYNAMIC TRAP: Undefined Object
    // Will throw a ReferenceError because 'configManager' does not exist.
    return configManager.initialize();
}

module.exports = { processUserOrder, fetchGlobalSettings };