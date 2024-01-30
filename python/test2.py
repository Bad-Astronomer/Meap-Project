import json
import time
# Path to the selected_train.json file
selected_train_path = "../datasets/coco_train_2017/annonation/selected_train.json"

# Path to the another json file with the same image name
another_json_path = "../datasets/coco_train_2017/annonation/captions_train2017.json"

# Path to the output json file
output_json_path = "output.json"

# Load the selected_train.json file
with open(selected_train_path, "r") as selected_train_file:
    selected_train_data = json.load(selected_train_file)

# Load the another json file
with open(another_json_path, "r") as another_json_file:
    another_data = json.load(another_json_file)

# Create a new dictionary to store the combined data
combined_data = {'info': another_data['info'], 'licenses': another_data['licenses'], 'images': [], 'annotations': []}
another_data = {'images': another_data['images'], 'annotations': another_data['annotations']}


def test(text):
    return text.lower().replace(' ', '').replace('.', '').replace(',', '').replace("'", '').replace('"', '').replace('?', '').replace('!', '')
selected = []
selected_1 = []
for key3, val3 in selected_train_data.items():
    selected.append(key3)
    selected_1.append(list(map(test, val3)))


for key, val in another_data.items():
    if key == 'images':
        for i in range(len(val)):
            if val[i]['file_name'] in selected:
                combined_data['images'].append(val[i])
                print('image data', val[i])
                id = val[i]['id']
                for annotation in another_data['annotations']:
                    if annotation['image_id'] == id:
                        text = test(annotation['caption'])

                        if text in selected_1[selected.index(val[i]['file_name'])]:
                            combined_data['annotations'].append(annotation)
                            print('annotation',annotation)




for image, caption in selected_train_data:
    

# Write the combined data to the output json file
with open(output_json_path, "w") as output_json_file:
    json.dump(combined_data, output_json_file)
