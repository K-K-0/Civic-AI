from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt, JWTError

SECRET_KEY = "superkey"
ALGORITHM = "HS256"

security = HTTPBearer()
def get_current_user(token=Depends(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])

        user_id = payload.get("user_id")

        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="invalid user"
            )

        return user_id
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail='invalid user'
        )