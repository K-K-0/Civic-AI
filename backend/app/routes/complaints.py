from fastapi import APIRouter, Depends
from app.utils.dependencies import get_current_user
router = APIRouter()

@router.get('/')
def get_complaints(current_user=Depends(get_current_user)):
    return { 
        "user_id": current_user, 
        "message": "get complaints"
    }
