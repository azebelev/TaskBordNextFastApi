import { Task } from '../../interfaces/taskTypes';
import React from 'react';
import { TaskRow } from './TaskRow';

export function TaskTable({
  tasks,
  deleteTask,
  updateTask,
}: {
  tasks: Task[];
  deleteTask: (taskId: number) => Promise<boolean>;
  updateTask: (task: Task) => Promise<boolean>;
}) {
  return (
    <table className='border-separate border-spacing-y-5  '>
      <colgroup>
        <col width='10%' />
        <col width='75%' />
        <col width='5%' />
        <col width='10%' />
      </colgroup>
      <tbody>
        {tasks.map((t, i) => (
          <React.Fragment key={i}>
            <TaskRow key={i} task={t} deleteTask={deleteTask} updateTask={updateTask} />
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
