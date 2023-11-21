from pydantic import BaseModel


class UserSignInDto(BaseModel):
    email: str
    first_name: str
    last_name: str
    password: str
