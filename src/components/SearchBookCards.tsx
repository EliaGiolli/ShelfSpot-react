import { Books, BooksProps } from '../types/book'
import Button from './Button'

function SearchBookCards({ books }:BooksProps) {

  const addToFavourites = () => {}

  return (
    <>
        {(books ?? []).slice(0,20).map((book: Books) => (
          <article key={book.key} className="flex flex-col mb-4 px-4 py-3 bg-gray-200 border-b border-amber-700 text-gray-900 rounded-lg shadow shadow-gray-800">
            <img
              src={book.cover_i ? 
                `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : 
                `img/placeholder.jpg`} 
              alt="an image of old books"
              className='w-full object-cover h-30' />
            <h3 className="font-bold text-yellow-500">{book.title}</h3>
           <div className='my-5'>
              <p>Author: {book.author ? book.author.join(', ') : 'Unknown'}</p>
              <p>Year: {book.first_publish_year || 'Unknown'}</p>
              <p>Subject: {book.subject ? book.subject[0] : 'Not specified'}</p>
           </div>
           <Button onClick={addToFavourites}>
                Add to favourtites
            </Button>
          </article>
        ))}
    </>
  )
}

export default SearchBookCards