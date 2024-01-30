from torch.utils.data import Dataset, DataLoader
from torchvision import transforms, utils
import json
import PIL.Image as Image
import os
from torchvision.datasets import CocoCaptions

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
        id = self.ids[index]
        image = self._load_image(index)
        caption = self._load_caption(index)
        if self.transform:
            image = self.transform(image)
        return image, caption
    
    def _load_image(self, index):
        path = self.ids[index]
        return Image.open(os.path.join(self.root, path)).convert("RGB")

    def _load_caption(self, index):
        # print(self.data[self.ids[index]])
        return self.data[self.ids[index]]