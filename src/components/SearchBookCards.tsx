import { Books, BooksProps } from '../types/book'
import Button from './Button'
import { useAddToFavouritesMutation } from '../features/api/favouritesApiReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'


function SearchBookCards({ books }:BooksProps) {

  const currentUser = useSelector((state:RootState) =>state.auth.userInfo);
  const userId = currentUser?.id; //it uses the correct property from the auth state

  const [ addToFavourites, { isLoading, error }] = useAddToFavouritesMutation();
  
  const handleAddToFavourites = async (bookId:string, bookTitle:string) => {

    try {
      await addToFavourites({
        userId: userId!, //asserts non-null if authenticated 
        userName: currentUser?.name,
        lastName: currentUser?.lastName,
        bookId,
        bookTitle,
      }).unwrap() //Unwraps a mutation call to provide the raw response/error
    }catch( error ) {
      console.error('Failed to add favourites', error);
    }
  };

  return (
    <>
        {(books ?? []).slice(0,20).map((book: Books) => (
          <article key={book.key} className="flex flex-col mb-4 bg-white border-b border-amber-700 text-gray-900 rounded-lg shadow">
           <div className='overflow-hidden rounded-t-lg'>
            <img
              src={book.cover_i ? 
                `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : 
                `img/placeholder.jpg`} 
                alt="an image of old books"
                className='w-full object-cover h-48 rounded-t-lg' />
            </div>
           <div className='px-4 py-3 my-4 h-[150px]'>
            <h3 className="font-bold text-lg text-yellow-600">{book.title}</h3>
              <p className='text-sm'>Author: {book.author ? book.author.join(', ') : 'Unknown'}</p>
              <p className='text-sm'>Year: {book.first_publish_year || 'Unknown'}</p>
              <p className='text-sm'>Subject: {book.subject ? book.subject[0] : 'Not specified'}</p>
           </div>
           <div className='px-4 pb-3'>
            <Button 
              onClick={() => handleAddToFavourites(book.key, book.title)} 
              disabled={isLoading}
              aria-label={`Add ${book.title} to favourites`}
              >
                  Add to favourites
              </Button>
            </div>
            { error && <p className="text-red-500 bg-red-200 p-4">Failed to add to favourites. Please try again.</p> }
          </article>
        ))}
    </>
  )
}

export default SearchBookCards