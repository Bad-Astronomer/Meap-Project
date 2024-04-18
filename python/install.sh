curl -O https://portal.socketxp.com/download/linux/amd64/socketxp && chmod +wx socketxp && sudo mv socketxp /usr/local/bin

socketxp login eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2NjQ0NTc0MDMsImtleSI6ImQ5NGJiMzJkLTU5MjgtNDgzMC05MzExLWY5MWEyYjk2Y2RhMiJ9.yQ6jiZ-8xWXCwIbNyHpZOCbiwREvCvVKzwsJ_8Zhwcs

pip install einops
pip install open-clip-torch
pip install pytorch-lightning==1.7.7
pip install torchmetrics==0.11.4
pip install xformers
pip install gradio
pip install basicsr
pip install omegaconf
pip install firebase-admin

!pip uninstall torchtext -y
!pip install torchtext
