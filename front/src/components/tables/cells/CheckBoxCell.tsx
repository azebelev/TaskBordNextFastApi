import { IconButton } from '../../../components/buttons/IconButton';
import { CheckBirdIcon } from '../../../components/icons/CheckBirdIcon';

export function CheckBoxCell({
    isChecked,
    handleChange,
  }: {
    isChecked: boolean;
    handleChange: () => void;
  }) {
    return (
      <IconButton roundedValue='md' onClick={handleChange}>
        <div className='p-1'>
          <div className='hover:cursor-pointer h-5 w-5 rounded-md border-2 border-grey-500 relative '>
            <div className='absolute bottom-0.5 '>{isChecked && <CheckBirdIcon />}</div>
          </div>
        </div>
      </IconButton>
    );
  }