import { useEffect, useRef, useState } from 'react';

export function TaskPriorityCell({
  priority,
  setPriority,
}: {
  priority: number;
  setPriority: (p: number) => void;
}) {
  const [localPriority, setLocalPriority] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ref.current?.blur();
    setPriority(+localPriority);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    if (/^\d+$/.test(inputValue) || inputValue === '') {
      setLocalPriority(inputValue);
    }
  };

  useEffect(() => {
     setLocalPriority(priority.toString())
  },[priority])

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={ref}
        name='priority'
        value={localPriority}
        onChange={handleChange}
        className='p-0.5 h-8 rounded-sm w-14 md:w-36 focus:outline-indigo-200 appearance-none'
        placeholder='Enter priority(1-10)'
        pattern='^([1-9]|10)$'
        maxLength={2}
        title='Priority should be a number from 1 to 10'
        required
      />
    </form>
  );
}
