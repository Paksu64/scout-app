import pandas as pd
import ast

def rank_totalpoint():
    data = pd.read_csv('rankingData.csv', header=None)
    data_dicts = [ast.literal_eval(row[0]) for index, row in data.iterrows()]

    data_df = pd.DataFrame(data_dicts)

    sorted_data = data_df.sort_values(by='totalPoints', ascending=False)

    return sorted_data
