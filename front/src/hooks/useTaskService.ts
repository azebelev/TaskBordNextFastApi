import { NewTaskDto } from '../components/tables/AddTaskTable';
import { QueryObject, Task, TasksData } from '@/interfaces/taskTypes';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { headerValues, useApi } from './useApi';

export function useTaskService(queryObject: QueryObject) {
  const { data: session } = useSession();
  const api = useApi();
  const [tasksData, setTaskData] = useState<TasksData>();

  const refetch = async () => {
    const withStringValues = Object.entries(queryObject).map(([key, value]) => [
      key,
      value.toString(),
    ]);
    const query = new URLSearchParams(withStringValues);
    const res = await api.get('/', { params: query });
    setTaskData(res.data);
    return true;
  };

  const addNewTask = async (newTask: NewTaskDto) => {
    await api.post('/', newTask, { headers: headerValues.appJson });
    await refetch()
    return true;
  };

  const updateTask = async (task: Task) => {
    await api.patch('/', task, { headers: headerValues.appJson });
    await refetch()
    return true;
  };

  const deleteTask = async (taskId: number) => {
    await api.delete(`/${taskId}`);
    await refetch()
    return true;
  };
  //trigger for update data on page, filters, sorting, session
  useEffect(() => {
    session && refetch()
  },[session,queryObject])

  return { tasksData,refetch, addNewTask, updateTask, deleteTask };
}
