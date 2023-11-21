'use client';
import { IconButton } from '@/components/buttons/IconButton';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { Pagination } from '@/components/Pagination';
import { AddTasksTable } from '@/components/tables/AddTaskTable';
import { FilterEnum } from '@/enums/filterEnum';
import { SortingEnum } from '@/enums/sortingEnum';
import { useTaskService } from '@/hooks/useTaskService';
import { QueryObject } from '@/interfaces/taskTypes';
import { Dispatch, useEffect, useState } from 'react';
import { ControlPanel } from './ControlPanel';
import { TaskTable } from './TaskTable';

const defaultPerPage = 5;

export default function TaskBoardPage() {
  const [queryObject, setQueryObject] = useState<QueryObject>({
    page: 0,
    perPage: defaultPerPage,
    sorting: SortingEnum.Dsc,
    filter: FilterEnum.All,
  });
  //All updates of tasks triggered by change of queryObject inside of useTaskService
  const { tasksData, addNewTask, deleteTask, updateTask } = useTaskService(queryObject);
  const [total, setTotal] = useState(0);

  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    tasksData && setTotal(tasksData.total);
  }, [tasksData]);

  return (
    <div className=' h-full px-5 sm:px-10 md:px-28 pt-10 relative'>
      <ControlPanel queryObject={queryObject} setQueryObject={setQueryObject} />

      <div className=' h-max-[95%] flex flex-col'>
        <div className='overflow-auto flex-grow'>
          <div className='min-w-full'>
            {tasksData && (
              <TaskTable tasks={tasksData.tasks} deleteTask={deleteTask} updateTask={updateTask} />
            )}
          </div>
        </div>
        {addingTask ? (
          <AddTasksTable
            setAddingTask={setAddingTask}
            addNewTask={async (t) => {
              await addNewTask(t);
            }}
          />
        ) : (
          <div>
            <AddNewTaskButton setAddingTask={setAddingTask} />
          </div>
        )}
      </div>
      <div className='py-6 px-5 sm:px-10 md:px-28 absolute bottom-0 left-0 w-full'>
        <Pagination q={queryObject} setQueryObject={setQueryObject} total={total} />
      </div>
    </div>
  );
}

function AddNewTaskButton({ setAddingTask }: { setAddingTask: Dispatch<boolean> }) {
  return (
    <IconButton roundedValue='sm' onClick={() => setAddingTask(true)}>
      <div className={`flex hover:bg-indigo-200 px-2 rounded-sm`}>
        <PlusIcon />
        <span>Add new task</span>
      </div>
    </IconButton>
  );
}
