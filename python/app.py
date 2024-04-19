from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS # Import CORS from flask_cors
import random
import os
import cv2
import einops
import numpy as np
import torch
from pytorch_lightning import seed_everything

from utils.data import HWC3, apply_color, resize_image
from utils.ddim import DDIMSampler
from utils.model import create_model, load_state_dict

model = create_model('/kaggle/working/Meap-Project/python/cldm_v21.yaml').cpu()
model.load_state_dict(load_state_dict(
    '/kaggle/working/Meap-Project/python/colorizenet-sd21.ckpt', location='cuda'))
model = model.cuda()
ddim_sampler = DDIMSampler(model)
seed = 1294574436
seed_everything(seed)
prompt = "Colorize this image"
n_prompt = "low quality, grainy, blurry, noisy image"
guess_mode = False
strength = 1.0
eta = 0.0
ddim_steps = 20
scale = 9.0

def colourize_image(filename, prompt):
    input_image = cv2.imread(os.path.join('uploads', filename))
    input_image = HWC3(input_image)
    img = resize_image(input_image, resolution=512)
    H, W, C = img.shape

    num_samples = 1
    control = torch.from_numpy(img.copy()).float().cuda() / 255.0
    control = torch.stack([control for _ in range(num_samples)], dim=0)
    control = einops.rearrange(control, 'b h w c -> b c h w').clone()
    cond = {"c_concat": [control], "c_crossattn": [
        model.get_learned_conditioning([prompt] * num_samples)]}
    un_cond = {"c_concat": None if guess_mode else [control], "c_crossattn": [
        model.get_learned_conditioning([n_prompt] * num_samples)]}
    shape = (4, H // 8, W // 8)

    model.control_scales = [strength * (0.825 ** float(12 - i)) for i in range(13)] if guess_mode else (
        [strength] * 13)
    samples, intermediates = ddim_sampler.sample(ddim_steps, num_samples,
                                                shape, cond, verbose=False, eta=eta,
                                                unconditional_guidance_scale=scale,
                                                unconditional_conditioning=un_cond)

    x_samples = model.decode_first_stage(samples)
    x_samples = (einops.rearrange(x_samples, 'b c h w -> b h w c')
                * 127.5 + 127.5).cpu().numpy().clip(0, 255).astype(np.uint8)

    results = [x_samples[i] for i in range(num_samples)]
    colored_results = [apply_color(img, result) for result in results]
    for i, result in enumerate(colored_results):
        present_file= sorted(os.listdir('/kaggle/working/Meap-Project/python/results'))
        if present_file:
            present_file = max([int(file.split('_')[-1].split('.')[0]) for file in present_file])
            i = present_file + 1
        
        file_name = f"/kaggle/working/Meap-Project/python/results/colorized_{i}.jpg"
        cv2.imwrite(file_name, cv2.cvtColor(result, cv2.COLOR_RGB2BGR))
    return file_name


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
    app.run(debug=True)
