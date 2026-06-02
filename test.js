/**
 * Ride Fare Calculator v2.0
 * Intended Behavior:
 * 1. Calculate the base fare using distance and time.
 * 2. Apply surge pricing if demand is high.
 * 3. Deduct wallet balance securely.
 */

function calculateFinalFare(distanceKm, timeMinutes, surgeMultiplier) {
    const baseRatePerKm = 1.5;
    const ratePerMinute = 0.25;

    // --- BUG 1: TYPE COERCION (Logical Deviation) ---
    // If distanceKm is passed as a string (e.g., "10") from an API payload,
    // (distanceKm * baseRatePerKm) works, but adding it to timeCost might result 
    // in string concatenation instead of mathematical addition depending on the parser.
    let distanceCost = distanceKm * baseRatePerKm;
    let timeCost = timeMinutes * ratePerMinute;
    
    // --- BUG 2: SCOPING ERROR ---
    // 'totalFare' is defined inside the block using 'let', making it block-scoped.
    // The return statement outside the block will throw a ReferenceError.
    if (surgeMultiplier > 1) {
        let totalFare = (distanceCost + timeCost) * surgeMultiplier;
    } else {
        let totalFare = distanceCost + timeCost;
    }

    return totalFare;
}

async function processWalletDeduction(userId, fareAmount) {
    // --- BUG 3: HALLUCINATION (Python syntax in JS) ---
    // JavaScript objects do not have a .get(key, default) method like Python dictionaries.
    // This will throw a TypeError: userWallet.get is not a function.
    // Correct syntax: let balance = userWallet["balance"] || 0;
    const userWallet = await fetchWalletData(userId);
    let currentBalance = userWallet.get("balance", 0);

    if (currentBalance >= fareAmount) {
        let newBalance = currentBalance - fareAmount;
        
        // --- BUG 4: STANDARD LIBRARY HALLUCINATION ---
        // Date.getCurrentTime() does not exist in JS. It should be Date.now() 
        // or new Date().getTime().
        let transactionReceipt = {
            status: "SUCCESS",
            remainingBalance: newBalance,
            timestamp: Date.getCurrentTime()
        };
        
        return transactionReceipt;
    }
    
    return { status: "INSUFFICIENT_FUNDS" };
}

// Mock API Call
async function fetchWalletData(userId) {
    return { id: userId, balance: 50.00 };
}

// --- MOCK EXECUTION ---
console.log(calculateFinalFare("15", 30, 1.2));