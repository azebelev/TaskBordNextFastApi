import { ArrowLeft } from '@/components/icons/ArrowLeft';
import { ArrowRight } from '@/components/icons/ArrowRight';
import { FilterEnum } from '@/enums/filterEnum';
import { SortingEnum } from '@/enums/sortingEnum';
import { QueryObject } from '@/interfaces/taskTypes';

export function ControlPanel({
  queryObject,
  setQueryObject,
}: {
  queryObject: QueryObject;
  setQueryObject: React.Dispatch<React.SetStateAction<QueryObject>>;
}) {
  const getClass = (isActive: boolean) =>
    `${isActive ? 'text-indigo-700' : 'text-gray-700'} font-semibold whitespace-nowrap  `;

  const setFilter = (filter: FilterEnum) => {
    setQueryObject((prev) => ({ ...prev, filter, page: 0 }));
  };

  const setSorting = (sorting: SortingEnum) => {
    setQueryObject((prev) => ({ ...prev, sorting }));
  };

  return (
    <div className='flex justify-between mb-4'>
      <div className='flex space-x-2'>
        <button
          onClick={() => setFilter(FilterEnum.Completed)}
          className={getClass(queryObject.filter === FilterEnum.Completed)}
        >
          Completed
        </button>
        <span className=' text-gray-700 font-semibold whitespace-nowrap'>|</span>
        <button
          onClick={() => setFilter(FilterEnum.All)}
          className={getClass(queryObject.filter === FilterEnum.All)}
        >
          All
        </button>
        <span className=' text-gray-700 font-semibold'>|</span>
        <button
          onClick={() => setFilter(FilterEnum.NotCompleted)}
          className={getClass(queryObject.filter === FilterEnum.NotCompleted)}
        >
          Not Completed
        </button>
      </div>
      <div className='flex space-x-2 text-gray-700 font-semibold'>
        <button
          onClick={() =>
            queryObject.sorting === SortingEnum.Dsc
              ? setSorting(SortingEnum.Asc)
              : setSorting(SortingEnum.Dsc)
          }
          className={'flex font-semibold whitespace-nowrap align-middle'}
        >
          Priority{' '}
          {queryObject.sorting === SortingEnum.Dsc ? (
            <div className=' rotate-90 translate-y-2'>
              <ArrowRight />
            </div>
          ) : (
            <div className=' rotate-90 translate-y-2'>
              <ArrowLeft />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
