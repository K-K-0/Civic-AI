from fastapi import FastAPI
from app.database import engine, base
from app.models.complaints import Complaint
from app.models.user import User
from app.routes import complaints, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return { 'message': 'Platform is running...' }


base.metadata.create_all(bind=engine)