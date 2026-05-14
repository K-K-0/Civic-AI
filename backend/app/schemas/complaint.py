from pydantic import BaseModel

class complaintCreate(BaseModel):
    title: str
    description: str