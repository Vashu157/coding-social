/**
 * Trip Data Fetcher v1.0
 * Intended Behavior:
 * 1. Fetch trip data from a mock API endpoint asynchronously.
 * 2. Parse the JSON response.
 * 3. Filter the trips to only return active ones.
 */

async function fetchTripData(driverId) {
    const endpoint = `https://api.mockrides.com/v1/drivers/${driverId}/trips`;
    
    // --- BUG 1: ASYNC LOGIC FAILURE (Logical Deviation) ---
    // The developer forgot the 'await' keyword before fetch().
    // 'response' will be a pending Promise, not the actual HTTP response object.
    // The subsequent .json() call will throw an error.
    let response = fetch(endpoint);
    
    if (response.status === 200) {
        // --- BUG 2: HALLUCINATION (Standard Library) ---
        // JSON.parseString() is not a valid JavaScript method. 
        // It should just be JSON.parse() or response.json().
        let rawData = JSON.parseString(response.body);
        return rawData;
    }
    
    return null;
}

function getActiveTrips(tripList) {
    let activeTrips = [];
    
    // --- BUG 3: HALLUCINATION (Dictionary/Object Methods) ---
    // JavaScript uses Object.keys(tripList), not tripList.keys().
    // This is a very common LLM hallucination where it assumes Python dictionary 
    // methods apply to JS objects.
    let keys = tripList.keys();
    
    for (let i = 0; i < keys.length; i++) {
        let trip = tripList[keys[i]];
        
        // --- BUG 4: LOGICAL DEVIATION (Assignment vs. Comparison) ---
        // Using a single '=' assigns the value "active" to trip.status, 
        // which resolves to true. This will incorrectly return EVERY trip as active,
        // completely destroying the filter logic.
        if (trip.status = "active") {
            activeTrips.push(trip);
        }
    }
    
    return activeTrips;
}

// Execution for testing
const mockTrips = {
    "trip1": { status: "completed", fare: 15 },
    "trip2": { status: "active", fare: 20 }
};

console.log(getActiveTrips(mockTrips));