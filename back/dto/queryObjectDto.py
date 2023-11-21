from enums.filterEnum import FilterEnum
from enums.sortingEnum import SortingEnum
from fastapi import Query
from pydantic import BaseModel


class QueryObjectDto(BaseModel):
    page: int = Query(..., description="Page number", ge=0)
    perPage: int = Query(..., description="Items per page", ge=1, le=100)
    sorting: SortingEnum = Query(..., description="Sorting option")
    filter: FilterEnum = Query(..., description="Filter option")

