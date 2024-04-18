from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS # Import CORS from flask_cors
import os


app = Flask(__name__)

# app.config['UPLOAD_FOLDER'] = 'python/uploads/'
app.config['UPLOAD_FOLDER'] = 'uploads/'
# Enable CORS for all routes
CORS(app)

@app.route('/', methods=['GET'])
def root():
    return {"Hello": os.listdir('uploads')}

@app.route('/test', methods=['GET'])
def test():
    return {"Test": "Works"}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']

    filename = request.form.get('filename')
    prompt = request.form.get('prompt')

    if not filename or not prompt:
        return jsonify({"error": "Filename or prompt not provided"}), 400
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({
            "filename": filename,
            "prompt": prompt
        }), 200


if __name__ == '__main__':
    app.run(debug=True)