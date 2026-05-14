from fastapi import APIRouter

router = APIRouter()

@router.get('/')
def get_complaints():
    return { 'message': "get complaints" }
