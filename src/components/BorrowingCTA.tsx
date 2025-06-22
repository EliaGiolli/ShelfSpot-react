import { Link } from 'react-router-dom';
import { useTheme } from '../custom hooks/useTheme';

function BorrowingCTA() {
  const theme = useTheme();

  // Theme-based classes
  const sectionBg = theme === 'light' ? 'bg-amber-50' : 'bg-slate-900';
  const headingText = theme === 'light' ? 'text-amber-700' : 'text-yellow-300';
  const paragraph = theme === 'light' ? 'text-gray-900' : 'text-yellow-100';
  const buttonBg = theme === 'light'
    ? 'bg-amber-400 hover:bg-amber-500 text-white'
    : 'bg-yellow-600 hover:bg-yellow-700 text-white';

  return (
    <>
      <section className={`py-16 ${sectionBg} px-6 max-w-6xl mx-auto text-center rounded-md shadow-lg`}>
        <h2 className={`text-4xl font-extrabold mb-6 ${headingText}`}>Ready to Dive In?</h2>
        <p className={`${paragraph} max-w-xl mx-auto mb-10 text-lg`}>
          Contact us today to borrow your favorite books and start your adventure!
        </p>
        <Link
          to="/loans"
          className={`inline-block font-semibold rounded-lg px-10 py-4 shadow-lg transition ${buttonBg}`}
          aria-label="Contact us to borrow books"
        >
          Borrow a Book Now
        </Link>
      </section>
    </>
  )
}

export default BorrowingCTA