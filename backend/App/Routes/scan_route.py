import cv2
import mss
import numpy as np
from fastapi import APIRouter
from Engine.ocr_engine import extract_tags
from Engine.find_best import find_best_combination


router = APIRouter()

@router.get("/scan")
def scan():
    with mss.mss() as sct:
        shot = sct.grab(sct.monitors[0])
    image = cv2.cvtColor(np.array(shot), cv2.COLOR_BGRA2BGR) 
    tags = extract_tags(image)
    print("scan result", tags)
    stars, best_combination = find_best_combination(tags)
    print("best result", stars, best_combination)
    return {"status": "ok", "stars": stars, "best_combination": best_combination}
