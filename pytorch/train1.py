import json
from nltk_utils import tokenize, stem, bag_of_words
import numpy as np

import torch 
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split

from model import neuralNet

# load intents from json file
with open('intents.json', 'r') as f:
    intents = json.load(f)

# tokenize, stem, and add to vocabulary
all_words = []
tags = []
xy = []
for intent in intents['intents']:
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        w = tokenize(pattern)
        all_words.extend(w)
        xy.append((w,tag))

ignore_words = ['?', '!', '.', ',']
all_words = [stem(w) for w in all_words if w not in ignore_words]
all_words = sorted(set(all_words))   #remove duplicate words by sorting
tags = sorted(set(tags))

# make sure each pattern has a corresponding tag
patterns = [p[0] for p in xy]
tags_set = set(tags)
for pattern in patterns:
    found_tag = False
    for intent in intents['intents']:
        if intent['tag'] in tags_set and pattern in intent['patterns']:
            found_tag = True
            break
    if not found_tag:
        print(f"Pattern {pattern} is not labeled with any tag.")
        
# create training and validation sets
x_train, x_val, y_train, y_val = train_test_split(xy, tags, test_size=0.2, random_state=42)

# convert data to bag of words
def create_dataset(data, all_words, tags):
    x = []
    y = []
    for (pattern_sentense, tag) in data:
        bag = bag_of_words(pattern_sentense, all_words)
        x.append(bag)

        label = tags.index(tag)
        y.append(label)

    x = np.array(x)
    y = np.array(y)
    return x, y

x_train, y_train = create_dataset(x_train, all_words, tags)
x_val, y_val = create_dataset(x_val, all_words, tags)

# Hyperparameters
num_epochs = 500
batch_size = 8
learning_rate = 0.001
input_size = len(all_words)
hidden_size = 8
output_size = len(tags)

# create dataset and dataloader
class ChatDataset(Dataset):
    def __init__(self, x, y):
        self.n_samples = len(x)
        self.x_data = torch.from_numpy(x).float()
        self.y_data = torch.from_numpy(y).long()

    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    def __len__(self):
        return self.n_samples

train_dataset = ChatDataset(x_train, y_train)
train_loader = DataLoader(dataset=train_dataset, batch_size=batch_size, shuffle=True)

val_dataset = ChatDataset(x_val, y_val)
val_loader = DataLoader(dataset=val_dataset, batch_size=batch_size, shuffle=False)

# device configuration
device  = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# initialize the neural net
model = neuralNet(input_size, hidden_size, output_size).to(device)

# loss and optimizer
# loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

# training loop
for epoch in range(num_epochs):
    for (words, labels) in train_loader:
        words = words.to(device)
        labels = labels.to(device)

        # forward pass
        outputs = model(words)
        loss = criterion(outputs, labels)

        # backward and optimize
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    if (epoch+1) % 100 == 0:
        print (f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# save the model
FILE = "model.pth"
torch.save(model.state_dict(), FILE)
print('Model trained and saved to ', FILE)

