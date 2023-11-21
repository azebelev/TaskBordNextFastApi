import { FilterEnum } from '@/enums/filterEnum';
import { SortingEnum } from '@/enums/sortingEnum';

export type QueryObject = {
  page: number;
  perPage: number;
  sorting: SortingEnum;
  filter: FilterEnum;
};

export type Task = {
  id: number;
  completed: boolean;
  description: string;
  priority: number;
};

export type TasksData = {
  total: number;
  tasks: Task[];
};
