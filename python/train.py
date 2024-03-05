import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from torchvision.datasets import CocoCaptions
import torchvision.transforms as transforms
from torchvision.models import vgg16
from torch.utils.data import DataLoader
import numpy as np
import matplotlib.pyplot as plt
import argparse
import os
from perceptual import LossNetwork
from transformers import CLIPTextModel, CLIPTokenizer
from dataloader import CocoDataset
# from model import model
IMG_SIZE = 512

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print('Device:', device)

parser = argparse.ArgumentParser(description='Image Colouriser Training')
parser.add_argument('--epochs', type=int, default=100, help='number of epochs')
parser.add_argument('--lr', type=float, default=0.001, help='learning rate')
parser.add_argument('--data_path', type=str, default='.../datasets/coco_train_2017/', help='path to dataset')
parser.add_argument('--batch_size', type=int, default=64, help='batch size')
parser.add_argument('--save_dir', type=str, default='models', help='directory to save models')
parser.add_argument('--checkpoint', type=str, default=None, help='directory to saved models')
parser.add_argument('--resume', type=bool, default=False, help='resume training')
parser.add_argument('-lambda_loss', help='Set the lambda in loss function', default=0.04, type=float)
args = parser.parse_args()


trasformation = transforms.Compose([
    transforms.Resize([IMG_SIZE, IMG_SIZE]),
    transforms.ToTensor(),
])


def train(train_loader, model, loss_network, optimizer):

    for images, captions in enumerate(train_loader):
        images = images.to(device)
        print(images.shape)
        captions = captions.to(device)
        outputs = model(images, captions)

        smooth_loss = F.smooth_l1_loss(outputs, images)
        perceptual_loss = loss_network(outputs, images)
        loss = smooth_loss + args.lambda_loss*perceptual_loss
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        return loss



def main():
    #Import and preprocess data
    #Trainloader returns list of format(image(tensor), caption(list of strings))

    data = CocoDataset(root=os.path.join(args.data_path,'dataset'), annFile= os.path.join(args.data_path, 'annonation', 'selected_train.json'), transform=trasformation)
    # data = CocoCaptions(root=os.path.join(args.data_path,'dataset'), annFile= os.path.join(args.data_path, 'annonation', 'selected_captions.json'), transform=trasformation)
    train_loader = DataLoader(data, batch_size=args.batch_size,collate_fn=lambda x: x, shuffle=True)

    for images, captions in enumerate(train_loader):
        
        print(images)
        print(captions)
        if images == 0:
            break
    #Loading CLIP model from huggingface
    tokenizer = CLIPTokenizer.from_pretrained("openai/clip-vit-large-patch14")
    text_encoder = CLIPTextModel.from_pretrained("openai/clip-vit-large-patch14").to(device)


    #Load perceptual loss network and optimizer
    vgg_model = vgg16(weights= 'VGG16_Weights.IMAGENET1K_V1').features[:16]
    vgg_model = vgg_model.to(device)
    for param in vgg_model.parameters():
        param.requires_grad = False
    loss_network = LossNetwork(vgg_model)
    loss_network.eval()
    optimizer = torch.optim.Adam(net.parameters(), lr=args.lr)

    #Resume from checkpoint
    if args.resume:
        checkpoint = torch.load(os.path.join(args.checkpoint, args.model+'.pth'))
        net = checkpoint['net']
        best_acc = checkpoint['acc']
        start_epoch = checkpoint['epoch']
        print('Resuming from checkpoint...')
        print(f'Best accuracy: {best_acc} Start training at epoch: {start_epoch}')
    else:
        # net = model()
        print('Building model from scratch...')
        start_epoch = 0
        best_acc = 0
    net = net.to(device)
    if device == 'cuda':
        net = torch.nn.DataParallel(net)

    #Training loop
    loss = 0
    for epoch in range(start_epoch, start_epoch+args.epochs):
        for images, captions in enumerate(train_loader):
            images = images.to(device)
            text_input = tokenizer(captions, padding="max_length", max_length=tokenizer.model_max_length, truncation=True, return_tensors="pt")
            text_embeddings = text_encoder(text_input.input_ids.to(device))[0]
            captions = captions.to(device)
            outputs = net(images, captions)

            smooth_loss = F.smooth_l1_loss(outputs, images)
            perceptual_loss = loss_network(outputs, images)
            loss = smooth_loss + args.lambda_loss*perceptual_loss
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
                
            print('Epoch: {}/{}, Loss: {:.4f}'.format(epoch, start_epoch+args.epochs, loss))

        if epoch % 10 == 0:
            print('Saving model...')
            state = {
                'net': net.module if device == 'cuda' else net,
                'acc': best_acc,
                'epoch': epoch,
            }
            if not os.path.isdir(args.save_dir):
                os.mkdir(args.save_dir)
            torch.save(state, os.path.join(args.save_dir, 'model.pth'))
            best_acc = 0


if __name__ == '__main__':
    main()