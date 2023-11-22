import { CheckBoxCell } from '../../components/tables/cells/CheckBoxCell';
import { DeleteCell } from '../../components/tables/cells/DeleteCell';
import { TaskPriorityCell } from '../../components/tables/cells/TaskPriorityCell';
import { TextAreaCell } from '../../components/tables/cells/TextAreaCell';
import { Task } from '../../interfaces/taskTypes';
import { useState } from 'react';

export function TaskRow({
  task,
  updateTask,
  deleteTask,
}: {
  task: Task;
  deleteTask: (taskId: number) => Promise<boolean>;
  updateTask: (task: Task) => Promise<boolean>;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (key: keyof Task, value: any) => {
    try {
      setLoading(true);
      await updateTask({ ...task, ...{ [key]: value } });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTask(task.id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <tr className={'rounded-md shadow-md bg-white relative'}>
        <td className='p-2 relative'>
          <div className=' absolute left-[60px] bottom-4'>
            <Loader loading={loading} />
          </div>
          <CheckBoxCell
            isChecked={task.completed}
            handleChange={() => {
              handleUpdate('completed', !task.completed);
            }}
          />
        </td>
        <td className='pb-1 px-2 pt-2 relative'>
          <TextAreaCell
            description={task.description}
            setDescription={(d) => handleUpdate('description', d)}
          />
        </td>
        <td className='p-2 '>
          <TaskPriorityCell
            priority={task.priority}
            setPriority={(p) => handleUpdate('priority', p)}
          />
        </td>
        <td className='p-2'>
          <DeleteCell handleDelete={handleDelete} />
        </td>
      </tr>
    </>
  );
}

function Loader({ loading }: { loading: boolean }) {
  return loading ? (
    <div className='flex items-center justify-center'>
      <div className='animate-spin rounded-full border-t-4 border-indigo-700 border-solid h-5 w-5'></div>
    </div>
  ) : (
    <></>
  );
}
