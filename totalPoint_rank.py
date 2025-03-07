import os
import pandas as pd

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SCOUT_CSV = os.path.join(BASE_DIR, 'scout_profiles.csv')
RANKED_CSV = os.path.join(BASE_DIR, 'ranked_profiles.csv')

def rank_totalpoint():
    data_df = pd.read_csv(SCOUT_CSV)
    sorted_data = data_df.sort_values(by='totalPoints', ascending=False)
    sorted_data.to_csv(RANKED_CSV, index=False)
    return sorted_data
