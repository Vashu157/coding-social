/**
 * Payment Processor v2.0
 * Intended Behavior:
 * 1. Calculate final price after tax and discount.
 * 2. Process an array of transaction objects.
 * 3. Return a summary of processed transactions.
 */

function calculateFinalPrice(basePrice, taxRate, discount) {
    // --- BUG 1: LOGICAL DEVIATION (Type Coercion Error) ---
    // If basePrice is passed as a string (e.g., "100") from a JSON payload, 
    // basePrice + taxAmount will result in string concatenation, not addition.
    // E.g., "100" + 20 becomes "10020". This will completely break the math.
    let taxAmount = basePrice * taxRate;
    let finalPrice = basePrice + taxAmount - discount;
    
    // --- BUG 2: HALLUCINATION (Standard Library) ---
    // Math.roundTo() does not exist in JavaScript. 
    // The developer meant Math.round() or finalPrice.toFixed(2).
    // Your Gemini static analyzer will flag this immediately.
    return Math.roundTo(finalPrice, 2);
}

function processTransactions(transactions) {
    let successfulTransactions = [];
    
    for (let i = 0; i < transactions.length; i++) {
        let tx = transactions[i];
        
        if (tx.status === "PENDING") {
            // --- BUG 3: HALLUCINATION (Array Method) ---
            // JavaScript arrays use .push(), NOT .append(). 
            // This is a classic AI hallucination mixing up Python and JS syntax.
            // This will throw a TypeError at runtime (Logical Failure).
            successfulTransactions.append(tx.id);
        }
    }
    
    // --- BUG 4: UNDEFINED VARIABLE ---
    // 'summaryReport' was never declared or defined in this scope.
    // This will throw a ReferenceError when the function returns.
    return {
        processedCount: successfulTransactions.length,
        report: summaryReport
    };
}

// --- EXECUTION / MOCK DATA ---
const sampleTransactions = [
    { id: 1, amount: 100, status: "PENDING" },
    { id: 2, amount: 250, status: "COMPLETED" }
];

// --- BUG 5: HALLUCINATION (Global Object) ---
// Hallucinating a non-existent standard 'System' object to execute code.
System.log(processTransactions(sampleTransactions));
console.log(calculateFinalPrice("100", 0.20, 10));