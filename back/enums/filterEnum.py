from enum import Enum

class FilterEnum(int, Enum):
    Completed = 0
    NotCompleted = 1
    All = 2