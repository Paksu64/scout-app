import pandas as pd
import ast

def rank_totalpoint():
    data = pd.read_csv('scout_profiles.csv', header=None)
    data_dicts = [ast.literal_eval(row[0].strip()) for index, row in data.iterrows()]
    data_df = pd.DataFrame(data_dicts)

    sorted_data = data_df.sort_values(by='totalPoints', ascending=False)

    sorted_data.to_csv('ranked_profiles.csv', index=False)
    
    return sorted_data
