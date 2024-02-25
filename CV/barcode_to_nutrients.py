import cv2
import openfoodfacts

import json
import requests

from time import sleep

url = "http://localhost:5004/nutrients"
# https://github.com/openfoodfacts/openfoodfacts-python

api = openfoodfacts.API()

delay = 1
window_name = 'OpenCV Barcode'
bd = cv2.barcode.BarcodeDetector()

# Capture live feed from camera
cap = cv2.VideoCapture(0)

capturing = True  # Flag to indicate if capturing is enabled
cv2.namedWindow('frame')

def readFrame():
    while True:
        ret, frame = cap.read()

        if ret:
            ret_bc, decoded_info, _, points = bd.detectAndDecodeWithType(frame)
            if ret_bc:
                frame = cv2.polylines(frame, points.astype(int), True, (0, 255, 0), 3)
                for s, p in zip(decoded_info, points):
                    if s:
                        code = s
                        frame = cv2.putText(frame, s, p[1].astype(int),
                                            cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 2, cv2.LINE_AA)
                        return s
            cv2.imshow(window_name, frame)

        if cv2.waitKey(delay) & 0xFF == ord('q'):
            break

def fill_null(dic, key):
    if key not in dic.keys():
        dic[key] = None

code = readFrame()

good_barcode = False
while not good_barcode:
    print("Searching for barcode...")
    try:
        product = api.product.get(code, fields=["product_name", "quantity", "nutriments", "nutrition_data_per", "nutrition_data_prepared_per"])
        good_barcode = True
    except requests.exceptions.HTTPError:
        sleep(1)
        code = readFrame()

cap.release()
cv2.destroyAllWindows()

product = product["product"]

fields = ["quantity", "nutrition_data_per", "nutrition_data_prepared_per"]
for field in fields:
    fill_null(product, field)

nutrients = ["carbohydrates", "proteins", "sodium", "energy-kcal", "saturated-fat"]
for nutrient in nutrients:
    fill_null(product["nutriments"], nutrient)

product["nutriments"] = {nutrient: product["nutriments"][nutrient] for nutrient in nutrients}

print(json.dumps(product, sort_keys=True, indent=4))

x = requests.post(url, json = product, headers = {
    "Content-Type": "application/json"
})
print(x.text)
# weight = product["packaging_text"]