import pandas as pd

def rank_totalpoint():
    data_df = pd.read_csv('scout_profiles.csv')
    sorted_data = data_df.sort_values(by='totalPoints', ascending=False)
    sorted_data.to_csv('ranked_profiles.csv', index=False)
    
    return sorted_data