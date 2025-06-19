import { Loan,LoanComponentProps } from '../types/loans';
import { useReturnBookMutation } from '../features/api/loansApiReducer';

function LoanComponent({ loan, onReturned }:LoanComponentProps) {
    
  const [returnBook, { isLoading }] = useReturnBookMutation();

  const handleReturn = async () => {
    try {
      await returnBook(loan.id).unwrap();
      onReturned();
    } catch (error) {
      console.error('Failed to return book:', error);
      // Optionally show error UI here
    }
  };

  return (
    <li className="flex justify-between items-center border-b py-3">
      <div>
        <p className="font-semibold">{loan.bookTitle}</p>
        <p className="text-sm text-gray-600">Loaned on: {new Date(loan.loanDate).toLocaleDateString()}</p>
        {loan.returnDate ? (
          <p className="text-sm text-gray-600">Returned on: {new Date(loan.returnDate).toLocaleDateString()}</p>
        ) : (
          <p className="text-sm text-gray-600">Status: On Loan</p>
        )}
      </div>
      {!loan.returnDate && (
        <button
          onClick={handleReturn}
          disabled={isLoading}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 disabled:opacity-50"
        >
          {isLoading ? 'Returning...' : 'Return Book'}
        </button>
      )}
    </li>
  )
}

export default LoanComponent