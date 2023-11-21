import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export function TextAreaCell({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (d: string) => void;
}) {
  const [taskText, setTaskText] = useState('');
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setDescription(taskText);
      e.preventDefault();
      ref.current?.blur();
    }
  };

  useEffect(() => {
    setTaskText(description);
  }, [description]);
  
  return (
    <TextareaAutosize
      ref={ref}
      placeholder={'Type task description'}
      className=' p-1 rounded-sm w-full resize-none focus:outline-indigo-200'
      value={taskText}
      onChange={(e) => setTaskText(e.currentTarget.value)}
      onKeyDown={handleSubmit}
      onBlur={() => setDescription(taskText)}
    />
  );
}
