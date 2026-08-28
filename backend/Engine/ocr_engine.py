import os
import json
import cv2
import pytesseract

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TEST_IMAGE_DIR = os.path.join(SCRIPT_DIR, "test_images")
DEBUG_DIR = os.path.join(SCRIPT_DIR, "debug")
OPERATORS_JSON_PATH = os.path.join(SCRIPT_DIR, "backend", "App", "Data", "operators.json")

