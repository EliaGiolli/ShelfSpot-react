import * as Form from '@radix-ui/react-form';
import { useForm } from 'react-hook-form';
import { borrowBookSchema } from '../schemas/borrowBooksSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBorrowBookMutation } from '../features/api/loansApiReducer';
import { BorrowFormData, BorrowBookFormInput } from '../types/loans';


function BorrowBookForm({ userId, userName, lastName, onSuccess }: BorrowFormData) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BorrowBookFormInput>({
    resolver: zodResolver(borrowBookSchema),
  });

  const [borrowBook, { error }] = useBorrowBookMutation();

  const onSubmit = async (data: BorrowBookFormInput) => {
    try {
      await borrowBook({
        userId,
        userName,
        lastName,
        bookId: data.bookId,
        bookTitle: 'Unknown Title', // Optionally enhance to fetch real title
        loanDate: new Date().toISOString(),
      }).unwrap();

      reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Failed to borrow book:', err);
    }
  };

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
      <Form.Field name="bookId">
        <Form.Label className="block mb-1 font-semibold text-gray-700">Book ID</Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            {...register('bookId')}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter Book ID"
            disabled={isSubmitting}
          />
        </Form.Control>
        <Form.Message match="valueMissing" className="text-red-600 text-sm" />
        {errors.bookId && <p className="text-red-600 text-sm">{errors.bookId.message}</p>}
      </Form.Field>

      {error && (
        <p className="text-red-600 text-sm">
          { 'status' in error
            ? `Error ${error.status}: ${JSON.stringify(error.data)}`
            : 'Failed to borrow book. Please try again.' }
        </p>
      )}

      <Form.Submit asChild>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Borrowing...' : 'Borrow Book'}
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

export default BorrowBookForm;
