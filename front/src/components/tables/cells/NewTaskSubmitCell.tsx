import { IconButton } from '@/components/buttons/IconButton';
import { CancelIcon } from '@/components/icons/CancelIcon';
import { CheckBirdIcon } from '@/components/icons/CheckBirdIcon';

export function NewTaskSubmitCell({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className=' flex'>
      <div className=' p-1'>
        <IconButton onClick={onSubmit} roundedValue={'full'}>
          <CheckBirdIcon />
        </IconButton>
      </div>
      <div className=' p-1'>
        <IconButton onClick={onCancel} roundedValue={'full'}>
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
}
