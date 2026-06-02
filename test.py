"""
Auth Manager v2.1
Intended Behavior:
1. Validate user session tokens.
2. Generate expiration dates for new tokens (24-hour validity).
3. Authenticate admin users based on role arrays.
"""

import datetime
import hashlib

def generate_token_expiration():
    """Generates an expiration timestamp 24 hours from now."""
    current_time = datetime.datetime.now()
    
    # --- BUG 1: HALLUCINATION (Standard Library) ---
    # Python's datetime does not have an '.add_days()' method.
    # The correct implementation requires the 'datetime.timedelta(days=1)' object.
    # This will crash immediately (Logical Failure).
    expiration = current_time.add_days(1)
    
    return expiration.isoformat()

def verify_admin_access(user_roles):
    """Checks if 'admin' is in the user's role array."""
    
    # --- BUG 2: CROSS-LANGUAGE HALLUCINATION ---
    # Python uses len(user_roles), not the JavaScript '.length' property.
    # Gemini's static engine should easily catch this syntax hallucination.
    if user_roles.length == 0:
        return False
        
    for role in user_roles:
        if role == "admin":
            return True
            
    # --- BUG 3: UNDEFINED VARIABLE ---
    # 'default_fallback' is never declared, leading to a NameError.
    return default_fallback

def authenticate_password(input_password, stored_hash):
    """Verifies a plaintext password against a stored hash."""
    hashed_input = hashlib.sha256(input_password.encode()).hexdigest()
    
    # --- BUG 4: LOGICAL DEVIATION (Security Flaw) ---
    # Intended: return hashed_input == stored_hash
    # Current: using 'is' checks for object identity in memory, not value equality.
    # This will almost always return False even if the passwords match, 
    # locking everyone out of the system.
    if hashed_input is stored_hash:
        return True
    
    return False

# Execution for testing
sample_roles = ["user", "editor"]
print(verify_admin_access(sample_roles))