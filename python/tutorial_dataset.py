import json
import cv2
import numpy as np
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms, utils
import json
from PIL import Image, ImageOps
import os
from torchvision.datasets import CocoCaptions
from skimage.color import rgb2lab, lab2rgb


class MyDataset(Dataset):
    def __init__(self):
        self.data = []
        with open('./training/fill50k/prompt.json', 'rt') as f:
            for line in f:
                self.data.append(json.loads(line))

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        item = self.data[idx]

        source_filename = item['source']
        target_filename = item['target']
        prompt = item['prompt']

        source = cv2.imread('./training/fill50k/' + source_filename)
        target = cv2.imread('./training/fill50k/' + target_filename)

        # Do not forget that OpenCV read images in BGR order.
        source = cv2.cvtColor(source, cv2.COLOR_BGR2RGB)
        target = cv2.cvtColor(target, cv2.COLOR_BGR2RGB)

        # Normalize source images to [0, 1].
        source = source.astype(np.float32) / 255.0

        # Normalize target images to [-1, 1].
        target = (target.astype(np.float32) / 127.5) - 1.0

        return dict(jpg=target, txt=prompt, hint=source)

class CocoDataset(Dataset):
    def __init__(self, root, annFile, transform) -> None:
        self.root = root
        self.annFile = annFile
        self.transform = transform
        with open(annFile, 'r') as f:
            self.data = json.load(f)
        self.ids = list(sorted(self.data.keys()))
        
    def __len__(self):
        return len(self.ids) 
    
    def __getitem__(self, index):
        source, target = self._load_image(index)
        caption = self._load_caption(index)
        return dict(jpg=target, txt=caption, hint=source)
    
    def _load_image(self, index):
        path = self.ids[index]
        img = Image.open(os.path.join(self.root, path)).convert("RGB")
#         img = cv2.imread(os.path.join(self.root, path))
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        bw_img = ImageOps.grayscale(img)
        bw_img = bw_img.astype(np.float32) / 255.0

        # Normalize target images to [-1, 1].
        img = (img.astype(np.float32) / 127.5) - 1.0
        img = self.transform(img)
        bw_img = self.transform(bw_img)
#         bw_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        # img_lab = rgb2lab(img).astype("float32")  # Converting RGB to L*a*b
        # img_lab = transforms.ToTensor()(img_lab)
        # L = img_lab[[0], ...] / 50. - 1.  # Between -1 and 1
        # ab = img_lab[[1, 2], ...] / 110.  # Between -1 and 1
        # return {"L": L, "ab": ab, 'img': img}
        return bw_img, img

    def _load_caption(self, index):
        return self.data[self.ids[index]]
    