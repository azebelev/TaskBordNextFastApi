import { IconButton } from '@/components/buttons/IconButton';
import { BucketIcon } from '@/components/icons/BucketIcon';
import { ConfirmationModal } from '@/components/modals/ConfirmationModal';
import { useState } from 'react';

export function DeleteCell({ handleDelete }: { handleDelete: () => void }) {
  const [modalIsOpened, setModalIsOpen] = useState(false);
  return (
    <>
      {modalIsOpened && (
        <ConfirmationModal
          onCancel={() => setModalIsOpen(false)}
          onSubmit={() => {
            handleDelete();
            setModalIsOpen(false);
          }}
          title={'Delete confirmation'}
          text={'Are you sure you want delete item?'}
        />
      )}
      <IconButton roundedValue='full' onClick={() => setModalIsOpen(true)}>
        <BucketIcon />
      </IconButton>
    </>
  );
}
