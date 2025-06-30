import { LoanComponentProps } from '../types/loans';
import { useReturnBookMutation } from '../features/api/loansApiReducer';
import { useTheme } from '../custom hooks/useTheme';

import Button from './Button';

function LoanComponent({ loan, onReturned }:LoanComponentProps) {
  // Theme-based classes
  const theme = useTheme();
  const itemBg = theme === 'light' ? 'bg-white' : 'bg-slate-900';
  const text = theme === 'light' ? 'text-gray-900' : 'text-yellow-100';
  const subText = theme === 'light' ? 'text-gray-600' : 'text-yellow-300';

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
        <Button
          onClick={handleReturn}
          disabled={isLoading}
          className="disabled:opacity-50 mt-6 mb-2"
          aria-label="return book"
        >
          {isLoading ? 'Returning...' : 'Return Book'}
        </Button>
      )}
      </div>
    </li>
  )
}

export default LoanComponent;