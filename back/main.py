import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from alembic import command
from alembic.config import Config
from routers.auth_router import auth_router
from routers.task_router import task_router
from database.database import Base, engine

load_dotenv()

# alembic_cfg = Config("alembic.ini")

# alembic_cfg.set_main_option("sqlalchemy.url", os.environ["DB_URL"])

# command.upgrade(alembic_cfg, "head", sql=False, tag=None)

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/fastapi/auth", tags=["Authentication"])
app.include_router(task_router, prefix="/fastapi", tags=["Tasks"])
