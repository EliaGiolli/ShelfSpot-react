import { useState } from 'react'
import { useFetch } from '../custom hooks/useFetchBook';

// Aggiungi questa interfaccia all'inizio del file
function SearchBookDiv() {
  const [searchTerm, setSearchTerm] = useState<string | number>("");

  const {books, error, loading} = useFetch(searchTerm);

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='bg-orange-600 h-fit w-fit mx-auto p-4 flex flex-col justify-center items-center text-center mt-5 rounded-lg shadow-md shadow-slate-800'>
      <h1 className='text-xl sm:text-2xl md:text-wrap uppercase font-bold text-yellow-200'>Search for your fantasy book!</h1>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row justify-evenly items-center text-center sm:p-3 md:p-2 lg:p-2 mt-3'>
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleInputChange}
          className='flex-1 p-2 border-2 border-double border-black text-center focus:ring-1 focus:ring-yellow-500 hover:border-orange-700 hover:bg-slate-200'
        />
      </div>
      {/*   ERROR & LOADING HANDLING */}
      {loading && <p className='bg-orange-200 text-orange-900 p-2'>Loading...</p>}
      {error && <p className='bg-red-100 text-red-700 p-2'>{error}</p>}
      <div className='grid gird-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 h-fit p-3'>
        {books.length > 0 && books.slice(0,20).map(book => (
          <li key={book.key} className="mb-4 p-2 border-b border-white text-white list-none">
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author ? book.author.join(', ') : 'Unknown'}</p>
            <p>Year: {book.first_publish_year || 'Unknown'}</p>
            <p>Subject: {book.subject ? book.subject[0] : 'Not specified'}</p>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SearchBookDiv