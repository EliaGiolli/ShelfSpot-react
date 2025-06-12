import { Books, BooksProps } from '../types/book'

function SearchBookCards({ books }:BooksProps) {
  return (
    <>
        {(books ?? []).slice(0,20).map((book: Books) => (
          <div key={book.key} className="mb-4 p-2 border-b border-white text-white">
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author ? book.author.join(', ') : 'Unknown'}</p>
            <p>Year: {book.first_publish_year || 'Unknown'}</p>
            <p>Subject: {book.subject ? book.subject[0] : 'Not specified'}</p>
          </div>
        ))}
    </>
  )
}

export default SearchBookCards