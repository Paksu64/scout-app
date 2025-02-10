from flask import Flask, request, jsonify
import pandas as pd
import csv 
from backend.totalpoint_rank import rank_totalpoint
import flask_cors as CORS

app = Flask(__name__)
CORS(app)

user_inputs = []

@app.route('/data_submit', methods=['POST'])
def add_input():
    profile_stats = request.json

    if profile_stats:
        user_inputs.append(profile_stats)

        with open('scout_profiles.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([profile_stats])
            
        ranked_profiles = rank_totalpoint()
        with open("ranked_profiles.csv", mode="w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow([ranked_profiles])   
        
        return jsonify({"message": "Inputs succesfully received", "inputs": user_inputs}), 200
        
    return jsonify({"error": "Inputs not received"}), 400


@app.route("/load_rankings", methods=["POST"])
def load_rankings():
    file_path = "ranked_profiles.csv"
    data = pd.read_csv(file_path)
    rankings = data.to_dict(orient="records")
    
    return jsonify({"status": "success", "rankings": rankings})
    

@app.route('/data_view', methods=['GET'])
def get_inputs():
    return jsonify({"inputs": user_inputs}), 200

if __name__ == '__main__':
    app.run(debug=True)