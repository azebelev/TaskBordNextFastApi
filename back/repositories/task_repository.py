from sqlalchemy.orm import Session
from dto.queryObjectDto import QueryObjectDto
from dto.taskUpdateDto import TaskUpdateDto
from enums.filterEnum import FilterEnum
from enums.sortingEnum import SortingEnum
from models.task import Task
from database.database import get_db
from dto.createTaskDto import CreateTaskDto

class TaskRepository:
    def __init__(self):
        self.db: Session = get_db().__next__()

    def get_tasks(self, user_id: int,query_object: QueryObjectDto):

        base_query = self.db.query(Task).filter(Task.user_id == user_id)

        if query_object.filter == FilterEnum.Completed:
            base_query = base_query.where(Task.completed == True)
        elif query_object.filter == FilterEnum.NotCompleted:
            base_query = base_query.where(Task.completed == False) 

        if query_object.sorting == SortingEnum.Asc:
            base_query = base_query.order_by(Task.priority.asc())
        elif query_object.sorting == SortingEnum.Dsc:
            base_query = base_query.order_by(Task.priority.desc())

        total_tasks = base_query.count()

        tasks = (
            base_query
            .order_by(Task.id)
            .offset((query_object.page) * query_object.perPage)
            .limit(query_object.perPage)
            .all()
        )
        
        return {
            "tasks": tasks,
            "total": total_tasks,
        }


    def create_task(self, task: CreateTaskDto, user_id: int):
        new_task = Task(description=task.description, priority=task.priority, user_id=user_id)
        self.db.add(new_task)
        self.db.commit()

    def update_task(self, task: TaskUpdateDto):
        existing_task = self.db.query(Task).filter(Task.id == task.id).first()
        if not existing_task:
            return None
        existing_task.description = task.description
        existing_task.priority = task.priority
        existing_task.completed = task.completed
        return True

    def delete_task(self, task_id: int):
        existing_task = self.db.query(Task).filter(Task.id == task_id).first()
        if not existing_task:
            return None

        self.db.delete(existing_task)
        self.db.commit()
        return True

task_repository = TaskRepository()
