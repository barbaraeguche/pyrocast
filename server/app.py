from flask import Flask, request, jsonify
from flask_cors import CORS
from model_solution_1 import main as main_solution_1
from model_solution_2 import main as main_solution_2
from dotenv import load_dotenv
import os


# load environment variables from .env file
load_dotenv()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = Flask(__name__)

# allow CORS for specific frontend URL
CORS(app, resources={r"/api/*": {"origins": [os.getenv('FRONTEND_URL'), 'http://localhost:5173'], "methods": ["GET", "POST", "OPTIONS"]}})
app.config['UPLOAD_DIR'] = UPLOAD_DIR

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/api/upload', methods=['POST'])
def process_csv():
  files = request.files
  
  for file in files.values():
    file_path = os.path.join(app.config['UPLOAD_DIR'], file.filename)
    file.save(file_path)
  
  # run the models
  solution_1 = main_solution_1()
  solution_2 = main_solution_2()

  # remove temporary files
  for file in files.values():
    os.remove(os.path.join(app.config['UPLOAD_DIR'], file.filename))

  # remove .joblib files
  for file_name in os.listdir(os.path.dirname(__file__)):
    if file_name.endswith('.joblib'):
      os.remove(file_name)
  
  return jsonify({
    'solution_1': solution_1,
    'solution_2': solution_2
  })


# run the server
if __name__ == '__main__':
  app.run(port=5000)
    