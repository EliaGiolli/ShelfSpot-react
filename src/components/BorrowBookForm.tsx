import { useForm } from "react-hook-form";
import { useBorrowApi } from "../custom hooks/useBorrowApi";
import { useOnSubmit } from "../custom hooks/useOnSubmit";
import { BorrowBookFormInput, BorrowFormData } from "../types/loans";
import { useTheme } from '../custom hooks/useTheme';

function BorrowBookForm({ userId, userName, lastName, onSuccess }: BorrowFormData) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BorrowBookFormInput>();

  const {
    bookId,
    setBookId,
    bookTitle,
    isBookLoading,
    borrowBook,
    isBorrowing,
    error,
  } = useBorrowApi();

  const theme = useTheme();

  //Theme-based classes
  const formBg = theme === 'light' ? 'bg-white' : 'bg-slate-900';
  const labelText = theme === 'light' ? 'text-amber-700' : 'text-yellow-300';
  const inputBg = theme === 'light'
    ? 'bg-amber-50 border-amber-300 text-gray-900'
    : 'bg-slate-800 border-slate-700 text-yellow-100';
  const buttonBg = theme === 'light'
    ? 'bg-amber-600 hover:bg-amber-700 text-white'
    : 'bg-yellow-600 hover:bg-yellow-700 text-zinc-900';

  const onSubmit = useOnSubmit({
    borrowBook,
    userId,
    userName,
    lastName,
    bookId,
    bookTitle,
    reset,
    onSuccess,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-md mx-auto space-y-6 p-6 rounded-lg shadow-md ${formBg}`}
    >
      <div>
        <label htmlFor="bookId" className={`block font-semibold mb-1 ${labelText}`}>
          Book ID
        </label>
        <input
          id="bookId"
          type="text"
          {...register("bookId", { required: true })}
          value={bookId}
          onChange={e => setBookId(e.target.value)}
          className={`w-full p-2 rounded border ${inputBg}`}
        />
        {isBookLoading && <p className="text-sm text-gray-500">Fetching book info...</p>}
        {bookTitle && <p className="text-sm text-green-700">Book Title: {bookTitle}</p>}
        {errors.bookId && <span className="text-red-600">Book ID is required</span>}
      </div>
      <button
        type="submit"
        className={`px-4 py-2 rounded disabled:opacity-50 ${buttonBg}`}
        disabled={isSubmitting || isBookLoading || !bookTitle}
      >
        Borrow Book
      </button>
      {error && <p className="text-red-600">Error borrowing book.</p>}
    </form>
  );
}

export default BorrowBookForm;
