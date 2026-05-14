from fastapi import APIRouter, Depends
from app.models.complaints import Complaint

from sqlalchemy.orm import session
from app.database import SessionLocal
from app.schemas.complaint import complaintCreate
from app.ml.predict import predict_complaint

from app.utils.dependencies import get_current_user


router = APIRouter()

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

@router.post('/complaint')
def create_complaint(complaint: complaintCreate, db: session=Depends(get_db), current_user=Depends(get_current_user)):
    
    prediction = predict_complaint(complaint.description)

    new_complaint = Complaint(
        title=complaint.title,
        description=complaint.description,
        category=prediction["category"],
        priority=prediction["priority"],
        sentiment=prediction["sentiment"]
    )
    
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return {
        "message": "complaint created successfully",
        'prediction': prediction
    }

@router.post('/get')
def get_complaints(db: session=Depends(get_db), current_user=Depends(get_current_user)):
    complaints = db.query(Complaint).all()
    return complaints