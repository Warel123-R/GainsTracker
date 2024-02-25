import cv2
import pytesseract

# # Path to Tesseract executable (change this according to your installation)
# pytesseract.pytesseract.tesseract_cmd = r'<path_to_tesseract_executable>'
pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/bin/tesseract'
# Function to handle key press events
def key_event(key):
    global capturing, frame

    if key == ord(' '):  # If spacebar is pressed
        if capturing:
            # Capture the region around the click point
            roi = frame.copy()  # Copy the current frame

            # Preprocess the region
            # gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
            # Add more preprocessing steps here as needed

            # Perform OCR on the region
            print(pytesseract.image_to_data(roi))
            text = pytesseract.image_to_string(roi)
            print("hi")
            # Print the extracted text
            print("Extracted Text:", text)
        
        capturing = not capturing  # Toggle capturing state
        return True
    elif key == 27:  # If Escape key is pressed
        return True  # Break out of the loop

    return False

# Capture live feed from camera
cap = cv2.VideoCapture(0)

capturing = True  # Flag to indicate if capturing is enabled
cv2.namedWindow('frame')

while True:
    ret, frame = cap.read()
    if not ret:
        break

    if capturing:
        # Display the frame
        cv2.imshow('frame', frame)

    key = cv2.waitKey(1)
    if key_event(key):
        break

cap.release()
cv2.destroyAllWindows()
