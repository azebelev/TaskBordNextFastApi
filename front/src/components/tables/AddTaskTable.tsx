import { Dispatch, useState } from 'react';
import { NewTaskSubmitCell } from './cells/NewTaskSubmitCell';
import { TaskPriorityCell } from './cells/TaskPriorityCell';
import { TextAreaCell } from './cells/TextAreaCell';

export type NewTaskDto = { description: string; priority: number };

export function AddTasksTable({
  setAddingTask,
  addNewTask,
}: {
  setAddingTask: Dispatch<boolean>;
  addNewTask: (t: NewTaskDto) => Promise<void>;
}) {
  const [newTask, setNewTask] = useState({ description: '', priority: 1 });

  const setDescription = (d: string) => setNewTask((prev) => ({ ...prev, description: d }));
  const setPriority = (p: number) => setNewTask((prev) => ({ ...prev, priority: p }));

  const handleSubmit = async () => {
    await addNewTask(newTask);
    setAddingTask(false);
  };

  return (
    <table className=' w-full border-separate border-spacing-y-5 '>
      <colgroup>
        <col width='10%' />
        <col width='75%' />
        <col width='5%' />
        <col width='10%' />
      </colgroup>
      <tbody>
        <tr className=' rounded-md shadow-md bg-white'>
          <td className='p-2'>new</td>
          <td className='pb-1 px-2 pt-2'>
            <TextAreaCell setDescription={setDescription} description={newTask.description} />
          </td>
          <td className='p-2 '>
            <TaskPriorityCell priority={newTask.priority} setPriority={setPriority} />
          </td>
          <td className='p-2'>
            <NewTaskSubmitCell onCancel={() => setAddingTask(false)} onSubmit={handleSubmit} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
