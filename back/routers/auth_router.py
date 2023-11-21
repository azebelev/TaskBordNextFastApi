from dto.userLoginDto import UserLoginDto
from dto.userSignInDto import UserSignInDto
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from models.user import User
from repositories.user_repository import user_repository
from servises.auth_service import (authenticate_user, create_access_token,
                                   get_password_hash)

auth_router = APIRouter()

@auth_router.post("/login")
async def login_for_access_token(login_data:UserLoginDto):
    user_data = authenticate_user(login_data.email, login_data.password)
    if user_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(user_data.id, user_data.email)
    return JSONResponse(
        content={"token": access_token,"id":user_data.id, "name": user_data.first_name+" "+user_data.last_name} ,
        status_code=200)

@auth_router.post("/register")
async def register_user(dto: UserSignInDto):
    existing_user = user_repository.get_user_by_email(dto.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_password = get_password_hash(dto.password)

    new_user = User(
        email=dto.email,
        first_name=dto.first_name,
        last_name=dto.last_name,
        password_hash=hashed_password,
    )

    user_repository.add_user(new_user)
    
    return JSONResponse(content='User created', status_code=201)
