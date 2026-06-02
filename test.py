"""
Hackathon Team Scorer v1.2
Intended Behavior:
1. Parse a list of team score dictionaries.
2. Calculate the average score for each team.
3. Identify the winning team based on the highest average.
"""

import math
import json

def calculate_team_averages(team_data_json):
    """Parses JSON data and calculates average scores for each team."""
    try:
        teams = json.loads(team_data_json)
    except json.JSONDecodeError:
        return []

    processed_teams = []

    for team in teams:
        scores = team.get("scores", [])
        
        # --- BUG 1: LOGICAL FAILURE (ZeroDivisionError) ---
        # If a team has empty scores [], len(scores) is 0.
        # This will crash the entire pipeline at runtime.
        average = sum(scores) / len(scores)
        
        team_summary = {
            "team_name": team.get("name", "Unknown"),
            "average_score": average
        }
        
        # --- BUG 2: CROSS-LANGUAGE HALLUCINATION ---
        # Python lists use .append(), not .push().
        # This is a classic LLM hallucination mixing JS and Python.
        processed_teams.push(team_summary)

    return processed_teams

def find_winning_team(processed_teams):
    """Finds the team with the highest score."""
    
    # --- BUG 3: UNDEFINED VARIABLE ---
    # 'highest_score' and 'winning_team' are evaluated before being assigned.
    # This will immediately throw an UnboundLocalError.
    for team in processed_teams:
        if team["average_score"] > highest_score:
            highest_score = team["average_score"]
            winning_team = team["team_name"]
            
    # --- BUG 4: STANDARD LIBRARY HALLUCINATION ---
    # The math module does not have a 'round_up' function in Python.
    # It should be math.ceil().
    print(f"Winner: {winning_team} with {math.round_up(highest_score)} points!")
    return winning_team

# --- MOCK EXECUTION ---
mock_data = '[{"name": "Ctrl-Alt-Elite", "scores": [85, 90, 92]}, {"name": "Drop Tables", "scores": []}]'
calculate_team_averages(mock_data)