import os
import pandas as pd

# Use the directory of this file as the base directory.
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SCOUT_CSV = os.path.join(BASE_DIR, 'scout_profiles.csv')
RANKED_CSV = os.path.join(BASE_DIR, 'ranked_profiles.csv')

def rank_totalpoint():
    try:
        data_df = pd.read_csv(SCOUT_CSV)
    except Exception as e:
        print("Error reading scout_profiles.csv:", e)
        raise

    # Sort data by totalPoints in descending order.
    sorted_data = data_df.sort_values(by='totalPoints', ascending=False)
    try:
        sorted_data.to_csv(RANKED_CSV, index=False)
    except Exception as e:
        print("Error writing ranked_profiles.csv:", e)
        raise

    print("Ranked CSV saved at:", RANKED_CSV)
    return sorted_data
