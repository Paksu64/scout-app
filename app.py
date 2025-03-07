from flask import Flask, request, jsonify, render_template, send_file
import pandas as pd
import csv
from totalPoint_rank import rank_totalpoint
import flask_cors as cors
import threading
import os

app = Flask(__name__)
cors.CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SCOUT_CSV = os.path.join(BASE_DIR, 'scout_profiles.csv')
RANKED_CSV = os.path.join(BASE_DIR, 'ranked_profiles.csv')

user_inputs = []
lock = threading.Lock()

@app.route('/data_submit', methods=['POST'])
def add_input():
    profile_stats = request.json
    if not profile_stats:
        return jsonify({"error": "Inputs not received"}), 400

    with lock:
        user_inputs.append(profile_stats)
        fieldnames = list(profile_stats.keys())
        file_exists = os.path.exists(SCOUT_CSV)
        with open(SCOUT_CSV, mode='a', newline='', encoding='utf-8') as file:
            writer = csv.DictWriter(file, fieldnames=fieldnames)
            if not file_exists:
                writer.writeheader()
            writer.writerow(profile_stats)
            print("Inputs received")

        ranked_profiles = rank_totalpoint()
        ranked_profiles.to_csv(RANKED_CSV, index=False)
        print("Rankings saved")

        return jsonify({"message": "Inputs successfully received", "inputs": user_inputs}), 200

@app.route('/load_rankings')
def rankings():
    return send_file(RANKED_CSV, mimetype='text/csv', as_attachment=False)

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
