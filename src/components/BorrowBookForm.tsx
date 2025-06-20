import { useForm } from "react-hook-form";
import { useBorrowApi } from "../custom hooks/useBorrowApi";
import { useOnSubmit } from "../custom hooks/useOnSubmit";
import { BorrowBookFormInput, BorrowFormData } from "../types/loans";

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
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="bookId" className="block font-semibold mb-1">
          Book ID
        </label>
        <input
          id="bookId"
          type="text"
          {...register("bookId", { required: true })}
          value={bookId}
          onChange={e => setBookId(e.target.value)}
          className="w-full p-2 rounded border"
        />
        {isBookLoading && <p className="text-sm text-gray-500">Fetching book info...</p>}
        {bookTitle && <p className="text-sm text-green-700">Book Title: {bookTitle}</p>}
        {errors.bookId && <span className="text-red-600">Book ID is required</span>}
      </div>
      <button
        type="submit"
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 disabled:opacity-50"
        disabled={isSubmitting || isBookLoading || !bookTitle}
      >
        Borrow Book
      </button>
      {error && <p className="text-red-600">Error borrowing book.</p>}
    </form>
  );
}

export default BorrowBookForm;
