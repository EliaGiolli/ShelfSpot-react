import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Link } from 'react-router-dom';
import { useTheme } from '../custom hooks/useTheme';

function HeroSection() {

  // Theme-based classes
  const theme = useTheme();
  const overlay =
    theme === 'light'
      ? 'bg-gradient-to-t from-amber-900 via-amber-800/70 to-transparent'
      : 'bg-gradient-to-t from-zinc-900 via-slate-900/80 to-transparent';
  const heading = theme === 'light' ? 'text-white' : 'text-yellow-300';
  const btn =
    theme === 'light'
      ? 'bg-amber-500 hover:bg-amber-600 text-white'
      : 'bg-yellow-600 hover:bg-yellow-700 text-white';

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="img/library.jpg"
        alt="Books and fantasy world illustration"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${overlay} z-10`} />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center max-w-4xl mx-auto">
        <h1
          className={`text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg ${heading}`}
        >
          Discover Your Next Favorite Book
        </h1>
        <p className={`max-w-xl text-lg mb-10 drop-shadow-md ${theme === 'light' ? 'text-white' : 'text-yellow-100'}`}>
          Dive into a world of fantasy and adventure. Search, explore, and save
          your favorites with ease.
        </p>
        <Link
          to="/loans"
          className={`inline-block font-semibold rounded-lg px-8 py-3 shadow-lg transition ${btn}`}
          aria-label="Contact us to borrow books"
        >
          Borrow a Book
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
