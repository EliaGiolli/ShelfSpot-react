import { Link, NavLink } from 'react-router-dom'
import { MobileNavMenu } from './MobileNavMenu';
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from '../custom hooks/useTheme';

function Navbar() {
  const theme = useTheme();

  //Theme-based classes
  const navBg = theme === 'light' ? 'bg-amber-700 border-b-yellow-300' : 'bg-amber-900 border-b-yellow-500';
  const linkText = theme === 'light' ? 'text-yellow-300' : 'text-yellow-200';
  const navLink = (isActive: boolean) =>
    isActive
      ? `${linkText} underline`
      : `text-gray-200 hover:text-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded`;

  return (
    <nav
      className={`${navBg} flex justify-around items-center w-full max-h-20 border-b-2 sticky top-0 z-50 px-4 py-6`}
      aria-label='primary-navigation'
    >
      {/* Desktop menu */}
      <Link to='/home' className={`font-bold text-3xl ${linkText} hidden md:block`}>
        ShelfSpot
      </Link>
      <ul className='hidden md:flex items-center text-center text-2xl gap-x-8'>
        <li>
          <NavLink to='/home' className={({ isActive }) => navLink(isActive)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/books' className={({ isActive }) => navLink(isActive)}>
            Books
          </NavLink>
        </li>
        <li>
          <NavLink to='/loans' className={({ isActive }) => navLink(isActive)}>
            Borrow a book
          </NavLink>
        </li>
      </ul>
      {/* Mobile menu */}
      <MobileNavMenu />
      {/* Theme toggler button */}
      <ThemeSwitch />
    </nav>
  );
}

export default Navbar;