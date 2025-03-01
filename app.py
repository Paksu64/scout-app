from flask import Flask, request, jsonify, render_template
import pandas as pd
import csv 
from totalPoint_rank import rank_totalpoint
import flask_cors as cors
import threading


app = Flask(__name__)
cors.CORS(app)

user_inputs = []
lock = threading.Lock()

@app.route('/data_submit', methods=['POST'])
def add_input():
    profile_stats = request.json

    with lock:
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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/scout')
def scout():
    return render_template('scout.html')

@app.route('/statistics')
def statistics():
    return render_template('statistics.html')

if __name__ == '__main__':
    app.run(debug=True)