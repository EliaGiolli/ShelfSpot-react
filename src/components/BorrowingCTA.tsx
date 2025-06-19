import { Link } from 'react-router-dom';

function BorrowingCTA() {
  return (
    <>
      <section className="py-16 bg-amber-50 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-amber-700">Ready to Dive In?</h2>
        <p className="max-w-xl mx-auto mb-10 text-lg">
        Contact us today to borrow your favorite books and start your adventure!
        </p>
        <Link
         to="/loans"
         className="inline-block bg-amber-400 hover:bg-amber-500 text-white font-semibold rounded-lg px-10 py-4 shadow-lg transition"
         aria-label="Contact us to borrow books"
        >
            Borrow a Book Now
        </Link>
      </section>
    </>
  )
}

export default BorrowingCTA