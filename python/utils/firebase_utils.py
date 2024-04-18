import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from firebase_admin import firestore_async
import os
import asyncio


# Initialize Firebase Admin SDK
cred = credentials.Certificate(
    'podkashvani-firebase-adminsdk-9hmbn-90ba731b4a.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'podkashvani.appspot.com'
})
db = firestore_async.client()


def upload_file(src_path, file_name):
    print('Uploading files to Firebase Storage...')
    file_path = src_path
    try:
        bucket = storage.bucket()
        blob = bucket.blob(file_name)
        blob.upload_from_filename(file_path)
    except Exception as e:
        print(e)
        print('Error uploading files to Firebase Storage!')

def get_file(name, dst_path = 'uploads'):
    if not os.path.isdir(dst_path):
        os.mkdir(dst_path)
    try:
        bucket = storage.bucket()
        folder_name = 'images'
        blob = bucket.blob(folder_name + '/' + name)
        blob.download_to_filename(filename=dst_path+'/'+name)
    except Exception as e:
        print(e)
        print('Error downloading files from Firebase Storage!')
    
    return dst_path+'/'+name


async def firestore_upload(podcast_name, context):
    print('Uploading files to Firebase Firestore...')
    audio_file_no = len(os.listdir(os.path.join('audios', podcast_name)))
    data = {
        "podcast_name": podcast_name,
        "audio_file_no": audio_file_no,
        "context": context
    }
    print(data)
    for con in context:
        data = {
        "podcast_name": podcast_name,
        "summary": con["summary"],
        "episode_duration": con["episode_duration"],
    }
        try:
            await db.collection(podcast_name).document(con["episode_file"]).set(data)
        except Exception as e:
            print(e)
            print('Error uploading files to Firebase Firestore!')

def update_user(user_id, podcast_name):
    print('Updating user data...')
    try:
        user_ref = db.collection('users').document(user_id)
        user_ref.update({
            "podcasts": firestore_async.ArrayUnion([podcast_name])
        })
    except Exception as e:
        print(e)
        print('Error updating user data!')