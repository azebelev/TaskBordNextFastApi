from pydantic import BaseModel

class CreateTaskDto(BaseModel):
    description: str
    priority: int