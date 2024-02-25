import requests

api_url = 'https://api.ocr.space/parse/image'
image_file_descriptor = open('IMG_1205.jpeg', 'rb')
files = {'image': image_file_descriptor}
r = requests.post(api_url, files=files)
print(r.json())
