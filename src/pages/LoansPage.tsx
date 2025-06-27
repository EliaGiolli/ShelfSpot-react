import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useGetLoansQuery } from '../features/api/loansApiReducer';
import BorrowBookForm from '../components/BorrowBookForm';
import LoanComponent from '../components/LoanComponent';
import { useTheme } from '../custom hooks/useTheme';

function LoansPage() {
  const theme = useTheme();
  const currentUser = useSelector((state: RootState) => state.auth.userInfo);
  const userId = currentUser?.id ?? '';
  const userName = currentUser?.name ?? '';
  const lastName = currentUser?.lastName ?? '';
  const { data: loans, isLoading, error, refetch } = useGetLoansQuery(userId);

  const mainBg = theme === 'light' ? 'bg-amber-50' : 'bg-zinc-900';
  const sectionBg = theme === 'light' ? 'bg-white' : 'bg-slate-900';
  const heading = theme === 'light' ? 'text-amber-700' : 'text-yellow-300';
  const errorMsg = theme === 'light' ? 'text-red-600 bg-red-100' : 'text-red-400 bg-red-900';

  return (
    <main className={`max-w-4xl mx-auto p-6 ${mainBg}`}>
      <section className={`mb-12 rounded-lg shadow ${sectionBg} p-6`}>
        <h2 className={`text-2xl font-bold mb-4 text-center p-2 ${heading}`}>Your Current Loans</h2>
        {isLoading && <p>Loading loans...</p>}
        {error && <p className={`p-4 rounded-md ${errorMsg}`}>Failed to load loans.</p>}
        {!loans?.length && !isLoading && <p>No current loans.</p>}
        <ul>
          {loans?.map((loan) => (
            <LoanComponent key={loan.id} loan={loan} onReturned={refetch} />
          ))}
        </ul>
      </section>
      <section className={` ${sectionBg} flex flex-col text-center p-6`}>
        <h2 className={`text-2xl font-bold mb-4 p-2 ${heading}`}>Borrow a Book</h2>
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
