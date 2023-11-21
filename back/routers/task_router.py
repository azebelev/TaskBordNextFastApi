from dto.createTaskDto import CreateTaskDto
from dto.queryObjectDto import QueryObjectDto
from dto.taskUpdateDto import TaskUpdateDto
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from repositories.task_repository import task_repository
from servises.auth_service import get_current_user

task_router = APIRouter()

@task_router.get("/")
async def home( 
    query_object: QueryObjectDto = Depends(),
    current_user: dict = Depends(get_current_user)):

    taskData = task_repository.get_tasks( current_user.get("user_id"), query_object)

    return JSONResponse(content=jsonable_encoder(taskData) , status_code=200)

@task_router.post("/")
def add(task_data: CreateTaskDto, current_user: dict = Depends(get_current_user)):
    task_repository.create_task(task_data, current_user.get("user_id"))

    return Response(status_code=201)

@task_router.patch("/")
def update_task(task_dto: TaskUpdateDto):
    result = task_repository.update_task(task_dto)
    
    if result is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return Response(status_code=204)

@task_router.delete("/{task_id}")
def add(task_id: int):
    result = task_repository.delete_task(task_id)
    
    if result is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return Response(status_code=204)
