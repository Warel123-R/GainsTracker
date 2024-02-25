import cv2

import openfoodfacts
# https://github.com/openfoodfacts/openfoodfacts-python

api = openfoodfacts.API()

delay = 1
window_name = 'OpenCV Barcode'
bd = cv2.barcode.BarcodeDetector()

# Capture live feed from camera
cap = cv2.VideoCapture(0)

capturing = True  # Flag to indicate if capturing is enabled
cv2.namedWindow('frame')

while True:
    ret, frame = cap.read()

    if ret:
        ret_bc, decoded_info, _, points = bd.detectAndDecodeWithType(frame)
        if ret_bc:
            frame = cv2.polylines(frame, points.astype(int), True, (0, 255, 0), 3)
            for s, p in zip(decoded_info, points):
                if s:
                    code = s
                    print(api.product.get(code, fields=["code", "product_name"]))
                    frame = cv2.putText(frame, s, p[1].astype(int),
                                        cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 2, cv2.LINE_AA)
        cv2.imshow(window_name, frame)

    if cv2.waitKey(delay) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
