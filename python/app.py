from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS # Import CORS from flask_cors
import os

from colorize import colourize_image  


app = Flask(__name__)

# app.config['UPLOAD_FOLDER'] = 'python/uploads/'
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['RESULT_FOLDER'] = 'results/'

# Enable CORS for all routes
CORS(app)

@app.route('/', methods=['GET'])
def root():
    return {"Hello": os.listdir('uploads')}

@app.route('/test', methods=['GET'])
def test():
    return {"Test": "Works"}


def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/result/<filename>')
def uploaded_file(filename):
    if os.path.isfile(os.path.join(app.config['RESULT_FOLDER'], filename)):
        return send_from_directory(app.config['RESULT_FOLDER'], filename)
    else:
        return 'File not found', 404

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']

    filename = request.form.get('filename')
    prompt = request.form.get('prompt')
    
    print(filename)
    print(prompt)
    
    if not filename or not prompt:
        return jsonify({"error": "Filename or prompt not provided"}), 400
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if not allowed_file(filename):
        return jsonify({"error": "Invalid File Format"}), 400
    
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        result = colourize_image(filename=filename, prompt=prompt)
        return jsonify({
            "filename": result,
            "prompt": prompt
        }), 200

    
if __name__ == '__main__':
    os.path.exists('uploads') or os.mkdir('uploads')
    os.path.exists('results') or os.mkdir('results')
    app.run()