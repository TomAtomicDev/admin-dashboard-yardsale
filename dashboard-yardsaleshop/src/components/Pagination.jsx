import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

export default function Pagination({totalPages}) {
	const { setCurrentPage } = useAuth();
  const neighbours = 3;

	const items = [];
  const [current, setCurrent] = useState(1);
  const end = Math.min(Math.max(neighbours * 2 + 2, neighbours + current + 1), totalPages + 1);
  const start = Math.min(Math.max(end - (neighbours * 2 + 1), 1), Math.max(current - neighbours, 1));

  for (let i = start; i < end; i++) {
    items.push(
      <a
        key={`Paginador-${i}`}
        onClick={() => {
          setCurrent(i);
          setCurrentPage(i);
        }}
        href="#"
        aria-current="page"
        className={`${getClassActive(i)} relative inline-flex items-center px-2 sm:px-4 py-2 border text-sm font-medium`}
      >
        {i}
      </a>
    );
  }

  function getClassActive(i) {
    return i === current ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
  }

  function prevPage() {
    if (current > 1) {
      setCurrent(current - 1);
      setCurrentPage(current - 1);
    }
  }

  function nextPage() {
    if (current < totalPages) {
      setCurrent(current + 1);
      setCurrentPage(current + 1);
    }
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className=" sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              onClick={() => prevPage()}
              href="#"
              className="relative inline-flex items-center px-1 sm:px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {items}
            <a
              onClick={() => nextPage()}
              href="#"
              className="relative inline-flex items-center px-1 sm:px-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}