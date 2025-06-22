import { Book, BookProps } from '../types/book'
import Button from './Button'
import { useAddToFavouritesMutation } from '../features/api/favouritesApiReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useTheme } from '../custom hooks/useTheme';

function SearchBookCards({ books }:BookProps) {
  const theme = useTheme();
  const currentUser = useSelector((state:RootState) =>state.auth.userInfo);
  const userId = currentUser?.id;

  const [ addToFavourites, { isLoading, error }] = useAddToFavouritesMutation();

  // Theme based classes
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-slate-800';
  const border = theme === 'light' ? 'border-amber-700' : 'border-slate-800';
  const text = theme === 'light' ? 'text-gray-900' : 'text-yellow-100';
  const title = theme === 'light' ? 'text-yellow-600' : 'text-yellow-300';

  const handleAddToFavourites = async (bookId:string, bookTitle:string) => {
    try {
      await addToFavourites({
        userId: userId!,
        userName: currentUser?.name,
        lastName: currentUser?.lastName,
        bookId,
        bookTitle,
      }).unwrap()
    }catch( error ) {
      console.error('Failed to add favourites', error);
    }
  };

  return (
    <>
        {(books ?? []).slice(0,20).map((book: Book) => (
          <article key={book.key} className={`flex flex-col mb-4 ${cardBg} ${border} ${text} rounded-lg shadow`}>
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
            <h3 className={`font-bold text-lg ${title}`}>{book.title}</h3>
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

export default SearchBookCards;