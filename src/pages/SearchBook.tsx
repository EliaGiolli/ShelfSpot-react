import { useState } from 'react'
import { useSearchBooksQuery } from '../features/api/apiReducer';
import { useDebounce } from '../custom hooks/useDebounce';
import SearchBookCards from '../components/SearchBookCards';
import FavouriteSidebar from '../components/FavouriteSidebar'
import Input from '../components/Input'

import { skipToken } from '@reduxjs/toolkit/query';

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
    <>
      <section aria-labelledby="search-intro" className="bg-white border-l-amber-300 mx-auto border-l-5 shadow-md my-6 p-8">
        <header>
          <h2 id="search-intro" className="text-2xl font-bold text-amber-600 mb-2">
            Find Your Next Favorite Book
          </h2>
        </header>
        <p className="text-gray-700 max-w-prose">
          Use the search below to explore thousands of books. Discover new adventures, authors, and genres tailored to your taste.
        </p>
        <p className="text-gray-700 max-w-prose">
          Here you can quickly access books you’ve marked as favourites. Keep track of your top picks and revisit them anytime.
        </p>
      </section>

      <section className='w-full grid grid-cols-1 md:grid-cols-3 py-3 px-4 mt-5 gap-4'>
        <FavouriteSidebar />
        <div className='
          bg-white w-full overflow-auto max-h-screen col-span-1 md:col-span-2
          flex flex-col justify-center items-center text-center rounded-lg shadow shadow-gray-500 px-5 py-6'>
          <h1 className='text-2xl md:text-3xl md:text-wrap uppercase font-bold text-amber-600 my-7'>Search for your fantasy book!</h1>
          <div 
            className='flex flex-col sm:flex-col md:flex-col lg:flex-row justify-evenly items-center text-center 
            sm:p-3 md:p-2 lg:p-2 mt-3'
            >
            <Input searchTerm={searchTerm} handleInputChange={handleInputChange}/>
          </div>
          {isLoading && <p className='bg-orange-200 text-orange-900 p-2'>Loading...</p>}

          {error && (
            <p className='bg-red-100 text-red-700 p-2'>
              { 'status' in error
                ? `Error ${error.status}: ${JSON.stringify(error.data)}`
                : error.message || 'An unknown error occurred' }
            </p>
          )}

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-h-[500px] mt-5'>

            <SearchBookCards books={books}/>
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchBook