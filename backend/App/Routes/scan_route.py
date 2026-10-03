import cv2
import mss
import numpy as np
from fastapi import APIRouter
from pydantic import BaseModel
from Engine.ocr_engine import extract_tags

router = APIRouter()

class Roi(BaseModel):
    x: int
    y: int
    width: int
    height: int

@router.get("/scanhealth")
def scanhealth():
    return{"status" : "ok"}

@router.post("/scan")
def scan(roi: Roi):
    with mss.mss() as sct:
        shot = sct.grab({"left": roi.x, "top": roi.y, "width": roi.width, "height": roi.height})
    image = cv2.cvtColor(np.array(shot), cv2.COLOR_BGRA2BGR)
    return {"status": "ok", "tags": extract_tags(image)}
