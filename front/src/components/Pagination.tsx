import { QueryObject } from '@/interfaces/taskTypes';
import { SetStateAction } from 'react';
import { ArrowLeft } from './icons/ArrowLeft';
import { ArrowRight } from './icons/ArrowRight';

const maxShownPages = 5;
export function Pagination({
  q,
  total,
  setQueryObject,
}: {
  q: QueryObject;
  total: number;
  setQueryObject: React.Dispatch<SetStateAction<QueryObject>>;
}) {
  const canNext = (q: QueryObject) => Math.ceil(total / q.perPage) > q.page + 1;
  const canPrev = (q: QueryObject) => q.page > 0;

  const getPages = (q: QueryObject) => {
    const totalPages = Math.ceil(total / q.perPage);
    let startPage = Math.max(0, q.page - Math.floor(maxShownPages / 2));
    let lastPage = startPage + maxShownPages - 1;
    const deltaLast = totalPages - lastPage;
    if (deltaLast < 0) {
      lastPage = totalPages - 1;
      startPage = Math.max(0, startPage + deltaLast);
    }

    const pages = [];
    for (let i = startPage; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const setPage = (page: number) => setQueryObject((prev) => ({ ...prev, page }));

  return (
    <div className='w-full flex items-center justify-center lg:px-0 sm:px-6 px-4'>
      <div className='lg:w-3/5 w-full  flex items-center justify-between'>
        <PrevButton canPrev={canPrev(q)} onClick={() => setPage(q.page - 1)} />
        <div className='flex'>
          {getPages(q).map((page, i) => (
            <PageIndicator
              key={i}
              onClick={() => setPage(page)}
              isCurrentPage={q.page === page}
              page={page + 1}
            />
          ))}
        </div>
        <NextButton canNext={canNext(q)} onClick={() => setPage(q.page + 1)} />
      </div>
    </div>
  );
}

function PageIndicator({
  isCurrentPage,
  onClick,
  page,
}: {
  isCurrentPage: boolean;
  onClick: () => void;
  page: number;
}) {
  return (
    <div
      onClick={onClick}
      className={`${
        isCurrentPage ? 'text-indigo-700 border-indigo-400' : 'border-transparent'
      } text-sm font-medium leading-none cursor-pointer text-gray-600  border-t pt-3 mr-4 px-2 `}
    >
      {page}
    </div>
  );
}

function PrevButton({ onClick, canPrev }: { canPrev: boolean; onClick: () => void }) {
  const getStyle = () => (canPrev ? 'text-gray-600 hover:text-indigo-700' : 'text-gray-300');
  return (
    <button
      disabled={!canPrev}
      onClick={onClick}
      className={`flex items-center pt-3 ${getStyle()}`}
    >
      <ArrowLeft />
      <div className='text-sm ml-3 font-medium leading-none '>Previous</div>
    </button>
  );
}

function NextButton({ onClick, canNext }: { canNext: boolean; onClick: () => void }) {
  const getStyle = () => (canNext ? 'text-gray-600 hover:text-indigo-700' : 'text-gray-300');
  return (
    <button
      onClick={onClick}
      disabled={!canNext}
      className={`flex items-center pt-3 ${getStyle()}`}
    >
      <div className='text-sm font-medium leading-none mr-3'>Next</div>
      <ArrowRight />
    </button>
  );
}
