from pydantic import BaseModel
 
class PetPredictionResponse(BaseModel):
    isPet: bool
    confidence: float
    