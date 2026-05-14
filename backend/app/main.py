from fastapi import FastAPI
from app.database import engine, base
from app.models.complaints import Complaint
from app.models.user import User
from app.routes import complaints, auth

app = FastAPI()


@app.get("/")
def home():
    return { 'message': 'Platform is running...' }


app.include_router(
    complaints.router,
    prefix='/complaints',
    tags=['complaints']
)

app.include_router(
    auth.router,
    prefix='/auth',
    tags=['Authentication']
)

base.metadata.create_all(bind=engine)