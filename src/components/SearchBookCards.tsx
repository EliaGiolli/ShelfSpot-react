import { Books, BooksProps } from '../types/book'
import Button from './Button'
import { useAddToFavouritesMutation } from '../features/api/favouritesApiReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'


function SearchBookCards({ books }:BooksProps) {

  const currentUser = useSelector((state:RootState) =>state.auth.userInfo);
  const userId = currentUser?.id; //it uses the correct property from the auth state

  const [ addToFavourites, { isLoading, error }] = useAddToFavouritesMutation();
  
  const handleAddToFavourites = async (bookId:string) => {

    try {
      await addToFavourites({
        userId: userId!, //asserts non-null if authenticated 
        userName: currentUser?.name,
        lastName: currentUser?.lastName,
        bookId,
      }).unwrap() //Unwraps a mutation call to provide the raw response/error
    }catch( error ) {
      console.error('Failed to add favourites', error);
    }
  };

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
           <Button onClick={() => handleAddToFavourites(book.key)} disabled={isLoading}>
                Add to favourtites
            </Button>
            { error && <p className="text-red-500 bg-red-200 p-4">Failed to add to favourites. Please try again.</p> }
          </article>
        ))}
    </>
  )
}

export default SearchBookCards