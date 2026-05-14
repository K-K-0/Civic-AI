import bcrypt
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "superkey"
ALGORITHM = "HS256"

def hash_password(password: str):
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_bytes = bcrypt.hashpw(pwd_bytes, salt)
    return hashed_bytes.decode('utf-8')

def verify_password(plain: str, hashed: str):
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))

def create_token(data: dict):
    token = data.copy()

    expire = datetime.utcnow() + timedelta(hours=24)

    token.update({'exp': expire})

    return jwt.encode(
        token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )