from pydantic import BaseModel
from typing import List
from datetime import date

class Item(BaseModel):
    title: str
    detail: str
    purchasedAt: date
    quantity: int
    cost: int
    img: str

class BatchRequest(BaseModel):
    items: List[Item]