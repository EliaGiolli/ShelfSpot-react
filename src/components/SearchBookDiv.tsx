import axios from 'axios';
import { useState } from 'react'

// Aggiungi questa interfaccia all'inizio del file
function SearchBookDiv() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  

  const fetchBook = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}`);
      setBooks(response.data.docs);
      console.log(response.data.docs);
    } catch(error) {
      console.error("An error occurred:", error);  
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='bg-orange-600 h-screen w-1/2 mx-auto p-4 flex flex-col justify-center items text-center mt-5
      rounded-lg shadow-md shadow-slate-800'>
      <h1 className='md:text-xl lg:text-2xl md:text-wrap uppercase font-bold text-white'>Search for your fantasy book!</h1>
      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row justify-evenly items-center text-center sm:p-3 md:p-2 lg:p-2 mt-3'>
        <input 
          type="text" 
          value={searchTerm}
          onChange={handleInputChange}
          className='flex-1 p-2 sm:p-2 md:p-2 lg:p-1 border-2 border-double border-black'
        />
        <button 
          className='text-black p-2 sm:p-2 md:p-2 lg:p-1 rounded-md bg-yellow-300 mt-2 lg:mt-0 lg:ml-1' 
          onClick={fetchBook}
        >
          Search
        </button>
      </div>
      {books.length > 0 && (
          <div className='bg-orange-600 h-auto w-full p-4 flex flex-col justify-evenly items-center text-center mt-5
          rounded-lg shadow-md shadow-slate-800'>
            <ul>
              {books.map(book => (
                <li key={book.key} className="mb-4 p-2 border-b border-white text-white">
                  <h3 className="font-bold">{book.title}</h3>
                  <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                  <p>Year: {book.first_publish_year || 'Unknown'}</p>
                  <p>Subject: {book.subject ? book.subject[0] : 'Not specified'}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  )
}

export default SearchBookDiv