import { useState } from 'react'
import { useSearchBooksQuery } from '../features/api/apiReducer';
import { useDebounce } from '../custom hooks/useDebounce';
import { Books } from '../types/book';

import { skipToken } from '@reduxjs/toolkit/query';
import SearchBookCards from '../components/SearchBookCards';


function SearchBook() {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  //The Skip Token avoids initial api requests
  //RTK aborts pending requests when a new request is made before the previous one completes
  const {data:books, error, isLoading} = useSearchBooksQuery( debouncedSearchTerm || skipToken );

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className='min-h-screen w-full flex flex-col mx-auto p-8 mt-5'>
      <div className='bg-orange-600 w-fit mx-auto min-h-fit flex flex-col justify-center items-center text-center rounded-lg shadow-md shadow-slate-800c p-4'>
        <h1 className='md:text-xl lg:text-2xl md:text-wrap uppercase font-bold text-white'>Search for your fantasy book!</h1>
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row justify-evenly items-center text-center sm:p-3 md:p-2 lg:p-2 mt-3'>
          <label htmlFor="search-input" className="sr-only">Search books</label>
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleInputChange}
            className='flex-1 p-2 sm:p-2 md:p-2 lg:p-1 bg-amber-50 hover:bg-amber-100 border-2 border-yellow-600 rounded-md'
          />
        </div>

        {isLoading && <p className='bg-orange-200 text-orange-900 p-2'>Loading...</p>}

        {error && (
          <p className='bg-red-100 text-red-700 p-2'>
            { 'status' in error
              ? `Error ${error.status}: ${JSON.stringify(error.data)}`
              : error.message || 'An unknown error occurred' }
          </p>
        )}

        <div className='grid grid-cols-4 gap-4 max-h-[500px] mt-5'>

          <SearchBookCards books={books}/>
        </div>
      </div>
    </main>
  );
}

export default SearchBook