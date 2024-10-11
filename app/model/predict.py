from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    date: str
    img: str
    name: str
    option: str
    price: str

class Item(BaseModel):
    date: str
    products: List[Product]

class BatchRequest(BaseModel):
    items: List[Item]


    
