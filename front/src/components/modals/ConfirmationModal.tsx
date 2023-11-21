export function ConfirmationModal({
  onCancel,
  onSubmit,
  title,
  text,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  title: string;
  text: string;
}) {
  return (
    <>
      <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

        <div className=' fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
          <div className='bg-white p-6 rounded-lg shadow-md '>
            <div className='text-2xl text-center font-semibold mb-4'>{title}</div>
            <p className='text-gray-600 mb-6 text-center'>{text}</p>
            <div className='flex justify-center space-x-4'>
              <button
                className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300'
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className='bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300'
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
