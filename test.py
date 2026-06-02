"""
Ecommerce Processor v1.0
This module processes customer data and calculates loyalty points.
Intended Behavior:
1. Load a list of customer JSON strings.
2. Validate the data.
3. Calculate loyalty bonus based on past purchases (1 point per 10 currency spent).
"""

import json
import random

def process_customers(raw_customer_list):
    """Processes a list of raw customer JSON strings."""
    processed_list = []
    
    # --- BUG 1: SYNTAX ERROR / HALLUCINATION ---
    # Python dictionaries do not have an '.append_all()' method.
    # The intended library method was '.update()', which Gemini should catch.
    default_config = {"loyalty_multiplier": 1.0, "region": "Global"}
    
    for customer_json in raw_customer_list:
        try:
            customer_data = json.loads(customer_json)
            
            # This line will cause the script to crash (Logical Failure Hallucination).
            # It should trigger your runtime detection.
            customer_data.append_all(default_config)
            
            processed_list.append(customer_data)
        except json.JSONDecodeError:
            print("Skipping malformed customer JSON.")
            
    return processed_list

class LoyaltyCalculator:
    def __init__(self, multiplier=1.0):
        self.multiplier = multiplier

    def calculate_bonus(self, total_spent):
        """Intended: Calculates bonus as total_spent / 10 * multiplier."""
        
        # --- BUG 2: LOGICAL FAILURE HALLUCINATION (Runtime) ---
        # If total_spent is 0 (which is a valid state), this function will 
        # crash due to a ZeroDivisionError during execution.
        # This is a classic LFH your dynamic module should catch.
        bonus = (self.multiplier / 10) * (total_spent)
        return bonus

    def generate_report(self, loyalty_bonus):
        """Generates a summary report of the bonus."""
        # --- BUG 3: UNDEFINED VARIABLE HALLUCINATION ---
        # 'bonus_summary' is never defined in this scope. 
        # Python will throw a NameError, which Gemini will flag statically.
        summary_text = f"Total Loyalty Bonus Allocated: {bonus_summary}"
        print(summary_text)

# --- EXECUTION ---
# This simulates how the code might run during testing.

# Invalid total_spent (0) to trigger BUG 2
calc = LoyaltyCalculator()
points = calc.calculate_bonus(0)
print(f"Bonus Points: {points}")