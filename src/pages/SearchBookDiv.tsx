import { useState } from 'react'
import { useFetch } from '../custom hooks/useFetchBook';
import { Books } from '../types/book';

// Aggiungi questa interfaccia all'inizio del file
function SearchBookDiv() {
  const [searchTerm, setSearchTerm] = useState<string | number>("");

  const {books, error, loading} = useFetch(searchTerm);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='bg-orange-600 max-h-screen w-1/2 mx-auto p-4 flex flex-col justify-center items-center text-center rounded-lg shadow-md shadow-slate-800 mt-5'>
      <h1 className='md:text-xl lg:text-2xl md:text-wrap uppercase font-bold text-white'>Search for your fantasy book!</h1>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row justify-evenly items-center text-center sm:p-3 md:p-2 lg:p-2 mt-3'>
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleInputChange}
          className='flex-1 p-2 sm:p-2 md:p-2 lg:p-1 bg-amber-50 hover:bg-amber-100 border-2 border-yellow-600 rounded-md'
        />
      </div>
      {loading && <p className='bg-orange-200 text-orange-900 p-2'>Loading...</p>}
      {error && <p className='bg-red-100 text-red-700 p-2'>{error}</p>}
      <div className='grid grid-cols-4 gap-4 max-h-[500px] mt-5'>
        {books.length > 0 && books.slice(0,20).map((book: Books) => (
          <div key={book.key} className="mb-4 p-2 border-b border-white text-white">
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author ? book.author.join(', ') : 'Unknown'}</p>
            <p>Year: {book.first_publish_year || 'Unknown'}</p>
            <p>Subject: {book.subject ? book.subject[0] : 'Not specified'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBookDiv