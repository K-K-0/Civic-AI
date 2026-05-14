from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import session

from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.utils.auth import create_token, hash_password, verify_password

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/register')
def register(user: UserCreate, db: session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail='Email already existed'
        )
    
    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()

    return { 'message': 'user register successfully' }

@router.post('/login')
def login(user: UserLogin, db: session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail='Invalid email'
        )
    
    if not verify_password( user.password, db_user.password):
        raise HTTPException(
            status_code=400,
            detail='Invalid password'
        )
    
    token = create_token(
        { "user_id": db_user.id}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }