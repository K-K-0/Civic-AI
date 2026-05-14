from sqlalchemy import Column, Integer, String
from app.database import base


class Complaint(base):
    __tablename__ = 'complaints'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    category = Column(String)
    priority = Column(String)