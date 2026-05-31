import os
import subprocess
import json

# 1. THE STATIC TRAP: Hardcoded Secret
STRIPE_PROD_KEY = "sk_live_51MabcDEFghi1234567890"

def execute_payment(user_id: int, amount: float):
    """Processes a user payment."""
    
    # 2. THE MOCKING TRAP: Environment Variable Readct a dummy value 
    # into the Docker container before it runs.
    db_password = os.getenv("PROD_DB_PASSWORD")
    
    # 3. THE SECURITY TRAP: Command Injection Risk
    # Your static engine should flag 'subprocess.Popen' as a forbidden/dangerous function.
    subprocess.Popen(f"echo Logging transaction for user {user_id}", shell=True)
    
    # 4. THE DYNAMIC TRAP: AI Hallucination (Crash)
    # The function 'validate_stripe_user' does not exist and is not imported!
    # When your sandbox executes this function using the generated harness, 
    # it will instantly crash and throw a `NameError`.
    is_valid = validate_stripe_user(user_id)
    
    if is_valid:
        print(f"Payment of ${amount} processed using db_pass: {db_password}")
        return True
        
    return False

def get_system_config():
    # 5. ANOTHER DYNAMIC TRAP: Undefined Object
    # Will throw a NameError because 'config_manager' is not defined.
    return config_manager.load_settings()