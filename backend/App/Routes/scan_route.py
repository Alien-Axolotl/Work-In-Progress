from fastapi import APIRouter

router = APIRouter()

@router.get("/scanhealth")
def scanhealth():
    return{"status" : "ok"}