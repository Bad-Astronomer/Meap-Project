from flask import Flask, request
from colorize import colourize_image   
import os
app = Flask(__name__)

@app.route('/colorize', methods=['POST'])
def colorize(prompt):
    prompt = request.form.get('prompt')
    filname = request.files['filename']
    result = colourize_image(filename=filname, prompt=prompt)
    return result

if __name__ == '__main__':
    os.isdir('/kaggle/working/Meap-Project/python/uploads') or os.mkdir('/kaggle/working/Meap-Project/python/uploads')
    os.isdir('/kaggle/working/Meap-Project/python/results') or os.mkdir('/kaggle/working/Meap-Project/python/results')
    app.run()
