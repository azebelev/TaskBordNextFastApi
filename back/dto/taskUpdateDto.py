from pydantic import BaseModel


class TaskUpdateDto(BaseModel):
    id: int
    user_id: int
    description: str
    priority: int
    completed: bool
