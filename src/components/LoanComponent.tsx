import { Loan,LoanComponentProps } from '../types/loans';
import { useReturnBookMutation } from '../features/api/loansApiReducer';
import { useTheme } from '../custom hooks/useTheme';

function LoanComponent({ loan, onReturned }:LoanComponentProps) {
  // Theme-based classes
  const theme = useTheme();
  const itemBg = theme === 'light' ? 'bg-white' : 'bg-slate-800';
  const text = theme === 'light' ? 'text-gray-900' : 'text-yellow-100';
  const subText = theme === 'light' ? 'text-gray-600' : 'text-yellow-300';
  const btn = theme === 'light'
    ? 'bg-amber-600 text-white hover:bg-amber-700'
    : 'bg-yellow-600 text-white hover:bg-yellow-700';

  const [returnBook, { isLoading }] = useReturnBookMutation();

  const handleReturn = async () => {
    try {
      await returnBook(loan.id).unwrap();
      onReturned();
    } catch (error) {
      console.error('Failed to return book:', error);
    }
  };

  return (
    <li className={`flex justify-between items-center border-b p-5 ${itemBg} ${text}`}>
      <div className='flex flex-col'>
        <p className="font-semibold">{loan.bookTitle}</p>
        <p className={`text-sm ${subText}`}>Loaned on: {new Date(loan.loanDate).toLocaleDateString()}</p>
        {loan.returnDate ? (
          <p className={`text-sm ${subText}`}>Returned on: {new Date(loan.returnDate).toLocaleDateString()}</p>
        ) : (
          <p className={`text-sm ${subText}`}>Status: On Loan</p>
        )}
      {!loan.returnDate && (
        <button
          onClick={handleReturn}
          disabled={isLoading}
          className={`px-4 py-2 rounded disabled:opacity-50 mt-6 mb-2 ${btn}`}
        >
          {isLoading ? 'Returning...' : 'Return Book'}
        </button>
      )}
      </div>
    </li>
  )
}

export default LoanComponent;