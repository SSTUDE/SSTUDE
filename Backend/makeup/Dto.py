from pydantic import BaseModel

class MonthRequestDto(BaseModel):
    year: int
    month: int
    
    
class DayRequestDto(BaseModel):
    year: int
    month: int
    day: int
    