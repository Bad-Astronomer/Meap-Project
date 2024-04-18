from flask import Flask, request
from colorize import colourize_image   
app = Flask(__name__)

@app.route('/colorize', methods=['POST'])
def colorize(prompt):
    prompt = request.form.get('prompt')
    result = colourize_image(prompt=prompt)
    return result

if __name__ == '__main__':
    app.run()