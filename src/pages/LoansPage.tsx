import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useGetLoansQuery } from '../features/api/loansApiReducer';

import BorrowBookForm from '../components/BorrowBookForm';
import LoanComponent from '../components/LoanComponent';

function LoansPage() {

  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  const userId = currentUser?.id ?? '';
  const userName = currentUser?.name ?? '';
  const lastName = currentUser?.lastName ?? '';

  const { data: loans, isLoading, error, refetch } = useGetLoansQuery(userId);
 
  return (
    <main className="max-w-4xl mx-auto p-6">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Your Current Loans</h2>
        {isLoading && <p>Loading loans...</p>}
        {error && <p className="text-red-600 bg-red-100 p-4 rounded-md">Failed to load loans.</p>}
        {!loans?.length && !isLoading && <p>You have no current loans.</p>}

        <ul>
          {loans?.map((loan) => (
           <LoanComponent key={loan.id} loan={loan} onReturned={refetch} />
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Borrow a Book</h2>
        <BorrowBookForm
          userId={userId}
          userName={userName}
          lastName={lastName}
          onSuccess={() => refetch()}
        />
      </section>
    </main>
  );
}

export default LoansPage;
